import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Post from "./post/Post";

const PageRoutes = () => {
  return (
    <Routes>
      <Route exact={true} path="/" element={<Home />} />
      <Route exact={true} path="/post/:post_id" element={<Post />} />
    </Routes>
  );
};
export default PageRoutes;
