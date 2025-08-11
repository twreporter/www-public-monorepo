import { Logging } from '@google-cloud/logging'
import pino from 'pino'

const releaseBranch = process.env.NEXT_PUBLIC_RELEASE_BRANCH
const logging = new Logging()
const log = logging.log(`${releaseBranch}-new-dev-www-frontend`)

const isProduction = process.env.NODE_ENV === 'production'

const logger = pino({
  level: 'info',
  formatters: {
    level: (label) => ({ severity: label.toUpperCase() }),
  },
  hooks: {
    logMethod(inputArgs, method) {
      const message = inputArgs[0]
      const metadata = inputArgs.length > 1 ? inputArgs[1] : undefined
      const entry = log.entry(
        { resource: { type: 'global' } },
        metadata ? { message, ...metadata } : { message }
      )

      if (isProduction) {
        log.write(entry) // Send logs to Google Cloud in production
      }

      method.apply(this, inputArgs) // Always log to console
    },
  },
})

export default logger
