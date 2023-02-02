import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'
import MyListedNFT from './MyListedNFT'
import CreateAndList from './CreateAndList'

const Manager = ({account, nft, marketplace}) => {
    
    if (!account) return (
        <main className='bg-slate-300 min-h-screen'>
          <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center'>Please connect your wallet to see your listed NFTs...</h1>
        </main>
      )

  return (
    <>
        <div className='bg-slate-300 min-h-screen'>
            <div className='2xl:flex flex-none'>
                <MyListedNFT account={account} nft={nft} marketplace={marketplace}/>
                <CreateAndList nft={nft} marketplace={marketplace}/>
            </div>
        </div>
    </>
  )
}

export default Manager