import { motion } from "framer-motion";
import Slider from "react-slick";

const bannerData = [
  {
    id: 1,
    title: "Master Modern Technologies",
    subtitle: "Learn from industry experts and build real-world projects.",
    image:
      "https://i.postimg.cc/BQcnyLG5/andrew-neel-cckf4-Ts-HAuw-unsplash.jpg",
  },
  {
    id: 2,
    title: "Build Your Career",
    subtitle: "Join our community of learners and get job-ready.",
    image:
      "https://i.postimg.cc/T3mDNY3n/kaitlyn-baker-v-ZJd-Yl5-JVXY-unsplash.jpg",
  },
  {
    id: 3,
    title: "Upgrade Your Skills",
    subtitle: "Courses designed to elevate your potential.",
    image:
      "https://i.postimg.cc/yY4qBPHq/sai-kiran-belana-q-TZ3-N5-G7-YLg-unsplash.jpg",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="relative z-0 mb-8 -mt-3">
      <Slider {...settings}>
        {bannerData.map((slide) => (
          <div key={slide.id}>
            <div
              className="h-[60vh] bg-cover bg-center relative flex items-center justify-center text-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 z-10"></div>

              {/* Animated Content (re-animates due to unique key) */}
              <motion.div
                key={slide.id} // 🔁 Force remount on slide change
                className="relative z-20 text-white max-w-3xl px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2
                  className="text-4xl lg:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  className="text-lg lg:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {slide.subtitle}
                </motion.p>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
