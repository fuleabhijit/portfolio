"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    console.log("[v0] Setting theme:", isDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    console.log("[v0] Setting up IntersectionObserver")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("[v0] Section intersecting:", entry.target.id)
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    console.log("[v0] Observing sections:", sectionsRef.current.length)
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        console.log("[v0] Observing section:", section.id, "at index:", index)
        observer.observe(section)
      }
    })

    return () => {
      console.log("[v0] Disconnecting observer")
      observer.disconnect()
    }
  }, [])

  const toggleTheme = () => {
    console.log("[v0] Toggling theme from:", isDark ? "dark" : "light")
    setIsDark(!isDark)
  }

  const downloadCV = () => {
    console.log("[v0] Downloading CV")
    try {
      // Create a temporary link element to trigger download
      const link = document.createElement("a")
      link.href = "/cv/Abhijit_Fule_CV.pdf" // You'll need to add your CV file to public/cv/
      link.download = "Abhijit_Fule_CV.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("[v0] CV download triggered successfully")
    } catch (error) {
      console.error("[v0] Error downloading CV:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed top-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={downloadCV}
          className="group p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:border-muted-foreground/50 hover:scale-110 hover:shadow-lg transition-all duration-300"
          aria-label="Download CV"
        >
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>

        <Link
          href="https://www.linkedin.com/in/abhijit-fule"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:border-muted-foreground/50 hover:scale-110 hover:shadow-lg transition-all duration-300"
          aria-label="LinkedIn Profile"
        >
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-[#0077B5] transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </Link>

        <Link
          href="https://github.com/fuleabhijit"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:border-muted-foreground/50 hover:scale-110 hover:shadow-lg transition-all duration-300"
          aria-label="GitHub Profile"
        >
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </Link>

        <Link
          href="mailto:fuleabhijit4@gmail.com"
          className="group p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:border-muted-foreground/50 hover:scale-110 hover:shadow-lg transition-all duration-300"
          aria-label="Email"
        >
          <svg
            className="w-5 h-5 text-muted-foreground group-hover:text-red-500 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </Link>
      </div>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "linkedin", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 hover:scale-110 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider animate-pulse">
                  PORTFOLIO / 2025
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight hover:tracking-wide transition-all duration-700">
                  Abhijit
                  <br />
                  <span className="text-muted-foreground hover:text-foreground transition-colors duration-500">
                    Fule
                  </span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
                  Data Analyst with hands-on experience in
                  <span className="text-foreground hover:scale-105 inline-block transition-transform duration-300">
                    {" "}
                    Python
                  </span>
                  ,
                  <span className="text-foreground hover:scale-105 inline-block transition-transform duration-300">
                    {" "}
                    SQL
                  </span>
                  , and
                  <span className="text-foreground hover:scale-105 inline-block transition-transform duration-300">
                    {" "}
                    data visualization
                  </span>
                  .
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Pune, India</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Computer Science Student</div>
                  <div className="text-muted-foreground">@ Savitribai Phule Pune University</div>
                  <div className="text-xs text-muted-foreground">2023 — 2027</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "SQL", "Power BI", "MongoDB", "Pandas", "NumPy"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 hover:scale-105 hover:shadow-md transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light hover:tracking-wide transition-all duration-500">
                Experience & Education
              </h2>
              <div className="text-sm text-muted-foreground font-mono">2023 — Present</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2024",
                  role: "Team Lead – Data Analytics",
                  company: "Level SuperMind Hackathon",
                  description:
                    "Led a team to the finals by designing and delivering real-time data analytics dashboards and ETL pipelines using modern tech stacks. Presented actionable business insights for improved decision-making.",
                  tech: ["Python", "SQL", "ETL", "Dashboards"],
                },
                {
                  year: "2024",
                  role: "Data Analytics Intern",
                  company: "CodeFlow Studios",
                  description:
                    "Used Python and SQL for data analysis and cleaning. Created scripts to improve data accuracy and consistency. Worked with MongoDB for data access and reporting.",
                  tech: ["Python", "SQL", "MongoDB"],
                },
                {
                  year: "2023",
                  role: "Bachelor of Engineering",
                  company: "Computer Science - Savitribai Phule Pune University",
                  description:
                    "Currently pursuing B.E. in Computer Science with focus on data analytics, machine learning, and software development.",
                  tech: ["Data Science", "Machine Learning", "Software Development"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border hover:bg-muted/10 hover:scale-[1.02] transition-all duration-500 rounded-lg px-4"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-blue-400 transition-colors duration-300">
                        {job.role}
                      </h3>
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {job.company}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg group-hover:text-foreground transition-colors duration-300">
                      {job.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light hover:tracking-wide transition-all duration-500">
              Featured Projects
            </h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Farmer Support Tool",
                  excerpt:
                    "Developed a multilingual dashboard that delivers real-time crop disease diagnoses and market prices using ETL workflows and voice/image inputs for rural accessibility.",
                  date: "2024",
                  tech: "Python, ETL, Voice Recognition",
                  github: "https://github.com/fuleabhijit/AgriMedic-AI",
                },
                {
                  title: "Multi-Agent Stock Analyzer",
                  excerpt:
                    "Created a modular tool that aggregates stock data and sentiment analysis into automated dashboards for efficient stock research.",
                  date: "2024",
                  tech: "Python, Data Analysis, Dashboards",
                  github: "https://github.com/fuleabhijit/level-hack",
                },
                {
                  title: "Data Analytics Dashboard",
                  excerpt:
                    "Built real-time analytics dashboards and ETL pipelines during Level SuperMind Hackathon, leading team to finals.",
                  date: "2024",
                  tech: "ETL, Real-time Analytics",
                  github: "https://github.com/fuleabhijit/level-hack",
                },
                {
                  title: "MongoDB Data Integration",
                  excerpt:
                    "Streamlined data integration processes and improved data accuracy through automated scripts and reporting systems.",
                  date: "2024",
                  tech: "MongoDB, Python, SQL",
                  github: "#",
                },
              ].map((project, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-background hover:bg-muted/5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span className="group-hover:text-foreground transition-colors duration-300">{project.date}</span>
                      <span className="group-hover:text-foreground transition-colors duration-300">{project.tech}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {project.excerpt}
                    </p>

                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <span>View project</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                      <svg
                        className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zm7-4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zm7-4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zm7-4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="linkedin"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light hover:tracking-wide transition-all duration-500">
                LinkedIn Featured
              </h2>
              <Link
                href="https://www.linkedin.com/in/abhijit-fule"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-300"
              >
                <span>View all posts</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>

            <div className="space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl hover:text-foreground transition-colors duration-300">
                Sharing insights about data analytics, career growth, and technology trends. Here are some of my recent
                featured posts from LinkedIn.
              </p>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="border border-border rounded-lg p-4 bg-muted/20 overflow-hidden hover:border-muted-foreground/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-500">
                  <iframe
                    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7356254955336273920?collapsed=1"
                    height="669"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title="LinkedIn Post 1"
                    className="rounded-lg"
                  />
                </div>

                <div className="border border-border rounded-lg p-4 bg-muted/20 overflow-hidden hover:border-muted-foreground/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-500">
                  <iframe
                    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7356908990716350465?collapsed=1"
                    height="669"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title="LinkedIn Post 2"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="text-center pt-8">
                <Link
                  href="https://www.linkedin.com/in/abhijit-fule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <span>View More Posts on LinkedIn</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light hover:tracking-wide transition-all duration-500">
                Let's Connect
              </h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
                  Always interested in new opportunities, collaborations, and conversations about data analytics and
                  technology.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:fuleabhijit4@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-base sm:text-lg">fuleabhijit4@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <Link
                    href="tel:+919322950728"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-base sm:text-lg">+91 93229 50728</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "LinkedIn", handle: "abhijit-fule", url: "https://www.linkedin.com/in/abhijit-fule" },
                  { name: "GitHub", handle: "@abhijitfule", url: "#" },
                  { name: "Email", handle: "fuleabhijit4@gmail.com", url: "mailto:fuleabhijit4@gmail.com" },
                  { name: "Phone", handle: "+91 93229 50728", url: "tel:+919322950728" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="space-y-4 mt-8">
                <div className="text-sm text-muted-foreground font-mono">SKILLS & CERTIFICATIONS</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">Technical Skills</div>
                    <div className="text-xs text-muted-foreground">
                      Python, SQL, Power BI, Excel, MongoDB, Pandas, NumPy, Matplotlib, Seaborn
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Languages</div>
                    <div className="text-xs text-muted-foreground">English, Marathi, Hindi</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Certifications</div>
                    <div className="text-xs text-muted-foreground">
                      LinkedIn Learning, Deloitte Forage, Udemy, HP LIFE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Abhijit Fule. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built by Abhijit Fule</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 hover:scale-110 hover:shadow-lg transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zm7-4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
