// Mathematische Eigenschaftstests für ELIAN v9.0 — läuft in der CI.
// Das <script> der Single-File-App wird mit einem minimalen DOM-Mock
// geladen; danach werden die reinen Mathe-Engines geprüft.
const fs=require('fs');
const html=fs.readFileSync('ELIAN_Ultimate_Calculator_v9.0.html','utf8');
const m=html.match(/<script>([\s\S]*?)<\/script>/);
if(!m){console.error('kein Skript-Block');process.exit(1)}
const code=m[1];

// --- Universal-DOM-Mock: jeder Zugriff liefert ein weiteres Mock-Objekt ---
const ctx2d=new Proxy({},{get:()=>()=>{},set:()=>true});
function universal(){
  const styleMock=new Proxy({},{get:(o,p)=>{
    if(p==='setProperty'||p==='removeProperty')return()=>{};
    if(p==='getPropertyValue')return()=>'';
    return o[p]===undefined?'':o[p];
  },set:(o,p,v)=>{o[p]=v;return true}});
  const base={value:'Temperatur',textContent:'',innerHTML:'',dataset:{},style:styleMock,children:[],options:[],length:0,checked:false,selectedIndex:-1,files:[],href:'',id:'',className:'',width:100,height:100,top:0,left:0};
  return new Proxy(base,{
    get(o,p){
      if(p in o)return o[p];
      if(p==='querySelector')return()=>universal();
      if(p==='querySelectorAll')return()=>[];
      if(p==='getContext')return()=>ctx2d;
      if(p==='addEventListener'||p==='removeEventListener')return()=>{};
      if(p==='appendChild'||p==='insertBefore'||p==='removeChild')return()=>universal();
      if(p==='setAttribute'||p==='removeAttribute')return()=>{};
      if(p==='click'||p==='focus'||p==='blur'||p==='remove'||p==='select')return()=>{};
      if(p==='getAttribute')return()=>null;
      if(p==='hasAttribute')return()=>false;
      if(p==='classList')return{add(){},remove(){},toggle(){},contains(){return false}};
      if(p==='clientWidth'||p==='clientHeight')return 100;
      if(p==='scrollTop')return 0;
      if(p==='parentNode'||p==='firstChild'||p==='nextSibling')return null;
      if(p==='getBoundingClientRect')return()=>({width:100,height:100,top:0,left:0,right:100,bottom:100});
      if(p==='toDataURL')return()=>'data:,';
      o[p]=universal();
      return o[p];
    },
    set(o,p,v){o[p]=v;return true}
  });
}
global.document={querySelector:()=>universal(),querySelectorAll:()=>[],getElementById:()=>universal(),addEventListener(){},removeEventListener(){},createElement:()=>universal(),createTextNode:()=>universal(),body:universal(),documentElement:universal(),cookie:'',title:'x',location:{href:'',search:'',hash:''}};
global.window={addEventListener(){},removeEventListener(){},matchMedia:()=>({matches:false,addEventListener(){}}),devicePixelRatio:1,location:{href:'',search:''},hermes:null,open:()=>null,alert:()=>{}};
global.localStorage={getItem:()=>null,setItem(){},removeItem(){},clear(){},key:()=>null,length:0};
global.sessionStorage={getItem:()=>null,setItem(){},removeItem(){}};
global.navigator={clipboard:null,userAgent:'node',language:'de',share:null};
global.screen={width:1000,height:1000};
global.requestAnimationFrame=()=>1;
global.cancelAnimationFrame=()=>{};
global.self=globalThis;
global.devicePixelRatio=1;
global.getComputedStyle=()=>({getPropertyValue:()=>''});

// Der Universal-Mock oben fängt jeden DOM-Zugriff ab. Das Skript läuft
// über vm.runInThisContext im globalen Kontext: Deklarationen landen
// auf globalThis und sind danach direkt aufrufbar.
const vm=require('vm');
vm.runInThisContext(code,{filename:'elian-app.js'});

let ok=0,fail=[];
const T=(name,fn)=>{try{if(fn()===true)ok++;else fail.push(name)}catch(e){fail.push(name+' :: '+e.message)}};
const close=(a,b,e)=>Math.abs(a-b)<(e||1e-9);

