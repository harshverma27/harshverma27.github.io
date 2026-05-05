const desktopEl = document.getElementById("desktop");
const windowsLayer = document.getElementById("windows-layer");
const startMenu = document.getElementById("start-menu");
const startPins = document.getElementById("start-pins");
const startBtn = document.getElementById("start-btn");
const runningApps = document.getElementById("running-apps");
const clockBtn = document.getElementById("clock");
const contextMenu = document.getElementById("context-menu");
const startSearch = document.getElementById("start-search");

let zTop = 30;
let selectedDesktopId = null;
let focusedWindowId = null;

const docs = {
  about: {
    title: "About Me",
    body: `
<h3>Harsh Verma</h3>
<p>Open-source contributor and backend-focused developer with practical experience in Android, automation, Linux systems, and embedded hardware projects.</p>
<h4>README.md</h4>
<ul>
  <li>Builds and ships software with CI-first workflows.</li>
  <li>Contributes to large-scale OSS projects in GNOME ecosystem.</li>
  <li>Works across backend systems, Raspberry Pi setups, and Android clients.</li>
</ul>
<p><strong>Current focus:</strong> developer tooling, reliable test automation, and scalable system workflows.</p>
`
  },
  projects: {
    title: "Projects",
    body: `
<h3>Projects</h3>
<h4>README.md</h4>
<ul>
  <li><strong>Real-Time Video Streaming System</strong>: Raspberry Pi Zero CCTV with motion detection and FFmpeg live stream pipeline.</li>
  <li><strong>Network-Level Ad Blocking System</strong>: custom DNS filtering setup on Raspberry Pi for network-wide ad blocking.</li>
  <li><strong>AyurGyanam</strong>: Android app with Django backend and Firebase auth/data integration.</li>
  <li><strong>Kissan-Connect</strong>: Android marketplace app for farmers and consumers with backend services.</li>
</ul>
<p><a href="https://github.com/harshverma27" target="_blank" rel="noreferrer">Open GitHub profile</a></p>
`
  },
  opensource: {
    title: "Open Source",
    body: `
<h3>Open Source Contributions</h3>
<h4>GNOME / GIMP / BABL / GEGL</h4>
<ul>
  <li>Built a unit testing framework for core GIMP libraries covering 65+ files.</li>
  <li>Integrated CI checks for automated validation on every commit.</li>
  <li>Found environment variable related bug during test framework analysis.</li>
  <li>Resolved duplicate GitLab pipeline issue and reduced resource usage by 50%.</li>
  <li>Improved blur behavior by switching to Gaussian-distributed kernels.</li>
</ul>
<p><a href="https://gitlab.gnome.org/harshverma" target="_blank" rel="noreferrer">Open GNOME GitLab profile</a></p>
`
  },
  experience: {
    title: "Experience",
    body: `
<h3>Volunteering Experience</h3>
<h4>README.md</h4>
<ul>
  <li><strong>SPEC Volunteer - Executive</strong>: coordinated Electrothon 8.0 for 500+ students.</li>
  <li><strong>Breakout Brigade 4.0</strong>: organized hardware workshop for 120+ students.</li>
  <li><strong>Electrothon 7.0</strong>: helped execute event with 2500+ registrations.</li>
</ul>
`
  },
  education: {
    title: "Education",
    body: `
<h3>Education</h3>
<ul>
  <li><strong>National Institute of Technology, Hamirpur</strong><br>B.Tech Electrical Engineering (Jul 2024 - May 2028, expected)</li>
  <li><strong>Vidya Bhawan Public School, Udaipur</strong><br>Class 12th - Physics, Chemistry, Mathematics</li>
</ul>
`
  },
  skills: {
    title: "Skills",
    body: `
<h3>Skills Summary</h3>
<ul>
  <li><strong>Automation</strong>: GitHub Actions, GitLab CI/CD, GitHub API</li>
  <li><strong>Programming</strong>: Kotlin, Python, C, C++, SQL, Bash</li>
  <li><strong>Embedded + Hardware</strong>: Embedded systems, PCB design, Raspberry Pi</li>
  <li><strong>Android</strong>: Jetpack Compose, Navigation, Firebase Authentication, Firestore</li>
  <li><strong>Backend + Databases</strong>: Django, Firebase, MySQL</li>
  <li><strong>Tools + Systems</strong>: Linux, FFmpeg, Git, GitHub, GTK+</li>
</ul>
`
  },
  certifications: {
    title: "Certifications",
    body: `
<h3>Certifications</h3>
<ul>
  <li>HackerRank Python Developer Certification (Feb 2025)</li>
  <li>HackerRank SQL Developer Certification (Jan 2025)</li>
</ul>
<p><a href="https://www.hackerrank.com/certificates/0a36877c8723" target="_blank" rel="noreferrer">Open Python certificate</a></p>
<p><a href="https://www.hackerrank.com/certificates/7ac243c30622" target="_blank" rel="noreferrer">Open SQL certificate</a></p>
`
  },
  hackathons: {
    title: "Hackathons",
    body: `
<h3>Hackathons</h3>
<ul>
  <li><strong>HackSecure - NITH</strong>: Android cybersecurity app using custom network tunnel and VPN logic.</li>
  <li><strong>Rekkathon - NITH</strong>: portable network security device with DNS filtering and live video monitoring.</li>
  <li><strong>Hack 5.0 - NITH</strong>: sign-language to English Chrome extension using frame-level recognition.</li>
</ul>
`
  },
  contact: {
    title: "Contact",
    body: `
<h3>Contact</h3>
<p><strong>Phone:</strong> +91 7073271194</p>
<p><strong>Personal Email:</strong> <a href="mailto:harshhvermaa@icloud.com">harshhvermaa@icloud.com</a></p>
<p><strong>Work Email:</strong> <a href="mailto:24bee048@nith.ac.in">24bee048@nith.ac.in</a></p>
<p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/harshhvermaa/" target="_blank" rel="noreferrer">@harshhvermaa</a></p>
<p><strong>GitHub:</strong> <a href="https://github.com/harshverma27" target="_blank" rel="noreferrer">@harshverma27</a></p>
`
  },
  resume: {
    title: "Resume",
    body: `
<h3>Resume</h3>
<p><a href="CV(HarshVerma).pdf" target="_blank" rel="noreferrer">Open CV(HarshVerma).pdf</a></p>
<p><a href="resumes/Resume_Harsh.pdf" target="_blank" rel="noreferrer">Open Resume_Harsh.pdf</a></p>
`
  }
};

