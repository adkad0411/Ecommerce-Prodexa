import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const PlaceOrder = () => {
  const [method,setMethod]=useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}=useContext(ShopContext)
  const initialState={
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  };
  const [address,setAddress]=useState(initialState);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setAddress({...address,[name]:value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      let orderItems=[];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData={
        address,
        items: orderItems,
        amount: getCartAmount()+ delivery_fee,
      }

      switch(method){

        //api calls for COD
        case 'cod':
          const response= await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          console.log(response.data)
          if(response.data.success){
            setCartItems({});
            navigate('/orders');
          }
          else{
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
          const responseStripe=await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
          if(responseStripe.data.success){
            const {session_url}=responseStripe.data;
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }


          break;
        default:
          break;
      }
    }catch(error){

    }
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex flex-col  sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/*Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title  text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input  type="text" name='firstname' value={address.firstname} onChange={handleChange} placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
          <input  type="text" name='lastname' value={address.lastname} onChange={handleChange} placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
        </div>
        <input  type="email" name='email' value={address.email} onChange={handleChange} placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
        <input  type="text" name='street' value={address.street} onChange={handleChange} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
        <div className='flex gap-3'>
          <input  type="text" name='city' value={address.city} onChange={handleChange} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
          <input  type="text" name='state' value={address.state} onChange={handleChange} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
        </div>
        <div className='flex gap-3'>
          <input  type="number" name='zipcode' value={address.zipcode} onChange={handleChange} placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
          <input  type="text" name='country' value={address.country} onChange={handleChange} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>
        </div>
        <input  type="number" name='phone' value={address.phone} onChange={handleChange} placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required/>

      </div>
      {/*Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/*Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe' && 'bg-green-400'}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>
            
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border  p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'&&'bg-green-400'}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit'  className=' cursor-pointer bg-black text-white px-16 py-3 text-sm '>PLACE ORDER</button>

          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
