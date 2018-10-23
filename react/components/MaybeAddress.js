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
    homePage: 'store/home',
    orderPage: 'store/order'
  }

  get isLandingPage() {
    const { runtime } = this.props
    return !!runtime.pages[runtime.page].landing
  }

  getRedirectPath = () => {
    const {
      runtime,
      homePage,
      orderPage,
      orderFormContext: { orderForm, loading },
    } = this.props

    if (loading) return ''

    const isIdentified = orderForm.shippingData && orderForm.shippingData.address
    if (runtime.page !== homePage && !this.isLandingPage && !isIdentified) {
      /**
       * If the page to be accessed is not "public" aka a landing page or the home page
       * and the user is not identified via orderForm, redirect it to the home page
       */
      return runtime.pages[homePage].path
    } else if (runtime.page === homePage && isIdentified) {
      /**
       * is the user lands on the home page for some reason but
       * it's already identified, redirect to the order page
       */
      return runtime.pages[orderPage].path
    }
    return ''
  }

  render() {
    const { runtime, homePage, children } = this.props

    const redirectPath = this.getRedirectPath()

    if (redirectPath)
      return (
        <Redirect
          to={redirectPath}
          navigate={runtime.navigate}
          shouldReturn={redirectPath === homePage}
        />
      )

    return children ? children : null
  }
}

export default compose(
  orderFormConsumer,
  withRuntimeContext
)(MaybeAddress)
