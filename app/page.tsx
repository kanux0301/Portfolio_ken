'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  Zap, 
  Workflow,
  Rocket,
  DollarSign,
  Droplet,
  RefreshCw,
  BarChart3,
  Car,
  ClipboardList,
  Gamepad2,
  Dumbbell,
  Waves,
  Wind,
  Users,
  Scale,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Volleyball,
  Trophy
} from 'lucide-react';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    '.NET Developer',
    'IoT Specialist',
    'Microservices Architect',
    'Cloud Engineer',
    'Problem Solver'
  ];

  // Typing effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setTypedText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    document.querySelectorAll(`.${styles.fadeIn}, .${styles.skillItem}`).forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax effect
  useEffect(() => {
    const hero = document.querySelector(`.${styles.heroContent}`) as HTMLElement | null
    if (!hero) return

    const isMobile = window.innerWidth <= 768
    const speed = isMobile ? 0.25 : 0.5
    const fadeDistance = isMobile ? 350 : 700

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * speed}px)`
        hero.style.opacity = `${1 - scrolled / fadeDistance}`
      }
    }

   window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Parallax effect - arrow down
  useEffect(() => {
    const hero = document.querySelector(`.${styles.scrollIndicator}`) as HTMLElement | null
    if (!hero) return

    const isMobile = window.innerWidth <= 768
    const speed = isMobile ? 0.25 : 0.5
    const fadeDistance = isMobile ? 350 : 700

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * speed}px)`
        hero.style.opacity = `${1 - scrolled / fadeDistance}`
      }
    }

   window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skills = [
    {
      category: 'Core Expertise',
      items: [
        { name: 'C# & .NET Core/Framework', level: 'Expert', width: 95 },
        { name: 'ASP.NET Core (MVC, Web API)', level: 'Advanced', width: 90 },
        { name: 'Microservices Architecture', level: 'Advanced', width: 85 },
        { name: 'Entity Framework Core', level: 'Advanced', width: 88 }
      ]
    },
    {
      category: 'Cloud & DevOps',
      items: [
        { name: 'Microsoft Azure', level: 'Advanced', width: 85 },
        { name: 'Docker & Kubernetes', level: 'Intermediate', width: 80 },
        { name: 'Azure DevOps & CI/CD', level: 'Advanced', width: 82 }
      ]
    },
    {
      category: 'Databases & Tools',
      items: [
        { name: 'MS SQL Server', level: 'Expert', width: 90 },
        { name: 'Git & Version Control', level: 'Advanced', width: 85 }
      ]
    }
  ];

  const projects = [
    {
      icon: <DollarSign size={48} strokeWidth={1.5} />,
      title: 'Asset & Liability Management System',
      company: 'Security Bank Corporation',
      description: 'Enterprise-grade forecasting system projecting cashflows for assets and liabilities, enabling strategic financial risk management.',
      tags: ['C#', '.NET Framework', 'MS SQL', 'Financial Modeling'],
      stats: [
        { icon: <Zap size={16} />, text: 'Real-time processing' },
        { icon: <Rocket size={16} />, text: 'OSAM Award Winner' }
      ]
    },
    {
      icon: <Droplet size={48} strokeWidth={1.5} />,
      title: 'IoT Notification & Firmware Service',
      company: 'Grundfos Philippines',
      description: 'Microservices architecture handling real-time notifications and OTA firmware updates for thousands of industrial water pumps.',
      tags: ['ASP.NET Core', 'Microservices', 'Kubernetes', 'Azure'],
      stats: [
        { icon: <Rocket size={16} />, text: 'Zero-downtime deployment' },
        { icon: <Server size={16} />, text: '1000+ devices' }
      ]
    },
    {
      icon: <RefreshCw size={48} strokeWidth={1.5} />,
      title: 'Bank Reconciliation System',
      company: 'Security Bank Corporation',
      description: 'Automated reconciliation matching inter-bank statements against general ledgers, reducing manual processing by 80%.',
      tags: ['C#', 'Visual Studio', 'SQL Server', 'Data Processing'],
      stats: [
        { icon: <Zap size={16} />, text: '80% time saved' },
        { icon: <Database size={16} />, text: '99.9% accuracy' }
      ]
    },
    {
      icon: <BarChart3 size={48} strokeWidth={1.5} />,
      title: 'Data Collection Application',
      company: 'Institutional Shareholder Services',
      description: 'Enterprise tool with comprehensive change logging and audit trails using VSTO and MVVM architecture.',
      tags: ['VSTO', 'C#', 'MVVM', 'Office Integration'],
      stats: [
        { icon: <ClipboardList size={16} />, text: 'Full audit trail' },
        { icon: <Zap size={16} />, text: 'High performance' }
      ]
    },
    {
      icon: <Car size={48} strokeWidth={1.5} />,
      title: 'FleetHQ Call Center Platform',
      company: 'Goodyear Philippines',
      description: 'Customer service platform for fleet management, optimizing call handling and satisfaction metrics.',
      tags: ['ASP.NET', 'C#', 'Web Development'],
      stats: [
        { icon: <Phone size={16} />, text: 'Peak load optimized' },
        { icon: <Users size={16} />, text: 'Multi-user support' }
      ]
    },
    {
      icon: <ClipboardList size={48} strokeWidth={1.5} />,
      title: 'Issue Tracking System',
      company: 'Security Bank Corporation',
      description: 'Custom project management system streamlining collaboration across multiple banking teams.',
      tags: ['Visual Studio', 'C#', 'MS SQL'],
      stats: [
        { icon: <RefreshCw size={16} />, text: 'Flexible workflows' },
        { icon: <Users size={16} />, text: 'Team collaboration' }
      ]
    }
  ];

  const experience = [
    {
      title: 'IoT Application Developer',
      company: 'Grundfos IS Support & Operations Centre Philippines Inc.',
      period: '2022 - Present',
      responsibilities: [
        'Developed notification services and firmware updating applications for industrial IoT devices',
        'Led cluster migration using Azure DevOps and Kubernetes across all supported applications',
        'Built and maintained microservices architecture with RESTful APIs and MVC applications',
        'Collaborated with international teams delivering IoT solutions to global markets'
      ]
    },
    {
      title: 'Digital Developer',
      company: 'Goodyear Philippines',
      period: '2022',
      responsibilities: [
        'Enhanced FleetHQ call center application using ASP.NET',
        'Improved application performance and user experience',
        'Maintained customer-facing applications with high availability'
      ]
    },
    {
      title: 'Application Developer',
      company: 'Institutional Shareholder Services (ISS)',
      period: '2019 - 2022',
      responsibilities: [
        'Developed comprehensive change log feature tracking all user modifications',
        'Enhanced data collection applications using VSTO, C#, and MVVM patterns',
        'Delivered productivity improvements and data accuracy enhancements'
      ]
    },
    {
      title: 'Programmer / System Analyst',
      company: 'Security Bank Corporation',
      period: '2015 - 2019',
      responsibilities: [
        'Technical Lead for Asset and Liability Management System (ALM) project',
        'Developed bank reconciliation program processing inter-bank transactions',
        'Built issue tracking system for complex banking projects',
        'Maintained treasury system and third-party integrations',
        'Received OSAM Award (bank-wide rookie award) - March 2016'
      ]
    }
  ];

  const techStack = [
    { icon: <Zap size={32} />, name: 'C#' },
    { icon: <Code2 size={32} />, name: '.NET Core' },
    { icon: <Cloud size={32} />, name: 'Azure' },
    { icon: <Server size={32} />, name: 'Docker' },
    { icon: <Workflow size={32} />, name: 'Kubernetes' },
    { icon: <Database size={32} />, name: 'SQL Server' },
    { icon: <RefreshCw size={32} />, name: 'Microservices' },
    { icon: <Rocket size={32} />, name: 'ASP.NET Core' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bgAnimation}></div>

      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>KA</div>
          <ul className={styles.navList}>
            <li><button onClick={() => scrollToSection('home')}>Home</button></li>
            <li><button onClick={() => scrollToSection('about')}>About</button></li>
            <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
            <li><button onClick={() => scrollToSection('experience')}>Experience</button></li>
            <li><button onClick={() => scrollToSection('hobbies')}>Hobbies</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          </ul>
        </div>
      </nav>

      <section id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>Available for new opportunities!</div>
          <h1>Hi, I'm Kenneth Ajero</h1>
          <div className={styles.typingText}>
            {typedText}<span className={styles.typingCursor}>|</span>
          </div>
          <p>Building scalable enterprise applications and microservices with C#, ASP.NET Core, and Azure. Transforming complex business requirements into elegant, high-performance solutions.</p>
          <div className={styles.ctaButtons}>
            <button onClick={() => scrollToSection('projects')} className={styles.btnPrimary}>
              View My Work →
            </button>
            <button onClick={() => scrollToSection('contact')} className={styles.btnSecondary}>
              Get In Touch
            </button>
          </div>
        </div>
        <div className={styles.scrollIndicator}></div>
      </section>

      <div className={styles.techStackSection}>
        <div className={styles.techMarquee}>
          {[...techStack, ...techStack].map((tech, idx) => (
            <div key={idx} className={styles.techItem}>
              <span className={styles.techIcon}>{tech.icon}</span> {tech.name}
            </div>
          ))}
        </div>
      </div>

      <section id="about" className={styles.section}>
        <h2>Bio</h2>
        
        <div className={`${styles.aboutStory} ${styles.fadeIn}`}>
          <p className={styles.storyParagraph}>
            A .NET-focused engineer who has built systems across banking, data analytics, automotive tech, and IoT. I specialize in cloud-native architecture, microservices, and scalable enterprise platforms.  
          </p>
          
          <p className={styles.storyParagraph}>
            I love solving problems, modernizing applications, and creating solutions that deliver meaningful impact. Always learning. Always building.
          </p>
        </div>

        <div className={`${styles.statsGrid} ${styles.fadeIn}`}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>9+</div>
            <div className={styles.statLabel}>Years Experience</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>15+</div>
            <div className={styles.statLabel}>Projects Delivered</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>4</div>
            <div className={styles.statLabel}>Industries</div>
          </div>
        </div>

        {skills.map((category, idx) => (
          <div key={idx} className={`${styles.skillsCategory} ${styles.fadeIn}`}>
            <h3>{category.category}</h3>
            {category.items.map((skill, skillIdx) => (
              <div key={skillIdx} className={styles.skillItem}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillLevel}>{skill.level}</span>
                </div>
                <div className={styles.skillBar}>
                  <div 
                    className={styles.skillProgress} 
                    style={{ '--width': `${skill.width}%` } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section id="projects" className={styles.section}>
        <h2>Featured Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project, idx) => (
            <div key={idx} className={`${styles.projectCard} ${styles.fadeIn}`}>
              <div className={styles.projectImage}>{project.icon}</div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectCompany}>{project.company}</p>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.techTags}>
                  {project.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className={styles.techTag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.projectStats}>
                  {project.stats.map((stat, statIdx) => (
                    <div key={statIdx} className={styles.projectStat}>
                      <span>{stat.icon}</span> {stat.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className={styles.section}>
        <h2>Professional Journey</h2>
        <div className={styles.timeline}>
          {experience.map((job, idx) => (
            <div key={idx} className={`${styles.timelineItem} ${styles.fadeIn}`}>
              <div className={styles.timelineHeader}>
                <div>
                  <div className={styles.timelineTitle}>{job.title}</div>
                  <div className={styles.timelineCompany}>{job.company}</div>
                </div>
                <div className={styles.timelinePeriod}>{job.period}</div>
              </div>
              <ul>
                {job.responsibilities.map((resp, respIdx) => (
                  <li key={respIdx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="hobbies" className={styles.section}>
        <h2>Beyond the Code</h2>
        <p className={styles.hobbiesIntro}>
          When I'm not architecting microservices or debugging code, you'll find me staying active and recharging through sports and gaming.
        </p>
        
        <div className={styles.hobbiesGrid}>
          <div className={`${styles.hobbyCard} ${styles.fadeIn}`}>
            <div className={styles.hobbyIcon}>
              <Gamepad2 size={64} strokeWidth={1.5} />
            </div>
            <h3 className={styles.hobbyTitle}>Gaming</h3>
            <p className={styles.hobbyDesc}>
              Whether it's strategy games that sharpen problem-solving skills or competitive multiplayer that teaches teamwork, gaming keeps my mind engaged and creative.
            </p>
          </div>

          <div className={`${styles.hobbyCard} ${styles.fadeIn}`}>
            <div className={styles.hobbyIcon}>
              <Trophy size={64} strokeWidth={1.5} />
            </div>
            <h3 className={styles.hobbyTitle}>Basketball</h3>
            <p className={styles.hobbyDesc}>
              Court time teaches me about coordination, quick decision-making, and teamwork — skills that translate perfectly to collaborative development.
            </p>
          </div>

          <div className={`${styles.hobbyCard} ${styles.fadeIn}`}>
            <div className={styles.hobbyIcon}>
              <Volleyball size={64} strokeWidth={1.5} />
            </div>
            <h3 className={styles.hobbyTitle}>Volleyball</h3>
            <p className={styles.hobbyDesc}>
              The perfect balance of individual skill and team synergy. Just like in development, timing and communication are everything.
            </p>
          </div>

          <div className={`${styles.hobbyCard} ${styles.fadeIn}`}>
            <div className={styles.hobbyIcon}>
              <Wind size={64} strokeWidth={1.5} />
            </div>
            <h3 className={styles.hobbyTitle}>Badminton</h3>
            <p className={styles.hobbyDesc}>
              Quick reflexes, strategic thinking, and precision — this sport keeps me sharp and agile, both mentally and physically.
            </p>
          </div>

          <div className={`${styles.hobbyCard} ${styles.fadeIn}`}>
            <div className={styles.hobbyIcon}>
              <Waves size={64} strokeWidth={1.5} />
            </div>
            <h3 className={styles.hobbyTitle}>Swimming</h3>
            <p className={styles.hobbyDesc}>
              My meditation in motion. Swimming clears my mind, builds endurance, and reminds me that consistent, steady effort leads to progress.
            </p>
          </div>

          <div className={`${styles.hobbyCard} ${styles.fadeIn}`}>
            <div className={styles.hobbyIcon}>
              <Scale size={64} strokeWidth={1.5} />
            </div>
            <h3 className={styles.hobbyTitle}>Work-Life Balance</h3>
            <p className={styles.hobbyDesc}>
              I believe the best code comes from well-rested, well-rounded developers. Staying active keeps me energized and focused when it's time to build.
            </p>
          </div>
        </div>

        <div className={`${styles.hobbyQuote} ${styles.fadeIn}`}>
          <p>"A healthy body fuels a creative mind. Whether on the court or in the code editor, I bring the same passion and dedication to everything I do."</p>
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <h2>Let's Build Something Amazing</h2>
        <p className={styles.contactIntro}>
          I'm always interested in hearing about new opportunities, innovative projects, or just connecting with fellow developers. Let's create something extraordinary together!
        </p>
        <div className={styles.contactGrid}>
          <a href="mailto:ajerokenn@gmail.com" className={`${styles.contactCard} ${styles.fadeIn}`}>
            <div className={styles.contactIcon}>
              <Mail size={40} strokeWidth={1.5} />
            </div>
            <div className={styles.contactLabel}>Email</div>
            <div className={styles.contactValue}>ajerokenn@gmail.com</div>
          </a>
          <div className={`${styles.contactCard} ${styles.fadeIn}`}>
            <div className={styles.contactIcon}>
              <MapPin size={40} strokeWidth={1.5} />
            </div>
            <div className={styles.contactLabel}>Location</div>
            <div className={styles.contactValue}>Makati, Philippines</div>
          </div>
          <a href="https://linkedin.com/in/kenneth-ajero-2a696899" target="_blank" rel="noopener noreferrer" className={`${styles.contactCard} ${styles.fadeIn}`}>
            <div className={styles.contactIcon}>
              <Linkedin size={40} strokeWidth={1.5} />
            </div>
            <div className={styles.contactLabel}>LinkedIn</div>
            <div className={styles.contactValue}>Connect with me</div>
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.socialLinks}>
            <a href="https://github.com/kanux0301" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="GitHub">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/kenneth-ajero-2a696899" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="mailto:ajerokenn@gmail.com" className={styles.socialLink} title="Email">
              <Mail size={24} />
            </a>
          </div>
          <p className={styles.footerText}>© 2025 Kenneth Ajero. All rights reserved.</p>
          <p className={styles.footerSubtext}>Built with passion for .NET development</p>
        </div>
      </footer>
    </div>
  );
}