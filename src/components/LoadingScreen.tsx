import Loader from "./Loader";

const LoadingScreen = () => {
  return (
    <div className="bg-tradewind grid min-h-screen w-full place-content-center">
      <h1 className="animate-pulse text-5xl font-semibold text-white">
        SpendLog
      </h1>
      <Loader className="mx-auto mt-6 h-10 w-10 border-8" color="white" />
    </div>
  );
};

export default LoadingScreen;
