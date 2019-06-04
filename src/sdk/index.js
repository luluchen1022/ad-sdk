export default class SDK {

  constructor() {
    this.handlers = {}
  }

  async requestAd() {
    this.handlers[EVENT.AD_LOADED]()
  }

  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('should passing a callback function')
    }
    this.handlers[event] = callback
  }
}

const EVENT = {
  AD_LOADED: 'on-ad-loaded'
}

export { EVENT }