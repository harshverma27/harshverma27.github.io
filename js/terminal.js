const fileSystem = {
    type: "directory",
    children: {
        "about.sh": {
            type: "executable",
            content: `<div class="color-primary" style="font-size: 1.2em; margin-bottom: 10px;">👋 Hi, I'm Harsh Verma!</div>
<div class="color-text" style="margin-bottom: 5px;">I'm an Electrical Engineering undergrad at NIT Hamirpur (2024-2028).</div>
<div class="color-text" style="margin-bottom: 5px;">I'm passionate about building robust applications—specializing in 
<span class="color-highlight">Android Development (Jetpack Compose)</span> and <span class="color-highlight">Backend (Django, Firebase)</span>.</div>
<div class="color-text">When I'm not coding, I'm volunteering at tech clubs or exploring new architectures.</div>`,
            source: `#!/bin/bash\necho "👋 Hi, I'm Harsh Verma!"\necho "I'm an Electrical Engineering undergrad at NIT Hamirpur (2024-2028)."\necho "I'm passionate about building robust applications—specializing in Android and Backend."`
        },
        "contact.sh": {
            type: "executable",
            content: `<div><span class="color-highlight">Email:</span> <a href="mailto:harshhvermaa@icloud.com">harshhvermaa@icloud.com</a></div>
<div><span class="color-highlight">LinkedIn:</span> <a href="https://linkedin.com/in/harshhvermaa" target="_blank">linkedin.com/in/harshhvermaa</a></div>
<div><span class="color-highlight">GitHub:</span> <a href="https://github.com/harshverma27" target="_blank">github.com/harshverma27</a></div>
<div style="margin-top: 10px;"><span class="color-highlight">Resume:</span> <a href="resumes/Resume_Harsh.pdf" target="_blank">View/Download PDF</a></div>`,
            source: `#!/bin/bash\necho "Email: harshhvermaa@icloud.com"\necho "LinkedIn: linkedin.com/in/harshhvermaa"\necho "GitHub: github.com/harshverma27"\necho "Resume: resumes/Resume_Harsh.pdf"`
        },
        "education": {
            type: "directory",
            children: {
                "nit-hamirpur.sh": {
                    type: "executable",
                    content: `<div class="color-primary">National Institute of Technology, Hamirpur</div>
<div class="color-secondary">Bachelor of Technology - Electrical Engineering</div>
<div class="color-text">July 2024 - May 2028 (Expected)</div>`,
                    source: `#!/bin/bash\necho "NIT Hamirpur"\necho "B.Tech Electrical Engineering"\necho "2024 - 2028"`
                }
            }
        },
        "skills": {
            type: "directory",
            children: {
                "programming.sh": {
                    type: "executable",
                    content: `<div class="color-text"><span class="color-highlight">Languages:</span> Kotlin, Python, C++, SQL, Bash</div>`,
                    source: `#!/bin/bash\necho "Kotlin, Python, C++, SQL, Bash"`
                },
                "android.sh": {
                    type: "executable",
                    content: `<div class="color-text"><span class="color-highlight">Android:</span> Jetpack Compose, Navigation, Firebase Auth, Firestore</div>`,
                    source: `#!/bin/bash\necho "Jetpack Compose, Navigation, Firebase Auth, Firestore"`
                },
                "backend.sh": {
                    type: "executable",
                    content: `<div class="color-text"><span class="color-highlight">Backend:</span> Django, Firebase, MySQL</div>`,
                    source: `#!/bin/bash\necho "Django, Firebase, MySQL"`
                }
            }
        },
        "projects": {
            type: "directory",
            children: {
                "ayurgyanam.sh": {
                    type: "executable",
                    content: `<div class="color-primary" style="font-size: 1.1em;">AyurGyanam 🌿</div>
<div class="color-secondary" style="margin-bottom: 5px;">An Android app dedicated towards Herbal Health</div>
<div class="color-text" style="margin-bottom: 5px;">Built a full-stack Android application using Kotlin and Jetpack Compose focused on herbal health. Backend handles plant information, symptom responses, and chatbot queries.</div>
<div class="color-highlight">Tech Stack: Kotlin, Jetpack, Python, Django, Firebase</div>
<div style="margin-top: 5px;"><a href="https://github.com/harshverma27/AyurvedaProject" target="_blank">[ View on GitHub ]</a></div>`,
                    source: `#!/bin/bash\n# AyurGyanam\necho "App dedicated to Herbal Health"`
                },
                "kissan-connect.sh": {
                    type: "executable",
                    content: `<div class="color-primary" style="font-size: 1.1em;">Kissan-Connect 🌾</div>
<div class="color-secondary" style="margin-bottom: 5px;">Marketplace app for farmers</div>
<div class="color-text" style="margin-bottom: 5px;">Connects farmers directly with consumers. Includes authentication, product data, and listings.</div>
<div class="color-highlight">Tech Stack: Python, Kotlin, Jetpack Compose, Firebase and Django</div>
<div style="margin-top: 5px;"><a href="https://github.com/harshverma27/Kissan-Connect" target="_blank">[ View on GitHub ]</a></div>`,
                    source: `#!/bin/bash\n# Kissan Connect\necho "Marketplace that connects farmers to consumers."`
                },
                "zk-battleship.sh": {
                    type: "executable",
                    content: `<div class="color-primary" style="font-size: 1.1em;">ZK Battleship on Stellar 🚢</div>
<div class="color-secondary" style="margin-bottom: 5px;">Trustless Battleship with Zero Knowledge Proofs</div>
<div class="color-text" style="margin-bottom: 5px;">Built for the BNB Chain Hackathon. Features private board commitments via Poseidon hashes and verified hit/miss claims on Stellar Soroban smart contracts.</div>
<div class="color-highlight">Tech Stack: Noir (ZK), Stellar, Soroban, React</div>
<div style="margin-top: 5px;"><a href="https://github.com/harshverma27/ZK-Battleship-on-Stellar" target="_blank">[ View on GitHub ]</a></div>`,
                    source: `#!/bin/bash\n# ZK Battleship\necho "Target: ZK Gaming on Stellar Hackathon"`
                },
                "checkpointctl.sh": {
                    type: "executable",
                    content: `<div class="color-primary" style="font-size: 1.1em;">checkpointctl 📦</div>
<div class="color-secondary" style="margin-bottom: 5px;">A tool for in-depth analysis of container checkpoints</div>
<div class="color-text" style="margin-bottom: 5px;">CLI tool to analyze checkpoints of containers, showing detailed memory, process, and state information.</div>
<div class="color-highlight">Tech Stack: Go, Containers, Linux</div>
<div style="margin-top: 5px;"><a href="https://github.com/harshverma27/checkpointctl" target="_blank">[ View on GitHub ]</a></div>`,
                    source: `#!/bin/bash\n# checkpointctl\necho "A tool for in-depth analysis of container checkpoints"`
                }
            }
        },
        "experience": {
            type: "directory",
            children: {
                "hackerrank.sh": {
                    type: "executable",
                    content: `<div class="color-primary">HackerRank Campus Crew - Ambassador</div>
<div class="color-text">November 2025 - Present</div>
<div class="color-text">Orchestrated a competitive coding event for 100+ participants at NIT Hamirpur.</div>`,
                    source: `#!/bin/bash\necho "HackerRank Ambassador"`
                },
                "spec.sh": {
                    type: "executable",
                    content: `<div class="color-primary">Society For Promotions of Electronics Culture - Volunteer</div>
<div class="color-text">September 2024 - Present</div>
<div class="color-text">Organised Breakout Brigade 4.0 hardware workshop and Electrothon 7.0 hackathon.</div>`,
                    source: `#!/bin/bash\necho "SPEC Volunteer"`
                }
            }
        }
    }
};

