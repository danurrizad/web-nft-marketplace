import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'

const CreateAndList = ({account, nft, marketplace}) => {
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

    const uploadIPFS = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
          try {
            const result = await client.add(file)
            console.log(result)
            setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
          } catch (error){
            console.log("ipfs image upload error: ", error)
          }
        }
      }

      const createNFT = async () => {
        if (!image || !price || !name || !description) return
        try{
          const result = await client.add(JSON.stringify({image, price, name, description}))
          mintAndList(result)
        } catch(error) {
          console.log("ipfs uri upload error: ", error)
        }
      }


      const mintAndList = async (result) => {
        const uri = `https://ipfs.infura.io/ipfs/${result.path}`
        // mint nft 
        await(await nft.mint(uri)).wait()
        // get tokenId of new nft 
        const id = await nft.tokenCount()
        // approve marketplace to spend nft
        await(await nft.setApprovalForAll(marketplace.address, true)).wait()
        // add nft to marketplace
        const listingPrice = ethers.utils.parseEther(price.toString())
        await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
      }




  return (
    <div>
        {/*CREATE AND LIST NFT */}
        <div className='bg-slate-300 min-h-screen'>
            <div id="listNFT" className='2xl:w-[35vw] xl:w-[35vw] lg:w-[35vw] w-full'>
                <div className='pt-8 px-10'>
                    <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[50px]'>Create and List</h1>
                    <h1 className='2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[30px]'>Your Own NFT</h1>
                </div>
                <div>
                    <form>
                    <div class=" px-10 2xl:pt-20 xl:pt-20 lg:pt-20 pt-10">
                        <div class="mb-3 2xl:w-full">
                            <label for="formFile" className="form-label text-lg font-bold inline-block mb-2 text-slate-800 uppercase tracking-wide">IMAGE</label>
                            <input className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-slate-200 bg-clip-padding
                                border border-solid border-slate-800
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-slate-800 focus:outline-none" 
                                type="file" 
                                id="formFile" 
                                required 
                                onChange={uploadIPFS}/>
                        </div>
                        <div className='2xl:w-full'>
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="nft-name">NFT Name</label>
                            <input className="appearance-none block w-full bg-slate-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nft-name" type="text" placeholder="Name of your NFT" required onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div className='2xl:w-full'>
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="description">DESCRIPTION</label>
                            <input className="appearance-none block w-full bg-slate-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="description" type="text" placeholder="Description of your NFT" required onChange={(e) => setDescription(e.target.value)}></input>
                        </div>
                        <div className='2xl:w-full'>
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="price">PRICE (ETH)</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="price" type="text" placeholder="Example : 0.05" required onChange={(e) => setPrice(e.target.value)}></input>
                        </div>
                        <button className="block uppercase tracking-wide text-white text-lg font-bold mb-2 mt-8 bg-slate-800 px-4 py-2 rounded-3xl hover:bg-white hover:text-slate-800" 
                            onClick={createNFT}>
                            Create and List NFT
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateAndList