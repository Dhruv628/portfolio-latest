"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import { HiCode, HiColorSwatch, HiServer } from "react-icons/hi";

// Brand colors for each technology
const brandColors = {
  Javascript: "#F7DF1E",
  Typescript: "#3178C6",
  "Next.js": "#FFFFFF",
  "React.js": "#61DAFB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  "Node.js": "#339933",
  "Express.js": "#FFFFFF",
  MongoDB: "#47A248",
  PostgreSQL: "#4169E1",
};

const skillsData = [
  {
    category: "Languages",
    icon: HiCode,
    color: "#A78BFA",
    gradient: "from-violet-500 to-purple-600",
    skills: [
      { name: "Javascript", icon: SiJavascript, level: 90 },
      { name: "Typescript", icon: SiTypescript, level: 85 },
    ],
  },
  {
    category: "Frontend",
    icon: HiColorSwatch,
    color: "#F472B6",
    gradient: "from-pink-500 to-rose-500",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, level: 80 },
      { name: "React.js", icon: SiReact, level: 90 },
      { name: "HTML", icon: SiHtml5, level: 95 },
      { name: "CSS", icon: SiCss3, level: 90 },
    ],
  },
  {
    category: "Backend",
    icon: HiServer,
    color: "#60A5FA",
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 80 },
      { name: "Express.js", icon: SiExpress, level: 75 },
      { name: "MongoDB", icon: SiMongodb, level: 80 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 70 },
    ],
  },
];

