
import { HomeMain } from "./HomeComponents/HomeMain";
import  HomeHeader from "./HomeComponents/HomeHeader";
import HomeNavBar from "./HomeComponents/HomeNavBar";
import HomeFooter from "./HomeComponents/HomeFooter";


const Home = () => {
   

    return (
        <>
        <HomeHeader />

        <HomeNavBar />
            
        <HomeMain />

        <HomeFooter />
        </>
    );
}

export default Home;