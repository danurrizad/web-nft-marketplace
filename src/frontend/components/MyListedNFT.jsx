import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'

const MyListedNFT = ({account, nft, marketplace}) => {

    const [listedItems, setListedItems] = useState([])
    const [soldItems, setSoldItems] = useState([])

    function loadSoldItems(items){
      return(
        <>
          <h1>Sold Items</h1>
          <div>
            {items.map((item, index) => (
              <div key={index} className="">
                <div>
                  <img src={item.image} alt={"sold-items-"} />
                  <p>Price : {ethers.utils.formatEther(item.totalPrice)} ETH</p>
                  <p>Received : {ethers.utils.formatEther(item.price)} ETH</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    }

    const loadListedItems = async () => {
      console.log('Start to load listed items...')
      const itemCount = await marketplace.itemCount()   // Load all sold items that the user listed
      let listedItems = []
      let soldItems = []
      for (let i = 1; i <= itemCount; i++) {
        const i = await marketplace.items(i)
        if (i.seller.toLowerCase() === account) {
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
          listedItems.push(item)
          if (i.sold) soldItems.push(item)              // Add listed item to sold items array if sold
        }
      }
      setListedItems(listedItems)
      setSoldItems(soldItems)
      console.log('Finished to load')
    }

    useEffect(() => {
        loadListedItems()
    }, []);

  return (
    <div>
        <div className='bg-slate-300 min-h-screen'>
            {/*MY LISTED NFT */}
            <div id="myListedNFT" className='2xl:w-[60vw] xl:w-[60vw] lg:w-[60vw] w-full pb-10'>
                    <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px] pt-8 px-10 '>My Listed NFTs</h1>
                    {listedItems.length > 0 ? (
                        <div>
                            {listedItems.map((item,index) => (
                                <div key={index}>
                                    <div><img src={item.image}/></div>
                                    <div><h2>Price : <span>{ethers.utils.formatEther(item.totalPrice)}</span> ETH</h2></div>
                                </div>
                            ))}
                            {soldItems.length > 0 && loadSoldItems(soldItems)}
                        </div>
                    ):(
                        <div className='2xl:text-[30px] xl:text-[30px] lg:text-[30px] text-[20px] pb-8 pt-8 px-10 '>
                            <h1>You dont have your listed NFT here</h1>
                        </div>
                    )}
                </div>
        </div>
    </div>
  )
}

export default MyListedNFT