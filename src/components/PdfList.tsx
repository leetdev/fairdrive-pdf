import React, {useCallback, useEffect, useState} from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {Blossom} from '@fairdatasociety/blossom'
import type {RawFileMetadata} from '@fairdatasociety/fdp-storage/dist/pod/types'
import FilesStore from '../store/FilesStore'
import Loading from './Loading'
import type {FileData} from '../types'
import PdfViewer from './PdfViewer'

function humanFileSize(size: number) {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

interface Column {
  id: 'pod' | 'path' | 'size' | 'time'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [
  {id: 'pod', label: 'Pod', minWidth: 170},
  {id: 'path', label: 'File Name', minWidth: 170},
  {
    id: 'size',
    label: 'File Size',
    minWidth: 100,
    align: 'right',
    format: humanFileSize,
  },
  {
    id: 'time',
    label: 'Created',
    minWidth: 100,
    align: 'right',
    format: (time: number) => new Date(time * 1000).toLocaleString('en-GB'),
  },
]

interface PdfListProps {
  blossom: Blossom
}

const fetchList = async (blossom: Blossom): Promise<FileData[]> => {
  const pods = await blossom.fdpStorage.personalStorage.list()
  const files = [] as FileData[]

  for (const pod of pods.pods) {
    const list = await blossom.fdpStorage.directory.read(pod.name, '/', true)

    list.files.filter(file => {
      if (!file.raw?.hasOwnProperty('filePath')) {
        return false
      }

      const ext = file.name.split('.').pop()

      return ext && ext.toLowerCase() === 'pdf'
    }).forEach(file => {
      console.log(file)
      const data = file.raw as RawFileMetadata
      files.push({
        pod: pod.name,
        path: data.filePath,
        name: file.name,
        size: file.size || 0,
        time: data.creationTime,
      })
    })
  }

  return files
}

function PdfList({blossom}: PdfListProps) {
  const store = new FilesStore() // TODO: maybe memoize
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState<FileData[]>(store.getFiles)
  const [alert, setAlert] = useState<string | false>(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<FileData>()
  const openFile = useCallback((index: number) => {
    if (files && files[index]) {
      setOpen(true)
      setFile(files[index])
    }
  }, [files])

  useEffect(() => {
    if (!loading) {
      return
    }
    fetchList(blossom)
      .then(files => {
        store.setFiles(files)
        setFiles(files)
      })
      .catch(error => {
        console.error(error)
        setAlert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [blossom, loading])

  return (
    <React.Fragment>
      <Collapse in={alert !== false}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(false)
              }}>
              <CloseIcon/>
            </IconButton>
          }
          sx={{marginBottom: 1}}
        >
          <AlertTitle>Error</AlertTitle>
          Problem trying to load the list of files from Fairdrive: <strong>{alert}</strong>.&nbsp;
          <Link onClick={() => {
            setAlert(false)
            setLoading(true)
          }} sx={{cursor: 'pointer'}}>Try again</Link>
        </Alert>
      </Collapse>
      {files.length ?
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
          <TableContainer sx={{maxHeight: 440}}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{minWidth: column.minWidth}}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file, index) => (
                  <TableRow hover tabIndex={-1} key={`file-${index}`} sx={{cursor: 'pointer'}}>
                    {columns.map((column) => {
                      let value
                      switch (column.id) {
                        case 'pod':
                          value = file.pod
                          break

                        case 'path':
                          value = `${file.path} ${file.name}`
                          break

                        default:
                          value = column.format ? column.format(file[column.id]) : ''
                      }
                      return (
                        <TableCell key={column.id} align={column.align} onClick={() => openFile(index)}>
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        : (loading ? '' : 'No PDF files found.')
      }
      <Loading loading={loading}/>
      <PdfViewer
        blossom={blossom}
        pod={file?.pod}
        path={file?.path}
        filename={file?.name}
        open={open}
        onClose={() => setOpen(false)}
      />
    </React.Fragment>
  )
}

export default PdfList
