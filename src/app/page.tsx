import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* section divider */}
        <SectionDivider />
        <About />
        <SectionDivider />
        <ExperienceTimeline />
        <SectionDivider />
        <Projects />
        <Research />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/** Hairline divider with a centered tactical marker between sections. */
function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 md:px-12 lg:px-20">
      <span className="h-px flex-1 bg-white/5" />
      <span className="h-1.5 w-1.5 rotate-45 bg-crimson/40" />
      <span className="h-px flex-1 bg-white/5" />
    </div>
  );
}
