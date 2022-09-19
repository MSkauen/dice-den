import { 
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useContractRead,
  useContractWrite
} from '@thirdweb-dev/react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Header from "../components/Header";
import LoadingView from '../components/LoadingView';
import LoginView from "../components/LoginView";
import { ethers } from 'ethers';
import { currency } from '../constants';
import CountdownTimer from '../components/CountdownTimer';
import toast from "react-hot-toast"
import Marquee from 'react-fast-marquee';
import AdminControls from '../components/AdminControls';
const Home: NextPage = () => {
  const address = useAddress();
  const [userTickets, setUserTickets] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);

  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: remainingTickets } = useContractRead(
    contract, "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractRead(
    contract, "CurrentWinningReward"
  );
  const { data: ticketCommission } = useContractRead(
    contract, "ticketCommission"
  );
  const { data: ticketPrice } = useContractRead(
    contract, "ticketPrice"
  );
  const { data: expiration } = useContractRead(
    contract, "expiration"
  );
  const { mutateAsync: BuyTickets } = useContractWrite(
    contract, "BuyTickets"
  );
  const { data: tickets } = useContractRead(
    contract, "getTickets"
  );
  const { data: winnings } = useContractRead(
    contract, "getWinningsForAddress", address
  );
  const { mutateAsync: withdrawWinnings } = useContractWrite(
    contract, "WithdrawWinnings"
  );
  const { data: lastWinner } = useContractRead(
    contract, "lastWinner"
  );
  const { data: lastWinnerAmount } = useContractRead(
    contract, "lastWinnerAmount"
  );
  const { data: isLotteryOperator } = useContractRead(
    contract, "lotteryOperator"
  );

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
       0
      );

    setUserTickets(noOfUserTickets)
  }, [tickets, address]);

  const handleClick = async () => {
    if (!ticketPrice) return;
    const notification = toast.loading("Buying tickets..")
    
    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
          (
            Number(ethers.utils.formatEther(ticketPrice)) * quantity
          ).toString()
        ),
      },
    ]);

      toast.success("Tickets purchased successfully!", {
        id: notification,
      });

      console.info("contract call success", data);
    } catch (err) {
      toast.error("Something went wrong!", {
        id: notification,
      });

      console.error("contract call failure, err");
    }
  }

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing your coins...")
    try {
      await withdrawWinnings([{}])
      
      toast.success("Winnings withdrawn successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Something went wrong!", {
        id: notification,
      });
    }
  };

  if (isLoading) return <LoadingView/> /*bg-[#040711]*/
  if (!address) return <LoginView/>

  return (
    <div className="bg-[#040711]
     min-h-screen flex flex-col opacity-100">
      <Head>
        <title>Fujitora's Dice Den</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex-1'>
        <Header/>
        <Marquee className='bg-[#191a25] p-5' gradient={false} speed={75}>
          <div className='flex space-x-2 mx-10'>
            <h4 className='text-white font-bold'>Last winner: 
            </h4>
              <p className='text-violet-600'>
                {lastWinner?.toString()}
              </p>
            <h4 className='text-white font-bold'>Previous winnings: {" "}
            </h4>
              <p className='text-emerald-600'>
              {lastWinnerAmount &&
                ethers.utils.formatEther(
                  lastWinnerAmount?.toString())
                } {" "}
                {currency}
              </p>
          </div>
        </Marquee>
        <div className="fadeTop mb-5"></div>
        {isLotteryOperator === address && (
          <div className=' flex justify-center'>
            <AdminControls/>
          </div>
        )}
        {winnings > 0 && (
          <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
            <button onClick={onWithdrawWinnings} className='p-5 bg-gradient-to-br
                from-yellow-700 to-yellow-500 animate-pulse text-center rounded-xl w-full'>
              <p className='font-bold text-white'>You got lucky...</p>
              <p className='text-white'>Total winnings: {ethers.utils.formatEther(
                winnings.toString())} {" "}
                {currency}
              </p>
              <br />
              <p className='font-semibold text-white'>Click here to withdraw</p>
            </button>
          </div>
        ) }

        <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row
        items-start justify-center md:space-x-5 flex-1'>
          <div className='stats-container'>
            <h1 className='text-5xl text-white font-semibold text-center'>The Next Draw</h1>
            <div className='flex justify-between p-2 space-x-2'>
              <div className='stats'>
                <h2 className='text-sm'>Total Pool</h2>
                <p className='text-xl'>
                  {currentWinningReward && 
                    ethers.utils.formatEther(
                    currentWinningReward.toString())
                  } {" "}
                  {currency}
                </p>
              </div>
                <div className="stats">
                  <h2 className='text-sm'>Tickets Remaining</h2>
                  <p className='text-xl'>{remainingTickets?.toNumber()}</p>
                </div>
              </div>
              
              <div className=' mt-5 mb-3'>
                  <CountdownTimer/>
              </div>
          </div>

          <div className="stats-container space-y-2">
            <div className='stats-container'>
              <div className='flex justify-between items-center text-white pb-2'>
                <h2>Price per ticket </h2>
                <p>
                  {ticketPrice && 
                    ethers.utils.formatEther(
                      ticketPrice.toString())
                  } {" "}
                  {currency}
                </p>
              </div>

              <div className='flex text-white items-center space-x-2
              bg-[#040711] border-[#34364b] border-2 p-4 rounded-md'>
                <p>TICKETS</p>
                <input
                  className='flex w-full bg-transparent text-right
                  outline-none'
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className='space-y-2 mt-5'>
                <div className='flex items-center justify-between
                text-violet-300 text-sm font-extrabold'>
                  <p>Total cost of tickets</p>
                  <p>
                  {ticketPrice && 
                    Number(
                      ethers.utils.formatEther(ticketPrice.toString())
                    ) * quantity}{" "}
                    {currency}
                  </p>
                </div>

                <div className='flex items-center justify-between
                text-violet-300 text-xs italic'>
                  <p>Service fees</p>
                  <p>
                  {ticketCommission && 
                    ethers.utils.formatEther(
                      ticketCommission.toString())
                  } {" "}
                  {currency}
                </p>
                </div>

                <div className='flex items-center justify-between
                text-violet-300 text-xs italic'>
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>

              <button 
                disabled={
                  expiration?.toString() < Date.now().toString() ||
                  remainingTickets?.toNumber() === 0
                }
                onClick={handleClick}
                className='buy-button'>
                  Buy {quantity} tickets for {ticketPrice && 
                    Number(ethers.utils.formatEther(ticketPrice.toString()))
                     * quantity} {" "}
                    {currency}
              </button>
            </div>

            <div className='stats'>
              <p className='text-lg mb-2'>You have {userTickets ? userTickets : 0} Tickets in this draw</p>
              {userTickets > 0 && (

                <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2 pt-4'>
                  {Array(userTickets).fill("").map((_, index) => (
                        <img 
                          className='coin text-xs italic
                            text-violet-500 h-20 w-12' 
                          src="/coin.gif" 
                          alt=""
                        />
                  ))}
                </div>

              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fadeBottom"></div>
      <footer className='bg-[#191a25] border-t border-violet-500/20 flex items-center
      text-white justify-start p-5'>
        <img 
          className="rounded-full h-10 w-10 fiter hue-rotate-90 opacity-20" 
          src="/dice.png" 
          alt=""
        />
        <p className='text-xs text-violet-400/30 pl-5'>
          DISCLAIMER: We are not liable for any losses that are incurred
          or problems that arise at our online casinos or elsewhere by this apps content.
          If you are gambling, you are doing so completely and totally at your own risk.
        </p>
      </footer>
    </div>
  )
}

export default Home
