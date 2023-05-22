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
    const categoryData = this.serveFileDataOrNull<T>(path.join(this.dir, 'category.json'))
    return categoryData
  }
  getContent<T>(): T | null {
    const contentData = this.serveFileDataOrNull<T>(path.join(this.dir, 'content.json'))
    // todo : 파일을 읽어오는 거라 어쩔 수 없이 전체 파일을 읽고 필요한 데이터만 출력하는 방법으로 진행합니다. db로 변경하면 getContent로 변경할 수 있습니다.
    // todo : 근데 SSG라서 이게 더 효율적일 거 같습니다! 좋은 구조가 무엇일지, 댓글기능까지 확장한다고 고려하고 고민해봅시다.
    // todo : 댓글 기능은 SSG페이지에서 동적으로 받아옵니다. (댓글을 보고 싶어하는 사람만 볼 수 있도록 댓글보기 클릭시 동적으로 댓글을 받아옵니다.)
    return contentData
  }
  getLogInformation<T>(): T | null {
    const logInfomation = this.serveFileDataOrNull<T>(path.join(this.dir, 'log.json'))
    return logInfomation
  }
  private serveFileDataOrNull<T>(dir: string): T | null {
    try {
      const data = fs.readFileSync(dir, 'utf-8')
      return JSON.parse(data)
    } catch (err) {
      console.error(err)
      return null
    }
  }
}

const fileData = new FileData(path.join(process.cwd(), 'src', 'dummyData'))

export default fileData
