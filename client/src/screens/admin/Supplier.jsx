import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getSuppliers } from '../../redux/actions/reportAction';
import { errorToast, successToast } from '../../helper/toastify';
import Loader from '../../components/Loader.jsx'

const Supplier = () => {
    const dispatch = useDispatch();
    const { error, success, loading, suppliers } = useSelector(state => state.report);

    useEffect(() => {
        dispatch(getSuppliers());
    }, [dispatch]);

    useEffect(() => {
        if (error) errorToast(error)
        if (success) successToast(success)
    }, [error, success]);

    return (
        <div className='bg-slate-200 min-h-screen flex'>
            <Sidebar />

            {/* right side page */}
            <div className="w-full ml-6 md:ml-10 mt-6 mr-6 pb-10">
                <h1 className="text-teal-700 text-3xl font-bold">Supplier</h1>

                {loading && <Loader />}
                {/* Table Section */}
                <div className="relative overflow-x-auto bg-white shadow-md mt-10 rounded-lg mr-4">

                    <table className="w-full text-sm md:text-base text-left text-gray-500">
                        <thead className="text-xs md:text-sm text-white uppercase bg-teal-600">
                            <tr>
                                <th className="px-3 py-2">#</th>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Contact No (s)</th>
                                <th className="px-3 py-2">Item(s)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {!loading && suppliers.length > 0 && suppliers.map((p, index) => (
                                <tr key={index} className="hover:bg-gray-100 border-b text-sm">
                                    <th className="p-3 font-medium text-teal-900"> {index + 1}</th>
                                    <td className="p-3">{p.name}</td>
                                    <td className="p-3">
                                        {p.contacts.map((r, idx) => <p key={idx} >{r}</p>)}
                                    </td>
                                    <td className="p-2">{
                                        p.items.map((r, i) =>
                                            <div key={i} className='flex items-center gap-2'>
                                                <p>{i + 1}</p>
                                                <p>{r.title}</p>
                                            </div>
                                        )
                                    }</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    {!loading && suppliers.length === 0 && (
                        <p className="text-center text-gray-700 py-10">No suppliers found.</p>)}
                </div>

            </div>
        </div>
    )
}

export default Supplier;



