"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./action";
import { useRouter } from "next/navigation";

// Updated types to match the actual return type from your login function
interface LoginState {
  errors?: {
    username?: string[] | undefined;
    password?: string[] | undefined;
  };
  success?: boolean;
  redirectTo?: string;
}

export function LoginForm() {
  const router = useRouter();
  const [state, loginAction] = useActionState<LoginState, FormData>(
    async (state: LoginState, formData: FormData) => {
      // First parameter must be the state (not prevState)
      const result = await login(state, formData);
      if (result?.redirectTo) {
        router.push(result.redirectTo);
      }
      return result;
    },
    {} as LoginState // Initialize with empty object of the correct type
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        <form action={loginAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {state?.errors?.username && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.username.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {state?.errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.password.join(", ")}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div className="mt-4">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
