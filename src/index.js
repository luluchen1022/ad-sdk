
import SDK, { EVENT, AD_TYPE } from './sdk'

const slotBanner = {
  type: AD_TYPE.BANNER,
  element: document.querySelector('.banner-slot')
}

const sdkBanner = new SDK(slotBanner)

sdkBanner.requestAd()

sdkBanner.on(EVENT.AD_LOADED, () => { console.log('loaded!') })
sdkBanner.on(EVENT.AD_FAILED, () => { console.log('fail!') })
sdkBanner.on(EVENT.AD_IMPRESSION, () => { console.log('impression!') })


const slotVideo = {
  type: AD_TYPE.VIDEO,
  element: document.querySelector('.video-slot')
}

const sdkVideo = new SDK(slotVideo)

sdkVideo.requestAd()

sdkVideo.on(EVENT.AD_LOADED, () => { console.log('loaded!') })
sdkVideo.on(EVENT.AD_FAILED, () => {
  console.log('fail!')
  slotVideo.element.style.display = "none"
})
sdkVideo.on(EVENT.AD_IMPRESSION, () => { console.log('impression!') })