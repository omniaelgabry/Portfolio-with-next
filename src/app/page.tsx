import IntroLoader from "@/components/IntroLoader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <IntroLoader />
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
}
