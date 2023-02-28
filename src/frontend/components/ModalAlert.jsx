import React from 'react'

const ModalAlert = ({color, title, msg, closeModal}) => {
  return (
    <div>
        <div className='bg-slate-200 bg-opacity-50 z-50 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-h-screen max-w-screen w-screen font-serif  '>
            <div className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 items-center font-medium font-serif '>
                <div className=''>
                    <div className={"bg-"+ color +"-200 z-50  shadow-xl shadow-"+ color +"-800 border-t-"+ color +"-800 border-t-4 2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 2xl:text-xl xl:text-xl text-sm text-"+ color +"-700 items-center"}>
                        <div className='text-center p-4'>
                            <strong className="mr-1">{title} </strong> 
                        </div>
                        <div className='text-center'>
                            {msg}
                        </div>
                    </div>
                    <div className={"flex justify-center bg-"+ color +"-600 hover:bg-"+ color +"-800 cursor-pointer hover:font-bold duration-300"} onClick={closeModal}>
                        <button type="button" className={"text-[20px] box-content p-4 text-white border-none rounded-none focus:shadow-none focus:outline-none focus:opacity-100 mb-2"}>Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalAlert