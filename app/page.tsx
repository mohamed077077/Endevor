import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Tech } from "@/components/Tech";
import { Pricing } from "@/components/Pricing";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Services />
        <Work />
        <Tech />
        <Pricing />
        <Closing />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}