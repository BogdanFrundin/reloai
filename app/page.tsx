import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Stats from "./_components/Stats";
import HowItWorks from "./_components/HowItWorks";
import Features from "./_components/Features";
import Countries from "./_components/Countries";
import Pricing from "./_components/Pricing";
import Reviews from "./_components/Reviews";
import Footer from "./_components/Footer";
import PageTransition from "./_components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Stats />
          <HowItWorks />
          <Countries />
          <Features />
          <Pricing />
          <Reviews />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
