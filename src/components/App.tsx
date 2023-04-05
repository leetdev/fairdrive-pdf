import React, {useEffect, useState} from 'react'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import useBlossom from '../hooks/useBlossom'
import Header from './Header'
import Loading from './Loading'
import GrantPermissionsModal from './modals/GrantPermissionsModal'
import InstallBlossomModal from './modals/InstallBlossomModal'
import LoginBlossomModal from './modals/LoginBlossomModal'
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
  const {blossom, connecting, connected} = useBlossom()
  const [granted, setGranted] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const reload = () => window.location.reload()

  useEffect(() => {
    if (connected) {
      blossom.fdpStorage.personalStorage.requestFullAccess().then(setGranted).catch(reason => {
        console.log('Blossom error: ' + reason)
        if (reason === 'Error: User is not logged in') {
          setLoginError(true)
        }
      })
    } else {

    }
  }, [connected, blossom])

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
            <InstallBlossomModal isOpen={!connecting && !connected} onClose={reload}/>
            <LoginBlossomModal isOpen={loginError} onClose={reload}/>
            <GrantPermissionsModal isOpen={connected && !granted} onClose={reload}/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
