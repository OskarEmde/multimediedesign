// =========================================
// ELEMENTER
// =========================================

const body = document.body;
const themeToggleButton = document.getElementById("themeToggleButton");
const themeToggleIcon = themeToggleButton?.querySelector(".theme-toggle-icon");
const themeToggleLabel = themeToggleButton?.querySelector(".theme-toggle-label");
const themeButtons = document.querySelectorAll(".theme-option");

// =========================================
// THEME
// =========================================

function updateThemeToggleButton(theme) {
    if (!themeToggleButton || !themeToggleIcon || !themeToggleLabel) return;

    const nextTheme = theme === "dark" ? "light" : "dark";

    themeToggleIcon.textContent = nextTheme === "light" ? "☀" : "☾";
    themeToggleLabel.textContent = nextTheme === "light" ? "Light mode" : "Dark mode";
    themeToggleButton.setAttribute(
        "aria-label",
        nextTheme === "light"
            ? "Skift til light mode"
            : "Skift til dark mode"
    );
}

function setTheme(theme) {
    body.classList.remove("dark-mode", "light-mode");
    body.classList.add(`${theme}-mode`);

    themeButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.theme === theme);
    });

    localStorage.setItem("multimediedesign-theme", theme);
    updateThemeToggleButton(theme);
}

if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
        const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
        setTheme(nextTheme);
    });
}

themeButtons.forEach(button => {
    button.addEventListener("click", () => {
        setTheme(button.dataset.theme);
    });
});

const savedTheme = localStorage.getItem("multimediedesign-theme");
setTheme(savedTheme || "dark");

// =========================================
// SMOOTH LINKS
// =========================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {
        link.addEventListener("click", function(event) {
            const targetID = this.getAttribute("href");

            if (targetID === "#") return;

            const target = document.querySelector(targetID);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

// =========================================
// SIMPLE SCROLL REVEAL
// =========================================

const revealElements = document.querySelectorAll(
    ".skill-card, .mini-card, .chart-card"
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.classList.add("reveal-element");
    observer.observe(element);
});

// =========================================
// CAREER FLOATING CARDS
// =========================================

const careerWrappers = document.querySelectorAll(".career-wrapper");

careerWrappers.forEach(wrapper => {
    const button = wrapper.querySelector(".career-main-card");

    button.addEventListener("click", () => {
        const alreadyOpen = wrapper.classList.contains("active");

        careerWrappers.forEach(item => {
            item.classList.remove("active");
            item.querySelector(".career-main-card")?.classList.remove("active");
        });

        if (!alreadyOpen) {
            wrapper.classList.add("active");
            button.classList.add("active");
        }
    });
});

// =========================================
// SALARY CHART
// =========================================

const salaryButtons = document.querySelectorAll(".salary-toggle");
const salaryColumns = document.querySelectorAll(".salary-chart .salary-column");

function formatSalary(value) {
    if (value === null || Number.isNaN(value)) {
        return "Ingen data";
    }

    return `${value.toLocaleString("da-DK")} kr`;
}

function updateSalaryChart(view) {
    if (!salaryColumns.length) return;

    const values = Array.from(salaryColumns)
        .map(column => {
            const raw = column.dataset[view];
            return raw ? Number(raw) : null;
        })
        .filter(value => value !== null);

    const maxValue = Math.max(...values);

    salaryColumns.forEach(column => {
        const raw = column.dataset[view];
        const value = raw ? Number(raw) : null;
        const valueLabel = column.querySelector(".chart-value");

        if (value === null || Number.isNaN(value)) {
            column.style.setProperty("--height", "22%");
            column.classList.add("no-data");
            valueLabel.textContent = "Ingen data";
            return;
        }

        const height = Math.max(30, (value / maxValue) * 100);
        column.style.setProperty("--height", `${height}%`);
        column.classList.remove("no-data");
        valueLabel.textContent = formatSalary(value);
    });

    salaryButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.salaryView === view);
    });
}

salaryButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateSalaryChart(button.dataset.salaryView);
    });
});

updateSalaryChart("entry");


// =========================================
// INTERAKTIVE RESEARCH-INDSIGTER
// =========================================
const researchInsights = {
    ai: {
        percent:75, color:'#9851ed', icon:'✦',
        description:'Er bekymrede for, at AI kan overtage arbejdsopgaver.',
        secondaryLabel:'Bekymring om jobusikkerhed',secondary:50,
        quote:'“Noget jeg kan lide at lave med gode jobmuligheder, er mine prioteter”',
        explanation:'Indsigten gør det relevant at vise jobperspektiver og skabe en mere nuanceret samtale om AI.'
    },
    salary: {
        percent:87.5,color:'#a4dd3c',icon:'↗',
        description:'Vælger løn som en vigtig faktor ved uddannelsesvalg.',
        secondaryLabel:'Prioriterer jobmuligheder',secondary:62.5,
        quote:'“Så længe jeg kan arbejde mig frem til en god løn er det også fint”',
        explanation:'Derfor viser vi både startløn og løn efter 10 år i sammenligningen ved siden af.'
    },
    knowledge: {
        percent:62.5,color:'#4c8bf1',icon:'◎',
        description:'Angiver ikke at kende multimediedesigneruddannelsen godt.',
        secondaryLabel:'Kender uddannelsen godt',secondary:37.5,
        quote:'“Tænker man lære at få noget til at se godt ud”',
        explanation:'Det gør det relevant at vise, at uddannelsen også handler om kodning, UX, research og digital produktion.'
    }
};
const researchTabs = [...document.querySelectorAll('.research-tab')];
const researchPanel = document.getElementById('researchPanel');
function showResearchInsight(key,focus=false) {
    const insight=researchInsights[key];
    if(!insight || !researchPanel)return;
    const pct = n => n.toLocaleString('da-DK')+' %';
    document.getElementById('researchPercent').textContent=pct(insight.percent);
    document.getElementById('researchDescription').textContent=insight.description;
    document.getElementById('researchSecondaryLabel').textContent=insight.secondaryLabel;
    document.getElementById('researchSecondaryValue').textContent=pct(insight.secondary);
    document.getElementById('researchSecondaryBar').style.width=insight.secondary+'%';
    document.getElementById('researchQuote').textContent=insight.quote;
    document.getElementById('researchExplanation').textContent=insight.explanation;
    researchPanel.style.setProperty('--insight-color',insight.color);
    const ring=document.getElementById('researchRing');
    ring.style.setProperty('--insight-color',insight.color);
    ring.style.setProperty('--insight-value',insight.percent+'%');
    ring.querySelector('.research-ring-hole').textContent=insight.icon;
    researchTabs.forEach(tab=>{
        const active=tab.dataset.insight===key;
        tab.classList.toggle('active',active);
        tab.setAttribute('aria-selected',String(active));
        tab.tabIndex=active?0:-1;
        if(active && focus)tab.focus();
    });
}
researchTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>showResearchInsight(tab.dataset.insight));
    tab.addEventListener('keydown',e=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
        e.preventDefault();
        const next=e.key==='Home'?0:e.key==='End'?researchTabs.length-1:
             (index+(e.key==='ArrowRight'?1:-1)+researchTabs.length)%researchTabs.length;
        showResearchInsight(researchTabs[next].dataset.insight,true);
    });
});
showResearchInsight('ai');
const researchMethodButton=document.getElementById('researchMethodButton');
const researchMethodDetails=document.getElementById('researchMethodDetails');
researchMethodButton?.addEventListener('click',()=>{
    const expanded=researchMethodButton.getAttribute('aria-expanded')==='true';
    researchMethodButton.setAttribute('aria-expanded',String(!expanded));
    researchMethodDetails.hidden=expanded;
});
