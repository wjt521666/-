import React, { useEffect, useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  BrainCircuit,
  Layers3,
  Mail,
  MessageCircle,
  MapPin,
  MousePointer2,
  Phone,
  Play,
  Workflow,
} from "lucide-react";
import Silk from "./components/Silk";
import BorderGlow from "./components/BorderGlow";
import { workCardContent } from "./workContent";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const projectImages = (slug, files) =>
  files.map((file) => `/assets/codex-projects/${slug}/${slug}-${file}`);

const projectModules = [
  {
    slug: "3d-render",
    title: "3D渲染",
    tag: "3D Rendering",
    images: projectImages("3d-render", [
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "08.jpg",
      "12.jpg",
      "18.jpg",
      "22.jpg",
      "29.jpg",
    ]),
    copy: "三维场景与产品视觉渲染。",
    detail: "三维场景、产品视觉、发布会图形与广告画面的渲染表达。",
    cardCopy: "三维场景、产品视觉与广告画面的渲染表达",
  },
  {
    slug: "compositing",
    title: "后期合成",
    tag: "Compositing",
    images: projectImages("compositing", [
      "01.jpg",
      "04.jpg",
      "08.jpg",
      "11.jpg",
      "17.jpg",
      "21.jpg",
      "23.jpg",
      "24.png",
    ]),
    copy: "跟踪、擦除、抠像与合成包装。",
    detail: "宣传片、TVC、微电影的跟踪、擦除、抠像与合成包装。摩天轮投影，四折幕沉浸式，水幕秀，联动屏视频制作。",
    cardCopy: "宣传片、TVC 与沉浸式影像的跟踪、抠像和合成",
  },
  {
    slug: "ar-virtual-event",
    title: "AR虚拟发布会",
    tag: "Virtual Event",
    images: projectImages("ar-virtual-event", [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "08.jpg",
      "13.jpg",
    ]),
    copy: "虚拟发布会与 AR 视觉制作。",
    detail: "线上发布会三维场景、AR 特效、虚拟空间与大屏视觉制作。",
    cardCopy: "线上发布会、AR 特效与虚拟空间视觉制作",
  },
  {
    slug: "ai-powered",
    title: "AI赋能",
    tag: "AI Empowered",
    images: projectImages("ai-powered", [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "06.jpg",
      "08.jpg",
      "10.jpg",
      "12.jpg",
    ]),
    copy: "AI 辅助概念与动画探索。",
    detail: "用 AI 生成辅助风格探索、概念画面、动画分镜与创意提案。",
    cardCopy: "AI 风格探索、概念画面与动画分镜创作",
  },
  {
    slug: "product-render",
    title: "产品渲染",
    tag: "Product Rendering",
    images: projectImages("product-render", [
      "01.png",
      "02.jpg",
      "03.jpg",
      "04.png",
      "05.png",
      "06.png",
      "08.png",
      "11.png",
    ]),
    copy: "产品卖点可视化呈现。",
    detail: "新能源、电子产品与工业产品的卖点可视化呈现。",
    cardCopy: "新能源、电子与工业产品的卖点可视化",
  },
  {
    slug: "ue-render",
    title: "UE Render",
    tag: "Realtime Render",
    images: projectImages("ue-render", [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "08.jpg",
      "10.jpg",
    ]),
    copy: "实时引擎场景镜头表现。",
    detail: "实时引擎中的车载、空间、科技场景镜头表现。",
    cardCopy: "实时引擎中的车载、空间与科技场景镜头",
  },
  {
    slug: "ai-mini-app",
    title: "AI小程序",
    tag: "AI Mini Program",
    images: projectImages("ai-mini-app", ["01.jpg", "02.jpg", "03.png"]),
    copy: "AI 脚本与流程工具。",
    detail: "结合 AI 生成脚本，解决工作中繁琐的流程。",
    cardCopy: "用 AI 脚本简化重复流程与创作工具",
  },
  {
    slug: "personal-study",
    title: "个人练习",
    tag: "Personal Study",
    images: projectImages("personal-study", [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "06.jpg",
      "10.jpg",
      "16.jpg",
      "24.jpg",
      "27.jpg",
    ]),
    copy: "个人日常制作练习。",
    detail: "个人日常的制作。",
    cardCopy: "围绕光影、材质与空间叙事的日常练习",
  },
];

