
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
// const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;
const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/products`;
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
  AudioLines,
  Zap,
  Star,
  MoveUpRight,
  CheckCircle2,
  Radio,
} from "lucide-react";

import ProductCard from "../components/ProductCard";

// const API_URL = "http://localhost:5000/api/products";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const features = [
  {
    number: "01",
    title: "Immersive audio",
    description:
      "Hear every detail with rich bass, balanced mids and crystal-clear highs.",
    icon: AudioLines,
  },
  {
    number: "02",
    title: "Made for comfort",
    description:
      "Premium cushioning and an ergonomic fit for your everyday listening.",
    icon: Headphones,
  },
  {
    number: "03",
    title: "Power that lasts",
    description:
      "Keep your favorite music going throughout your day.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Quality you trust",
    description:
      "Thoughtful design, reliable service and support when you need it.",
    icon: ShieldCheck,
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load products.");
        }

        const dbProducts = (data.products || []).map((product) => ({
          ...product,
          id: product._id,
        }));

        setProducts(dbProducts);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Home products error:", err);
          setError(
            "Products load nahi ho sake. Backend server check karo."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  const featuredProduct = products[0];

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
        variants: fadeUp,
      };

  return (
    <main className="overflow-hidden bg-black text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate flex min-h-[760px] items-center overflow-hidden lg:min-h-[calc(100vh-76px)]">
        {/* Background atmosphere */}

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,rgba(59,130,246,0.13),transparent_40%),radial-gradient(ellipse_at_15%_80%,rgba(255,255,255,0.045),transparent_35%)]" />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

        {!shouldReduceMotion && (
          <>
            <motion.div
              className="pointer-events-none absolute -right-32 top-10 -z-10 h-[480px] w-[480px] rounded-full border border-blue-400/10"
              animate={{ rotate: 360 }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="pointer-events-none absolute right-0 top-28 -z-10 h-[360px] w-[360px] rounded-full border border-white/[0.07]"
              animate={{ rotate: -360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="pointer-events-none absolute left-[42%] top-[15%] -z-10 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[100px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:px-10 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:py-24">
          {/* Hero copy */}

          <motion.div
            className="relative z-10"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-gray-300 backdrop-blur-xl sm:text-sm">
              <Sparkles size={15} className="text-blue-300" />
              Meet your new listening experience
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-[1.06] tracking-[-0.055em] sm:text-6xl md:text-7xl xl:text-[82px]">
              Sound that
              <span className="mt-2 block bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                moves you.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
              Escape the noise. Feel every beat. Discover premium
              headphones designed to bring your music to life.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/products"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 font-semibold !text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]"
              >
                <span className="!text-black">Explore collection</span>
                <ArrowRight
                  size={18}
                  className="!text-black transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {featuredProduct ? (
                <Link
                  to={`/product/${featuredProduct.id}`}
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-7 font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20">
                    <Play size={12} fill="currentColor" />
                  </span>
                  Discover SoundX
                </Link>
              ) : (
                <Link
                  to="/products"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-7 font-medium text-white transition-all duration-300 hover:bg-white/[0.08]"
                >
                  <Play size={16} />
                  Discover SoundX
                </Link>
              )}
            </div>

            {/* Trust indicators */}

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-4 border-t border-white/10 pt-7 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-gray-300" />
                Quality focused
              </div>

              <div className="flex items-center gap-2">
                <Truck size={17} className="text-gray-300" />
                Fast delivery
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-gray-300" />
                Easy shopping
              </div>
            </div>
          </motion.div>

          {/* Hero product visual */}

          <motion.div
            className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:min-h-[540px]"
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.88 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          >
            <div className="absolute h-[300px] w-[300px] rounded-full bg-blue-500/[0.09] blur-[85px] sm:h-[430px] sm:w-[430px]" />

            <div className="absolute h-[290px] w-[290px] rounded-full border border-white/[0.08] sm:h-[430px] sm:w-[430px]" />

            <div className="absolute h-[235px] w-[235px] rounded-full border border-dashed border-white/[0.12] sm:h-[360px] sm:w-[360px]" />

            {!shouldReduceMotion && (
              <motion.div
                className="absolute right-[10%] top-[14%] z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-blue-200 shadow-2xl backdrop-blur-xl sm:right-[8%] sm:top-[15%]"
                animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AudioLines size={23} />
              </motion.div>
            )}

            <motion.div
              className="relative z-10 w-full"
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [0, -12, 0], rotate: [0, 1, 0] }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="/images/headphone15.png"
                alt="Premium SoundX wireless headphones"
                onError={(event) => {
                  if (
                    !event.currentTarget.src.endsWith(
                      "/images/headphone17.png"
                    )
                  ) {
                    event.currentTarget.src = "/images/headphone17.png";
                  }
                }}
                className="relative z-10 mx-auto max-h-[520px] w-full object-contain drop-shadow-[0_35px_65px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Floating audio badge */}

            {!shouldReduceMotion && (
              <motion.div
                className="absolute bottom-[22%] left-0 z-20 hidden rounded-2xl border border-white/10 bg-black/70 p-4 shadow-2xl backdrop-blur-2xl sm:block md:left-2"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                    <Headphones size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Pure immersion</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Every beat matters
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {featuredProduct && (
              <Link
                to={`/product/${featuredProduct.id}`}
                className="absolute bottom-0 right-0 z-20 max-w-[240px] rounded-2xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-xl transition-colors hover:border-white/25 sm:bottom-3 sm:right-1"
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    Featured product
                  </span>
                  <MoveUpRight size={15} className="text-gray-400" />
                </div>

                <p className="truncate text-sm font-semibold">
                  {featuredProduct.name}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Rs.{" "}
                  {Number(featuredProduct.price || 0).toLocaleString("en-PK")}
                </p>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}

        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gray-600 lg:flex">
          <span className="h-px w-8 bg-gray-700" />
          Scroll to explore
          <span className="h-px w-8 bg-gray-700" />
        </div>
      </section>

      {/* =====================================================
          MOVING BRAND STRIP
      ===================================================== */}

      <section className="overflow-hidden border-y border-white/10 bg-white/[0.025] py-5">
        <motion.div
          className="flex w-max items-center gap-10 sm:gap-16"
          animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(2)].map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="flex shrink-0 items-center gap-10 sm:gap-16"
            >
              {[
                "PURE SOUND",
                "EVERYDAY COMFORT",
                "PREMIUM DESIGN",
                "YOUR MUSIC",
                "SOUND WITHOUT LIMITS",
              ].map((item) => (
                <div
                  key={`${groupIndex}-${item}`}
                  className="flex items-center gap-4 whitespace-nowrap"
                >
                  <span className="text-xs font-semibold tracking-[0.22em] text-gray-400 sm:text-sm">
                    {item}
                  </span>
                  <Sparkles size={14} className="text-blue-300/70" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="relative px-5 py-24 sm:px-8 md:px-10 md:py-32 lg:px-12">
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-blue-500/[0.04] blur-[100px]" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            {...motionProps}
            className="mb-14 grid gap-6 md:grid-cols-2 md:items-end"
          >
            <div>
              <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                <span className="h-px w-7 bg-blue-400" />
                The SoundX difference
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Less noise.
                <span className="block text-gray-500">More feeling.</span>
              </h2>
            </div>

            <p className="max-w-md text-base leading-8 text-gray-400 md:justify-self-end">
              Great audio is more than what you hear. It is how every
              moment feels. Meet the details that make the difference.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {features.map(({ number, title, description, icon: Icon }) => (
              <motion.article
                key={number}
                variants={fadeUp}
                whileHover={shouldReduceMotion ? {} : { y: -7 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.045] sm:p-7"
              >
                <div className="mb-12 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-colors group-hover:bg-white group-hover:text-black">
                    <Icon size={22} />
                  </div>

                  <span className="text-xs tracking-widest text-gray-600">
                    {number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {description}
                </p>

                <div className="mt-7 h-px w-full bg-white/10">
                  <div className="h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="border-y border-white/[0.07] bg-[#080808] px-5 py-24 sm:px-8 md:px-10 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...motionProps}
            className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-500">
                Curated for you
              </p>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Find your sound.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-gray-400">
                Explore headphones designed to match your music,
                your mood and your everyday life.
              </p>
            </div>

            <Link
              to="/products"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white hover:!text-black"
            >
              View all products
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <div className="aspect-[4/3] rounded-2xl bg-white/[0.06]" />
                  <div className="mt-5 h-4 w-2/3 rounded bg-white/[0.07]" />
                  <div className="mt-3 h-3 w-1/3 rounded bg-white/[0.05]" />
                  <div className="mt-6 h-10 rounded-xl bg-white/[0.06]" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-12 text-center">
              <Headphones
                size={32}
                className="mx-auto mb-4 text-gray-500"
              />
              <h3 className="text-lg font-semibold">
                Products are temporarily unavailable
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                {error}
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 font-semibold !text-black transition hover:bg-gray-200"
              >
                Try again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-16 text-center">
              <Headphones
                size={34}
                className="mx-auto mb-4 text-gray-500"
              />
              <h3 className="text-xl font-semibold">
                Your next favorite is waiting.
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                New products will appear here when they are available.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold !text-black transition hover:bg-gray-200"
              >
                Browse collection <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={stagger}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {products.slice(0, 6).map((product) => (
                <motion.div
                  key={product._id || product.id}
                  variants={fadeUp}
                  className="min-w-0"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && !error && products.length > 6 && (
            <div className="mt-10 text-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 font-medium transition hover:bg-white hover:!text-black"
              >
                Explore all {products.length} products
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE BANNER
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 md:px-10 md:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...motionProps}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090c] p-7 sm:p-10 md:p-16"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(59,130,246,0.15),transparent_45%),radial-gradient(ellipse_at_0%_100%,rgba(255,255,255,0.04),transparent_40%)]" />

            <div className="pointer-events-none absolute right-[-80px] top-[-120px] h-[360px] w-[360px] rounded-full border border-white/[0.07] sm:right-[-30px] sm:top-[-170px] sm:h-[500px] sm:w-[500px]" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-gray-300">
                  <Radio size={14} className="text-blue-300" />
                  Your world. Your soundtrack.
                </div>

                <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                  Turn everyday
                  <span className="block text-gray-500">
                    into an experience.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg leading-8 text-gray-400">
                  Whether you are working, travelling or simply
                  switching off, find the sound that feels like yours.
                </p>

                <Link
                  to="/products"
                  className="group mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-7 font-semibold !text-black transition duration-300 hover:-translate-y-1 hover:bg-gray-200"
                >
                  Find your headphones
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="relative flex min-h-[260px] items-center justify-center sm:min-h-[340px]">
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute h-64 w-64 rounded-full border border-white/10 sm:h-80 sm:w-80"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 h-4 w-4 rounded-full bg-blue-300 shadow-[0_0_30px_rgba(147,197,253,0.7)]" />
                  </motion.div>
                )}

                <div className="absolute h-52 w-52 rounded-full bg-blue-500/[0.09] blur-[70px] sm:h-72 sm:w-72" />

                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 text-white"
                >
                  <Headphones
                    size={150}
                    strokeWidth={0.8}
                    className="drop-shadow-[0_20px_40px_rgba(255,255,255,0.12)] sm:h-52 sm:w-52"
                  />
                </motion.div>

                <div className="absolute bottom-3 right-0 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl sm:right-6">
                  <div className="flex items-center gap-2">
                    <Star size={15} fill="currentColor" />
                    <span className="text-xs font-medium">
                      Made for music lovers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="border-t border-white/[0.07] px-5 py-20 sm:px-8 md:px-10 md:py-28 lg:px-12">
        <motion.div
          {...motionProps}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-gray-500">
            Find your frequency
          </p>

          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Ready to hear
            <span className="block text-gray-500">something different?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-400">
            Your music deserves more. Discover your next pair of
            SoundX headphones today.
          </p>

          <Link
            to="/products"
            className="group mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-8 font-semibold !text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]"
          >
            Shop the collection
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <div className="mt-12 flex items-center justify-center gap-3 text-xs text-gray-600">
            <Headphones size={16} />
            <span className="font-semibold tracking-[0.25em]">
              SOUNDX
            </span>
            <span>·</span>
            <span>Feel every frequency.</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
