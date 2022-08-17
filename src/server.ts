import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { environment } from './library/environment/environment'

const server = async (env: string, region: string): Promise<typeof app> => {
  const PROD = env === 'production'
  const EU = region === 'eu'

  console.log(`[flows-static] Starting server...`)
  console.log(EU, `eu?`)

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

  app.get('/breathe', (_req, res) => {
    console.log(`[flows-static] breathe`)
    res.status(200).send()
  })

  app.get('/*', (_req, res) => {
    res.status(200).send({ message: 'quick' })
  })

  app.listen(environment.PORT, (): void => {
    console.log(`[flows-static] (node_env) ${env}`)
    console.log(`[flows-static] (region) ${region}`)
  })

  return app
}

export default server