const advantages = [
  {
    icon: Layers3,
    title: "三维到后期的一体化能力",
    text: "能从 C4D 场景、材质、灯光、渲染衔接到 AE 合成、包装和视频后期，减少环节割裂。",
  },
  {
    icon: Workflow,
    title: "发布会与品牌视频经验",
    text: "做过线上虚拟发布会、宣传片、TVC 广告、电梯广告和企业视觉内容，熟悉项目执行节奏。",
  },
  {
    icon: Boxes,
    title: "产品卖点可视化",
    text: "擅长把光伏新能源、电子产品、工业产品拆解成清晰、有记忆点的三维画面和视频镜头。",
  },
  {
    icon: BrainCircuit,
    title: "AI 动画与视频扩展",
    text: "把 AI video、AI 动画、画面风格探索纳入创意流程，提高概念表达和视觉试错效率。",
  },
];

const detailWorks = Object.fromEntries(
  projectModules.map((project) => [
    project.slug,
    Array.from(
      { length: 20 },
      (_, index) => {
        const number = String(index + 1).padStart(2, "0");
        const custom = workCardContent[project.slug]?.[number] || {};
        const defaultSubtitle = project.copy.replace(/[。.]$/, "");

        return {
          title: `${project.title} 作品 ${number}`,
          subtitle: defaultSubtitle,
          year: index < 3 ? "2026" : "2025",
          duration: ["00:36", "01:08", "02:15", "00:45", "01:20", "00:58", "01:46", "00:32", "01:12"][
            index % 9
          ],
          cover: `/assets/work-library/${project.slug}/covers/${number}.jpg`,
          fallbackCover: project.images[index % project.images.length],
          video: `/assets/compressed/work-library/${project.slug}/videos/${number}.mp4`,
          label: index === 0 ? "Featured" : index === 1 ? "New" : "",
          ...custom,
          note: custom.note || custom.subtitle || project.detail.replace(/[。.]$/, ""),
        };
      },
    ),
  ]),
);

const software = [
  { name: "Cinema 4D", icon: "/assets/software-icons/cinema-4d.png" },
  { name: "Octane", icon: "/assets/software-icons/octane.png" },
  { name: "After Effects", icon: "/assets/software-icons/after-effects.png" },
  { name: "E3D", icon: "/assets/software-icons/e3d.png" },
  { name: "Trapcode Suite", icon: "/assets/software-icons/trapcode-suite.png" },
  { name: "Unreal Engine", icon: "/assets/software-icons/unreal-engine.png" },
  { name: "Mocha", icon: "/assets/software-icons/mocha.png" },
  { name: "Silhouette", icon: "/assets/software-icons/silhouette.png" },
  { name: "AI Video", icon: "/assets/software-icons/ai-video.png" },
  { name: "Premiere", icon: "/assets/software-icons/premiere.png" },
  { name: "Photoshop", icon: "/assets/software-icons/photoshop.png" },
  { name: "Illustrator", icon: "/assets/software-icons/illustrator.png" },
  { name: "3A Render", icon: "/assets/software-icons/3a-render.png" },
  { name: "Topaz Video AI", icon: "/assets/software-icons/topaz-video-ai.png" },
  { name: "Topaz Photo AI", icon: "/assets/software-icons/topaz-photo-ai.png" },
];

const career = [
  {
    time: "2025.02-至今",
    company: "青岛麒正数字科技有限公司",
    role: "后期合成 / 3D场景 / AI动画",
    detail: "负责宣传片、TVC 广告后期抠像合成等制作；参与部分 3D 场景制作，并结合 AI 动画完成创意画面探索。",
  },
  {
    time: "2023.11-2023.12",
    company: "北京奥若国际有限公司",
    role: "线上发布会3D场景动画制作",
    detail: "负责线上发布会相关 3D 场景动画制作，围绕舞台空间、镜头运动和发布会视觉节奏完成画面表达。",
  },
  {
    time: "2022.10-2023.11",
    company: "北京致盛传名品牌咨询有限公司",
    role: "3D设计师",
    detail: "整体负责搭建公司三维与传统视频后期板块业务；负责三维视频、产品图渲染、发布会海报三维部分",
  },
  {
    time: "2020.02-2022.10",
    company: "北京康巨文化传播有限公司",
    role: "后期制作 / C4D / UE",
    detail: "负责 C4D 三维场景制作、部分 UE 场景、线上虚拟发布会 AR 特效制作、三维场景搭建以及宣传片后期制作。",
  },
  {
    time: "2018.03-2020.01",
    company: "青岛深度传媒有限公司",
    role: "宣传片 / TVC / 合成特效",
    detail: "负责宣传片、TVC 广告、颁奖等后期合成特效；包含擦除、抠像、合成、跟踪，以及三维渲染的烟雾、风、光效等合成特效。",
  },
  {
    time: "2017.09-2018.01",
    company: "浙江云通文化有限公司",
    role: "图形动画 / 后期包装",
    detail: "参与图形动画制作，负责微电影、宣传片后期合成包装等视觉制作工作。",
  },
];

