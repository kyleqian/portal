import WoodBorder from './WoodBorder';

const HowToWater = () => {
  return (
    <WoodBorder>
      <div className='py-16 relative w-full h-full'>
        <div className='px-2 sm:px-10 lg:px-20 relative z-10'>
          <h2 className='text-stone-700 font-heading text-4xl text-center'>
            How to Water
          </h2>
          <div className='lg:flex mt-10'>
            <div className='lg:flex-1'>
              <ol className='list-decimal text-2xs leading-loose text-stone-700'>
                <li className='ml-10'>Enter the <strong>Nursery</strong></li>
                <li className='ml-10'>Connect your wallet</li>
                <li className='ml-10'>
                  <span>
                    Search <strong>any Tiny Tuber</strong> (yours or someone else’s) by
                    their unique name
                  </span>
                  <div className='mt-2 mb-4 -ml-10 sm:-ml-0'>
                    <img src='/images/nursery.png' className='w-80' alt='' />
                  </div>
                </li>
                <li className='ml-10'>
                  <span>Water the Tuber! Progress is tracked on-chain</span>
                  <div className='mt-1 -ml-10 sm:-ml-0'>
                    <img
                      src='/images/water.png'
                      className='w-80 lg:w-full'
                      alt=''
                    />
                  </div>
                </li>
              </ol>
            </div>
            <div className='hidden lg:block lg:flex-1 px-5'>
              <div className='w-4/5'>
                <img src='/images/gifs/sleep-new-fuporaton.gif' alt='' />
              </div>
            </div>
          </div>
          <div className='flex justify-center mt-5 sm:mt-0 lg:w-[90%] mx-auto'>
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
          <div className='mt-12 flex justify-center md:justify-start'>
            <div className='w-36 sm:w-40'>
              <img
                src='/images/gifs/pouring-can-2.gif'
                className='w-full'
                alt=''
              />
            </div>
          </div>
        </div>
        <div className='absolute top-0 inset-x-0 z-0'>
          <img
            src='/images/tuber-sky-bg-1.jpg'
            className='w-full h-full object-cover'
            alt=''
          />
        </div>
        <div className='absolute bottom-0 inset-x-0 z-0'>
          <img
            src='/images/tuber-sky-bg-2.jpg'
            className='w-full h-full object-cover'
            alt=''
          />
        </div>
      </div>
    </WoodBorder>
  );
};

export default HowToWater;