const iconMeta = {
  about: "AM",
  projects: "PJ",
  opensource: "OS",
  experience: "EX",
  education: "ED",
  skills: "SK",
  certifications: "CR",
  hackathons: "HK",
  contact: "CT",
  resume: "CV"
};

const desktopOrder = Object.keys(docs);

const fileSystem = {
  desktop: [
    { id: "about", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "opensource", label: "Open Source" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certifications" },
    { id: "hackathons", label: "Hackathons" },
    { id: "contact", label: "Contact" },
    { id: "resume", label: "Resume" }
  ]
};

function createDesktop() {
  fileSystem.desktop.forEach((entry) => {
    const btn = document.createElement("button");
    btn.className = "desktop-icon";
    btn.dataset.id = entry.id;
    btn.innerHTML = `<div class="glyph">${iconMeta[entry.id]}</div><span>${entry.label}</span>`;
    btn.addEventListener("click", () => selectDesktopIcon(entry.id));
    btn.addEventListener("dblclick", () => openExplorer(entry.id));
    desktopEl.appendChild(btn);
  });
}

function selectDesktopIcon(id) {
  selectedDesktopId = id;
  document.querySelectorAll(".desktop-icon").forEach((el) => {
    el.classList.toggle("selected", el.dataset.id === id);
  });
}

function nextWindowPosition() {
  const openCount = document.querySelectorAll(".window").length;
  return {
    left: 120 + (openCount % 5) * 28,
    top: 58 + (openCount % 6) * 24
  };
}

function createWindow({ id, title, content, width = 760, height = 500 }) {
  const existing = document.getElementById(`window-${id}`);
  if (existing) {
    existing.classList.remove("hidden");
    focusWindow(existing);
    syncRunningApps();
    return existing;
  }

  const pos = nextWindowPosition();
  const win = document.createElement("article");
  win.className = "window";
  win.id = `window-${id}`;
  win.dataset.id = id;
  win.style.left = `${pos.left}px`;
  win.style.top = `${pos.top}px`;
  win.style.width = `${width}px`;
  win.style.height = `${height}px`;

  win.innerHTML = `
    <header class="window-header">
      <div class="window-title">${title}</div>
      <div class="window-actions">
        <button data-action="min" aria-label="Minimize">&#9472;</button>
        <button data-action="max" aria-label="Maximize">&#9723;</button>
        <button class="close-btn" data-action="close" aria-label="Close">&#10005;</button>
      </div>
    </header>
    <div class="window-content">${content}</div>
  `;

  const header = win.querySelector(".window-header");
  attachDrag(win, header);
  attachWindowActions(win);

  win.addEventListener("mousedown", () => focusWindow(win));
  windowsLayer.appendChild(win);
  focusWindow(win);
  syncRunningApps();
  return win;
}

function makeExplorerContent(sectionId) {
  const title = docs[sectionId].title;
  return `
    <div class="explorer">
      <aside class="explorer-side">
        <h4>Quick access</h4>
        ${fileSystem.desktop
          .map((entry) => {
            const active = entry.id === sectionId ? "active" : "";
            return `<button class="quick-link ${active}" data-open="${entry.id}">${entry.label}</button>`;
          })
          .join("")}
      </aside>
      <section class="explorer-main">
        <div class="crumb">This PC > Portfolio > ${title}</div>
        <div class="file-grid">
          <button class="file-card" data-doc="${sectionId}">
            <div class="file-icon">MD</div>
            <div class="file-name">README.md</div>
          </button>
        </div>
      </section>
    </div>
  `;
}

function bindExplorerEvents(win) {
  win.querySelectorAll(".quick-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      openExplorer(btn.dataset.open);
    });
  });

  win.querySelectorAll(".file-card").forEach((btn) => {
    btn.addEventListener("dblclick", () => {
      openDocWindow(btn.dataset.doc);
    });
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });
}

