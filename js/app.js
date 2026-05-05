const desktopEl = document.getElementById("desktop");
const windowsLayer = document.getElementById("windows-layer");
const startMenu = document.getElementById("start-menu");
const startPins = document.getElementById("start-pins");
const startBtn = document.getElementById("start-btn");
const runningApps = document.getElementById("running-apps");
const clockBtn = document.getElementById("clock");
const contextMenu = document.getElementById("context-menu");
const startSearch = document.getElementById("start-search");
const quickBtn = document.getElementById("quick-btn");
const netBtn = document.getElementById("net-btn");
const quickPanel = document.getElementById("quick-panel");
const calendarPanel = document.getElementById("calendar-panel");
const calendarMonth = document.getElementById("calendar-month");
const calendarGrid = document.getElementById("calendar-grid");
const brightness = document.getElementById("brightness");
const wallpaperEl = document.querySelector(".wallpaper");
const bootScreen = document.getElementById("boot-screen");
const lockScreen = document.getElementById("lock-screen");
const unlockBtn = document.getElementById("unlock-btn");
const lockTime = document.getElementById("lock-time");
const lockDate = document.getElementById("lock-date");

let zTop = 30;
let selectedDesktopId = null;
let focusedWindowId = null;
let snapMenuHideTimer = null;
let soundEnabled = true;

