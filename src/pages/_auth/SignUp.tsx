import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Errors {
  email: string;
  password: string;
  name: string;
}

function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>();

  return (
    <form className="w-full max-w-[400px] px-6 text-light-200 md:px-0">
      <div className="mt-[4.25rem] text-center">
        <h1 className="heading-md text-light-100">Create a new account</h1>
        <p className="mt-3 text-light-300">
          To use snapgram, Please enter your details.
        </p>
      </div>
      <div className="form-control relative mt-8">
        <label htmlFor="name ">Name</label>
        <div className="relative">
          <Input type="text" name="name" id="name" />
          {errors.name && (
            <small className="absolute right-4 top-1/2 -translate-y-[50%] text-red">
              {errors.name}
            </small>
          )}
        </div>
      </div>
      <div className="form-control mt-8">
        <label htmlFor="email">Email</label>
        <div className="relative">
          <Input type="email" name="email" id="email" value={formData.email} />
          {errors.email && (
            <small className="absolute right-4 top-1/2 -translate-y-[50%] text-red">
              {errors.email}
            </small>
          )}
        </div>
      </div>
      <div className="form-control mt-5">
        <label htmlFor="password">Password</label>
        <div className="relative">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
            />
            {errors.password && (
              <small className="absolute right-4 top-1/2 -translate-y-[50%] text-red">
                {errors.password}
              </small>
            )}
          </div>
          {!errors.password && (
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-[50%] cursor-pointer"
            >
              {!showPassword ? <FaEye className="" /> : <FaEyeSlash />}
            </div>
          )}
        </div>
      </div>
      <div className="mt-[2.625rem]">
        <Button variant="auth" size="md">
          {isLoading ? <>Processing...</> : "Sign up"}
        </Button>
      </div>
      <div className="mt-5"></div>
      <p className="mt-8 text-center text-sm text-light-200">
        Don't you have an account?{" "}
        <Link to="/log-in" className="ml-1 text-primary">
          Log in
        </Link>
      </p>
    </form>
  );
}

export default SignUp;
