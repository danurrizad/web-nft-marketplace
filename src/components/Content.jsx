import React from 'react'
import NFT1 from '../assets/img/1.png'
import NFT2 from '../assets/img/2.png'
import NFT3 from '../assets/img/3.png'
import NFT4 from '../assets/img/4.png'
import NFT5 from '../assets/img/5.png'
import NFT6 from '../assets/img/6.png'
import NFT7 from '../assets/img/7.png'
import NFT8 from '../assets/img/8.png'
import NFT9 from '../assets/img/9.png'

const Content = () => {
  return (
    <div className=' min-h-[73vh]'>
        <div className='flex justify-center gap-20 p-8'>
            <div className=' border-solid border-2 border-black w-[300px] h-[400px]'> 
                <img src={NFT1} alt='NFT-1'/>
                <h1 className='text-center'>VR Boy NFT #1</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'> 
                <img src={NFT2} alt='NFT-2'/>
                <h1 className='text-center'>VR Boy NFT #2</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'> 
                <img src={NFT3} alt='NFT-3'/>
                <h1 className='text-center'>VR Boy NFT #3</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'>
                <img src={NFT4} alt='NFT-4'/>
                <h1 className='text-center'>VR Boy NFT #4</h1>
            </div>
        </div>
        <div className='flex justify-center gap-20 p-8'>
            <div className=' border-solid border-2 border-black w-[300px] h-[400px]'> 
                <img src={NFT5} alt='NFT-5'/>
                <h1 className='text-center'>VR Boy NFT #5</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'> 
                <img src={NFT6} alt='NFT-6'/>
                <h1 className='text-center'>VR Boy NFT #6</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'> 
                <img src={NFT7} alt='NFT-7'/>
                <h1 className='text-center'>VR Boy NFT #7</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'>
                <img src={NFT8} alt='NFT-8'/>
                <h1 className='text-center'>VR Boy NFT #8</h1>
            </div>
        </div>
        <div className='flex justify-center gap-20 p-8'>
            <div className=' border-solid border-2 border-black w-[300px] h-[400px]'> 
                <img src={NFT9} alt='NFT-9'/>
                <h1 className='text-center'>VR Boy NFT #9</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'> 
                <h1 className='text-center'>NFT 10</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'> 
                <h1 className='text-center'>NFT 11</h1>
            </div>
            <div className=' border-solid border-2 border-black w-[300px]'>
                <h1 className='text-center'>NFT 12</h1>
            </div>
        </div>
    </div>
  )
}

export default Content