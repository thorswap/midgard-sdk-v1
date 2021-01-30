import { midgardApiUrl } from '../config';
import { MidgardV1 } from '../Midgard';

describe('Midgard', () => {
  it('should be constructed with network', () => {
    const chaosnetMidgardSDK = new MidgardV1();
    const testnetMidgardSDK = new MidgardV1('testnet');

    expect(chaosnetMidgardSDK.getBaseUrl()).toBe(midgardApiUrl.chaosnet);
    expect(testnetMidgardSDK.getBaseUrl()).toBe(midgardApiUrl.testnet);
  });
});