const docs = {
  about: { title: "About Me", body: `<div class="doc-pane"><h3>Harsh Verma</h3><p>Open-source contributor and backend-focused developer with practical experience in Android, automation, Linux systems, and embedded hardware projects.</p><h4>README.md</h4><ul><li>Builds and ships software with CI-first workflows.</li><li>Contributes to large-scale OSS projects in GNOME ecosystem.</li><li>Works across backend systems, Raspberry Pi setups, and Android clients.</li></ul><p><strong>Current focus:</strong> developer tooling, reliable test automation, and scalable system workflows.</p></div>` },
  projects: { title: "Projects", body: `<div class="doc-pane"><h3>Projects</h3><h4>README.md</h4><ul><li><strong>Real-Time Video Streaming System</strong>: Raspberry Pi Zero CCTV with motion detection and FFmpeg live stream pipeline.</li><li><strong>Network-Level Ad Blocking System</strong>: custom DNS filtering setup on Raspberry Pi for network-wide ad blocking.</li><li><strong>AyurGyanam</strong>: Android app with Django backend and Firebase auth/data integration.</li><li><strong>Kissan-Connect</strong>: Android marketplace app for farmers and consumers with backend services.</li></ul><p><a href="https://github.com/harshverma27" target="_blank" rel="noreferrer">Open GitHub profile</a></p></div>` },
  opensource: { title: "Open Source", body: `<div class="doc-pane"><h3>Open Source Contributions</h3><h4>GNOME / GIMP / BABL / GEGL</h4><ul><li>Built a unit testing framework for core GIMP libraries covering 65+ files.</li><li>Integrated CI checks for automated validation on every commit.</li><li>Found environment variable related bug during test framework analysis.</li><li>Resolved duplicate GitLab pipeline issue and reduced resource usage by 50%.</li><li>Improved blur behavior by switching to Gaussian-distributed kernels.</li></ul><p><a href="https://gitlab.gnome.org/harshverma" target="_blank" rel="noreferrer">Open GNOME GitLab profile</a></p></div>` },
  experience: { title: "Experience", body: `<div class="doc-pane"><h3>Volunteering Experience</h3><h4>README.md</h4><ul><li><strong>SPEC Volunteer - Executive</strong>: coordinated Electrothon 8.0 for 500+ students.</li><li><strong>Breakout Brigade 4.0</strong>: organized hardware workshop for 120+ students.</li><li><strong>Electrothon 7.0</strong>: helped execute event with 2500+ registrations.</li></ul></div>` },
  education: { title: "Education", body: `<div class="doc-pane"><h3>Education</h3><ul><li><strong>National Institute of Technology, Hamirpur</strong><br>B.Tech Electrical Engineering (Jul 2024 - May 2028, expected)</li><li><strong>Vidya Bhawan Public School, Udaipur</strong><br>Class 12th - Physics, Chemistry, Mathematics</li></ul></div>` },
  skills: { title: "Skills", body: `<div class="doc-pane"><h3>Skills Summary</h3><ul><li><strong>Automation</strong>: GitHub Actions, GitLab CI/CD, GitHub API</li><li><strong>Programming</strong>: Kotlin, Python, C, C++, SQL, Bash</li><li><strong>Embedded + Hardware</strong>: Embedded systems, PCB design, Raspberry Pi</li><li><strong>Android</strong>: Jetpack Compose, Navigation, Firebase Authentication, Firestore</li><li><strong>Backend + Databases</strong>: Django, Firebase, MySQL</li><li><strong>Tools + Systems</strong>: Linux, FFmpeg, Git, GitHub, GTK+</li></ul></div>` },
  certifications: { title: "Certifications", body: `<div class="doc-pane"><h3>Certifications</h3><ul><li>HackerRank Python Developer Certification (Feb 2025)</li><li>HackerRank SQL Developer Certification (Jan 2025)</li></ul><p><a href="https://www.hackerrank.com/certificates/0a36877c8723" target="_blank" rel="noreferrer">Open Python certificate</a></p><p><a href="https://www.hackerrank.com/certificates/7ac243c30622" target="_blank" rel="noreferrer">Open SQL certificate</a></p></div>` },
  hackathons: { title: "Hackathons", body: `<div class="doc-pane"><h3>Hackathons</h3><ul><li><strong>HackSecure - NITH</strong>: Android cybersecurity app using custom network tunnel and VPN logic.</li><li><strong>Rekkathon - NITH</strong>: portable network security device with DNS filtering and live video monitoring.</li><li><strong>Hack 5.0 - NITH</strong>: sign-language to English Chrome extension using frame-level recognition.</li></ul></div>` },
  contact: { title: "Contact", body: `<div class="doc-pane"><h3>Contact</h3><p><strong>Phone:</strong> +91 7073271194</p><p><strong>Personal Email:</strong> <a href="mailto:harshhvermaa@icloud.com">harshhvermaa@icloud.com</a></p><p><strong>Work Email:</strong> <a href="mailto:24bee048@nith.ac.in">24bee048@nith.ac.in</a></p><p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/harshhvermaa/" target="_blank" rel="noreferrer">@harshhvermaa</a></p><p><strong>GitHub:</strong> <a href="https://github.com/harshverma27" target="_blank" rel="noreferrer">@harshverma27</a></p></div>` },
  resume: { title: "Resume", body: `<div class="doc-pane"><h3>Resume</h3><p><a href="CV(HarshVerma).pdf" target="_blank" rel="noreferrer">Open CV(HarshVerma).pdf</a></p><p><a href="resumes/Resume_Harsh.pdf" target="_blank" rel="noreferrer">Open Resume_Harsh.pdf</a></p></div>` }
};

const iconMeta = {
  about: "doc",
  projects: "folder",
  opensource: "code",
  experience: "folder",
  education: "doc",
  skills: "code",
  certifications: "doc",
  hackathons: "chat",
  contact: "chat",
  resume: "doc"
};

const fileSystem = {
  desktop: ["about", "projects", "opensource", "experience", "education", "skills", "certifications", "hackathons", "contact", "resume"]
};

function createIconClass(type) {
  return `<div class="glyph ${type}"></div>`;
}

function createDesktop() {
  fileSystem.desktop.forEach((id) => {
    const btn = document.createElement("button");
    btn.className = "desktop-icon";
    btn.dataset.id = id;
    btn.innerHTML = `${createIconClass(iconMeta[id])}<span>${docs[id].title}</span>`;
    btn.addEventListener("click", () => selectDesktopIcon(id));
    btn.addEventListener("dblclick", () => openExplorer(id));
    desktopEl.appendChild(btn);
  });
}

function selectDesktopIcon(id) {
  selectedDesktopId = id;
  document.querySelectorAll(".desktop-icon").forEach((el) => el.classList.toggle("selected", el.dataset.id === id));
}

function nextWindowPosition() {
  const openCount = document.querySelectorAll(".window").length;
  return { left: 90 + (openCount % 6) * 22, top: 54 + (openCount % 7) * 20 };
}

