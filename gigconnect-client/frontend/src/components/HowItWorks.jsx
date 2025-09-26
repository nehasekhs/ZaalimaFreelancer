import React from "react";
import { FilePlus2, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Post a Gig",
    description: "Create your gig request and describe exactly what you need.",
    icon: <FilePlus2 size={32} />,
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Hire Freelancers",
    description: "Browse professionals, compare proposals, and pick the best fit.",
    icon: <Users size={32} />,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Get Work Done",
    description: "Receive quality work, communicate seamlessly, and scale easily.",
    icon: <CheckCircle size={32} />,
    color: "from-green-500 to-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-950 text-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg">
            Simple steps to hire talent and get your projects done
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-900 border border-gray-800 shadow-lg hover:-translate-y-2 hover:shadow-xl transition transform"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} text-white shadow-lg mb-6`}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Accent (gradient blob) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
    </section>
  );
}
