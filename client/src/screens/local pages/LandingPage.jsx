import React from 'react'
import { Button } from 'flowbite-react'
import homeImg from '../../images/home.jfif'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='bg-slate-200 min-h-screen' >

      {/* background image */}
      <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${homeImg})`, }} >

        {/* Dark Overlay */}
        <div className="w-full min-h-screen bg-black/60 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Hospital Inventory Management System
            </h1>

            <p className="text-sm sm:text-base md:text-lg mb-6 text-gray-200">
              Smart solution to manage medical stock, monitor supplies, reduce
              wastage, and ensure smooth hospital operations.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <Link to='/login'><Button color="teal" className="w-full sm:w-auto">
                Get Started
              </Button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
