import React, {useState, useEffect, useRef} from 'react';
import Footer from './Footer';
import { ethers } from 'ethers';
import LandingPage from './Landing.jsx'
import Modal from './Modal';
import Loading from './Loading';

const Home = ({account, nft, marketplace}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [items, setItems] = useState([]);
    const idItemRef = useRef();
    const totalPriceRef = useRef();
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [errMsg, setErrMsg] = useState('')
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
            setIsLoading(true);
            const itemCount = await marketplace.itemCount();                 // Load all unsold items
            let items = []
            for (let i = 1; i <= itemCount; i++) {
                const item = await marketplace.items(i)
                if (!item.sold) {                                       
                    const uri = await nft.tokenURI(item.tokenId)                // get uri url from nft contract
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
            setIsLoading(false);
        }
    }

    const buyItems = async (itemId, totalPrice) => {
        try{
            setIsProcessing(true)
            await (await marketplace.purchaseItem(itemId, { value: totalPrice })).wait();
            setIsProcessing(false)
            setShowAlertSuccess(true, "Your purchase was successful.");
        }
        catch(error){
            setIsProcessing(true)
            if(error.code === 4001){
                setShowAlertError(true);
                setErrMsg('Transaction cancelled.');
            }
            else{
                setShowAlertError(true);
                setErrMsg("You don't have enough ETH to buy this item");
            }
            setIsProcessing(false)
        }
        loadMarketplaceItems()
      }

    

    useEffect(() => {
        loadMarketplaceItems()
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
    
    if(isLoading) return(
        <>
            <LandingPage/>
            <div className='min-h-screen bg-slate-300 max-w-screen'>
                <h1 className='text-center text-[72px] pb-12'>Store</h1>
                    <div className='justify-center flex-1 text-center px-4 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[15px]'>
                        <h1 className='pt-1 pb-20'>Wallet address :</h1>
                        <Loading textLoading="Loading items..."/>
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
        <div id='#store' className='min-h-screen bg-slate-300 max-w-screen'>
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
                            <div className='justify-center flex flex-wrap  gap-y-10 gap-x-10 2xl:p-8 py-10 px-8'>
                                {items.map((item,index) => (
                                    <div key={index} className='rounded-xl shadow-xl shadow-slate-800 bg-slate-100 border-solid border-2 border-b-0 border-black w-[150px] 2xl:w-[300px] xl:w-[300px] h-fit'> 
                                        <h1 className='rounded-t-lg text-center 2xl:text-[20px] text-[15px] bg-slate-800 text-white p-1'>{item.name}</h1>
                                        <img src={item.image} alt='NFT-1'/>
                                        <div className='text-center 2xl:text-[20px] text-[10px]'>
                                            <div className='border-t-2 border-black bg-slate-600'>
                                                <p className='text-left px-4 text-slate-100'>{item.description}</p>
                                            </div>
                                            <div className='rounded-b-lg bg-slate-800 border-y-4 border-black p-4'>
                                                <button className='transition ease-in-out duration-200 bg-emerald-300 hover:bg-emerald-500 2xl:py-1 xl:py-1 lg:py-1 md:py-1 sm:py-1 px-4 rounded-3xl  '
                                                    onClick={()=>handleBuy(item)}
                                                    >Buy ({ethers.utils.formatEther(item.totalPrice)} ETH)
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                                {showModal.isRunning && <Modal onDialog={confirmBuy} msg={showModal.msg} itemName={showModal.title} itemImage={showModal.img}/>}
                                {isProcessing ? (
                                    <div className='fixed z-50 top-0 min-h-screen bg-white bg-opacity-30 max-w-screen w-screen'>
                                        <div className='flex items-center justify-center flex-col min-h-screen font-bold'>
                                            <Loading textLoading="Processing..."/>
                                        </div>
                                    </div>
                                ):(null)}
                                <div>
                                    {showAlertSuccess ?
                                    (<div className={"z-50 fixed top-0 left-1/2 -translate-x-1/2 bg-teal-200 shadow-xl shadow-teal-800 border-t-teal-800 border-t-4 2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 mb-3 2xl:text-xl xl:text-xl text-sm text-teal-700 inline-flex items-center w-full"}
                                        >
                                        <strong className="mr-1">Successed! </strong> Your purchase was successful
                                        <button type="button" className={"box-content w-4 h-4 p-1 ml-auto text-teal-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-teal-900 hover:opacity-75 hover:no-underline mb-2"} onClick={()=>setShowAlertSuccess(false)}>X</button>
                                    </div>) : (null)}
                                </div>
                                <div>
                                    {showAlertError ? 
                                    (<div className={"z-50 fixed top-0 left-1/2 -translate-x-1/2 bg-red-300 shadow-xl shadow-red-800 border-t-red-800 border-t-4  2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 mb-3 2xl:text-xl xl:text-xl text-sm text-red-700 inline-flex items-center w-full"}
                                        >
                                        <strong className="mr-1">Failed! </strong> {errMsg}
                                        <button type="button" className={"box-content w-4 h-4 p-1 ml-auto text-red-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-red-900 hover:opacity-75 hover:no-underline mb-2"} onClick={()=>setShowAlertError(false)}>X</button>
                                    </div>) : (null)}
                                </div>
                        </div>
                    ):(
                        <main className='py-8 text-center px-4'>
                            <h1 className='2xl:text-[40px] xl:text-[40px] lg:text-[40px] text-[20px]'>Unfortunately, there are no listed NFTs here for a moment</h1>
                            <button onClick={loadMarketplaceItems} className='2xl:text-[25px] font-bold text-slate-900 hover:text-slate-500 duration-300 hover:underline '>Refresh item here</button>
                        </main>
                    )}
                </div>
            </section>
            
        </div>
        <div className='pt-20 bg-slate-300'>
            <Footer/>
        </div>
    </div>
  )
}

export default Home;
