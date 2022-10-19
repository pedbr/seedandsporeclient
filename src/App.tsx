import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Checkout from './views/Checkout'

import Products from './views/Products'
import SuccessfulPurchase from './views/SuccessfulPurchase'

const App = () => {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<SuccessfulPurchase />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App
