import React, { Component, Fragment } from 'react'
import { LayoutContainer, Helmet } from 'render'

import '../global.css'
import appMetadata from '../../manifest.json'
import pwaManifest from '../../public/pwa/manifest.json'

const APP_LOCATOR = 'vtex.delivery-dreamstore'

/** TODO - This is a theme app, we shouldn't have React components on this type of app. Redesign this solution after MVP. */
class DeliveryLayoutContainer extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <meta name="theme-color" content={pwaManifest.theme_color} />
          <script type="text/javascript" src="/pwa/workers/register.js?v=1" />
          <link rel="manifest"
            href={`/_v/private/assets/v1/linked/${APP_LOCATOR}@${appMetadata.version}/public/pwa/manifest.json`}
          />
        </Helmet>
        <LayoutContainer {...this.props} />
      </Fragment>
    )
  }
}

export default DeliveryLayoutContainer
