import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllShoes,
  AllSneakers,
  AllBoots,
  AllFlipFlops,
  AllHeels,
  AllFlats,
  ErrorPage,
  Homepage,
  Shoe,
  Checkout,
  Cart,
  Success,
  UserOrders,
  UserProfile,
  OrderDetails
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/all-shoes" component={AllShoes} />
        <Route path="/sneakers" component={AllSneakers} />
        <Route path="/boots-booties" component={AllBoots} />
        <Route path="/flipflops" component={AllFlipFlops} />
        <Route path="/heels" component={AllHeels} />
        <Route path="/flats" component={AllFlats} />
        <Route path="/all-shoes/:shoeId" component={Shoe} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
        <Route path="/success" component={Success} />

        {isLoggedIn && (
          /* Routes placed here are only available after logging in */
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/orders/:orderId" component={OrderDetails} />
            <Route path="/orders" component={UserOrders} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route path="*" component={ErrorPage} />
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
