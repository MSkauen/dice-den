import { CircleLoader } from "react-spinners";

const LoadingView = () => {

  return (
    <div className="bg-[#040711] h-screen flex flex-col
    items-center justify-center text-center">
      <div className="flex items-center space-x-2 mb-10">
        <h1 className="text-lg text-white font-bold">Loading Fujitora's Dice Den</h1>        

      </div>
        <CircleLoader className="white" size={50} color="#7e42b1" />
    </div>
  );
};

export default LoadingView;