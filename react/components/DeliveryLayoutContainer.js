import React, { Component } from 'react'
import { LayoutContainer } from 'render'

import '../global.css'
import MaybeAddress from './MaybeAddress'

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
