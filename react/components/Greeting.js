import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose, branch, withProps, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { withSession } from 'render'
import { session } from 'vtex.store/Queries'

import GreetingLoading from './GreetingLoading'

const Wrapper = Component => props => (
  <div className="vtex-page-loading mh7 pv4 f3 fw4 c-on-base">
    <Component {...props} />
  </div>
)

const Greeting = ({ profile }) => {
  if (!profile) return null

  return (
    <div className="vtex-page-loading mh7 pv4 f3 fw4 c-on-base">
      {profile.firstName ? (
        <Fragment>
          <span className="pr2">
            <FormattedMessage id="delivery-dreamstore.greeting" />,
          </span>
          <span className="fw6 nowrap">{profile.firstName}</span>
        </Fragment>
      ) : (
        <div className="nowrap">
          <FormattedMessage id="delivery-dreamstore.greeting" />!
        </div>
      )}
    </div>
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

const WrappedLoading = Wrapper(GreetingLoading)

const options = {
  name: 'session',
  options: () => ({ ssr: false }),
}

const enhanced = compose(
  withSession({ loading: <WrappedLoading /> }),
  graphql(session, options),
  branch(
    ({ session, loading }) => loading || !session.getSession,
    renderComponent(WrappedLoading),
    withProps(({ session }) => ({ profile: session.getSession.profile }))
  )
)

export default enhanced(Greeting)
