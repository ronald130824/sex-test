import { Route, Routes } from 'react-router-dom'

import MainPage from './pages/Main'
import Lingerie from './pages/Main/Burgers'
import Acessorios from './pages/Main/Drinks'
import Cosméticos from './pages/Main/IceCreams'
import Brincadeiras from './pages/Main/Pizzas'

import MyCartPage from './pages/MyCart'
import Payment from './pages/Payment'
import OrderSuccessPage from './pages/Orders/Success'

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path='/' element={<Lingerie />} />
        <Route path='algemas' element={<Brincadeiras />} />
        <Route path='Cosmeticos' element={<Acessorios />} />
        <Route path='Brincadeiras' element={<Cosméticos />} />
      </Route>
      <Route path='cart' element={<MyCartPage />} />
      <Route path='payment' element={<Payment />} />
      <Route path='order'>
        <Route path='success/:orderId' element={<OrderSuccessPage />} />
      </Route>
    </Routes>
  )
}
