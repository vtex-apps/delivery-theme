import React, { Component } from 'react'
import { LayoutContainer } from 'render'

import '../global.css'
import MaybeAddress from './MaybeAddress'

/** TODO - This is a theme app, we shouldn't have React components on this type of app. Redesign this solution after MVP. */
class DeliveryLayoutContainer extends Component {
  render() {
    return (
      <MaybeAddress>
        <LayoutContainer {...this.props} />
      </MaybeAddress>
    )
  }
}

export default DeliveryLayoutContainer
