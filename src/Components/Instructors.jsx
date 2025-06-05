import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    setInstructors([
      {
        id: 1,
        name: "KHAIRUL IR.",
        title: "MERN Stack Expert",
        photo:
          "https://i.postimg.cc/pTLyKkCX/Whats-App-Image-2025-06-05-at-23-22-31-03a014f4.jpg",
        bio: "10+ years in full stack web development.",
      },
      {
        id: 2,
        name: "HR. SAJIB",
        title: "Frontend Developer",
        photo:
          "https://i.postimg.cc/1RMrxY2M/Whats-App-Image-2025-06-05-at-23-22-07-62a5eb6e.jpg",
        bio: "Specialist in React, Tailwind & animation.",
      },
      {
        id: 3,
        name: "UDOY DV.",
        title: "Data Scientist & AI Researcher",
        photo:
          "https://i.postimg.cc/rFXMkQ40/Whats-App-Image-2025-06-05-at-23-21-02-275b50a8.jpg",
        bio: "Worked with top AI teams globally.",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen px-4 lg:px-0 py-8">
      <h2 className="text-3xl font-bold text-center text-zinc-800 mb-8">
        Meet Our Instructors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {instructors.map((ins, index) => (
          <motion.div
            key={ins.id}
            className="bg-white shadow-md shadow-purple-300 p-6 text-center hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={ins.photo}
              alt={ins.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-600 object-cover"
            />
            <h3 className="text-xl font-semibold text-zinc-800">{ins.name}</h3>
            <p className="text-sm text-purple-600 font-medium">{ins.title}</p>
            <p className="text-zinc-600 text-sm mt-2">{ins.bio}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
