import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import Loading from './components/Loading.jsx';

const BlogEdit = lazy(() => import("./components/BlogEdit.jsx"));
const NewHome = lazy(() => import("./pages/NewHome.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const Cards = lazy(() => import("./components/Cards.jsx"));
const CreateBlog = lazy(() => import("./pages/CreateBlog.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const UpdateForm = lazy(() => import("./pages/UpdateForm.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));

function App() {  
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    import("./pages/Login.jsx");
    import("./pages/SignUp.jsx");
  }, []);

  return (
    <div>
      <Suspense 
        fallback={
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Loading />
          </div>
        }
      >
        <Routes>
          <Route element={<ProtectedRoutes user={user}/>}>
            <Route path='/' element={<NewHome />} />
            <Route path='/create' element={<CreateBlog />} />
            <Route path='/blogs/:_id' element={<Cards />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update' element={<UpdateForm />} />
            <Route path='/about' element={<AboutUs />} />
          </Route>

          <Route 
            path="/login" 
            element={<ProtectedRoutes user={!user} redirect="/"><Login /></ProtectedRoutes>} 
          />
          <Route 
            path="/signup" 
            element={<ProtectedRoutes user={!user} redirect="/"><SignUp /></ProtectedRoutes>} 
          />
          <Route path="/editblog/:_id" element={<BlogEdit />} />
        </Routes>
      </Suspense>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
