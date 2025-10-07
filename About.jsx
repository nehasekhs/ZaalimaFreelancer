import React from "react";
import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  return (
    <section className="about-section">
      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="highlight">Gig</span>
        </motion.h1>

        <motion.p
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        > Gig is a modern platform designed to bridge the gap between <b>freelancers,companies and instituition.</b> 
          Gig provide a secure , transparent and dynamic space to connect , collaboration and grow.
          Gig connects freelancers and clients seamlessly. Our platform ensures 
          smooth collaboration, transparent payments, and powerful tools to 
          help you grow. We’re committed to making freelance work easier, 
          smarter, and more impactful.
        </motion.p>

        <motion.div
          className="about-features"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="feature-card">
            <h3>Reliable</h3>
            <p>We ensure secure payments and verified profiles.</p>
          </div>
          <div className="feature-card">
            <h3>Fast</h3>
            <p>Find the right talent or project quickly and easily.</p>
          </div>
          <div className="feature-card">
            <h3>Transparent</h3>
            <p>Clear communication and project tracking at every step.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}