import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { PiSpinnerThin } from "react-icons/pi";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Spin } from "antd";
import { AuthContext } from "../../context/auth/AuthContext";

interface LoginProps {
  businessname: string;
  password: string;
}

const schema = yup.object({
  businessname: yup.string().required("Business name is required"),
  password: yup.string().required("Password is required"),
});

const QUERY_LOGIN_USER = gql`
  mutation LoginUserIn($businessname: String!, $password: String!) {
    signIn(businessname: $businessname, password: $password) {
      success
      message
      token
    }
  }
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authState = React.useContext(AuthContext);
  // React hook form values
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [loginUser] = useMutation(QUERY_LOGIN_USER);

  const handleLogin = async (data: LoginProps) => {
    setLoading(true);
    try {
      const response = await loginUser({
        variables: {
          businessname: data.businessname,
          password: data.password,
        },
      });
      if (response.data.signIn.success) {
        const token = response.data.signIn.token;
        // Save the token to localStorage
        localStorage.setItem("token", token);
        setLoading(false);
        authState?.setToken(token);
        navigate("/");
      } else {
        if (response.data.signIn.message) {
          toast.error(response.data.signIn.message);
          setLoading(false);
        } else {
          toast.error("Could process request, please try again later");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-5 max-h-screen h-svh block md:flex">
        <div className="bg-black hidden md:basis-1/2 md:h-full md:rounded-md p-14 md:flex md:flex-col md:justify-center md:gap-y-8 md:relative">
          <div className="absolute top-14 left-14">
            <div className="inline-flex">
              <h1
                className={`text-primary font-medium text-base origin-left duration-300  `}
              >
                CC FUSION
              </h1>
            </div>
          </div>
          <div className="text-white -mt-20">
            <h2 className="font-semibold text-5xl mb-8 font-serif">
              Elevate Your Business Management Effortlessly with Our
              Comprehensive Management Platform
            </h2>
            <p className="text-[#E4DBDB] text-smm font-normal italic">
              Effortlessly Manage Clients, Boost Sales, and Streamline Billing –
              All in One Place!
            </p>
          </div>
        </div>
        <div className="w-full md:basis-1/2 h-full flex flex-col md-[500px]:flex-row items-center justify-center relative md:pl-5 min-[900px]:pl-0">
          <div className="md:hidden mb-12 flex justify-start w-full min-[500px]:w-[70%] md:w-full"></div>
          <div className="h-auto w-full min-[500px]:w-[70%] md:w-full min-[900px]:w-[60%]">
            <div>
              <h1 className="font-semibold text-4xl mb-12">Welcome back!</h1>
              <p className="text-gray font-medium text-sm ">
                <span className="opacity-30">Don&apos;t have an account?</span>
                <Link
                  className="text-primary font-medium inline-block ml-1"
                  to="/signup"
                >
                  Sign up
                </Link>
              </p>

              <form
                className="mt-16 flex flex-col gap-y-4"
                id="login"
                name="login"
                onSubmit={handleSubmit(handleLogin)}
              >
                <div className="mb-12">
                  <Input
                    {...register("businessname")}
                    label="Business name"
                    placeholder="Enter your business name"
                    hasError={!!errors.businessname}
                    errorText={errors.businessname?.message}
                    isRequired
                  />
                </div>
                <div className="mb-12">
                  <Input
                    {...register("password")}
                    label="Password"
                    placeholder="Enter your password"
                    hasError={!!errors.password}
                    errorText={errors.password?.message}
                    isRequired
                  />
                </div>
                <Button
                  aria-label="submit btn"
                  type="submit"
                  form="login"
                  disabled={loading}
                >
                  {loading ? (
                    <Spin
                      indicator={
                        <PiSpinnerThin className="animate-spin text-white" />
                      }
                    />
                  ) : (
                    "Log in"
                  )}
                </Button>
                <div className="text-center mt-6">
                  <p className="text-gray font-normal text-sm">
                    Forgot password?
                    <Link
                      className="text-primary font-medium inline-block ml-1 text-sm"
                      to="/auth/forgot-password"
                    >
                      Recover
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
