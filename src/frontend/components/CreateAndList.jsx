import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Buffer } from 'buffer';


const CreateAndList = ({account, nft, marketplace, setShowCreate}) => {
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [msg, setMsg] = useState('');
    
    const projectID = process.env.REACT_APP_INFURA_PROJECT_ID;
    const secretKEY = process.env.REACT_APP_INFURA_SECRET_KEY;

    const auth = 'Basic ' + Buffer.from( projectID + ":" + secretKEY ).toString('base64');
    //const subdomain = 'https://nft-emporium.infura-ipfs.io';

    const client = ipfsHttpClient({
        host:'ipfs.infura.io',
        port:5001,
        protocol:'https',
        //apiPath: '/api/v0',
        headers:{
          authorization: auth
        }
    })


    const uploadIPFS = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
          try {
            const result = await client.add(file)
            console.log(result)
            setImage(`https://nft-emporium.infura-ipfs.io/ipfs/${result.path}`)
          } catch (error){
            console.log("ipfs image upload error: ", error)
          }
        }
      }

      const createNFT = async () => {
        if (!image || !price || !name || !description) return
        try{
          setMsg('Listing NFT...')
          const result = await client.add(JSON.stringify({image, price, name, description}))
          mintAndList(result)
        } catch(error) {
          console.log("ipfs uri upload error: ", error)
          setShowAlertError(true)
        }
      }


      const mintAndList = async (result) => {
        try {
          const uri = `https://nft-emporium.infura-ipfs.io/ipfs/${result.path}`
          await(await nft.mint(uri)).wait()           // mint nft 
          const id = await nft.tokenCount()           // get tokenId of new nft 
          await(await nft.setApprovalForAll(marketplace.address, true)).wait()            // approve marketplace to spend nft
          const listingPrice = ethers.utils.parseEther(price.toString())                  // add nft to marketplace
          await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
          setShowAlertSuccess(true)
          setMsg('')
          console.log('NFT is successfully minted')
        } catch (error) {
          console.log(error)
          setShowAlertError(true)
          setMsg('')
        }
      }




  return (
    <div>
        <div>
          {showAlertSuccess ? 
              (<div className={"bg-teal-200 z-50 fixed top-0 left-1/2 -translate-x-1/2 shadow-xl shadow-teal-800 border-t-teal-800 border-t-4 2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 2xl:text-xl xl:text-xl text-sm text-teal-700 inline-flex items-center w-screen"}
                   >
                  <strong className="mr-1">Successed! </strong> Your NFT is successfully uploaded to IPFS.
                  <button type="button" className={"box-content w-4 h-4 p-1 ml-auto text-teal-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-teal-900 hover:opacity-75 hover:no-underline mb-2"} onClick={()=>setShowAlertSuccess(false)}>X</button>
              </div>) : null}
        </div>
        <div>
          {showAlertError ? 
          (<div className={"bg-red-200 shadow-xl shadow-red-800 border-t-red-800 border-t-4 2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 mb-3 2xl:text-xl xl:text-xl text-sm text-red-700 inline-flex items-center absolute 2xl:w-[35vw] xl:w-[35vw] lg:w-[35vw] w-full"}
                >
              <strong className="mr-1">Error! </strong> Your NFT is failed to uploaded to IPFS.
              <button type="button" className={"box-content w-4 h-4 p-1 ml-auto text-red-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:red-teal-900 hover:opacity-75 hover:no-underline mb-2"} onClick={()=>setShowAlertError(false)}>X</button>
          </div>) : null}
        </div>

        {/*CREATE AND LIST NFT */}
        <div className='bg-black bg-opacity-60 w-screen min-h-screen z-40 fixed top-0 left-1/2 -translate-x-1/2'>
            <div className='border-2 bg-slate-500 mt-8 h-[92vh] z-40 fixed top-0 left-1/2 -translate-x-1/2 duration-1000 transition-all rounded-2xl w-11/12 2xl:w-fit xl:w-fit lg:w-fit md:w-fit sm:w-5/6'>
              <div id="listNFT" className='w-full '>
                  <div className='flex justify-end p-4 text-[30px]'>
                    <button onClick={()=>setShowCreate(false)} className="text-slate-900 hover:text-slate-400 duration-200 fixed">X</button>
                  </div>
                  <div className=' px-10'>
                      <h1 className='2xl:text-[70px] xl:text-[70px] lg:text-[70px] text-[45px]'>Create and List</h1>
                      <h1 className='2xl:text-[50px] xl:text-[50px] lg:text-[50px] text-[30px]'>Your Own NFT</h1>
                  </div>
                  <div className='px-8'>
                      <section id="form" className='bg-white shadow-lg shadow-black rounded-xl py-4 my-10 overflow-y-auto space-y-0  max-h-[60vh] '>
                      <div class=" px-10 pt-2 ">
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
                              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="price" type="text" placeholder="Example : 0.5" required onChange={(e) => setPrice(e.target.value)}></input>
                          </div>
                          <div className='2xl:w-full hidden'>
                              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="description">ROYALTY (%)</label>
                              <input className="appearance-none block w-full bg-slate-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="royalty" type="text" placeholder="Percentage of price you'll get" onChange=''></input>
                          </div>
                          <div className='flex justify-between'>
                            <button className="block uppercase tracking-wide text-white text-xs 2xl:text-lg font-bold mb-2 mt-8 bg-slate-800  px-2 2xl:px-4 py-2 rounded-3xl hover:bg-white hover:text-slate-800 hover:border-slate-800 border-2 duration-200" 
                                onClick={createNFT}>
                                Create and List NFT
                            </button>
                            <p className='pt-12 2xl:text-[15px] xl:text-[15px] lg:text-[14px] text-[12px]  text-teal-500 animate-pulse font-bold'>{msg}</p>
                          </div>
                      </div>
                      
                      </section>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CreateAndList