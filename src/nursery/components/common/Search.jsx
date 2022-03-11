import { useCallback, useEffect } from "react";

export default function Search({ onSearch }) {
  const onSubmit = useCallback(e => {
    e.preventDefault();
    onSearch(document.getElementById('searchBar').value);
  }, []);

  return (
    <div className='mt-6 px-5 sm:px-10'>
      <p className='xl:text-stone-600 text-white font-bold text-center mb-2'>
        Search a Tiny Tuber by name:
      </p>
      <div className='max-w-xl mx-auto h-[46px] relative overflow-hidden'>
        <img
          src='/images/nursery/search-3.png'
          className='absolute w-2/3 sm:w-auto right-0 h-full top-0 z-0 min-w-[52%]'
          alt=''
        />
        <img
          src='/images/nursery/search.png'
          className='absolute left-0 h-full top-0 z-0 min-w-[52%]'
          alt=''
        />
        <form onSubmit={onSubmit}>
          <input
            id='searchBar'
            type='text'
            className='w-full h-full focus:outline-none px-10 pl-12 pt-3 text-sm sm:pl-16 bg-transparent relative z-10'
          />
        </form>
      </div>
    </div>
  );
}
