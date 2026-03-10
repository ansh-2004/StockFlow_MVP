import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductsForm from './pages/ProductForm'
import Settings from './pages/Settings'

import ProtectedRoute from "./components/ProtectedRoute";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>

        <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
        <Route path='/products' element={<ProtectedRoute><Products/></ProtectedRoute>}></Route>

        <Route path='/Products/new' element={<ProtectedRoute><ProductsForm/></ProtectedRoute>}></Route>
        <Route path='/Products/edit/:id' element={<ProtectedRoute><ProductsForm/></ProtectedRoute>}></Route>
        <Route path='/settings' element={<ProtectedRoute><Settings/></ProtectedRoute>}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
