import { cl, rnd, outExpo, COL } from '../util.js';

/* C · Strates Kaplan-Meier (portage à l'identique du proto 7) */
export function KM(S){
  let curves=[];
  function spawn(c,t,first){
    c.y0=c.base+rnd(-8,8); c.D=rnd(40,150); const lam=rnd(.6,2.6);
    const n=Math.floor(rnd(10,26)); c.ev=[];
    for(let i=0;i<n;i++) c.ev.push(Math.random()); c.ev.sort((a,b)=>a-b);
    c.ys=c.ev.map(e=>c.y0+c.D*(1-Math.exp(-lam*e))/(1-Math.exp(-lam)));
    c.cs=[]; const k=Math.floor(rnd(5,13)); for(let i=0;i<k;i++) c.cs.push(Math.random());
    c.z=Math.random()<.3?1:.45; c.col=Math.random()<.2?COL.blu:COL.mau;
    c.g=rnd(5,8); c.h=rnd(4,9); c.f=1.6;
    c.t0=first ? t-rnd(-2,c.g+c.h) : t+rnd(.5,3);
  }
  const X=v=>(-.02+1.04*v)*S.W;
  function yAt(c,v){ let y=c.y0; for(let i=0;i<c.ev.length&&c.ev[i]<=v;i++) y=c.ys[i]; return y; }
  function path(x,c,head,ox,oy){
    x.beginPath(); let y=c.y0+oy; x.moveTo(X(0)+ox,y);
    for(let i=0;i<c.ev.length&&c.ev[i]<=head;i++){ const px=X(c.ev[i])+ox; x.lineTo(px,y); y=c.ys[i]+oy; x.lineTo(px,y); }
    x.lineTo(X(head)+ox,y);
    const tk=c.z===1?3:2;
    for(const v of c.cs){ if(v>head) continue; const px=X(v)+ox, py=yAt(c,v)+oy; x.moveTo(px,py-tk); x.lineTo(px,py+tk); }
  }
  return {
    resize(t){ curves=[]; const n=Math.ceil(S.H/30)+3;
      for(let i=0;i<n;i++){ const c={base:-60+i*(S.H+60)/(n-1)}; spawn(c,t,true); curves.push(c); } },
    draw(x,t){
      const m=S.m;
      const live=[];
      for(const c of curves){
        let u=t-c.t0;
        if(u>c.g+c.h+c.f){ spawn(c,t,false); continue; }
        if(u<0) continue;
        const head=outExpo(cl(u/c.g,0,1)), fade=u>c.g+c.h?1-(u-c.g-c.h)/c.f:1;
        const ox=S.nx*12*c.z, oy=S.ny*6*c.z;
        x.lineWidth=c.z===1?1.1:.7;
        x.strokeStyle='rgba('+c.col+','+((c.z===1?.2:.09)*fade)+')';
        path(x,c,head,ox,oy); x.stroke();
        live.push([c,head,ox,oy,fade]);
      }
      /* halo souris : on repasse les courbes avec un dégradé radial en strokeStyle,
         ça éclaire localement sans découpe nette */
      if(m.a>.01){
        const gr=x.createRadialGradient(m.x,m.y,0,m.x,m.y,220);
        gr.addColorStop(0,'rgba('+COL.mau+','+(.32*m.a)+')'); gr.addColorStop(1,'rgba('+COL.mau+',0)');
        x.strokeStyle=gr;
        for(const [c,head,ox,oy,fade] of live){ x.lineWidth=c.z===1?1.1:.7; x.globalAlpha=S.fade*fade; path(x,c,head,ox,oy); x.stroke(); }
        x.globalAlpha=S.fade;
      }
    }
  };
}
