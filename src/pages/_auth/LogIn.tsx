import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OAuth from "@/components/shared/_auth/OAuth";

function LogIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <form className="w-full max-w-[400px] px-6 text-light-200 md:px-0">
      <img
        src="/assets/images/logo.svg"
        alt="company logo"
        className="mx-auto"
      />
      <div className="mt-[4.25rem] text-center">
        <h1 className="heading-md text-light-100">Log in to your account</h1>
        <p className="mt-3 text-light-300">
          Welcome back! Please enter your details.
        </p>
      </div>
      <div className="form-control mt-8">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div className="form-control mt-5">
        <label htmlFor="name">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="name"
            onChange={handleChange}
            value={formData.password}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-[50%] cursor-pointer"
          >
            {!showPassword ? <FaEye className="" /> : <FaEyeSlash />}
          </div>
        </div>
      </div>
      <div className="mt-[2.625rem]">
        <Button variant="auth" size="md">
          Log In
        </Button>
        <div className="mt-5">
          <OAuth />
        </div>
      </div>
      <div className="mt-5"></div>
      <p className="mt-8 text-center text-sm text-light-200">
        Don't you have an account?{" "}
        <Link to="/sign-up" className="ml-1 text-primary">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default LogIn;
