// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
