import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./constant";
const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [contract, setContract] = useState();

  const [greeting, setGreeting] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [newGreeting, setNewGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        //opens metamask for connection
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        setAddress(address);
        setSigner(signer);
        setProvider(provider);
        setContract(contract);
      }
    };

    initializeProvider();
  }, []);

  useEffect(() => {
    const getNetwork = async () => {
      if (provider) {
        const network = await provider.getNetwork();
        setNetwork(network.name);
      }
    };

    getNetwork();
  }, [provider]);

  useEffect(() => {
    async function readContract() {
      try {
        setGreeting(await contract.greeting());
        setIsPremium(await contract.premium());
      } catch (error) {
        console.log(error);
      }
    }
    if (contract) {
      readContract();
    }
  }, [contract, loading]);

  async function handleNewGreeting() {
    if (!contract) return;
    setLoading(true);
    try {
      let res = await contract.setGreeting(newGreeting, {
        value: ethers.utils.parseEther("0.1"),
      });
      res.wait();
      if (res) {
        console.log(res);
      }

      setNewGreeting("");
    } catch (error) {
      console.log(error);
    }
  }
  const eventListener = () => {
    if (contract) {
      contract.on(
        "GreetingChange",
        (greetingSetter, newGreeting, premium, value, event) => {
          console.log(greetingSetter, newGreeting, premium, value, event);
          setLoading(false);
        }
      );
    }
  };

  useEffect(eventListener, [contract]);

  return (
    <div>
      <h1>Ethers.js and React Integration</h1>
      <p>Connected to network: {network}</p>
      <p>Connected account: {address}</p>
      {greeting}
      <p> {isPremium ? "premium" : "Not premium"}</p>
      <div>
        <input
          value={newGreeting}
          onChange={(e) => setNewGreeting(e.target.value)}
        />
        <button onClick={handleNewGreeting}>
          {loading ? "Loading" : "Set Greeting"}
        </button>
      </div>
    </div>
  );
};

export default App;
