/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

import publicDirectory from '../../../../publicDirectory'

export type TypesFiguresFunctionsImagesReSize = {
  filePath: string
  scalar: number
}

const FunctionsImagesReSize = async ({
  filePath,
  scalar,
}: TypesFiguresFunctionsImagesReSize): Promise<string | undefined> => {
  try {
    const imagePath = path.join(publicDirectory, filePath)

    if (!fs.existsSync(imagePath)) {
      return undefined
    }

    // const metadata = await sharp(imagePath).metadata()
    // console.log(metadata)

    /*
    await sharp(imagePath)
      .resize(200, 400, {
        fit: 'inside',
      })
      .toFile('resized.png')
      */

    await sharp(imagePath)
      .metadata()
      .then(({ width }) => {
        if (!width) {
          throw new Error('no width re-size')
        }
        sharp(imagePath)
          .resize(Math.round(width * scalar))
          .toFile(`${publicDirectory}/images/community-garden-logo-${scalar}.png`)
      })

    return 'yes'
  } catch (e) {
    console.log(e, 'e')
    return undefined
  }
}

export default FunctionsImagesReSize
