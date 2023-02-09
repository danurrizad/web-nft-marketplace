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
          mylistedItems.push(item)
          if (i.sold) soldItems.push(item)              // Add listed item to sold items array if sold
          setIsLoadingItems(false)
        }
      }
      
      setListedItems(mylistedItems)
      setSoldItems(soldItems)
      
    }

    useEffect(() => {
        loadListedItems()
    }, []);

    function loadSoldItems(items){
      return(
        <>
          {items.length > 0 ? 
          (<div className='flex'>
            <div className='px-10 py-8 flex flex-wrap'>
              {items.map((item, index) => (
                <div key={index} className='bg-slate-100 border-solid border-2 border-black w-[150px] 2xl:w-[300px] xl:w-[300px] lg:w-[300px] min-w-[150px] h-fit '>
                  <div>
                  <h1 className='text-center 2xl:text-[20px] text-[15px] bg-slate-700 text-white p-1'>{item.name}</h1>
                    <img src={item.image} alt={"sold-items-"} />
                    <div className=' shadow-xl shadow-slate-600 bg-slate-700 p-4 border-y-4 border-black flex flex-col text-center justify-center text-white 2xl:text-[23px] xl:text-[23px] lg:text-[23px] md:text-[20px] sm:text-[12px] text-[12px]'>
                      <p>Received : {ethers.utils.formatEther(item.price)} ETH</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>)
          :(
          <div className='2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px]  pt-8 px-10 '>
              <h1>You dont have any NFT that already sold</h1>
          </div>)}
        </>
      )
    }

  return (
    <div>
        <div className='bg-slate-300 min-h-screen'>
            {/*MY LISTED NFT */}
            <div id="myListedNFT" className=' w-full pb-10'>
                    <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px] pt-8 px-10 '>My Listed NFTs</h1>
                    <div className='flex'>
                      {listedItems.length > 0 ? (
                          <div className='px-10 py-8 flex flex-wrap gap-10'>
                              {listedItems.map((item,index) => (
                                  <div key={index} className='shadow-xl shadow-slate-600 bg-slate-700 border-solid border-2 border-b-0 border-black w-[150px] 2xl:w-[300px] xl:w-[300px] lg:w-[300px] min-w-[150px] h-fit '>
                                      <h1 className='text-center 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[15px] sm:text-[15px] text-[15px] bg-slate-700 text-white p-1'>{item.name}</h1>
                                      <div className='p-0'><img src={item.image}/></div>
                                      <div className=' bg-slate-700 p-4 border-y-4 border-black flex justify-center text-white 2xl:text-[23px] xl:text-[23px] lg:text-[23px] md:text-[12px] sm:text-[12px] text-[12px]'>
                                        <h2>Listed for <span>{ethers.utils.formatEther(item.totalPrice)}</span> ETH</h2>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      ):(
                          <div className='2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px]  pt-8 px-10 '>
                              <h1>You dont have your listed NFT here</h1>
                          </div>
                      )}
                    </div>
                    { isLoadingItems ? (
                      <div className='justify-start flex text-left pt-0 px-10 text-[15px]'>
                        <Loading textLoading='Loading items...'/>
                      </div>
                    ) : null}
                    <div className='flex border-0'>
                      <h2 className='px-10 2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px]'>Want to create your own NFT and list it to the store? <button onClick={()=>setShowCreate(true)} className='2xl:text-[25px] font-bold text-slate-900 hover:text-slate-600 duration-300'>Create here</button></h2>
                    </div>
                    {showCreate ? <CreateAndList nft={nft} marketplace={marketplace} setShowCreate={setShowCreate}/> : null}
                    
                    <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px] pt-20 px-10 '>Sold Items</h1>
                    {listedItems.length > 0 && loadSoldItems(soldItems)}
            </div>
        </div>
    </div>
  )
}

export default MyListedNFT