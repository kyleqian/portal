import { useContext } from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { classNames } from '../../utils';
import 'react-status-alert/dist/status-alert.css';

const links = [
  { name: 'Nursery', href: '/nursery' },
  { name: 'Minting', href: '/minting' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export default function NurseryHeader() {
  return (
    <>
      <header>
        <nav className='max-w-7xl mx-auto px-5 sm:px-10 pt-6'>
          <ul className='items-center space-x-4 sm:space-x-6 justify-end flex pt-4'>
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className={classNames(
                    'inline-block transition py-2 text-xs text-white hover:text-gray-200 xl:text-gray-700 xl:hover:text-black sm:text-sm'
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <br />
            <li>
              <a
                href='https://discord.com/invite/tA8J3fM6pq'
                className='inline-block text-white transition p-2 text-3xl rounded-xl hover:brightness-110 bg-[#6C87CA]'
                target='_blank'
              >
                <FaDiscord />
              </a>
            </li>
            <li>
              <a
                href='https://twitter.com/SeedSocietyNFT'
                className='inline-block text-white transition p-2 text-3xl rounded-xl hover:brightness-110 bg-[#38C9F8]'
                target='_blank'
              >
                <FaTwitter />
              </a>
            </li>
          </ul>
        </nav>
        <div className='max-w-lg mx-auto'>
          <a href='/nursery/'>
            <img
              src='/images/nursery/sign-nursury.png'
              className='w-full'
              alt=''
            />
          </a>
        </div>
      </header>
    </>
  );
}
