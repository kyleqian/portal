import { useEffect, useState } from "react";
import { GardenerLeaderboardEntry, getTopGardeners } from "../../src/nursery/SeedSociety";
import Loading from "./components/common/Loading";

const LeaderboardContent = () => {
  const [gardeners, setGardeners] = useState<GardenerLeaderboardEntry[]>();

  useEffect(() => {
    getTopGardeners().then(setGardeners);
  }, []);

  const content = gardeners ?
    <div>
      <p className='text-center text-2xl py-8'>
        <strong>🏆 Top Gardeners 🏆</strong>
      </p>
      <p className='text-center text-sm pb-8'>
        Seed Citizens who help others the most
      </p>
      <div className='pl-20'>
        {gardeners.map((gardener, index) => {
          let place;
          let bold = false;
          let paddingBottom = false;
          switch (index) {
            case 0:
              place = '🥇';
              bold = true;
              break;
            case 1:
              place = '🥈';
              bold = true;
              break;
            case 2:
              place = '🥉';
              bold = true;
              paddingBottom = true;
              break;
            default:
              place = index + 1;
              break;
          }
          return (
            <p className={`py-2 text-md ${paddingBottom ? 'pb-8' : ''}`} key={gardener.name}>
              <strong>{place}</strong> <span className={`${bold ? 'font-bold' : ''}`}>{gardener.name}</span> ({gardener.wateredOthers})
            </p>
          );
        })}
      </div>
    </div>
    : <Loading />;

  return (
    <div className='relative w-full max-w-screen-2xl mx-auto'>
      <img
        src='/images/nursery/long-nursery.png'
        alt=''
        className='w-full h-full object-cover hidden xl:block'
      />
      <div className='absolute top-[13%] w-full py-10 xl:py-0 flex flex-col items-center text-white'>
        {content}
      </div>
    </div>
  );
};

export default LeaderboardContent;
