import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Manager from './components/Manager';
import MyPurchases from './components/MyPurchases';

import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Web3 from 'web3';
import { ethers } from 'ethers';
import MarketplaceAddress from './contractsData/Marketplace-address.json';
import MarketplaceABI from './contractsData/Marketplace.json';
import NFTAddress from './contractsData/ERC721NFT-address.json';
import NFTABI from './contractsData/ERC721NFT.json';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [textButton, setTextButton] = useState('Connect Wallet');
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})

  async function Connect(){
    var newAccount = null;
    if(window.ethereum){
       await window.ethereum.send('eth_requestAccounts');
       window.web3 = new Web3(window.ethereum);
       
       var web3 = new Web3(window.ethereum);
       var accounts = await web3.eth.getAccounts();
       setAccount(accounts[0]);
       const textAccount = accounts[0];
       
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();

       loadContracts(signer);

       setIsConnected(true);
       setTextButton( textAccount.slice(0, 6) + '...' + textAccount.slice(37, 42));
       setShowAlertSuccess(true);
    }
    else{
        setIsConnected(false);
        setAccount('');
        setTextButton("Connect Wallet"); 
        setShowAlertError(true);
        
    }
};

const loadContracts = async (signer) => {
  // Get deployed copies of contracts
  const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceABI.abi, signer);
  setMarketplace(marketplace);
  const nft = new ethers.Contract(NFTAddress.address, NFTABI.abi, signer);
  setNFT(nft);
}
  
  return (
    <div className="App">
      <BrowserRouter basename='/dev/danur'>
        <>
          <Navbar textButton={textButton} showAlertSuccess={showAlertSuccess} setShowAlertSuccess={setShowAlertSuccess} showAlertError={showAlertError} setShowAlertError={setShowAlertError} Connect={Connect}/>
        </>
        <Routes>
          <Route path="/" element={<LandingPage account={account} nft={nft} marketplace={marketplace}/>} />
          <Route path="/home" element={<LandingPage account={account} nft={nft} marketplace={marketplace}/>}/>
          <Route path="/manage" element={<Manager account={account} nft={nft} marketplace={marketplace}/>} />
          <Route path="/my-purchases" element={<MyPurchases account={account}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
