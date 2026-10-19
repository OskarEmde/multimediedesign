import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scroll-animation: højre ved 0%, venstre ved 50%, højre ved 100% af HELE siden.
// Ingen ekstra ændringer i index.html eller style.css er nødvendige.
const canvas = document.getElementById('bear-canvas') || document.createElement('canvas');
canvas.id = 'bear-canvas';
canvas.setAttribute('aria-hidden', 'true');
if (!canvas.parentNode) document.body.prepend(canvas);

const css = document.createElement('style');
css.textContent = `
 #bear-canvas {display:block !important;position:fixed !important;inset:0;width:100vw !important;height:100vh !important;z-index:1 !important;pointer-events:none !important;background:transparent !important;opacity:0;transition:opacity .35s ease;}
 #bear-canvas.bear-loaded {opacity:1;}
 body > header,body > main,body > footer {position:relative;z-index:2;}
`;
document.head.appendChild(css);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-5,5,5,-5,0.1,100);
camera.position.set(0,0,16);
const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
renderer.setClearColor(0,0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.45;
scene.add(new THREE.HemisphereLight(0xffffff,0x6c5e72,2.4));
const light = new THREE.DirectionalLight(0xffffff,2.6);
light.position.set(-3,7,8);scene.add(light);
const root = new THREE.Group();
const spin = new THREE.Group();
root.add(spin);scene.add(root);
let ready=false, target=0, current=0, screenW=10, screenH=10;
let idleTime=0;

function readScroll(){
 const max=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
 target=max>0?THREE.MathUtils.clamp(window.scrollY/max,0,1):0;
}
function resize(){
 const w=innerWidth,h=innerHeight;
 screenW=screenH*w/h;
 camera.left=-screenW/2;camera.right=screenW/2;
 camera.top=screenH/2;camera.bottom=-screenH/2;
 camera.updateProjectionMatrix();
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
 renderer.setSize(w,h,false);
 readScroll();
}
resize();
window.addEventListener('resize',resize,{passive:true});
window.addEventListener('scroll',readScroll,{passive:true});
window.addEventListener('load',readScroll,{once:true});

// Modellen placeres tæt på højre kant fra start.
new GLTFLoader().load('./bear.glb',gltf=>{
 const bear=gltf.scene;
 const bounds=new THREE.Box3().setFromObject(bear);
 const dims=bounds.getSize(new THREE.Vector3());
 const center=bounds.getCenter(new THREE.Vector3());
 const factor=3.0/Math.max(dims.x,dims.y,dims.z,1);
 bear.scale.setScalar(factor);
 bear.position.copy(center).multiplyScalar(-factor);
 spin.add(bear);
 ready=true;
 current=target;
 canvas.classList.add('bear-loaded');
 console.info('✅ 3D-bjørn klar. Scroll siden for at se højre → venstre → højre.');
},undefined,err=>console.error('❌ Kunne ikke hente bear.glb',err));

const clock=new THREE.Clock();
function animate(){
 requestAnimationFrame(animate);
 if(!ready)return;
 const dt=Math.min(clock.getDelta(),0.05);
 // Opdater hver frame, også når scrollingen sker med tastatur eller ankerlinks.
 readScroll();
 current += (target-current)*(1-Math.exp(-7*dt));
 const p=current;
 const small=innerWidth<700;
 const extent=screenW*(small?.26:.33);
 root.position.set(Math.cos(p*Math.PI*2)*extent,screenH*(.21-.32*p),0);
 root.scale.setScalar(small?.7:1);
 // Ét roligt spin hen over hele hjemmesidens længde.
 spin.rotation.y=p*Math.PI*2;
 spin.rotation.x=Math.sin(p*Math.PI*2)*.11;
 spin.rotation.z=Math.sin(p*Math.PI*4)*.12;
 renderer.render(scene,camera);
}
// Anvend en startværdi til delta-time, og kør animationen.
clock.start();
animate();