function openExplorer(sectionId) {
  const sectionTitle = docs[sectionId].title;
  const win = createWindow({
    id: `explorer-${sectionId}`,
    title: `${sectionTitle} - File Explorer`,
    content: makeExplorerContent(sectionId),
    width: 820,
    height: 540
  });
  bindExplorerEvents(win);
}

function openDocWindow(sectionId) {
  createWindow({
    id: `doc-${sectionId}`,
    title: `${docs[sectionId].title} - README.md`,
    content: docs[sectionId].body,
    width: 760,
    height: 520
  });
}

function attachWindowActions(win) {
  win.querySelectorAll(".window-actions button").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const action = btn.dataset.action;
      if (action === "close") {
        win.remove();
      } else if (action === "min") {
        win.classList.add("hidden");
      } else if (action === "max") {
        const isMax = win.dataset.maximized === "1";
        if (!isMax) {
          win.dataset.prev = JSON.stringify({
            left: win.style.left,
            top: win.style.top,
            width: win.style.width,
            height: win.style.height
          });
          win.style.left = "4px";
          win.style.top = "4px";
          win.style.width = "calc(100vw - 8px)";
          win.style.height = "calc(100vh - 52px)";
          win.dataset.maximized = "1";
        } else {
          const prev = JSON.parse(win.dataset.prev || "{}");
          win.style.left = prev.left || "120px";
          win.style.top = prev.top || "58px";
          win.style.width = prev.width || "760px";
          win.style.height = prev.height || "520px";
          win.dataset.maximized = "0";
        }
      }
      syncRunningApps();
    });
  });
}

function attachDrag(win, handle) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let baseLeft = 0;
  let baseTop = 0;

  handle.addEventListener("mousedown", (event) => {
    if (event.target.closest(".window-actions")) return;
    if (win.dataset.maximized === "1") return;
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    baseLeft = parseInt(win.style.left, 10) || 0;
    baseTop = parseInt(win.style.top, 10) || 0;
    focusWindow(win);
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (event) => {
    if (!dragging) return;
    const nextLeft = Math.max(0, baseLeft + event.clientX - startX);
    const nextTop = Math.max(0, baseTop + event.clientY - startY);
    win.style.left = `${nextLeft}px`;
    win.style.top = `${nextTop}px`;
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.userSelect = "";
  });
}

function focusWindow(win) {
  zTop += 1;
  focusedWindowId = win.id;
  document.querySelectorAll(".window").forEach((w) => w.classList.remove("focused"));
  win.classList.add("focused");
  win.style.zIndex = String(zTop);
  if (win.classList.contains("hidden")) win.classList.remove("hidden");
  syncRunningApps();
}

