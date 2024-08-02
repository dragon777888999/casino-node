import Link from "next/link";

import { MainPage } from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppRouter = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Link href="/">
          <MainPage />
        </Link>

        <Footer />
      </div>
    </>
  );
};

export default AppRouter;
