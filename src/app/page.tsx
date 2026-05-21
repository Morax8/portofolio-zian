import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Research from "@/components/Research";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <TechStack />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
