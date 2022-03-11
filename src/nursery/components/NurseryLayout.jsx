export default function NurseryLayout({ children }) {
  return (
    <div className='relative w-full max-w-screen-2xl mx-auto'>
      <img
        src='/images/nursery/nursery-background-1.png'
        alt='Hello'
        className='w-full h-full object-cover'
      />
      <div className='absolute top-[20%] w-full'>
        <div className='w-7/12 max-w-4xl mx-auto'>
          {children}
        </div>
      </div>
    </div>
  );
}
