import SDK, { EVENT, AD_TYPE } from './index'


describe('SDK test', () => {

  beforeEach(() => fetch.resetMocks())


  describe('constructor', () => {
    test('should not throw', () => {
      expect(() => new SDK()).not.toThrowError();
    });

    test('should not throw when passing slots', () => {
      const slot = {
        type: 'VIDEO',
        element: document.createElement('div')
      }
      expect(() => new SDK(slot)).not.toThrowError();
    });
  });

  describe('requestAd', () => {
    test('should be a function', () => {
      expect(typeof SDK.prototype.requestAd).toEqual('function')
    });

    test('should throw when no slot', async () => {
      try {
        const sdk = new SDK()
        await sdk.requestAd()
      } catch (err) {
        expect(err.message).toMatch('no slot')
      }
    });

    test('should be a promise', () => {
      const sdk = new SDK({ type: AD_TYPE.VIDEO, element: document.createElement('span') })
      fetch.mockResponseOnce(JSON.stringify({}))
      expect(typeof sdk.requestAd().then).toEqual('function')
    });

    test('should trigger EVENT.AD_FAILED when response fail', async () => {
      const slot = {
        type: 'VIDEO',
        element: document.createElement('div')
      }
      const sdk = new SDK(slot)
      const mockResponse = {
        "success": false,
        "id": "1559753751051-166"
      }

      fetch.mockResponseOnce(JSON.stringify(mockResponse))
      const callbackStub = jest.fn()
      sdk.on(EVENT.AD_FAILED, callbackStub)

      await sdk.requestAd()

      expect(callbackStub).toBeCalled()
    });

    test('should trigger EVENT.AD_LOADED callback when success load VIDEO', async () => {
      const element = document.createElement('div')
      const slot = {
        type: 'VIDEO',
        element
      }
      const sdk = new SDK(slot)
      const mockResponse = {
        "success": true
      }

      fetch.mockResponseOnce(JSON.stringify(mockResponse))
      const callbackStub = jest.fn()
      sdk.on(EVENT.AD_LOADED, callbackStub)

      await sdk.requestAd()
      element.querySelector('iframe').onload()
      expect(callbackStub).toBeCalled()
    })

  });

  describe('on', () => {
    let sdk
    beforeEach(() => {
      sdk = new SDK()
    })

    test('should have function on', () => {
      expect(typeof SDK.prototype.on).toEqual('function')
    });

    test('should not throw when passing a valid event and callback', () => {
      expect(() => sdk.on(EVENT.AD_LOADED, () => { })).not.toThrow()
      expect(() => sdk.on(EVENT.AD_FAILED, () => { })).not.toThrow()
      expect(() => sdk.on(EVENT.AD_IMPRESSION, () => { })).not.toThrow()
    });

    test('should throw when not passing callback', () => {
      expect(() => sdk.on(EVENT.AD_LOADED)).toThrow()
    });

    test('should throw when passing invalid event', () => {
      expect(() => sdk.on("invalid-event", () => { })).toThrow()
    });

  });
});