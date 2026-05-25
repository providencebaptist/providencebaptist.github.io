import { useEffect, useRef, useState, FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { z } from "zod";
import SEO from "@/components/SEO";
import mountains from "@/assets/vbs-mountains.jpg";
import forest from "@/assets/vbs-forest.jpg";
import campfire from "@/assets/vbs-campfire.jpg";
import tentNight from "@/assets/vbs-tent-night.jpg";
import bibleLantern from "@/assets/vbs-bible-lantern.jpg";
import { Compass, Flame, Tent, Binoculars, Calendar, Clock, MapPin, TreePine, Mountain } from "lucide-react";

const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
};

const useInView = <T extends HTMLElement>(threshold = 0.2) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const formSchema = z.object({
  parentName: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone required").max(20),
  childName: z.string().trim().min(1, "Child name required").max(100),
  childAge: z.string().trim().min(1, "Age required").max(3),
  notes: z.string().trim().max(500).optional(),
});

const Adventure = ({
  Icon,
  label,
  delay,
}: {
  Icon: typeof Compass;
  label: string;
  delay: number;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex items-center gap-4 rounded-2xl border border-[#d4a24a]/40 bg-[#1b2a1f]/80 px-5 py-4 backdrop-blur-sm transition-all duration-700 ${
        inView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
      }`}
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#d4a24a] text-[#1b2a1f]">
        <Icon className="h-6 w-6" />
      </div>
      <span className="font-display text-lg font-bold uppercase tracking-wide text-[#f5e9c9]">
        {label}
      </span>
    </div>
  );
};

const VacationBibleSchool = () => {
  const scrollY = useScrollY();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, handleFormspreeSubmit] = useForm("xgoqnvaz");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    handleFormspreeSubmit(form);
  };

  return (
    <>
      <SEO
        title="Vacation Bible School 2026 | Providence Baptist Church"
        description="Join us July 20-24, 2026 for a week of faith, fun & adventure at VBS! 6PM-8PM at Providence Baptist Church, Georgetown TX."
      />
      <div className="relative w-full overflow-hidden bg-[#0d1a14] text-[#f5e9c9]">
        {/* ========== HERO: VBS Sign ========== */}
        <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 scale-110"
            style={{
              backgroundImage: `url(${mountains})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(1.15)`,
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a2e3d]/30 via-[#0d1a14]/10 to-[#0d1a14]" />
          {/* Foreground pines */}
          <div
            className="pointer-events-none absolute -bottom-20 left-0 right-0 -z-0 h-72 bg-[url('/placeholder.svg')] bg-bottom bg-repeat-x"
            style={{
              transform: `translate3d(0, ${scrollY * -0.15}px, 0)`,
            }}
          />
          <div className="relative z-20 px-6 text-center">
            <p
              className="mb-6 inline-block rounded-full bg-[#1b2a1f]/80 px-6 py-2 font-display text-xs font-bold uppercase tracking-[0.3em] text-[#d4a24a] ring-1 ring-[#d4a24a]/50 backdrop-blur"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            >
              July 20–24, 2026
            </p>
            <h1
              className="font-display text-6xl font-black uppercase leading-[0.9] tracking-tight text-[#f5e9c9] drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            >
              Vacation
              <span className="mt-2 block font-display text-5xl italic text-[#7fb069] sm:text-6xl md:text-7xl lg:text-8xl">
                Bible School
              </span>
            </h1>
            <p
              className="mx-auto mt-8 max-w-xl text-lg font-medium uppercase tracking-widest text-[#d4a24a] sm:text-xl"
              style={{ transform: `translateY(${scrollY * -0.02}px)` }}
            >
              ≈ Join us for a week of faith, fun & adventure ≈
            </p>
            <div className="mt-12 flex justify-center">
              <a
                href="#register"
                className="group inline-flex items-center gap-3 rounded-full bg-[#d4a24a] px-8 py-4 font-display text-base font-bold uppercase tracking-wider text-[#1b2a1f] shadow-2xl shadow-[#d4a24a]/30 transition-all hover:scale-105 hover:bg-[#e8b85a]"
              >
                <Tent className="h-5 w-5" />
                Register Your Camper
              </a>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2 rounded-full bg-[#0d1a14]/80 px-4 py-3 ring-1 ring-[#d4a24a]/40 backdrop-blur-sm">
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4a24a]">Scroll</span>
              <div className="h-8 w-px bg-gradient-to-b from-[#d4a24a] to-transparent" />
            </div>
          </div>
        </section>

        {/* ========== FOREST: Theme ========== */}
        <section className="relative flex min-h-[90vh] items-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${forest})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translate3d(0, ${(scrollY - 600) * 0.3}px, 0)`,
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0d1a14] via-[#0d1a14]/70 to-transparent" />
          <div className="container mx-auto grid grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[#7fb069]">
                <TreePine className="h-6 w-6" />
                <span className="font-display text-sm font-bold uppercase tracking-[0.3em]">
                  The Theme
                </span>
              </div>
              <h2 className="font-display text-5xl font-black uppercase leading-[0.95] text-[#f5e9c9] md:text-6xl">
                Into the
                <span className="block italic text-[#d4a24a]">Great Outdoors</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#f5e9c9]/80">
                Pack your gear and your faith — we're heading into the wild for an
                unforgettable week of Bible stories, campfire games, mountain-sized
                wonder, and friendships that last long after the embers fade.
              </p>
            </div>
            <div className="space-y-4">
              <Adventure Icon={Compass} label="Bible Stories" delay={0} />
              <Adventure Icon={Flame} label="Fun Games" delay={120} />
              <Adventure Icon={Tent} label="Amazing Adventures" delay={240} />
              <Adventure Icon={Binoculars} label="New Friends" delay={360} />
            </div>
          </div>
        </section>

        {/* ========== CAMPFIRE: Details ========== */}
        <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${campfire})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translate3d(0, ${(scrollY - 1400) * 0.25}px, 0) scale(1.1)`,
            }}
          />
          <div className="absolute inset-0 z-0 bg-[#0d1a14]/60" />
          <div className="relative z-20 mx-6 max-w-2xl rounded-3xl border-2 border-[#d4a24a]/60 bg-[#f5e9c9] p-10 shadow-2xl shadow-black/60 md:p-14">
            <div className="mb-6 flex justify-center">
              <div className="h-1 w-16 bg-[#1b2a1f]" />
            </div>
            <div className="space-y-8 text-center text-[#1b2a1f]">
              <div>
                <div className="mb-3 flex items-center justify-center gap-3 text-[#1b3a52]">
                  <Calendar className="h-7 w-7" />
                </div>
                <p className="font-display text-5xl font-black uppercase tracking-tight md:text-6xl">
                  July 20–24
                </p>
                <p className="mt-3 font-display text-3xl italic text-[#c8651f] md:text-4xl">
                  ≈ 6PM – 8PM ≈
                </p>
              </div>
              <div className="mx-auto h-px w-32 bg-dashed border-t-2 border-dashed border-[#1b2a1f]/40" />
              <div>
                <div className="mb-3 flex items-center justify-center gap-3 text-[#1b3a52]">
                  <MapPin className="h-7 w-7" />
                </div>
                <p className="font-display text-2xl font-black uppercase md:text-3xl">
                  Providence Baptist Church
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-[#1b2a1f]/80 md:text-base">
                  505 W. University Ave, Ste. #109
                  <br />
                  Georgetown, TX 78626
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== STARRY NIGHT: Invitation ========== */}
        <section className="relative flex min-h-[90vh] items-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${tentNight})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translate3d(0, ${(scrollY - 2200) * 0.3}px, 0)`,
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d1a14]/60 via-transparent to-[#0d1a14]" />
          <div className="container mx-auto px-6 py-24 text-center">
            <Mountain className="mx-auto mb-6 h-10 w-10 text-[#d4a24a]" />
            <h2 className="mx-auto max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] text-[#f5e9c9] md:text-7xl">
              Let's grow in faith
              <span className="mt-2 block italic text-[#7fb069]">together</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg text-[#f5e9c9]/80">
              Beneath wide-open skies and a million stars, hearts learn to listen.
              Bring your kids, bring your friends, bring your wonder.
            </p>
          </div>
        </section>

        {/* ========== REGISTER ========== */}
        <section
          id="register"
          className="relative flex min-h-screen items-center overflow-hidden py-24"
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${bibleLantern})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translate3d(0, ${(scrollY - 3000) * 0.2}px, 0)`,
            }}
          />
          <div className="absolute inset-0 z-0 bg-[#0d1a14]/85" />
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-[#d4a24a]">
                  Sign Up Below
                </p>
                <h2 className="font-display text-4xl font-black uppercase text-[#f5e9c9] md:text-5xl">
                  Reserve Your Spot
                </h2>
                <p className="mt-3 text-[#f5e9c9]/70">
                  Fill out the form and we'll be in touch with everything you need.
                </p>
              </div>

              {formState.succeeded ? (
                <div className="rounded-3xl border-2 border-[#7fb069]/60 bg-[#1b2a1f]/90 p-10 text-center backdrop-blur">
                  <Flame className="mx-auto mb-4 h-10 w-10 text-[#d4a24a]" />
                  <h3 className="font-display text-3xl font-black uppercase text-[#f5e9c9]">
                    See you at the campfire!
                  </h3>
                  <p className="mt-3 text-[#f5e9c9]/80">
                    Thanks for registering. We'll reach out soon with all the
                    details.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="space-y-5 rounded-3xl border border-[#d4a24a]/40 bg-[#1b2a1f]/85 p-8 backdrop-blur md:p-10"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field
                      name="parentName"
                      label="Parent / Guardian Name"
                      error={errors.parentName}
                    />
                    <Field name="email" label="Email" type="email" error={errors.email} />
                    <Field name="phone" label="Phone" type="tel" error={errors.phone} />
                    <Field name="childAge" label="Child's Age" type="number" error={errors.childAge} />
                  </div>
                  <Field name="childName" label="Child's Name" error={errors.childName} />
                  <div>
                    <label className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.2em] text-[#d4a24a]">
                      Notes / Allergies (optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={4}
                      maxLength={500}
                      className="w-full rounded-xl border border-[#d4a24a]/30 bg-[#0d1a14]/60 px-4 py-3 text-[#f5e9c9] placeholder:text-[#f5e9c9]/40 focus:border-[#d4a24a] focus:outline-none focus:ring-2 focus:ring-[#d4a24a]/50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState.submitting}
                    className="w-full rounded-full bg-[#d4a24a] py-4 font-display text-base font-bold uppercase tracking-wider text-[#1b2a1f] shadow-xl shadow-[#d4a24a]/20 transition-all hover:scale-[1.02] hover:bg-[#e8b85a] disabled:opacity-60"
                  >
                    {formState.submitting ? "Sending..." : "Sign Me Up"}
                  </button>
                  <ValidationError errors={formState.errors} className="text-center text-sm text-[#e8773a]" />
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const Field = ({
  name,
  label,
  type = "text",
  error,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
}) => (
  <div>
    <label className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.2em] text-[#d4a24a]">
      {label}
    </label>
    <input
      name={name}
      type={type}
      maxLength={255}
      className="w-full rounded-xl border border-[#d4a24a]/30 bg-[#0d1a14]/60 px-4 py-3 text-[#f5e9c9] placeholder:text-[#f5e9c9]/40 focus:border-[#d4a24a] focus:outline-none focus:ring-2 focus:ring-[#d4a24a]/50"
    />
    {error && <p className="mt-1 text-xs text-[#e8773a]">{error}</p>}
  </div>
);

export default VacationBibleSchool;