import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Products from './views/Products'
import SuccessfulPurchase from './views/SuccessfulPurchase'

const App = () => {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/success' element={<SuccessfulPurchase />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App
