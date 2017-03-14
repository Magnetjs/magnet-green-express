import { Module } from 'magnet-core/module'
import * as greenlock from 'greenlock-express'

import defaultConfig from './config/greenlock_express'

// TODO: Increase the speed of get cert, or anyway to cache it?
export default class Greenlock extends Module {
  async setup () {
    const config = this.prepareConfig('greenlock_express', defaultConfig)

    this.app.greenlock = greenlock.create(config)

    // Any better way?
    // this.app.config.spdy.app = this.app.greenlock.middleware(this.app.koa.callback())
    this.app.config[config.magnet.plain].wrappers.push(this.app.greenlock.middleware)
    this.app.config[config.magnet.tls].wrappers.push(this.app.greenlock.middleware)
    this.app.config[config.magnet.tls].httpsOptions = Object.assign(this.app.config.https.httpsOptions, this.app.greenlock.httpsOptions)
    // this.app.config.spdy.wrappers.push(this.app.greenlock.middleware)
    // this.app.config.spdy.httpsOptions = Object.assign(this.app.config.https.httpsOptions, this.app.greenlock.httpsOptions)
    // this.app.config.spdy.httpsOptions = this.app.greenlock
  }
}
