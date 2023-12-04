import { BiconomySmartAccount } from "@biconomy/account";
import { useEffect, useState } from "react";

const [smartContractAddress, setSmartContractAddress] = useState("");

async function getSmartContractAddress() {
    const smartContractAddress = await smartAccount.getSmartAccountAddress();
    setSmartContractAddress(smartContractAddress);
}