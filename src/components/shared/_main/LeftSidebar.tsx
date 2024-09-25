import { sidebarLinks } from "@/constants/index";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import Loader from "@/components/shared/Loader";

function LeftSidebar() {
  const { pathname } = useLocation();
  const { user, isLoading } = useContext(AuthContext);

  console.log(user);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  async function handleLogout() {
    try {
      // Log out the user
      await signOut(auth);
      setIsAuthenticated(false);
      // Redirect to the login page
      navigate("/log-in");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div className="sticky top-0 hidden h-screen max-h-[1024px] max-w-[270px] border border-red bg-dark-200 pb-8 text-light-100 md:flex md:flex-col md:justify-between md:px-4 md:pt-9 lg:min-w-[270px] lg:px-6 lg:pt-12">
      <div>
        <img
          src={"/assets/images/logo.svg"}
          alt="company logo"
          className="w-[174px] md:hidden lg:block"
        />
        <img
          src="assets/icons/union.svg"
          alt="company logo small"
          className="mx-auto lg:hidden"
        />
        <div className="my-11 flex items-center gap-3 md:justify-center lg:justify-start">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Link to={`/profile/${user.userId}`}>
                <Avatar className="">
                  {user?.photoUrl ? (
                    <>
                      <AvatarImage src={user?.photoUrl} alt="avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </>
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gray-200 text-lg text-black">
                      {user?.name && getInitials(user?.name)}
                    </div>
                  )}
                </Avatar>
              </Link>
              <div className="hidden lg:block">
                <Link to={`/profile/${user.userId}`}>
                  <p className="text-lg font-bold tracking-[-1px] text-light-200">
                    {user?.name}
                  </p>
                </Link>
                <p className="text-sm text-light-300">
                  {" "}
                  {!user?.username ? `@${user?.name}` : `@${user?.username}`}
                </p>
              </div>
            </>
          )}
        </div>
        <nav aria-label="primary-navigation">
          <ul role="list" className="gap-h1000 flex flex-col lg:gap-4">
            {sidebarLinks.map((link, index) => {
              const isActive = pathname === link.route;
              return (
                <li
                  key={index}
                  className={`${
                    isActive && "bg-primary"
                  } relative rounded-lg p-4`}
                >
                  <NavLink to={link.route}>
                    <div className="flex items-center gap-4">
                      <img
                        src={link.imgURL}
                        alt=""
                        className={`${isActive && "invert-white"}`}
                      />
                      <p className="hidden lg:block">{link.label}</p>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="">
        <div
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-4 p-4"
        >
          <img src="/assets/icons/logout.svg" alt="" />
          <p className="hidden lg:block">Logout</p>
        </div>
        <div className="flex cursor-pointer items-center gap-4 p-4">
          <img src="/assets/icons/settings.svg" alt="" className="w-6" />
          <p className="hidden lg:block">Settings</p>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
