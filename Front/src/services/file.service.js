import { v4 as uuidv4 } from "uuid"
import imageCompression from 'browser-image-compression'

export const compressAndRenamePicture = async(file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }
  const type = file.name.split('.')[1]
  const blob = file.slice(0, file.size, 'image/' + type)
  const newBlob = await imageCompression(blob, options)
  return new File([newBlob], uuidv4() + '.' + type, { type: 'image/' + type })
}