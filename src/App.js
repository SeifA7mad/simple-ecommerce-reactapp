import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Category from './pages/category-page/Category';
import Cart from './pages/cart-page/Cart';
import Product from './pages/product-page/Product';

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/' element={<Navigate to='/category/women' />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
