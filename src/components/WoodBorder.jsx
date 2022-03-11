const WoodBorder = ({ children }) => {
  return (
    <div className='max-w-7xl mx-auto px-2 sm:px-5 xl:px-20'>
      <div className='relative'>
        <div>
          <div className='absolute inset-0 p-5 lg:p-8 z-10 bg-[#D8EEF9]'></div>
          <div className='h-7 lg:h-8 w-full absolute top-0 left-0 z-20'>
            <img
              src='/images/border-t.jpg'
              className='w-full h-full object-cover'
              alt=''
            />
          </div>
          <div className='h-full w-5 lg:w-8 absolute inset-y-0 left-0 z-20'>
            <img
              src='/images/wood-line-thin.jpg'
              className='w-full h-full object-cover'
              alt=''
            />
          </div>
          <div className='h-full w-5 lg:w-8 absolute inset-y-0 right-0 z-20'>
            <img
              src='/images/wood-line-thin.jpg'
              className='w-full h-full object-cover'
              alt=''
            />
          </div>
          <div className='h-5 lg:h-8 w-full absolute bottom-0 left-0 z-20'>
            <img
              src='/images/border-b.jpg'
              className='w-full h-full object-cover'
              alt=''
            />
          </div>
        </div>
        <div className='relative z-10 p-5 lg:p-8 overflow-hidden'>{children}</div>
      </div>
    </div>
  );
};

export default WoodBorder;
