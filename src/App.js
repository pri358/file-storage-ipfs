import React, { Component } from "react";
import { Buffer } from 'buffer';
//import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import './App.css'
import ipfs from './ipfs'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buffer: null, 
      ipfsHash: ''
    }

    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       alert("Please install MetaMask!");
  //       return;
  //     }

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });

  //     console.log("Connected", accounts[0]);
  //     fetchGreetings();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchGreetings = async () => {
  //   let contractAddress = "YOUR_CONTRACT_ADDRESS";
  //   const { ethereum } = window;

  //   if (!ethereum) {
  //     alert("Please install MetaMask!");
  //     return;
  //   }

  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(
  //     contractAddress,
  //     Greeter.abi,
  //     provider
  //   );

  //   const greeting = await contract.greet();
  //   console.log(greeting);
  // };

  // useEffect(() => {
  //   connectWallet();
  // }, []);

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      const response = await ipfs.add(this.state.buffer)
      this.setState({ ipfsHash: response.path })
      console.log('ipfsHash', this.state.ipfsHash)
    }
    catch(e){
      console.log("Error: ", e)
      return
    }
  }

  render() {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
        </div>
      </div>
      <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Image</h1>
              <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
              <h2>Upload Image</h2>
              <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile}/>
                <input type='submit' />
              </form>
            </div>
          </div>
        </main>
    </div>
  );
}
}
export default App
