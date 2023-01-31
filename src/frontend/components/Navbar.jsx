import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Web3 from 'web3';

const Navbar = ({isConnected, setIsConnected, accounts, setAccounts}) => {
    const [msg, setMsg] = useState('');
    const [textButton, setTextButton] = useState('Connect Wallet');
    const [showAlert, setShowAlert] = useState(false);
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('')
    

    async function Connect(){
        var account = null;
        if(window.ethereum){
           await window.ethereum.send('eth_requestAccounts');
           window.web3 = new Web3(window.ethereum);
           
           var web3 = new Web3(window.ethereum);
           var accounts = await web3.eth.getAccounts();
           account = accounts[0];
           setAccounts(account);
           setIsConnected(true);
           setTitle("Successed!")
           setMsg("Your wallet are now connected");
           setTextButton( account.slice(0, 6) + '...' + account.slice(37, 42));
           setShowAlert(true);
           setColor('green');
        }
        else{
            setIsConnected(false);
            setAccounts('');
            setTitle("Error! ")
            setColor('red');
            setMsg(" You have to install MetaMask to connect your wallet");
            setTextButton("Connect Wallet")
            setShowAlert(true);
            
        }
    };

  return (
    <div className='text-white text-[25px] bg-slate-800'>
        <span className='justify-between flex'>
            <span className='justify-start flex 2xl:gap-x-28 gap-x-4 text-[15px] 2xl:text-[25px] xl:text-[25px] lg:text-[25px] lg:gap-x-20 xl:gap-x-28 py-8 2xl:px-8 xl:px-8 lg:px-8 px-4 '>
                <Link to="/dev/danur/" className='hover:text-slate-300'>Home</Link>
                <Link to="/dev/danur/#store" className='hover:text-slate-300'>Store</Link>
                <Link to="/dev/danur/manage" className='hover:text-slate-300'>Manage</Link>
                <Link to="/dev/danur/my-purchases" className='hover:text-slate-300 '>My Purchases</Link>
            </span>
            <span className='py-6 2xl:px-8 xl:px-8 px-1 2xl:text-[25px] xl:text-[25px] lg:text-[25px] text-[15px] '>
                <button 
                    className='bg-slate-900 w-full text-white border-white border-[1px] py-1 2xl:px-6 xl:px-6 lg:px-6 px-2 hover:bg-white hover:text-slate-900 hover:border-slate-900 rounded-xl' 
                    onClick={Connect}>
                        {textButton}
                </button>
                
            </span>
        </span>
        <div>
            {showAlert ? 
            (<div className={"bg-"+ color +"-200 rounded-lg 2xl:py-5 xl:py-5 lg:py-5 py-2 px-6 mb-3 2xl:text-xl xl:text-xl text-sm text-"+ color +"-700 inline-flex items-center w-full absolute"}>
                <strong className="mr-1">{title} </strong> {msg}
                <button type="button" className={"box-content w-4 h-4 p-1 ml-auto text-"+ color +"-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-"+ color +"-900 hover:opacity-75 hover:no-underline mb-2"} onClick={()=>setShowAlert(false)}>X</button>
            </div>) : null}
        </div>
    </div>
  )
}

export default Navbar