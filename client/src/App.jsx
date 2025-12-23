import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from './screens/admin/AdminDashboard.jsx'
import Login from './screens/auth/Login.jsx'
import LandingPage from './screens/local pages/LandingPage.jsx'
import ItemForm from './screens/admin/ItemForm.jsx'
import PageNotFound from './screens/local pages/PageNotFound.jsx'
import Footer from './components/Footer.jsx'
import About from './screens/local pages/About.jsx'
import Header from './components/Header'
import Stocks from './screens/admin/Stocks.jsx'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Supplier from './screens/admin/Supplier.jsx'
import Items from './screens/admin/Items.jsx'
import ExpiryStat from './screens/admin/ExpiryStat.jsx'

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <ScrollToTop />

      <Routes>

        {/* local routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />

        {/* protected routes */}
        <Route path='/dashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path='/item-form/add' element={<ProtectedRoute><ItemForm /></ProtectedRoute>} />
        <Route path='/item-form/edit/:id' element={<ProtectedRoute><ItemForm /></ProtectedRoute>} />
        <Route path='/stocks' element={<ProtectedRoute><Stocks /></ProtectedRoute>} />
        <Route path='/supplier' element={<ProtectedRoute><Supplier /></ProtectedRoute>} />
        <Route path='/items' element={<ProtectedRoute><Items /></ProtectedRoute>} />
        <Route path='/expiry-stats' element={<ProtectedRoute><ExpiryStat /></ProtectedRoute>} />

        {/* page not found route */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer />

    </Router>
  )
}

export default App;