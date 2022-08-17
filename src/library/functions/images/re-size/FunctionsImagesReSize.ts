/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import fs from 'fs'
import publicDirectory from '../../../../publicDirectory'

export type TypesFiguresFunctionsImagesReSize = {
  rdir: string
}

const FunctionsImagesReSize = async ({
  rdir,
}: TypesFiguresFunctionsImagesReSize): Promise<string | undefined> => {
  try {
    const imagePath = path.join(publicDirectory, rdir)

    if (!fs.existsSync(imagePath)) {
      return undefined
    }

    console.log(imagePath)
    return undefined
  } catch (e) {
    console.log(e, 'e')
    return undefined
  }
}

export default FunctionsImagesReSize
