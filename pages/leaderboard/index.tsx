import NurseryFrame from "../../src/nursery/components/common/NurseryFrame";
import LeaderboardContent from "../../src/nursery/LeaderboardContent";
import { AmplitudeContext, AmpInstance, Events } from '../../src/AmplitudeContext';
import { useEffect } from "react";

const GardenerLeaderboard = () => {
  useEffect(() => AmpInstance.logEvent(Events.LEADERBOARD), []);

  return (
    <AmplitudeContext.Provider value={AmpInstance}>
      <NurseryFrame>
        <LeaderboardContent />
      </NurseryFrame>
    </AmplitudeContext.Provider>
  );
};

export default GardenerLeaderboard;
