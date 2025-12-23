import React, { useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { reStock } from "../redux/actions/reportAction.js";
import { errorToast, successToast } from "../helper/toastify.js";
import { setError } from "../redux/slices/reportSlice.js";

const ReStockPopUp = ({ itemId, currentStock, activeTab }) => {
    const [showModal, setShowModal] = useState(false);
    const [stock, setStock] = useState("");
    const { error, success } = useSelector(state => state.report)
    const dispatch = useDispatch();

    const onCloseModal = () => {
        setShowModal(false);
        setStock("");
        dispatch(setError(null));
    };

    // clearing previous errors
    useEffect(() => {
        dispatch(setError(null));
    }, [dispatch]);

    const handleConfirm = () => {
        // determine tab type
        let tabType;
        if (activeTab === 0) tabType = "out";
        if (activeTab === 1) tabType = "low";

        // pass tabType to reStock
        dispatch(reStock(itemId, stock, tabType));
        successToast('Stock updated!');
        onCloseModal();
    };

    useEffect(() => {
        if (error) errorToast(error)
        if (success) successToast(success)
    }, [error, success]);

    return (
        <div className="relative">
            <Button color='teal' size="sm" onClick={() => setShowModal(true)}>Restock</Button>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Modal Content */}
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
                        {/* Close Button */}
                        <button onClick={onCloseModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"> &times; </button>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Increase Stock</h3>

                        <div className="mb-4">
                            <Label className="mb-2 block">Quantity</Label>
                            <TextInput id="stock" placeholder={`Current stock: ${currentStock}`} value={stock}
                                onChange={(e) => setStock(e.target.value)} type="number" min="1" required className="w-full" />
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button color="gray" onClick={onCloseModal} >  Cancel </Button>
                            <Button color="teal" onClick={handleConfirm}> Confirm </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReStockPopUp;