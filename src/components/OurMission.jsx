import WoodBorder from './WoodBorder';

const OurMission = () => {
  return (
    <WoodBorder>
      <div className='px-2 sm:px-20 py-10 lg:py-12 w-full h-full relative'>
        <div className='relative z-10'>
          <h2 className='text-stone-700 font-heading text-4xl text-center'>
            Our Mission
          </h2>
          <div className='mt-12 text-2xs'>
            <p className='text-stone-700 leading-loose text-center md:text-left'>
              Seed Society is a very special social experiment. With your help,
              we aim to create an NFT community where <span className='text-stone-700 font-bold'>commitment is recognized</span>,
              where <span className='text-stone-700 font-bold'>patience is rewarded</span>, and where everyone thrives when they <span className='text-stone-700 font-bold'>root for each other</span>.
            </p>
            <p className='text-stone-700 mb-2 text-center md:text-left mt-12'>
              To reach those goals, we asked ourselves:
            </p>
            <ul className='space-y-3 list-disc text-stone-700 leading-loose text-center md:text-left [list-style-image:url(/images/bb-waterdrop-tiny.png)]'>
              <li>
                How can we encourage <strong>kindness, play, and generosity</strong>?
              </li>
              <li>
                How can we cultivate an NFT community that values <strong>commitment over profit</strong>?
              </li>
              <li>
                How can NFTs provide shared experiences that <strong>connect strangers</strong>?
              </li>
            </ul>
          </div>
          <div className='flex items-center justify-center space-x-5 mt-10'>
            <img
              src='/images/gifs/heart-2.gif'
              className='w-14 sm:w-16 object-contain'
              alt=''
            />
            <p className='uppercase text-black font-medium sm:text-2xl'>
              WAGMI
            </p>
            <img
              src='/images/gifs/heart-2.gif'
              className='w-14 sm:w-16 object-contain'
              alt=''
            />
          </div>
        </div>

        <div className='absolute top-0 inset-x-0 z-0'>
          <img
            src='/images/our-mission-bg-sky-1.jpg'
            className='w-full h-full object-cover'
            alt=''
          />
        </div>
        <div className='absolute bottom-0 inset-x-0 z-0'>
          <img
            src='/images/our-mission-bg-sky-2.jpg'
            className='w-full h-full object-cover'
            alt=''
          />
        </div>
      </div>
    </WoodBorder>
  );
};

export default OurMission;
