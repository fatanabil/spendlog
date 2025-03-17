import { useForm } from "react-hook-form";
import Button from "../components/Button";
import ErrorTextForm from "../components/ErrorTextForm";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../utils/api";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import FormResponseMessage from "../components/FormResponseMessage";

const RegisterPage = () => {
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    type: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(RegisterSchema) });

  const registerUser = async (values: RegisterSchema) => {
    try {
      const res = await api.post("/register", { ...values });

      const { message } = res.data;

      setResponseMessage({ message, type: "success" });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Register failed: ", error);
        setResponseMessage({
          message: error.response?.data.message,
          type: "error",
        });
      }
    }
  };

  return (
    <main className="bg-tradewind-50 dark:bg-woodsmoke-950 flex min-h-screen w-full items-center justify-center">
      <div className="dark:bg-woodsmoke-900 dark:border-woodsmoke-500 mx-auto flex w-full max-w-md flex-col rounded-md bg-white p-6 shadow-md shadow-slate-200 dark:border-1 dark:shadow-none">
        <h1 className="text-chathams-blue text-center text-3xl font-semibold dark:text-white">
          Register
        </h1>
        <hr className="bg-tradewind my-6 h-0.5 rounded-full border-none" />
        {responseMessage.message && (
          <FormResponseMessage {...responseMessage} />
        )}
        <form
          method="POST"
          onSubmit={handleSubmit(registerUser)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-chathams-blue text-lg dark:text-white"
            >
              Nama
            </label>
            <Input
              id="name"
              type="text"
              errors={errors.name}
              {...register("name")}
            />
            {errors.name && (
              <ErrorTextForm>{errors.name.message}</ErrorTextForm>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-chathams-blue text-lg dark:text-white"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              errors={errors.email}
              {...register("email")}
            />
            {errors.email && (
              <ErrorTextForm>{errors.email.message}</ErrorTextForm>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-chathams-blue text-lg dark:text-white"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              errors={errors.password}
              {...register("password")}
            />
            {errors.password && (
              <ErrorTextForm>{errors.password.message}</ErrorTextForm>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader color="white" /> : <span>Login</span>}
          </Button>
        </form>
        <Link
          to="/login"
          className="text-woodsmoke-300 dark:text-woodsmoke-500 hover:text-woodsmoke-400 mt-6 text-center text-sm"
        >
          Sudah memiliki akun? Login disini
        </Link>
      </div>
    </main>
  );
};

export default RegisterPage;
