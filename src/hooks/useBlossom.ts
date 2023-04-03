import {useEffect, useState} from 'react'
import {Blossom} from '@fairdatasociety/blossom'

export interface UseBlossomReturnObject {
  blossom: Blossom
  connecting: boolean
  connected: boolean
}

const CONNECT_TIMEOUT = 2000

const blossom = new Blossom()

function useBlossom(): UseBlossomReturnObject {
  const [connecting, setConnecting] = useState<boolean>(true)
  const [connected, setConnected] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => setConnecting(false), CONNECT_TIMEOUT)

    blossom.echo<string>('test').then(ret => {
      setConnected(ret === 'test')
      setConnecting(false)
    })

    return () => clearTimeout(timeout)
  }, [])

  return {
    blossom,
    connecting,
    connected,
  }
}

export default useBlossom
