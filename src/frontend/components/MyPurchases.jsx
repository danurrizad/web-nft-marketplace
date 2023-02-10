import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'

import Loading from './Loading';
import Footer from './Footer'


const MyPurchases = ({account, isLoading, nft, marketplace}) => {
    const [purchases, setPurchases] = useState([]);
    const [isLoadingItems, setIsLoadingItems] = useState(false);

        const loadPurchasedItems = async () => {
        setIsLoadingItems(true)
        const filter =  marketplace.filters.Bought(null,null,null,null,null,account)            // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
        const results = await marketplace.queryFilter(filter)
        const purchases = await Promise.all(results.map(async i => {        //Fetch metadata of each nft and add that to listedItem object.
        i = i.args                                      // fetch arguments from each result
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
        return purchasedItem
        }))
        setPurchases(purchases)
        setIsLoadingItems(false)
    }

    useEffect(() => {
        loadPurchasedItems()
    }, [])

    if(isLoading) return (
        <div>
            <div className='bg-slate-300 min-h-screen'>
                <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center'>Connecting...</h1>
            </div>
            <Footer/>
        </div>
      )

    if (!account) return (
        <div>
            <main className='bg-slate-300 min-h-screen'>
              <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center '>Please connect your wallet to see your purchases...</h1>
            </main>
            <Footer/>
        </div>
      )

    if(isLoadingItems) return (
        <>
            <div className='bg-slate-300 min-h-screen'>
                <div className='py-8 px-10'>
                    <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px] text-center'>My Purchases</h1>
                </div>
                <Loading textLoading='Loading items...'/>
            </div>
        </>
    )

  return (
    <div>
        <div className='bg-slate-300 min-h-screen'>
            <div className='py-8 px-10'>
                <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px] text-center'>My Purchases</h1>
            </div>
            <div>
            <div className='justify-center flex gap-y-10 gap-10 2xl:p-8 px-2'>
                {purchases.length > 0 ? (
                <div className="px-5 container flex">
                    <div className="g-4 py-5 flex flex-wrap gap-10">
                        {purchases.map((item, index) => (
                        <div key={index} className="overflow-hidden">
                            <div className='rounded-xl shadow-xl shadow-slate-600 bg-black border-solid border-2 border-b-0 border-black w-[150px] 2xl:w-[300px] xl:w-[300px] lg:w-[300px] md:w-[300px] sm:w-[250px] min-w-[150px]'>
                                <h1 className='rounded-t-xl text-center 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[15px] sm:text-[15px] text-[15px] bg-slate-800 text-white p-1'>{item.name}</h1>
                                <img variant="top" src={item.image} alt={"item-"+index} className=''/>
                                <div className='rounded-b-xl border-y-4 border-black bg-slate-800 text-center 2xl:text-[23px] xl:text-[23px] lg:text-[23px] md:text-[12px] sm:text-[12px] text-[12px] p-4 text-white'>
                                    <div>Purchased for {ethers.utils.formatEther(item.totalPrice)} ETH</div>
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