import React from 'react'

import NFT4 from '../assets/img/4.png'
import NFT6 from '../assets/img/6.png'
import NFT7 from '../assets/img/7.png'
import NFT8 from '../assets/img/8.png'
import NFT10 from '../assets/img/10.png'

const Header = () => {
  return (
    <div0>
        <div id='home' className=' bg-slate-800 min-h-screen'>
            <div className='text-white text-[25px] bg-slate-800'>
                <ul className='justify-center flex 2xl:gap-x-28 gap-x-10 lg:gap-x-20 xl:gap-x-28 py-8'>
                    <li><a href='#home' className='hover:text-slate-300'>Home</a></li>
                    <li><a href='#store' className='hover:text-slate-300'>Store</a></li>
                    <li><a href='#contact' className='hover:text-slate-300'>Contact</a></li>
                </ul>
            </div>
            <div className='mt-28'>
                <h1 className="font-bold text-white 2xl:px-20 px-10 text-left 2xl:w-2/3 2xl:text-[90px] text-[35px] sm:text-[45px] md:text-[50px] xl:text-[60px]">Virtual Reality Boy</h1>
                <h1 className='font-bold text-white 2xl:px-20 px-10 text-left 2xl:w-1/2 2xl:text-[150px] text-[70px]'>NFT</h1>
                <p className='text-white text-left 2xl:px-20 px-10 2xl:w-2/3 2xl:text-[28px]'>NFTs that have a unique appearance and can be used for gaming, education, or other interactive experiences.</p>
                <div className='pt-4 2xl:w-1/2'>
                    <a href='#store' className=' text-white text-left 2xl:mx-20 mx-10 py-2 px-8 rounded-3xl 2xl:text-[28px] bg-slate-900 hover:text-slate-900 hover:bg-white'>Let's hit the store</a>
                </div>
            </div>
            <div className='flex absolute right-0 bottom-0'>
                <div className='ml-24 w-[20rem] h-[20rem] 2xl:w-[40rem] 2xl:h-[40rem] rounded-tl-full bg-slate-900'></div>
                
                <div className='invisible 2xl:visible xl:visible'>
                    <img src={NFT7} alt="nft-4" className='flex absolute w-[30%] right-[45px] bottom-[340px] rotate-[35deg]' />
                    <img src={NFT8} alt="nft-4" className='flex absolute w-[30%] right-[390px] bottom-[190px] -rotate-[80deg]' />
                    <img src={NFT4} alt="nft-4" className='flex absolute w-[40%] right-[80px] bottom-[330px] rotate-[21deg]' />
                    <img src={NFT6} alt="nft-4" className='flex absolute w-[40%] right-[280px] bottom-[260px] -rotate-[55deg]' />
                    <img src={NFT10} alt="nft-4" className='flex absolute w-[45%] right-[190px] bottom-[320px] -rotate-[30deg]' />
                </div>

                <div className='invisible 2xl:visible xl:visible ml-24 w-[30rem] h-[30rem] rounded-tl-full bg-slate-800 absolute right-0 bottom-0'></div>
            </div>
        </div>
    </div0>
  )
}

export default Header