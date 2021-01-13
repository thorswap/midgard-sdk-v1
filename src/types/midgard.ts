import { InlineResponse200, InlineResponse2001 } from '../midgard-openapi/api';

export * from '../midgard-openapi/api';

export type Network = 'testnet' | 'chaosnet';

export type PoolStatus = 'enabled' | 'bootstrap' | 'suspended';

export type PoolView = 'balances' | 'simple' | 'full';

export type TxQuery = {
  address?: string;
  txId?: string;
  asset?: string;
  type?: string;
  offset: number;
  limit: number;
};

export type Health = InlineResponse200;
export type TxData = InlineResponse2001;

export type Interval = '5min' | 'hour' | 'day' | 'week' | 'month' | 'year';

export type GetPoolAggChangesParam = {
  pool: string;
  interval: Interval;
  from: number;
  to: number;
};

export type GetStatsChangesParam = {
  interval: Interval;
  from: number;
  to: number;
};
