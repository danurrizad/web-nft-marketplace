import React, {useState} from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Buffer } from 'buffer';
import Loading from './Loading';
import ModalAlert from './ModalAlert';


const CreateAndList = ({account, nft, marketplace, setShowCreate, isResale, imageItem, nameItem, descriptionItem}) => {
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [royalty, setRoyalty] = useState('')
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
            setImage(`https://nft-emporium.infura-ipfs.io/ipfs/${result.path}`)
          } catch (error){
            console.log("ipfs image upload error: ", error)
          }
        }
      }

      const createNFT = async () => {
        if (!image || !price || !name || !description) {
          setIsError(true)
          setMsg("You have to fill all fields")
        }
        else{
          try{
            setIsError(false)
            setIsLoading(true)
            const result = await client.add(JSON.stringify({image, price, name, description}))    
            mintAndList(result)
          } catch(error) {
            console.log("ipfs uri upload error: ", error)
            setShowModalError(true)
          }
        }
      }


      const mintAndList = async (result) => {
        try {
          const uri = `https://nft-emporium.infura-ipfs.io/ipfs/${result.path}`
          await(await nft.mint(uri)).wait()           // mint nft 
          const id = await nft.tokenCount()           // get tokenId of new nft 
          await(await nft.setApprovalForAll(marketplace.address, true)).wait()            // approve marketplace to spend nft
          await(await marketplace.setRoyaltyFee(royalty)).wait()
          const listingPrice = ethers.utils.parseEther(price.toString())                  // add nft to marketplace
          await(await marketplace.makeItem(nft.address, id, listingPrice, royalty, isResale)).wait()
          setShowModalSuccess(true)
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setShowModalError(true)
          setIsLoading(false)
        }
      }

      

      const resaleNFT = async () => {
        setImage(imageItem);
        setName(nameItem);
        setDescription(descriptionItem);
        createNFT()
      }

      const closeModalAlert = () => {
        setShowModalError(false);
        setShowModalSuccess(false);
        setShowCreate(false, false, null, null, null);
      }

  if(isResale) return(
    <>
      <div>
        <div>
          {showModalError ? (<ModalAlert color={"red"} title={"Failed"} msg={"Your NFT is failed to uploaded to store."} closeModal = {closeModalAlert}/>) : null}
          {showModalSuccess ? (<ModalAlert color={"teal"} title={"Successed"} msg={"Your NFT is successfully uploaded to store."} closeModal = {closeModalAlert}/>) : null}
        </div>
        <div>
          {isLoading ? (
            <div className='fixed z-50 left-0 top-0 min-h-screen bg-slate-200 bg-opacity-50 max-w-screen w-screen'>
                <div className='flex items-center justify-center flex-col min-h-screen font-serif animate-pulse font-medium'>
                  <Loading textLoading="Listing NFT..."/>
                </div>
            </div>
          ):null}
        </div>

        {/* RESALE NFT */}
        <div className='bg-black bg-opacity-30 w-screen min-h-screen z-40 fixed top-0 left-1/2 -translate-x-1/2'>
            <div className='border-2 border-slate-800 shadow-2xl shadow-sky-500 bg-slate-500 mt-8 h-[92vh] z-40 fixed top-0 left-1/2 -translate-x-1/2 duration-1000 transition-all rounded-2xl w-11/12 2xl:w-fit xl:w-fit lg:w-fit md:w-fit sm:w-5/6'>
              <div id="listNFT" className='w-full '>
                  <div className='flex justify-end p-4 text-[30px]'>
                    <button onClick={()=>setShowCreate(false, false, null, null, null)} className="text-slate-900 hover:text-slate-400 duration-200 fixed px-3 hover:bg-slate-900">X</button>
                  </div>
                  <div className=' px-10'>
                      <h1 className='pt-4 2xl:text-[65px] xl:text-[65px] lg:text-[65px] text-[45px] font-serif'>Resale and Re-list</h1>
                      <h1 className='2xl:text-[45px] xl:text-[45px] lg:text-[45px] text-[30px] font-serif'>Your NFT</h1>
                  </div>
                  <div className='px-8'>
                      <section id="form" className='bg-white shadow-lg shadow-black rounded-xl py-4 my-10 overflow-y-auto space-y-0  max-h-[60vh] '>
                      <div class=" px-10 pt-2 ">
                          <div className='justify-center flex py-4'>
                            <img src={imageItem} alt="nft-item" className='w-[300px]' />
                          </div>
                          <div className='2xl:w-full'>
                              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="price">PRICE (ETH)</label>
                              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="price" type="text" placeholder="Set your new price" required onChange={(e) => setPrice(e.target.value)}></input>
                          </div>
                          <div className='2xl:w-full'>
                              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="description">ROYALTY (%)</label>
                              <input className="appearance-none block w-full bg-slate-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="royalty" type="text" placeholder="Set your new royalty. Royalty usually is on 1-10" required onChange={(e) => setRoyalty(e.target.value)}></input>
                          </div>
                          {isError ? (<p className='text-center 2xl:text-[15px] xl:text-[15px] lg:text-[14px] text-[12px]  text-red-500 font-bold'>{msg}</p>):null}
                          <div className='flex justify-center'>
                            <button className="block uppercase tracking-wide text-white text-xs 2xl:text-lg font-bold mb-2 mt-8 bg-slate-800  px-2 2xl:px-4 py-2 rounded-3xl hover:bg-white hover:text-slate-800 hover:border-slate-800 border-2 duration-200" 
                                onClick={resaleNFT}>
                                Resale your NFT
                            </button>
                          </div>
                      </div>
                      
                      </section>
                  </div>
              </div>
            </div>
        </div>
    </div>
    </>
  )
  
  return (
    <div>
        <div>
          {showModalError ? (<ModalAlert color="red" title="Failed" msg="Your NFT is failed to uploaded to store." closeModal = {closeModalAlert}/>) : null}
          {showModalSuccess ? (<ModalAlert color="teal" title="Successed" msg="Your NFT is successfully uploaded to store." closeModal = {closeModalAlert}/>) : null}
        </div>
        <div>
          {isLoading ? (
            <div className='fixed z-50  top-0 min-h-screen bg-slate-200 bg-opacity-50 max-w-screen w-screen'>
                <div className='flex items-center justify-center flex-col min-h-screen font-serif animate-pulse font-medium'>
                  <Loading textLoading="Listing NFT..."/>
                </div>
            </div>
          ):null}
        </div>

        {/*CREATE AND LIST NFT */}
        <div className='bg-black bg-opacity-60 w-screen min-h-screen z-40 fixed top-0 left-1/2 -translate-x-1/2'>
            <div className='shadow-2xl shadow-sky-600 border-2 border-slate-700 bg-slate-500 mt-8 h-[92vh] z-40 fixed top-0 left-1/2 -translate-x-1/2 rounded-2xl w-11/12 2xl:w-fit xl:w-fit lg:w-fit md:w-fit sm:w-5/6'>
              <div id="listNFT" className='w-full '>
                  <div className='flex justify-end p-4 text-[30px] '>
                    <button onClick={()=>setShowCreate(false, false, null, null, null)} className="text-slate-900 hover:text-slate-400 duration-200 fixed  px-3 hover:bg-slate-900">X</button>
                  </div>
                  <div className=' px-10'>
                      <h1 className='pt-4 2xl:text-[65px] xl:text-[65px] lg:text-[65px] text-[45px] font-serif'>Create and List</h1>
                      <h1 className='2xl:text-[45px] xl:text-[45px] lg:text-[45px] text-[30px] font-serif'>Your Own NFT</h1>
                  </div>
                  <div className='px-8'>
                      <section id="form" className='bg-white shadow-lg shadow-black rounded-xl py-4 my-10 overflow-y-auto space-y-0  max-h-[60vh] '>
                      <div class=" px-10 pt-2 ">
                          <div class="mb-3 2xl:w-full">
                              <label for="formFile" className="form-label text-lg font-bold inline-block mb-2 text-slate-800 uppercase tracking-wide">IMAGE</label>
                              <div className='pb-2 flex justify-center'>
                                {image ? <img src={image} alt="img-nft" className='w-[300px] border-2 border-black' /> : null}
                              </div>
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
                          <div className='2xl:w-full'>
                              <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" for="description">ROYALTY (%)</label>
                              <input className="appearance-none block w-full bg-slate-200 text-gray-700 border border-slate-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="royalty" type="text" placeholder="Royalty usually is on 1-10" required onChange={(e) => setRoyalty(e.target.value)}></input>
                          </div>
                          {isError ? (<p className='text-center 2xl:text-[15px] xl:text-[15px] lg:text-[14px] text-[12px]  text-red-500 font-bold'>{msg}</p>):null}
                          <div className='flex justify-center'>
                            <button className="block uppercase tracking-wide text-white text-xs 2xl:text-lg font-bold mb-2 mt-8 bg-slate-800  px-2 2xl:px-4 py-2 rounded-3xl hover:bg-white hover:text-slate-800 hover:border-slate-800 border-2 duration-200" 
                                onClick={createNFT}>
                                Create and List NFT
                            </button>
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