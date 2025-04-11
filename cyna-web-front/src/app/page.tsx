import Carousel from "@/components/Carousel";
// import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center">
        <Carousel />
      </main>
    </div>
  );
}
