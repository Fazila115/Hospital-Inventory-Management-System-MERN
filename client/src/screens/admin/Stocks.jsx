import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx';
import { TabItem, Tabs, Card, Button } from "flowbite-react";
import { AiOutlineCloseCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import { FaSkullCrossbones } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2"
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../redux/slices/reportSlice.js';
import { lowStock, outOfStock } from '../../redux/actions/reportAction.js';
import { errorToast, successToast } from '../../helper/toastify.js'
import Loader from '../../components/Loader.jsx'
import ReStockPopUp from '../../components/ReStockPopUp.jsx';

const SellerStocks = () => {
    const dispatch = useDispatch();
    const { reports, lowStockCount, outStockCount, error, success, loading } = useSelector(state => state.report);
    const [activeTab, setActiveTab] = useState(0);

    // clearing previous errors
    useEffect(() => {
        dispatch(setError(null));
    }, [dispatch]);

    useEffect(() => {
        dispatch(outOfStock())
    }, [dispatch])

    useEffect(() => {
        if (error) errorToast(error)
        if (success) successToast(success)
    }, [error, success]);

    return (
        <div className='bg-slate-200 min-h-screen flex'>
            <Sidebar />

            {/* right side page */}
            <div className="w-full ml-6 md:ml-10 mt-6 mr-6 pb-10">
                <h1 className="text-teal-700 text-3xl font-bold">Stocks</h1>

                {loading &&
                    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
                        <Loader />
                    </div>
                }

                {/* tabs component */}
                <Tabs onActiveTabChange={(tabIndex) => {
                    setActiveTab(tabIndex);
                    if (tabIndex === 0) dispatch(outOfStock());
                    if (tabIndex === 1) dispatch(lowStock());
                }}
                    aria-label="Tabs with icons" variant="underline" className="text-teal-900 w-full">

                    {/* out of stock section */}
                    <TabItem title={<span className={`flex items-center pb-2 ${activeTab === 0 ? "border-b-2 border-teal-600 text-teal-600 font-semibold" : ""}`}> <AiOutlineCloseCircle className="text-red-600 mr-1" /> Out of Stock</span>} >
                        <Card className="border border-red-200 shadow-sm">
                            <div className="flex items-center gap-2 text-red-600 font-semibold text-lg">
                                <HiOutlineExclamationTriangle className="text-xl" />
                                Out of Stock ({outStockCount})
                            </div>

                            <div className="mt-4 space-y-6">
                                {!loading && reports.length > 0 && reports.map((p) =>
                                    <div key={p._id}>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <div className="mt-4">
                                                    <p className="font-medium text-gray-900">{p.title}</p>
                                                    <p className="text-sm text-gray-500">{p.brand} • {p.price} Rs/-</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {/* Restock button with popup */}
                                                <ReStockPopUp itemId={p._id} currentStock={p.stock} activeTab={activeTab} />

                                            </div>
                                        </div>

                                        <hr />
                                    </div>
                                )}
                            </div>

                        </Card>
                    </TabItem>

                    {/* low stock section */}
                    <TabItem onActiveTabChange={(idx) => { }} title={<span className={`flex items-center pb-2 ${activeTab === 1 ? "border-b-2 border-teal-600 text-teal-600 font-semibold" : ""}`}> <AiOutlineExclamationCircle className="text-yellow-600 mr-1" /> Low Stock</span>} >
                        <Card className="border border-yellow-200 shadow-sm">
                            <div className="flex items-center gap-2 text-yellow-600 font-semibold text-lg">
                                <HiOutlineExclamationTriangle className="text-xl" />
                                Low Stock ({lowStockCount})
                            </div>

                            <div className="mt-4 space-y-6">
                                {!loading && reports.length > 0 && reports.map((p) =>
                                    <div key={p._id} >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{p.title}</p>
                                                <p className="text-sm text-gray-500">{p.brand} • {p.price} Rs/-</p>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className="text-yellow-600 font-semibold">Stock: {p.stock}</span>

                                                {/* Restock button with popup */}
                                                <ReStockPopUp itemId={p._id} currentStock={p.stock} activeTab={activeTab} />
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        < hr />
                                    </div>)}
                            </div>
                        </Card>
                    </TabItem>
                </Tabs>
            </div>
        </div>
    )
}

export default SellerStocks;
