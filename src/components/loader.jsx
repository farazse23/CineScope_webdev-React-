import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <ImSpinner2 className="text-4xl animate-spin text-indigo-600 dark:text-indigo-400" />
    </div>
  );
};

export default Loader;
