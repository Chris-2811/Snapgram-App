import { sidebarLinks } from "@/constants/index";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function LeftSidebar() {
  const { pathname } = useLocation();

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
    <div className="sticky top-0 hidden h-screen max-h-[1024px] max-w-[270px] border border-red bg-dark-200 px-6 pb-8 pt-12 text-light-100 lg:flex lg:min-w-[270px] lg:flex-col lg:justify-between">
      <div>
        <img
          src={"/assets/images/logo.svg"}
          alt="company logo"
          className="w-[174px]"
        />
        <div className="my-11 flex items-center gap-3">
          <Avatar className="">
            <AvatarImage src="/assets/images/avatar.jpg" alt="avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-bold tracking-[-1px] text-light-200">
              John Doe
            </p>
            <p className="text-sm text-light-300"> @JohnDoe </p>
          </div>
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
                      <p>{link.label}</p>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="xxl:mt-[8.75rem]">
        <div
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-4 p-4"
        >
          <img src="/assets/icons/logout.svg" alt="" />
          <p>Logout</p>
        </div>
        <div className="flex cursor-pointer items-center gap-4 p-4">
          <img src="/assets/icons/settings.svg" alt="" className="w-6" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
