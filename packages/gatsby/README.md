> /packages/gatsby/README.md

# `@hgod-in-cv/gatsby`

Gatsby site for Henrique Godinho's Curriculum Vitae.

## env variables

```sh
API_BASE={api base url} 
API_ID={api apps-script id} 
API_TOKEN={api token}
GA_TRACKING_ID={google analytics tracking id}
```

The `API_BASE` and `API_ID` variables can be found in the Google Apps Script deploy URL, the first will be the `https://script.google.com/macros/s/` part and the second will be the part between the `/s/` and the `/exec` parts.

The `API_TOKEN` can be retrieved by running the `getToken` function in the Google Apps Script editor from api project.

The `GA_TRACKING_ID` can be found in the Google Analytics dashboard.
