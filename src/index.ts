/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dotenv from 'dotenv-safe'
import { environment } from './library/environment/environment'
import server from './server'

dotenv.config({ allowEmptyValues: false })

const region = process.argv[2] || 'global'
const env = process.env.NODE_ENV || 'dev'

server(env, region)
  .then(() => {
    console.log(`[flows-static] Success. Listening on port ${environment.PORT}.`)
  })
  .catch((e: any) => {
    console.log(`[flows-static] Error.\n`, e)
  })
