
const blockStore = ({ cache, s3, bucket }: { cache?: any, s3: any, bucket: string }) => {

    const put = async (block: { cid: any, bytes: Uint8Array }): Promise<void> => {
        if (cache)
            cache[block.cid.toString()] = block.bytes

        const params = {
            Body: block.bytes,
            Bucket: bucket,
            Key: block.cid.toString()
        }
        return new Promise((resolve, reject) => {
            s3.putObject(params, (err: any, resp: any) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }

    const get = async (cid: any): Promise<Uint8Array> => {
        let bytes
        if (cache)
            bytes = cache[cid.toString()]
        if (!bytes) {
            const params = {
                Bucket: bucket,
                Key: cid.toString()
            }
            bytes = await new Promise((resolve, reject) => {
                s3.getObject(params, (err: any, resp: any) => {
                    if (err) return reject(err)
                    resolve(resp.Body)
                })
            })
            if (cache)
                cache[cid.toString()] = bytes
        }
        return bytes
    }

    return { get, put }
}

export { blockStore }