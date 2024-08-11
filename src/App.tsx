import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Chats,
  CreatePost,
  EditPost,
  AllUsers,
  Profile,
  Explore,
  Notifications,
  EditProfile,
  Stories,
  Reels,
  SavedPosts,
  LogIn,
  SignUp,
} from "./pages";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const protectedRoutes = [
    { path: "/", element: <Home /> },
    { path: "/chats", element: <Chats /> },
    { path: "/create-post", element: <CreatePost /> },
    { path: "/edit-post/:id", element: <EditPost /> },
    { path: "/all-users", element: <AllUsers /> },
    { path: "/profile/:id", element: <Profile /> },
    { path: "/explore", element: <Explore /> },
    { path: "/notifications", element: <Notifications /> },
    { path: "/edit-profile/:id", element: <EditProfile /> },
    { path: "/stories", element: <Stories /> },
    { path: "/reels", element: <Reels /> },
    { path: "/saved-posts", element: <SavedPosts /> },
  ];

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            {protectedRoutes.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
