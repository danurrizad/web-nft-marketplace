import React from 'react'
import Navbar from './Navbar'


const Manager = ({isConnected, setIsConnected, accounts, setAccounts}) => {
  return (
    <>
        <div className='bg-slate-300 min-h-screen'>
            <Navbar isConnected={isConnected} setIsConnected={setIsConnected} accounts={accounts} setAccounts={setAccounts}/>
            <div className='px-10'>
                <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[50px]'>Create and List</h1>
                <h1 className='2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[30px]'>Your Own NFT</h1>
            </div>
            <div>
                <form>
                <div class=" px-10 2xl:pt-20 xl:pt-20 lg:pt-20 pt-10">
                    <div class="mb-3 2xl:w-1/2 xl:w-1/2">
                        <label for="formFile" class="form-label text-lg font-bold inline-block mb-2 text-slate-800 uppercase tracking-wide">IMAGE</label>
                        <input class="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-slate-200 bg-clip-padding
                            border border-solid border-slate-800
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-slate-800 focus:outline-none" type="file" id="formFile"/>
                    </div>
                    <div className='2xl:w-1/2'>
                        <label class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="nft-name">NFT Name</label>
                        <input class="appearance-none block w-full bg-slate-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nft-name" type="text" placeholder="Name of your NFT"></input>
                    </div>
                    <div className='2xl:w-1/2'>
                        <label class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="description">DESCRIPTION</label>
                        <input class="appearance-none block w-full bg-slate-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="description" type="text" placeholder="Description of your NFT"></input>
                    </div>
                    <div className='2xl:w-1/2'>
                        <label class="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="price">PRICE (ETHER)</label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="price" type="text" placeholder="Example : 0.05"></input>
                    </div>
                    <button class="block uppercase tracking-wide text-white text-lg font-bold mb-2 mt-8 bg-slate-800 px-4 py-2 rounded-3xl hover:bg-white hover:text-slate-800">
                        Create and List NFT
                    </button>
                </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Manager