import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'

import CreateAndList from './CreateAndList';
import Loading from './Loading';

const MyListedNFT = ({account, nft, marketplace}) => {

    const [listedItems, setListedItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    

    const loadListedItems = async () => {
      setIsLoadingItems(true)
      const itemCount = await marketplace.itemCount()   // Load all sold items that the user listed
      let mylistedItems = []
      let soldItems = []
      for (let index = 1; index <= itemCount; index++) {
        const i = await marketplace.items(index)
        if (i.seller === account) {
          const uri = await nft.tokenURI(i.tokenId)     // get uri url from nft contract
          const response = await fetch(uri)             // use uri to fetch the nft metadata stored on ipfs 
          const metadata = await response.json()
          const totalPrice = await marketplace.getTotalPrice(i.itemId)      // get total price of item (item price + fee)
          let item = {          // define listed item object
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          }
          console.log(`i.resell ${metadata.name} :`, i.resell)
          mylistedItems.push(item)
          if (i.sold) soldItems.push(item)              // Add listed item to sold items array if sold
        }
      }
      
      setListedItems(mylistedItems)
      setSoldItems(soldItems)
      setIsLoadingItems(false)
    }

    useEffect(() => {
        loadListedItems()
    }, []);

    function loadSoldItems(items){
      return(
        <>
          {items.length > 0 ? 
          (<div className='flex'>
            <div className='px-20 py-8 flex flex-wrap gap-10'>
              {items.map((item, index) => (
                <div className='2xl:w-[40%] xl:w-[40%] lg:w-[40%] md:w-[40%]'>
                  <div key={index} className='rounded-xl bg-black border-2 border-b-0 border-black w-fit h-fit '>
                    <div>
                      <img src={item.image} alt={"sold-items-"+index} className="pt-4 rounded-t-lg bg-slate-800"/>
                      <div className='flex-col justify-start bg-slate-800 rounded-b-xl px-4'>
                        <h1 className='rounded-t-xl 2xl:text-[25px] text-[30px]  text-slate-100 px-4 py-4 font-bold'>{item.name}</h1>
                        <div className='pb-4 px-4 text-slate-100 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[20px] sm:text-[15px] text-[25px]'>
                          <p>Received : <span className='font-bold'> {ethers.utils.formatEther(item.price)} ETH</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>)
          :(
          <div className='2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px]  pt-8 px-20 '>
              <h1>You dont have any NFT that already sold</h1>
          </div>)}
        </>
      )
    }

  if(isLoadingItems) return(
    <div className='bg-slate-300 min-h-screen'>
      <div id="myListedNFT" className=' w-full pb-10'>
        <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[40px] pt-8 px-4 2xl:text-left xl:text-left lg:text-left text-center 2xl:px-20 xl:px-20 lg:px-20 md:px-20 font-serif'>MY LISTED ITEMS</h1>
        <div className='px-20 flex justify-start pb-32'>
          <Loading textLoading='Loading items...'/>
        </div>

      </div>
    </div>
  )

  return (
    <div>
        <div className='bg-slate-300 min-h-screen'>
            {/*MY LISTED NFT */}
            <div id="myListedNFT" className=' w-full pb-10'>
              <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[40px] pt-8 px-4 2xl:text-left xl:text-left lg:text-left text-center 2xl:px-20 xl:px-20 lg:px-20 md:px-20 font-serif'>MY LISTED ITEMS</h1>
              <div className='flex'>
                {listedItems.length > 0 ? (
                    <div className='px-20 py-8 flex flex-wrap gap-10'>
                        {listedItems.map((item,index) => (
                            <div className='2xl:w-[40%] xl:w-[40%] lg:w-[40%] md:w-[40%]'>
                              <div key={index} className='rounded-xl shadow-xl shadow-slate-600 bg-slate-800 border-solid border-2 border-b-0 border-black w-fit h-fit '>
                                  <div className='p-0'><img src={item.image} alt={"item-nft-"+index} className="pt-4 rounded-t-lg"/></div>
                                  <div className='rounded-b-lg bg-slate-800 p-4 flex-col justify-start text-slate-100 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[15px] sm:text-[15px] text-[25px]'>
                                    <h1 className='rounded-t-lg 2xl:text-[25px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px] text-[20px] bg-slate-800 text-slate-100 py-4 font-bold'>{item.name}</h1>
                                    <h2>Listed for <span className='font-bold'>{ethers.utils.formatEther(item.totalPrice)}</span> ETH</h2>
                                  </div>
                              </div>
                            </div>
                        ))}
                    </div>
                ):(
                    <div className='2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px]  pt-8 px-20 '>
                        <h1>You dont have your listed NFT here</h1>
                    </div>
                )}
              </div>
              <div className='flex border-0'>
                <h2 className='px-20 2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px]'>Want to create your own NFT and list it to the store? <button onClick={()=>setShowCreate(true)} className='2xl:text-[25px] font-bold text-slate-900 hover:text-slate-600 duration-300 hover:underline'>Create here</button></h2>
              </div>
              {showCreate ? <CreateAndList nft={nft} marketplace={marketplace} setShowCreate={setShowCreate}/> : null}
              
              <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[40px] pt-20 px-4 2xl:text-left xl:text-left lg:text-left text-center 2xl:px-20 xl:px-20 lg:px-20 md:px-20 font-serif'>SOLD ITEMS</h1>
              {listedItems.length > 0 && loadSoldItems(soldItems)}
            </div>
        </div>
    </div>
  )
}

export default MyListedNFT