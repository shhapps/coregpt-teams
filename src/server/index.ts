import { readFileSync } from 'fs'
import https from 'https'
import { join } from 'path'
import { App, HttpPlugin, type IPlugin } from '@microsoft/teams.apps'
import { ConsoleLogger } from '@microsoft/teams.common/logging'
import { DevtoolsPlugin } from '@microsoft/teams.dev'
import { cwd } from 'process'

const sslOptions = {
  key: readFileSync(join(cwd(), './certs/server.key')),
  cert: readFileSync(join(cwd(), './certs/server.crt'))
}

const plugins: IPlugin[] = [new DevtoolsPlugin()]

if (process.env.NODE_ENV === 'development' && sslOptions.cert && sslOptions.key)
  plugins.push(new HttpPlugin(https.createServer(sslOptions)))
// Fallback to HTTP for local development if SSL certificates are not available
else plugins.push(new HttpPlugin())

const app = new App({ logger: new ConsoleLogger('tab', { level: 'debug' }), plugins: plugins })

app.tab('home', join(cwd(), 'dist'))

void app.start(3001)
