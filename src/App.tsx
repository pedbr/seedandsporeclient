import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Navbar from './components/Navbar'
import Checkout from './views/Checkout'
import Products from './views/Products'
import SuccessfulPurchase from './views/SuccessfulPurchase'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
