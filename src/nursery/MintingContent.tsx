import { useEffect, useState } from "react";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import EnrollTuber from '../../src/nursery/components/EnrollTuber';
import MintATuber from '../../src/nursery/components/MintATuber';
import NurseryLoading from '../../src/nursery/components/common/NurseryLoading';

import { fetchOwnedTubers, getTuberState } from "../../src/nursery/SeedSociety";
import { NodeWallet } from '@metaplex/js';
import { PublicKey } from '@solana/web3.js';

const MintingContent = () => {
  const [ownedPlants, setOwnedPlants] = useState<[any]>();
  const [unenrolledPlant, setUnenrolledPlant] = useState<any>();
  const [newlyMinted, setNewlyMinted] = useState(false);
  const [step, setStep] = useState(1);

  const changeStep = (newStep: number) => {
    if (newStep !== step) {
      setStep(newStep);
    }
  };

  const connection = useConnection().connection;
  const wallet = useAnchorWallet() as NodeWallet;
  const txTimeout = 60000; // Generous enough?

  useEffect(() => {
    if (!wallet) {
      return;
    }

    console.log('newly minted', newlyMinted);

    fetchOwnedTubers(wallet.publicKey)
      .then(async res => {
        if (res.length > 0) {
          setOwnedPlants(res);
          for (const plant of res) {
            const state = await getTuberState(wallet as NodeWallet, connection, plant.name);
            if (!state) {
              setUnenrolledPlant(plant);
              changeStep(3);
              return;
            }
          }
        }
        changeStep(2);
      });
  }, [wallet, newlyMinted]);

  const renderPage = () => {
    switch (step) {
      case 1:
        return <NurseryLoading />;
      case 2:
        return <MintATuber ownedPlants={ownedPlants} setMinted={setNewlyMinted} txTimeout={txTimeout} />;
      case 3:
        return <EnrollTuber
          mintAddress={unenrolledPlant ? new PublicKey(unenrolledPlant.mint) : PublicKey.default}
          txTimeout={txTimeout}
        />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
};

export default MintingContent;
