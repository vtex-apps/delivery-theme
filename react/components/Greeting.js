import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, withProps, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import GreetingLoading from './GreetingLoading'
import { session } from 'vtex.store/Queries'

const Greeting = ({ profile }) => {
  if (!profile) return null

  return Wrapper(
    profile.firstName ? (
      <Fragment>
        <span className="pr2">
          <FormattedMessage id="delivery-dreamstore.greeting" />,
        </span>
        <span className="fw6 nowrap">{data.profile.firstName}!</span>
      </Fragment>
    ) : (
      <div className="nowrap">
        <FormattedMessage id="delivery-dreamstore.greeting" />!
      </div>
    )
  )
}

Greeting.defaultProps = {
  profile: {},
}

Greeting.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
  }),
}

const Wrapper = Component => props => (
  <div className="vtex-page-loading mh7 pv6 f3 fw4 c-on-base">
    <Component {...props} />
  </div>
)

const enhanced = compose(
  graphql(session, { options: { ssr: false } }),
  branch(
    ({ data, loading }) => loading || data.getSession === null,
    renderComponent(Wrapper(GreetingLoading)),
    withProps(({ data }) => ({ profile: data.getSession.profile }))
  )
)

export default enhanced(Greeting)
