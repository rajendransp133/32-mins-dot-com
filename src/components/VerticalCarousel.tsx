import { useState, useEffect, useRef } from "react";

interface CarouselItem {
  title: string;
  description: string;
}

const carouselContent: CarouselItem[] = [
  {
    title: "SMEs Video Production (Offline / Remote)",
    description:
      "We create expert-led videos featuring subject specialists sharing insights. These are crafted using various production techniques for use in training, education, thought leadership, or promotional purposes.",
  },
  {
    title: "Lab & Industry Learning Video Production",
    description:
      "industry settings, simulating real-world scenarios through precise planning, filming, and editing to improve hands-on learning and professional skill development.",
  },
  {
    title: "Case Study Video Production",
    description:
      "We produce narrative-driven videos showcasing customer experiences and product impact, using interviews and storytelling to enhance brand credibility, connect emotionally, and boost audience trust and engagement.",
  },
];

const VerticalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleWidth, setTitleWidth] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoAdvance = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % carouselContent.length
        );
        setIsAnimating(false);
      }, 500);
    }, 4000);
  };

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Track title width to match description width
  useEffect(() => {
    if (!titleRef.current) return;

    const updateWidth = () => {
      if (titleRef.current) {
        setTitleWidth(titleRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateWidth();

    // Use ResizeObserver for more accurate tracking
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(titleRef.current);

    // Also update when currentIndex changes (after animation completes)
    const timeoutId = setTimeout(() => {
      updateWidth();
    }, 600); // After animation completes

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [currentIndex]);

  const handleDotClick = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      // Reset auto-advance timer so it doesn't override the user's click
      startAutoAdvance();
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex h-full gap-4 sm:gap-6 justify-between">
        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <div className="relative flex-1 overflow-hidden min-h-[160px] sm:min-h-[180px] md:h-[200px]">
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                isAnimating
                  ? "opacity-0 transform translate-y-8"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <h4
                  ref={titleRef}
                  className="text-white text-xl sm:text-2xl font-semibold leading-tighter w-fit"
                >
                  {carouselContent[currentIndex].title}
                </h4>
                <p
                  className="text-[#8E8E8E] text-base sm:text-lg font-normal"
                  style={{
                    width: titleWidth ? `${titleWidth}px` : "fit-content",
                    maxWidth: "100%",
                  }}
                >
                  {carouselContent[currentIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Dots Navigation */}
        <div className="flex flex-col gap-1 sm:gap-2 justify-center items-center">
          {carouselContent.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="p-1.5 cursor-pointer flex items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "h-2.5 sm:h-3 w-1 bg-white"
                    : "h-1 w-1 bg-[#8E8E8E]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalCarousel;
