
import { HomeMain } from "../../components/HomeMain";
import HomeHeader from "../../components/HomeHeader";
import HomeNavBar from "../../components/HomeNavBar";
import HomeFooter from "../../components/HomeFooter";


const Home = () => {
   

    return (
        <>
                        <HomeHeader />
        <HomeNavBar />  <HomeMain />
                        <HomeFooter />
        </>
    );
}

export default Home;