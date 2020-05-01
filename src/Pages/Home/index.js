import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/module/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map((produtc) => ({
      ...produtc,
      priceFormat: formatPrice(produtc.price),
    }));

    this.setState({ products: data });
  }

  render() {
    const { products } = this.state;
    const { addToCartRequest } = this.props;
    const { amount } = this.props;
    return (
      <ProductList>
        {products.map((produtc) => (
          <li key={produtc.id}>
            <img src={produtc.image} alt={produtc.title} />
            <strong>{produtc.title}</strong>
            <span>{produtc.priceFormat}</span>
            <button type="button" onClick={() => addToCartRequest(produtc.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />{' '}
                {amount[produtc.id] || 0}
              </div>
              <span>Adicionar ao Carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = (state) => ({
  amount: state.Cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
