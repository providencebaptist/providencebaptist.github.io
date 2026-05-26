import { useEffect, useRef, useState, FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { z } from "zod";
import * as HelmetAsync from "react-helmet-async";
import SEO from "@/components/SEO";
import mountains from "@/assets/vbs-mountains.jpg";
import forest from "@/assets/vbs-forest.jpg";
import campfire from "@/assets/vbs-campfire.jpg";
import tentNight from "@/assets/vbs-tent-night.jpg";
import bibleLantern from "@/assets/vbs-bible-lantern.jpg";
import { Compass, Flame, Tent, Binoculars, Calendar, Clock, MapPin, TreePine, Mountain, Plus, X, HelpCircle } from "lucide-react";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqsForPath } from "@/lib/pageFaqs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { Helmet } = (HelmetAsync as any).default || HelmetAsync;

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
});

const childSchema = z.object({
 name: z.string().trim().min(1, "Name required").max(100),
 age: z.string().trim().min(1, "Age required").max(3),
 notes: z.string().trim().max(500).optional(),
});

type Child = { name: string; age: string; notes: string };
const emptyChild = (): Child => ({ name: "", age: "", notes: "" });

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
 const [children, setChildren] = useState<Child[]>([emptyChild()]);
 const [formState, handleFormspreeSubmit] = useForm("xgoqnvaz");

 const updateChild = (i: number, key: keyof Child, value: string) => {
 setChildren((prev) => prev.map((c, idx) => (idx === i ? { ...c, [key]: value } : c)));
 };
 const addChild = () => setChildren((prev) => [...prev, emptyChild()]);
 const removeChild = (i: number) =>
 setChildren((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i)));

 const onSubmit = (e: FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 const form = e.currentTarget;
 const fd = new FormData(form);
 const data = Object.fromEntries(fd) as Record<string, string>;
 const parentResult = formSchema.safeParse(data);
 const errs: Record<string, string> = {};
 if (!parentResult.success) {
 parentResult.error.issues.forEach((i) => {
 errs[i.path[0] as string] = i.message;
 });
 }
 children.forEach((c, idx) => {
 const r = childSchema.safeParse(c);
 if (!r.success) {
 r.error.issues.forEach((iss) => {
 errs[`child-${idx}-${iss.path[0]}`] = iss.message;
 });
 }
 });
 if (Object.keys(errs).length > 0) {
 setErrors(errs);
 return;
 }
 setErrors({});

 // Pack all children into a single "children" field for Formspree
 const childrenSummary = children
 .map(
 (c, i) =>
 `Child ${i + 1}: ${c.name} (Age ${c.age})${c.notes ? `, Notes: ${c.notes}` : ""}`,
 )
 .join("\n");
 fd.set("children", childrenSummary);
 fd.set("childrenJson", JSON.stringify(children));
 fd.set("childCount", String(children.length));
 handleFormspreeSubmit(fd);
 };


 return (
 <>
 <SEO
 title="Vacation Bible School 2026 | Providence Baptist Church"
 description="Join us July 20-24, 2026 for a week of faith, fun & adventure at VBS! 6PM-8PM at Providence Baptist Church, Georgetown TX."
 url="https://pbcatx.org/vacation-bible-school-2026"
 image="https://pbcatx.org/og-vbs.jpg"
 />
 <div className="relative w-full overflow-hidden bg-[#0d1a14] text-[#f5e9c9]">
 {/* ========== HERO: VBS Sign ========== */}
 <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d1a14] py-20 sm:py-24 md:py-32">
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
 {/* Soft bottom fade so the hero dissolves into the next section instead of cutting */}
 <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[35vh] bg-gradient-to-b from-transparent to-[#0d1a14]" />
 <div className="relative z-20 px-6 text-center">
 <p
 className="mb-6 inline-block rounded-full bg-[#1b2a1f]/80 px-6 py-2 font-display text-xs font-bold uppercase tracking-[0.3em] text-[#d4a24a] ring-1 ring-[#d4a24a]/50 backdrop-blur"
 style={{ transform: `translateY(${scrollY * -0.1}px)` }}
 >
 July 20–24, 2026
 </p>
 <h1
 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-[#f5e9c9] drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl lg:text-9xl"
 style={{ transform: `translateY(${scrollY * -0.05}px)` }}
 >
 Vacation
 <span className="mt-2 block font-display text-4xl italic text-[#7fb069] sm:text-6xl md:text-7xl lg:text-8xl">
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
 <div className="flex flex-col items-center gap-2">
 <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4a24a]">Scroll</span>
 <div className="h-8 w-px bg-gradient-to-b from-[#d4a24a] to-transparent" />
 </div>
 </div>
 </section>

 {/* ========== FOREST: Theme ========== */}
 <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0d1a14]">
 <div
 className="absolute inset-0 z-0"
 style={{
 backgroundImage: `url(${forest})`,
 backgroundSize: "cover",
 backgroundPosition: "center",
 transform: `translate3d(0, ${(scrollY - 600) * 0.3}px, 0)`,
 }}
 />
 {/* Smooth top/bottom fades that reveal the image quickly through the middle */}
 <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[35vh] bg-gradient-to-b from-[#0d1a14] to-transparent" />
 <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[35vh] bg-gradient-to-t from-[#0d1a14] to-transparent" />
 {/* Light side vignette for text legibility - image still reads clearly */}
 <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0d1a14]/75 via-[#0d1a14]/25 to-transparent" />
 <div className="container relative z-20 mx-auto grid grid-cols-1 gap-10 px-6 py-28 sm:gap-12 sm:py-32 md:py-40 lg:grid-cols-2 lg:items-center lg:gap-16">
 <div className="rounded-3xl bg-[#0d1a14]/70 p-6 backdrop-blur-sm ring-1 ring-[#d4a24a]/20 sm:p-8 md:p-10">
 <div className="mb-4 flex items-center gap-3 text-[#7fb069]">
 <TreePine className="h-6 w-6" />
 <span className="font-display text-sm font-bold uppercase tracking-[0.3em]">
 The Theme
 </span>
 </div>
 <h2 className="font-display text-4xl font-black uppercase leading-[0.95] text-[#f5e9c9] sm:text-5xl md:text-6xl">
 Into the
 <span className="block italic text-[#d4a24a]">Great Outdoors</span>
 </h2>
 <p className="mt-6 max-w-lg text-base leading-relaxed text-[#f5e9c9]/95 sm:text-lg">
 Pack your gear and your faith, we're heading into the wild for an
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
 <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d1a14] py-28 sm:py-32 md:py-40">
 <div
 className="absolute inset-0 z-0"
 style={{
 backgroundImage: `url(${campfire})`,
 backgroundSize: "cover",
 backgroundPosition: "center",
 transform: `translate3d(0, ${(scrollY - 1400) * 0.25}px, 0) scale(1.1)`,
 }}
 />
 <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[35vh] bg-gradient-to-b from-[#0d1a14] to-transparent" />
 <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[35vh] bg-gradient-to-t from-[#0d1a14] to-transparent" />
 <div className="absolute inset-0 z-0 bg-[#0d1a14]/25" />
 <div className="relative z-20 mx-4 max-w-2xl rounded-3xl border-2 border-[#d4a24a]/60 bg-[#f5e9c9] p-6 shadow-2xl shadow-black/60 sm:mx-6 sm:p-10 md:p-14">
 <div className="mb-6 flex justify-center">
 <div className="h-1 w-16 bg-[#1b2a1f]" />
 </div>
 <div className="space-y-6 text-center text-[#1b2a1f] sm:space-y-8">
 <div>
 <div className="mb-3 flex items-center justify-center gap-3 text-[#1b3a52]">
 <Calendar className="h-7 w-7" />
 </div>
 <p className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
 July 20–24
 </p>
 <p className="mt-3 font-display text-2xl italic text-[#c8651f] sm:text-3xl md:text-4xl">
 ≈ 6PM – 8PM ≈
 </p>
 </div>
 <div className="mx-auto h-px w-32 bg-dashed border-t-2 border-dashed border-[#1b2a1f]/40" />
 <div>
 <div className="mb-3 flex items-center justify-center gap-3 text-[#1b3a52]">
 <MapPin className="h-7 w-7" />
 </div>
 <p className="font-display text-xl font-black uppercase sm:text-2xl md:text-3xl">
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
 <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0d1a14]">
 <div
 className="absolute inset-0 z-0"
 style={{
 backgroundImage: `url(${bibleLantern})`,
 backgroundSize: "cover",
 backgroundPosition: "center",
 transform: `translate3d(0, ${(scrollY - 2200) * 0.3}px, 0)`,
 }}
 />
 <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[35vh] bg-gradient-to-b from-[#0d1a14] to-transparent" />
 <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[35vh] bg-gradient-to-t from-[#0d1a14] to-transparent" />
 <div className="absolute inset-0 z-0 bg-[#0d1a14]/20" />
 <div className="container relative z-20 mx-auto px-6 py-28 text-center sm:py-32 md:py-40">
 <div className="mx-auto max-w-3xl rounded-3xl bg-[#0d1a14]/70 p-6 backdrop-blur-sm ring-1 ring-[#d4a24a]/20 sm:p-10 md:p-14">
 <Mountain className="mx-auto mb-6 h-10 w-10 text-[#d4a24a]" />
 <h2 className="font-display text-4xl font-black uppercase leading-[0.95] text-[#f5e9c9] sm:text-5xl md:text-7xl">
 Let's grow in faith
 <span className="mt-2 block italic text-[#7fb069]">together</span>
 </h2>
 <p className="mx-auto mt-8 max-w-xl text-base text-[#f5e9c9]/95 sm:text-lg">
 Beneath wide-open skies and a million stars, hearts learn to listen.
 Bring your kids, bring your friends, bring your wonder.
 </p>
 </div>
 </div>
 </section>

 {/* ========== REGISTER ========== */}
 <section
 id="register"
 className="relative flex min-h-screen items-center overflow-hidden py-28 sm:py-32 md:py-40"
 >
 <div
 className="absolute inset-0 z-0"
 style={{
 backgroundImage: `url(${tentNight})`,
 backgroundSize: "cover",
 backgroundPosition: "center",
 transform: `translate3d(0, ${(scrollY - 3000) * 0.2}px, 0)`,
 }}
 />
 <div className="absolute inset-0 z-0 bg-[#0d1a14]/55" />
 <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[35vh] bg-gradient-to-b from-[#0d1a14] to-transparent" />
 <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[35vh] bg-gradient-to-t from-[#0d1a14] to-transparent" />
 <div className="container relative z-20 mx-auto px-6">
 <div className="mx-auto max-w-2xl">
 <div className="mb-8 rounded-3xl bg-[#0d1a14]/70 px-6 py-6 text-center backdrop-blur-sm ring-1 ring-[#d4a24a]/20">
 <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-[#d4a24a]">
 Sign Up Below
 </p>
 <h2 className="font-display text-4xl font-black uppercase text-[#f5e9c9] md:text-5xl">
 Reserve Your Spot
 </h2>
 <p className="mt-3 text-[#f5e9c9]/90">
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
 </div>

 <div className="space-y-4 pt-2">
 <div className="flex items-center justify-between">
 <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#7fb069]">
 Children Attending
 </h3>
 <span className="text-xs text-[#f5e9c9]/60">
 {children.length} {children.length === 1 ? "child" : "children"}
 </span>
 </div>

 {children.map((child, idx) => (
 <div
 key={idx}
 className="relative rounded-2xl border border-[#d4a24a]/30 bg-[#0d1a14]/60 p-5 backdrop-blur-sm"
 >
 <div className="mb-3 flex items-center justify-between">
 <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#d4a24a]">
 Child {idx + 1}
 </span>
 {children.length > 1 && (
 <button
 type="button"
 onClick={() => removeChild(idx)}
 aria-label={`Remove child ${idx + 1}`}
 className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1b2a1f] text-[#f5e9c9]/70 transition-colors hover:bg-[#e8773a] hover:text-white"
 >
 <X className="h-4 w-4" />
 </button>
 )}
 </div>
 <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_120px]">
 <ChildField
 label="Name"
 value={child.name}
 onChange={(v) => updateChild(idx, "name", v)}
 error={errors[`child-${idx}-name`]}
 />
 <ChildField
 label="Age"
 type="number"
 value={child.age}
 onChange={(v) => updateChild(idx, "age", v)}
 error={errors[`child-${idx}-age`]}
 />
 </div>
 <div className="mt-4">
 <label className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.2em] text-[#d4a24a]">
 Notes / Allergies (optional)
 </label>
 <textarea
 rows={2}
 maxLength={500}
 value={child.notes}
 onChange={(e) => updateChild(idx, "notes", e.target.value)}
 className="w-full rounded-xl border border-[#d4a24a]/30 bg-[#0d1a14]/70 px-4 py-2.5 text-[#f5e9c9] placeholder:text-[#f5e9c9]/40 focus:border-[#d4a24a] focus:outline-none focus:ring-2 focus:ring-[#d4a24a]/50"
 />
 </div>
 </div>
 ))}

 <button
 type="button"
 onClick={addChild}
 className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#7fb069]/50 bg-transparent px-4 py-3 font-display text-sm font-bold uppercase tracking-wider text-[#7fb069] transition-all hover:border-[#7fb069] hover:bg-[#7fb069]/10"
 >
 <Plus className="h-4 w-4" />
 Add Another Child
 </button>
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

 {/* ========== FAQ: Parallax finale ========== */}
 <VbsFaqSection scrollY={scrollY} />
 </div>
 </>
 );
};

const VbsFaqSection = ({ scrollY }: { scrollY: number }) => {
 const faqs = getFaqsForPath("/vacation-bible-school-2026") ?? [];
 if (faqs.length === 0) return null;

 const schema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: faqs.map((it) => ({
 "@type": "Question",
 name: it.question,
 acceptedAnswer: { "@type": "Answer", text: it.answer },
 })),
 };

 return (
 <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0d1a14] py-28 sm:py-32 md:py-40">
 <div
 className="absolute inset-0 z-0"
 style={{
 backgroundImage: `url(${tentNight})`,
 backgroundSize: "cover",
 backgroundPosition: "center",
 transform: `translate3d(0, ${(scrollY - 3800) * 0.25}px, 0) scale(1.1)`,
 }}
 />
 <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[35vh] bg-gradient-to-b from-[#0d1a14] to-transparent" />
 <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[40vh] bg-gradient-to-t from-[#0d1a14] to-transparent" />
 <div className="absolute inset-0 z-0 bg-[#0d1a14]/55" />
 <div className="container relative z-20 mx-auto px-6">
 <div className="mx-auto max-w-3xl">
 <div className="mb-8 rounded-3xl bg-[#0d1a14]/70 px-6 py-6 text-center backdrop-blur-sm ring-1 ring-[#d4a24a]/20">
 <div className="mb-3 flex items-center justify-center gap-3 text-[#7fb069]">
 <HelpCircle className="h-6 w-6" />
 <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-[#d4a24a]">
 Trail Questions
 </span>
 </div>
 <h2 className="font-display text-4xl font-black uppercase text-[#f5e9c9] md:text-5xl">
 Frequently Asked
 <span className="block italic text-[#7fb069]">Questions</span>
 </h2>
 </div>

 <div className="rounded-3xl border border-[#d4a24a]/40 bg-[#1b2a1f]/85 p-6 backdrop-blur md:p-10">
 <Accordion type="single" collapsible className="w-full">
 {faqs.map((it, i) => (
 <AccordionItem
 key={`${i}-${it.question}`}
 value={`vbs-faq-${i}`}
 className="border-b border-[#d4a24a]/20 last:border-b-0"
 >
 <AccordionTrigger className="text-left font-display text-base font-bold uppercase tracking-wide text-[#f5e9c9] hover:text-[#d4a24a] hover:no-underline">
 {it.question}
 </AccordionTrigger>
 <AccordionContent className="text-[#f5e9c9]/85 leading-relaxed">
 {it.answer}
 </AccordionContent>
 </AccordionItem>
 ))}
 </Accordion>
 </div>
 </div>
 </div>
 <Helmet>
 <script type="application/ld+json">{JSON.stringify(schema)}</script>
 </Helmet>
 </section>
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

const ChildField = ({
 label,
 value,
 onChange,
 type = "text",
 error,
}: {
 label: string;
 value: string;
 onChange: (v: string) => void;
 type?: string;
 error?: string;
}) => (
 <div>
 <label className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.2em] text-[#d4a24a]">
 {label}
 </label>
 <input
 type={type}
 value={value}
 onChange={(e) => onChange(e.target.value)}
 maxLength={100}
 className="w-full rounded-xl border border-[#d4a24a]/30 bg-[#0d1a14]/70 px-4 py-2.5 text-[#f5e9c9] placeholder:text-[#f5e9c9]/40 focus:border-[#d4a24a] focus:outline-none focus:ring-2 focus:ring-[#d4a24a]/50"
 />
 {error && <p className="mt-1 text-xs text-[#e8773a]">{error}</p>}
 </div>
);

export default VacationBibleSchool;