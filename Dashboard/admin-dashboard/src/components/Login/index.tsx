"use client";

import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "@/utils/validationSchemas";
import { useRouter } from "next-nprogress-bar";
import { LoginFormInputs, LoginProps } from "@/utils/typeDefinition/typeFile";
import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import Link from "next/link";

export default function LoginPage({ isRegister }: Readonly<LoginProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs): Promise<void> => {
    try {
      const result = await axiosInstance(false).post(
        isRegister ? "/api/register" : "/api/login",
        data
      );

      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: { path: string; msg: string } }>;
      const errorPath = err?.response?.data?.error;
      if (errorPath?.path == "password") {
        setError("password", { type: "manual", message: errorPath?.msg });
      } else if (errorPath?.path == "email") {
        setError("email", { type: "manual", message: errorPath?.msg });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <LockClosedIcon className="h-2 w-2 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegister
              ? "Create an account to get started"
              : "Sign in to your account to continue"}
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl ring-1 ring-gray-900/5">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            {isRegister && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="first_name"
                    type="text"
                    {...register("first_name")}
                    className={`block w-full rounded-xl border-0 py-3 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-all duration-200 ${
                      errors.first_name
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-gray-300 focus:ring-indigo-600"
                    }`}
                    placeholder="Enter your name"
                  />
                </div>
                {errors.first_name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
            )}
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="text"
                  {...register("email")}
                  className={`block w-full rounded-xl border-0 py-3 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-all duration-200 ${
                    errors.email
                      ? "ring-red-300 focus:ring-red-500"
                      : "ring-gray-300 focus:ring-indigo-600"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`block w-full rounded-xl border-0 py-3 pl-10 pr-12 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-all duration-200 ${
                    errors.password
                      ? "ring-red-300 focus:ring-red-500"
                      : "ring-gray-300 focus:ring-indigo-600"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot password */}
            {!isRegister && (
              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting
                  ? "Processing..."
                  : isRegister
                  ? "Sign Up"
                  : "Sign in"}
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                href={isRegister ? "/login" : "/register"}
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                {isRegister ? " Sign in now" : " Sign up now"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
