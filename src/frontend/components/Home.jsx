import React, {useState, useEffect, useRef} from 'react';
import Footer from './Footer';
import { ethers } from 'ethers';
import LandingPage from './Landing.jsx'
import Modal from './Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = ({account, nft, marketplace, setNFT, setMarketplace}) => {
    
    const [items, setItems] = useState([]);
    const idItemRef = useRef();
    const totalPriceRef = useRef();
    const [showModal, setShowModal] = useState({
        title:"",
        img:"",
        msg:"",
        isRunning:false
    });

    const handleModal = (title, img, msg, isRunning) => {
        setShowModal({
            title,
            img,
            msg,
            isRunning,
        })
    }

    const handleBuy = (items) => {
        handleModal(items.name, items.image, "Are you sure want to buy this?", true);
        idItemRef.current = items.itemId;
        totalPriceRef.current = items.totalPrice
    }

    const confirmBuy = (yes) => {
        if(yes){
            try{
                buyItems(idItemRef.current, totalPriceRef.current)
                handleModal('',false)
            }
            catch(error){
                handleModal('', false)
            }
        }
        handleModal('', false)
    }

    const loadMarketplaceItems = async () => {
        if(account){
            const itemCount = await marketplace.itemCount();                 // Load all unsold items
            console.log(itemCount);
            let items = []
            for (let i = 1; i <= itemCount; i++) {
                const item = await marketplace.items(i)
                if (!item.sold) {                                       
                    const uri = await nft.tokenURI(item.tokenId)                // get uri url from nft contract
                    console.log(uri)
                    const response = await fetch(uri)                           // use uri to fetch the nft metadata stored on ipfs 
                    const metadata = await response.json()
                    const totalPrice = await marketplace.getTotalPrice(item.itemId)     // get total price of item (item price + fee)
                    items.push({                                // Add item to items array
                        totalPrice,
                        itemId: item.itemId,
                        seller: item.seller,
                        name: metadata.name,
                        description: metadata.description,
                        image: metadata.image
                    })
                }
            }
            setItems(items);
        }
    }

    const buyItems = async (itemId, totalPrice) => {
        try{
            await (await marketplace.purchaseItem(itemId, { value: totalPrice })).wait()
            toast.success('Successed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });   
        }
        catch(error){
            console.log('Ether not enough to send')
            toast.error("You don't have enough ETH to buy this NFT", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        loadMarketplaceItems()
      }

    

    useEffect(() => {
        
    }, [])
    

    if(!account) return(
        <>
            <LandingPage/>
            <div className='min-h-screen bg-slate-300 max-w-screen'>
                <h1 className='text-center text-[72px] pb-12'>Store</h1>
                    <div className='justify-center flex-1 text-center px-4 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[15px]'>
                        <h1 className='pt-1 pb-20'>Wallet address :</h1>
                        <p>Please connect your wallet to access this store</p>
                    </div>
            </div>
            <Footer/>
        </>
    )

    return (
    <div>
        {/* LANDING PAGE SECTION */}
        <LandingPage/>
        
        {/* STORE SECTION */}
        <div id='store' className='min-h-screen bg-slate-300 max-w-screen'>
            <section id='header-content'>
                <div>
                    <h1 className='text-center text-[72px] pb-12'>Store</h1>
                    <div className='justify-center flex-1 text-center px-4 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[15px]'>
                        <h1 className='pt-1'>Wallet address :</h1>
                        {account ? (<div className='flex justify-center'><h1 className='bg-slate-100 px-4 py-1 rounded-full shadow-lg shadow-black'>{account}</h1></div>) : null}
                        
                        <div className='px-4 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[28px] text-[15px]'>
                            <span id="wallet-address" className='rounded-3xl px-4 py-1' ></span>
                        </div>
                    </div>
                </div>
            </section>
            <section id='items-content'>
                <div className='flex justify-center '>
                    {items.length > 0 ? (
                        <div className='flex justify-center'>
                            <div className='justify-center flex flex-wrap gap-y-10 gap-x-10 2xl:p-8 py-10 px-2'>
                                {items.map((item,index) => (
                                    <div key={index} className='shadow-xl shadow-slate-900 bg-slate-100 border-solid border-2 border-b-0 border-black w-[150px] 2xl:w-[300px] xl:w-[300px] h-fit'> 
                                        <h1 className='text-center 2xl:text-[20px] text-[15px] bg-slate-700 text-white p-1'>{item.name}</h1>
                                        <img src={item.image} alt='NFT-1'/>
                                        <div className='text-center 2xl:text-[20px] text-[10px]'>
                                            <p className='text-left px-4'>{item.description}</p>
                                            <div className='bg-slate-700 border-y-4 border-black p-4'>
                                                <button className='transition ease-in-out duration-200 bg-emerald-300 hover:bg-emerald-500 2xl:py-1 xl:py-1 lg:py-1 md:py-1 sm:py-1 px-4 rounded-3xl  '
                                                    onClick={()=>handleBuy(item)}
                                                    >Buy ({ethers.utils.formatEther(item.totalPrice)} ETH)
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {showModal.isRunning && <Modal onDialog={confirmBuy} msg={showModal.msg} itemName={showModal.title} itemImage={showModal.img}/>}
                                {/*{showModal ? <Modal onConfirm={confirmBuy}/> : null}*/}
                                <ToastContainer />
                            </div>
                        </div>
                    ):(
                        <main className='py-8 text-center px-4'>
                            <h1 className='2xl:text-[40px] xl:text-[40px] lg:text-[40px] text-[20px]'>Unfortunately, there are no listed NFTs here for a moment</h1>
                            <button className='2xl:text-[35px] xl:text-[35px] lg:text-[35px] text-[18px] bg-white px-4 rounded-xl shadow-xl hover:bg-slate-100' onClick={loadMarketplaceItems}>Refresh item here</button>
                        </main>
                    )}
                </div>
            </section>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
