import { DefaultApi, ThorchainEndpoints, ThorchainEndpoint } from './api';
import { Configuration } from './api/configuration';
import { midgardApiUrl } from './config';
import {
  Nothing,
  Maybe,
  Network,
  PoolStatus,
  PoolView,
  TxQuery,
  Health,
  TxData,
  PoolDetail,
  StatsData,
  AssetDetail,
  StakersAddressData,
  StakersAssetData,
  NetworkInfo,
  NodeKey,
  ThorchainConstants,
  ThorchainLastblock,
  ThorchainQueue,
  GetPoolAggChangesParam,
  PoolAggChanges,
  GetStatsChangesParam,
  StatsChanges,
  PoolEarningDetail,
} from './types';

export interface MidgardSDKV1 {
  version: string;
  getBaseUrl: () => string;
  getHealth: () => Promise<Health>;
  getStats: () => Promise<StatsData>;
  getNetworkData: () => Promise<NetworkInfo>;
  getTx: (query: TxQuery) => Promise<TxData>;
  getAssetInfo: (asset: string) => Promise<AssetDetail[]>;
  getPools: (status?: PoolStatus) => Promise<string[]>;
  getPoolDetail: (assets: string[], view?: PoolView) => Promise<PoolDetail[]>;
  getStakers: () => Promise<string[]>;
  getStakerData: (address: string) => Promise<StakersAddressData>;
  getStakerPoolData: (param: {
    address: string;
    asset: string;
  }) => Promise<StakersAssetData[]>;
  getPoolAddress: () => Promise<string>;
  getPoolAggChanges: (
    param: GetPoolAggChangesParam,
  ) => Promise<PoolAggChanges[]>;
  getStatsChanges: (param: GetStatsChangesParam) => Promise<StatsChanges[]>;
  getPoolEarningDetail: (pool: string) => Promise<PoolEarningDetail>;
  getNodePublicKeys: () => Promise<NodeKey[]>;
  getTHORChainConstants: () => Promise<ThorchainConstants>;
  getTHORChainLastblock: () => Promise<ThorchainLastblock>;
  getTHORChainQueue: () => Promise<ThorchainQueue>;
}

class Midgard implements MidgardSDKV1 {
  private baseUrl: string;
  private apiConfig: Configuration;
  private midgardAPI: DefaultApi;

  public readonly version = 'V1';

  constructor(network: Network = 'chaosnet') {
    this.baseUrl =
      network === 'chaosnet' ? midgardApiUrl.chaosnet : midgardApiUrl.testnet;

    this.apiConfig = new Configuration({ basePath: this.baseUrl });
    this.midgardAPI = new DefaultApi(this.apiConfig);
  }

  getBaseUrl = (): string => {
    return this.baseUrl;
  };

  async getHealth(): Promise<Health> {
    try {
      const { data } = await this.midgardAPI.getHealth();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getStats(): Promise<StatsData> {
    try {
      const { data } = await this.midgardAPI.getStats();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getNetworkData(): Promise<NetworkInfo> {
    try {
      const { data } = await this.midgardAPI.getNetworkData();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTx(query: TxQuery): Promise<TxData> {
    try {
      const { address, txId, asset, type, offset, limit } = query;
      const { data } = await this.midgardAPI.getTxDetails(
        offset,
        limit,
        address,
        txId,
        asset,
        type,
      );

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAssetInfo(asset: string): Promise<AssetDetail[]> {
    try {
      const { data } = await this.midgardAPI.getAssetInfo(asset);

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getPools(status: PoolStatus = 'enabled'): Promise<string[]> {
    try {
      const { data } = await this.midgardAPI.getPools(status);

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getPoolDetail(
    assets: string[],
    view: PoolView = 'simple',
  ): Promise<PoolDetail[]> {
    try {
      if (assets.length === 0) return [];

      const sortedAssets = this.getSortedPoolString(assets);

      // Request sorted asset string for cache support
      const { data } = await this.midgardAPI.getPoolsDetails(
        sortedAssets,
        view,
      );

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getStakers(): Promise<string[]> {
    try {
      const { data } = await this.midgardAPI.getStakersData();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getStakerData(address: string): Promise<StakersAddressData> {
    try {
      const { data } = await this.midgardAPI.getStakersAddressData(address);

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getStakerPoolData({
    address,
    asset,
  }: {
    address: string;
    asset: string;
  }): Promise<StakersAssetData[]> {
    try {
      const { data } = await this.midgardAPI.getStakersAddressAndAssetData(
        address,
        asset,
      );

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getPoolAddress(): Promise<string> {
    try {
      const { data } = await this.midgardAPI.getThorchainProxiedEndpoints();
      const address = this.getBNBPoolAddress(data)?.address ?? Nothing;

      if (address) return address;

      throw new Error('Address is empty!');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getPoolAggChanges(
    param: GetPoolAggChangesParam,
  ): Promise<PoolAggChanges[]> {
    try {
      const { pool, interval, from, to } = param;
      const { data } = await this.midgardAPI.getPoolAggChanges(
        pool,
        interval,
        from,
        to,
      );

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getStatsChanges(param: GetStatsChangesParam): Promise<StatsChanges[]> {
    try {
      const { interval, from, to } = param;
      const { data } = await this.midgardAPI.getStatsChanges(
        interval,
        from,
        to,
      );

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getPoolEarningDetail(pool: string): Promise<PoolEarningDetail> {
    try {
      const { data } = await this.midgardAPI.getEarningDetail(pool);

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getNodePublicKeys(): Promise<NodeKey[]> {
    try {
      const { data } = await this.midgardAPI.getNodes();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTHORChainConstants(): Promise<ThorchainConstants> {
    try {
      const { data } = await this.midgardAPI.getThorchainProxiedConstants();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTHORChainLastblock(): Promise<ThorchainLastblock> {
    try {
      const { data } = await this.midgardAPI.getThorchainProxiedLastblock();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTHORChainQueue(): Promise<ThorchainQueue> {
    try {
      const { data } = await this.midgardAPI.getThorchainProxiedQueue();

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private getBNBPoolAddress(
    endpoints: ThorchainEndpoints,
  ): Maybe<ThorchainEndpoint> {
    return (
      endpoints.current?.find(
        (endpoint: ThorchainEndpoint) => endpoint.chain === 'BNB',
      ) ?? Nothing
    );
  }

  private getSortedPoolString = (pools: string[]): string => {
    const sortedPools = pools.sort((a, b) => a.localeCompare(b));

    return sortedPools.join();
  };
}

export default Midgard;
