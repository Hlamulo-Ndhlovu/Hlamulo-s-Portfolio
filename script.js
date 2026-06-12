// Navigation highlighting for multi-page site
(function () {
  const navLinks = document.querySelectorAll(".nav-links a");
  const path = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const file = href.split("#")[0];
    if (file === path) {
      link.classList.add("active");
    }
  });
})();

// Mobile nav toggle
(function () {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-open");
      navLinks.classList.toggle("is-open");
    });
  }
})();

// Dynamic year in footer
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// Scroll reveal animations
(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const targets = document.querySelectorAll(
    ".section-body, .hero-card, .project-card, .timeline-item, .skill-column, .contact-form"
  );

  if (!targets.length || !("IntersectionObserver" in window)) return;

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  targets.forEach((el) => observer.observe(el));
})();

// Contact form client-side validation and feedback (static-friendly)
(function () {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");

  if (!nameInput || !emailInput || !messageInput) return;

  const status = document.createElement("p");
  status.className = "form-status";
  form.appendChild(status);

  function setFieldError(input, hasError) {
    const field = input.closest(".field");
    if (!field) return;
    field.classList.toggle("field-error", hasError);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let hasError = false;
    [nameInput, emailInput, messageInput].forEach((input) => setFieldError(input, false));

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, true);
      hasError = true;
    }

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailValue || !emailPattern.test(emailValue)) {
      setFieldError(emailInput, true);
      hasError = true;
    }

    if (!messageInput.value.trim()) {
      setFieldError(messageInput, true);
      hasError = true;
    }

    if (hasError) {
      status.textContent = "Please fill in all fields with a valid email address.";
      status.className = "form-status is-error";
      return;
    }

    // If an action is configured (e.g., Formspree), submit to that endpoint
    const action = form.getAttribute("action");
    if (action) {
      status.textContent = "Sending your message…";
      status.className = "form-status";
      form.submit();
      return;
    }

    // Fallback if no action is configured
    status.textContent =
      "Thanks! This demo form doesn’t send email yet, but your message would be ready to send.";
    status.className = "form-status is-success";
    form.reset();
  });
})();

// Project filtering (Projects page)
(function () {
  const filterButtons = document.querySelectorAll(".project-filter");
  const cards = document.querySelectorAll(".project-card[data-category]");

  if (!filterButtons.length || !cards.length) return;

  function applyFilter(filter) {
    cards.forEach((card) => {
      const categories = card.getAttribute("data-category").split(" ");
      const show = filter === "all" || categories.includes(filter);
      card.style.display = show ? "" : "none";
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";

      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      applyFilter(filter);
    });
  });
})();

