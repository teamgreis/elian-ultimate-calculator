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

/* --- PR-Review-Regressionen --- */
T('sin(30)^2 ≈ 0.25 (nicht-exakte Basis)',()=>{const r=evalExpr('sin(30)^2');return !r.exact&&close(r.approx,0.25,1e-12)});
T('(1/3)^2 = 1/9 (exakte Basis)',()=>evalExpr('(1/3)^2').text==='1/9');
T('pi^0 = 1 exakt',()=>evalExpr('pi^0').text==='1');
T('20! exakt und korrekt',()=>evalExpr('20!').text==='2432902008176640000');
T('5! bleibt 120',()=>evalExpr('5!').text==='120');
T('100001! → Fehler mit Limit-Hinweis',()=>{const r=evalExpr('100001!');return !r.ok&&/Fakult/.test(r.err)});
T('10000! berechenbar (Grenze)',()=>{const r=evalExpr('10000!');return r.ok&&r.text.length>30000});
T('(-2)! → Fehler',()=>{const r=evalExpr('(-2)!');return !r.ok});
T('Import: valides Objekt akzeptiert',()=>{const v=validateImportData({settings:{angle:'rad',accent:'mint',fontscale:1.1},history:[{e:'1+1',r:'2',exact:true,ts:1700000000000}],favs:['1/3+1/6'],ans:5});return v.ok&&v.data.settings.angle==='rad'&&v.data.history.length===1&&v.data.favs[0]==='1/3+1/6'&&v.data.ans===5});
T('Import: Nicht-Objekt abgelehnt',()=>!validateImportData([1,2,3]).ok&&!validateImportData('x').ok&&!validateImportData(null).ok);
T('Import: schlechter Winkel abgelehnt',()=>{const v=validateImportData({settings:{angle:'bogus'}});return !v.ok});
T('Import: schlechter Akzent abgelehnt',()=>{const v=validateImportData({settings:{accent:'pink'}});return !v.ok});
T('Import: fontscale außerhalb 0.8–1.4 abgelehnt',()=>{return !validateImportData({settings:{fontscale:9}}).ok&&validateImportData({settings:{fontscale:1.05}}).ok});
T('Import: history kein Array abgelehnt',()=>!validateImportData({history:{}}).ok);
T('Import: history zu groß abgelehnt',()=>{var h=[];for(var i=0;i<501;i++)h.push({e:'1',r:'1',exact:true,ts:1});return !validateImportData({history:h}).ok});
T('Import: history-Eintrag ohne Text abgelehnt',()=>!validateImportData({history:[{r:'2'}]}).ok&&!validateImportData({history:[5]}).ok);
T('Import: favs zu groß abgelehnt',()=>{var f=[];for(var i=0;i<201;i++)f.push('x');return !validateImportData({favs:f}).ok});
T('Import: favs-Eintrag kein Text abgelehnt',()=>!validateImportData({favs:[42]}).ok);
T('Import: ans nicht endlich abgelehnt',()=>!validateImportData({ans:Infinity}).ok&&!validateImportData({ans:'5'}).ok);
T('Import: unbekannte Settings-Schlüssel verworfen',()=>{var v=validateImportData({settings:{angle:'gon',evil:'payload'}});return v.ok&&v.data.settings.evil===undefined&&v.data.settings.angle==='gon'});
T('Import: leeres Objekt akzeptiert',()=>validateImportData({}).ok&&validateImportData({}).data.settings===undefined);

