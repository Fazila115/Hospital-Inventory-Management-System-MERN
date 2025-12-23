import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader.jsx'
import ItemTable from '../../components/ItemTable.jsx'

const Items = () => {
    const { loading } = useSelector(state => state.item)
    return (
        <div className='bg-slate-200 min-h-screen flex'>
            <Sidebar />

            {/* right side page */}
            <div className="w-full ml-6 md:ml-10 mt-6 mr-6 pb-10">
                <h1 className="text-teal-700 text-3xl font-bold">Items</h1>

                {loading && <Loader />}
                {/* Table Section */}
                <ItemTable />

            </div>
        </div>
    )
}

export default Items;



