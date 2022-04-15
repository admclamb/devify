import "./FeedLoading.css";

const FeedLoading = () => {
  return (
    <div className="feed-loading">
      <div className="header d-flex align-items-center mb-5">
        <div className="feed-loading-pfp"> </div>
        <div className="d-flex flex-column w-100 ms-4">
          <span className="feed-loading-bar" style={{ width: "20%" }}>
            {" "}
          </span>
          <span className="feed-loading-bar" style={{ width: "30%" }}>
            {" "}
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <span className="feed-loading-bar" style={{ width: "90%" }}>
          {" "}
        </span>
        <span className="feed-loading-bar" style={{ width: "100%" }}>
          {" "}
        </span>
        <span className="feed-loading-bar" style={{ width: "70%" }}>
          {" "}
        </span>
      </div>
    </div>
  );
};

export default FeedLoading;
