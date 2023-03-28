import React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import type {ModalProps} from '../../types'

function InstallBlossomModal({isOpen, onClose}: ModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Install Blossom
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
          This application requires the Blossom browser extension in order to connect to Fairdrive.
          Add it to your browser in&nbsp;
          <Link href="https://chrome.google.com/webstore/detail/blossom/caedjloenbhibmaeffockkiallpngmmd" target="_blank">
            Chrome Web Store
          </Link>.
        </Typography>
      </Box>
    </Modal>
  )
}

export default InstallBlossomModal

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
}
