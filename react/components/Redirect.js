import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { canUseDOM } from 'exenv'

class Redirect extends Component {
  static propTypes = {
    /* Path to redirect to */
    to: PropTypes.string.isRequired,
    /* Render Provider's navigate method */
    navigate: PropTypes.func.isRequired,
    /* If the next page should return to the current one after a certain user action */
    shouldReturn: PropTypes.bool,
  }

  componentDidMount() {
    const { navigate, to, shouldReturn } = this.props

    // This makes the redirect code only be executed on the browser
    if (!canUseDOM) return

    if (to) {
      navigate({
        fallbackToWindowLocation: false,
        to,
        ...(shouldReturn
          ? { query: `returnUrl=${window.location.pathname.replace(/\/$/, '')}` }
          : {}),
      })
    }
  }

  render() {
    return null
  }
}

export default Redirect
