import { aquabotServerClient } from './aquabot-server-client';

describe('aquabotServerClient', () => {
  it('should work', () => {
    expect(aquabotServerClient()).toEqual('aquabot-server-client');
  });
});
