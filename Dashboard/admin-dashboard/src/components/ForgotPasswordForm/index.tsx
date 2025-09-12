"use client";

import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "@/utils/validationSchemas";
import { useRouter } from "next-nprogress-bar";
import { ForgotPasswordEmailInputs } from "@/utils/typeDefinition/typeFile";
import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = async (data: ForgotPasswordEmailInputs): Promise<void> => {
    try {
      const result = await axiosInstance(false).post(
        "/api/forgot-password",
        data
      );

      localStorage.setItem("email", data.email);
      console.log("Forgot Password response:", result);   
      router.push(`/forgot-password-change`);   
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: { path: string; msg: string } }>;
      const errorPath = err?.response?.data?.error;
      if (errorPath?.path == "email") {
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
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Change your password here
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl ring-1 ring-gray-900/5">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Verify Email
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember password?
              <Link
                href={"/login"}
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Login here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}