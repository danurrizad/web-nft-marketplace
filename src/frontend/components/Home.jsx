import React, {useState, useEffect} from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { ethers } from 'ethers';
import ReactLoading from 'react-loading';
import LandingPage from './Landing.jsx'
import Loading from './Loading';
import Modal from './Modal';


const Home = ({account, nft, marketplace}) => {
    
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState({
        title:"",
        img:"",
        isRunning:false
    });

    const handleConfirm = (items) => {
        setShowModal(true)
    }

    const loadMarketplaceItems = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
    }

    const buyItems = async (item) => {
        await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
        loadMarketplaceItems()
      }

    useEffect(() => {
      loadMarketplaceItems()
    }, [])
    

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
                        {isLoading ? <Loading textLoading='Loading items...'/> : null}
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
                                                <button className='bg-green-300 2xl:py-1 xl:py-1 lg:py-1 md:py-1 sm:py-1 px-4 rounded-3xl hover:bg-green-500 duration-200'
                                                    onClick={()=>buyItems(item)}
                                                    >Buy ({ethers.utils.formatEther(item.totalPrice)} ETH)
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/*{showModal ? <Modal onConfirm={confirmBuy}/> : null}*/}
                            </div>
                        </div>
                    ):(
                        <main className='py-8 text-center px-4'>
                            <h1 className='2xl:text-[40px] xl:text-[40px] lg:text-[40px] text-[20px]'>Unfortunately, there are no listed NFTs here for a moment</h1>
                            <h1 className='2xl:text-[35px] xl:text-[35px] lg:text-[35px] text-[18px]'>Please comeback later...</h1>
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