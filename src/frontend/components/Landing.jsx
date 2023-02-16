import React from 'react'

const Landing = () => {
  return (
    <>
        <div id='home' className=' bg-slate-800 min-h-screen z-0 relative py-20'>
            <div className='pt-28 relative z-20'>
                <h1 className="font-bold text-white 2xl:px-20 px-10 text-left 2xl:w-2/3 2xl:text-[90px] text-[30px] sm:text-[45px] md:text-[50px] xl:text-[60px]">Digital Emporium of</h1>
                <h1 className='font-bold text-white 2xl:px-20 px-10 text-left 2xl:w-1/2 2xl:text-[150px] text-[65px]'>NFT</h1>
                <p className='text-white text-left 2xl:px-20 px-10 2xl:w-2/3 2xl:text-[28px]'>Home for all NFTs that have a unique appearance and can be used for gaming, education, or other interactive experiences.</p>
                <div className='pt-4 2xl:w-1/2 '>
                    {/*<a href='#store' className='hidden z-50 text-white text-left 2xl:mx-20 mx-10 py-2 px-8 rounded-3xl 2xl:text-[28px] bg-slate-900 hover:text-slate-900 hover:bg-white duration-150'>Let's hit the store</a> */}
                    <p className='z-50 text-white text-left 2xl:mx-20 mx-10 py-2 px-8 rounded-3xl 2xl:text-[28px] bg-slate-900  duration-150 animate-bounce w-fit'>Let's scroll down to hit the store </p>
                </div>
            </div>
            <div className='flex absolute bottom-0 right-0 justify-end z-10'>
                <div className='select-none ml-24 w-[15rem] h-[15rem] 2xl:w-[40rem] 2xl:h-[40rem] rounded-tl-full bg-slate-900'></div>
                
               

                <div className='select-none invisible 2xl:visible xl:visible ml-24 w-[30rem] h-[30rem] rounded-tl-full bg-slate-800 absolute right-0 bottom-0'></div>
            </div>
        </div>
    </>
  )
}

export default Landing