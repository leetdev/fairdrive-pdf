import type {FileData} from '../types'

export default class FilesStore {
  getFiles(): FileData[] {
    try {
      const filesString = localStorage.getItem('fairdrivePdfFiles')

      return filesString ? JSON.parse(filesString) : []
    } catch (_e) {
      return []
    }
  }

  setFiles(files: FileData[]) {
    try {
      localStorage.setItem('fairdrivePdfFiles', JSON.stringify(files))
    } catch (e) {
      console.log(e)
    }
  }
}
