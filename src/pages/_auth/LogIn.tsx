import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ILoginErrors } from "@/types";
import OAuth from "@/components/shared/_auth/OAuth";
import { useLogInAccount } from "@/lib/react-query/mutations";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ILoginErrors>({
    email: "",
    password: "",
  });
  const { mutateAsync: logInAccount, status } = useLogInAccount();
  const navigate = useNavigate();

  function validateForm() {
    let isValid = true;
    const newErrors: ILoginErrors = { email: "", password: "" };

    const { email, password } = formData;

    if (!email) {
      isValid = false;
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      isValid = false;
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      isValid = false;
      newErrors.password = "Please enter your password.";
    }

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userCredential = await logInAccount({
          email: formData.email,
          password: formData.password,
        });

        if (userCredential) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (errors[e.target.id as keyof ILoginErrors]) {
      setErrors({
        ...errors,
        [e.target.id]: "",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[400px] px-6 text-light-200 md:px-0"
    >
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
          hasError={errors.email}
        />
        {errors.email && (
          <div className="mt-2 flex items-center gap-2">
            <img src="/assets/icons/error.svg" alt="" />
            <small className="text-red">{errors.email}</small>
          </div>
        )}
      </div>
      <div className="form-control mt-5">
        <label htmlFor="name">Password</label>
        <div className="relative">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="name"
              onChange={handleChange}
              value={formData.password}
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
              <img src="/assets/icons/error.svg" alt="" />
              <small className="text-red">{errors.password}</small>
            </div>
          )}
        </div>
      </div>
      <div className="mt-[1.875rem]">
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
