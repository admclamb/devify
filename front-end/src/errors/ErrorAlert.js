const ErrorAlert = ({ error }) => {
  return (
    error && (
      <div className="alert alert-primary" role="alert">
        Error: {error.message}
      </div>
    )
  );
};
export default ErrorAlert;
