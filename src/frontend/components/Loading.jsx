import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({textLoading}) => {
  return (
    <>
    <div className='pt-4 flex justify-center'>
        <div className='flex items-center'>
            <ReactLoading type='spin' color='white' height={50} width={50}/>
        </div>
        <div className='flex items-center'>
            <h1 className=' px-4 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center'>{textLoading}</h1>
        </div>
    </div>
    </>
  )
}

export default Loading