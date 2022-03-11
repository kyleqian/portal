export default function WaterMeter({ filled = 10, capacity = 10 }) {
  if (capacity === 0) {
    capacity = 1;
  }

  return (
    <div className='relative overflow-hidden w-full'>
      <img
        src='/images/nursery/water-meter-empty.png'
        className='w-full relative z-10'
        alt=''
      />
      <div className='bg-white h-full absolute left-[11%] inset-y-0 right-2 z-0 overflow-hidden'>
        <div
          style={{ width: `${(filled / capacity) * 100}%` }}
          className='h-full bg-[#4D9BE6]'
        ></div>
      </div>
    </div>
  );
}
