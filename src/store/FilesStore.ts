import type {FileData} from '../types'

export default class FilesStore {
  getFiles(): FileData[] {
    const filesString = localStorage.getItem('files')

    return filesString ? JSON.parse(filesString) : []
  }

  setFiles(files: FileData[]) {
    localStorage.setItem('files', JSON.stringify(files))
  }
}
