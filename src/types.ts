import {ReactNode} from 'react'

export interface FileData {
  pod: string
  path: string
  name: string
  size: number
  time: number
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface SimpleModalProps extends ModalProps {
  title: string
  children: ReactNode
}
