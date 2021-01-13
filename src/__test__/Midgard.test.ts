import { midgardApiUrl } from '../config';
import Midgard from '../Midgard';

describe('Midgard', () => {
  it('should be constructed with network', () => {
    const chaosnetMidgardSDK = new Midgard();
    const testnetMidgardSDK = new Midgard('testnet');

    expect(chaosnetMidgardSDK.getBaseUrl()).toBe(midgardApiUrl.chaosnet);
    expect(testnetMidgardSDK.getBaseUrl()).toBe(midgardApiUrl.testnet);
  });
});
