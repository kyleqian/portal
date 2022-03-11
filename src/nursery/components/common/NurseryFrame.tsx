import NurseryHeader from '../NurseryHeader';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import SeedSocietyHead from '../../../components/SeedSocietyHead';

export interface NurseryFrameProps {
  children: JSX.Element;
}

const NurseryFrame = (props: NurseryFrameProps) => {
  return (
    <>
      <SeedSocietyHead />
      <div className='font-dog w-full min-h-screen'>
        <div className='fixed inset-0 z-[-1]'>
          <img
            src='/images/longer-sky-bg.jpg'
            className='hidden xl:block w-full h-full object-cover object-center'
            alt=''
          />
          <img
            src='/images/nursery/big-green-bg.png'
            className='w-full h-full object-cover object-center'
            alt=''
          />
        </div>
        <NurseryHeader />
        {props.children}
      </div>
    </>
  );
};

export default NurseryFrame;
