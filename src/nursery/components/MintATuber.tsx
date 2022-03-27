import { NodeWallet } from "@metaplex/js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState, useCallback, useContext } from "react";
import Wallet from "../TempNodeWallet";
import * as anchor from "@project-serum/anchor";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  CandyMachineAccount,
  awaitTransactionSignatureConfirmation,
  CANDY_MACHINE_INSTANCE,
  getCandyMachineState,
  mintOneToken,
} from '../CandyMachine2';
import { AmplitudeContext, Events } from "../../AmplitudeContext";

interface MintATuberProps {
  setMinted: (minted: boolean) => void,
  txTimeout: number,
  ownedPlants?: [any]
}

const MintATuber = ({ setMinted, txTimeout, ownedPlants }: MintATuberProps) => {
  const wallet = useAnchorWallet() as NodeWallet;
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const connection = useConnection().connection;
  const ampInstance = useContext(AmplitudeContext);

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) {
        return;
      }

      const candyMachine = await getCandyMachineState(
        wallet as Wallet,
        CANDY_MACHINE_INSTANCE,
        connection,
      );

      console.log('cm id', candyMachine.id.toBase58());
      setCandyMachine(candyMachine);
    })();
  };

  const canMint = candyMachine && !candyMachine.state.isSoldOut && !(ownedPlants && ownedPlants.length > 1);
  // const canMint = false;

  const onMint = useCallback(async () => {
    try {
      if (!wallet || !candyMachine?.program) {
        return;
      }

      if (!canMint) {
        return;
      }

      const mint = anchor.web3.Keypair.generate();
      const mintTxId = (await mintOneToken(candyMachine, wallet.publicKey, mint, 'recent'))[0];

      let status: any = { err: true };
      if (mintTxId) {
        const txPromise = awaitTransactionSignatureConfirmation(
          mintTxId,
          txTimeout,
          connection,
          true,
          'finalized'
        );

        toast.promise(
          txPromise,
          {
            pending: 'Minting... 🌱',
            success: 'Woohoo! Mint successful! 🥳',
            error: 'Something went wrong... 😥'
          }
        );

        status = await txPromise;
        console.log('mintTxId', mintTxId);
        console.log(status);
      }
    } catch (error: any) {
      const errorStr = error.toString();
      console.error('Minting error:', errorStr);
      if (errorStr.indexOf('0x134') >= 0) {
        console.error('Not enough SOL to mint');
        toast.error('Not enough SOL to mint');
      } else if (errorStr.indexOf('0x137') >= 0) {
        console.error('Whitelist token not found');
        toast.error('Whitelist token not found');
      }
      ampInstance.logEvent(Events.MINT_FAIL);
    } finally {
      ampInstance.logEvent(Events.MINT_SUCCESS);
      setMinted(true);
      refreshCandyMachineState();
    }
  }, [wallet, candyMachine]);

  useEffect(refreshCandyMachineState, [
    wallet,
    CANDY_MACHINE_INSTANCE,
    connection,
  ]);

  let buttonMessage;
  if (canMint) {
    buttonMessage = 'Mint a Tuber';
  } else if (candyMachine?.state.isSoldOut) {
    buttonMessage = 'Sold out!';
  } else if (ownedPlants && ownedPlants.length > 1) {
    buttonMessage = 'Mint a Tuber';
  } else {
    buttonMessage = 'Check back later!';
  }
  const button = wallet ?
    <button
      onClick={onMint}
      className={`text-black bg-[#EADCB8] px-10 inline-block text-xs sm:text-sm ${!canMint ? 'bg-opacity-70' : ''} hover:bg-opacity-70 transition h-16`}
      disabled={!canMint}
    >
      {buttonMessage}
    </button> :
    <WalletMultiButton
      className='text-black bg-[#EADCB8] px-10 inline-block text-xs sm:text-sm hover:bg-opacity-70 transition rounded-none font-dog h-16 font-normal'
      startIcon={undefined}
    >
      Connect Wallet
    </WalletMultiButton>;

  const title = wallet ? (ownedPlants && ownedPlants.length > 0 ? 'Welcome back to the Nursery!' : 'It looks like you don`t have a Tiny Tuber yet!') : <>Welcome to the Nursery!<br /><br />Please connect your wallet to continue.</>;
  const subtitle = wallet ?
    <>
      <p>Cost: 0.5 SOL</p>
      <p>Supply: {candyMachine?.state.itemsRemaining} remaining</p>
      <p>You own {ownedPlants ? ownedPlants.length : 0} Tuber{ownedPlants && ownedPlants.length === 1 ? '' : 's'} (max 2)</p>
      <br />
      <p><strong>To avoid any surprises,<br />please read the watering rules below before minting!</strong></p>
    </> :
    <></>;

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
          src='/images/nursery/long-nursery.png'
          alt=''
          className='w-full h-full object-cover hidden xl:block'
        />
        <div className='absolute top-[15%] w-full py-10 xl:py-0'>
          <div className='px-3 sm:px-10 xl:px-0 xl:w-7/12 max-w-4xl mx-auto'>
            <p className='text-center text-white text-xs md:text-sm leading-loose px-24'>
              {title}
            </p>
            <div className='w-40 h-auto mx-auto mt-6 relative'>
              <img
                src='/images/nursery/tuber-mint.gif'
                className='w-full h-full object-cover'
                alt=''
              />
              <div className='absolute inset-0'>
                <img
                  src='/images/nursery/wood-border.png'
                  className='w-full h-full'
                  alt=''
                />
              </div>
            </div>
            <div className='text-center text-stone-200 leading-loose mt-6 text-xs'>
              {subtitle}
            </div>
            <div className='text-center py-6'>
              {button}
            </div>
            <div className="mb-4">
              <img
                src='/images/watering-rules-2x.png'
                className='hidden sm:block'
                alt=''
              />
              <img
                src='/images/watering-rules-2x-sm.png'
                className='sm:hidden'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintATuber;