function attachResizeHandles(win) {
  ["n", "e", "s", "w", "ne", "nw", "se", "sw"].forEach((dir) => {
    const handle = document.createElement("div");
    handle.className = `resize-handle resize-${dir}`;
    handle.dataset.dir = dir;
    win.appendChild(handle);
    handle.addEventListener("mousedown", (event) => startResize(event, win, dir));
  });
}

function startResize(event, win, dir) {
  event.preventDefault();
  const startX = event.clientX;
  const startY = event.clientY;
  const startW = win.offsetWidth;
  const startH = win.offsetHeight;
  const startL = win.offsetLeft;
  const startT = win.offsetTop;

  const onMove = (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (dir.includes("e")) win.style.width = `${Math.max(340, startW + dx)}px`;
    if (dir.includes("s")) win.style.height = `${Math.max(240, startH + dy)}px`;
    if (dir.includes("w")) {
      const width = Math.max(340, startW - dx);
      win.style.width = `${width}px`;
      win.style.left = `${startL + (startW - width)}px`;
    }
    if (dir.includes("n")) {
      const height = Math.max(240, startH - dy);
      win.style.height = `${height}px`;
      win.style.top = `${startT + (startH - height)}px`;
    }
  };

  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.body.style.userSelect = "";
  };

  document.body.style.userSelect = "none";
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
}

function createWindow({ id, title, content, width = 860, height = 560 }) {
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
  win.innerHTML = `<header class="window-header"><div class="window-title">${title}</div><div class="window-actions"><button data-action="min" aria-label="Minimize">&#9472;</button><button data-action="max" aria-label="Maximize">&#9723;</button><button class="close-btn" data-action="close" aria-label="Close">&#10005;</button></div></header><div class="window-content">${content}</div>`;

  const header = win.querySelector(".window-header");
  attachDrag(win, header);
  attachResizeHandles(win);
  attachWindowActions(win);
  attachSnapMenu(win);
  win.addEventListener("mousedown", () => focusWindow(win));
  windowsLayer.appendChild(win);
  focusWindow(win);
  syncRunningApps();
  playTone(620, 0.03);
  return win;
}

function makeExplorerContent(sectionId) {
  const title = docs[sectionId].title;
  const links = fileSystem.desktop.map((id) => `<button class="quick-link ${id === sectionId ? "active" : ""}" data-open="${id}">${docs[id].title}</button>`).join("");
  return `<div class="explorer-chrome"><button class="exp-btn">&#8592;</button><button class="exp-btn">&#8594;</button><button class="exp-btn">&#8593;</button><div class="address">This PC > Portfolio > ${title}</div><input class="search-mini" placeholder="Search ${title}" /></div><div class="explorer"><aside class="explorer-side"><h4>Quick access</h4>${links}</aside><section class="explorer-main"><div class="crumb">Items in ${title}</div><div class="explorer-toolbar"><button class="exp-btn view-btn" data-view="grid">Tiles</button><button class="exp-btn view-btn" data-view="list">List</button><button class="exp-btn view-btn" data-view="details">Details</button><button class="exp-btn sort-btn" data-sort="name">Sort A-Z</button></div><div class="file-grid" data-view="grid"><button class="file-card" data-doc="${sectionId}" data-name="README.md"><div class="file-icon doc"></div><div class="file-name">README.md</div></button><button class="file-card" data-doc="resume" data-name="Resume.pdf"><div class="file-icon doc"></div><div class="file-name">Resume.pdf</div></button></div><table class="details-table hidden"><thead><tr><th>Name</th><th>Type</th><th>Date modified</th><th>Size</th></tr></thead><tbody><tr data-doc="${sectionId}" data-name="README.md"><td>README.md</td><td>Markdown</td><td>${new Date().toLocaleDateString()}</td><td>4 KB</td></tr><tr data-doc="resume" data-name="Resume.pdf"><td>Resume.pdf</td><td>PDF</td><td>${new Date().toLocaleDateString()}</td><td>120 KB</td></tr></tbody></table></section><aside class="explorer-details"><h4>Details</h4><p><strong>Name:</strong> ${title}</p><p><strong>Type:</strong> Portfolio folder</p><p><strong>Contains:</strong> README.md</p><p><strong>Updated:</strong> ${new Date().toLocaleDateString()}</p></aside></div>`;
}

