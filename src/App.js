import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [isConnected, setIsConnected] = useState(false)
  return (
    <div className="App">
      <Header/>
      <Content isConnected={isConnected} setIsConnected={setIsConnected}/>
      <Footer/>
    </div>
  );
}

export default App;
