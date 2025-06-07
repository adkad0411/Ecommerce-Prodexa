import React from 'react'
import NewsLetter from '../components/NewsLetter'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, aperiam praesentium velit repellat assumenda quasi atque necessitatibus suscipit dolore, consequatur id magni facere vitae quos repellendus provident. Sunt, a doloribus!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem adipisci ipsum veniam? Facilis repellendus aliquam unde numquam quod minus nisi illum consectetur corporis harum. Ipsa dicta esse minus laboriosam voluptate?</p>
          <b className='text-gray-800 '>Our Mission</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis nisi ab dolor deleniti,Veritatis nisi ab dolor deleniti, dolores magnam et nulla distinctio repellat quaerat?</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio repudiandae consequatur quia aut molestiae in quidem vero, rerum, incidunt porro maiores dicta voluptas voluptatibus. Exercitationem repellendus consequuntur amet sit rerum.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id impedit saepe, architecto vero est voluptatum itaque dolores optio cupiditate consequuntur deleniti deserunt perferendis sed earum! Eum quos magni assumenda esse!</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum impedit expedita similique quidem tempora eum voluptatibus dolorem amet tempore adipisci sequi voluptas consequuntur, cumque quisquam? Perferendis eius minima reiciendis qui.</p>
      </div>
    </div>

    <NewsLetter/>
    </div>
  )
}

export default About
