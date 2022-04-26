import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import CreatePost from './post/CreatePost';
import Post from './post/Post';
import Login from './login/Login';
const PageRoutes = ({ setSession }) => {
  return (
    <Routes>
      <Route exact={true} path="/" element={<Home />} />
      <Route exact={true} path="/post/:post_id" element={<Post />} />
      <Route exact={true} path="/:user_id/create" element={<CreatePost />} />
      <Route
        exact={true}
        path="/login"
        element={<Login setSession={setSession} />}
      />
    </Routes>
  );
};
export default PageRoutes;
