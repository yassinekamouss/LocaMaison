import React from "react";
import Navbar from "../Navbar";
import Annonces from "./Annonces";
import Footer from "../Footer";

export default function MesAnnoncesPage({isAuthenticated, annonces}){

  return (
    <>
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} widthLimitation={true}/>

      {/* Mes annonces */}
      <Annonces annonces={annonces} />

      {/* Footer */}
      <Footer />
    </>
  );
}