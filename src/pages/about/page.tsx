import { Menu } from "../../components/Menu";
import { ContactUsPage } from "../home/subpages/ContactUs";
import Footer from "../../components/Footer";
import AboutUsSection from "./subpage/AboutUsSection";
import EmployeesSection from "./subpage/EmployeesSection";

export const AboutPage = () => {
  return (
    <div className="w-full bg-[#000016] items-center justify-center ">
      <Menu />
      <div className="pt-36 flex flex-col items-center justify-center w-full gap-24">
        <AboutUsSection />
        <EmployeesSection />
        <ContactUsPage />
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
