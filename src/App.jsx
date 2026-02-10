import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import { userExists, userNotExists } from './redux/reducers/auth';

import NewHome from './pages/NewHome.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import Loading from './components/Loading.jsx';

const Cards = lazy(() => import("./components/Cards.jsx"));
const CreateBlog = lazy(() => import("./pages/CreateBlog.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const UpdateForm = lazy(() => import("./pages/UpdateForm.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));
const BlogEdit = lazy(() => import("./components/BlogEdit.jsx"));

const CenteredLoader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
    <Loading />
  </div>
);

function App() {  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get(
          "https://blogify-backend-1-porw.onrender.com/user/me", 
          { withCredentials: true }
        );
        dispatch(userExists(data.user));
      } catch (error) {
        dispatch(userNotExists());
      } finally {
        setIsAuthenticating(false);
      }
    };

    verifyUser();
  }, [dispatch]);

  if (isAuthenticating) return <CenteredLoader />;

  return (
    <div className="app-container">
      <Suspense fallback={<CenteredLoader />}>
        <Routes>
          <Route element={<ProtectedRoutes user={user} />}>
            <Route path='/' element={<NewHome />} />
            <Route path='/create' element={<CreateBlog />} />
            <Route path='/blogs/:_id' element={<Cards />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update' element={<UpdateForm />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path="/editblog/:_id" element={<BlogEdit />} />
          </Route>

          <Route 
            path="/login" 
            element={
              <ProtectedRoutes user={!user} redirect="/">
                <Login />
              </ProtectedRoutes>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoutes user={!user} redirect="/">
                <SignUp />
              </ProtectedRoutes>
            } 
          />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>

      <Toaster 
        position="top-right" 
        toastOptions={{ duration: 3000, style: { borderRadius: '8px' } }} 
      />
    </div>
  );
}

export default App;