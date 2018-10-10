import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { orderFormConsumer, contextPropTypes } from 'vtex.store/OrderFormContext'
import { withRuntimeContext, Loading } from 'render'

import Redirect from './Redirect'

/**
 * If necessary, this redirects the user to the Address Locator page
 *
 * The user can be "identified" in thre ways:
 * - Has added their address on orderForm but is otherwise anonymous
 * - Has identified their email
 * - Has authenticated (thus being almost the same as the one above)
 *
 * For all of the above cases, just checking if there is an address
 * on the orderForm is enough to cover all edge cases
 *
 * With the bonus that it can be done on SSR, something that querying
 * the user profile can not do
 */
class MaybeAddress extends Component {
  static propTypes = {
    orderFormContext: contextPropTypes,
    pageToRedirect: PropTypes.string,
    runtime: PropTypes.shape({
      page: PropTypes.string.isRequired,
      pages: PropTypes.object.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    pageToRedirect: 'store',
  }

  get redirectPath() {
    const { runtime, pageToRedirect } = this.props
    return runtime.pages[pageToRedirect].path
  }

  get isLandingPage() {
    const { runtime } = this.props
    return !!runtime.pages[runtime.page].landing
  }

  shouldRedirect() {
    const {
      runtime,
      pageToRedirect,
      orderFormContext: { orderForm, loading },
    } = this.props

    if (loading) return false

    const isIdentified = orderForm.shippingData && orderForm.shippingData.address
    return runtime.page !== pageToRedirect && !this.isLandingPage && !isIdentified
  }

  render() {
    const { orderFormContext, runtime, children, ...parentProps } = this.props

    if (this.shouldRedirect())
      return <Redirect to={this.redirectPath} navigate={runtime.navigate} shouldReturn />

    return children ? children : null
  }
}

export default compose(
  orderFormConsumer,
  withRuntimeContext
)(MaybeAddress)
