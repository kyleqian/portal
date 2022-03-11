import Banner from '../src/components/Banner';
import OurMission from '../src/components/OurMission';
import Roadmap from '../src/components/Roadmap';
import Faq from '../src/components/Faq';
import TinyTubers from '../src/components/TinyTubers';
import HowToWater from '../src/components/HowToWater';
import SeedSocietyHead from '../src/components/SeedSocietyHead';
import { AmplitudeContext, AmpInstance, Events } from '../src/AmplitudeContext';
import { useEffect } from 'react';

function App() {
  useEffect(() => AmpInstance.logEvent(Events.VISIT_HOME), []);

  return (
    <>
      <AmplitudeContext.Provider value={AmpInstance}>
        <SeedSocietyHead />
        <div className='font-dog'>
          <Banner />
          <div className='py-10 space-y-20'>
            <section id='mission' className='space-y-20'>
              <OurMission />
            </section>
            <section id='collection'>
              <TinyTubers />
            </section>
            <section id='watering'>
              <HowToWater />
            </section>
            <section id='roadmp'>
              <Roadmap />
            </section>
            <section id='faq'>
              <Faq />
            </section>
          </div>
        </div>
      </AmplitudeContext.Provider>
    </>
  );
}

export default App;
