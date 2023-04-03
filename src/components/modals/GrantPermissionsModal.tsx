import React from 'react'
import Typography from '@mui/material/Typography'
import SimpleModal from './SimpleModal'
import type {ModalProps} from '../../types'

function GrantPermissionsModal({isOpen, onClose}: ModalProps) {
  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title="Grant Permissions">
      <Typography id="modal-modal-description" sx={{mt: 2}}>
        You need to grant permission for this app to access your Fairdrive storage.
      </Typography>
    </SimpleModal>
  )
}

export default GrantPermissionsModal
