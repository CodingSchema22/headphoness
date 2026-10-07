import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Headphones,
  Mail,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 700);
  };

  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        px-6
        py-16
      "
    >
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

            <p
              className="
                text-[9px]
                text-gray-500
                uppercase
                tracking-[0.25em]
                mt-1
              "
            >
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

          {!success ? (
            <>
              {/* =================================================
                  HEADING
              ================================================= */}

              <div className="text-center mb-8">

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    text-gray-500
                  "
                >
                  Account recovery
                </p>

                <h2
                  className="
                    text-3xl
                    font-bold
                    mt-3
                  "
                >
                  Forgot password?
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-3
                    leading-6
                  "
                >
                  Enter your email address and we'll
                  help you reset your password.
                </p>

              </div>


              {/* =================================================
                  ERROR
              ================================================= */}

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
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
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


                {/* =================================================
                    SUBMIT
                ================================================= */}

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
                    ? "Sending..."
                    : "Send reset link"}

                  {!loading && (
                    <ArrowRight size={17} />
                  )}

                </button>

              </form>


              {/* =================================================
                  BACK TO LOGIN
              ================================================= */}

              <Link
                to="/login"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  text-gray-500
                  hover:text-white
                  mt-7
                  transition
                "
              >
                <ArrowLeft size={16} />
                Back to sign in
              </Link>
            </>
          ) : (

            /* =================================================
                SUCCESS
            ================================================= */

            <div className="text-center py-5">

              <div
                className="
                  w-16
                  h-16
                  mx-auto
                  rounded-full
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                "
              >
                <CheckCircle size={30} />
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mt-6
                "
              >
                Check your email
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-3
                  leading-6
                "
              >
                If an account exists for{" "}
                <span className="text-gray-300">
                  {email}
                </span>
                , we've sent instructions to reset
                your password.
              </p>

              <Link
                to="/login"
                className="
                  mt-7
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
                  transition
                "
              >
                Back to sign in
                <ArrowRight size={17} />
              </Link>

            </div>
          )}

        </div>


        {/* =================================================
            BACK HOME
        ================================================= */}

        <Link
          to="/"
          className="
            flex
            items-center
            justify-center
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

export default ForgotPassword;