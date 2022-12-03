import { SnackbarProvider } from 'notistack'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Checkout from './views/Checkout'
import Homepage from './views/Homepage'
import Products from './views/Products'
import SuccessfulPurchase from './views/SuccessfulPurchase'

const AppContainer = () => {
  return (
    <SnackbarProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/store' element={<Products />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<SuccessfulPurchase />} />
      </Routes>
    </SnackbarProvider>
  )
}

export default AppContainer
