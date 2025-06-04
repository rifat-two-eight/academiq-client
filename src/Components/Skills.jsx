import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaChartLine, FaLightbulb } from "react-icons/fa";

const skills = [
  { icon: <FaCode />, title: "Web Development" },
  { icon: <FaLaptopCode />, title: "Front-End Design" },
  { icon: <FaChartLine />, title: "Data Analysis" },
  { icon: <FaLightbulb />, title: "Problem Solving" },
];

const Skills = () => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-zinc-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills You’ll Gain
        </motion.h2>
        <motion.p
          className="text-zinc-600 mb-5 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Every course is designed to give you career-boosting technical and
          soft skills.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="p-6 bg-purple-50 hover:bg-purple-100 transition flex flex-col items-center justify-center shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="text-purple-700 text-4xl mb-2">{skill.icon}</div>
              <h4 className="text-zinc-800 font-semibold text-lg">
                {skill.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
