import { useState, useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import { classNames } from '../utils';
import StatusAlert, { StatusAlertService } from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'
import { AmplitudeContext, Events } from '../AmplitudeContext';

const links = [
  { name: 'Nursery', href: '/nursery', nursery: true },
  { name: 'Collection', href: '#collection' },
  { name: 'Watering', href: '#watering' },
  { name: 'Roadmap', href: '#roadmp' },
  { name: 'FAQ', href: '#faq' },
];

const Header = ({ }) => {
  const [open, setOpen] = useState(false);
  const ampInstance = useContext(AmplitudeContext);

  return (
    <>
      <StatusAlert />
      <header>
        <nav className='max-w-6xl mx-auto px-5 sm:px-10'>
          {/* Desktop navigation */}
          <ul className='items-center space-x-8 lg:space-x-12 justify-center hidden lg:flex py-4'>
            {links.map((link, idx) => {
              const itemClass = classNames(
                'inline-block transition py-2 text-sm',
                link.nursery
                  ? 'bg-primary text-white hover:bg-opacity-80 px-6'
                  : 'text-gray-700 hover:text-black'
              );
              const item = link.nursery ?
                <a onClick={() => {
                  ampInstance.logEvent(Events.HEADER_NURSERY);
                }} className={itemClass} href={link.href}>{link.name}</a> :
                <AnchorLink
                  href={link.href}
                  className={itemClass}
                >
                  {link.name}
                </AnchorLink>;
              return (
                <li key={idx}>
                  {item}
                </li>
              );
            })}
            <li>
              <a
                href='https://discord.com/invite/tA8J3fM6pq'
                className='inline-block text-white transition p-2 text-3xl rounded-xl hover:brightness-110 bg-[#6C87CA]'
                target='_blank'
                onClick={() => ampInstance.logEvent(Events.HEADER_DISCORD)}
              >
                <FaDiscord />
              </a>
            </li>
            <li>
              <a
                href='https://twitter.com/SeedSocietyNFT'
                className='inline-block text-white transition p-2 text-3xl rounded-xl hover:brightness-110 bg-[#38C9F8]'
                target='_blank'
                onClick={() => ampInstance.logEvent(Events.HEADER_TWITTER)}
              >
                <FaTwitter />
              </a>
            </li>
          </ul>

          {/* Mobile Navigation */}
          <div className='flex items-center justify-end lg:hidden'>
            <button
              onClick={() => setOpen(true)}
              className='text-gray-600 hover:text-black'
            >
              <MenuIcon className='w-8 h-8' />
            </button>
          </div>
        </nav>
      </header>
      <Transition
        show={open}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 z-30'>
          <div className='w-full h-full relative'>
            <div className='absolute inest-0 z-[-1] w-full h-full'>
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
            <div className='p-5 sm:px-10'>
              <div className='flex items-center justify-end'>
                <button
                  onClick={() => setOpen(false)}
                  className='text-gray-600 hover:text-black'
                >
                  <XIcon className='w-8 h-8' />
                </button>
              </div>
              <div className='mt-6 relative flex-1 px-4 sm:px-6 flex flex-col space-y-3 font-dog'>
                {links.map((link, idx) => {
                  const itemClass = classNames(
                    'inline-block text-base transition py-2',
                    link.nursery
                      ? 'bg-primary text-white hover:bg-opacity-80 px-6'
                      : 'text-gray-700 hover:text-black'
                  );
                  const item = link.nursery ?
                    <a onClick={() => {
                      ampInstance.logEvent(Events.HEADER_NURSERY);
                    }} className={itemClass} href={link.href}>{link.name}</a> :
                    <AnchorLink
                      key={idx}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={itemClass}
                    >
                      {link.name}
                    </AnchorLink>;
                  return (
                    <>
                      {item}
                    </>
                  );
                })}
                <div className='flex flex-col space-y-4 !mt-8'>
                  <div>
                    <a
                      href='https://discord.com/invite/tA8J3fM6pq'
                      className='inline-block text-white transition p-2 text-3xl rounded-xl hover:brightness-110 bg-[#6C87CA]'
                      target='_blank'
                      onClick={() => ampInstance.logEvent(Events.HEADER_DISCORD)}
                    >
                      <FaDiscord />
                    </a>
                  </div>
                  <div>
                    <a
                      href='https://twitter.com/SeedSocietyNFT'
                      className='inline-block text-white transition p-2 text-3xl rounded-xl hover:brightness-110 bg-[#38C9F8]'
                      target="_blank"
                      onClick={() => ampInstance.logEvent(Events.HEADER_TWITTER)}
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Header;
