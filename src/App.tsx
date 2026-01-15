import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateBlog from './pages/CreateBlog';
import UpdateBlog from './pages/UpdateBlog';
import DeleteBlog from './pages/DeleteBlog';
import LandingPage from './pages/LandingPage';
import CommunityBlogs from './pages/CommunityBlogs';
import MyBlogs from './pages/MyBlogs';
import PrivateRoute from './components/PrivateRoute';  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/** PUBLIC */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />

        {/** PROTECTED*/}
        <Route element={<PrivateRoute element={<AppLayout />} />}>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />
          <Route path="/delete-blog/:id" element={<DeleteBlog />} />
          <Route path="/community-blog" element={<CommunityBlogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
