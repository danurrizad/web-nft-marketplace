import React, {useState} from 'react'
import Web3 from "web3"; 

import NFT1 from '../assets/img/1.png'
import NFT2 from '../assets/img/2.png'
import NFT3 from '../assets/img/3.png'
import NFT4 from '../assets/img/4.png'
import NFT5 from '../assets/img/5.png'
import NFT6 from '../assets/img/6.png'
import NFT7 from '../assets/img/7.png'
import NFT8 from '../assets/img/8.png'
import NFT9 from '../assets/img/9.png'
import NFT10 from '../assets/img/10.png'
import NFT11 from '../assets/img/11.png'
import NFT12 from '../assets/img/12.png'



const Content = ({isConnected, setIsConnected}) => {
    const [msg, setMsg] = useState('');

    var account = null;

    async function Connect(){
        if(window.ethereum){
           await window.ethereum.send('eth_requestAccounts');
           window.web3 = new Web3(window.ethereum);
           
           var web3 = new Web3(window.ethereum);
           var accounts = await web3.eth.getAccounts();
           account = accounts[0];
           document.getElementById('wallet-address').textContent = account;
           setIsConnected(true);
           setMsg("");
        }
        else{
            setIsConnected(false);
            setMsg("You have to install MetaMask to connect your wallet");
        }
    };

  return (
    <div id='store' className='min-h-screen bg-slate-300'>
        <section id='header-content'>
            <div>
                <h1 className='text-center text-[72px] pb-12'>Store</h1>
                <div className='justify-center flex-1 text-center px-4 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[15px]'>
                <button className='bg-slate-800 text-white  py-1 px-6 hover:bg-white hover:text-slate-800 rounded-xl' onClick={Connect}>Connect Walllet</button>
                    <h1 className='pt-1'>Wallet address : </h1>
                    <div className='px-4 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[28px] text-[15px]'>
                        <span id="wallet-address" className='rounded-3xl px-4 py-1' ></span>
                        {isConnected ? <p className='pl-4 text-[20px] text-green-400'>{msg}</p> : <p className='pl-4 text-[20px] text-red-400'>{msg}</p>}
                    </div>
                </div>
            </div>
        </section>
        
        <section id='nft-store'>
            {/* 1-4*/}
            <div className='justify-center flex-1 gap-y-10 2xl:flex 2xl:justify-center 2xl:gap-0 2xl:p-8 py-8 px-2'>
                {/*1-2 */}
                <div className='flex justify-center gap-10 2xl:justify-center 2xl:gap-20 2xl:p-8'>
                    <div className=' bg-slate-100 border-solid border-2 border-black w-[300px] xl:h-[400px]'> 
                        <img src={NFT1} alt='NFT-1'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #1</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'> 
                        <img src={NFT2} alt='NFT-2'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #2</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                </div>
                {/*3-4 */}
               <div className='flex justify-center gap-10 2xl:justify-center 2xl:gap-20 2xl:p-8 pt-16'>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'> 
                        <img src={NFT3} alt='NFT-3'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #3</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'>
                        <img src={NFT4} alt='NFT-4'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #4</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
               </div>
            </div>
            
            {/*5-8 */}
            <div className='justify-center flex-1 2xl:flex 2xl:justify-center 2xl:gap-0 2xl:p-8 py-8 px-2'>
                {/*5-6 */}
                <div className='flex justify-center gap-10 2xl:justify-center 2xl:gap-20 2xl:p-8'>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px] xl:h-[400px]'> 
                        <img src={NFT5} alt='NFT-5'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #5</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'> 
                        <img src={NFT6} alt='NFT-6'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #6</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                </div>
                {/*7-8 */}
                <div className='flex justify-center gap-10 2xl:justify-center 2xl:gap-20 2xl:p-8 pt-16'>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px] '> 
                        <img src={NFT7} alt='NFT-7'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #7</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'>
                        <img src={NFT8} alt='NFT-8'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #8</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/*9-12 */}
            <div className='justify-center flex-1 2xl:flex 2xl:justify-center 2xl:gap-0 2xl:p-8 py-8 px-2'>
                {/*9-10 */}
                <div className='flex justify-center gap-10 2xl:justify-center 2xl:gap-20 2xl:p-8'>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px] xl:h-[400px]'> 
                        <img src={NFT9} alt='NFT-9'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #9</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'> 
                        <img src={NFT10} alt='NFT-10'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #10</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                </div>
                {/*11-12 */}
                <div className='flex justify-center gap-10 2xl:justify-center 2xl:gap-20 2xl:p-8 pt-16'>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'> 
                        <img src={NFT11} alt='NFT-11'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #11</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                    <div className='bg-slate-100 border-solid border-2 border-black w-[300px]'>
                        <img src={NFT12} alt='NFT-12'/>
                        <h1 className='text-center text-[20px]'>VR Boy NFT #12</h1>
                        <div className='text-center'>
                            <p>Status : <span> </span><span className='text-green-600 font-bold'>Available</span></p>
                            <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Content