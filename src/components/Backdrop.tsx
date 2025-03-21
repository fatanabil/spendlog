import cn from "../utils/cn";

const Backdrop = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={cn(
        "bg-woodsmoke-900/30 fixed top-0 left-0 z-40 min-h-screen w-full transition-opacity duration-300",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    ></div>
  );
};

export default Backdrop;
