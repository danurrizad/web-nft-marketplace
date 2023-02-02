import React from 'react'
import Navbar from './Navbar'

import NFT1 from '../assets/img/1.png'
import NFT2 from '../assets/img/2.png'

const MyPurchases = ({account}) => {

    if (!account) return (
        <main className='bg-slate-300 min-h-screen'>
          <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center '>Please connect your wallet to see your purchases...</h1>
        </main>
      )
  return (
    <div>
        <div className='bg-slate-300 min-h-screen'>
            <div className='py-8 px-10'>
                <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[50px] text-center'>My Purchases</h1>
            </div>
            <div>
            <div className='justify-center flex-1 gap-y-10 2xl:flex 2xl:justify-center 2xl:gap-0 2xl:p-8 px-2'>
                {/*{purchases.length > 0 ? (
                <div className="px-5 container">
                    <div className="g-4 py-5">
                        {purchases.map((item, idx) => (
                        <div key={idx} className="overflow-hidden">
                            <div>
                                <img variant="top" src={item.image} />
                                <div>{ethers.utils.formatEther(item.totalPrice)} ETH</div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>)
                : (
                <div className=''>
                    <h2 className='text-[30px]'>You don't have any purchases</h2>
                </div>
                )} */}
                <div className=''>
                    <h2 className='text-center 2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px]'>You don't have any purchases</h2>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default MyPurchases