import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IErrors } from "@/types";
import OAuth from "@/components/shared/_auth/OAuth";
import { useCreateUserAccount } from "@/lib/react-query/mutations";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<IErrors>({
    email: "",
    password: "",
    name: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, status: isCreatingAccount } =
    useCreateUserAccount();

  function validateForm() {
    let isValid = true;
    const newErrors: IErrors = { email: "", password: "", name: "" };

    const { email, name, password } = formData;

    if (!email) {
      isValid = false;
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      isValid = false;
      newErrors.email = "Invalid email format";
    }

    if (!name) {
      isValid = false;
      newErrors.name = "Plase enter your name.";
    } else if (name.length < 3 || name.length > 20) {
      isValid = false;
      newErrors.name = "Name must be between 3 and 20 characters";
    }

    if (!password) {
      isValid = false;
      newErrors.password = "Please enter a password.";
    } else if (password.length < 8 || password.length > 20) {
      isValid = false;
      newErrors.password = "Password must be between 8 and 20 characters";
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (errors[e.target.id as keyof IErrors]) {
      if (
        (e.target.id === "name" && e.target.value.length < 3) ||
        e.target.value.length > 20
      ) {
        setErrors({
          ...errors,
          [errors.name]: "Name must be between 3 and 20 characters",
        });
        return;
      }

      setErrors({
        ...errors,
        [e.target.id]: "",
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }

      const newUser = await createUserAccount({
        email: formData.email,
        password: formData.password,
      });

      if (!newUser) {
        throw Error;
      }

      navigate("/");
    } catch (error: any) {
      let errorMessage = "There was a problem creating your account.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This Email is already in use. Try another.";
      }
      toast({
        title: "Uh oh! Something went wrong.",
        variant: "destructive",
        description: errorMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[400px] px-6 text-light-200 md:px-0"
    >
      <div className="mt-[4.25rem] text-center">
        <h1 className="heading-md text-light-100">Create a new account</h1>
        <p className="mt-3 text-light-300">
          To use snapgram, Please enter your details.
        </p>
      </div>
      <div className="form-control relative mt-8">
        <label htmlFor="name ">Name</label>
        <div className="relative">
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            hasError={errors.name}
          />
        </div>
        {errors.name && (
          <div className="mt-2 flex items-center gap-2">
            <img src="/assets/icons/error.svg" alt="" />
            <small className="text-red">{errors.name}</small>
          </div>
        )}
      </div>
      <div className="form-control mt-5">
        <label htmlFor="email">Email</label>
        <div className="relative">
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            hasError={errors.email}
          />
          {errors.email && (
            <div className="mt-2 flex items-center gap-2">
              <img src="assets/icons/error.svg" alt="" />
              <small className="text-red">{errors.email}</small>
            </div>
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
              onChange={handleChange}
              hasError={errors.password}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-[50%] cursor-pointer"
            >
              {!showPassword ? <FaEye className="" /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.password && (
            <div className="mt-2 flex items-center gap-2">
              <img src="assets/icons/error.svg" alt="" />
              <small className="text-red">{errors.password}</small>
            </div>
          )}
        </div>
      </div>
      <div className="mt-[1.875rem]">
        <Button variant="auth" size="md">
          {isCreatingAccount === "pending" ? <>Processing...</> : "Sign up"}
        </Button>
        <div className="mt-5">
          <OAuth />
        </div>
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
