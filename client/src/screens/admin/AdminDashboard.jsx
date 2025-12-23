import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar.jsx';
import { RiShoppingBag3Line } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { FaArrowTrendDown } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { overview } from '../../redux/actions/reportAction.js';
import { errorToast, successToast } from '../../helper/toastify.js';
import { setError } from '../../redux/slices/reportSlice.js';
import Loader from '../../components/Loader.jsx';
import { FaUser } from "react-icons/fa";
import Chart from '../../components/Chart.jsx';
import { BsHourglassSplit } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { totalItems, lowStockCount, outStockCount, totalSuppliers, error, loading, success, expiredCount, expiringSoon } = useSelector(state => state.report);
  const chartData = { totalItems, totalSuppliers, lowStockCount, outStockCount }

  useEffect(() => {
    dispatch(setError(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(overview());
  }, [dispatch]);

  useEffect(() => {
    if (error) errorToast(error)
    if (success) successToast(success)
  }, [error, success]);

  return (
    <div className='bg-slate-200 min-h-screen flex'>
      <Sidebar />

      {/* right side dashboard page */}
      <div className="w-full ml-6 md:ml-10 mt-6 mr-6 pb-10 ">
        <h1 className="text-teal-700 text-3xl font-bold">Dashboard</h1>

        {loading && <Loader />}

        {/* Top Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-2 cursor-pointer">

          {/* box 1 */}
          <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4 rounded-2xl shadow-md hover:shadow-gray-400 transition">
            <RiShoppingBag3Line className="text-3xl text-yellow-500" />
            <span className="flex justify-between items-center mt-2">
              <h3 className="text-gray-500">Total Items</h3>
              <h1 className="text-3xl font-bold text-cyan-900">{totalItems}</h1>
            </span>
          </div>

          {/* box 2 */}
          <div className="bg-gradient-to-r from-gray-200 to-gray-400 p-4 rounded-2xl shadow-md hover:shadow-gray-400 transition">
            <AiOutlineStock className="text-3xl text-gray-500" />
            <span className="flex justify-between items-center mt-2">
              <h3 className="text-gray-500">Out of Stock</h3>
              <h1 className="text-3xl font-bold text-cyan-900">{outStockCount}</h1>
            </span>
          </div>

          {/* box 3 */}
          <div className="bg-gradient-to-r from-green-100 to-green-300 p-4 rounded-2xl shadow-md hover:shadow-gray-400 transition">
            <FaArrowTrendDown className="text-3xl text-green-600" />
            <span className="flex justify-between items-center mt-2">
              <h3 className="text-gray-500">Low Stock</h3>
              <h1 className="text-3xl font-bold text-cyan-900">{lowStockCount}</h1>
            </span>
          </div>

          {/* box 4 */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-2xl shadow-md hover:shadow-gray-400 transition">
            <FaUser className="text-3xl text-blue-500" />
            <span className="flex justify-between items-center mt-2">
              <h3 className="text-gray-500">Total Suppliers</h3>
              <h1 className="text-3xl font-bold text-cyan-900">{totalSuppliers}</h1>
            </span>
          </div>

          {/* box 5 */}
          <div className="bg-gradient-to-r from-red-100 to-red-300 p-4 rounded-2xl shadow-md hover:shadow-gray-400 transition">
            <RiErrorWarningFill className="text-3xl text-red-500" />
            <span className="flex justify-between items-center mt-2">
              <h3 className="text-gray-500">Expired Items</h3>
              <h1 className="text-3xl font-bold text-cyan-900">{expiredCount}</h1>
            </span>
          </div>

          {/* box 6 */}
          <div className="bg-gradient-to-r from-purple-200 to-purple-300 p-4 rounded-2xl shadow-md hover:shadow-gray-400 transition">
            <BsHourglassSplit className="text-3xl text-purple-500" />
            <span className="flex justify-between items-center mt-2">
              <h3 className="text-gray-500">Expiring Soon Items</h3>
              <h1 className="text-3xl font-bold text-cyan-900">{expiringSoon}</h1>
            </span>
          </div>
        </div>

        {/* chart component */}
        <div className='p-2 mt-10'>
          <Chart chartData={chartData} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
