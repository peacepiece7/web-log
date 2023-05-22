import fs from 'fs'
import path from 'path'

interface IFileData {
  dir: string
  getCategory<T>(): T | null
  getContent<T>(): T | null
  getLogInformation<T>(): T | null
}

class FileData implements IFileData {
  dir: string
  constructor(dir: string) {
    this.dir = dir
  }
  getCategory<T>(): T | null {
    const categoryData = this.promiseServeFileDataOrNull<T>(path.join(this.dir, 'category.json'))
    return categoryData
  }
  getContent<T>(): T | null {
    const contentData = this.promiseServeFileDataOrNull<T>(path.join(this.dir, 'content.json'))
    return contentData
  }
  getLogInformation<T>(): T | null {
    const logInfomation = this.promiseServeFileDataOrNull<T>(path.join(this.dir, 'log.json'))
    return logInfomation
  }
  private promiseServeFileDataOrNull<T>(dir: string): T | null {
    try {
      const data = fs.readFileSync(dir, 'utf-8')
      return JSON.parse(data)
    } catch (err) {
      console.error(err)
      return null
    }
  }
}

const fileData = new FileData(path.join(process.cwd(), 'src', 'data'))

export default fileData
