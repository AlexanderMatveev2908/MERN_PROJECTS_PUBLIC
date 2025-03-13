import BestSellerProducts from "../../components/BestSellerProducts/BestSellerProducts";
import Hero from "../../components/Hero/Hero";
import LatestCollection from "../../components/LatestCollection/LatestCollection";
import NewsletterBox from "../../components/NewsletterBox/NewsletterBox";
import Policy from "../../components/Policy/Policy";
import { useGlobal } from "../../hooks/useGlobal";

const Home = () => {
  const { latestProducts, productsLoading, bestSellerProducts } = useGlobal();

  return (
    <div>
      <Hero />

      <LatestCollection {...{ latestProducts, productsLoading }} />

      <BestSellerProducts {...{ bestSellerProducts, productsLoading }} />

      <Policy />

      <NewsletterBox />
    </div>
  );
};
export default Home;
