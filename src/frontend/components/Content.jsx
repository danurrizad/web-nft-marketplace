import React, {useState, useEffect} from 'react'


import NFT1 from '../assets/img/1.png'
import NFT2 from '../assets/img/2.png'
import NFT3 from '../assets/img/3.png'
import NFT4 from '../assets/img/4.png'
import NFT5 from '../assets/img/5.png'
import NFT6 from '../assets/img/6.png'
import NFT7 from '../assets/img/7.png'
import NFT8 from '../assets/img/8.png'
import NFT9 from '../assets/img/9.png'
import NFT10 from '../assets/img/10.png'
import NFT11 from '../assets/img/11.png'
import NFT12 from '../assets/img/12.png'



const Content = ({account, nft, marketplace}) => {

    const [items, setItems] = useState([])

    const loadMarketplaceItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount()
        let items = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i)
            if (!item.sold) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId)
                // use uri to fetch the nft metadata stored on ipfs 
                const response = await fetch(uri)
                const metadata = await response.json()
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId)
                // Add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                })
            }
        }
        setItems(items)
    }

    useEffect(() => {
      loadMarketplaceItems()
    }, [])
    

  return (
    <div id='store' className='min-h-screen bg-slate-300'>
        <section id='header-content'>
            <div>
                <h1 className='text-center text-[72px] pb-12'>Store</h1>
                <div className='justify-center flex-1 text-center px-4 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[15px]'>
                    <h1 className='pt-1'>Wallet address :</h1>
                    {account ? (<div className='flex justify-center'><h1 className='bg-slate-100 px-4 py-1 rounded-full'>{account}</h1></div>) : null}
                    
                    <div className='px-4 2xl:text-[28px] xl:text-[28px] lg:text-[28px] md:text-[28px] text-[15px]'>
                        <span id="wallet-address" className='rounded-3xl px-4 py-1' ></span>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className='flex justify-center'>
                {items.length > 0 ? (
                    <div>
                        <h1>ADA ITEM HARUSNYA</h1>
                        <div>
                            {items.map((item,index) => (
                                <div key={index} className='pb-4 bg-slate-100 border-solid border-2 border-black w-[300px] xl:h-[400px]'> 
                                    <img src={item.image} alt='NFT-1'/>
                                    <h1 className='text-center text-[20px]'>{item.name}</h1>
                                    <div className='text-center'>
                                        <p>{item.description}</p>
                                        <button className='bg-green-300 py-1 px-10 rounded-3xl hover:bg-green-500'>Buy</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ):(
                    <main className='py-8 text-center px-4'>
                        <h1 className='2xl:text-[40px] xl:text-[40px] lg:text-[40px] text-[20px]'>Unfortunately, there are no listed NFTs here for a moment</h1>
                        <h1 className='2xl:text-[35px] xl:text-[35px] lg:text-[35px] text-[15px]'>Please comeback later...</h1>
                    </main>
                )}
            </div>
        </section>
        
        
    </div>
  )
}

export default Content