import { ConnectWallet, useMetamask } from "@thirdweb-dev/react";

const LoginView = () => {  
  return (
    <div className="bg-[#040711] min-h-screen flex flex-col
    items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img
            className="rounded-full h-56 w-56 mb-10 animate-pulse"
            src="/dice.png"
            alt="" />

        <h1 className="text-6xl text-white font-bold">Fujitora's Dice Den</h1>
        <h2 className="text-white py-4">Get started by connecting your wallet</h2>
        
        <ConnectWallet/>
      </div>
    </div>
  );
};

export default LoginView;