// Skill Card with premium hover effects
const SkillCard = ({ skill, index, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const brandColor = brandColors[skill.name] || categoryColor;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Card */}
      <motion.div
        whileHover={{ x: 8 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative flex items-center gap-4 px-4 py-4 rounded-xl border backdrop-blur-sm cursor-default"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, rgba(16, 19, 46, 0.95), rgba(30, 35, 70, 0.9))`
            : "rgba(16, 19, 46, 0.5)",
          borderColor: isHovered ? `${brandColor}40` : "rgba(255,255,255,0.06)",
          boxShadow: isHovered
            ? `0 8px 32px -8px ${brandColor}30, inset 0 1px 0 rgba(255,255,255,0.05)`
            : "inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
      >
        {/* Icon container - More Visual */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative flex-shrink-0"
        >
          {/* Icon glow */}
          <div
            className="absolute inset-0 rounded-xl blur-xl transition-opacity duration-500"
            style={{
              background: brandColor,
              opacity: isHovered ? 0.6 : 0.2,
            }}
          />
          <div
            className="relative rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              height: "3rem",
              width: "3rem",
              background: isHovered
                ? `linear-gradient(135deg, ${brandColor}30, ${brandColor}15)`
                : `linear-gradient(135deg, ${brandColor}15, ${brandColor}08)`,
              border: `1.5px solid ${
                isHovered ? `${brandColor}50` : `${brandColor}20`
              }`,
              boxShadow: isHovered
                ? `0 4px 16px -4px ${brandColor}40, inset 0 1px 0 ${brandColor}20`
                : `inset 0 1px 0 ${brandColor}10`,
            }}
          >
            <skill.icon
              className="transition-all duration-300"
              style={{
                fontSize: "28px",
                color: isHovered ? brandColor : `${brandColor}dd`,
                filter: isHovered
                  ? `drop-shadow(0 0 8px ${brandColor}80)`
                  : "none",
              }}
            />
          </div>
        </motion.div>

        {/* Skill info - Fixed Alignment */}
        <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4
                className="text-white font-semibold text-[15px] transition-colors duration-300 leading-none"
                style={{
                  color: isHovered ? "#fff" : "rgba(255,255,255,0.85)",
                }}
              >
                {skill.name}
              </h4>
              <span
                className="text-[13px] flex font-bold ml-3 transition-colors duration-300 tabular-nums"
                style={{
                  color: isHovered ? brandColor : "rgba(255,255,255,0.4)",
                }}
              >
                {skill.level}%
              </span>
            </div>

            {/* Progress bar – FIXED: use strings "0%" and "90%" */}
            <div
              className="rounded-full overflow-hidden"
              style={{
                height: "7px",
                width: "100%",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <motion.div
                className="rounded-full"
                initial={{ width: "0%", height: "100%" }}
                animate={{ width: isInView ? `${skill.level}%` : "0%" }}
                transition={{
                  duration: 1.5,
                  delay: 0.3 + index * 0.15,
                  ease: "easeOut",
                }}
                style={{
                  background: `linear-gradient(90deg, ${categoryColor}, ${brandColor})`,
                  boxShadow: `0 0 20px ${brandColor}60`,
                }}
              >
                <motion.div className="relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 w-[100px]"
                    style={{
                      height: "100%",
                      width: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    }}
                    animate={{ x: ["-100px", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right arrow indicator */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          className="text-lg flex-shrink-0 ml-2"
          style={{ color: brandColor }}
        >
          →
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Category Card with glass morphism
const CategoryCard = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const CategoryIcon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl blur-2xl transition-all duration-700"
        style={{
          background: `linear-gradient(135deg, ${category.color}40, transparent)`,
          opacity: isHovered ? 0.8 : 0,
        }}
      />

      {/* Card container */}
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full rounded-xl overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 14, 40, 0.9), rgba(4, 7, 29, 0.95))",
          border: `1px solid ${
            isHovered ? `${category.color}30` : "rgba(255,255,255,0.06)"
          }`,
          boxShadow: isHovered
            ? `0 24px 64px -16px ${category.color}25, 0 0 0 1px rgba(255,255,255,0.05)`
            : "0 4px 24px -8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header gradient background */}
        <div
          className="absolute top-0 left-0 right-0 h-24 opacity-50 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% -20%, ${category.color}25 0%, transparent 70%)`,
            opacity: isHovered ? 0.8 : 0.4,
          }}
        />

        {/* Top border glow line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${category.color} 50%, transparent 90%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content padding */}
        <div className="relative z-10 p-5 flex flex-col h-full">
          {/* Category header */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="relative"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute -inset-1 rounded-lg transition-opacity duration-500"
                style={{
                  background: `conic-gradient(from 0deg, ${category.color}, transparent 30%, transparent 70%, ${category.color})`,
                  opacity: isHovered ? 1 : 0.3,
                }}
              />
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(10, 14, 40, 1), rgba(20, 25, 60, 1))",
                }}
              >
                <CategoryIcon
                  className="text-xl transition-all duration-500"
                  style={{
                    color: category.color,
                    filter: isHovered
                      ? `drop-shadow(0 0 20px ${category.color})`
                      : "none",
                  }}
                />
              </motion.div>
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-lg font-bold text-white tracking-tight leading-tight"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {category.category}
              </motion.h3>
              <p className="text-gray-500 text-xs font-medium">
                {category.skills.length} technologies
              </p>
            </div>
          </div>

          {/* Skills list */}
          <div className="flex flex-col gap-3 flex-1">
            {category.skills.map((skill, skillIndex) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={skillIndex}
                categoryColor={category.color}
              />
            ))}
          </div>

          {/* Bottom decorative gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${category.color}08, transparent)`,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          />
        </div>

        {/* Floating orb decoration */}
        <motion.div
          className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: category.color }}
          animate={{
            opacity: isHovered ? 0.15 : 0.05,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-16 w-full relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px]" />
      </div>

      {/* <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      /> */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 relative z-10 py-6 px-4"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 border border-purple-500/20"
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            color: "#A78BFA",
          }}
        >
          ✨ Skills & Expertise
        </motion.span>

        <h1 className="heading mb-3">
          My <span className="text-purple">Technical Skills</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Technologies I master to transform ideas into exceptional digital
          experiences
        </p>
      </motion.div>

      <div
        className="relative z-10"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          padding: "0 1rem",
          margin: "0 auto",
          maxWidth: "100%",
        }}
      >
        {skillsData.map((category, idx) => (
          <CategoryCard
            key={category.category}
            category={category}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
