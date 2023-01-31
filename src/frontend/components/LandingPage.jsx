import React from 'react'
import Content from './Content'
import Footer from './Footer'
import Navbar from './Navbar'

// import NFT4 from '../assets/img/4.png'
// import NFT6 from '../assets/img/6.png'
// import NFT7 from '../assets/img/7.png'
// import NFT8 from '../assets/img/8.png'
// import NFT10 from '../assets/img/10.png'

const LandingPage = ({isConnected, setIsConnected, accounts, setAccounts}) => {
  return (
    <div>
        <div id='home' className=' bg-slate-800 min-h-screen'>
            <Navbar isConnected={isConnected} setIsConnected={setIsConnected} accounts={accounts} setAccounts={setAccounts}/>
            <div className='mt-28 relative z-20'>
                <h1 className="font-bold text-white 2xl:px-20 px-10 text-left 2xl:w-2/3 2xl:text-[90px] text-[35px] sm:text-[45px] md:text-[50px] xl:text-[60px]">Digital Emporium of</h1>
                <h1 className='font-bold text-white 2xl:px-20 px-10 text-left 2xl:w-1/2 2xl:text-[150px] text-[70px]'>NFT</h1>
                <p className='text-white text-left 2xl:px-20 px-10 2xl:w-2/3 2xl:text-[28px]'>Home for all NFTs that have a unique appearance and can be used for gaming, education, or other interactive experiences.</p>
                <div className='pt-4 2xl:w-1/2'>
                    <a href='#store' className='z-50 text-white text-left 2xl:mx-20 mx-10 py-2 px-8 rounded-3xl 2xl:text-[28px] bg-slate-900 hover:text-slate-900 hover:bg-white'>Let's hit the store</a>
                </div>
            </div>
            <div className='flex absolute bottom-0 right-0 justify-end z-10'>
                <div className='select-none ml-24 w-[20rem] h-[20rem] 2xl:w-[40rem] 2xl:h-[40rem] rounded-tl-full bg-slate-900'></div>
                
               

                <div className='select-none invisible 2xl:visible xl:visible ml-24 w-[30rem] h-[30rem] rounded-tl-full bg-slate-800 absolute right-0 bottom-0'></div>
            </div>
        </div>
        <Content accounts={accounts}/>
        <Footer/>
    </div>
  )
}

export default LandingPage