/* --- Boolesche Algebra --- */
T('Tafel a&b: 4 Zeilen',()=>boolTable('a&b').rows.length===4&&boolTable('a&b').vars.join()==='a,b');
T('Tafel a&b Korintheit',()=>{var t=boolTable('a&b');return t.rows.filter(r=>r.out).length===1&&t.rows[3].out===true});
T('mehrbuchstabige Namen sind EINE Variable',()=>{var t=boolTable('ab');return t.vars.length===1&&t.rows.length===2});
T('XOR-Tafel',()=>boolTable('a^b').rows.filter(r=>r.out).length===2);
T('Nicht: !a Tafel',()=>{var t=boolTable('!a');return t.rows.filter(r=>!r.out).length===1&&t.rows[0].out===true&&t.rows[1].out===false});
T('QMC: a&b|a&!b → a',()=>boolSimplify('a&b|a&!b').after==='a');
T('QMC: XOR bleibt aufgelöst',()=>boolSimplify('a^b').after==='!ab | a!b');
T('QMC: Mehrheitsfunktion',()=>boolSimplify('a&b|a&c|b&c').after==='ab | ac | bc');
T('QMC: Konstante 1',()=>boolSimplify('a|!a').after==='1');
T('QMC: Konstante 0',()=>boolSimplify('a&!a').after==='0');
T('QMC: Vereinfachung verifiziert (Mehrheit)',()=>{var s=boolSimplify('a&b|a&c|b&c');return boolTable('a&b|a&c|b&c').rows.every(r=>s.verifier(r.in)===r.out)});
T('QMC: Vereinfachung verifiziert (XOR)',()=>{var s=boolSimplify('a^b');return boolTable('a^b').rows.every(r=>s.verifier(r.in)===r.out)});
T('Bool: Wortoperatoren and/or/not',()=>boolTable('a and b').rows.filter(r=>r.out).length===1&&boolSimplify('a and b').after==='ab');
T('Bool: Unicode-Operatoren',()=>boolTable('¬a ∧ b').rows.filter(r=>r.out).length===1);
T('Bool: Implikation',()=>boolTable('a->b').rows.filter(r=>r.out).length===3);
T('Bool: Äquivalenz',()=>{var t=boolTable('a<->b');return t.rows.filter(r=>r.out).length===2});
T('Bool: 5 Variablen abgelehnt',()=>{try{boolTable('a&b&c&d&e');return false}catch(e){return /Variablen/.test(e.message)}});
T('Bool: verschachtelte Klammern',()=>boolTable('(a|b)&!(a&b)').rows.filter(r=>r.out).length===2);

/* --- Faktorisierung & Kurvendiskussion --- */
T('Faktoren x²−1',()=>polyFactors(polyParse('x^2-1')).text==='(x + 1) · (x − 1)');
T('Faktoren x²+2x+1 (Doppel)',()=>polyFactors(polyParse('x^2+2x+1')).text==='(x + 1)²');
T('Faktoren x³−6x²+11x−6',()=>polyFactors(polyParse('x^3-6x^2+11x-6')).text==='(x − 1) · (x − 2) · (x − 3)');
T('Faktoren x³+1 (Rest)',()=>polyFactors(polyParse('x^3+1')).restDeg===2);
T('Kurve: Symmetrie x²−4',()=>curveAnalyze('x^2-4').symmetry==='Achsensymmetrisch zur y-Achse');
T('Kurve: Symmetrie x³',()=>curveAnalyze('x^3').symmetry==='Punktsymmetrisch zum Ursprung');
T('Kurve: Extrema x²',()=>{var e=curveAnalyze('x^2').extrema;return e.length===1&&e[0].type==='Minimum'&&close(e[0].y,0)});
T('Kurve: Wendepunkt x³−3x',()=>{var w=curveAnalyze('x^3-3x').inflections;return w.length===1&&close(w[0].x,0)});
T('Kurve: Extrema x³−3x',()=>{var e=curveAnalyze('x^3-3x').extrema;return e.length===2&&e[0].type==='Tödliches'||e.length===2});

/* --- Zahlentheorie --- */
T('primeList(30)',()=>primeList(30).join()==='2,3,5,7,11,13,17,19,23,29');
T('primePi(100)=25',()=>primePi(100)===25);
T('div(12)',()=>divisorsOf(12).join()==='1,2,3,4,6,12');
T('perfect 28',()=>isPerfect(28)&&!isPerfect(12));
T('quadratfrei 30, nicht 12',()=>isSquareFree(30)&&!isSquareFree(12));
T('modInverse 3 mod 11 = 4',()=>modInverse(3,11)===4n&&(3n*modInverse(3,11))%11n===1n);
T('CRT x≡2(3) x≡3(5) → 8',()=>{var r=crt([[2,3],[3,5]]);return r&&r.x===8n&&r.M===15n});
T('CRT dreifach',()=>{var r=crt([[2,3],[3,5],[2,7]]);return r&&r.x===23n&&r.M===105n});
T('CRT ohne Lösung',()=>crt([[0,2],[1,2]])===null);

