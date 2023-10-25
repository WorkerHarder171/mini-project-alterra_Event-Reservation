import Header from "../components/header";
import Footer from "../components/footer";
import CardList from "../components/card-list";
import Jumbotron from "../components/jumbotron";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Jumbotron />
      <p className="p-12 text-center w-3/5 mx-auto md:max-w-3xl sm:max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac
        diam sed arcu iaculis varius. Phasellus vel velit sit amet sapien
        tristique condimentum. Nulla auctor efficitur quam, id tempus odio
        tristique in. Quisque tincidunt, libero nec posuere auctor, arcu sapien
        iaculis neque, eget cursus ex elit eu velit. Nulla facilisi. In hac
        habitasse platea dictumst. Integer et massa ac metus hendrerit
        fringilla. Curabitur in arcu libero. Nulla sed dolor et risus feugiat
        malesuada.
      </p>

      <CardList />

      <Footer />
    </>
  );
};

export default LandingPage;