function bindExplorerEvents(win) {
  win.querySelectorAll(".quick-link").forEach((btn) => btn.addEventListener("click", () => openExplorer(btn.dataset.open)));
  win.querySelectorAll(".file-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      win.querySelectorAll(".file-card").forEach((f) => f.classList.remove("active"));
      btn.classList.add("active");
    });
    btn.addEventListener("dblclick", () => openDocWindow(btn.dataset.doc));
  });

  win.querySelectorAll(".details-table tbody tr").forEach((row) => {
    row.addEventListener("dblclick", () => openDocWindow(row.dataset.doc));
  });

  win.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const grid = win.querySelector(".file-grid");
      const table = win.querySelector(".details-table");
      const mode = btn.dataset.view;
      grid.dataset.view = mode;
      grid.classList.toggle("list-view", mode === "list");
      const detailsMode = mode === "details";
      grid.classList.toggle("hidden", detailsMode);
      table.classList.toggle("hidden", !detailsMode);
    });
  });

  win.querySelectorAll(".sort-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const grid = win.querySelector(".file-grid");
      const cards = [...grid.querySelectorAll(".file-card")];
      cards.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
      cards.forEach((card) => grid.appendChild(card));

      const tbody = win.querySelector(".details-table tbody");
      const rows = [...tbody.querySelectorAll("tr")];
      rows.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
      rows.forEach((row) => tbody.appendChild(row));
    });
  });
}

function openExplorer(sectionId) {
  const win = createWindow({ id: `explorer-${sectionId}`, title: `${docs[sectionId].title} - File Explorer`, content: makeExplorerContent(sectionId), width: 960, height: 600 });
  bindExplorerEvents(win);
}

function openDocWindow(sectionId) {
  createWindow({ id: `doc-${sectionId}`, title: `${docs[sectionId].title} - README.md`, content: docs[sectionId].body, width: 780, height: 560 });
}

function attachWindowActions(win) {
  win.querySelectorAll(".window-actions button").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const action = btn.dataset.action;
      if (action === "close") win.remove();
      if (action === "min") {
        playTone(290, 0.03);
        win.classList.add("anim-minimize");
        setTimeout(() => {
          win.classList.add("hidden");
          win.classList.remove("anim-minimize");
        }, 140);
      }
      if (action === "max") {
        playTone(520, 0.03);
        const max = win.dataset.maximized === "1";
        if (!max) {
          win.dataset.prev = JSON.stringify({ left: win.style.left, top: win.style.top, width: win.style.width, height: win.style.height });
          win.style.left = "4px";
          win.style.top = "4px";
          win.style.width = "calc(100vw - 8px)";
          win.style.height = "calc(100vh - 52px)";
          win.dataset.maximized = "1";
        } else {
          const prev = JSON.parse(win.dataset.prev || "{}");
          win.style.left = prev.left || "90px";
          win.style.top = prev.top || "54px";
          win.style.width = prev.width || "860px";
          win.style.height = prev.height || "560px";
          win.dataset.maximized = "0";
        }
      }
      syncRunningApps();
    });
  });
}

