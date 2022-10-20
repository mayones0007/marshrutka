import { v4 as uuidv4 } from "uuid"

export const compressAndRenamePicture = (file) => {
  const type = file.name.split('.')[1]
  const blob = file.slice(0, file.size, 'image/' + type)
  return new File([blob], uuidv4() + '.' + type, { type: 'image/' + type })
}