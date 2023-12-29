import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import SearchParams from "./components/SearchParams/SearchParams";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/slice/post";
import { fetchAuthMe } from "./redux/slice/auth";
import { useEffect } from "react";
import FullPost from "./components/FullPost/FullPost";
import CommentBlockk from "./components/CommentBlock/CommentBlock";
import Footer from "./components/Footer/Footer";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const searchParams = new URLSearchParams(navigate.search);
    // const params = Object.fromEntries(searchParams.entries());

    // dispatch(fetchPosts(params));
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <SearchParams />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/:id/comments" element={<CommentBlockk />} />

        <Route path="/category/:category" element={<Home />} />
        <Route path="/category/:category/:subCategory" element={<Home />} />
        <Route
          path="/category/:category/:subCategory/:subCategory"
          element={<Home />}
        />

        {/* <Route path="/category/*" element={<Home />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
