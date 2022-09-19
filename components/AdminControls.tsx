import React from 'react'
import {
    StarIcon,
    CurrencyDollarIcon,
    ArrowPathIcon,
    ArrowUturnDownIcon 
} from "@heroicons/react/24/solid"
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { currency } from '../constants';
import toast from 'react-hot-toast';

function AdminControls() {
    const { contract, isLoading } = useContract(
        process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
      );
      
      /* Extract to external read and write functions with name parameter */
      const { data: totalCommission } = useContractRead(
        contract, "operatorTotalCommission"
      );
      const { mutateAsync: DrawWinnerTicket } = useContractWrite(
        contract, "DrawWinnerTicket"
      );
      const { mutateAsync: RefundAll } = useContractWrite(
        contract, "RefundAll"
      );
      const { mutateAsync: restartDraw } = useContractWrite(
        contract, "restartDraw"
      );
      const { mutateAsync: WithdrawCommission } = useContractWrite(
        contract, "WithdrawCommission"
      );

      /* Extract toast notifications to external read and write functions with name parameter */
      const onDrawWinner = async () => {
        const notification = toast.loading("Some lucky dice are thrown...")
        
        try {
          const data = await DrawWinnerTicket([{}])
          
          toast.success("A winner has been chosen!", {
            id: notification,
          });
          console.info("contract call success", data);
        } catch (err) {
          toast.error("Something went wrong!", {
            id: notification,
          });

          console.error("contract call failure", err);
        }
      };

      const onWithdrawCommission = async () => {
        const notification = toast.loading("Withdrawing commissions...")
        
        try {
          const data = await WithdrawCommission([{}])
          
          toast.success("Your Commission has been withdrawn successfully!", {
            id: notification,
          });
          console.info("contract call success", data);
        } catch (err) {
          toast.error("Something went wrong!", {
            id: notification,
          });

          console.error("contract call failure", err);
        }
      };
      const onRestartDraw = async () => {
        const notification = toast.loading("Restarting draw...")
        
        try {
          const data = await restartDraw([{}])
          
          toast.success("Draw restared successfully!", {
            id: notification,
          });
          console.info("contract call success", data);
        } catch (err) {
          toast.error("Something went wrong!", {
            id: notification,
          });

          console.error("contract call failure", err);
        }
      };
      const onRefundAll = async () => {
        const notification = toast.loading("Refunding all...")
        
        try {
          const data = await RefundAll([{}])
          
          toast.success("All refunded successfully!", {
            id: notification,
          });
          console.info("contract call success", data);
        } catch (err) {
          toast.error("Something went wrong!", {
            id: notification,
          });

          console.error("contract call failure", err);
        }
      };
      
  return (
    <div className='text-white text-center px-5 py-3 rounded-md
    border-[#34364b] border bg-[#040711]'>
        <h2 className='font-bold'>Admin Controls</h2>
        <p className='m-5'>Total Commision to be withdrawn:{" "}
            {totalCommission &&
              ethers.utils.formatEther(
                totalCommission?.toString())
            } {" "}
            {currency}
        </p>

        <div className='flex flex-col space-y-2 md:flex-row
            md:space-y-0 md:space-x-2'>
            <button onClick={onDrawWinner} className='admin-button'>
                <StarIcon className='h-6 mx-auto mb-2'/>
                Draw Winner
            </button>
            <button onClick={onWithdrawCommission} className='admin-button'>
                <CurrencyDollarIcon className='h-6 mx-auto mb-2'/>
                Withdraw Commision
            </button>
            <button onClick={onRestartDraw} className='admin-button'>
                <ArrowPathIcon className='h-6 mx-auto mb-2'/>
                Restart Draw
            </button>
            <button onClick={onRefundAll} className='admin-button'>
                <ArrowUturnDownIcon className='h-6 mx-auto mb-2'/>
                Refund All
            </button>
        </div>
    </div>
  )
}

export default AdminControls