import SeedSocietyCard from './common/SeedSocietyCard';

import { useEffect, useState, useCallback, useContext } from 'react';
import { getATAForMint, getMetadataAddress, getPlantPda, getSeedSocietyProgram, getTuberMetadata, processRawName, TuberMetadata } from '../SeedSociety';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { NodeWallet } from '@metaplex/js';
import { sendTransaction } from '../connection';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  awaitTransactionSignatureConfirmation,
  shortenAddress
} from '../CandyMachine2';

import { AmplitudeContext, Events } from "../../AmplitudeContext";
import { useRouter } from 'next/router';

interface EnrollTuberProps {
  mintAddress?: PublicKey,
  txTimeout: number
}

const EnrollTuber = (props: EnrollTuberProps) => {
  const [program, setProgram] = useState<Program>();
  const [tuberMetadata, setTuberMetadata] = useState<TuberMetadata>();
  const [plantPda, setPlantPda] = useState(PublicKey.default);
  const [plantBump, setPlantBump] = useState(0);
  const [paddedName, setPaddedName] = useState('');
  const [plantToken, setPlantToken] = useState(PublicKey.default);
  const ampInstance = useContext(AmplitudeContext);

  const router = useRouter();
  const connection = useConnection().connection;
  const wallet = useAnchorWallet() as NodeWallet;

  useEffect(() => {
    getSeedSocietyProgram(connection, wallet).then(setProgram);
  }, [connection, wallet]);

  useEffect(() => {
    if (!props.mintAddress) {
      return;
    }

    getMetadataAddress(props.mintAddress)
      .then(res => getTuberMetadata(connection, res))
      .then(res => {
        console.log('loading metadata', res);
        setTuberMetadata(res);
        const [m_sanitizedName, m_paddedName] = processRawName(res.name);
        setPaddedName(m_paddedName);
        return getPlantPda(m_sanitizedName);
      })
      .then(res => {
        setPlantPda(res[0]);
        setPlantBump(res[1]);
      });

    getATAForMint(wallet.publicKey, props.mintAddress)
      .then(res => setPlantToken(res));
  }, [props.mintAddress]);

  const onEnroll = useCallback(async () => {
    if (!program || !props.mintAddress || !tuberMetadata || plantPda === PublicKey.default) {
      return;
    }

    const init = program.instruction.init(
      Buffer.from(paddedName),
      plantBump,
      {
        accounts: {
          plant: plantPda,
          plantMint: props.mintAddress,
          plantToken: plantToken,
          plantMetadata: tuberMetadata.metadataAddress,
          authority: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
      });

    const txId = (await sendTransaction(
      connection,
      wallet,
      [init],
      [],
      props.txTimeout,
      false,
      'recent'
    )).txid;

    const finalizePromise = awaitTransactionSignatureConfirmation(txId, props.txTimeout, connection, true, 'finalized');
    toast.promise(
      finalizePromise,
      {
        pending: 'Enrolling...',
        success: 'Finished enrolling!',
        error: 'Something went wrong... 😥'
      }
    );

    finalizePromise.then(() => {
      ampInstance.logEvent(Events.ENROLL_SUCCESS);
      console.log('finalized enrollment');
      router.push('/nursery');
    }).catch(err => {
      console.log('enroll tx error', err); // TODO: better errors
      ampInstance.logEvent(Events.ENROLL_FAIL);
    });
  },
    [
      props,
      connection,
      tuberMetadata,
      connection,
      paddedName,
      plantBump,
      plantPda,
      plantToken,
      wallet
    ]
  );

  if (!tuberMetadata) {
    console.log('no metadata for enrollment');
    return null;
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        bodyClassName='font-dog text-black'
        hideProgressBar={false}
        newestOnTop={false}
      />

      <div className='relative w-full max-w-screen-2xl mx-auto'>
        <img
          src='/images/nursery/shorter-nursery.png'
          alt=''
          className='w-full h-full object-cover hidden xl:block'
        />
        <div className='absolute top-[20%] w-full py-10 xl:py-0'>
          <div className='px-3 sm:px-10 xl:px-0 xl:w-7/12 max-w-4xl mx-auto'>
            <p className='text-center text-white text-sm leading-loose tracking-widest mb-3 font-bold'>
              A new fresh Tuber is born!
            </p>

            <p className='text-center text-white text-sm leading-loose tracking-widest font-bold'>
              Enroll your Tuber to join the Seed Society.
            </p>

            <div className='my-16 flex justify-center'>
              <SeedSocietyCard
                image={tuberMetadata.photoUri}
                title={tuberMetadata.name}
                items={[
                  { name: 'Owner', value: shortenAddress(wallet.publicKey.toBase58()) },
                  { name: 'Stage', value: 'Seed' },
                  { name: 'Family', value: '?' },
                  { name: 'Total water', value: '0' }
                ]}
              />
            </div>
            <div className='text-center'>
              <button
                onClick={onEnroll}
                className='text-black bg-[#EADCB8] px-10 inline-block text-xs sm:text-sm hover:bg-opacity-70 transition h-16'
              >
                Enroll Tuber
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollTuber;
