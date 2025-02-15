import Navbar from '../Navbar' ;
import PropertieDetails from './PropertieDetails';
import Footer from '../Footer' ;

export default function PropertiePage({isAuthenticated, propertie, user}){

    return (
        <>
            {/* Importation du Navbar */}
            <Navbar isAuthenticated={isAuthenticated} widthLimitation={true} />

            {/*  Details du bien */}
            <PropertieDetails propertie={propertie} user={user} />

            {/* Footer */}
            <Footer />
        </>
    );
}