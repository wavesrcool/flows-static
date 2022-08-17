import express from 'express'
import cors from 'cors'

import { environment } from './library/environment/environment'
import FunctionsImagesReSize from './library/functions/images/re-size/FunctionsImagesReSize'

const server = async (env: string, region: string): Promise<typeof app> => {
  const PROD = env === 'production'
  const EU = region === 'eu'

  console.log(`[flows-static] Starting server...`)

  const app = express()
  // app.use(helmet())
  app.use(express.json())

  if (PROD) {
    app.set('trust proxy', 1)
  }

  const corsOptions: cors.CorsOptions = {
    origin: environment.CORS_ORIGIN,
    credentials: true,
  }

  app.use(cors(corsOptions))

  app.use(express.static('public'))

  app.get('/breathe', (_req, res) => {
    console.log(`[flows-static] breathe`)
    res.status(200).send()
  })

  app.get('/files/images/re-size/:relativedir/:filetype', async (req, res) => {
    const { relativedir: rdir, filetype: ftyp } = req.params

    if (!rdir || typeof rdir !== 'string') {
      res.status(404).send({ message: 'missing relative directory parameter' })
    }

    if (!ftyp || typeof ftyp !== 'string') {
      res.status(404).send({ message: 'missing file type parameter' })
    }

    const filePath = `images/${rdir}.${ftyp.toLowerCase()}`

    const resize = await FunctionsImagesReSize({
      filePath,
      scalar: 0.2,
    })

    if (!resize) {
      res.status(404).send({ message: `no file in public/${filePath}` })
    }

    //
    res.status(200).send()
  })

  app.listen(environment.PORT, (): void => {
    console.log(`[flows-static] (node_env) ${env} `)
    console.log(`[flows-static] (region) ${region}`)
    console.log(`[flows-static] (EU) ${EU}`)
  })

  return app
}

export default server
