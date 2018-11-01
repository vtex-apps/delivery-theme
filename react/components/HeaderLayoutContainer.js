import React, { Component } from 'react'
import { LayoutContainer, NoSSR } from 'render'
import { orderFormConsumer } from 'vtex.store/OrderFormContext'

import '../global.css'
import Modal from './Modal';

const xor = (a, b) => (!a && !b) || (a && b)

/** TODO - This is a theme app, we shouldn't have React components on this type of app. Redesign this solution after MVP. */
class HeaderLayoutContainer extends Component {
  isIdentified = () => {
    const {
      orderFormContext: { orderForm, loading },
    } = this.props
    return !loading && orderForm.shippingData && orderForm.shippingData.address
  }

  componentDidMount() {
    const {toggleLeanMode, leanMode} = this.props
    if (xor(this.isIdentified(), leanMode)) {
      toggleLeanMode()
    }
  }

  render() {
    return !this.isIdentified()
      ? (
        <NoSSR>
          <Modal>
            <LayoutContainer {...this.props} />
          </Modal>
        </NoSSR>
      )
      : null
  }
}

export default orderFormConsumer(HeaderLayoutContainer)
