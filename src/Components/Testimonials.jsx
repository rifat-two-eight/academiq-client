import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aisha Khan",
    course: "Full-Stack Web Development",
    review:
      "The course was structured so well. I landed a job 2 weeks after completing it!",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Ravi Patel",
    course: "UI/UX Design",
    review:
      "Instructors were top-notch. Loved the projects and feedback sessions.",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sara Li",
    course: "Data Science Bootcamp",
    review:
      "Hands-on learning with real datasets. Helped me crack my internship.",
    image: "https://i.pravatar.cc/100?img=32",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-zinc-800 mb-4"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Students Say
        </motion.h2>
        <motion.p
          className="text-zinc-600 mb-5 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Real stories from real learners — here’s what our students have to
          say.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg shadow-purple-300 p-6 text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-600"
                />
                <div>
                  <h4 className="font-semibold text-zinc-800">{t.name}</h4>
                  <p className="text-sm text-zinc-500">{t.course}</p>
                </div>
              </div>
              <p className="text-zinc-700">“{t.review}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