function attachSnapMenu(win) {
  const maxBtn = win.querySelector('[data-action="max"]');
  if (!maxBtn) return;

  const menu = document.createElement("div");
  menu.className = "menu hidden";
  menu.innerHTML = `<button data-layout="left">Snap left</button><button data-layout="right">Snap right</button><button data-layout="max">Maximize</button><button data-layout="restore">Restore</button>`;
  document.body.appendChild(menu);

  const showMenu = () => {
    const rect = maxBtn.getBoundingClientRect();
    menu.style.left = `${Math.max(8, rect.left - 30)}px`;
    menu.style.top = `${rect.bottom + 6}px`;
    menu.classList.remove("hidden");
  };

  const hideMenu = () => {
    menu.classList.add("hidden");
  };

  maxBtn.addEventListener("mouseenter", () => {
    clearTimeout(snapMenuHideTimer);
    showMenu();
  });

  maxBtn.addEventListener("mouseleave", () => {
    snapMenuHideTimer = setTimeout(hideMenu, 180);
  });

  menu.addEventListener("mouseenter", () => clearTimeout(snapMenuHideTimer));
  menu.addEventListener("mouseleave", () => (snapMenuHideTimer = setTimeout(hideMenu, 120)));

  menu.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.layout;
      if (mode === "left") {
        win.style.left = "4px";
        win.style.top = "4px";
        win.style.width = "calc(50vw - 8px)";
        win.style.height = "calc(100vh - 52px)";
      } else if (mode === "right") {
        win.style.left = "calc(50vw + 4px)";
        win.style.top = "4px";
        win.style.width = "calc(50vw - 8px)";
        win.style.height = "calc(100vh - 52px)";
      } else if (mode === "max") {
        win.style.left = "4px";
        win.style.top = "4px";
        win.style.width = "calc(100vw - 8px)";
        win.style.height = "calc(100vh - 52px)";
      } else if (mode === "restore") {
        const prev = JSON.parse(win.dataset.prev || "{}");
        win.style.left = prev.left || "90px";
        win.style.top = prev.top || "54px";
        win.style.width = prev.width || "860px";
        win.style.height = prev.height || "560px";
      }
      hideMenu();
      playTone(570, 0.03);
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
    win.style.left = `${Math.max(0, baseLeft + event.clientX - startX)}px`;
    win.style.top = `${Math.max(0, baseTop + event.clientY - startY)}px`;
    showSnapPreview(event.clientX, event.clientY);
  });

  document.addEventListener("mouseup", () => {
    if (!dragging) return;
    applySnap(win);
    clearSnapPreview();
    dragging = false;
    document.body.style.userSelect = "";
  });
}

function showSnapPreview(clientX, clientY) {
  clearSnapPreview();
  if (window.innerWidth < 900) return;
  if (clientY < 12) windowsLayer.classList.add("snap-max");
  else if (clientX < 16) windowsLayer.classList.add("snap-left");
  else if (clientX > window.innerWidth - 16) windowsLayer.classList.add("snap-right");
}

function clearSnapPreview() { windowsLayer.classList.remove("snap-left", "snap-right", "snap-max"); }

function applySnap(win) {
  if (windowsLayer.classList.contains("snap-max")) {
    win.style.left = "4px"; win.style.top = "4px"; win.style.width = "calc(100vw - 8px)"; win.style.height = "calc(100vh - 52px)";
  } else if (windowsLayer.classList.contains("snap-left")) {
    win.style.left = "4px"; win.style.top = "4px"; win.style.width = "calc(50vw - 8px)"; win.style.height = "calc(100vh - 52px)";
  } else if (windowsLayer.classList.contains("snap-right")) {
    win.style.left = "calc(50vw + 4px)"; win.style.top = "4px"; win.style.width = "calc(50vw - 8px)"; win.style.height = "calc(100vh - 52px)";
  }
}

function focusWindow(win) {
  zTop += 1;
  focusedWindowId = win.id;
  document.querySelectorAll(".window").forEach((w) => w.classList.remove("focused"));
  win.classList.add("focused");
  win.style.zIndex = String(zTop);
  win.classList.remove("hidden");
  syncRunningApps();
}

function glyphFromWindowId(windowId) {
  const key = windowId.split("-").pop();
  return iconMeta[key] || "doc";
}

