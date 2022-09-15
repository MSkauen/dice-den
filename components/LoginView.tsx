import { useMetamask } from "@thirdweb-dev/react";

const LoginView = () => {
  const connectWithMetamask = useMetamask();
  
  return (
    <div className="bg-[#040711] min-h-screen flex flex-col
    items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        {/*<img
            className="rounded-full h-56 w-56 mb-10"
            src="/profile-image.png"
  alt="" />*/}

        <h1 className="text-6xl text-white font-bold">Fujitora's Dice Den</h1>
        <h2 className="text-white py-4">Get Started by connecting your Metamask</h2>
        
        <button className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold" onClick={connectWithMetamask}>Sign in with MetaMask</button>
      </div>
    </div>
  );
};

export default LoginView;