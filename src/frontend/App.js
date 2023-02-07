import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Manager from './components/Manager';
import MyPurchases from './components/MyPurchases';

import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ReactLoading from 'react-loading';

import Web3 from 'web3';
import { ethers } from 'ethers';
import MarketplaceAddress from './contractsData/Marketplace-address.json';
import MarketplaceABI from './contractsData/Marketplace.json';
import NFTAddress from './contractsData/ERC721NFT-address.json';
import NFTABI from './contractsData/ERC721NFT.json';

function App() {
  const [account, setAccount] = useState('');
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})

  async function Connect(){
    if(window.ethereum){
       setIsLoading(true);
       await window.ethereum.send('eth_requestAccounts');
       window.web3 = new Web3(window.ethereum);
       
       var web3 = new Web3(window.ethereum);
       var accounts = await web3.eth.getAccounts();
       setAccount(accounts[0]);
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       
       loadContracts(signer);

       setShowAlertSuccess(true);
       setIsLoading(false);
    }
    else{
        setIsLoading(true);
        setAccount('');
        setShowAlertError(true);
        setIsLoading(false);
    }
};

const loadContracts = async (signer) => {
  // Get deployed copies of contracts
  const mymarketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceABI.abi, signer);
  setMarketplace(mymarketplace);
  const mynft = new ethers.Contract(NFTAddress.address, NFTABI.abi, signer);
  setNFT(mynft);
}
  
  return (
    <div className="App">
      <BrowserRouter basename='/dev/danur'>
        <>
          <Navbar isLoading={isLoading} account={account} showAlertSuccess={showAlertSuccess} setShowAlertSuccess={setShowAlertSuccess} showAlertError={showAlertError} setShowAlertError={setShowAlertError} Connect={Connect}/>
        </>
        <Routes>
          <Route path="/" element={<Home account={account} nft={nft} marketplace={marketplace}/>} />
          <Route path="/manage" element={<Manager isLoading={isLoading} account={account} nft={nft} marketplace={marketplace}/>} />
          <Route path="/my-purchases" element={<MyPurchases isLoading={isLoading} account={account} nft={nft} marketplace={marketplace}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