/* --- Matrix --- */
T('det 2×2 = 5',()=>rToStr(det([[2,1],[3,4]]))==='5');
T('det 1×1',()=>rToStr(det([[7]]))==='7');
T('det 3×3 = −1',()=>rToStr(det([[2,1,-1],[-3,-1,2],[-2,1,2]]))==='-1');
T('det singulär = 0',()=>det([[1,2],[2,4]]).n===0n);
T('Inverse: A·A⁻¹ = I',()=>{var m=[[2,1],[3,4]];var inv=matrixInverse(m);
  var prod=m.map(function(row,i){ return [0,1].map(function(_,j){ return row.reduce(function(a,v,k){ return rAdd(a,rMul(rq(v),inv[k][j])); }, rq(0n)); }); });
  return rToStr(prod[0][0])==='1'&&rToStr(prod[0][1])==='0'&&rToStr(prod[1][0])==='0'&&rToStr(prod[1][1])==='1';});
T('singulär erkannt',()=>matrixInverse([[1,2],[2,4]])===null);
T('fitLine Gerade',()=>{var f=fitLine([[0,1],[1,3],[2,5]]);return f.m===2&&Math.abs(f.b-1)<1e-9});
T('polyEvalNum',()=>close(polyEvalNum(polyParse('x^2-2x+1'),3),4,1e-9));

/* --- Polynome --- */
T('(x+1)*(x+2)=x²+3x+2',()=>polyToStr(polyParse('(x+1)*(x+2)'))==='x² + 3x + 2');
T('(x+1)³=x³+3x²+3x+1',()=>polyToStr(polyParse('(x+1)^3'))==='x³ + 3x² + 3x + 1');
T('2x·3x=6x²',()=>polyToStr(polyParse('2x*3x'))==='6x²');
T('Bruchkoeffizient (1/2)x²',()=>polyToStr(polyParse('(1/2)x^2'))==='x²/2');
T('Vorzeichen: −6x² = −6x²',()=>polyToStr(polyParse('-6x^2+11x'))==='−6x² + 11x');
T('negativer Bruchkoeffizient',()=>polyToStr(polyParse('x^2-x^3/2'))==='−x³/2 + x²');
T('2x³ = 2·x³',()=>polyToStr(polyParse('2x^3'))==='2x³');
T('Ableitung x³−2x+1 = 3x²−2',()=>polyToStr(polyDeriv(polyParse('x^3-2x+1')))==='3x² − 2');
T('Stammfunktion x² = x³/3',()=>polyToStr(polyInt(polyParse('x^2')))==='x³/3');
T('Stammfunktion x³−2x+1',()=>polyToStr(polyInt(polyParse('x^3-2x+1')))==='x⁴/4 − x² + x');

/* --- Nullstellen --- */
T('x²−3x+2 → 1,2 (rational)',()=>{const r=polyRoots(polyParse('x^2-3x+2'));return r.roots.length===2&&r.roots[0].n===1n&&r.roots[1].n===2n});
T('2x+4 → −2',()=>{const r=polyRoots(polyParse('2x+4'));return r.roots[0].n===-2n});
T('x³−6x²+11x−6 → 1,2,3',()=>{const r=polyRoots(polyParse('x^3-6x^2+11x-6'));return r.roots.length===3&&r.roots[2].n===3n});
T('x²+x+1 → komplex',()=>{const r=polyRoots(polyParse('x^2+x+1'));return !!r.complex});
T('x²−2x+1 → Doppelnullstelle',()=>{const r=polyRoots(polyParse('x^2-2x+1'));return !!r.double});
T('x²−2 → irrational',()=>{const r=polyRoots(polyParse('x^2-2'));return !!r.irrational&&close(r.roots[0],Math.SQRT2,1e-9)});
T('Nullstellen x⁴−1 → ±1',()=>{const r=polyRoots(polyParse('x^4-1'));const rs=r.roots.filter(x=>x.n!==undefined).map(rNum).sort((a,b)=>a-b);return rs.length===2&&rs[0]===-1&&rs[1]===1});
T('Polynom-Parser lehnt Funktionen ab',()=>{try{polyParse('sin(x)');return false}catch(e){return /Funktionen/.test(e.message)}});

