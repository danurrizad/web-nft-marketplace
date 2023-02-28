import React from 'react'
import { ethers } from 'ethers'

const Modal = ({onDialog, msg, itemName, itemImage, itemPrice, itemOwner}) => {


  return (
    <>
          <div id="modal"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-xl shadow-slate-900  relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center p-5 border-b border-solid border-slate-900 rounded-t">
                  <h3 className="text-center text-slate-200 text-3xl font-semibold">
                    {itemName}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto bg-slate-700">
                  <div className='w-[300px] border-2 border-slate-900'>
                    <img src={itemImage} alt="item-nft"/>
                  </div>
                  <div className='flex justify-between text-slate-200 text-[20px] pt-4'>
                    <p className='font-bold'>Owner <br/><a href={"https://goerli.etherscan.io/address/"+itemOwner} target="_blank" className='text-sky-600 hover:text-sky-700 hover:underline'>{itemOwner.slice(0, 6) + '...' + itemOwner.slice(39, 42)}</a></p>
                    <p className='font-bold'>Price <br/><span className='font-light'>{ethers.utils.formatEther(itemPrice)} ETH</span></p>
                  </div>
                </div>
                {/*footer*/}
                
                <div className='border-y border-solid border-slate-900'>
                  <p className="text-center my-4 text-slate-200 text-lg leading-relaxed">
                    {msg}
                  </p>
                </div>
                <div className="flex items-center justify-end px-4 py-2  rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-3 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-in-out transition-all duration-150 hover:bg-red-500 hover:text-white "
                    type="button"
                    onClick={() => onDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="hover:bg-emerald-500 hover:text-white active:bg-emerald-600 text-emerald-500 font-bold uppercase text-sm px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onDialog(true)}
                  >
                    Yes, i'm sure
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

export default Modal