# Midgard SDK V1

[![License](https://img.shields.io/npm/l/make-coverage-badge.svg)](https://opensource.org/licenses/MIT)
![ts](https://flat.badgen.net/badge/Built%20With/TypeScript/blue)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Midgard API Documentation: [midgard.bepswap.com/v1/doc](https://midgard.bepswap.com/v1/doc).

## Installation

```sh
yarn add @thorchain/midgard-sdk-v1
```

## Usage

```sh

import Midgard from '@thorchain/midgard-sdk-v1'

// choose network
const midgard = new Midgard(); // set chaosnet as default
const midgard = new Midgard('testnet'); // for testnet

// get health
const pools = midgard.getHealth()

// get pool address
const pools = midgard.getPoolAddress()

// get stats
const pools = midgard.getStats()

// get network data
const pools = midgard.getNetworkData()

// get tx data
const pools = midgard.getTx({ address, txId, asset, type, offset, limit })

// get asset info
const pools = midgard.getAssetInfo(asset)

// get pools from the Midgard
const pools = midgard.getPools()

// get pool details
const pools = midgard.getPoolDetail(['BNB'], view='simple')

// get all staker addresses
const pools = midgard.getStakers()

// get staker data by address
const pools = midgard.getStakerData(address)

// get staker data by address and asset
const pools = midgard.getStakerPoolData({ address, asset })

// get pool aggregate changes
const pools = midgard.getPoolAggChanges({ pool, interval, from, to })

// get stats aggregate changes
const pools = midgard.getStatsChanges({ interval, from, to })

// get pool earning detail
const pools = midgard.getPoolEarningDetail(pool)

// get node public keys
const pools = midgard.getNodePublicKeys()

// get thorchain constants
const pools = midgard.getTHORChainConstants()

// get thorchain last block
const pools = midgard.getTHORChainLastblock()

// get thorchain queue
const pools = midgard.getTHORChainQueue()

```
