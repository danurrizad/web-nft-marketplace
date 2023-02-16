import React from 'react'
import MyListedNFT from './MyListedNFT'
import Footer from './Footer'

const Manager = ({isLoading, account, nft, marketplace}) => {
    
    if(isLoading) return (
        <div>
          <div className='bg-slate-300 min-h-screen py-20'>
              <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center'>Connecting...</h1>
          </div>
          <Footer/>
        </div>
      )

    if (!account) return (
        <div>
          <main className='bg-slate-300 min-h-screen py-20'>
            <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center'>Please connect your wallet to see your listed NFTs...</h1>
          </main>
          <Footer/>
        </div>
      )

  return (
    <>
        <div className='bg-slate-300 min-h-screen py-20'>
            <div className=''>
                <MyListedNFT account={account} nft={nft} marketplace={marketplace}/>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Manager