import React, {useEffect, useState} from 'react'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import useBlossom from '../hooks/useBlossom'
import Header from './Header'
import Loading from './Loading'
import InstallBlossomModal from './modals/InstallBlossomModal'
import PdfList from './PdfList'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const {blossom, connected} = useBlossom()
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    if (connected) {
      blossom.fdpStorage.personalStorage.requestFullAccess().then(() => setGranted(true)).catch(reason => {
        // TODO: handle
        console.log('Blossom error: ' + reason)
      })
    } else {

    }
  }, [connected, blossom])

  // TODO: add access request & fdp login modals
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box display="flex" flexDirection="column" height="100%">
        <Header/>
        <Box flexGrow={1}>
          <Container maxWidth="md" sx={{height: '100%'}}>
            {
              !connected || !granted ? (
                <Loading loading={true}/>
              ) : (
                <PdfList blossom={blossom}/>
              )
            }
            <InstallBlossomModal isOpen={!connected} onClose={() => window.location.reload()}/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
