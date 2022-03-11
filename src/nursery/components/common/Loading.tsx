import { useEffect, useState } from 'react';

const Loading = () => {
  const [ellipses, setEllipses] = useState('\u00a0\u00a0\u00a0');

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
    <div className='absolute top-[15%] w-full py-10 xl:py-0'>
      <p className='text-center text-white text-2xl py-16'>
        Loading{ellipses}
      </p>
      <div className='w-80 mx-auto pl-[120px] xl:ml-[43%] xl:pl-0 pb-10'>
        <img
          src='/images/gifs/gif-landing.gif'
          alt=''
        />
      </div>
    </div>
  );
};

export default Loading;
