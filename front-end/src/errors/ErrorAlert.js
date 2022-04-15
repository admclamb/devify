const ErrorAlert = ({ error }) => {
  return (
    Object.hasOwnProperty("message") && (
      <div className="alert alert-primary" role="alert">
        {error.message}
      </div>
    )
  );
};
export default ErrorAlert;
