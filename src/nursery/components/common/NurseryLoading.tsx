import { NodeWallet } from '@metaplex/js';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const NurseryLoading = () => {
  const [ellipses, setEllipses] = useState('\u00a0\u00a0\u00a0');
  const wallet = useAnchorWallet() as NodeWallet;
  const title = wallet
    ? <p className='text-center text-white text-2xl py-16'>
      Nursery loading{ellipses}
    </p>
    : <p className='text-center text-white text-lg py-8'>
      Welcome to the Nursery!<br /><br />
    </p>;

  const button = wallet ? null : <div className='text-center py-6'>
    <WalletMultiButton
      className='text-black bg-[#EADCB8] px-10 inline-block text-xs sm:text-sm hover:bg-opacity-70 transition rounded-none font-dog h-16 font-normal'
      startIcon={undefined}
    >
      Connect Wallet
    </WalletMultiButton>
  </div>

  useEffect(() => {
    setInterval(() => {
      setEllipses(prevEllipses => {
        switch (prevEllipses) {
          case '\u00a0\u00a0\u00a0':
            return '.\u00a0\u00a0';
          case '.\u00a0\u00a0':
            return '..\u00a0';
          case '..\u00a0':
            return '...'
          case '...':
            return '\u00a0\u00a0\u00a0';
        }
        return '\u00a0\u00a0\u00a0';
      });
    }, 1000);
  }, []);

  return (
    <div className='relative w-full max-w-screen-2xl mx-auto'>
      <img
        src='/images/nursery/long-nursery.png'
        alt=''
        className='w-full h-full object-cover hidden xl:block'
      />
      <div className='absolute top-[15%] w-full py-10 xl:py-0'>
        {title}
        <div className='w-80 mx-auto pl-[120px] xl:ml-[43%] xl:pl-0 pb-10'>
          <img
            src='/images/gifs/gif-landing.gif'
            alt=''
          />
        </div>
        {button}
        <div className='hidden lg:block w-1/4 left-[20%] relative mt-28'>
          <img src='/images/curve-5.png' className='w-full' alt='' />
          <div className='w-16 absolute left-full bottom-full'>
            <img src='/images/gifs/bee-2.gif' className='w-full' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseryLoading;
