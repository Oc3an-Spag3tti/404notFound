import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DynamicTextSection  from "@/components/DynamicTextSection";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <DynamicTextSection />
        <Carousel />
      </div>
      <Footer />
    </>
  );
}
