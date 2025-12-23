import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar.jsx';
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../redux/slices/itemSlice.js';
import { addItem, editItem } from '../../redux/actions/itemAction.js';
import { useEffect } from 'react';
import { errorToast, successToast } from '../../helper/toastify.js'

const ItemForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error, success } = useSelector(state => state.item);

  // for editing product
  const existingProduct = id && items.find(item => item._id == id)

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: "",
    description: "",
    stock: '',
    category: '',
    supplier: '',
    contact: '',
    expiryDate: "",
  });

  // errors initial states
  const [errors, setErrors] = useState({
    title: "",
    brand: "",
    price: "",
    description: "",
    stock: '',
    category: '',
    supplier: '',
    contact: '',
    expiryDate: ''
  });

  // filling form inputs for editing
  useEffect(() => {
    if (existingProduct) {
      setFormData({
        title: existingProduct.title,
        brand: existingProduct.brand,
        price: existingProduct.price,
        description: existingProduct.description,
        stock: existingProduct.stock ?? 0,
        category: existingProduct.category,
        supplier: existingProduct.supplier,
        contact: existingProduct.contact,
        expiryDate: existingProduct.expiryDate ? existingProduct.expiryDate.split('T')[0] : ""
      })
    }
  }, [existingProduct])

  // clearing previous errors
  useEffect(() => {
    dispatch(setError(null));
  }, [dispatch]);

  // error toast
  useEffect(() => {
    if (error) errorToast(error)
    if (success) successToast(success)
  }, [error, success])

  function removeExtraSpaces(text) {
    return text.replace(/\s+/g, " ");
  }

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    if (name === 'title' || name === 'brand' || name === 'description' || name === 'supplier') {
      cleanedValue = removeExtraSpaces(cleanedValue);
    }

    setFormData({
      ...formData, [name]: cleanedValue
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  }

  // handling submit for add & edit
  const handlesubmit = (e) => {
    e.preventDefault()

    const { title, brand, description, price, stock, category, supplier, contact, expiryDate } = formData

    let tempError = {
      title: "",
      brand: "",
      price: "",
      description: "",
      stock: '',
      category: '',
      supplier: '',
      contact: '',
      expiryDate: ''
    }
    let valid = true;

    if (!title.trim()) { tempError.title = 'Title is required!'; valid = false; }

    if (!description.trim()) { tempError.description = 'Description is required!'; valid = false; }
    else if (description.length < 5) { tempError.description = 'Description must be at least 5 characters!'; valid = false; }
    else if (description.length > 500) { tempError.description = 'Maximum description length allowed is 500 characters!'; valid = false; }

    if (!brand.trim()) { tempError.brand = 'Brand is required!'; valid = false; }

    if (price === "") { tempError.price = 'Price is required!'; valid = false; }
    else if (price <= 0) { tempError.price = 'Invalid price value!'; valid = false; }
    else if (price > 10000000) { tempError.price = 'Maximum allowed price is 10,000,000!'; valid = false; }

    if (stock === "") { tempError.stock = 'Stock is required!'; valid = false; }
    else if (stock < 0) { tempError.stock = 'Invalid stock value!'; valid = false; }
    else if (stock > 1000) { tempError.stock = 'Maximum allowed stock is 1000!'; valid = false; }

    if (!category) { tempError.category = 'Category is required!'; valid = false; }

    if (!supplier) { tempError.supplier = 'Supplier is required!'; valid = false; }

    if (!contact) { tempError.contact = 'Phone No is required!'; valid = false; }
    else if (!/^(03)\d{9}$/.test(contact)) { tempError.contact = 'Invalid phone number. Enter 11 digits starting with 03!'; valid = false; }

    if (!expiryDate) { tempError.expiryDate = 'Expiry Date is required!'; valid = false; }

    setErrors(tempError);
    if (!valid) return;

    if (id) {
      dispatch(editItem(id, formData));
      successToast("Item Edited successfully!");
      navigate('/items');
      return;
    }
    else {
      dispatch(addItem(formData));
      successToast('Item added successfully!');
      navigate('/items');
      return;
    }
  }

  return (
    <div className='bg-slate-200 min-h-screen flex'>
      <Sidebar />

      <div className='w-full ml-6 md:ml-10 mt-6 mr-6 pb-10'>
        <form onSubmit={handlesubmit}>

          <h1 className='text-teal-800 font-bold text-lg mt-4 mb-4'>
            {id ? "Edit Item Form" : "Add Item Form"}
          </h1>

          {/* Title */}
          <label className='label'>Title</label>
          <input type="text" name='title' value={formData.title} onChange={handleChange} className='input' placeholder='Title of item' />
          {errors.title && <p className="text-red-600 text-xs ">{errors.title}</p>}

          {/* Description */}
          <label className='label'>Description</label>
          <textarea name='description' value={formData.description} onChange={handleChange} className='input h-32 sm:h-40 resize-none' placeholder='Small description of item' />
          {errors.description && <p className="text-red-600 text-xs ">{errors.description}</p>}

          {/* Brand & Stock */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='label'>Brand</label>
              <input type="text" name='brand' value={formData.brand} onChange={handleChange} className='priceInput' placeholder='Brand of item' />
              {errors.brand && <p className="text-red-600 text-xs ">{errors.brand}</p>}
            </div>

            <div>
              <label className='label'>Stock</label>
              <input type="number" name='stock' value={formData.stock} onChange={handleChange} className='priceInput' placeholder='Stock of item' />
              {errors.stock && <p className="text-red-600 text-xs ">{errors.stock}</p>}
            </div>
          </div>

          {/* Category & Price */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <div>
              <label className='label'>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className='priceInput' >
                <option value='' disabled >Select category</option>
                <option value='medicalAndDrugs'>Medicine & Drugs</option>
                <option value='medicalEquipments'>Medical Equipments</option>
                <option value='surgicalInstruments'>Surgical Instruments</option>
                <option value='medicalConsumeables'>Medical Consumables</option>
                <option value='laboratorySupplies'>Laboratory Supplies</option>
                <option value='hospitalFurniture'>Hospital Furniture</option>
                <option value='cleaningSupplies'>Cleaning Supplies</option>
                <option value='foodaAndKitchenSupplies'>Food & Kitchen Supplies</option>
                <option value='administrativeSupplies'>Administrative Supplies</option>
              </select>
              {errors.category && <p className="text-red-600 text-xs ">{errors.category}</p>}
            </div>

            <div>
              <label className='label'>Price</label>
              <input type="number" name='price' value={formData.price} onChange={handleChange} className='priceInput' placeholder='Price of item' />
              {errors.price && <p className="text-red-600 text-xs ">{errors.price}</p>}
            </div>
          </div>

          {/* supplier & contact */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='label'>Supplier</label>
              <input type="text" name='supplier' value={formData.supplier} onChange={handleChange} className='priceInput' placeholder='Supplier name' />
              {errors.supplier && <p className="text-red-600 text-xs ">{errors.supplier}</p>}
            </div>

            <div>
              <label className='label'>Contact</label>
              <input type="tel" name='contact' value={formData.contact} onChange={handleChange} maxLength={11} className='priceInput' placeholder='Phone No of supplier' />
              {errors.contact && <p className="text-red-600 text-xs ">{errors.contact}</p>}
            </div>
          </div>

          {/* expiry date */}
          <div className='flex items-center gap-4'>
            <label className='label'>Expiry Data</label>
            <input type="date" name='expiryDate' value={formData.expiryDate} onChange={handleChange} className='p-2 bg-white rounded-md border border-gray-300 focus:border-teal-700 text-gray-500 focus:text-black' placeholder='Expiry date of item' />
            {errors.expiryDate && <p className="text-red-600 text-xs ">{errors.expiryDate}</p>}
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button type="submit" disabled={loading} className={`mt-6 w-80 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}>
              {loading ? "Processing..." :
                id ? "SAVE CHANGES" : "ADD"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ItemForm;
