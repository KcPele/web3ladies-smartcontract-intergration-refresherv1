import React from "react";
import { useAccount } from "wagmi";
import { Account } from "./Account";
import { WalletOptions } from "./wallet-options";

const Connectwallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
};

export default Connectwallet;
