import Box from '@mui/material/Box'
import React, {useEffect, useState} from 'react'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import type {TransitionProps} from '@mui/material/transitions'
import {Blossom} from '@fairdatasociety/blossom'
import {Document, Page, pdfjs} from 'react-pdf'
import Loading from './Loading'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import './PdfViewer.css'

interface PdfViewerModalProps {
  blossom: Blossom
  pod?: string
  path?: string
  filename?: string
  open: boolean
  onClose: () => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

function PdfViewer({blossom, pod, path, filename, open, onClose}: PdfViewerModalProps) {
  const [contents, setContents] = useState<Blob | null>(null)
  const [pageNumbers, setPageNumbers] = useState<number[]>([])

  useEffect(() => {
    if (!pod || !path || !filename) {
      return
    }

    setContents(null)
    blossom.fdpStorage.file.downloadData(pod, path + filename)
      .then(data => new Blob([data]))
      .then(setContents)
      .catch(console.error)
  }, [blossom, pod, path, filename])

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={styles.AppBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon/>
          </IconButton>
          <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
            {filename}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{minHeight: 64}}/>
      {contents !== null ? (
        <Document
          file={contents}
          onLoadError={console.error}
          onLoadSuccess={({numPages}) => {
            const pages = []
            for (let i = 1; i <= numPages; i++) {
              pages.push(i)
            }
            setPageNumbers(pages)
          }}
          onSourceError={console.error}
          options={{
            cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
            standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
          }}
        >
          {pageNumbers.map(pageNumber => (
            <Box display="flex" justifyContent="center" padding={1} sx={styles.Page}>
              <Page key={pageNumber} pageNumber={pageNumber} scale={4/3}/>
            </Box>
          ))}
        </Document>
      ) : (
        <Loading loading/>
      )}
    </Dialog>
  )
}

const styles = {
  AppBar: {
    bgcolor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
  },
  Page: {
  },
}

export default PdfViewer
