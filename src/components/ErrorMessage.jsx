const ErrorMessage = ({ message = "Something went wrong!" }) => {
  return (
    <div className="text-center text-red-500 mt-10 text-lg">
      {message}
    </div>
  );
};

export default ErrorMessage;
