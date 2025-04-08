import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
// import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <Carousel />
      </main>
      <Footer />
    </div>
  );
}
