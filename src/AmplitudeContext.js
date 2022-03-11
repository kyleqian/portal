import { createContext } from 'react';
import amplitude from 'amplitude-js';

if (typeof global.navigator === 'undefined') {
  global.navigator = {};
}

const AMP_ID = '7e592c0b9ff67b1d4ac3fdb4f68e8d77';
const AmpInstance = amplitude.getInstance();
AmpInstance.init(AMP_ID, null, { includeReferrer: true, includeUtm: true });
const AmplitudeContext = createContext(AmpInstance);
const Events = {
  HEADER_TWITTER: 'HEADER_TWITTER',
  HEADER_DISCORD: 'HEADER_DISCORD',
  HEADER_NURSERY: 'HEADER_NURSERY',
  HOME_DISCORD: 'HOME_DISCORD',
  VISIT_HOME: 'VISIT_HOME',
  VISIT_NURSERY: 'VISIT_NURSERY',
  VISIT_MINTING: 'VISIT_MINTING',
  MINT_SUCCESS: 'MINT_SUCCESS',
  MINT_FAIL: 'MINT_FAIL',
  ENROLL_SUCCESS: 'ENROLL_SUCCESS',
  ENROLL_FAIL: 'ENROLL_FAIL',
  WATER_SUCCESS: 'WATER_SUCCESS',
  WATER_FAIL: 'WATER_FAIL',
  TUBER_SEARCH: 'TUBER_SEARCH',
  LEADERBOARD: 'LEADERBOARD',
};

export { Events, AmplitudeContext, AmpInstance };
