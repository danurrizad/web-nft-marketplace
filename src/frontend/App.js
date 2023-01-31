import './App.css';
import LandingPage from './components/LandingPage';
import Manager from './components/Manager';
import MyPurchases from './components/MyPurchases';

import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/dev/danur/" element={<LandingPage isConnected={isConnected} setIsConnected={setIsConnected} accounts={accounts} setAccounts={setAccounts}/>} />
            <Route path="/dev/danur/home" element={<LandingPage isConnected={isConnected} setIsConnected={setIsConnected} accounts={accounts} setAccounts={setAccounts}/>}/>
            <Route path="/dev/danur/manage" element={<Manager isConnected={isConnected} setIsConnected={setIsConnected} accounts={accounts} setAccounts={setAccounts} />} />
            <Route path="/dev/danur/my-purchases" element={<MyPurchases isConnected={isConnected} setIsConnected={setIsConnected} accounts={accounts} setAccounts={setAccounts} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
