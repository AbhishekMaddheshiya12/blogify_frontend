import axios from 'axios';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import Cards from './components/Cards.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
// import CreateBlog from './pages/CreateBlog.jsx';
// import NewHome from './pages/NewHome.jsx';
// import Profile from './pages/Profile.jsx';
// import SignUp from './pages/SignUp.jsx';
// import UpdateForm from './pages/UpdateForm.jsx';
import { Login } from './pages/Login.jsx';
import { userExists, userNotExists } from './redux/reducers/auth';
import BlogEdit from './components/BlogEdit.jsx';
import Loading from './components/Loading.jsx';
// import AboutUs from './pages/AboutUs.jsx';
const NewHome = lazy(() => import("./pages/NewHome.jsx"))
const Cards = lazy(() => import("./components/Cards.jsx"))
const CreateBlog = lazy(() => import("./pages/CreateBlog.jsx"))
const Profile = lazy(() => import("./pages/Profile.jsx"))
const UpdateForm = lazy(() => import("./pages/UpdateForm.jsx"))
const SignUp = lazy(() => import("./pages/SignUp.jsx"))
const AboutUs = lazy(()=> import("./pages/AboutUs.jsx"))


function App() {  
  // const {user} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.auth);
  return (
    <div>
      <div>
        <Suspense fallback={<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
          <Loading></Loading>
        </div>}>
        <Routes>
            <Route element={<ProtectedRoutes user={user}/>}>
              <Route path='/' element={<NewHome></NewHome>}></Route>
              <Route path='/create' element={<CreateBlog></CreateBlog>}></Route>
              <Route path='/blogs/:_id' element={<Cards></Cards>}></Route>
              <Route path='/profile' element={<Profile></Profile>}></Route>
              <Route path='/update' element={<UpdateForm></UpdateForm>}></Route>
              <Route path='/about' element={<AboutUs></AboutUs>}></Route>
            </Route>
            <Route path="/login" element={<ProtectedRoutes user={!user} redirect="/"><Login/></ProtectedRoutes>}></Route>
            <Route path="/signup" element={<ProtectedRoutes user={!user} redirect="/"><SignUp/></ProtectedRoutes>}></Route>
            <Route path="/editblog/:_id" element={<BlogEdit/>}></Route>
        </Routes>
        </Suspense>
      </div>
      <Toaster position ="top-right"></Toaster>
    </div>
  );
}

export default App;
