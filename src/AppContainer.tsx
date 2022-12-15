import { SnackbarProvider } from 'notistack'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'

import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Checkout from './views/Checkout'
import Homepage from './views/Homepage'
import Products from './views/Products'
import SingleProduct from './views/SingleProduct'
import SuccessfulPurchase from './views/SuccessfulPurchase'

const AppContainer = () => {
  return (
    <SnackbarProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/store' element={<Products />} />
        <Route path='/store/product/:productId' element={<SingleProduct />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<SuccessfulPurchase />} />
      </Routes>
      <Footer />
    </SnackbarProvider>
  )
}

export default AppContainer