function syncRunningApps() {
  runningApps.innerHTML = "";
  document.querySelectorAll(".window").forEach((win) => {
    const glyph = glyphFromWindowId(win.dataset.id || "");
    const btn = document.createElement("button");
    btn.className = "task-btn running";
    if (win.id === focusedWindowId) btn.classList.add("focused");
    btn.innerHTML = `<span class="tb-glyph ${glyph}"></span>`;
    btn.title = win.querySelector(".window-title")?.textContent || "Window";
    btn.addEventListener("click", () => {
      if (win.classList.contains("hidden")) {
        win.classList.remove("hidden");
        win.classList.add("anim-restore");
        setTimeout(() => win.classList.remove("anim-restore"), 150);
        focusWindow(win);
        playTone(500, 0.03);
      }
      else if (win.id === focusedWindowId) win.classList.add("hidden");
      else focusWindow(win);
      syncRunningApps();
    });

    btn.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      contextMenu.innerHTML = "";
      [
        { label: "Restore", run: () => focusWindow(win) },
        { label: "Minimize", run: () => win.classList.add("hidden") },
        { label: "Close window", run: () => win.remove() }
      ].forEach((item) => {
        const menuBtn = document.createElement("button");
        menuBtn.textContent = item.label;
        menuBtn.addEventListener("click", () => {
          item.run();
          hideContextMenu();
          syncRunningApps();
          playTone(380, 0.02);
        });
        contextMenu.appendChild(menuBtn);
      });
      contextMenu.style.left = `${Math.min(event.clientX, window.innerWidth - 220)}px`;
      contextMenu.style.top = `${Math.min(event.clientY, window.innerHeight - 160)}px`;
      contextMenu.classList.remove("hidden");
    });

    runningApps.appendChild(btn);
  });
}

function playTone(freq, dur) {
  if (!soundEnabled) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = "sine";
  gain.gain.value = 0.025;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + dur);
  osc.onended = () => ctx.close();
}

function setWallpaper(urlValue) {
  wallpaperEl.style.backgroundImage = `${urlValue}, radial-gradient(circle at 25% 32%, rgba(105, 168, 255, 0.4), transparent 36%), linear-gradient(145deg, #123160 0%, #0e2444 45%, #08162b 100%)`;
}

function openContextMenu(x, y, id) {
  const selected = id || selectedDesktopId || "about";
  const actions = [
    { label: "Open", run: () => openExplorer(selected) },
    { label: "Open README.md", run: () => openDocWindow(selected) },
    { label: "Wallpaper: Bloom", run: () => setWallpaper("url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2200&q=80')") },
    { label: "Wallpaper: Aurora", run: () => setWallpaper("url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=80')") },
    { label: "Wallpaper: Night", run: () => setWallpaper("url('https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=2200&q=80')") },
    { label: "Refresh", run: () => location.reload() }
  ];

  contextMenu.innerHTML = "";
  actions.forEach((item) => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.addEventListener("click", () => { item.run(); hideContextMenu(); });
    contextMenu.appendChild(btn);
  });

  contextMenu.style.left = `${Math.min(x, window.innerWidth - 240)}px`;
  contextMenu.style.top = `${Math.min(y, window.innerHeight - 240)}px`;
  contextMenu.classList.remove("hidden");
}

function hideContextMenu() { contextMenu.classList.add("hidden"); }

function filterStartPins(query) {
  const q = query.trim().toLowerCase();
  [...startPins.querySelectorAll(".pin-btn")].forEach((btn) => btn.classList.toggle("hidden", !btn.dataset.name.includes(q)));
}

function buildStartPins() {
  fileSystem.desktop.forEach((id) => {
    const btn = document.createElement("button");
    btn.className = "pin-btn";
    btn.dataset.name = docs[id].title.toLowerCase();
    btn.innerHTML = `<div class="file-icon ${iconMeta[id]}"></div><div>${docs[id].title}</div>`;
    btn.addEventListener("click", () => { openExplorer(id); closeStartMenu(); });
    startPins.appendChild(btn);
  });
}

function toggleStartMenu() {
  const open = startMenu.classList.contains("hidden");
  startMenu.classList.toggle("hidden", !open);
  startBtn.classList.toggle("active", open);
  if (open) {
    startSearch.value = "";
    filterStartPins("");
    setTimeout(() => startSearch.focus(), 20);
  }
}

function closeStartMenu() { startMenu.classList.add("hidden"); startBtn.classList.remove("active"); }

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
  clockBtn.innerHTML = `${time}<br>${date}`;
  lockTime.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  lockDate.textContent = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

function buildCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  calendarMonth.textContent = now.toLocaleDateString([], { month: "long", year: "numeric" });
  calendarGrid.innerHTML = "";
  for (let i = 0; i < startOffset; i += 1) {
    const cell = document.createElement("div");
    cell.className = "cal-day dim";
    cell.textContent = String(prevMonthDays - startOffset + i + 1);
    calendarGrid.appendChild(cell);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const cell = document.createElement("div");
    cell.className = `cal-day${day === today ? " today" : ""}`;
    cell.textContent = String(day);
    calendarGrid.appendChild(cell);
  }
}

function toggleQuickPanel() {
  const open = quickPanel.classList.contains("hidden");
  quickPanel.classList.toggle("hidden", !open);
  quickBtn.classList.toggle("active", open);
  netBtn.classList.toggle("active", open);
  calendarPanel.classList.add("hidden");
  clockBtn.classList.remove("active");
}

function toggleCalendarPanel() {
  const open = calendarPanel.classList.contains("hidden");
  calendarPanel.classList.toggle("hidden", !open);
  clockBtn.classList.toggle("active", open);
  quickPanel.classList.add("hidden");
  quickBtn.classList.remove("active");
  netBtn.classList.remove("active");
}

function hideFlyouts() {
  quickPanel.classList.add("hidden");
  calendarPanel.classList.add("hidden");
  quickBtn.classList.remove("active");
  netBtn.classList.remove("active");
  clockBtn.classList.remove("active");
}

function runBootSequence() {
  updateClock();
  setTimeout(() => {
    bootScreen.classList.add("hidden");
    lockScreen.classList.remove("hidden");
  }, 1500);
}

document.addEventListener("click", (event) => {
  if (!event.target.closest("#start-menu") && !event.target.closest("#start-btn")) closeStartMenu();
  if (!event.target.closest("#context-menu")) hideContextMenu();
  if (!event.target.closest('[data-action="max"]') && !event.target.closest('.menu')) {
    document.querySelectorAll(".menu").forEach((menu) => {
      if (menu !== contextMenu) menu.classList.add("hidden");
    });
  }
  if (!event.target.closest("#quick-panel") && !event.target.closest("#quick-btn") && !event.target.closest("#net-btn") && !event.target.closest("#calendar-panel") && !event.target.closest("#clock")) hideFlyouts();
  if (!event.target.closest(".desktop-icon")) {
    selectedDesktopId = null;
    document.querySelectorAll(".desktop-icon").forEach((el) => el.classList.remove("selected"));
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeStartMenu();
    hideContextMenu();
    hideFlyouts();
  }
  if (event.key === "Enter" && selectedDesktopId) openExplorer(selectedDesktopId);
});

desktopEl.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const icon = event.target.closest(".desktop-icon");
  if (icon) selectDesktopIcon(icon.dataset.id);
  openContextMenu(event.clientX, event.clientY, icon?.dataset.id);
});

startBtn.addEventListener("click", toggleStartMenu);
startSearch.addEventListener("input", () => filterStartPins(startSearch.value));
clockBtn.addEventListener("click", toggleCalendarPanel);
quickBtn.addEventListener("click", toggleQuickPanel);
netBtn.addEventListener("click", toggleQuickPanel);
unlockBtn.addEventListener("click", () => lockScreen.classList.add("hidden"));

document.querySelectorAll(".pin-app").forEach((btn) => {
  const id = btn.dataset.pin;
  btn.innerHTML = `<span class="tb-glyph ${iconMeta[id] || "doc"}"></span>`;
  btn.addEventListener("click", () => openExplorer(id));
});

brightness.addEventListener("input", () => {
  document.body.style.filter = `brightness(${brightness.value}%)`;
});

document.querySelectorAll(".quick-tile").forEach((tile) => tile.addEventListener("click", () => tile.classList.toggle("active")));

const soundTile = [...document.querySelectorAll(".quick-tile")].find((tile) => tile.textContent.trim() === "Focus mode");
if (soundTile) {
  soundTile.textContent = "System sound";
  soundTile.classList.add("active");
  soundTile.addEventListener("click", () => {
    soundEnabled = soundTile.classList.contains("active");
  });
}

createDesktop();
buildStartPins();
buildCalendar();
updateClock();
setInterval(updateClock, 1000);
runBootSequence();
