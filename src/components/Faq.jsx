import WoodBorder from '../components/WoodBorder';

const faqs = [
  {
    question: 'How much are Tiny Tubers to mint?',
    answer: 'Tiny Tubers will be available to mint at 0.5 SOL. Members of the first whitelist will be able to mint for 0.3 SOL.',
  },
  {
    question: 'How can I mint a Tiny Tuber?',
    answer: <div>Follow our instructions on Discord and Twitter for a chance to make it on the whitelist! Come minting time, we recommend setting up Phantom wallet for Solana (<a href="https://phantom.app/help/installing-phantom" target="_blank" className="hover:underline">guide here!</a>). SOL can then be purchased and sent to your Phantom wallet via platforms like Coinbase and FTX. After that, visit the Nursery when it`s open to mint. Feel free to reach out to us for help!</div>
  },
  {
    question: 'Can I water my own Tiny Tuber?',
    answer:
      'Yes, although Tubers watered by other gardeners will grow faster...',
  },
  {
    question: 'How long does it take for a Tiny Tuber to fully grow?',
    answer:
      'A Tuber that’s diligently watered should fully grow in 3-5 weeks.',
  },
  {
    question: 'Can I trade my Tiny Tuber?',
    answer:
      'Tiny Tubers can only be shared with others once they have reached maturity.',
  },
  {
    question:
      'Does “permanently wither” mean my tuber will die if it’s not watered?',
    answer: 'Yes :-( If your Tuber is not watered at all for 7 days, it will die.',
  },
  {
    question: 'What’s under the hood?',
    answer:
      'Tiny Tubers live on the Solana blockchain. Watering and growth data are all tracked on-chain, while images and token metadata are stored on Arweave according to the Metaplex Metadata Standard. The images are updated every time a Tuber grows. More details like contract address coming soon - contact Kale for further questions!',
  },
  {
    question: 'Who are the creators of Seed Society?',
    answer:
      <>
        <div>Gardener Kale <a className="hover:underline" target="_blank" href="https://twitter.com/qualiaspace">(@qualiaspace)</a>: Solana & web developer</div>
        <div>Gardener Ash <a className="hover:underline" target="_blank" href="https://twitter.com/imempowa">(@EMPOWA)</a>: artist, community mgmt</div>
      </>
  },
];



const Faq = () => {
  return (
    <WoodBorder>
      <div className='pt-16 relative w-full h-full'>
        <div className='absolute inset-0 z-0'>
          <img
            src='/images/faq-bg.png'
            className='w-full h-full object-cover'
            alt=''
          />
        </div>
        <div className='relative z-10 px-2 sm:px-20'>
          <h2 className='text-white font-heading text-4xl text-center uppercase'>
            Faq
          </h2>
          <ul className='mt-8 flex flex-col space-y-8'>
            {faqs.map((item, idx) => (
              <li key={idx} className='flex items-start space-x-2'>
                <div className='w-8 h-6 flex-shrink-0'>
                  <img
                    src='/images/seed-sm.png'
                    className='w-full h-full object-contain'
                    alt=''
                  />
                </div>
                <div>
                  <h2 className='text-stone-200 font-bold mb-2 text-2xs'>
                    {item.question}
                  </h2>
                  <p className='text-stone-300 text-[0.6rem]'>
                    {item.answer}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className='flex mt-6 flex-col md:flex-row w-full items-center'>
            <div>
              <a className="hover:underline" target="_blank" href="https://twitter.com/qualiaspace">
                <img src='/images/profile-card-1.png' className='h-32' alt='' />
              </a>
            </div>
            <div className='md:ml-8 mt-4 md:mt-0'>
              <a className="hover:underline" target="_blank" href="https://twitter.com/imempowa">
                <img src='/images/profile-card-2.png' className='h-32' alt='' />
              </a>
            </div>
          </div>
        </div>
        <div className='relative z-10'>
          <div className='w-full h-32'>
            <img
              src='/images/bg-faq-1.png'
              className='w-full h-full object-cover'
              alt=''
            />
          </div>
          <div className='w-full h-36'>
            <img
              src='/images/bg-faq-2.png'
              className='w-full h-full object-cover'
              alt=''
            />
          </div>
          <div className='w-full h-36 relative'>
            <img
              src='/images/faq-grass.png'
              className='w-full h-full object-cover'
              alt=''
            />
            <div className='absolute sm:left-10 left-3 bottom-full w-32 sm:w-40 translate-y-3'>
              <img
                src='/images/seed-group.png'
                className='w-full h-auto'
                alt=''
              />
            </div>
            <div className='absolute left-28 bottom-full w-24 sm:w-28 translate-y-2'>
              <img
                src='/images/ash-card-2.png'
                className='w-full h-auto'
                alt=''
              />
            </div>
            <div className='absolute left-48 bottom-full w-22 sm:w-28 translate-y-1'>
              <img
                src='/images/ash-card-3.png'
                className='w-full h-auto'
                alt=''
              />
            </div>
            <div className='absolute bottom-full h-full w-40 right-0 z-10'>
              <img
                src='/images/gifs/worm-peekaboo.gif'
                className='w-full h-full'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </WoodBorder>
  );
};

export default Faq;
