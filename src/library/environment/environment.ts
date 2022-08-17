import * as dotenv from 'dotenv-safe'

dotenv.config({ allowEmptyValues: false })

export const environment = {
  // port
  PORT: process.env.PORT,

  // cors
  CORS_ORIGIN: process.env.CORS_ORIGIN,
}
