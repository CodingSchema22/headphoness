import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Headphones,
  Lock,
  Mail,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };


  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // Temporary frontend login
    setTimeout(() => {
      const user = {
        email: formData.email,
      };

      localStorage.setItem(
        "soundx-user",
        JSON.stringify(user)
      );

      setLoading(false);

      navigate("/");
    }, 700);
  };


  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-md">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="
            flex
            items-center
            justify-center
            gap-3
            mb-10
          "
        >

          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-white
              text-black
              flex
              items-center
              justify-center
            "
          >
            <Headphones size={22} />
          </div>

          <div className="leading-none">

            <h1 className="text-xl font-bold">
              SoundX
            </h1>

            <p className="
              text-[9px]
              text-gray-500
              uppercase
              tracking-[0.25em]
              mt-1
            ">
              Premium Audio
            </p>

          </div>

        </Link>


        {/* =================================================
            CARD
        ================================================= */}

        <div
          className="
            rounded-[2rem]
            border
            border-white/10
            bg-white/[0.03]
            p-7
            md:p-9
          "
        >

          {/* HEADING */}

          <div className="text-center mb-8">

            <p className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-gray-500
            ">
              Welcome back
            </p>

            <h2 className="
              text-3xl
              font-bold
              mt-3
            ">
              Sign in
            </h2>

            <p className="
              text-sm
              text-gray-500
              mt-3
            ">
              Access your SoundX account.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div
              className="
                mb-5
                px-4
                py-3
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                text-red-400
                text-sm
              "
            >
              {error}
            </div>
          )}


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                "
              >
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-600
                  "
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    bg-black
                    border
                    border-white/10
                    outline-none
                    text-white
                    text-sm
                    placeholder:text-gray-700
                    focus:border-white/30
                    transition
                  "
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <div className="
                flex
                items-center
                justify-between
                mb-2
              ">

                <label
                  htmlFor="password"
                  className="
                    text-sm
                    text-gray-400
                  "
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="
                    text-xs
                    text-gray-500
                    hover:text-white
                    transition
                  "
                >
                  Forgot password?
                </Link>

              </div>


              <div className="relative">

                <Lock
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-600
                  "
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-12
                    rounded-xl
                    bg-black
                    border
                    border-white/10
                    outline-none
                    text-white
                    text-sm
                    placeholder:text-gray-700
                    focus:border-white/30
                    transition
                  "
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    w-9
                    h-9
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    hover:text-white
                    transition
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}

                </button>

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-12
                rounded-full
                bg-white
                text-black
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-gray-200
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition
              "
            >

              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowRight size={17} />
              )}

            </button>

          </form>


          {/* =================================================
              SIGNUP
          ================================================= */}

          <p className="
            text-center
            text-sm
            text-gray-500
            mt-7
          ">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="
                text-white
                hover:text-gray-300
                transition
                font-medium
              "
            >
              Create one
            </Link>

          </p>

        </div>


        {/* BACK HOME */}

        <Link
          to="/"
          className="
            flex
            items-center
            justify-center
            gap-2
            text-sm
            text-gray-600
            hover:text-white
            mt-7
            transition
          "
        >
          Back to SoundX
        </Link>

      </div>

    </main>
  );
};

export default Login;