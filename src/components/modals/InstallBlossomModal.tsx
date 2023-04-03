import React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import SimpleModal from './SimpleModal'
import type {ModalProps} from '../../types'

function InstallBlossomModal({isOpen, onClose}: ModalProps) {
  return (
    <SimpleModal isOpen={isOpen} onClose={onClose} title="Install Blossom">
      <Typography id="modal-modal-description" sx={{mt: 2}}>
        This application requires the Blossom browser extension in order to connect to Fairdrive.
        Add it to your browser in&nbsp;
        <Link href="https://chrome.google.com/webstore/detail/blossom/caedjloenbhibmaeffockkiallpngmmd" target="_blank">
          Chrome Web Store
        </Link>.
      </Typography>
    </SimpleModal>
  )
}

export default InstallBlossomModal
