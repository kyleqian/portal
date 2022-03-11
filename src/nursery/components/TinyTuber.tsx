import { useCallback, useEffect, useState, useMemo, useContext } from 'react';
import {
  PublicKey,
  SystemProgram,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import { programs, NodeWallet } from '@metaplex/js';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

import SeedSocietyCard from './common/SeedSocietyCard';
import Search from './common/Search';
import WaterMeter from './common/WaterMeter';

import {
  awaitTransactionSignatureConfirmation, shortenAddress,
} from '../CandyMachine2';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { sendTransaction } from '../connection';
import {
  SEED_SOCIETY_PROGRAM,
  getTuberState,
  getWaterFilled,
  processRawName,
  TuberState,
  TuberMetadata,
  getTuberMetadata,
  getMetadataAddress,
  getATAForMint,
  getWaterCapacity,
  TUBER_STAGES,
  getLastWateredFromWaterTimeoutDateString,
  getGardenerPda,
  getGardenerState,
  GardenerState,
  getATAForMintUnknownOwner,
  getTimeNowUnixSeconds,
  getSeedSocietyProgram
} from '../SeedSociety';

import { AmplitudeContext, Events } from "../../AmplitudeContext";
import Countdown, { CountdownRendererFn } from 'react-countdown';

interface TinyTuberProps {
  ownedMintId: PublicKey,
  defaultName: string,
  txTimeout: number
}

const TinyTuber = ({ ownedMintId, defaultName, txTimeout }: TinyTuberProps) => {
  const [gardenerBump, setGardenerBump] = useState<number>();
  const [program, setProgram] = useState<anchor.Program>();
  const [gardenerPda, setGardenerPda] = useState(PublicKey.default);
  const [freezePda, setFreezePda] = useState(PublicKey.default);
  const [verifyPda, setVerifyPda] = useState(PublicKey.default);
  const [metadataPda, setMetadataPda] = useState(PublicKey.default);
  const [metadataAddress, setMetadataAddress] = useState(PublicKey.default);
  const [plantToken, setPlantToken] = useState(PublicKey.default);
  const [ownedTokenId, setOwnedTokenId] = useState(PublicKey.default);
  const [congrats, setCongrats] = useState(false);

  const [tuberState, setTuberState] = useState<TuberState>();
  const [gardenerState, setGardenerState] = useState<GardenerState>();
  const [tuberMetadata, setTuberMetadata] = useState<TuberMetadata>();
  const [ownerId, setOwnerId] = useState(PublicKey.default);

  const wateredFilled = useMemo(() => getWaterFilled(tuberState?.level ?? 0, tuberState?.watered ?? 0), [tuberState]);
  const wateredCapacity = useMemo(() => getWaterCapacity(tuberState?.level ?? 0), [tuberState]);
  const [rawSearchName, setRawSearchName] = useState(defaultName);
  const [sanitizedName, paddedName] = useMemo(() => processRawName(rawSearchName), [rawSearchName]);
  const [displayName, setDisplayName] = useState<string>();

  const [watering, setWatering] = useState(false);

  const connection = useConnection().connection;
  const wallet = useAnchorWallet() as NodeWallet;
  const watersRemaining = gardenerState ? (getTimeNowUnixSeconds() < gardenerState.waterTimeOutUnix ? 5 - gardenerState.wateredInTimeframe : 5) : 5;
  const ownTuber = ownerId.toBase58() === wallet.publicKey.toBase58();

  const ampInstance = useContext(AmplitudeContext);

  // TODO: Just store these
  useEffect(() => {
    PublicKey.findProgramAddress([Buffer.from('freeze')], SEED_SOCIETY_PROGRAM).then(res => {
      setFreezePda(res[0]);
      console.log('freeze bump', res[1]);
    });

    PublicKey.findProgramAddress([Buffer.from('metadata')], SEED_SOCIETY_PROGRAM).then(res => {
      setMetadataPda(res[0]);
      console.log('metadata PDA', res[0].toBase58());
      console.log('metadata bump', res[1]);
    });

    PublicKey.findProgramAddress([Buffer.from('verify')], SEED_SOCIETY_PROGRAM).then(res => {
      setVerifyPda(res[0]);
      console.log('verify PDA', res[0].toBase58());
      console.log('verify bump', res[1]);
    });

    getSeedSocietyProgram(connection, wallet).then(res => {
      setProgram(res);
    });
  }, []);

  useEffect(() => {
    getGardenerPda(wallet.publicKey)
      .then(res => {
        setGardenerPda(res[0]);
        setGardenerBump(res[1]);
        console.log('gardener PDA', res[0].toBase58());
        return getGardenerState(wallet, connection);
      })
      .then(res => setGardenerState(res))
      .catch(e => console.warn('gardener probably not yet initialized'));
  }, [connection, wallet]);

  // Changes with each search
  useEffect(() => {
    // const findingTuberToast = toast('Finding Tuber 🔍', { autoClose: false, isLoading: true });

    getTuberState(wallet, connection, sanitizedName)
      .then(async state => {
        if (!state) {
          toast.warn('Couldn`t find Tuber with that name 😕');
          // toast.dismiss(findingTuberToast);
          console.error('Error loading Tuber with name', sanitizedName);
          return;
        }

        console.log('plant pda', state.pda.toBase58());
        console.log('loading state', state);
        console.log('plant mint', state.mint.toBase58());
        setDisplayName(sanitizedName);
        setTuberState(state);
        getATAForMintUnknownOwner(state.mint, connection)
          .then(res => {
            setPlantToken(res[0]);
            setOwnerId(res[1]);
          });

        const metadataAddress_ = await getMetadataAddress(state.mint);
        setMetadataAddress(metadataAddress_);
        const metadata = await getTuberMetadata(connection, metadataAddress_);

        console.log('loading metadata', metadata);
        setTuberMetadata(metadata);
        // toast.dismiss(findingTuberToast);
        toast.success('Tuber found!', { autoClose: 3000 });
      });

    getATAForMint(wallet.publicKey, ownedMintId)
      .then(res => {
        setOwnedTokenId(res);
      });
  }, [sanitizedName]);

  const refreshData = useCallback(() => {
    console.log('updating tuber callback');
    getTuberState(wallet, connection, sanitizedName)
      .then(state => {
        if (tuberState && state!.level > tuberState.level) {
          // Confetti on adulthood
          if (state!.level === 4) {
            setCongrats(true);
            setTimeout(() => {
              setCongrats(false);
            }, 18000);
            toast.success('This Tuber is now an adult! 🪴');
          } else {
            toast.success('This Tuber advanced a stage! 🥳');
          }
        }
        setTuberState(state!);
      });
    getTuberMetadata(connection, metadataAddress)
      .then(metadata => setTuberMetadata(metadata));
    getGardenerState(wallet, connection)
      .then(res => setGardenerState(res));
  }, [tuberState, metadataAddress, wallet, connection]);

  const onWater = useCallback(async () => {
    if (!program || !tuberState || plantToken === PublicKey.default) {
      return;
    }

    const now = getTimeNowUnixSeconds();
    const gardenerCannotWater = gardenerState && now < gardenerState.waterTimeOutUnix && gardenerState.wateredInTimeframe >= 5;
    const plantCannotBeWatered = now < tuberState.waterTimeOutUnix;
    if (gardenerCannotWater) {
      toast.warn('You`re out of water for this period 🌵');
    }
    if (plantCannotBeWatered) {
      toast.warn('This Tuber was watered recently 🐳');
    }
    if (gardenerCannotWater || plantCannotBeWatered) {
      return;
    }

    const water = program.instruction.water(
      Buffer.from(paddedName),
      gardenerBump,
      {
        accounts: {
          plant: tuberState.pda,
          gardener: gardenerPda,
          // verifyPda: verifyPda,
          authority: wallet.publicKey,
          plantMint: tuberState.mint,
          plantToken: plantToken,
          plantMetadata: metadataAddress,
          ownedPlantMint: ownedMintId,
          ownedPlantToken: ownedTokenId,
          ownedMetadata: metadataAddress, // TODO
          freezeAuthority: freezePda,
          metadataAuthority: metadataPda,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          metadataProgram: programs.metadata.MetadataProgram.PUBKEY
        },
      });

    const txId = (await sendTransaction(
      connection,
      wallet,
      [water],
      [],
      txTimeout,
      false,
      'recent'
    )).txid;

    setWatering(true);
    const finalizePromise = awaitTransactionSignatureConfirmation(txId, txTimeout, connection, true, 'finalized');
    toast.promise(
      finalizePromise,
      {
        pending: 'Watering...',
        success: `Finished watering! Tuber gained ${ownTuber ? 1 : 2} water${ownTuber ? '' : 's'} 💧`,
        error: 'Something went wrong... 😥'
      }
    );

    finalizePromise.then(() => {
      ampInstance.logEvent(Events.WATER_SUCCESS);
      console.log('finalized watering');
      setWatering(false);
      refreshData();
    }).catch(err => {
      setWatering(false);
      console.log('watering tx error', err); // TODO: better errors
      ampInstance.logEvent(Events.WATER_FAIL);
    });
  },
    [
      connection,
      wallet,
      program,
      paddedName,
      tuberState,
      gardenerPda,
      gardenerBump,
      tuberState,
      plantToken,
      metadataAddress,
      ownedMintId,
      ownedTokenId,
      freezePda,
      metadataPda,
      ownTuber
    ]
  );

  const waterCountDownRender: CountdownRendererFn = useCallback(({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Ready for water</span>;
    } else {
      // Render a countdown
      return <span>Can be watered again in {`${hours.toString().length == 2 ? '' : '0'}${hours.toString()}h`}:{`${minutes.toString().length == 2 ? '' : '0'}${minutes.toString()}m`}:{`${seconds.toString().length == 2 ? '' : '0'}${seconds.toString()}s`}</span>;
    }
  }, []);

  const gardenerCountDownRender: CountdownRendererFn = useCallback(({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Just refilled! Please refresh</span>;
    } else {
      // Render a countdown
      return <span>refill in {`${hours.toString().length == 2 ? '' : '0'}${hours.toString()}h`}:{`${minutes.toString().length == 2 ? '' : '0'}${minutes.toString()}m`}:{`${seconds.toString().length == 2 ? '' : '0'}${seconds.toString()}s`}</span>;
    }
  }, []);

  // TODO: Loading visual
  const content = (!ownedTokenId || !metadataAddress || !program || !tuberState || !tuberMetadata || !displayName || ownerId === PublicKey.default) ? null :
    <div className='px-10 xl:w-7/12 max-w-4xl mx-auto'>
      {tuberState.isDead && <h2 className='text-white font-bold mb-3 text-lg'>
        {ownTuber ? `Your` : `${shortenAddress(ownerId.toBase58(), 6, false)}\`s`} Tiny Tuber
      </h2>}
      <div className={`flex flex-col items-center ${tuberState.isDead ? '' : 'xl:items-start lg:flex-row'} space-y-8 lg:space-y-0 lg:space-x-8`}>
        <div className={`${tuberState.isDead ? 'flex flex-col items-center pb-16' : ''}`}>
          {!tuberState.isDead && <h2 className='text-white font-bold mb-3 text-lg'>
            {ownTuber ? `Your` : `${shortenAddress(ownerId.toBase58(), 6, false)}\`s`} Tiny Tuber
          </h2>}
          {tuberState.isDead && <div className='text-white text-center py-14'>This Tuber has withered... 😭</div>}
          <SeedSocietyCard
            title={displayName}
            image={tuberMetadata.photoUri}
            items={[
              { name: 'Owner', value: shortenAddress(ownerId.toBase58()) },
              { name: 'Stage', value: TUBER_STAGES[tuberState.level] },
              { name: 'Family', value: tuberMetadata.family === 'None' ? '?' : tuberMetadata.family },
              { name: 'Total water', value: tuberState.watered }
            ]}
          />
        </div>
        {!tuberState.isDead && <div className='pl-10 max-w-md'>
          <h2 className='text-white font-bold mb-3 text-lg'>
            Water Meter
          </h2>
          <WaterMeter filled={wateredFilled} capacity={wateredCapacity} />
          <div className='flex items-center space-x-2 mt-6 mb-3'>
            <div className='text-xs tracking-widest text-stone-100'>
              {tuberState.level === 4 ? 'This Tuber is all grown up!' : <><strong>Next stage</strong>: {TUBER_STAGES[tuberState.level + 1]}</>}
            </div>
          </div>
          <div className='flex items-center space-x-2 mb-3'>
            <div className='text-xs tracking-widest text-stone-100'>
              <><strong>Last watered</strong>: {tuberState.watered === 0 ? 'Never :(' : getLastWateredFromWaterTimeoutDateString(tuberState.waterTimeOutUnix).toLocaleString()}</>
            </div>
          </div>
          <div className='flex items-center space-x-2 mb-3'>
            <div className='text-xs tracking-widest text-stone-100'>
              <strong>Status</strong>: <Countdown date={new Date(tuberState.waterTimeOutUnix * 1000)} key={Date.now()} renderer={waterCountDownRender} />
            </div>
          </div>
        </div>}
      </div>
      <div>
        {!tuberState.isDead && <div>
          <div className='flex items-center space-x-2 my-6 justify-end'>
            <img
              src='/images/bb-waterdrop.png'
              className='flex-shrink-0 w-5'
              alt=''
            />
            <div className='text-xs tracking-widest text-stone-100'>
              x{watersRemaining} water{watersRemaining === 1 ? '' : 's'} left
              {watersRemaining === 0 && gardenerState ? <><br /><span>(<Countdown date={new Date(gardenerState.waterTimeOutUnix * 1000)} key={Date.now()} renderer={gardenerCountDownRender} />)</span></> : null}
            </div>
          </div>
          <div className='lg:hidden flex items-center space-x-2 justify-end text-white text-xs'>
            click pail to water
          </div>
          <div className='w-72 flex justify-end mx-auto relative'>
            <img
              onClick={onWater}
              src={watering ? '/images/gifs/watering-can.gif' : '/images/nursery/water-pail-sized.png'}
              className={`w-36 lg:translate-x-1/2 ${watering ? '' : 'cursor-pointer hover:brightness-105'}`}
              alt=''
            />
          </div>
        </div>}
        <div className='w-72 h-auto mx-auto relative'>
          <img
            src={tuberState.isDead ? '/images/rip.png' : tuberMetadata.photoUri} // TODO: Loading circle if not loaded?
            className='w-full h-full object-cover'
            alt=''
          />
          <div className='absolute inset-0'>
            <img
              src='/images/nursery/wood-border.png'
              className='w-full h-full'
              alt=''
            />
            {!tuberState.isDead && <div className='absolute hidden lg:block tracking-widest leading-loose top-0 translte-y-5 translate-x-6 left-full text-white z-10 text-xs w-full'>
              ^ <br />
              click to water
            </div>}
          </div>
        </div>
      </div>
      <div className='block w-4/5 mx-auto relative pt-14'>
        {/* <img src='/images/curve-5.png' className='w-full' alt='' /> */}
        <div className='w-24 absolute right-full top-full'>
          <img src={tuberState.isDead ? '/images/gifs/sad-b.gif' : '/images/gifs/bee.gif'} className='w-full' alt='' />
        </div>
      </div>
    </div>;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        bodyClassName='font-dog text-black'
        hideProgressBar={false}
        newestOnTop={false}
      />
      <Search onSearch={setRawSearchName} />
      {congrats ? <img
        src='/images/gifs/confetti.gif'
        className='absolute z-50 top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3'
        alt=''
      /> : null}
      <div className='relative w-full max-w-screen-2xl mx-auto pt-6'>
        <img
          src='/images/nursery/long-nursery.png'
          alt=''
          className='w-full h-full object-cover hidden xl:block'
        />
        <div className='absolute top-[13%] w-full pb-16 pt-16 xl:pt-10'>
          {content}
        </div>
      </div>
    </>
  );
};

export default TinyTuber;
