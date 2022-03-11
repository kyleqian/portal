import { AmplitudeContext, Events } from '../AmplitudeContext';
import { useContext } from 'react';
import Header from './Header';

const Banner = () => {
  const ampInstance = useContext(AmplitudeContext);

  return (
    <div
      id='header'
      className='w-full min-h-screen h-full lg:h-screen relative py-5'
    >
      <div className='fixed inset-0 z-[-1]'>
        <img
          src='/images/longer-sky-bg.jpg'
          className='hidden sm:block w-full h-full object-cover object-center'
          alt=''
        />
        <img
          src='/images/longer-sky bg-mobile.jpg'
          className='sm:hidden w-full h-full object-cover object-center'
          alt=''
        />
      </div>
      <Header />
      <div className='flex flex-col h-full'>
        <div className='w-full md:w-[500px] xl:w-[600px] mx-auto mt-12 px-5'>
          <img src='/images/sign.png' className='w-full' />
        </div>
        <div className='px-5 md:flex w-full justify-evenly flex-row items-center max-w-screen-3xl mx-auto lg:px-20 xl:px-40'>
          <div className='hidden md:block w-1/2 lg:w-2/5 md:order-last lg:px-5 relative mt-12 md:mt-0'>
            <img
              src='/images/gifs/gif-landing.gif'
              className='md:w-full object-contain h-72 md:h-96'
              alt=''
            />
          </div>
          <div className='md:w-1/2 relative h-full flex flex-col justify-center lg:max-w-xl'>
            <p className='text-stone-600 text-sm leading-[2.1]'>
              Introducing <strong>444 Tiny Tubers</strong> that grow up as a community
              of dedicated gardeners waters them.
              <br /> <br />
              Join our community to nurture your <strong>Tiny Tubers</strong> and see who they
              become. Now minting in the Nursery.
            </p>
            <div>
              <a
                // href='https://discord.com/invite/tA8J3fM6pq'
                href='/nursery'
                className='text-white text-xs inline-block mt-4 hover:brightness-110 transition py-3 px-4 bg-primary cursor-pointer'
              // target='_blank'
              // onClick={() => ampInstance.logEvent(Events.HOME_DISCORD)}
              // onClick={() => ampInstance.logEvent(Events.)}
              >
                Enter Nursery
              </a>
            </div>
            <div className='flex mt-12 md:mt-0 lg:absolute right-0 -bottom-16'>
              <img
                src='/images/circle-tree.png'
                className='w-32 sm:w-32 object-contain'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
