import { useAddress, useContract, useMetamask, useDisconnect } from '@thirdweb-dev/react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from "../components/Header";
import LoadingView from '../components/LoadingView';
import LoginView from "../components/LoginView";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  if (isLoading) return <LoadingView/>
  if (!address) return <LoginView/>

  return (
    <div className="bg-[#091b1b] min-h-screen flex flex-col">
      <Head>
        <title>Fujitora's Dice Den</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <div>
        <div>
          <h1 className='text-5xl text-white font-semibold text-center'>The Next Draw</h1>
        </div>
        <div>
          <div className='stats'>
            <h2 className='text-small'>Total Pool</h2>
            <p className='text-xl'>0.1 ETH</p>
          </div>
        </div>
      </div>

      {/*PRICE PER BOX */}
      <div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Home
