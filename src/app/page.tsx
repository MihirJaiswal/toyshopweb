import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomePageSection from "@/components/Hero";
import Popular from "@/components/Popular";
import Toy from "@/components/Toy";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header/>
      <div className="md:max-w-7xl mt-24 ">
       <HomePageSection/>
      <Toy/>
      <Category/>
      <Popular/>
      </div>
      <Footer/>
    </div>
  );
}
