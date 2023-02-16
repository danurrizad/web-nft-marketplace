import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div id='contact' className='bg-slate-800 p-8'>
      <div>
        
      </div>
      <div>
          <ul className='text-white items-center justify-center text-[13px] 2xl:text-[22px] xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[15px] py-10 flex gap-4 '>
              <Link to="/" className='hover:text-slate-300 '>HOME</Link>
              <Link to="/" className='hover:text-slate-300'>STORE</Link>
              <Link to="/manage" className='hover:text-slate-300'>MANAGE</Link>
              <Link to="/my-purchases" className='hover:text-slate-300'>MY PURCHASES</Link>
          </ul>
      </div>
      <div className='flex justify-center border-t-2  border-slate-700 text-white pt-8'>
        <p>Copyright © 2023 </p>
      </div>
    </div>
  )
}

export default Footer