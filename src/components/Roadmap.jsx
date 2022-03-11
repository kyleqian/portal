import WoodBorder from './WoodBorder';

const Roadmap = () => {
  return (
    <WoodBorder>
      <div className='pt-16 relative w-full h-full'>
        <div className='relative z-10 px-2 sm:px-10'>
          <h2 className='text-stone-700 font-heading text-4xl text-center'>
            Roadmap
          </h2>
          <div className='mt-12 flex flex-col space-y-8 text-2xs'>
            <div className='lg:flex items-center lg:space-x-10'>
              <div className='flex flex-1 space-x-2'>
                <div className='w-6 h-6 flex items-center justify-center flex-shrink-0'>
                  <img
                    src='/images/bb-waterdrop-1.png'
                    className='w-full h-full object-contain'
                    alt=''
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='text-stone-600 font-bold mb-2'>
                    Tuber Minting
                  </h4>
                  <p className='text-stone-600 leading-loose'>
                    Mint your <strong>Tiny Tuber</strong> in
                    the Nursery. From then on, this Tuber is under your care, and
                    is <strong>untradeable</strong> until it reaches adulthood. Following whitelists will be announced in the coming weeks.
                  </p>
                </div>
              </div>
              <div className='hidden lg:block flex-1 -mb-10'>
                <div>
                  <img src='/images/curve-1.png' alt='' />
                </div>
              </div>
            </div>
            <div className='lg:flex items-center justify-center lg:space-x-10'>
              <div className='hidden lg:block flex-1 -mb-10'>
                <div className='flex justify-end'>
                  <img src='/images/curve-2.png' alt='' />
                </div>
              </div>
              <div className='flex flex-1 space-x-2'>
                <div className='w-6 h-6 flex items-center justify-center flex-shrink-0'>
                  <img
                    src='/images/bb-waterdrop-1.png'
                    className='w-full h-full object-contain'
                    alt=''
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='text-stone-600 font-bold mb-2'>
                    2022 Q1: Tuber Nursery
                  </h4>
                  <p className='text-stone-600 leading-loose'>
                    Grow your Tiny Tuber by watering it in the Nursery. <strong>Collaborate with other gardeners</strong> in the Seed Society
                    Discord.
                  </p>
                </div>
              </div>
            </div>
            <div className='flex justify-end lg:hidden'>
              <div className='w-16'>
                <img src='/images/gifs/bee-2.gif' className='w-full' alt='' />
              </div>
            </div>
            <div className='lg:flex items-center lg:space-x-10'>
              <div className='flex flex-1 space-x-2'>
                <div className='w-6 h-6 flex items-center justify-center flex-shrink-0'>
                  <img
                    src='/images/bb-waterdrop-1.png'
                    className='w-full h-full object-contain'
                    alt=''
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='text-stone-600 font-bold mb-2'>
                    2022 Q1: The Gardener Leaderboard
                  </h4>
                  <p className='text-stone-600 leading-loose'>
                    Climb the leaderboard by helping water other gardeners` Tubers.
                    <strong>The most generous gardeners will be
                      invited to the Seed Council</strong>, and will have a greater impact
                    on the expansion of Seed Society.
                  </p>
                </div>
              </div>
              <div className='hidden lg:block flex-1 -mb-10'>
                <div>
                  <img src='/images/curve-3.png' alt='' />
                </div>
              </div>
            </div>
            <div className='lg:flex items-center justify-center lg:space-x-10'>
              <div className='hidden lg:block flex-1 -mb-52'>
                <div className='flex justify-end'>
                  <img src='/images/curve-4.png' alt='' />
                </div>
              </div>
              <div className='flex flex-1 space-x-2'>
                <div className='w-6 h-6 flex items-center justify-center flex-shrink-0'>
                  <img
                    src='/images/bb-waterdrop-1.png'
                    className='w-full h-full object-contain'
                    alt=''
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='text-stone-600 font-bold mb-2'>
                    2022 Q1/Q2: Tuber Graduation
                  </h4>
                  <p className='text-stone-600 leading-loose'>
                    Celebrate - your Tuber is now all grown up! Keep your Tuber
                    in your collection, or share it with others. Tiny Tubers
                    will be <strong>listed in Magic Eden</strong> and other marketplaces.
                  </p>
                </div>
              </div>
            </div>
            <div className='lg:pt-36'>
              <div className='flex flex-1 space-x-2 lg:w-1/2'>
                <div className='w-6 h-6 flex items-center justify-center flex-shrink-0'>
                  <img
                    src='/images/bb-waterdrop-1.png'
                    className='w-full h-full object-contain'
                    alt=''
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='text-stone-600 font-bold mb-2'>
                    2022 Q2: The Seed Society Expansion
                  </h4>
                  <p className='text-stone-600 leading-loose'>
                    Gardeners with fully grown Tubers will gain seed access to
                    future growable collections and community exclusives.
                  </p>
                </div>
              </div>
              <div className='hidden lg:block w-3/5 mx-auto relative'>
                <img src='/images/curve-5.png' className='w-full' alt='' />
                <div className='w-16  absolute left-full bottom-full translate-y-1/2'>
                  <img src='/images/gifs/bee-2.gif' className='w-full' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='relative z-20 flex space-x-3 sm:space-x-10 justify-center md:justify-end items-end px-3 sm:px-10'>
          <div className='relative w-32'>
            <img src='/images/roadmap-box-2.png' className='w-full' alt='' />
            <div className='absolute bottom-full left-full z-10 w-12 h-12 -translate-x-7 translate-y-2'>
              <img
                src='/images/gifs/snoring-zz.gif'
                className='w-full h-full object-contain'
                alt=''
              />
            </div>
          </div>
          <div className='relative w-32 hidden md:block'>
            <img src='/images/roadmap-box-1.png' className='w-full' alt='' />
          </div>
          <div className='relative w-32'>
            <img src='/images/roadmap-box-3.png' className='w-full' alt='' />
            <div className='absolute bottom-full left-full z-10 w-12 h-12 -translate-x-7 translate-y-2'>
              <img
                src='/images/gifs/snoring-zz.gif'
                className='w-full h-full object-contain'
                alt=''
              />
            </div>
          </div>
          <div className='relative w-32'>
            <img src='/images/roadmap-box-4.png' className='w-full' alt='' />
          </div>
        </div>

        <div className='absolute top-0 inset-x-0 z-0'>
          <img
            src='/images/roadmap-sky-bg.jpg'
            className='w-full h-full object-cover'
            alt=''
          />
        </div>

        <div className='relative z-10 w-full overflow-hidden -mt-2 md:-mt-6'>
          <img src='/images/grass-2.png' className='w-full h-auto' alt='' />
        </div>
      </div>
    </WoodBorder>
  );
};

export default Roadmap;
