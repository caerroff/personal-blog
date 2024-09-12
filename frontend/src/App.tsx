import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/home/Home";
import Posts from "./pages/post/Posts";
import Account from "./pages/account/Account";
import NoPage from "./pages/error/NoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <SideBar />
        <div id="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
