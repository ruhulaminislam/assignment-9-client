import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export default function SignUpPage() {
  return (
    <section
      aria-labelledby="sign-up-heading"
      className={`${inter.className} bg-[#F7F3EE]`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-[0_32px_80px_-48px_rgba(41,40,36,0.35)] ring-1 ring-[#D8C5B2]/70 lg:grid lg:max-w-5xl lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative hidden lg:block">
            <Image
              src="/images/categories/spa-massage.jpg"
              alt="Warm spa still life with rolled towels and candlelight"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#292824]/90 via-[#292824]/35 to-[#292824]/10"
            />

            <div className="relative flex h-full flex-col justify-between p-10">
              <p className="text-xs font-medium tracking-[0.24em] text-[#D8C5B2] uppercase">
                SalonBook
              </p>

              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-[#D8C5B2] uppercase">
                  A Little Time For You
                </p>
                <p
                  className={`${playfair.className} mt-4 text-3xl leading-tight font-medium text-balance text-white`}
                >
                  Beauty, made effortless.
                </p>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
                  Create an account to discover thoughtful salon services and
                  request your next appointment in a few calm steps.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <p className="text-xs font-medium tracking-[0.24em] text-[#A58B73] uppercase">
              Join SalonBook
            </p>

            <h1
              id="sign-up-heading"
              className={`${playfair.className} mt-4 text-3xl leading-tight font-medium tracking-tight text-balance text-[#292824] sm:text-4xl`}
            >
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#625D56] sm:text-base sm:leading-7">
              Join us to discover salon services and request appointments with
              ease.
            </p>

            <form className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="full-name"
                  className="text-sm font-medium text-[#292824]"
                >
                  Full Name
                </Label>
                <Input
                  id="full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  className="h-12 rounded-lg border-[#D8C5B2] bg-white px-4 text-base text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-[#292824]"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-12 rounded-lg border-[#D8C5B2] bg-white px-4 text-base text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-[#292824]"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  aria-describedby="password-hint"
                  className="h-12 rounded-lg border-[#D8C5B2] bg-white px-4 text-base text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base"
                />
                <p
                  id="password-hint"
                  className="text-xs leading-5 text-[#625D56]"
                >
                  Use at least 6 characters with one uppercase and one lowercase
                  letter.
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="profile-image"
                  className="text-sm font-medium text-[#292824]"
                >
                  Profile Image URL
                </Label>
                <Input
                  id="profile-image"
                  name="profileImage"
                  type="url"
                  autoComplete="url"
                  placeholder="https://example.com/your-photo.jpg"
                  aria-describedby="profile-image-hint"
                  className="h-12 rounded-lg border-[#D8C5B2] bg-white px-4 text-base text-[#292824] transition-colors placeholder:text-[#8A8178] hover:border-[#C4AC96] focus-visible:border-[#A58B73] focus-visible:ring-2 focus-visible:ring-[#A58B73]/25 md:text-base"
                />
                <p
                  id="profile-image-hint"
                  className="text-xs leading-5 text-[#625D56]"
                >
                  Paste a direct link to your profile photo.
                </p>
              </div>

              <Button
                type="button"
                className="mt-2 h-12 w-full rounded-lg bg-[#292824] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#292824]/90 focus-visible:ring-[#292824]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Create Account
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-[#D8C5B2]/70"
              />
              <span className="text-[11px] font-medium tracking-[0.16em] text-[#625D56] uppercase">
                Or continue with
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-[#D8C5B2]/70"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-lg border-[#D8C5B2] bg-white text-sm font-medium text-[#292824] transition-colors duration-200 hover:border-[#A58B73] hover:bg-[#F7F3EE] hover:text-[#292824] focus-visible:ring-[#A58B73]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Sign up with Google
            </Button>

            <p className="mt-7 text-center text-sm text-[#625D56]">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-[#292824] underline decoration-[#A58B73] underline-offset-4 transition-colors duration-200 hover:text-[#A58B73] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292824]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
