import WoodBorder from './WoodBorder';

const TinyTubers = () => {
  return (
    <WoodBorder>
      <div className='py-16 relative w-full h-full'>
        <div className='relative z-10'>
          <h2 className='text-stone-700 font-heading text-4xl text-center'>
            Tiny Tubers
          </h2>
          <div className='space-y-20 mt-12 text-2xs'>
            <div className='md:flex md:items-center'>
              <div className='w-64 md:w-72 lg:w-80 flex-shrink-0'>
                <img src='/images/333-sign-1.png' className='w-full' alt='' />
              </div>
              <div className='flex-grow flex flex-col items-center px-5 lg:px-10'>
                <p className='text-center text-stone-700 mb-2'>
                  <strong>444 Tiny Tubers</strong> in the Seed Society genesis collection, each with a unique name
                </p>
                <div className='flex items-center space-x-5'>
                  <div className='w-32'>
                    <img
                      src='/images/gifs/sol-watering-grow.gif'
                      alt='Image'
                      className='w-full'
                    />
                  </div>
                  <p className='text-black text-base -mb-7 font-bold'>x 444</p>
                </div>
              </div>
            </div>
            <div className='md:flex md:items-center'>
              <div className='w-64 md:w-72 lg:w-80 flex-shrink-0'>
                <img src='/images/333-sign-2.png' className='w-full' alt='' />
              </div>
              <div className='flex-grow flex flex-col items-center px-5 lg:px-10'>
                <p className='text-center text-stone-700 mb-2'>
                  <strong>4 types of Tubers</strong> representing different root vegetables
                </p>
                <div className='grid w-full place-items-center grid-cols-2 lg:grid-cols-4 gap-4'>
                  <div>
                    <img
                      src='/images/gifs/family-1.gif'
                      className='w-32'
                      alt=''
                    />
                    <h3 className='font-bold text-black mt-1 text-center text-xs md:text-sm'>
                      Daikon
                    </h3>
                  </div>
                  <div>
                    <img
                      src='/images/gifs/family-2.gif'
                      className='w-32'
                      alt=''
                    />
                    <h3 className='font-bold text-black mt-1 text-center text-xs md:text-sm'>
                      Beet
                    </h3>
                  </div>
                  <div>
                    <img
                      src='/images/gifs/family-3.gif'
                      className='w-32'
                      alt=''
                    />
                    <h3 className='font-bold text-black mt-1 text-center text-xs md:text-sm'>
                      Turnip
                    </h3>
                  </div>
                  <div>
                    <img
                      src='/images/gifs/family-4.gif'
                      className='w-32'
                      alt=''
                    />
                    <h3 className='font-bold text-black mt-1 text-center text-xs md:text-sm'>
                      Carrot
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='md:flex md:items-center'>
              <div className='w-64 md:w-72 lg:w-80 flex-shrink-0'>
                <img src='/images/333-sign-5.png' className='w-full' alt='' />
              </div>
              <div className='flex-grow flex flex-col items-center px-5 lg:px-10'>
                <p className='text-center text-stone-700 mb-2 leading-loose'>
                  <strong>111+ unique Tuber attributes</strong>, as well as a number of
                  rare and 1/1 accessory sets
                </p>
                <div className='lg:flex justify-around items-end w-full lg:space-x-5 space-y-10 lg:space-y-0'>
                  <div className='flex flex-col items-center'>
                    <img
                      src='/images/gifs/accessoriy-types.gif'
                      className='h-32'
                      alt=''
                    />
                    <h3 className='font-bold text-black mt-2 text-center text-xs md:text-sm'>
                      Accessories
                    </h3>
                  </div>
                  <div className='flex flex-col items-center'>
                    <img
                      src='/images/gifs/bowl-types.gif'
                      className='h-36'
                      alt=''
                    />
                    <h3 className='font-bold text-black mt-2 text-center text-xs md:text-sm'>
                      &nbsp;&nbsp;Pots&nbsp;&nbsp;
                    </h3>
                  </div>
                  <div className='flex flex-col items-center'>
                    <img
                      src='/images/gifs/bg-options.gif'
                      className='h-28'
                      alt=''
                    />
                    <h3 className='font-bold text-black mt-2 text-center text-xs md:text-sm'>
                      Backgrounds
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='md:flex md:items-center'>
              <div className='w-64 md:w-72 lg:w-80 flex-shrink-0'>
                <img src='/images/333-sign-3.png' className='w-full' alt='' />
              </div>
              <div className='flex-grow flex flex-col items-center px-5 lg:px-10'>
                <p className='text-center text-stone-700 mb-2 leading-loose'>
                  <strong>5 stages of growth</strong> which require dilligent watering
                  and care to advance through
                </p>
                <div className='flex flex-col items-center justify-center'>
                  <img
                    src='/images/gifs/seed-sprout.gif'
                    className='w-40'
                    alt=''
                  />
                </div>
              </div>
            </div>
            <div className='md:flex md:items-center'>
              <div className='w-64 md:w-72 lg:w-80 flex-shrink-0'>
                <img src='/images/333-sign-4.png' className='w-full' alt='' />
              </div>
              <div className='flex-grow flex flex-col items-center px-5 lg:px-10'>
                <p className='text-center text-stone-700 mb-4 leading-loose'>
                  Tiny Tubers are <strong>untradeable</strong> until they reach adulthood
                </p>
                <div className='flex flex-col items-center justify-center'>
                  <img
                    src='/images/gifs/unlockit.gif'
                    className='w-40'
                    alt=''
                  />
                </div>
              </div>
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

export default TinyTubers;
