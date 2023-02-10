import { Box } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Checkout from './views/Checkout'
import Contact from './views/Contact'
import Homepage from './views/Homepage'
import Products from './views/Products'
import SingleProduct from './views/SingleProduct'
import SuccessfulPurchase from './views/SuccessfulPurchase'
import TermsAndConditions from './views/TermsAndConditions'

const AppContainer = () => {
  return (
    <SnackbarProvider>
      <ScrollToTop />
      <Navbar />
      <Box minHeight={'100vh'} marginTop={'-80px'}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/store' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/store/product/:productId' element={<SingleProduct />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<SuccessfulPurchase />} />
          <Route
            path='/terms-and-conditions'
            element={<TermsAndConditions />}
          />
        </Routes>
      </Box>

      <Footer />
    </SnackbarProvider>
  )
}

export default AppContainer
