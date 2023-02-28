import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'

import Loading from './Loading';
import Footer from './Footer';

import CreateAndList from './CreateAndList';


const MyPurchases = ({account, isLoading, nft, marketplace}) => {
    const [purchases, setPurchases] = useState([]);
    const [isLoadingItems, setIsLoadingItems] = useState(false);
    const [showCreate, setShowCreate] = useState({
        isRunning: false,
        isResale: false,
        imageItem: "",
        nameItem: "",
        descriptionItem: "",
    });
    //const idItemRef = useRef();

    const loadPurchasedItems = async () => {
        setIsLoadingItems(true)
        const filter =  marketplace.filters.Bought(null,null,null,null,null,account)            // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
        console.log("TipeData Filter: ", typeof filter)
        console.log("Filter: ",  filter)
        const results = await marketplace.queryFilter(filter)
        console.log("Results: ",  results)
        let mypurchaseditems = []
        await Promise.all(results.map(async i => {        //Fetch metadata of each nft and add that to listedItem object.
            i = i.args                                      // fetch arguments from each result
            let j = 0
            const uri = await nft.tokenURI(i.tokenId)       // get uri url from nft contract
            const response = await fetch(uri)
            const metadata = await response.json()          // use uri to fetch the nft metadata stored on ipfs 
            const totalPrice = await marketplace.getTotalPrice(i.itemId)        // get total price of item (item price + fee)
            let purchasedItem = {                           // define listed item object
                totalPrice,
                price: i.price,
                itemId: i.itemId,
                name: metadata.name,
                description: metadata.description,
                image: metadata.image
            }
            mypurchaseditems.push(purchasedItem)
            console.log(`my purchases item.resell ${metadata.name} :`, item.resell)
            j+=1
            const item = await marketplace.items(j)
            console.log("item", item)
            if (item.resell){
                console.log("berhasil menyingkirkan")
                mypurchaseditems.pop()
            }
        }))
        setPurchases(mypurchaseditems)
        setIsLoadingItems(false)
    }

    useEffect(() => {
        loadPurchasedItems()
    }, [])

    const handleForm = (isRunning, isResale, imageItem, nameItem, descriptionItem) => {
        setShowCreate({
            isRunning, 
            isResale,
            imageItem,
            nameItem,
            descriptionItem,
          })
    }

    const handleResale = (items) => {
        handleForm(true, true, items.image, items.name, items.description);
        //idItemRef.current = items.itemId;
    }

    if(isLoading) return (
        <div>
            <div className='bg-slate-300 min-h-screen py-20'>
                <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center'>Connecting...</h1>
            </div>
            <Footer/>
        </div>
      )

    if (!account) return (
        <div>
            <main className='bg-slate-300 min-h-screen py-20'>
              <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center '>Please connect your wallet to see your purchases...</h1>
            </main>
            <Footer/>
        </div>
      )

    if(isLoadingItems) return (
        <>
            <div className='bg-slate-300 min-h-screen py-20'>
                <div className='py-8 px-10'>
                    <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px] text-center font-serif'>MY PURCHASES</h1>
                </div>
                <Loading textLoading='Loading items...'/>
            </div>
            <Footer/>
        </>
    )

  return (
    <div>
        <div className='bg-slate-300 min-h-screen py-20'>
            <div className='py-8 px-10'>
                <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px] text-center font-serif'>MY PURCHASES</h1>
            </div>
            <div>
            <div className='justify-center flex gap-y-10 gap-10 2xl:p-8 px-2 '>
                {purchases.length > 0 ? (
                <div className="px-5 container justify-center flex ">
                    <div className="g-4 py-5 flex flex-wrap justify-center gap-10 px-8">
                        {purchases.map((item, index) => (
                        <div key={index} className="2xl:w-[40%] xl:w-[40%] lg:w-[40%] md:w-[40%] ">
                           <div className=''>
                             <div className='rounded-xl shadow-xl shadow-slate-600 bg-black border-solid border-2 border-b-0 border-black w-fit h-fit'>
                                 <img variant="top" src={item.image} alt={"item-"+index} className='py-4 bg-slate-800 rounded-t-lg'/>
                                 <h1 className='font-bold px-8 2xl:text-[25px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[30px] text-[30px] bg-slate-800 text-slate-100 p-1'>{item.name}</h1>
                                 <div className='flex justify-between px-8 bg-slate-800 rounded-b-xl '>
                                    <div className=' 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[20px] text-[23px] pl-8 py-2 text-slate-100'>
                                       <span>Purchased for <br/><span className='text-slate-100 font-bold'>{ethers.utils.formatEther(item.totalPrice)} ETH</span></span>
                                    </div>
                                    <div className='flex items-center justify-center pb-4'>
                                       <button className=' 2xl:text-[23px] xl:text-[23px] lg:text-[23px] md:text-[20px] sm:text-[20px] text-[20px] transition ease-in-out duration-200 bg-sky-400 hover:bg-sky-500 py-2 px-4 rounded-3xl' onClick={()=>handleResale(item)}>List to the store </button>
                                    </div>
                                 </div>
                                 {showCreate.isRunning && <CreateAndList nft={nft} marketplace={marketplace} setShowCreate={setShowCreate} isResale={showCreate.isResale} imageItem={showCreate.imageItem} nameItem={showCreate.nameItem} descriptionItem={showCreate.descriptionItem}/>}
                             </div>
                           </div>
                        </div>
                        ))}
                    </div>
                </div>)
                : (
                <div className=''>
                    <h2 className='text-center 2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px]'>You don't have any purchases</h2>
                    <button onClick={loadPurchasedItems} className='2xl:text-[25px] font-bold text-slate-900 hover:text-slate-600 duration-300 hover:underline'>Refresh item here</button>
                </div>
                )}
            </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default MyPurchases