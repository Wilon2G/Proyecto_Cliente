import { HomeMain } from '../../components/HomeBox/HomeMain';
import HomeHeader from '../../components/HomeBox/HomeHeader';
import HomeNavBar from '../../components/HomeBox/HomeNavBar';
import HomeFooter from '../../components/HomeBox/HomeFooter';

const Home = () => {
  return (
    <>
      <HomeHeader />
      <HomeNavBar />
      <HomeMain />
      <HomeFooter />
    </>
  );
};

export default Home;
