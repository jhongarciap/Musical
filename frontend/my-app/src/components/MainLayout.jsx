/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Favorites from "./Favorites";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="flex overflow-hidden flex-col bg-indigo-900">
      <Header />
      <main>
        <Hero />
        <Favorites />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;