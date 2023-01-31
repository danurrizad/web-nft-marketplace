import React from 'react'
import Navbar from './Navbar'

import NFT1 from '../assets/img/1.png'
import NFT2 from '../assets/img/2.png'

const MyPurchases = ({isConnected, setIsConnected, accounts, setAccounts}) => {

    if (!accounts) return (
        <main className='bg-slate-300 min-h-screen'>
        <div>
            <Navbar accounts={accounts} setAccounts={setAccounts} isConnected={isConnected} setIsConnected={setIsConnected}/>
        </div>
          <h1 className='flex justify-center items-center flex-col py-8 text-[50px] px-8'>Please connect your wallet to see your purchases...</h1>
        </main>
      )
  return (
    <div>
        <div className='bg-slate-300 min-h-screen'>
            <Navbar accounts={accounts} setAccounts={setAccounts} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className='px-10'>
                <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[50px]'>My Purchases</h1>
            </div>
            <div>
                {/* 1-4*/}
            <div className='justify-center flex-1 gap-y-10 2xl:flex 2xl:justify-center 2xl:gap-0 2xl:p-8 py-8 px-2'>
                {/*1-2 */}
                <div className='flex justify-center gap-10 2xl:justify-center 2xl:gap-20 2xl:p-8'>
                    <div className='pb-4 bg-slate-100 border-solid border-2 border-black w-[300px] xl:h-[400px]'> 
                        <img src={NFT1} alt='NFT-1'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #1</h1>
                        <div className='text-center'>
                            
                        </div>
                    </div>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'> 
                        <img src={NFT2} alt='NFT-2'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #2</h1>
                        <div className='text-center'>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default MyPurchases