import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductsForm from './pages/ProductForm'
import Settings from './pages/Settings'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/Products/new' element={<ProductsForm/>}></Route>
        <Route path='/Products/edit/:id' element={<ProductsForm/>}></Route>
        <Route path='/settings' element={<Settings/>}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
