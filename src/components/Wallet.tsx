import { useEffect, useRef, useState } from "react";
import SocialLogin from "@biconomy/web3-auth";

export default function Wallet() {
    const sdkRef = useRef<SocialLogin | null>(null);
    const [interval, enableInterval] = useState<boolean>(false);

    
}