import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { deleteItem, fetchItems } from '../redux/actions/itemAction.js';
import { errorToast, successToast } from '../helper/toastify.js';
import Loader from '../components/Loader.jsx'

const ItemTable = () => {
    const dispatch = useDispatch();
    const { items, loading, error, success } = useSelector(state => state.item);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    useEffect(() => {
        if (error) errorToast(error)
        if (success) successToast(success)
    }, [error, success]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteItem(id));
            successToast('Item Deleted Successfully!')
        }
    };

    return (
        <div className='mt-10' >
            <div className="relative overflow-x-auto px-4">

                {loading && <Loader />}

                <table className="w-full bg-white text-sm md:text-base text-left text-gray-500 dark:text-gray-400 rounded-lg">
                    <thead className="text-xs md:text-sm text-white uppercase bg-teal-600 dark:bg-teal-700 dark:text-teal-400">
                        <tr>
                            <th className="px-3 py-2">#</th>
                            <th className="px-3 py-2">Title</th>
                            <th className="px-3 py-2">Brand</th>
                            <th className="px-3 py-2">Category</th>
                            <th className="px-3 py-2">Stock</th>
                            <th className="px-3 py-2">Price</th>
                            <th className="px-3 py-2">Supplier</th>
                            <th className="px-3 py-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!loading && items.length > 0 && items.map((p, index) =>
                            <tr key={p._id}>
                                <th className="px-3 py-4 font-medium text-gray-900 dark:text-white">{index + 1}</th>
                                <td className="px-3 py-4">{p.title}</td>
                                <td className="px-3 py-4">{p.brand}</td>
                                <td className="px-3 py-4">{p.category}</td>
                                <td className="px-3 py-4">{p.stock}</td>
                                <td className="px-3 py-4">{p.price}</td>
                                <td className="px-3 py-2">{p.supplier}</td>
                                <td className="px-3 py-4 flex gap-2 text-xl sm:text-2xl">
                                    <Link to={`/item-form/edit/${p._id}`}>
                                        <CiEdit title="Edit product" className="text-blue-600 hover:text-blue-500 cursor-pointer" />
                                    </Link>
                                    <FaRegTrashAlt title="Delete product" onClick={() => deleteHandler(p._id)} className="text-red-500 hover:text-red-600 cursor-pointer" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {!loading && items.length === 0 && (
                    <p className="text-center text-gray-700 py-10">No items found.</p>)}
            </div>
        </div >
    )
}

export default ItemTable;
