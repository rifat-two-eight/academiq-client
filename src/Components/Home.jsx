import HeroSlider from "./HeroSlider";
import LatestCourses from "./LatestCourses";
import PopularCourses from "./PopularCourses";
import Skills from "./Skills";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <LatestCourses></LatestCourses>
      <PopularCourses></PopularCourses>
      <Testimonials></Testimonials>
      <Skills></Skills>
    </div>
  );
};

export default Home;
