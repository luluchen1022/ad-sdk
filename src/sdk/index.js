export default class SDK {

  constructor({ type = AD_TYPE.BANNER, element } = {}) {
    this.handlers = {}
    this.type = type
    this.element = element
  }

  async requestAd() {
    const { element, type } = this
    if (!element) {
      throw new Error('There is no slot!')
    }

    const response = await fetch(`http://localhost:3000/ads?type=${type}`)
    const data = await response.json()

    if (data.success) {
      this._loadAd({ element, data })
      this._triggerEvent(EVENT.AD_LOADED)
    } else {
      this._triggerEvent(EVENT.AD_FAILED)
    }
  }

  _loadAd({ element, data }) {
    if (data.type === AD_TYPE.BANNER) {
      this._loadBanner({ element, data })
    } else {
      this._loadVideo({ element, data })
    }
  }

  _loadBanner({ element, data }) {
    const container = document.createElement('div')
    const img = document.createElement('img')
    img.src = data.image
    container.appendChild(img)
    element.appendChild(container)

    this._checkImpression({element, data})

    document.addEventListener('scroll', () => this._checkImpression())
  }

  _checkImpression({element, data}) {
    if (this._isImpressed()) {
      fetch(data.impression_url)
      this._triggerEvent(EVENT.AD_IMPRESSION)
    }
  }

  _isImpressed(element) {
    //is element be seen half????
  }

  _loadVideo({ element, data }) {

  }

  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('should passing a callback function')
    }

    if (!isValidEvent(event)) {
      throw new Error(`invalid event: ${event}`)
    }

    this.handlers[event] = callback
  }

  _triggerEvent(event) {
    if (typeof this.handlers[event] === 'function')
      this.handlers[event]()
  }
}

function isValidEvent(event) {
  return Object.values(EVENT).includes(event)
}

const EVENT = {
  AD_LOADED: 'on-ad-loaded',
  AD_FAILED: 'on-ad-failed',
  AD_IMPRESSION: 'on-ad-impression'
}

const AD_TYPE = {
  VIDEO: 'VIDEO',
  BANNER: 'BANNER'
}

export { EVENT, AD_TYPE }