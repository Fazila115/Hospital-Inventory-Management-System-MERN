import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx';
import { TabItem, Tabs, Card } from "flowbite-react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2"
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../redux/slices/reportSlice.js';
import { getExpiredItems, getExpiringSoon } from '../../redux/actions/reportAction.js';
import { errorToast, successToast } from '../../helper/toastify.js'
import Loader from '../../components/Loader.jsx'
import { MdOutlineTimerOff } from "react-icons/md";
import { FaSkullCrossbones } from "react-icons/fa6";
import { HiOutlineClock } from "react-icons/hi2";

const ExpiryStat = () => {
    const dispatch = useDispatch();
    const { reports, days, error, success, loading } = useSelector(state => state.report);
    const [activeTab, setActiveTab] = useState(0);

    // clearing previous errors
    useEffect(() => {
        dispatch(setError(null));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getExpiredItems())
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
                <h1 className="text-teal-700 text-3xl font-bold">Expiry</h1>

                {loading &&
                    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
                        <Loader />
                    </div>
                }

                {/* tabs component */}
                <Tabs onActiveTabChange={(tabIndex) => {
                    setActiveTab(tabIndex);
                    if (tabIndex === 0) dispatch(getExpiredItems());
                    if (tabIndex === 1) dispatch(getExpiringSoon());
                }}
                    aria-label="Tabs with icons" variant="underline" className="text-teal-900 w-full">

                    {/* expired items section */}
                    <TabItem title={<span className={`flex items-center pb-2 ${activeTab === 0 ? "border-b-2 border-teal-600 text-teal-600 font-semibold" : ""}`}> <MdOutlineTimerOff className="text-red-600 mr-1" /> Expired Items</span>} >
                        <Card className="border border-red-200 shadow-sm">
                            <div className="flex items-center gap-2 text-red-600 font-semibold text-lg">
                                <FaSkullCrossbones className="text-xl" />
                                Expired Items - ({reports.length})
                            </div>

                            <div className="mt-4 space-y-6">
                                {!loading && reports.length > 0 && reports.map((p) =>
                                    <div key={p._id}>
                                        <div className="mt-4 flex justify-between">
                                            <p className="font-medium text-gray-900">{p.title}</p>
                                            <p className="text-sm text-gray-500">{p.expiryDate}</p>
                                        </div>
                                        <hr />
                                    </div>
                                )}
                            </div>

                        </Card>
                    </TabItem>

                    {/* expiring soon items section */}
                    <TabItem onActiveTabChange={(idx) => { }} title={<span className={`flex items-center pb-2 ${activeTab === 1 ? "border-b-2 border-teal-600 text-teal-600 font-semibold" : ""}`}> <HiOutlineClock className="text-yellow-600 mr-1" />Expiring Soon Items </span>} >
                        <Card className="border border-yellow-200 shadow-sm">
                            <div className="flex items-center gap-2 text-yellow-600 font-semibold text-lg">
                                <HiOutlineExclamationTriangle className="text-xl" />
                                Expiring Soon Items - ({reports.length}) - <p className='text-red-500 text-sm'>{days} days left</p>
                            </div>

                            <div className="mt-4 space-y-6">
                                {!loading && reports.length > 0 && reports.map((p, i) =>
                                    <div key={i} >

                                        <div className='flex items-center justify-between'>
                                            <p className="font-medium text-gray-900">{p.title}</p>
                                            <p className="text-sm text-gray-500">{p.expiryDate}</p>
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

export default ExpiryStat;
