export default function SeedSocietyCard({ image, items, title }) {
  return (
    <div className='w-[384px] h-[240px] relative overflow-hidden'>
      <img
        src='/images/nursery/seed-society-blank-card.png'
        className='w-full h-full'
        alt=''
      />
      <div className='absolute h-48 w-full top-[30%] pb-10 pt-4 px-2'>
        <div className='flex h-full w-full overflow-hidden'>
          <div className='w-1/3 flex-shrink-0 h-full overflow-hidden'>
            <img src={image} className='w-full h-full object-cover' alt='' />
          </div>
          <div className='flex-grow pl-4 text-sm'>
            {title && <h3 className='font-bold text-black text-xs'>{title}</h3>}
            <ul className='space-y-1 mt-2 text-xs font-light text-stone-900'>
              {items.map((item, idx) => (
                <li key={idx}>
                  {item.name}: {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