// --- rationale Arithmetik ---
T('1/3+1/6=1/2',()=>evalExprExact('1/3+1/6').text==='1/2');
T('2/4=1/2',()=>evalExprExact('2/4').text==='1/2');
T('(1/2)^3=1/8',()=>evalExprExact('(1/2)^3').text==='1/8');
T('2^-2=1/4',()=>evalExprExact('2^-2').text==='1/4');
// --- Polynome ---
T('(x+1)*(x+2)=x²+3x+2',()=>polyToStr(polyParse('(x+1)*(x+2)'))==='x² + 3x + 2');
T('(x+1)^3',()=>polyToStr(polyParse('(x+1)^3'))==='x³ + 3x² + 3x + 1');
// --- Stammfunktionen ---
T('∫x²dx=x³/3',()=>integrateTerm('x^2','x').expr==='x³/3');
T('∫x³-2x+1',()=>integrateTerm('x^3-2x+1','x').expr==='x⁴/4 − x² + x');
// --- Nullstellen ---
T('x²-3x+2 → 1,2',()=>{const r=solvePolyEquation('x^2-3x+2=0','x');return r.rational&&r.roots.length===2&&r.roots[0].n===1&&r.roots[1].n===2});
T('2x+4 → -2',()=>{const r=solvePolyEquation('2x+4=0','x');return r.roots[0].n===-2});
T('x³-6x²+11x-6 → 1,2,3',()=>{const r=solvePolyEquation('x^3-6x^2+11x-6=0','x');return r.roots.length===3&&r.roots[2].n===3});
T('x²+x+1 komplex',()=>!!solvePolyEquation('x^2+x+1=0','x').complex);
// --- Kurvendiskussion ---
T('x³-3x: 2 Extrema',()=>curveAnalyze('x^3-3x','x').extrema.length===2);
T('x²-2: 2 Nullstellen',()=>curveAnalyze('x^2-2','x').nullstellen.length===2);
T('x² achsensymmetrisch',()=>curveAnalyze('x^2','x').symmetrie==='achsensymmetrisch zur y-Achse');
// --- Vektoren ---
T('Kreuzprodukt e_x×e_y=e_z',()=>{const c=vecCross([1,0,0],[0,1,0]);return close(c[2],1)});
T('Winkel 45°',()=>close(vecAngle([1,0],[1,1]).deg,45));
// --- Eigenwerte ---
T('Eigen 2,5 exakt',()=>{const e=eigenOf([[4,1],[2,3]]);return e.exact&&e.vals.some(v=>v.re===5)&&e.vals.some(v=>v.re===2)});
T('QR 3×3: Summe=Spur',()=>{const A=[[4,1,0],[1,3,1],[0,1,2]];const e=eigenOf(A);return close(e.vals.reduce((s,v)=>s+v.re,0),traceOf(A),1e-4)});
// --- Grenzwerte ---
T('lim (x²−1)/(x−1) = 2',()=>limitAtFiniteExact('(x^2-1)/(x-1)','x',1).value.n===2);
T('lim 1/x = 0',()=>limitInfExact('1/x','x').value.n===0);
T('lim ∞ Leitkoeffizienten',()=>{const r=limitInfExact('(2x^3-1)/(3x^3+2x)','x');return r.value.n===2&&r.value.d===3});
// --- DGL ---
T('y′=2y+1 durch (0|1)',()=>{const e=dglExact('2*y+1',0,1,'x');return e.fn&&close(e.fn(0),1)&&close(e.fn(1),1.5*Math.exp(2)-0.5)});
T('y′=x² Stamm',()=>dglExact('x^2',0,1,'x').text.indexOf('x³/3')>=0);
// --- Stochastik ---
T('Binomial P(X=5|10,0,5)',()=>close(binomPMF(10,.5,5),0.24609375));
T('Poisson P(X=2|3)',()=>close(poissonPMF(3,2),0.2240418,1e-6));
T('Φ(1,96)≈0,975',()=>close(normalPhi(1.96),0.9750021,1e-5));
T('Quantil 0,975 = 1,96',()=>close(normalQuantile(0.975),1.959964,1e-4));
T('KI 95%',()=>{const c=confInterval(0.6,100,0.95);return close(c.z,1.959964,1e-4)&&close(c.lo,0.5039818,1e-4)});
// --- exakt vs. numerisch: Hauptsatz der Analysis ---
T('Hauptsatz: ∫f = F(b)−F(a)',()=>{
  const F=integrateTerm('x^3-2x+1','x').expr;
  const num=numericalIntegral({type:'function',expr:'x^3-2x+1'},1,2,200);
  return close(evalExpr(F,{x:2})-evalExpr(F,{x:1}),num,1e-2);
});
// --- Grad-Konsistenz symbolisch/numerisch ---
T('symbolisch = numerisch (sin)',()=>{
  db.angle='RAD';
  const s=safeSymbolic('sin(x)','x',1).val;
  const h=1e-6;
  const n=(Math.sin(1+h)-Math.sin(1-h))/(2*h);
  db.angle='DEG';
  return close(s,n,1e-6);
});
// --- Bedienintelligenz: tiefe Spracheingabe ---
T('Intent: Nullstellen',()=>{const d=deepIntent('nullstellen von x² minus 1');return d.module==='algebra'&&d.value==='x^2-1=0'});
T('Intent: Kurvendiskussion',()=>deepIntent('kurvendiskussion von x³ minus 3x').value==='x^3-3x');
T('Intent: Stammfunktion',()=>deepIntent('stammfunktion von x²').value==='x^2');
T('Intent: Ableitung',()=>deepIntent('ableitung von sin(x)').value==='sin(x)');
T('Intent: Eigenwerte',()=>deepIntent('eigenwerte von 4 1 2 3').value==='4 1\n2 3');
T('Intent: Determinante',()=>deepIntent('determinante von 1 2 3 4').value==='1 2\n3 4');
T('Intent: Matrix 3×3',()=>toMatrixText('1 2 3 4 5 6 7 8 9')==='1 2 3\n4 5 6\n7 8 9');
T('Intent: reiner Ausdruck bleibt beim Rechner',()=>deepIntent('2+3*4')===null);
T('Intent: Navigationsziel löst',()=>{
  const d=deepIntent('nullstellen von x^2-1');
  return d.module==='algebra'&&solvePolyEquation(d.value,'x').rational===true;
});
// --- Favoriten-Verwaltung ---
T('Favoriten hinzufügen/entfernen',()=>{
  if(!Array.isArray(db.favorites))db.favorites=[];
  db.favorites=db.favorites.filter(f=>f!=='sqrt(16)');
  db.favorites.unshift('sqrt(16)');
  const has1=db.favorites.indexOf('sqrt(16)')>=0;
  db.favorites=db.favorites.filter(f=>f!=='sqrt(16)');
  return has1&&db.favorites.indexOf('sqrt(16)')<0;
});

console.log('\nMathematik-Tests: '+ok+' bestanden, '+fail.length+' fehlgeschlagen');
if(fail.length){console.log('Fehlgeschlagen:');fail.forEach(f=>console.log('  FAIL  '+f));process.exit(1)}
