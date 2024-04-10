import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Spin } from "antd";
import { PiSpinnerThin } from "react-icons/pi";

interface SignUpProps {
  businessname: string;
  email: string;
  password: string;
  phonenumber: string;
}

const schema = yup.object({
  businessname: yup.string().required("Business name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  phonenumber: yup.string().required("Phone number is required"),
});

const SiginUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // React hook form values
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: yupResolver(schema),

    mode: "onChange",
  });

  const QUERY_CREATE_USER = gql`
    mutation CreateUser(
      $businessname: String!
      $email: String!
      $password: String!
      $phonenumber: String!
    ) {
      createUser(
        body: {
          businessname: $businessname
          email: $email
          password: $password
          phonenumber: $phonenumber
        }
      ) {
        success
        message
        token
      }
    }
  `;

  const [createUser] = useMutation(QUERY_CREATE_USER);

  const onSubmit = async (data: SignUpProps) => {
    setLoading(true);
    try {
      const response = await createUser({
        variables: {
          businessname: data?.businessname,
          email: data?.email,
          password: data?.password,
          phonenumber: data?.phonenumber,
        },
      });

      if (response.data.createUser.success) {
        const token = response.data.createUser.token;
        if (token) {
          // Save the token to localStorage
          localStorage.setItem("token", token);
          navigate("/");
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error(response.data.createUser.message);
      }
    } catch (error) {
      setLoading(false);
      return "An error occurred.";
    }
  };

  const isRequiredFieldEmpty = () => {
    const businessName = watch("businessname");
    const watchEmail = watch("email");
    const watchPassword = watch("password");
    const watchPhonenumber = watch("phonenumber");
    const requiredFieldIsEmpty =
      businessName === "" ||
      watchEmail === "" ||
      watchPassword === "" ||
      watchPhonenumber === "";
    return requiredFieldIsEmpty;
  };

  return (
    <div className="p-5 max-h-screen h-svh block md:flex">
      <div className="bg-black hidden md:basis-1/2 md:h-full  md:rounded-md p-14 md:flex md:flex-col md:justify-center md:gap-y-8 md:relative">
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
            Elevate Your Business Management Effortlessly with Our Comprehensive
            Management Platform
          </h2>
          <p className="text-[#E4DBDB] text-smm font-normal italic">
            Effortlessly Manage Clients, Boost Sales, and Streamline Billing –
            All in One Place!
          </p>
        </div>
      </div>
      <div className="w-full md:basis-1/2 h-full flex flex-col md-[500px]:flex-row items-center justify-center relative md:pl-5 min-[900px]:pl-0">
        <div className="md:hidden mb-8 flex justify-start w-full min-[500px]:w-[70%] md:w-full"></div>
        <div className="h-auto w-full min-[500px]:w-[70%] md:w-full min-[900px]:w-[60%]">
          <div>
            <h1 className="font-semibold text-4xl">Welcome!</h1>
            <form
              className="mt-16 flex flex-col gap-y-4"
              id="signup"
              name="signup"
              onSubmit={handleSubmit(onSubmit)}
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
                  {...register("email")}
                  label="Email Address"
                  placeholder="Enter your business email"
                  hasError={!!errors.email}
                  errorText={errors.email?.message}
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
              <div className="mb-12">
                <Input
                  {...register("phonenumber")}
                  label="Phone number"
                  placeholder="Enter your phone number"
                  hasError={!!errors.phonenumber}
                  errorText={errors.phonenumber?.message}
                  isRequired
                />
              </div>
              <Button
                aria-label="submit btn"
                type="submit"
                form="signup"
                disabled={loading || isRequiredFieldEmpty()}
              >
                {loading ? (
                  <Spin
                    indicator={
                      <PiSpinnerThin className="animate-spin text-white" />
                    }
                  />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiginUpPage;
