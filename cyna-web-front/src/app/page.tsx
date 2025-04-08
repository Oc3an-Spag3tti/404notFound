import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DynamicTextSection from "@/components/DynamicTextSection";
import Carousel from "@/components/Carousel";
import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
  return (
    <>
      <Header />
      <DynamicTextSection />
      <Carousel />
      <CategoriesSection />
      <Footer />
    </>
  );
}
