import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { LoginSchema } from "../schemas/LoginSchema";
import { useAuthStore } from "../store/authStore";
import { api } from "../utils/api";
import ErrorTextForm from "../components/ErrorTextForm";

const LoginPage = () => {
  const { setAccessToken, setUser, loading, setLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginSchema>({ resolver: zodResolver(LoginSchema) });

  const navigate = useNavigate();

  const loginUser = async (data: LoginSchema) => {
    setLoading(true);
    try {
      const res = await api.post("/login", { ...data });

      setAccessToken(res.data.data.accessToken);
      setUser(res.data.data.user);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Login failed: ", error);
        setError("email", { message: error.response?.data.message });
        setError("password", { message: error.response?.data.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-ocean-green-50 dark:bg-woodsmoke-950 flex min-h-screen w-full items-center justify-center">
      <div className="dark:bg-woodsmoke-900 dark:border-woodsmoke-500 mx-auto flex w-full max-w-md flex-col rounded-md bg-white p-6 shadow-md shadow-slate-200 dark:border-1 dark:shadow-none">
        <h1 className="text-dark-cerulean text-center text-3xl font-semibold dark:text-white">
          Login
        </h1>
        <hr className="bg-ocean-green my-6 h-0.5 rounded-full border-none" />
        <form
          method="POST"
          onSubmit={handleSubmit(loginUser)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-dark-cerulean text-lg dark:text-white"
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
              className="text-dark-cerulean text-lg dark:text-white"
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
          <Button type="submit" disabled={loading}>
            {isSubmitting ? <Loader color="white" /> : <span>Login</span>}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
