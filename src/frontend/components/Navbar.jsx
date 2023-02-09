import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({isLoading, account, showAlertSuccess, setShowAlertSuccess, showAlertError, setShowAlertError, Connect}) => {

  return (
    <div className='text-white text-[25px] bg-slate-800 z-30 relative shadow-md shadow-black'>
        <span className='justify-between flex'>
            <span className='justify-start flex 2xl:gap-x-28 gap-x-4 text-[13px] 2xl:text-[25px] xl:text-[25px] lg:text-[25px] lg:gap-x-20 xl:gap-x-28 py-8 2xl:px-8 xl:px-8 lg:px-8 px-4 '>
                <Link to="/" className='hover:text-slate-300'>HOME</Link>
                <Link to="/" className='hover:text-slate-300'>STORE</Link>
                <Link to="/manage" className='hover:text-slate-300'>MANAGE</Link>
                <Link to="/my-purchases" className='hover:text-slate-300 '>MY PURCHASES</Link>
            </span>
            <span className='py-6 2xl:px-8 xl:px-8 px-1 2xl:text-[25px] xl:text-[25px] lg:text-[25px] text-[15px] '>
                {account? (
                    <button 
                        className='bg-slate-900 duration-200 shadow-xl shadow-black   w-full text-white border-slate-800 border-[1px] py-1 2xl:px-6 xl:px-6 lg:px-6 px-2 hover:bg-white hover:text-slate-900 hover:border-slate-900 rounded-xl' 
                        onClick={Connect}>
                            {account.slice(0, 6) + '...' + account.slice(37, 42)}
                    </button>
                ):(
                    <button 
                        className='bg-slate-900 duration-200 w-full shadow-xl shadow-black text-white border-slate-800 border-[1px] py-1 2xl:px-6 xl:px-6 lg:px-6 px-2 hover:bg-white hover:text-slate-900 hover:border-slate-900 rounded-xl' 
                        onClick={Connect}>
                            Connect Wallet
                    </button>
                )}
            </span>
        </span>
        <div>
            {showAlertSuccess ? 
            (<div className={"bg-teal-200 shadow-xl shadow-teal-800 border-t-teal-800 border-t-4 2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 mb-3 2xl:text-xl xl:text-xl text-sm text-teal-700 inline-flex items-center w-full absolute"}
                 >
                <strong className="mr-1">Successed! </strong> Your wallet is now connected.
                <button type="button" className={"box-content w-4 h-4 p-1 ml-auto text-teal-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-teal-900 hover:opacity-75 hover:no-underline mb-2"} onClick={()=>setShowAlertSuccess(false)}>X</button>
            </div>) : null}
        </div>
        <div>
            {showAlertError ? 
            (<div className={"bg-red-300 shadow-xl shadow-red-800 border-t-red-800 border-t-4  2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 mb-3 2xl:text-xl xl:text-xl text-sm text-red-700 inline-flex items-center w-full absolute"}
                 >
                <strong className="mr-1">Error! </strong> You have to install MetaMask to connect your wallet.
                <button type="button" className={"box-content w-4 h-4 p-1 ml-auto text-red-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-red-900 hover:opacity-75 hover:no-underline mb-2"} onClick={()=>setShowAlertError(false)}>X</button>
            </div>) : null}
        </div>
    </div>
  )
}

export default Navbar