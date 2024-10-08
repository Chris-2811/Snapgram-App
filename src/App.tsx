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
  VerifyEmail,
} from "./pages";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/shared/ProtectedRoute";

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
    { path: "/saved", element: <SavedPosts /> },
  ];

  return (
    <QueryProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route element={<ProtectedRoute />}>
                {protectedRoutes.map((item, index) => (
                  <Route key={index} path={item.path} element={item.element} />
                ))}
              </Route>
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </AuthContextProvider>
    </QueryProvider>
  );
}

export default App;
