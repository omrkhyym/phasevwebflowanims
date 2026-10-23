import { cl, rnd, sq, outExpo, gauss, COL } from '../util.js';

/* H · Volcano plot, biomarqueurs : fold change × significativité (portage à l'identique du proto 7)
   Le nuage se réanalyse toutes les 14 s : les points glissent vers
   leur nouvelle position, appariés par rang pour rester lisibles. */
export function Volcano(S){
  const NP=900, CYC=14, MOR=3.2; let A=[], B=[], t0=0, ph=null, zz=null;
  function gen(){ const a=[]; for(let i=0;i<NP;i++){ const fc=gauss()*1.1; a.push([fc, Math.min(9.6,sq(fc)*rnd(.5,1.7)+Math.abs(gauss())*.5)]); }
    return a.sort((p,q)=>p[0]-q[0]); }
  return {
    resize(t){ A=gen(); B=gen(); t0=t-MOR; ph=Float32Array.from({length:NP},()=>Math.random()*6.2832);
      zz=Float32Array.from({length:NP},()=>Math.random()<.3?1:.45); },
    draw(x,t){
      let u=t-t0; if(u>CYC){ A=B; B=gen(); t0=t; u=0; }
      const e=outExpo(cl(u/MOR,0,1));
      const X=f=>S.W/2+f/4.2*S.W/2, Y=l=>S.H*.95-l/10*S.H*.9;
      x.strokeStyle='rgba('+COL.mau+',.08)'; x.lineWidth=1; x.setLineDash([2,4]); x.beginPath();
      for(const f of [-1,1]){ const px=Math.round(X(f)+S.nx*6)+.5; x.moveTo(px,0); x.lineTo(px,S.H); }
      const py=Math.round(Y(1.3)+S.ny*3)+.5; x.moveTo(0,py); x.lineTo(S.W,py);
      x.stroke(); x.setLineDash([]);
      for(let i=0;i<NP;i++){
        const fc=A[i][0]+(B[i][0]-A[i][0])*e, lp=A[i][1]+(B[i][1]-A[i][1])*e, z=zz[i];
        const px=X(fc)+S.nx*12*z+Math.sin(t*.3+ph[i])*1.5, qy=Y(lp)+S.ny*6*z+Math.cos(t*.27+ph[i])*1.5;
        const hit=Math.abs(fc)>1 && lp>1.3, g=S.glow(px,qy,160,120);
        const a=Math.min(.7,(hit?.32:.11)*(z===1?1:.6)*(1+2*g));
        x.fillStyle='rgba('+(hit?(fc>0?COL.tea:COL.blu):COL.mau)+','+a+')';
        x.beginPath(); x.arc(px,qy,z===1?1.5:1.05,0,6.2832); x.fill();
      }
    }
  };
}
