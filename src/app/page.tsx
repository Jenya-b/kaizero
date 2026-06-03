import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { Benefits } from "@/components/sections/Benefits/Benefits";
import { ContactForm } from "@/components/sections/ContactForm/ContactForm";
import { FAQ } from "@/components/sections/FAQ/FAQ";
import { Hero } from "@/components/sections/Hero/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks/HowItWorks";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp/WhoWeHelp";
import { WorkFormats } from "@/components/sections/WorkFormats/WorkFormats";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhoWeHelp />
        <HowItWorks />
        <Benefits />
        <WorkFormats />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
