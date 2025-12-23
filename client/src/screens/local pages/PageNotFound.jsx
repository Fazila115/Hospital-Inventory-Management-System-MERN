import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-2">Page Not Found</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
        Go to Home Page
      </Link>
    </div>
  )
}

export default PageNotFound;
