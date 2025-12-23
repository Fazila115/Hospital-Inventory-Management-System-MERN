import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/logo.png'
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { useSelector } from 'react-redux'
import avatar from '../images/avatar.jpg'

const Header = () => {
  const [profileDrop, setProfileDrop] = useState(false);
  const { admin } = useSelector(state => state.auth);

  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // COMMON PROFILE DROPDOWN (for both admin & user)
  const ProfileSection = () => (
    <div className="relative" ref={profileRef}>
      <button onClick={() => setProfileDrop(!profileDrop)}>
        <img src={avatar} alt="No Img" className='w-10 h-10 rounded-full' />
      </button>

      {profileDrop && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 z-50">
          <h1 className='block px-4 py-2 text-teal-700 font-bold hover:bg-gray-100'>
            Admin
          </h1>
          <h3 className='block px-4 py-2 text-teal-600 hover:bg-gray-100'>
            {admin && admin.email}
          </h3>
        </div>
      )}
    </div>
  );

  return (
    <Navbar className='bg-teal-700 text-white font-semibold sticky top-0 z-50'>
      <NavbarBrand href='/'>
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="..." />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Hospital Inventory Management System</span>
      </NavbarBrand>

      <NavbarToggle className='text-white hover:bg-teal-700' />

      <NavbarCollapse >
        <div className='flex items-center gap-4'>
          {admin && <ProfileSection />}
        </div>

        {!admin && <div className='flex items-center gap-4'>
          <NavbarLink href="/about" className='text-white hover:text-teal-300 hover:bg-teal-700'>About</NavbarLink>
          <NavbarLink href="/login" className='text-white hover:text-teal-300 hover:bg-teal-700'>Login</NavbarLink>
        </div>
        }
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header;
