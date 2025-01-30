import Navbar from "../Navbar";
import AccueilLocations from "./AccueilLocations";
import Footer from "../Footer";

export default function Home({ isAuthenticated }) {
  return (
    <>
      {/* Importation de NavBar */}
      <Navbar isAuthenticated={false} widthLimitation={true} />

      {/* Indication pour motivier les visiteurs de créer un compte */}
      {!isAuthenticated && (
        <section className="relative bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-6 text-center relative">
            <h2 className="text-5xl font-bold leading-tight mb-4">
              Publiez votre annonce et atteignez des locataires !{" "}
            </h2>
            <p className="text-xl mb-8">
              Vous avez une maison, un appartement ou une villa à louer ?
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition">
              Publier d'ici
            </button>
          </div>
        </section>
      )}

      {/* Importation de liste des biens */}
      <AccueilLocations />

      {/* Footer */}
      <Footer />
    </>
  );
}
