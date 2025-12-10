"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  const [clickedTech, setClickedTech] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [buttonsEnabled, setButtonsEnabled] = useState<number | null>(null);

  const handleTechClick = (projectId: number, techName: string) => {
    const key = `${projectId}-${techName}`;
    setClickedTech(clickedTech === key ? null : key);
  };

  const handleCardActivation = (projectId: number) => {
    if (activeCard !== projectId) {
      setActiveCard(projectId);
      // Enable buttons after 300ms delay
      setTimeout(() => {
        setButtonsEnabled(projectId);
      }, 300);
    }
  };

  const handleCardDeactivation = () => {
    setActiveCard(null);
    setButtonsEnabled(null);
  };

  return (
    <div id="projects" className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
            key={item.id}
            onMouseEnter={() => handleCardActivation(item.id)}
            onMouseLeave={handleCardDeactivation}
            onClick={() => handleCardActivation(item.id)}
          >
            <PinContainer
              title={item.titleSmall}
              href={item.link}
              overlay={
                <div className="absolute w-full top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 pointer-events-none group-hover/pin:pointer-events-auto">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-[15%] mb-4 relative z-[100]">
                    {item.iconLists.map((tech, index) => {
                      const techKey = `${item.id}-${tech.name}`;
                      const isClicked = clickedTech === techKey;

                      return (
                        <div
                          key={index}
                          className="group/tech relative border border-white/[.3] rounded-full bg-black/80 backdrop-blur-sm lg:w-12 lg:h-12 w-10 h-10 flex justify-center items-center transition-all duration-300 hover:scale-110 hover:border-purple/[0.5] pointer-events-auto cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleTechClick(item.id, tech.name);
                          }}
                        >
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-6 h-6 lg:w-7 lg:h-7 object-contain"
                          />
                          {/* Tooltip - shows on hover OR click */}
                          <div
                            className={`absolute -top-9 left-1/2 -translate-x-1/2 ${
                              isClicked
                                ? "opacity-100"
                                : "opacity-0 group-hover/tech:opacity-100"
                            } transition-opacity duration-200 pointer-events-none z-[100]`}
                          >
                            <span className="text-xs text-white bg-black/95 backdrop-blur-sm px-3 py-1.5 rounded-md whitespace-nowrap border border-purple/[0.3]">
                              {tech.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-center gap-4 mt-2 relative z-[100]">
                    <button
                      type="button"
                      disabled={buttonsEnabled !== item.id}
                      className={`flex items-center gap-2 px-4 py-2 text-xs rounded-md bg-[#10132E]/90 backdrop-blur-sm border border-white/[0.2] hover:border-purple/[0.5] transition-all duration-300 hover:scale-105 ${
                        buttonsEnabled === item.id
                          ? "cursor-pointer opacity-100"
                          : "cursor-not-allowed opacity-50"
                      }`}
                      onClick={(e) => {
                        if (buttonsEnabled === item.id) {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(item.github, "_blank");
                        }
                      }}
                    >
                      <FaGithub className="text-lg" color="#CBACF9" />
                      <span className="text-white font-medium">GitHub</span>
                    </button>

                    <button
                      type="button"
                      disabled={buttonsEnabled !== item.id}
                      className={`flex items-center gap-2 px-4 py-2 text-xs rounded-md bg-[#10132E]/90 backdrop-blur-sm border border-white/[0.2] hover:border-purple/[0.5] transition-all duration-300 hover:scale-105 ${
                        buttonsEnabled === item.id
                          ? "cursor-pointer opacity-100"
                          : "cursor-not-allowed opacity-50"
                      }`}
                      onClick={(e) => {
                        if (buttonsEnabled === item.id) {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(item.link, "_blank");
                        }
                      }}
                    >
                      <FaLocationArrow className="text-lg" color="#CBACF9" />
                      <span className="text-white font-medium">View</span>
                    </button>
                  </div>
                </div>
              }
            >
              <div className="relative flex items-center justify-center w-full overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute scale-110 inset-0 w-full h-full object-cover transition-all duration-300 group-hover/pin:opacity-20"
                />
              </div>{" "}
              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>
              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>
              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex flex-wrap justify-center items-center">
                  {item.iconLists.map((tech, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={tech.icon} alt={tech.name} className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-base font-semibold md:text-xs text-sm text-purple">
                    Live
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
