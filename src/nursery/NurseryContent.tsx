import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import TinyTuber from '../../src/nursery/components/TinyTuber';
import NurseryLoading from '../../src/nursery/components/common/NurseryLoading';

import { fetchOwnedTubers, getTuberState, TuberState } from "../../src/nursery/SeedSociety";
import { NodeWallet } from '@metaplex/js';
import { PublicKey } from '@solana/web3.js';

const NurseryContent = () => {
  const [ownedPlant, setOwnedPlant] = useState<TuberState>();
  const [step, setStep] = useState(1);

  const changeStep = (newStep: number) => {
    if (newStep !== step) {
      setStep(newStep);
    }
  };

  const router = useRouter();
  const connection = useConnection().connection;
  const wallet = useAnchorWallet() as NodeWallet;
  const txTimeout = 60000; // Generous enough?

  useEffect(() => {
    if (!wallet) {
      return;
    }

    fetchOwnedTubers(wallet.publicKey)
      .then(async res => {
        if (res.length > 0) {
          const tubers = [];
          for (const plant of res) {
            const state = await getTuberState(wallet as NodeWallet, connection, plant.name);
            if (!state) {
              router.push('/minting');
              return;
            }
            tubers.push(state);
          }
          tubers.sort((a, b) => b.watered - a.watered);
          setOwnedPlant(tubers[0]);
          changeStep(2);
        } else {
          router.push('/minting');
        }
      });
  }, [wallet]);

  const renderPage = () => {
    switch (step) {
      case 1:
        return <NurseryLoading />;
      case 2:
        return <TinyTuber
          ownedMintId={ownedPlant ? new PublicKey(ownedPlant.mint) : PublicKey.default}
          defaultName={ownedPlant ? ownedPlant.name : ''}
          txTimeout={txTimeout} />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
};

export default NurseryContent;
