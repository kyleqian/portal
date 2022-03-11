import NurseryFrame from "../../src/nursery/components/common/NurseryFrame";
import MintingContent from "../../src/nursery/MintingContent";
import { AmplitudeContext, AmpInstance, Events } from '../../src/AmplitudeContext';
import { useEffect } from "react";

const MintingIndex = () => {
  useEffect(() => AmpInstance.logEvent(Events.VISIT_MINTING), []);

  return (
    <AmplitudeContext.Provider value={AmpInstance}>
      <NurseryFrame>
        <MintingContent />
      </NurseryFrame>
    </AmplitudeContext.Provider>
  );
};

export default MintingIndex;
