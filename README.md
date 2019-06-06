# 使用方式

# 安裝與範例

```bash
# install
yarn

# start demo page by webpack-dev-server
yarn dev
```

## 一般廣告

```js
import SDK, { EVENT, AD_TYPE } from './sdk'

const slotBanner = {
  type: AD_TYPE.BANNER,
  element: document.querySelector('.banner-slot')
}

const sdkBanner = new SDK(slotBanner)

sdkBanner.requestAd()

sdkBanner.on(EVENT.AD_LOADED, () => { console.log('loaded!') })
sdkBanner.on(EVENT.AD_FAILED, () => { console.log('fail!') })
```

### 呈現畫面:

![](https://user-images.githubusercontent.com/1284568/58097704-94d4c500-7c0a-11e9-93f4-9ca2fe812d99.png)

## 影片廣告

```js
import SDK, { EVENT, AD_TYPE } from './sdk'
const slotVideo = {
  type: AD_TYPE.VIDEO,
  element: document.querySelector('.video-slot')
}

const sdkVideo = new SDK(slotVideo)

sdkVideo.requestAd()

sdkVideo.on(EVENT.AD_LOADED, () => { console.log('loaded!') })
sdkVideo.on(EVENT.AD_FAILED, () => { 
  console.log('fail!')
  slotVideo.element.style.display="none"
 })
```

### 呈現畫面:

![](https://user-images.githubusercontent.com/1284568/58097483-137d3280-7c0a-11e9-978c-8cadc5d76419.png)

