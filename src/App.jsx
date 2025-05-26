import React from 'react'
import './assets/styles.scss'
import Header from './header'
import Footer from './footer'
import UserTable from './userTable'
import { Routes, Route } from 'react-router'
import Home from './components/Home'
import Department from './components/Department'
import Employees from './components/Employee'
import NotFound from './components/NotFound'


function App() {
  return (
    <>
      {/* <Header />
      <div className='main_page_holder'>
        <div className='table_outer_holder'>
          <UserTable />
        </div>
      </div>
      <Footer /> */}
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route path="/department" element={<Department/>} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
