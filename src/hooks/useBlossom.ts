import {useEffect, useState} from 'react'
import {Blossom} from '@fairdatasociety/blossom'

export interface UseBlossomReturnObject {
  blossom: Blossom
  connected: boolean
}

const blossom = new Blossom()

function useBlossom(): UseBlossomReturnObject {
  const [connected, setConnected] = useState<boolean>(false)

  useEffect(() => {
    blossom.echo<string>('test').then(ret => !connected && setConnected(ret === 'test'))
  }, [])

  return {
    blossom,
    connected,
  }
}

export default useBlossom
