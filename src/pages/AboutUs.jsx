import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Deepak Sharma",
    role: "Full-Stack Developer",
    Stack: "MERN-Stack + UI(TailwindCSS, ShadCN)",
    description:
      "Led the complete development of mindlet Blog, handling both frontend and backend with consistency and precision.\n\n Took ownership of integrations, deployment, and technical decisions that shaped the core functionality of the platform.",
    image: "/manager.png", 
  },
  {
    name: "Kashish Garg",
    role: "Strategist & Creative Collaborator",
    description:
      "A non-technical yet indispensable contributor to mindletBlog — offering valuable support during initial project planning, flow, and UI to refine the platform’s looks.\n\nA silent force behind the scenes, ensuring things always moved in the right direction.",
    image: "/bussiness-man.png", 
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-black text-white px-6 py-20 min-h-screen">
      <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-orange-400 mb-12 drop-shadow-orange-500 shadow-lg">
        Welcome to <span className="text-orange-500">MindletBlog</span> 👋
      </h2>

      <p className="text-center text-md sm:text-lg text-gray-400 max-w-2xl mx-auto mb-16 font-medium">
        A creative hub by <span className="text-orange-300 font-semibold">~Team KDee</span> where ideas bloom & design shines ✨
      </p>

      <div className="grid gap-10 sm:grid-cols-2 max-w-6xl mx-auto px-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#1c1c1e] border border-orange-600/40 rounded-2xl shadow-md shadow-orange-900/20 hover:shadow-orange-400/20 transition duration-300 group">
              <CardHeader className="flex flex-col items-center pt-8">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full ring-4 ring-orange-400 shadow-lg mb-4 transition-transform group-hover:scale-105"
                />
                <CardTitle className="text-2xl font-bold text-orange-400 group-hover:text-orange-500">
                  {member.name}
                </CardTitle>
                <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                  {member.role}
                </p>
              </CardHeader>

              <CardContent className="text-center pb-8 px-6 space-y-2">
                {member.description.split("\n\n").map((text, idx) => (
                  <p
                    key={idx}
                    className={`text-sm leading-relaxed transition ${
                      idx === 1
                        ? "text-white font-semibold mt-3"
                        : "text-gray-300 group-hover:text-gray-200"
                    }`}
                  >
                    {text}
                  </p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center text-sm text-orange-500 italic tracking-wide">
        🙏 Crafted with love by <span className="font-semibold text-orange-400">Team </span> — <span className=" font-bold text-orange-400">mindletBlog</span>
      </div>
    </div>
  );
};

export default AboutUs;
