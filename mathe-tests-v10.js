// ELIAN v10 — Engine-Tests (läuft in der CI, node, ohne DOM).
// Der erste <script>-Block (reiner Mathe-Kern) wird per vm ausgeführt.
const fs=require('fs');
const file=process.argv[2]||'ELIAN_Ultimate_Calculator_v10.0.html';
const html=fs.readFileSync(file,'utf8');
const m=html.match(/<script>([\s\S]*?)<\/script>/);
if(!m){console.error('kein Skript-Block');process.exit(1)}
const vm=require('vm');
vm.runInThisContext(m[1],{filename:'elian-v10-core.js'});

let ok=0;const fail=[];
const T=(name,fn)=>{try{if(fn()===true)ok++;else fail.push(name)}catch(e){fail.push(name+' :: '+e.message)}};
const close=(a,b,e)=>Math.abs(a-b)<(e||1e-12);

/* --- exakte rationale Arithmetik --- */
T('1/3+1/6=1/2',()=>evalExpr('1/3+1/6').text==='1/2');
T('2/4=1/2',()=>evalExpr('2/4').text==='1/2');
T('(1/2)^3=1/8',()=>evalExpr('(1/2)^3').text==='1/8');
T('2^-2=1/4',()=>evalExpr('2^-2').text==='1/4');
T('1/7*7=1',()=>evalExpr('1/7*7').text==='1');
T('0.1+0.2=3/10 exakt',()=>evalExpr('0.1+0.2').text==='3/10');
T('BigInt: 999999999999*999999999999',()=>evalExpr('999999999999*999999999999').text==='999999999998000000000001');
T('5/0 → Fehler',()=>{const r=evalExpr('5/0');return !r.ok&&/Division/.test(r.err)});

/* --- Präzedenz & Parser --- */
T('2+3*4=14',()=>evalExpr('2+3*4').text==='14');
T('2*3+4*5=26',()=>evalExpr('2*3+4*5').text==='26');
T('(2+3)*4=20',()=>evalExpr('(2+3)*4').text==='20');
T('-3+5=2',()=>evalExpr('-3+5').text==='2');
T('-(2+3)=-5',()=>evalExpr('-(2+3)').text==='-5');
T('2^3^2=512 (rechtsassoziativ)',()=>evalExpr('2^3^2').text==='512');
T('2(3+4)=14 (implizit)',()=>evalExpr('2(3+4)').text==='14');
T('3(2)(3)=18 (implizit)',()=>evalExpr('3(2)(3)').text==='18');
T('(1+1)(2+3)=10 (implizit Klammern)',()=>evalExpr('(1+1)(2+3)').text==='10');
T('3!=6',()=>evalExpr('3!').text==='6');
T('0!=1',()=>evalExpr('0!').text==='1');
T('50%=1/2',()=>evalExpr('50%').text==='1/2');
T('Unbekannte Variable → Fehler',()=>!evalExpr('x').ok);
T('Variable x=3: x*2=6',()=>evalExpr('x*2',{x:3}).text==='6');
T('Unbekanntes Zeichen → Fehler',()=>!evalExpr('2 § 3').ok);
T('ans lieest ANS_VALUE',()=>{ANS_VALUE=5;return evalExpr('ans+1').text==='6';});

/* --- Funktionen & Winkelmodus --- */
T('sqrt(4)=2 exakt',()=>{const r=evalExpr('sqrt(4)');return r.exact&&r.text==='2'});
T('sqrt(2)≈1.414 numerisch',()=>close(evalExpr('sqrt(2)').approx,1.4142135623730951));
T('sqrt(1/4)=1/2 exakt',()=>evalExpr('sqrt(1/4)').text==='1/2');
T('log(100)=2',()=>close(evalExpr('log(100)').approx,2));
T('ln(e)=1',()=>close(evalExpr('ln(e)').approx,1));
T('pi≈3.1416',()=>close(evalExpr('pi').approx,Math.PI));
T('sin(30)°=0.5',()=>close(evalExpr('sin(30)').approx,0.5));
T('sin(30) in RAD numerisch',()=>{setAngleMode('rad');const r=close(evalExpr('sin(30)').approx,Math.sin(30));setAngleMode('deg');return r});
T('cos(60)°=0.5',()=>close(evalExpr('cos(60)').approx,0.5));
T('asin(0.5)=30 in DEG',()=>close(evalExpr('asin(0.5)').approx,30));
T('exp(0)=1',()=>close(evalExpr('exp(0)').approx,1));
T('abs(-7)=7',()=>evalExpr('abs(-7)').text==='7');
T('floor(3.7)=3',()=>evalExpr('floor(3.7)').text==='3');
T('ln(e^2)=2',()=>close(evalExpr('ln(e^2)').approx,2));

/* --- Darstellung --- */
T('Integer bleibt Integer',()=>evalExpr('2*5').text==='10');
T('große Ganzzahl nicht exponentiell',()=>!/e\+/.test(evalExpr('10^20').text)&&evalExpr('10^20').exact);
T('formatNumber(1/3)',()=>formatNumber(1/3)==='0.333333333333');

console.log(`\n${ok} Tests OK, ${fail.length} Fehler`);
if(fail.length){fail.forEach(f=>console.log('  ✗ '+f));process.exit(1)}