// Simple AI assistant about Hlamulo
(function () {
  const toggle = document.getElementById("ai-toggle");
  const windowEl = document.getElementById("ai-window");
  const closeBtn = document.getElementById("ai-close");
  const input = document.getElementById("ai-input");
  const sendBtn = document.getElementById("ai-send");
  const messages = document.getElementById("ai-messages");

  if (!toggle || !windowEl || !closeBtn || !input || !sendBtn || !messages) return;

  function toggleWindow(open) {
    if (open) {
      windowEl.classList.add("is-open");
    } else {
      windowEl.classList.remove("is-open");
    }
  }

  toggle.addEventListener("click", () => toggleWindow(!windowEl.classList.contains("is-open")));
  closeBtn.addEventListener("click", () => toggleWindow(false));

  function appendMessage(text, who) {
    const div = document.createElement("div");
    div.className = `ai-message ${who}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  const knowledge = {
    name: "Hlamulo Ndhlovu",
    role: "Full stack & Mobile Developer",
    email: "hlamulondhlovu11@gmail.com",
    github: "github.com/Hlamulo-Ndhlovu",
    linkedin: "linkedin.com/in/hlamulo-ndhlovu-a91922321",
    education:
      "Hlamulo is currently studying a Diploma in Software Development at Rosebank College. Relevant modules include Advanced Programming, Database Management Systems, Software Engineering, Ethical Hacking, and Systems Analysis and Design.",
    summary:
      "Hlamulo Ndhlovu is a motivated Software Development student and Full stack & Mobile Developer. He builds web, mobile, and desktop applications with clean interfaces, database knowledge, problem-solving skills, and a security-aware mindset.",
    skills:
      "His technical skills include C#, Java, Kotlin, JavaScript, SQL, HTML, CSS, ASP.NET Core MVC, Jetpack Compose, Entity Framework Core, Firebase basics, REST APIs, SQL Server, MySQL, Firebase Realtime Database, Git, GitHub, Visual Studio, Android Studio, and browser DevTools.",
    projects:
      "His project experience includes StudySinc, a published Android app on Google Play for student coordination; Let's Move Out, a live business website for a moving and property care company; a Gasoline Mobile Application built with Android and Jetpack Compose; a Cybersecurity Awareness Chatbot built in C#; and an Order Management Web Application built with ASP.NET Core MVC and Entity Framework Core.",
    letsMoveOut:
      "Let's Move Out is a live business website Hlamulo built for a concierge-style moving and property care company. It features an instant-estimate calculator, booking form, testimonials, and a fully responsive design, built with HTML, CSS, and JavaScript and deployed on GitHub Pages at hlamulo-ndhlovu.github.io/lets-move-out.",
    studysinc:
      "StudySinc is Hlamulo's published Android app on Google Play. It helps students coordinate classes, schedules, meeting links, group chats, shared notes, friends, and live study sessions.",
    gasoline:
      "The Gasoline Mobile Application is an Android project built with Jetpack Compose. It includes multi-screen navigation, authentication screens, loading screens, dynamic order screens, Material 3 UI principles, and reusable components.",
    chatbot:
      "The Cybersecurity Awareness Chatbot is a C# console application created to educate South African citizens about cybersecurity. It uses structured conversation flows and user input validation.",
    orderApp:
      "The Order Management Web Application is an ASP.NET Core MVC project for managing customer orders. It uses Entity Framework Core, CRUD operations, database interaction, and data validation.",
    competencies:
      "His key competencies include problem solving, analytical thinking, debugging, testing, team collaboration, time management, willingness to learn, secure input handling, and practical software design.",
    objective:
      "Hlamulo is looking for a Junior Software Developer, Mobile Developer, Full stack Developer, or internship opportunity where he can apply his programming knowledge, gain industry experience, and contribute to real-world software solutions.",
    cv:
      "You can download Hlamulo's resume from the portfolio. The download file is Hlamulo's Resume.pdf.",
    askTopics:
      "You can ask me about Hlamulo's profile, role, education, Rosebank College modules, technical skills, programming languages, mobile development, full stack development, projects, StudySinc, Let's Move Out website, Gasoline app, cybersecurity chatbot, order management app, career goals, CV/resume, contact details, GitHub, LinkedIn, or why he would be a good junior developer candidate.",
  };

  function includesAny(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
  }

  function getAnswer(rawQuestion) {
    const q = rawQuestion.toLowerCase();

    if (
      q === "hi" ||
      q === "hi!" ||
      q === "hello" ||
      q === "hello!" ||
      q.startsWith("hi ") ||
      q.startsWith("hello ") ||
      q.includes(" hey")
    ) {
      return `Hi! I'm Hlamulo's AI assistant. ${knowledge.askTopics}`;
    }

    if (includesAny(q, ["what can i ask", "what can you answer", "help", "topics", "questions", "ask about"])) {
      return knowledge.askTopics;
    }

    if (q.includes("how are you")) {
      return "I'm doing well and ready to help. Ask me about Hlamulo's skills, projects, education, CV, contact details, or career goals.";
    }

    if (includesAny(q, ["summary", "summarise", "summarize", "overview", "everything", "tell me about hlamulo", "about hlamulo"])) {
      return `${knowledge.summary} ${knowledge.education} ${knowledge.projects}`;
    }

    if (includesAny(q, ["name", "who is", "who are you"])) {
      return `I am Hlamulo's portfolio assistant. His name is ${knowledge.name}, and he is a ${knowledge.role}.`;
    }

    if (includesAny(q, ["role", "job title", "specialize", "specialise", "what do you do", "developer"])) {
      return `Hlamulo's role is ${knowledge.role}. He focuses on building full stack web applications and mobile applications, especially practical software with clean user interfaces and reliable data handling.`;
    }

    if (includesAny(q, ["education", "study", "studying", "college", "rosebank", "modules", "qualification", "diploma"])) {
      return knowledge.education;
    }

    if (includesAny(q, ["skills", "tech", "stack", "languages", "tools", "framework", "database", "programming"])) {
      return knowledge.skills;
    }

    if (includesAny(q, ["mobile", "android", "kotlin", "java", "jetpack", "compose"])) {
      return "Hlamulo has mobile development experience with Android, Kotlin, Java, and Jetpack Compose. His mobile work includes StudySinc, published on Google Play, and a Gasoline Mobile Application with multi-screen navigation and Material 3 UI.";
    }

    if (includesAny(q, ["full stack", "frontend", "front-end", "backend", "back-end", "web app", "asp.net", "mvc", "entity framework"])) {
      return "Hlamulo's full stack skills include HTML, CSS, JavaScript, C#, ASP.NET Core MVC, SQL, Entity Framework Core, REST APIs, database design, validation, and building user-friendly web interfaces.";
    }

    if (includesAny(q, ["projects", "project", "portfolio", "experience", "built", "build"])) {
      return knowledge.projects;
    }

    if (includesAny(q, ["studysinc", "study sinc", "google play", "published"])) {
      return knowledge.studysinc;
    }

    if (includesAny(q, ["lets move out", "let's move out", "move out", "moving", "website"])) {
      return knowledge.letsMoveOut;
    }

    if (includesAny(q, ["gasoline", "fuel"])) {
      return knowledge.gasoline;
    }

    if (includesAny(q, ["chatbot", "cybersecurity chatbot", "cyber security chatbot"])) {
      return knowledge.chatbot;
    }

    if (includesAny(q, ["order", "management app", "customer orders", "crud"])) {
      return knowledge.orderApp;
    }

    if (includesAny(q, ["cyber", "security", "ethical hacking", "secure", "owasp"])) {
      return "Hlamulo has cybersecurity knowledge through Ethical Hacking and secure development concepts. He is aware of secure input handling, data protection, vulnerabilities, basic hardening, and building applications with a security-aware mindset.";
    }

    if (includesAny(q, ["competencies", "strengths", "soft skills", "good at", "why hire", "candidate"])) {
      return `${knowledge.competencies} These strengths make him a strong junior developer candidate who can learn quickly and contribute to real software projects.`;
    }

    if (includesAny(q, ["cv", "resume", "download"])) {
      return knowledge.cv;
    }

    if (includesAny(q, ["contact", "reach", "email", "github", "linkedin", "social"])) {
      return `You can contact Hlamulo by email at ${knowledge.email}. His GitHub is ${knowledge.github}, and his LinkedIn is ${knowledge.linkedin}.`;
    }

    if (includesAny(q, ["career", "objective", "goal", "job", "intern", "internship", "junior"])) {
      return knowledge.objective;
    }

    if (includesAny(q, ["reference", "references"])) {
      return "Hlamulo's references are available upon request.";
    }

    return `I may not have an exact answer for that wording, but I can still help. ${knowledge.askTopics}`;
  }

  function handleSend() {
    const value = input.value.trim();
    if (!value) return;
    appendMessage(value, "user");
    input.value = "";
    const answer = getAnswer(value);
    setTimeout(() => appendMessage(answer, "ai"), 200);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });
})();
