import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the `Wallet` component to make sure we don't get SSR errors
const Wallet = dynamic(
  () => import("../components/Wallet").then((res) => res.default),
  { ssr: false }
);

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <Suspense fallback={<div>Loading...</div>}>
        <Wallet />
      </Suspense>
    </main>
  );
}