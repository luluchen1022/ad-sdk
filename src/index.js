
import SDK, { EVENT, AD_TYPE } from './sdk'

const slot = {
  type: AD_TYPE.BANNER,
  element: document.querySelector('.banner-slot')
}

const sdk = new SDK(slot)

sdk.requestAd()

sdk.on(EVENT.AD_LOADED, () => { console.log('loaded!') })
sdk.on(EVENT.AD_FAILED, () => { console.log('fail!') })
