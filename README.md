# Azure Block Store

Simple content-addressable storage (CAS) based on [AWS S3](https://aws.amazon.com/s3/). 

## API

```ts
put: (block: { cid: any, bytes: Uint8Array }) => Promise<void>
get: (cid: any) => Promise<Uint8Array>
```

## Usage

```ts
import AWS from 'aws-sdk'
import { blockStore } from '@dstanesc/s3-block-store'

AWS.config.update({region: 'us-east-1'})
const s3 = new AWS.S3()
const cache = {}
// bucket configured in https://s3.console.aws.amazon.com/s3/buckets
const bucket = ... 
// s3-block-store api
const { get, put } = blockStore({ /*cache,*/ s3, bucket });
```
## Build

```sh
npm run clean
npm install
npm run build
```

## Test

AWS storage configuration and security credentials

```sh
export AWS_BUCKET_NAME=...
export AWS_REGION=...

export AWS_SECRET_ACCESS_KEY=...
export AWS_ACCESS_KEY_ID=...
```

```sh
npm run test
```

## Licenses

Licensed under either [Apache 2.0](http://opensource.org/licenses/MIT) or [MIT](http://opensource.org/licenses/MIT) at your option.
