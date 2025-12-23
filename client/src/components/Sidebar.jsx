import React from 'react';
import { HiChartPie, HiShoppingBag } from "react-icons/hi";
import { GrDocumentPerformance } from "react-icons/gr";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux'
import { adminLogout } from '../redux/actions/authAction';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaBoxes } from "react-icons/fa";
import { MdOutlineQueryStats } from "react-icons/md";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch(adminLogout());
    navigate('/login');
  };

  const isActive = (path) =>
    location.pathname === path ? "bg-teal-100 text-teal-700 font-semibold shadow-md" : "hover:bg-teal-600";

  return (
    <div className="min-h-screen w-64 bg-teal-700 text-white flex flex-col">

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">

          <li>
            <Link to="/dashboard" className={`flex items-center px-3 py-2 rounded-md transition ${isActive("/dashboard")}`} >
              <HiChartPie className="mr-3 text-lg" /> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/items" className={`flex items-center px-3 py-2 rounded-md transition ${isActive("/items")}`} >
              <FaBoxes className="mr-3 text-lg" /> Items
            </Link>
          </li>

          <li>
            <Link to="/item-form/add" className={`flex items-center px-3 py-2 rounded-md transition ${isActive("/item-form/add")}`} >
              <HiShoppingBag className="mr-3 text-lg" /> Add Item
            </Link>
          </li>

          <li>
            <Link to="/supplier" className={`flex items-center px-3 py-2 rounded-md transition ${isActive("/supplier")}`} >
              <HiOutlineUserGroup className="mr-3 text-lg" /> Supplier
            </Link>
          </li>

          <li>
            <Link to="/stocks" className={`flex items-center px-3 py-2 rounded-md transition ${isActive("/stocks")}`} >
              <GrDocumentPerformance className="mr-3 text-lg" /> Stock
            </Link>
          </li>

          <li>
            <Link to="/expiry-stats" className={`flex items-center px-3 py-2 rounded-md transition ${isActive("/expiry-stats")}`} >
              <MdOutlineQueryStats className="mr-3 text-lg" /> Expiry Stats
            </Link>
          </li>

          <li>
            <button onClick={logout} className="flex items-center px-3 py-2 rounded-md hover:bg-teal-600 transition" >
              <FiLogOut className='mr-3 text-lg' />
              Logout
            </button>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
