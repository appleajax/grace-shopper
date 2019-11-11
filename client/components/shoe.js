import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentShoe} from '../store/shoe'
import {addToUserCart} from '../store/order'

class Shoe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: '',
      size: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()

    this.setState({
      [event.target.name]: event.target.value
    })

    await this.props.addToUserCart(
      this.props.user.id,
      Number(this.state.quantity),
      this.props.current.id
    )

    this.props.history.push('/cart')
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    this.props.getCurrentShoe(this.props.match.params.shoeId)
  }

  render() {
    const categories = {
      1: 'Sneakers',
      2: 'Boots & Booties',
      3: 'Flip-Flops',
      4: 'Heels',
      5: 'Flats'
    }
    const {
      inventory,
      description,
      category,
      price,
      imageUrl,
      name
    } = this.props.current

    return (
      <div className="one-shoe-container">
        <div>
          <h3>{name}</h3>
          <img src={imageUrl} className="shoe-img" />
          <p>
            <b>Product description: </b>
          </p>
          <div id="description">{description}</div>
        </div>
        <div id="buy-container">
          <p>
            <b>Shoe type: </b>
            {categories[category]}
          </p>
          <p>
            <b>Price: </b>
            {'$' + (price / 100).toFixed(2)}{' '}
          </p>

          <form onSubmit={this.handleSubmit}>
            <label>
              {' '}
              <b>Quantity: </b>
              <select
                name="quantity"
                onChange={this.handleChange}
                value={this.state.quantity}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

            <label>
              {' '}
              <b>Size: </b>
              <select
                name="size"
                onChange={this.handleChange}
                value={this.state.size}
              >
                <option value="noSize">select size</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </label>

            <button id="add-to-cart" type="submit">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //need to add shoeId
  return {
    current: state.shoe.current,
    user: state.user,
    cart: state.order.cart
  }
}

const mapDispatchToProps = dispatch => {
  //need to dispatch addToUserCart with userId, quantity, shoeId, name, price
  return {
    getCurrentShoe: id => dispatch(getCurrentShoe(id)),
    addToUserCart: (userId, quantity, shoeId) =>
      dispatch(addToUserCart(userId, quantity, shoeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shoe)
