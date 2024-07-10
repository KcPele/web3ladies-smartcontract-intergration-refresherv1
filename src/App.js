import React from "react";
import Connectwallet from "./Connectwallet";
import { abi, contractAddress } from "./constant";
import { useReadContract, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
const App = () => {
  const [newGreeting, setNewGreeting] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { queryClient } = useQueryClient();
  const { data: greeting } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "greeting",
    scopeKey: "greeting",
  });
  const { data: premium } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "premium",
  });
  const { writeContractAsync } = useWriteContract();

  const handleGreeting = async () => {
    try {
      setLoading(true);
      await writeContractAsync({
        abi,
        address: contractAddress,
        functionName: "setGreeting",
        args: [newGreeting],
      });
      setLoading(false);
      queryClient.invalidateQueries("greeting");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      App
      <Connectwallet />
      <div>
        <p>{greeting}</p>
        {premium ? "Premium" : "Not Premium"}
      </div>
      <div>
        <input
          type="text"
          value={newGreeting}
          onChange={(e) => setNewGreeting(e.target.value)}
        />
        <button onClick={handleGreeting}>
          {loading ? "Loading..." : "Set Greeting"}
        </button>
      </div>
    </div>
  );
};

export default App;
