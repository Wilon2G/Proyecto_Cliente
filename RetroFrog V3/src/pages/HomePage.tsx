
import { HomeInicio } from "./HomeComponents/MainPage";
import  HomeHeader from "./HomeComponents/HomeHeader"
import HomeNavBar from "./HomeComponents/HomeNavBar";

const Home = () => {
   

    return (
        <>
        <HomeHeader />

        <HomeNavBar />
            
        <HomeInicio />

        </>
    );
}

export default Home;