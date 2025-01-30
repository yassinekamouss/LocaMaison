import React from "react";
import Navbar from "../Navbar" ;
import Publier from "../Publier";

export default function NewAnnoncesPage({isAuthenticated}){

    return (
        <>
            {/* Importation de navbar */}
            <Navbar isAuthenticated={isAuthenticated} widthLimitation={true}/>

            {/* Importation des form: */}
            <Publier />
        </>
    );
}