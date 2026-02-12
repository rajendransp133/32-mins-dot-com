import VerticalCarousel from "./VerticalCarousel";
import { motion } from "framer-motion";

interface ServiceCard {
  title: string;
  description: string;
}

const SERVICES: ServiceCard[] = [
  {
    title: "Digital Media Production",
    description:
      "We produce videos, photos, and audio content through pre, post, and live production stages using advanced technologies to deliver compelling multimedia tailored for diverse audiences and digital platforms.",
  },
  {
    title: "eLearning Production",
    description:
      "We design and develop media-rich, interactive online learning using instructional design, content analysis, and technology to create engaging educational experiences tailored to different audiences and academic or professional goals.",
  },
  {
    title: "Lab & Industry Learning Video Production",
    description:
      "industry settings, simulating real-world scenarios through precise planning, filming, and editing to improve hands-on learning and professional skill development.",
  },
  {
    title: "Media Content Marketing",
    description:
      "We build brand presence through high-quality media content, using strategy, storytelling, and distribution across platforms to attract, engage, and convert audiences with relevant, consistent messaging.",
  },
  {
    title: "eLearning Consulting",
    description:
      "We guide organisations in creating effective e-learning solutions, from analysing training needs to designing content strategies, selecting tools, and assessing outcomes for long-term impact and learner success.",
  },
  {
    title: "LMS Management",
    description:
      "We manage and maintain learning platforms, ensuring seamless content delivery, user organisation, performance tracking, and system reliability to support smooth educational experiences and learner progression.",
  },
];

const GRID_LAYOUT = [
  { service: 0, cols: "sm:col-span-2 md:col-span-2 lg:col-span-3" },
  { service: 1, cols: "sm:col-span-2 md:col-span-2 lg:col-span-3" },
  { carousel: true, cols: "sm:col-span-2 md:col-span-4 lg:col-span-4" },
  {
    service: 3,
    cols: "sm:col-span-2 md:col-span-2 lg:col-span-2",
    rows: "sm:row-span-2",
  },
  { service: 4, cols: "sm:col-span-1 md:col-span-2 lg:col-span-2" },
  { service: 5, cols: "sm:col-span-1 md:col-span-2 lg:col-span-2" },
];

const cardAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
  viewport: { once: true, amount: 0.5 },
};

const ServiceCard = ({ title, description }: ServiceCard) => (
  <div className="flex flex-col gap-3 sm:gap-4">
    <h3 className="text-white text-xl sm:text-2xl font-semibold leading-tighter w-fit">
      {title}
    </h3>
    <p className="text-[#8E8E8E] text-base sm:text-lg font-normal">
      {description}
    </p>
  </div>
);

const Grid = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-[minmax(180px,auto)] sm:auto-rows-[minmax(200px,auto)]">
        {GRID_LAYOUT.map((item, index) => (
          <motion.div
            key={index}
            {...cardAnimation}
            className={`col-span-1 ${item.rows || "row-span-1"} ${item.cols}`}
          >
            <div
              className={`relative bg-[#0A0A0A] rounded-[15px] p-5 sm:p-6 md:p-7.5 flex flex-col h-full ${
                item.carousel
                  ? "justify-center gap-4"
                  : "justify-start items-start"
              }`}
            >
              {item.carousel ? (
                <VerticalCarousel />
              ) : (
                <ServiceCard {...SERVICES[item.service!]} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