let currentPathNames = [];

const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const promptDirSpan = document.getElementById('prompt-dir');

let commandHistory = [];
let historyIndex = -1;

function updatePrompt() {
    let dirText = currentPathNames.length === 0 ? "~" : "~/" + currentPathNames.join('/');
    promptDirSpan.textContent = dirText;
}

function printToOutput(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    outputDiv.appendChild(div);
}

function printCommandAction(cmdString) {
    let dirText = currentPathNames.length === 0 ? "~" : "~/" + currentPathNames.join('/');
    const html = `
        <div style="margin-top: 10px; margin-bottom: 5px; display: flex;">
            <span class="prompt"><span class="prompt-user">guest@harshos</span><span class="prompt-symbol">:</span><span class="prompt-dir">${dirText}</span><span class="prompt-symbol">$</span></span>
            <span style="color: var(--text-color); font-weight: 500;">${escapeHTML(cmdString)}</span>
        </div>
    `;
    printToOutput(html);
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}

function getObjectByPath(pathString) {
    if (!pathString || pathString === '~' || pathString === '/') return { obj: fileSystem, parts: [] };
    
    let parts;
    if (pathString.startsWith('/')) {
        parts = pathString.split('/').filter(p => p !== '');
    } else {
        parts = [...currentPathNames, ...pathString.split('/')].filter(p => p !== '');
    }
    
    let resolvedParts = [];
    for (let p of parts) {
        if (p === '.') continue;
        if (p === '..') {
            resolvedParts.pop();
        } else {
            resolvedParts.push(p);
        }
    }
    
    let current = fileSystem;
    for (let part of resolvedParts) {
        if (!current || current.type !== 'directory' || !current.children[part]) {
            return null;
        }
        current = current.children[part];
    }
    return { obj: current, parts: resolvedParts };
}

