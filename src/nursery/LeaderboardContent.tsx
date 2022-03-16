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
      <p className='flex flex-row items-center justify-center text-center text-2xl py-8 gap-6'>
        <img src="/images/trophy.png" className='w-16' />
        <strong>Top Gardeners</strong>
        <img src="/images/trophy.png" className='w-16' />
      </p>
      <p className='text-center text-sm pb-8'>
        Most waters given to other gardeners` plants
      </p>
      <div className='pl-36 text-[0.85rem]'>
        {gardeners.map((gardener, index) => {
          let place;
          let bold = false;
          switch (index) {
            case 0:
              place = '';
              bold = true;
              break;
            case 1:
              place = '';
              bold = true;
              break;
            case 2:
              place = '';
              bold = true;
              break;
            default:
              place = index + 1;
              break;
          }
          return (
            <p className={`flex flex-row items-center gap-4 py-2 text-md`} key={gardener.name}>
              {index === 0 && <img src='/images/1.png' className='w-8' />}
              {index === 1 && <img src='/images/2.png' className='w-8' />}
              {index === 2 && <img src='/images/3.png' className='w-8' />}
              {index > 2 && <strong className='pl-2'>{place}</strong>}
              <span className={`${bold ? 'font-bold' : ''}`}>{gardener.name}</span> ({gardener.wateredOthers})
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
