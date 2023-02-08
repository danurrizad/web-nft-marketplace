import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'

import Loading from './Loading';


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
        <div className='bg-slate-300 min-h-screen'>
            <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center'>Connecting...</h1>
        </div>
      )

    if (!account) return (
        <main className='bg-slate-300 min-h-screen'>
          <h1 className='flex justify-center items-center flex-col p-8 2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[20px] text-center '>Please connect your wallet to see your purchases...</h1>
        </main>
      )
  return (
    <div>
        <div className='bg-slate-300 min-h-screen'>
            <div className='py-8 px-10'>
                <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px] text-center'>My Purchases</h1>
            </div>
            {isLoadingItems ? (<Loading textLoading='Loading items...'/>) : (
                <div>
                <div className='justify-center flex-1 gap-y-10 2xl:flex 2xl:justify-center 2xl:gap-0 2xl:p-8 px-2'>
                    {purchases.length > 0 ? (
                    <div className="px-5 container">
                        <div className="g-4 py-5">
                            {purchases.map((item, index) => (
                            <div key={index} className="overflow-hidden">
                                <div className='shadow-xl shadow-slate-600 bg-slate-700 border-solid border-2 border-b-0 border-black w-[150px] 2xl:w-[300px] xl:w-[300px] lg:w-[300px] md:w-[300px] sm:w-[250px] min-w-[150px]'>
                                    <img variant="top" src={item.image} alt={"item-"+index} className=''/>
                                    <div className='text-center text-[12px] 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[20px] sm:text-[12px] p-4 text-white'>
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
                    </div>
                    )}
                </div>
                </div>
            )}
            
        </div>
    </div>
  )
}

export default MyPurchases