// Multimediedesign – interessequiz (prototype, ikke valideret optagelsestest).
// Point er heuristisk konstrueret til undervisningsprojektet og skal testes med målgruppen.
const questions = [
  {icon:'✎',title:'Hvad lyder mest spændende at arbejde med?',description:'Vælg det, du umiddelbart bliver mest nysgerrig på.',answers:[
    {text:'Skabe et visuelt udtryk eller et design',emoji:'🎨',scores:{design:3,ux:1}},
    {text:'Bygge en hjemmeside eller digital funktion',emoji:'💻',scores:{tech:3,ux:1}},
    {text:'Forstå hvad mennesker har brug for',emoji:'🧠',scores:{ux:3,design:1}},
    {text:'Arbejde med noget helt andet',emoji:'🌱',scores:{}}
  ]},
  {icon:'◇',title:'Hvordan griber du helst en udfordring an?',description:'Tænk på noget fra skole, arbejde eller fritid.',answers:[
    {text:'Får idEer og afprøver forskellige løsninger',emoji:'💡',scores:{design:2,ux:2}},
    {text:'Undersøger og finder en logisk løsning',emoji:'🔍',scores:{tech:2,ux:2}},
    {text:'Spørger andre og prøver at forstå problemet',emoji:'💬',scores:{ux:3}},
    {text:'Foretrækker en fast og kendt fremgangsmåde',emoji:'📋',scores:{}}
  ]},
  {icon:'⌘',title:'Hvad tænker du om at lære at kode?',description:'Du behøver ikke kunne noget i forvejen.',answers:[
    {text:'Det vil jeg virkelig gerne prøve',emoji:'🚀',scores:{tech:3}},
    {text:'Jeg er nysgerrig, men også lidt usikker',emoji:'👀',scores:{tech:2}},
    {text:'Kun hvis det hjælper mig med kreative idEer',emoji:'🪄',scores:{tech:1,design:2}},
    {text:'Det interesserer mig ikke lige nu',emoji:'🌿',scores:{}}
  ]},
  {icon:'◈',title:'Hvilket projekt ville du helst vælge?',description:'Forestil dig at I får en uge til at arbejde i en gruppe.',answers:[
    {text:'Designe en app eller et visuelt univers',emoji:'📱',scores:{design:3,ux:1}},
    {text:'ProgrammEr en interaktiv oplevelse',emoji:'⚙️',scores:{tech:3}},
    {text:'Teste og forbedre en brugeroplevelse',emoji:'🧪',scores:{ux:3}},
    {text:'Ingen af de projekter tiltaler mig',emoji:'🌙',scores:{}}
  ]},
  {icon:'✧',title:'Hvordan har du det med kreativt arbejde?',description:'Kreativitet kan være både visuelt, teknisk og problemløsende.',answers:[
    {text:'Jeg elsker at skabe noget nyt',emoji:'✨',scores:{design:3}},
    {text:'Jeg kan lide at gøre løsninger smartere',emoji:'🛠️',scores:{tech:2,ux:2}},
    {text:'Jeg vil gerne lære at tænke mere kreativt',emoji:'🌈',scores:{design:2}},
    {text:'Jeg foretrækker opgaver uden kreativ frihed',emoji:'📐',scores:{}}
  ]},
  {icon:'◎',title:'Hvad motiverer dig mest ved digitale produkter?',description:'Tænk på websites, apps og andre digitale tjenester.',answers:[
    {text:'At de ser flotte og indbydende ud',emoji:'🎭',scores:{design:3}},
    {text:'At de fungerer godt teknisk',emoji:'🔧',scores:{tech:3}},
    {text:'At de er lette at forstå og bruge',emoji:'🤝',scores:{ux:3}},
    {text:'Jeg går ikke særligt op i digitale produkter',emoji:'🍃',scores:{}}
  ]},
  {icon:'↗',title:'Hvordan har du det med feedback og ændringer?',description:'I digitale projekter justerer man ofte løsningen efter tests.',answers:[
    {text:'Jeg kan lide at forbedre noget over flere forsøg',emoji:'🔁',scores:{ux:3,design:1}},
    {text:'Jeg vil gerne afprøve ideer og se hvad der virker',emoji:'🧩',scores:{tech:2,ux:2}},
    {text:'Det er okay, selv om det kan være udfordrende',emoji:'🙂',scores:{ux:1}},
    {text:'Jeg foretrækker at løse ting En gang',emoji:'📦',scores:{}}
  ]},
  {icon:'✦',title:'Hvad vil du helst blive bedre til?',description:'Vælg den kompetence, der virker mest relevant for dig.',answers:[
    {text:'Visuel kommunikation, grafik og design',emoji:'🖌️',scores:{design:3}},
    {text:'Kodning, web og interaktive funktioner',emoji:'⌨️',scores:{tech:3}},
    {text:'UX, research og forståelse af brugere',emoji:'🫶',scores:{ux:3}},
    {text:'Noget uden for de tre områder',emoji:'🧭',scores:{}}
  ]}
];
const categories = [{key:'design',label:'Kreativitet & design'},{key:'tech',label:'Teknologi & kode'},{key:'ux',label:'UX & mennesker'}];
const state = {index:0,answers:Array(questions.length).fill(null)};
const $ = id=>document.getElementById(id);
const intro=$('introPanel'),questionPanel=$('questionPanel'),resultPanel=$('resultPanel');
function show(panel){[intro,questionPanel,resultPanel].forEach(el=>el.hidden=el!==panel);window.scrollTo({top:0,behavior:'instant'});}
function theme(mode){document.body.classList.toggle('light-mode',mode==='light');document.body.classList.toggle('dark-mode',mode!=='light');$('themeIcon').textContent=mode==='light'?'☾':'☀';try{localStorage.setItem('multimediedesign-theme',mode)}catch(e){}}
let savedTheme='dark';try{savedTheme=localStorage.getItem('multimediedesign-theme')||'dark'}catch(e){}theme(savedTheme);
$('themeToggle').addEventListener('click',()=>theme(document.body.classList.contains('light-mode')?'dark':'light'));
function renderQuestion(){const q=questions[state.index],chosen=state.answers[state.index];$('stepLabel').textContent=`SPØRGSMÅL ${state.index+1} AF ${questions.length}`;const progress=Math.round((state.index+1)/questions.length*100);$('progressLabel').textContent=progress+'%';$('progressFill').style.width=progress+'%';$('progressBar').setAttribute('aria-valuenow',String(state.index+1));$('questionTitle').textContent=q.title;$('questionDescription').textContent=q.description;$('questionIcon').textContent=q.icon;
const grid=$('answerGrid');grid.replaceChildren();q.answers.forEach((a,i)=>{const button=document.createElement('button');button.className='quiz-answer';button.type='button';button.setAttribute('aria-pressed',String(chosen===i));const symbol=document.createElement('span');symbol.className='quiz-answer-symbol';symbol.textContent=a.emoji;const label=document.createElement('span');label.className='quiz-answer-label';label.textContent=a.text;const check=document.createElement('span');check.className='quiz-answer-check';check.setAttribute('aria-hidden','true');check.textContent='✓';button.append(symbol,label,check);button.addEventListener('click',()=>{state.answers[state.index]=i;renderQuestion();grid.children[i]?.focus();});grid.append(button);});$('nextButton').disabled=chosen===null;$('nextButton').textContent=state.index===questions.length-1?'Se mit resultat →':'Næste spørgsmål →';$('backButton').textContent=state.index===0?'← Start':'← Tilbage';}
$('startButton').addEventListener('click',()=>{show(questionPanel);renderQuestion();$('questionTitle').focus({preventScroll:true});});
$('backButton').addEventListener('click',()=>{if(state.index===0){show(intro);return;}state.index--;renderQuestion();$('questionTitle').focus({preventScroll:true});});
$('nextButton').addEventListener('click',()=>{if(state.answers[state.index]===null)return;if(state.index===questions.length-1){renderResult();show(resultPanel);$('resultHeading').focus({preventScroll:true});}else{state.index++;renderQuestion();$('questionTitle').focus({preventScroll:true});}});
function renderResult(){const totals={design:0,tech:0,ux:0};const maxes={design:0,tech:0,ux:0};let total=0,maxTotal=0;questions.forEach((q,i)=>{const answer=q.answers[state.answers[i]];const maximum=Math.max(...q.answers.map(a=>Object.values(a.scores).reduce((s,n)=>s+n,0)));maxTotal+=maximum;total+=Object.values(answer.scores).reduce((s,n)=>s+n,0);categories.forEach(cat=>{totals[cat.key]+=answer.scores[cat.key]||0;maxes[cat.key]+=Math.max(...q.answers.map(a=>a.scores[cat.key]||0));});});
// Relative interest indicator based on this quiz's own handcrafted scoring, NOT predictive.
const pct=Math.round(total/maxTotal*100),ordered=[...categories].sort((a,b)=>totals[b.key]/maxes[b.key]-totals[a.key]/maxes[a.key]);$('scoreValue').textContent=pct+'%';$('scoreCircle').style.setProperty('--fill',pct+'%');$('scoreCircle').setAttribute('aria-label',`Vejledende interessematch: ${pct} procent`);
let heading,explanation;if(pct>=72){heading='Mange fælles interesser';explanation='Dine svar peger på flere aktiviteter, du vil møde på multimediedesign. Det kan være værd at undersøge uddannelsens fag og projekter nærmere.';}else if(pct>=42){heading='Spændende muligheder at udforske';explanation='Du har interesser, som overlapper med dele af uddannelsen. Du behøver ikke være vild med alle fag for at være nysgerrig på multimediedesign.';}else{heading='Måske en anden retning – eller en ny opdagelse';explanation='Dine svar matcher færre af quizens valgte aktiviteter. Det siger ikke noget om dine evner – måske har du andre interesser, eller måske mangler du at opleve fagene i praksis.';}
$('resultHeading').textContent='Din kreative profil';$('resultLead').textContent='Her er et overblik over de interesser, du valgte undervejs.';$('matchTitle').textContent=heading;$('matchText').textContent=explanation;
const container=$('categoryBars');container.replaceChildren();categories.forEach(cat=>{const share=Math.round(totals[cat.key]/maxes[cat.key]*100),row=document.createElement('div');row.className='quiz-category-row';const head=document.createElement('div');head.className='quiz-category-row-header';const name=document.createElement('span');name.textContent=cat.label;const value=document.createElement('span');value.textContent=share+'%';head.append(name,value);const track=document.createElement('div');track.className='quiz-category-track';const bar=document.createElement('div');bar.className='quiz-category-fill';bar.style.width=share+'%';track.append(bar);row.append(head,track);container.append(row);});
const leading=ordered[0];const suggestions={design:'Prøv at kigge nærmere på UI-design, grafik, visuel kommunikation og kreative projekter.',tech:'Udforsk webudvikling, HTML, CSS og interaktive oplevelser. Du behøver ikke kunne kode fra starten.',ux:'Læs om brugerundersøgelser, prototyping, tilgængelighed og UX-design.'};$('nextStepText').textContent=suggestions[leading.key]+' Sammenlign derefter med andre uddannelser, og tal gerne med nuværende studerende.';}
$('restartButton').addEventListener('click',()=>{state.index=0;state.answers.fill(null);show(intro);$('startButton').focus({preventScroll:true});});