function syncRunningApps() {
  runningApps.innerHTML = "";
  const windows = [...document.querySelectorAll(".window")];
  windows.forEach((win) => {
    const btn = document.createElement("button");
    btn.className = "task-btn running";
    if (win.id === focusedWindowId) btn.classList.add("focused");
    btn.textContent = getTaskGlyph(win.dataset.id || "");
    btn.title = win.querySelector(".window-title")?.textContent || "Window";
    btn.addEventListener("click", () => {
      if (win.classList.contains("hidden")) {
        win.classList.remove("hidden");
        focusWindow(win);
      } else if (win.id === focusedWindowId) {
        win.classList.add("hidden");
      } else {
        focusWindow(win);
      }
      syncRunningApps();
    });
    runningApps.appendChild(btn);
  });
}

function getTaskGlyph(windowId) {
  const parts = windowId.split("-");
  const key = parts[parts.length - 1];
  return iconMeta[key] || "AP";
}

function openContextMenu(x, y, id) {
  const commonItems = [
    { label: "Open", run: () => openExplorer(id || selectedDesktopId || "about") },
    { label: "Open README.md", run: () => openDocWindow(id || selectedDesktopId || "about") },
    { label: "Refresh", run: () => location.reload() }
  ];

  contextMenu.innerHTML = "";
  commonItems.forEach((item) => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.addEventListener("click", () => {
      item.run();
      hideContextMenu();
    });
    contextMenu.appendChild(btn);
  });

  const maxX = window.innerWidth - 240;
  const maxY = window.innerHeight - 200;
  contextMenu.style.left = `${Math.min(x, maxX)}px`;
  contextMenu.style.top = `${Math.min(y, maxY)}px`;
  contextMenu.classList.remove("hidden");
}

function hideContextMenu() {
  contextMenu.classList.add("hidden");
}

function filterStartPins(query) {
  const normalized = query.trim().toLowerCase();
  [...startPins.querySelectorAll(".pin-btn")].forEach((btn) => {
    const visible = btn.dataset.name.includes(normalized);
    btn.classList.toggle("hidden", !visible);
  });
}

function buildStartPins() {
  desktopOrder.forEach((id) => {
    const btn = document.createElement("button");
    btn.className = "pin-btn";
    btn.dataset.name = docs[id].title.toLowerCase();
    btn.innerHTML = `<div class="file-icon">${iconMeta[id]}</div><div>${docs[id].title}</div>`;
    btn.addEventListener("click", () => {
      openExplorer(id);
      closeStartMenu();
    });
    startPins.appendChild(btn);
  });
}

function toggleStartMenu() {
  const willOpen = startMenu.classList.contains("hidden");
  startMenu.classList.toggle("hidden");
  startBtn.classList.toggle("active", willOpen);
  if (willOpen) {
    startSearch.value = "";
    filterStartPins("");
    setTimeout(() => startSearch.focus(), 20);
  }
}

function closeStartMenu() {
  startMenu.classList.add("hidden");
  startBtn.classList.remove("active");
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
  clockBtn.innerHTML = `${time}<br>${date}`;
}

document.addEventListener("click", (event) => {
  if (!event.target.closest("#start-menu") && !event.target.closest("#start-btn")) {
    closeStartMenu();
  }
  if (!event.target.closest("#context-menu")) {
    hideContextMenu();
  }
  if (!event.target.closest(".desktop-icon")) {
    selectedDesktopId = null;
    document.querySelectorAll(".desktop-icon").forEach((el) => el.classList.remove("selected"));
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeStartMenu();
    hideContextMenu();
  }
  if (event.key === "Enter" && selectedDesktopId) {
    openExplorer(selectedDesktopId);
  }
});

desktopEl.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const icon = event.target.closest(".desktop-icon");
  if (icon) {
    selectDesktopIcon(icon.dataset.id);
  }
  openContextMenu(event.clientX, event.clientY, icon?.dataset.id);
});

startBtn.addEventListener("click", toggleStartMenu);

startSearch.addEventListener("input", () => {
  filterStartPins(startSearch.value);
});

clockBtn.addEventListener("click", () => {
  openDocWindow("contact");
});

createDesktop();
buildStartPins();
updateClock();
setInterval(updateClock, 1000);
