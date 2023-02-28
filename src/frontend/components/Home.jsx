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
    const itemSellerRef = useRef();
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const [showModal, setShowModal] = useState({
        title:"",
        img:"",
        msg:"",
        isRunning:false,
        price:"",
        owner:"",
    });

    const handleModal = (title, img, msg, isRunning, price, owner) => {
        setShowModal({
            title,
            img,
            msg,
            isRunning,
            price,
            owner,
        })
    }

    const handleBuy = (items) => {
        handleModal(items.name, items.image, "Are you sure want to buy this?", true, items.totalPrice, items.seller);
        idItemRef.current = items.itemId;
        totalPriceRef.current = items.totalPrice;
        itemSellerRef.current = items.seller;
    }

    const confirmBuy = (yes) => {
        if(yes){
            try{
                buyItems(idItemRef.current, totalPriceRef.current, itemSellerRef.current)
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

    const buyItems = async (itemId, totalPrice, itemSeller) => {
        setIsProcessing(true)
        if(account!=itemSeller){
            try{
                await (await marketplace.purchaseItem(itemId, { value: totalPrice })).wait();
                setIsProcessing(false)
                setShowAlertSuccess(true, "Your purchase was successful.");
            }
            catch(error){
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
        }
        else{
            setShowAlertError(true);
            setErrMsg("You can't buy your own listed NFT");
            setIsProcessing(false);
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
                <h1 className='text-center text-[72px] pb-12 font-serif pt-8'>STORE</h1>
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
                <h1 className='text-center text-[72px] pb-12 font-serif pt-8'>STORE</h1>
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
                    <h1 className='text-center text-[72px] pb-12 font-serif pt-8'>STORE</h1>
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
                                    <div className='2xl:w-1/4 xl:w-1/4 lg:w-1/4 md:w-1/4'>
                                        <div key={index} className='rounded-xl shadow-xl shadow-slate-800 bg-slate-100 border-solid border-2 border-b-0 border-black w-fit h-fit'> 
                                            <img src={item.image} alt='NFT-1' className='py-4 bg-slate-800 rounded-t-lg '/>
                                            <h1 className='px-4 2xl:text-[25px] text-[30px]  bg-slate-800 text-slate-100 font-bold p-1'>{item.name}</h1>
                                            <div className=' 2xl:text-[25px] '>
                                                <div className=' bg-slate-800'>
                                                    <p className='text-left px-4 text-[15px] text-slate-100 pb-4'>{item.description}</p>
                                                </div>
                                                <div className='text-[20px] rounded-b-lg bg-slate-900 border-y-4 border-black p-4 flex justify-between '>
                                                    <div>
                                                        <h2 className='text-slate-200'>Owner : <span><a href={"https://goerli.etherscan.io/address/"+item.seller} target="_blank" className='text-sky-600 hover:text-sky-700 hover:underline'>{item.seller.slice(0, 6) + '...' + item.seller.slice(39, 42)}</a></span></h2>
                                                        <h2 className='text-slate-100  py-1'>Price : <span className='font-bold'>{ethers.utils.formatEther(item.totalPrice)} ETH</span></h2>
                                                    </div>
                                                    <div className='items-center flex'>
                                                        <button className='flex transition ease-in-out duration-200 border-2 border-sky-600 bg-sky-400 hover:bg-sky-500  py-1 2xl:py-1 xl:py-1 lg:py-1 md:py-1 sm:py-1 2xl:px-10 px-10 rounded-3xl  '
                                                            onClick={()=>handleBuy(item)}
                                                            >Buy
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {showModal.isRunning && <Modal onDialog={confirmBuy} msg={showModal.msg} itemName={showModal.title} itemImage={showModal.img} itemPrice={showModal.price} itemOwner={showModal.owner}/>}
                                        {showAlertError ? (
                                        <div className={"z-50 fixed top-0 left-1/2 -translate-x-1/2 bg-red-300 shadow-xl shadow-red-800 border-t-red-800 border-t-4  2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 mb-3 2xl:text-xl xl:text-xl text-sm text-red-700 inline-flex items-center w-full"}>
                                            <strong className="mr-1">Failed! </strong> {errMsg}
                                            <button type="button" className={"box-content w-4 h-4 p-1 ml-auto text-red-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-red-900 hover:opacity-75 hover:no-underline mb-2"} onClick={()=>setShowAlertError(false)}>X</button>
                                        </div>):null}
                                    </div>
                                ))}
                            </div>
                                
                                {isProcessing ? (
                                    <div className='fixed z-50 top-0 min-h-screen bg-slate-200 bg-opacity-30 max-w-screen w-screen'>
                                        <div className='flex items-center justify-center flex-col min-h-screen font-medium animate-pulse font-serif'>
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
