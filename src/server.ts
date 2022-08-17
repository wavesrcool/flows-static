import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { environment } from './library/environment/environment'
import FunctionsImagesReSize from './library/functions/images/re-size/FunctionsImagesReSize'

const server = async (env: string, region: string): Promise<typeof app> => {
  const PROD = env === 'production'
  const EU = region === 'eu'

  console.log(`[flows-static] Starting server...`)

  const app = express()
  app.use(helmet())
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

  app.get('/images/rs/:rdir', async (req, res) => {
    const { rdir } = req.params

    if (!rdir || typeof rdir !== 'string') {
      res.status(404).send({ message: 'missing relative directory parameter' })
    }

    const resize = await FunctionsImagesReSize({ rdir })

    if (!resize) {
      res.status(404).send({ message: 'no file in public/' })
    }

    //
    res.status(200).send()
  })

  app.get('/*', (_req, res) => {
    res.status(200).send({ message: 'quick' })
  })

  app.listen(environment.PORT, (): void => {
    console.log(`[flows-static] (node_env) ${env} `)
    console.log(`[flows-static] (region) ${region}`)
    console.log(`[flows-static] (EU) ${EU}`)
  })

  return app
}

export default server
