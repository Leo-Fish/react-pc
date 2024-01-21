import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
import { AuthComponent } from './component/Authcomponent'
import Publish from './pages/Layout/Publish'
import Article from './pages/Layout/Article'
import Home from './pages/Layout/Home'



function App () {
  return (
    <BrowserRouter>
      <div className='App' >
        <Routes>
          <Route path='/'
            element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            } >

            <Route index element={<Home />}></Route>
            <Route path='/article' element={<Article />}></Route>
            <Route path='/publish' element={<Publish />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App
