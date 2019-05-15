export const environment = {
  production: true,
  app: {
    // Display information about the total available images and the metadata objects that have been loaded
    showDebugInfo: true,

    // How many metadata image objects should be requested on each http call [1-1000]
    // Note: the Giphy API does not support more than 1000
    requestLimit: 100,

    // When the app should request more items (if available) [1-100]
    // This is a percentage, for example setting it to 50 will trigger new requests after the user scroll half the list
    scrollRequestThreshold: 80,
  },
  api: {
    url: 'https://api.giphy.com/v1/gifs/search',
    key: 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
  }
};