function ls(dirObj) {
    if (dirObj.type !== 'directory') {
        return `<span class="color-err">ls: not a directory</span>`;
    }
    let html = '<div class="grid-container">';
    for (const [name, file] of Object.entries(dirObj.children)) {
        let spanClass = 'ls-file';
        if (file.type === 'directory') spanClass = 'ls-dir';
        else if (file.type === 'executable') spanClass = 'ls-exe';
        html += `<span class="${spanClass}">${name}</span>`;
    }
    html += '</div>';
    return html;
}

function processCommand(rawCommand) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;
    
    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;
    printCommandAction(trimmed);
    
    const args = trimmed.split(/\s+/);
    const cmd = args[0];
    
    let outputHTML = '';
    
    switch (cmd) {
        case 'help':
            outputHTML = `
                <div class="color-text" style="margin-bottom: 5px; font-weight: 700;">Available commands:</div>
                <div class="grid-container" style="display: grid; grid-template-columns: 150px 1fr; gap: 5px 10px;">
                    <div class="color-primary">ls [dir]</div><div class="color-text">List directory contents</div>
                    <div class="color-primary">cd [dir]</div><div class="color-text">Change current directory</div>
                    <div class="color-primary">cat [file]</div><div class="color-text">Display file source code</div>
                    <div class="color-primary">./[file]</div><div class="color-text">Execute a script (e.g., ./about.sh)</div>
                    <div class="color-primary">theme [dark|light]</div><div class="color-text">Change terminal theme</div>
                    <div class="color-primary">pwd</div><div class="color-text">Print working directory</div>
                    <div class="color-primary">whoami</div><div class="color-text">Print current user</div>
                    <div class="color-primary">date</div><div class="color-text">Print current date and time</div>
                    <div class="color-primary">clear</div><div class="color-text">Clear the terminal screen</div>
                    <div class="color-primary">sudo</div><div class="color-text">Run command with admin privileges</div>
                </div>
            `;
            break;
        case 'clear':
            outputDiv.innerHTML = '';
            break;
        case 'ls':
            let lsPath = args[1] || '.';
            let lsRes = getObjectByPath(lsPath);
            if (!lsRes) {
                outputHTML = `<span class="color-err">ls: cannot access '${lsPath}': No such file or directory</span>`;
            } else {
                outputHTML = ls(lsRes.obj);
            }
            break;
        case 'cd':
            let cdPath = args[1] || '~';
            let cdRes = getObjectByPath(cdPath);
            if (!cdRes) {
                outputHTML = `<span class="color-err">cd: ${cdPath}: No such file or directory</span>`;
            } else if (cdRes.obj.type !== 'directory') {
                outputHTML = `<span class="color-err">cd: ${cdPath}: Not a directory</span>`;
            } else {
                currentPathNames = cdRes.parts;
                updatePrompt();
            }
            break;
        case 'pwd':
            outputHTML = `/${currentPathNames.join('/')}`;
            break;
        case 'whoami':
            outputHTML = `guest\n<div class="color-text" style="font-size: 0.9em; margin-top: 5px;">(You are viewing Harsh's portfolio)</div>`;
            break;
        case 'date':
            outputHTML = new Date().toString();
            break;
        case 'echo':
            outputHTML = escapeHTML(args.slice(1).join(' '));
            break;
        case 'cat':
            if (args.length < 2) {
                outputHTML = `<span class="color-err">cat: missing operand</span>`;
                break;
            }
            let catPath = args[1];
            let catRes = getObjectByPath(catPath);
            if (!catRes) {
                outputHTML = `<span class="color-err">cat: ${catPath}: No such file or directory</span>`;
            } else if (catRes.obj.type === 'directory') {
                outputHTML = `<span class="color-err">cat: ${catPath}: Is a directory</span>`;
            } else {
                outputHTML = `<pre style="margin: 0;">${escapeHTML(catRes.obj.source)}</pre>`;
            }
            break;
        case 'sudo':
            outputHTML = `<span class="color-err" style="font-size: 1.1em; font-weight: bold;">you are not harsh :)</span>`;
            break;
        case 'theme':
            let theme = args[1];
            if (theme === 'light') {
                document.body.classList.remove('theme-dark');
                document.body.classList.add('theme-light');
                outputHTML = `Theme switched to Light.`;
            } else if (theme === 'dark') {
                document.body.classList.remove('theme-light');
                document.body.classList.add('theme-dark');
                outputHTML = `Theme switched to Dark.`;
            } else {
                outputHTML = `Usage: theme [light|dark]`;
            }
            break;
        default:
            let execPath = cmd;
            let isExec = cmd.startsWith('./') || cmd.includes('/');
            if (cmd.startsWith('./')) {
                execPath = cmd.substring(2);
                isExec = true;
            }
            
            let res = getObjectByPath(execPath);
            
            if (res && res.obj && res.obj.type === 'executable') {
                if (!isExec) {
                    // Be forgiving but educational
                    outputHTML = `<div style="padding: 10px 0;">${res.obj.content}</div>\n<div class="color-text" style="font-size: 0.85em; opacity: 0.8; margin-top: 5px;">(Hint: In a real terminal, use <span class="color-exe">./${cmd}</span> to execute scripts in the current directory)</div>`;
                } else {
                    outputHTML = `<div style="padding: 10px 0;">${res.obj.content}</div>`;
                }
            } else if (res && res.obj && res.obj.type === 'directory') {
                outputHTML = `<span class="color-err">bash: ${cmd}: Is a directory</span>`;
            } else if (res && res.obj && res.obj.type === 'file') {
                 outputHTML = `<span class="color-err">bash: ${cmd}: Permission denied</span>`;
            } else {
                let fallback = getObjectByPath(cmd);
                if (fallback && fallback.obj && fallback.obj.type === 'executable') {
                    outputHTML = `<span class="color-err">bash: ${cmd}: command not found</span><br><span class="color-text">Did you mean <span class="color-exe">./${cmd}</span> ?</span>`;
                } else {
                    outputHTML = `<span class="color-err">bash: ${cmd}: command not found</span>`;
                }
            }
            break;
    }
    
    if (outputHTML) {
        printToOutput(outputHTML);
    }
    window.scrollTo(0, document.body.scrollHeight);
}

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = commandInput.value;
        commandInput.value = '';
        processCommand(val);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = '';
        }
    }
});

window.onload = () => {
    printToOutput(`
        <div class="banner">
<pre style="margin: 0; font-family: 'Fira Code', monospace; line-height: 1.2;">
  _   _                 _      ____   _____ 
 | | | | __ _ _ __  ___| |__  / __ \\ / ____|
 | |_| |/ _\` | '__|/ __| '_ \\| |  | | (___  
 |  _  | (_| | |   \\__ \\ | | | |  | |\\___ \\ 
 | | |_|\\__,_|_|   |___/_| |_|\\____/ |____/ 
</pre>
        <div style="margin-top: 15px; font-weight: 700; color: var(--text-color);">Welcome to HarshOS v1.0.0 (tty1)</div>
        <div class="color-text" style="margin-top: 5px;">Type <span class="color-exe">'help'</span> to see available commands.</div>
        <div class="color-text">To view my details, try executing <span class="color-exe">'./about.sh'</span>.</div>
        </div>
    `);
    updatePrompt();
    commandInput.focus();
};

document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') {
        commandInput.focus();
    }
});
