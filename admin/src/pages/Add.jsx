import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

const Add = ({token}) => {
    const initialImages={
        image1:false,
        image2:false,
        image3:false,
        image4:false
    }
    const initialValues={
        name:'',
        description:'',
        price:'',
        category:'Men',
        subCategory:'Topwear',
        bestseller:false,
    }
    const [images,setImages]=useState(initialImages);
    const [values,setValues]=useState(initialValues);
    const [sizes,setSizes]=useState([]);
    const handleChangeImage=(e)=>{
        const {id,files}=e.target;
        setImages({...images,[id]:files[0]})
    }
    const handleChangeValues=(e)=>{
        const {name,value,type,checked}=e.target;
        setValues({...values,[name]: type==="checkbox"? checked :value})
    }
    const handleChangeSizes = (size) => {
        setSizes(prevSizes => 
    prevSizes.includes(size)
      ? prevSizes.filter(item => item !== size) // Remove if exists
      : [...prevSizes, size] // Add if new (immutable way)
    );
    };
    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData=new FormData();
        formData.append("name",values.name)
        formData.append("description",values.description)
        formData.append("price",values.price)
        formData.append("bestseller",values.bestseller)
        formData.append("category",values.category)
        formData.append("subCategory",values.subCategory)
        formData.append("sizes",JSON.stringify(sizes))
        images.image1 && formData.append("image1",images.image1)
        images.image2 && formData.append("image2",images.image2)
        images.image3 && formData.append("image3",images.image3)
        images.image4 && formData.append("image4",images.image4)
        axios.post(backendUrl+'/api/product/add',formData,{headers:{token}})
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                console.log(response.data.message)
                toast.success(response.data.message)
                setImages(initialImages)
                setValues(initialValues)
                setSizes([]);
            }else{
                toast.error(response.data.message)
            }
        })
        .catch(error=>{
            console.log(error.response?.data)
            toast.error(error.response?.data?.message)
        })
    }
  return (
    <form className='flex flex-col w-full items-start gap-3' onSubmit={handleSubmit}>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
            <label htmlFor="image1">
                <img className='w-20' src={!images.image1?assets.upload_area:URL.createObjectURL(images.image1)} alt="" />
                <input onChange={handleChangeImage} type="file" id='image1' hidden/>
            </label>
            <label htmlFor="image2">
                <img className='w-20' src={!images.image2?assets.upload_area:URL.createObjectURL(images.image2)} alt="" />
                <input onChange={handleChangeImage} type="file" id='image2' hidden/>
            </label>
            <label htmlFor="image3">
                <img className='w-20' src={!images.image3?assets.upload_area:URL.createObjectURL(images.image3)} alt="" />
                <input onChange={handleChangeImage} type="file" id='image3' hidden/>
            </label>
            <label htmlFor="image4">
                <img className='w-20' src={!images.image4?assets.upload_area:URL.createObjectURL(images.image4)} alt="" />
                <input onChange={handleChangeImage} type="file" id='image4' hidden/>
            </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input type="text" onChange={handleChangeValues} value={values.name} name='name' placeholder='Type here' required className='w-full max-w-[500px] px-3 py-2'/>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea type="text" onChange={handleChangeValues} value={values.description} name='description' placeholder='Write content here' required className='w-full max-w-[500px] px-3 py-2'/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
            <p className='mb-2'>Product category</p>
            <select className='w-full px-3 py-2' onChange={handleChangeValues} value={values.category} name='category'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
            </select>
        </div>
        <div>
            <p className='mb-2'>Sub Category</p>
            <select className='w-full px-3 py-2' name='subCategory' value={values.subCategory} onChange={handleChangeValues}>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
            </select>
        </div>
        <div>
            <p className='mb-2'>Product Price</p>
            <input className='w-full px-3 py-2 sm:w-[120px]' name='price' value={values.price} onChange={handleChangeValues} type="number" placeholder='25' />
        </div>
      </div>

    <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
  {["S","M","L","XL","XXL"].map((size) => (
    <button
      key={size}
      type='button'
      className={`px-3 py-1 cursor-pointer  transition-all ${
        sizes.includes(size)
          ? 'bg-slate-700 text-white'
          : 'bg-slate-200 hover:bg-slate-300'
      }`}
      onClick={() => handleChangeSizes(size)}
      aria-pressed={sizes.includes(size)}
    >
      {size}
    </button>
  ))}
</div>
    </div>
    
    <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller'  onChange={handleChangeValues} name='bestseller' checked={values.bestseller} />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
    </div>
    <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add
