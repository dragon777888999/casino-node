import Link from "next/link";

import { MainPage } from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppRouter = () => {
  return (
    <>
      <div className="body_color">
        <Header />
        <div className="container">
          <Link href="/">
            <MainPage />
          </Link>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppRouter;