function usePortfolioMotion() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      document.documentElement.classList.add("motion-ready");
      return undefined;
    }

    const ctx = gsap.context(() => {
      document.documentElement.classList.add("motion-ready");

      gsap.set(".openingCurtain", { transformOrigin: "50% 0%" });
      gsap.set(".nav", { autoAlpha: 0, y: -36, filter: "blur(14px)" });
      gsap.set(".heroVideo", {
        autoAlpha: 0.58,
        scale: 1.08,
        filter: "saturate(0.78) contrast(1.12) brightness(0.36)",
      });
      gsap.set(
        [
          ".heroKicker",
          ".hero h1 span",
          ".heroPortfolioLine strong",
          ".heroPortfolioLine em",
          ".heroLead",
          ".heroNameEn",
          ".heroActions",
        ],
        {
          autoAlpha: 0,
          y: 96,
          scaleY: 0.72,
          clipPath: "inset(0 0 100% 0)",
          transformOrigin: "0% 100%",
        },
      );
      gsap.set(".heroStars i", { autoAlpha: 0, scale: 0, rotate: -24 });
      gsap.set(".scrollHint", { autoAlpha: 0, y: 18 });
      gsap.set(".heroShowreel", { autoAlpha: 0, y: 44, filter: "blur(8px)" });

      const opening = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.12,
      });

      opening
        .to(".openingCurtain", {
          scaleY: 0,
          duration: 1.25,
          ease: "expo.inOut",
        })
        .to(
          ".heroVideo",
          {
            autoAlpha: 1,
            scale: 1,
            filter: "saturate(0.9) contrast(1.06) brightness(0.58)",
            duration: 1.8,
            ease: "power3.out",
          },
          "-=1.0",
        )
        .to(
          ".nav",
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
          },
          "-=1.15",
        )
        .to(
          ".heroKicker, .hero h1 span, .heroPortfolioLine strong, .heroPortfolioLine em",
          {
            autoAlpha: 1,
            y: 0,
            scaleY: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.34,
            stagger: 0.12,
          },
          "-=0.85",
        )
        .to(
          ".heroStars i",
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 1.05,
            stagger: 0.1,
          },
          "-=0.8",
        )
        .to(
          ".heroLead, .heroNameEn, .heroActions",
          {
            autoAlpha: 1,
            y: 0,
            scaleY: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.92,
            stagger: 0.045,
            ease: "power3.out",
            onComplete: () => {
              gsap.set(".heroActions", { clearProps: "clipPath" });
            },
          },
          "-=1.34",
        )
        .to(
          ".scrollHint",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.36",
        )
        .to(
          ".heroShowreel",
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
          },
          "-=0.72",
        );

      const animateBlock = (section, titleSelector, itemSelector, imageSelector) => {
        if (!section) return;

        const title = section.querySelector(titleSelector);
        const items = gsap.utils.toArray(section.querySelectorAll(itemSelector));
        const images = imageSelector
          ? gsap.utils.toArray(section.querySelectorAll(imageSelector))
          : [];

        if (title) {
          gsap.fromTo(
            title,
            {
              autoAlpha: 0,
              y: 132,
              scaleX: 0.82,
              clipPath: "inset(0 0 100% 0)",
              filter: "blur(7px)",
              transformOrigin: "0% 100%",
            },
            {
              autoAlpha: 1,
              y: 0,
              scaleX: 1,
              clipPath: "inset(0 0 0% 0)",
              filter: "blur(0px)",
              duration: 1.22,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            },
          );
        }

        if (items.length) {
          gsap.fromTo(
            items,
            {
              autoAlpha: 0,
              y: 88,
              scale: 0.94,
              clipPath: "inset(18% 0 0 0 round 18px)",
              filter: "blur(4px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0 0 0 round 18px)",
              filter: "blur(0px)",
              duration: 0.94,
              ease: "power3.out",
              stagger: { amount: Math.min(0.46, Math.max(0.12, items.length * 0.04)), from: "start" },
              scrollTrigger: {
                trigger: section,
                start: "top 66%",
                once: true,
              },
            },
          );
        }

        images.forEach((image) => {
          gsap.fromTo(
            image,
            { scale: 1.14, yPercent: 4 },
            {
              scale: 1.03,
              yPercent: -4,
              ease: "none",
              scrollTrigger: {
                trigger: image.closest(".projectCard") || section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            },
          );
        });
      };

      animateBlock(
        document.querySelector("#experience"),
        ".experiencePoster",
        ".bioPanel, .statCard, .careerPanel article",
        null,
      );
      animateBlock(
        document.querySelector("#projects"),
        ".projectIntro",
        ".projectBuild, .projectCard",
        ".projectCard img",
      );
      animateBlock(
        document.querySelector("#advantages"),
        ".advantageTitleBlock",
        ".advantageCard, .advantageHeroPanel",
        null,
      );
      animateBlock(
        document.querySelector(".softwareBand"),
        ".softwareHead",
        ".softwareList span",
        null,
      );
      animateBlock(
        document.querySelector("#contact"),
        ".contactTitle",
        ".contactIntro, .contactCards",
        null,
      );

      const statNumbers = gsap.utils.toArray("#experience .statGrid strong[data-count]");
      statNumbers.forEach((element, index) => {
        const target = Number(element.dataset.count || 0);
        const suffix = element.dataset.suffix || "";
        const counter = { value: 0 };

        element.textContent = `0${suffix}`;
        gsap.to(counter, {
          value: target,
          duration: 1.45 + index * 0.16,
          ease: "power3.out",
          snap: { value: 1 },
          onUpdate: () => {
            element.textContent = `${Math.round(counter.value)}${suffix}`;
          },
          scrollTrigger: {
            trigger: "#experience .statGrid",
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.to(".belowHomeSilk", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".belowHome",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const workSlug = hash.startsWith("#work/") ? hash.replace("#work/", "") : "";
  const activeProject = projectModules.find((project) => project.slug === workSlug);

  usePortfolioMotion();

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";

    const resetTop = () => {
      if (window.location.hash.startsWith("#work/")) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }
      if (window.location.hash && window.location.hash !== "#top") return;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
      window.setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 120);
    };

    resetTop();
    window.addEventListener("hashchange", resetTop);
    return () => window.removeEventListener("hashchange", resetTop);
  }, []);

  useEffect(() => {
    if (activeProject || !hash || hash === "#top" || hash.startsWith("#work/")) return;

    const targetId = hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [activeProject, hash]);

  return (
    <main>
      <div className="openingCurtain" aria-hidden="true" />
      <Nav />
      {activeProject ? (
        <WorkDetail project={activeProject} />
      ) : (
        <>
          <Hero />
          <div className="belowHome">
            <div className="belowHomeSilk" aria-hidden="true">
              <Silk speed={5} scale={0.42} color="#2f4055" noiseIntensity={0.9} rotation={0.12} />
            </div>
            <Experience />
            <Projects />
            <Advantages />
            <Software />
            <Contact />
          </div>
        </>
      )}
    </main>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <video
        className="heroVideo"
        ref={setQuietVideoVolume}
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/projects/virtual-event.jpg"
      >
        <source src="/assets/video/homepage-bg.mp4" type="video/mp4" />
      </video>
      <div className="heroShade" />

      <div className="heroContent shell">
        <div className="heroTitleBlock">
          <p className="heroKicker">HERE AND NOW</p>
          <h1>
            <span>XIAOWANG</span>
          </h1>
          <span className="heroStars" aria-hidden="true">
            <i />
            <i />
          </span>
          <div className="heroPortfolioLine">
            <strong>PORTFOLIO</strong>
            <em>JiangTao</em>
          </div>
          <p className="heroLead">
            用三维视觉、后期合成与 AI 工作流
            <br />
            让品牌画面更快、更准、更有辨识度
          </p>
        </div>
        <p className="heroNameEn">王江涛 / 3D DESIGNER / COMPOSITOR / AI VIDEO DESIGN</p>
        <div className="heroActions">
          <a className="primaryBtn" href="#contact">
            联系我 <ArrowUpRight size={18} strokeWidth={1.8} />
          </a>
          <a className="ghostBtn" href="#projects">
            <Play size={17} fill="currentColor" strokeWidth={1.5} /> 查看作品
          </a>
        </div>
      </div>
      <HeroShowreel />
      <div className="scrollHint" aria-hidden="true">
        <MousePointer2 size={16} />
        <span>SCROLL</span>
      </div>
    </section>
  );
}

function HeroShowreel() {
  const items = [...projectModules, ...projectModules];

  return (
    <div className="heroShowreel" aria-label="精选作品分类轮播">
      <div className="heroShowreelViewport">
        <div className="heroShowreelTrack">
          {items.map((project, index) => (
            <a
              href={`#work/${project.slug}`}
              key={`${project.slug}-${index}`}
              aria-label={`查看${project.title}作品`}
            >
              <img src={project.images[index % project.images.length]} alt={`${project.title}作品预览`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const goTop = (event) => {
    event.preventDefault();
    if (window.location.hash === "#top") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = "top";
  };

  return (
    <nav className="nav shell" aria-label="主导航">
      <a className="brand" href="#top" aria-label="王江涛作品集首页" onClick={goTop}>
        <span className="brandIcon" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="brandText">Wang</span>
      </a>
      <div className="navLinks">
        <a href="#experience">个人经历</a>
        <a href="#projects">作品展示</a>
        <a href="#advantages">个人优势</a>
        <a href="#software">软件技能</a>
      </div>
      <div className="navContact">
        <a href="#contact">联系我</a>
      </div>
    </nav>
  );
}

function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="shell experienceGrid">
        <div className="bioPanel">
          <h3>
            为品牌构建
            <br />
            具有<span>未来感</span>的视觉叙事。
          </h3>
          <ul className="bioText">
            <li>Hello,我是王江涛，专注三维设计、后期合成与 AI 视觉创作</li>
            <li>
              工作经历覆盖宣传片、TVC 广告、电梯广告、微电影后期，以及水幕秀、四折幕沉浸式影像、摩天轮投影等视频制作。
            </li>
            <li>
              熟悉 AE 各类插件，也参与过线上虚拟发布会三维场景、后期合成、部分 UE 场景制作，以及光伏行业产品渲染和视频制作；未来将结合 AI 优化工作流程。
            </li>
          </ul>

          <div className="statGrid">
            <div className="statCard">
              <strong data-count="9" data-suffix="+">9+</strong>
              <span>年视觉制作经验</span>
              <i className="statIcon" aria-hidden="true">
                <BadgeCheck size={38} strokeWidth={1.8} />
              </i>
            </div>
            <div className="statCard">
              <strong data-count="100" data-suffix="+">100+</strong>
              <span>完成项目</span>
              <i className="statIcon" aria-hidden="true">
                <Workflow size={38} strokeWidth={1.8} />
              </i>
            </div>
            <div className="statCard">
              <strong data-count="8">8</strong>
              <span>类作品方向</span>
              <i className="statIcon" aria-hidden="true">
                <Boxes size={38} strokeWidth={1.8} />
              </i>
            </div>
          </div>
        </div>
        <div className="experiencePoster sectionTitleBlock" aria-label="Personal profile experience background">
          <p>PERSONAL PROFILE</p>
          <strong>
            EXPERIENCE
            <span>BACKGROUND</span>
          </strong>
          <div>
            <i aria-hidden="true" />
            <em>个人经历</em>
          </div>
        </div>
        <div className="careerPanel">
          {career.map(({ time, company, role, detail }) => (
            <article key={`${time}-${company}`}>
              <span>{time}</span>
              <h3>{company}</h3>
              <p>{role}</p>
              <div className="careerReveal">
                <strong>工作内容</strong>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="shell projectShowcase">
        <div className="projectGrid">
          <aside className="projectIntro">
            <div className="sectionTitleBlock">
              <p>SELECTED WORKS</p>
              <h2>
                PROJECTS
                <span>PORTFOLIO</span>
              </h2>
            </div>
            <strong>
              <b>08</b>
              <span>PROJECTS</span>
            </strong>
            <h3>
              <i aria-hidden="true" />
              作品展示
            </h3>
            <p className="projectIntroText">视觉创意与技术的融合，打造有影响力的数字作品</p>
            <p className="projectIntroMeta">DESIGN · TECHNOLOGY · EXPERIENCE</p>
          </aside>
          <aside className="projectBuild">
            <span aria-hidden="true">⌖</span>
            <h3>
              CREATIVE
              <br />
              POWERED BY
              <br />
              TECHNOLOGY
            </h3>
            <p>
              用视觉语言
              <br />
              解决真实问题
            </p>
            <strong>
              LET'S BUILD
              <br />
              SOMETHING GREAT
            </strong>
          </aside>
          {projectModules.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (project.images.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % project.images.length);
    }, 3200 + index * 180);
    return () => window.clearInterval(timer);
  }, [project.images.length, index]);

  return (
    <BorderGlow
      as="a"
      href={`#work/${project.slug}`}
      aria-label={`查看${project.title}作品详情`}
      animated={index === 0}
      className={`projectCard projectCard${index + 1}`}
      colors={["#b7ff38", "#8ddfd6", "#f4fff4"]}
      edgeSensitivity={18}
      glowColor="82 100 61"
      glowIntensity={0.72}
      glowRadius={24}
      fillOpacity={0.2}
      coneSpread={16}
    >
      {project.images.map((image, current) => (
        <img
          src={image}
          alt={`${project.title}作品图`}
          className={current === imageIndex ? "active" : ""}
          key={image}
        />
      ))}
      <div className="projectOverlay" />
      <strong className="projectNumber">{String(index + 1).padStart(2, "0")}</strong>
      <div className="projectMeta">
        <span>{project.tag}</span>
        <h3>{project.title}</h3>
        <p>{(project.cardCopy || project.detail || project.copy).replace(/[。.]$/, "")}</p>
      </div>
    </BorderGlow>
  );
}

function formatMediaDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";

  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function setQuietVideoVolume(video) {
  if (video) video.volume = 0.03;
}

function WorkUploadPlaceholder() {
  return (
    <div className="workUploadPlaceholder" aria-label="作品待上传">
      <span>待上传……</span>
    </div>
  );
}

function WorkVideoMedia({ item, onDuration, onMissing }) {
  const [videoFailed, setVideoFailed] = useState(false);

  if (item.video && !videoFailed) {
    return (
      <video
        ref={setQuietVideoVolume}
        src={item.video}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster={item.cover}
        onLoadedMetadata={(event) => {
          const duration = formatMediaDuration(event.currentTarget.duration);
          if (duration) onDuration?.(duration);
        }}
        onError={() => {
          setVideoFailed(true);
          onMissing?.();
        }}
      />
    );
  }

  return <WorkUploadPlaceholder />;
}

function WorkDetail({ project }) {
  const items = detailWorks[project.slug] || [];
  const featured = items[0];
  const heroImages = project.images?.length ? project.images : items.map((item) => item.cover).filter(Boolean);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoDurations, setVideoDurations] = useState({});
  const [missingVideos, setMissingVideos] = useState({});

  const durationFor = (item) => videoDurations[item.video] || "";
  const openVideo = (item, index) => {
    setActiveVideo({ ...item, duration: durationFor(item), index });
  };

  useEffect(() => {
    setHeroImageIndex(0);
    if (heroImages.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % heroImages.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [heroImages.length, project.slug]);

  useEffect(() => {
    if (!activeVideo) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveVideo(null);
    };

    document.body.classList.add("modalOpen");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modalOpen");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".workDetailKicker, .workDetailTitle span, .workDetailLead, .workBack",
        { autoAlpha: 0, y: 72, clipPath: "inset(0 0 110% 0)", filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(-8% 0 -18% 0)",
          filter: "blur(0px)",
          duration: 1.15,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.28,
        },
      );
      gsap.fromTo(
        ".workHeroMedia",
        { autoAlpha: 0, scale: 1.08, clipPath: "inset(0 0 0 100% round 24px)" },
        {
          autoAlpha: 1,
          scale: 1,
          clipPath: "inset(0 0 0 0% round 24px)",
          duration: 1.28,
          ease: "power4.out",
          delay: 0.48,
        },
      );
      gsap.fromTo(
        ".workTabs a",
        { autoAlpha: 0, filter: "blur(5px)" },
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.68,
          stagger: 0.035,
          ease: "power2.out",
          delay: 0.7,
        },
      );
      gsap.fromTo(
        ".workVideoCard",
        { autoAlpha: 0, y: 40, scale: 0.975, clipPath: "inset(8% 0 0 0 round 18px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0 0 0 round 18px)",
          duration: 0.86,
          stagger: 0.045,
          ease: "power3.out",
          delay: 0.76,
        },
      );
    });

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <section className="workDetailPage">
      <div className="workDetailBg" aria-hidden="true" />
      <div className="shell workDetailWrap">
        <div className="workBreadcrumb">
          <a href="#top">首页</a>
          <span>/</span>
          <a href="#projects">作品展示</a>
          <span>/</span>
          <strong>{project.title}</strong>
        </div>

        <div className="workHero">
          <div className="workHeroText">
            <p className="workDetailKicker">SELECTED CATEGORY</p>
            <h1 className="workDetailTitle">
              <span>{project.tag}</span>
              <em>{project.title}</em>
            </h1>
            <p className="workDetailLead">{project.detail.replace(/[。.]$/, "")}</p>
            <div className="workHeroMeta">
              <span>{String(items.length).padStart(2, "0")} Works</span>
              <span>Video / Cover / Story</span>
              <span>Template Ready</span>
            </div>
            <a className="workBack" href="#top">
              返回首页 <ArrowUpRight size={18} strokeWidth={1.7} />
            </a>
          </div>
          <div className="workHeroMedia">
            {heroImages.map((image, index) => (
              <img
                className={index === heroImageIndex ? "active" : ""}
                src={image}
                alt={`${project.title} category visual ${index + 1}`}
                key={image}
              />
            ))}
            <div className="workHeroDots" aria-hidden="true">
              {heroImages.slice(0, 6).map((image, index) => (
                <span className={index === heroImageIndex ? "active" : ""} key={image} />
              ))}
            </div>
          </div>
        </div>

        <nav className="workTabs" aria-label="作品分类">
          {projectModules.map((item) => (
            <a className={item.slug === project.slug ? "active" : ""} href={`#work/${item.slug}`} key={item.slug}>
              {item.title}
            </a>
          ))}
        </nav>

        <div className="workVideoGrid">
          {items.map((item, index) => (
            <article
              className="workVideoCard"
              key={`${project.slug}-${item.title}`}
              onClick={() => openVideo(item, index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openVideo(item, index);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="workVideoThumb">
                <WorkVideoMedia
                  item={item}
                  onDuration={(duration) => {
                    setVideoDurations((current) =>
                      current[item.video] === duration ? current : { ...current, [item.video]: duration },
                    );
                  }}
                  onMissing={() => {
                    setMissingVideos((current) =>
                      current[item.video] ? current : { ...current, [item.video]: true },
                    );
                  }}
                />
                {!missingVideos[item.video] && durationFor(item) && <em>{durationFor(item)}</em>}
              </div>
              <div className="workVideoInfo">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                <button type="button" aria-label={`${item.title}视频占位`}>
                  <Play size={16} fill="currentColor" strokeWidth={1.4} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {activeVideo && (
        <WorkLightbox item={activeVideo} project={project} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}

function WorkLightbox({ item, project, onClose }) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="workLightbox" role="dialog" aria-modal="true" aria-label={`${item.title}作品预览`}>
      <button className="workLightboxBackdrop" type="button" aria-label="关闭预览" onClick={onClose} />
      <div className="workLightboxPanel">
        <button className="workLightboxClose" type="button" aria-label="关闭预览" onClick={onClose}>
          ×
        </button>
        <div className="workLightboxMedia">
          {item.video && !videoFailed ? (
            <video
              ref={setQuietVideoVolume}
              src={item.video}
              controls
              autoPlay
              playsInline
              poster={item.cover}
              onError={() => setVideoFailed(true)}
            />
          ) : (
            <WorkUploadPlaceholder />
          )}
        </div>
        <div className="workLightboxInfo">
          <div>
            <span>
              {project.title} / {String(item.index + 1).padStart(2, "0")}
            </span>
            <h3>{item.title}</h3>
            <p>{item.note || item.subtitle}</p>
          </div>
          <div className="workLightboxMeta">
            <span>{item.year}</span>
            <span>{item.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Advantages() {
  return (
    <section className="section advantagesSection" id="advantages">
      <div className="shell advantageLayout">
        <div className="advantageLeft">
          <div className="advantageTitleBlock sectionTitleBlock">
            <p>PERSONAL ADVANTAGES</p>
            <h2>
              ADVANTAGES
              <span>WORKFLOW</span>
            </h2>
            <h3>
              <i aria-hidden="true" />
              个人优势
            </h3>
            <p className="advantageLead">融合创意、技术与执行力，提供从概念到落地的完整数字内容解决方案</p>
          </div>
          <div className="advantageGrid">
            {advantages.map(({ icon: Icon, title, text }, index) => (
              <article className="advantageCard" key={title}>
                <div className="advantageCardTop">
                  <Icon size={32} strokeWidth={1.45} />
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                </div>
                <h3>{title}</h3>
                <span className="advantageLine" aria-hidden="true" />
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="advantageHeroPanel">
          <p className="advantageHeroKicker">PERSONAL</p>
          <h3>ADVANTAGES</h3>
          <h4>
            WORKFLOW
            <span>✦</span>
          </h4>
          <p className="advantageWorkflow">三维设计 / 后期整合 / AI扩展</p>
          <span className="advantageHeroLine" aria-hidden="true" />
          <p className="advantageHeroText">
            视觉创意与技术的融合，
            <br />
            打造有影响力的数字作品
          </p>
          <div className="advantageWords" aria-label="创意 技术 执行">
            <span>创意</span>
            <b>/</b>
            <span>技术</span>
            <b>/</b>
            <span>执行</span>
          </div>
          <div className="advantageMotion" aria-hidden="true">
            <video ref={setQuietVideoVolume} autoPlay muted loop playsInline preload="metadata">
              <source src="/assets/video/advantage-motion-alpha.webm" type="video/webm" />
              <source src="/assets/video/advantage-motion.mp4" type="video/mp4" />
            </video>
          </div>
          <strong className="advantageCta">
            LET'S BUILD SOMETHING GREAT.
            <ArrowUpRight size={30} strokeWidth={1.4} />
          </strong>
        </aside>
      </div>
    </section>
  );
}

function Software() {
  return (
    <section className="softwareBand" id="software" aria-label="软件技能">
      <div className="shell softwareWrap">
        <div className="softwareHead sectionTitleBlock">
          <p>SOFTWARE STACK</p>
          <h2>
            SOFTWARE
            <span>SKILLS</span>
          </h2>
          <h3>
            <i aria-hidden="true" />
            软件技能
          </h3>
          <p className="softwareLead">
            掌握多种主流软件与工具，覆盖三维、后期、渲染、剪辑、设计等领域，持续学习与实践，提升创意与执行力。
          </p>
        </div>
        <div className="softwareList">
          {software.map((item) => (
            <span key={item.name}>
              <img src={item.icon} alt="" aria-hidden="true" />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contactEnd" id="contact">
      <div className="contactBg" />
      <div className="shell contactContent">
        <div className="contactHero">
          <div className="contactTitle">
            <span className="contactSlash" aria-hidden="true" />
            <h2>
              CONTACT
              <span>ME</span>
            </h2>
          </div>
          <div className="contactIntro">
            <span aria-hidden="true" />
            <p>期待与您合作，共创无限可能</p>
            <small>
              LOOKING FORWARD TO WORKING WITH YOU
              <br />
              TO CREATE LIMITLESS POSSIBILITIES.
            </small>
          </div>
        </div>
        <div className="contactCards">
          <a href="tel:18369631258">
            <span className="contactIcon">
              <Phone size={34} strokeWidth={1.7} />
            </span>
            <span>
              <small>电话</small>
              <strong>18369631258</strong>
              <i aria-hidden="true" />
            </span>
          </a>
          <a href="mailto:306472120@qq.com">
            <span className="contactIcon">
              <Mail size={36} strokeWidth={1.7} />
            </span>
            <span>
              <small>邮箱</small>
              <strong>306472120@qq.com</strong>
              <i aria-hidden="true" />
            </span>
          </a>
          <div>
            <span className="contactIcon">
              <MessageCircle size={36} strokeWidth={1.7} />
            </span>
            <span>
              <small>微信</small>
              <strong>wjt521666</strong>
              <i aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="footerLine">
          <span>王江涛 Portfolio 2026</span>
          <span>
            <BadgeCheck size={16} /> 3D / 后期合成 / AI 视频设计
          </span>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
