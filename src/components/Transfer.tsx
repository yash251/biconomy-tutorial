import { BiconomySmartAccount } from "@biconomy/account";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { USDC_CONTRACT_ADDRESS, ERC20ABI } from "@/constants";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";

export default function Transfer({
  smartAccount,
}: {
  smartAccount: BiconomySmartAccount;
}) {
  const [smartContractAddress, setSmartContractAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");

  async function getSmartContractAddress() {
    const smartContractAddress = await smartAccount.getSmartAccountAddress();
    setSmartContractAddress(smartContractAddress);
  }

  // Get the address of the smart account when the component loads
  useEffect(() => {
    getSmartContractAddress();
  }, []);

  async function transfer() {
    try {
      // Initiate the loading state
      setIsLoading(true);
  
      // Create an Ethers Contract instance for USDC
      const readProvider = smartAccount.provider;
      const tokenContract = new ethers.Contract(
        USDC_CONTRACT_ADDRESS,
        ERC20ABI,
        readProvider
      );

      // Fetch the amount of decimals in this ERC20 Contract
      const decimals = await tokenContract.decimals();
      // Convert the user inputted amount to the proper denomination unit based on the token decimals
      const amountInLowestUnit = ethers.utils.parseUnits(
        amount.toString(),
        decimals
      );

      // Create the calldata for our UserOperation
      const populatedTransferTxn =
      await tokenContract.populateTransaction.transfer(
        recipient,
        amountInLowestUnit
      );
      const calldata = populatedTransferTxn.data;

      // Build the UserOperation
      const userOp = await smartAccount.buildUserOp([
        {
          to: USDC_CONTRACT_ADDRESS,
          data: calldata,
        },
      ]);
    }
  }
}