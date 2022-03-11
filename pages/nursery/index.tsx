import NurseryFrame from "../../src/nursery/components/common/NurseryFrame";
import NurseryContent from "../../src/nursery/NurseryContent";
import { AmplitudeContext, AmpInstance, Events } from '../../src/AmplitudeContext';
import { useEffect } from "react";

const NurseryIndex = () => {
  useEffect(() => AmpInstance.logEvent(Events.VISIT_NURSERY), []);

  return (
    <AmplitudeContext.Provider value={AmpInstance}>
      <NurseryFrame>
        <NurseryContent />
      </NurseryFrame>
    </AmplitudeContext.Provider>
  );
};

export default NurseryIndex;
