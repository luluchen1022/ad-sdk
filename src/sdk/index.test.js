import SDK, { EVENT } from './index'

describe('constructor', () => {
  test('should not throw', () => {
    expect(() => new SDK()).not.toThrowError();
  });

  test('should not throw when passing an element', () => {
    expect(() => new SDK(document.createElement('span'))).not.toThrowError();
  });
});

describe('requestAd', () => {
  test('should be a function', () => {
    expect(typeof SDK.prototype.requestAd).toEqual('function')
  });

  test('should be a promise', () => {
    expect(typeof SDK.prototype.requestAd().then).toEqual('function')
  });
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
  });

  test('should throw when not passing callback', () => {
    expect(() => sdk.on(EVENT.AD_LOADED)).toThrow()
  });

  test('should callback when EVENT.AD_LOADED', async () => {
    const stub = jest.fn()
    sdk.on(EVENT.AD_LOADED, stub)
    await sdk.requestAd()
    expect(stub).toBeCalled()
  })
});

