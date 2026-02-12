import { motion } from "framer-motion";

export default function Marquee() {
  const images = [
    "./chai.webp",
    "./digivisicom.webp",
    "./fundaspring.webp",
    "./iitmadras.webp",
    "./iitmpravartak.webp",
    "./rajendental.webp",
    "./shaktidb.webp",
    "./swayam.webp",
    "./thsti.webp",
    "./virginiatech.webp",
  ];

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...images, ...images].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`marquee-${index}`}
            className="h-[50px] w-[200px] object-contain pr-8"
          />
        ))}
      </motion.div>
    </div>
  );
}
