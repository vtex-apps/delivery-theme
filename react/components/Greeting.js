import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import GreetingLoading from './GreetingLoading'
import getGreeting from '../graphql/getGreeting.gql'

const Greeting = () => (
  <Query query={getGreeting} ssr={false}>
    {({ data, error, loading }) =>
      error ? null : (
        <div className="vtex-page-padding mh7 pv6 f3 fw4 c-on-base">
          {loading ? (
            <div className="w-50-m">
              <GreetingLoading />
            </div>
          ) : data.profile.firstName ? (
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
          )}
        </div>
      )
    }
  </Query>
)

export default Greeting
