import { cl, outExpo, gauss, COL } from '../util.js';

/* E · Waterfall plot, meilleure variation vs baseline (portage à l'identique du proto 7)
   Barres triées, seuils RECIST +20 % / −30 %. Le jeu se redessine
   de gauche à droite, tient, se rétracte, puis un autre arrive. */
export function Waterfall(S){
  const PITCH=5, BW=3, CYC=17; let n=0, v=[], t0=0, base=0, x0=0;
  function gen(t){ v=[]; for(let i=0;i<n;i++) v.push(cl(gauss()*38-8,-100,120)); v.sort((a,b)=>b-a); t0=t; }
  return {
    resize(t){ n=Math.ceil(S.W/PITCH); x0=(S.W-n*PITCH)/2; base=S.H*.5; gen(t-5); },
    draw(x,t){
      let u=t-t0; if(u>CYC){ gen(t); u=0; }
      const sc=S.H*.42/100, ox=S.nx*8, oy=S.ny*4, by=base+oy, m=S.m;
      x.strokeStyle='rgba('+COL.mau+',.09)'; x.lineWidth=1; x.setLineDash([2,4]); x.beginPath();
      for(const th of [20,-30]){ const y=Math.round(by-th*sc)+.5; x.moveTo(0,y); x.lineTo(S.W,y); }
      x.stroke(); x.setLineDash([]);
      x.fillStyle='rgba('+COL.mau+',.12)'; x.fillRect(0,Math.round(by),S.W,1);
      for(let i=0;i<n;i++){
        const d=i/n*1.4, k=outExpo(cl((u-d)/1.6,0,1))*(1-outExpo(cl((u-13.5-d*.6)/1.6,0,1)));
        if(k<=.002) continue;
        const h=v[i]*sc*k, px=x0+i*PITCH+ox;
        const resp=v[i]<=-30, g=S.glow(px+BW/2,by-h/2,200,140);
        const a=Math.min(.6,(resp?.2:v[i]>=20?.15:.09)*(1+2*g));
        x.fillStyle='rgba('+(resp?COL.blu:COL.mau)+','+a+')';
        if(h>0) x.fillRect(px,by-h,BW,h); else x.fillRect(px,by,BW,-h);
      }
    }
  };
}
