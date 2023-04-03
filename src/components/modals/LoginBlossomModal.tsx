import React from 'react'
import Typography from '@mui/material/Typography'
import SimpleModal from './SimpleModal'
import type {ModalProps} from '../../types'

function LoginBlossomModal({isOpen, onClose}: ModalProps) {
  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title="Login or Register">
      <Typography id="modal-modal-description" sx={{mt: 2}}>
        Please login or register a new Fair Data Protocol account in the Blossom extension.
      </Typography>
    </SimpleModal>
  )
}

export default LoginBlossomModal
