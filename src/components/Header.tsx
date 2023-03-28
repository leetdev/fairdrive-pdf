import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function Header() {
  return (
    <Box p={2}>
      <Container>
        <Typography variant="h5" align="center">
          Fairdrive PDF Viewer
        </Typography>
      </Container>
    </Box>
  )
}

export default Header