/* --- Lineare Systeme --- */
T('2×2-System exakt',()=>{const r=solveLinearSystem([[2,1],[1,1]],[5,3]);return rToStr(r.x[0])==='2'&&rToStr(r.x[1])==='1'});
T('3×3-System exakt (Brüche)',()=>{const r=solveLinearSystem([[2,1,-1],[-3,-1,2],[-2,1,2]],[8,-11,-3]);return rToStr(r.x[0])==='2'&&rToStr(r.x[1])==='3'&&rToStr(r.x[2])==='-1'});
T('System inkonsistent erkannt',()=>{const r=solveLinearSystem([[1,1],[1,1]],[1,2]);return !!r.none});

/* --- Interpolation --- */
T('Lagrange durch 3 Punkte',()=>{const p=lagrangePoly([[0,1],[1,3],[2,7]]);return polyToStr(p)==='x² + x + 1'});
T('Lagrange konstant',()=>{const p=lagrangePoly([[1,5],[2,5],[3,5]]);return p.length===1&&p[0].n===5n});
T('Spline interpoliert',()=>close(linearSplineAt([[0,0],[1,2]],0.5),1,1e-9));

/* --- Zahlentheorie --- */
T('prim bis 100',()=>[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97].every(isPrimeBig));
T('zusammengesetzt erkannt',()=>![91,100,561,1105,897].some(isPrimeBig));
T('große Primzahl 1000000007',()=>isPrimeBig(1000000007));
T('Faktorisierung 360',()=>factorizeText(360)==='2^3 · 3^2 · 5');
T('ggT/kgV BigInt',()=>gcdBig(12n,18n)===6n&&lcmBig(4n,6n)===12n);
T('nCr 49 über 6',()=>nCr(49,6).toString()==='13983816');
T('nCr 10 über 0',()=>nCr(10,0)===1n);
T('modPow 2^10 mod 1000',()=>modPow(2,10,1000).toString()==='24');

/* --- Stochastik --- */
T('Binomial P(X=2; n=5, p=.5)',()=>close(binomPMF(5,2,.5),10/32,1e-12));
T('Binomial CDF ≤0',()=>close(binomCDF(3,0,.25),.421875,1e-12));
T('Normal-CDF(0)=0.5',()=>close(normalCDF(0),.5,1e-9));
T('Normal-Quantil 0.975 ≈ 1.96',()=>close(normalQuantile(.975),1.959964,1e-4));
T('Normal-Quantil Runde',()=>close(normalCDF(normalQuantile(.3)),.3,1e-6));
T('Poisson P(2; λ=1)',()=>close(poissonPMF(1,2),Math.exp(-1)/2,1e-9));
T('Konfidenzintervall',()=>{const ci=confInterval(50,10,25,.95);return ci[0]<50&&ci[1]>50&&close(ci[1]-ci[0],2*1.959964*2,1e-2)});
T('Stats: Mittelwert/Median/Std',()=>{const s=stats([1,2,3,4,5]);return s.mean===3&&s.median===3&&close(s.std,Math.sqrt(2),1e-9)&&close(s.q1,2,1e-9)});

/* --- Finanz --- */
T('Zinseszins 1000 @5% 3a',()=>close(finInterest(1000,5,3,'compound').end,1157.625,1e-6));
T('einfache Zinsen',()=>close(finInterest(1000,5,3,'simple').end,1150,1e-9));
T('Annuität 200000 @4% 10a',()=>close(finAnnuity(200000,4,10).rate,2024.8997,1e-2));

console.log(`\n${ok} Tests OK, ${fail.length} Fehler`);
if(fail.length){fail.forEach(f=>console.log('  ✗ '+f));process.exit(1)}
