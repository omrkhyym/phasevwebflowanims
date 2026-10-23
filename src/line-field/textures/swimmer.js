import { cl, rnd, outExpo, COL } from '../util.js';

/* A · Swimmer plot sur trois plans (portage à l'identique du proto 7) */
export function Swimmer(S){
  /* p = écart entre pistes, a = opacité, w = épaisseur, z = profondeur (1 = devant) */
  const PLANES=[ {p:7,a:.06,w:.6,z:.25,spd:.6}, {p:13,a:.12,w:1,z:.6,spd:.8}, {p:26,a:.24,w:1.4,z:1,spd:1} ];
  let lanes=[];
  function spawn(L,t,first){
    L.x0=rnd(-.08,.86); L.len=rnd(.12,.5);
    L.g=rnd(2.6,5)/L.pl.spd; L.h=rnd(3,8); L.r=L.g*.85;
    L.t0=first ? t-rnd(-3,L.g+L.h) : t+rnd(.4,3);
    L.col=Math.random()<.16?COL.blu:COL.mau;
    L.mk=[]; const n=Math.floor(rnd(0,3));
    for(let i=0;i<n;i++) L.mk.push({f:rnd(.2,.9), c:Math.random()<.6?COL.tea:COL.blu});
    L.end=L.pl.z===1 && Math.random()<.4;
  }
  return {
    resize(t){ lanes=[];
      PLANES.forEach(P=>{ for(let y=P.p/2; y<S.H+P.p; y+=P.p){ const L={pl:P,y}; spawn(L,t,true); lanes.push(L); } }); },
    draw(x,t){
      const m=S.m;
      for(const L of lanes){
        const P=L.pl; let u=t-L.t0;
        if(u>L.g+L.h+L.r){ spawn(L,t,false); continue; }
        if(u<0) continue;
        let head,tail;
        if(u<L.g){ head=outExpo(u/L.g); tail=0; }
        else if(u<L.g+L.h){ head=1; tail=0; }
        else { head=1; tail=outExpo((u-L.g-L.h)/L.r); }
        const ox=S.nx*14*P.z, oy=S.ny*6*P.z;
        const xa=(L.x0+L.len*tail)*S.W+ox, xb=(L.x0+L.len*head)*S.W+ox, y=L.y+oy;
        if(xb-xa<.5) continue;
        const g=S.glow(cl(m.x,xa,xb),y);
        const al=Math.min(.6,P.a*(1+2*g*P.z));
        x.fillStyle='rgba('+L.col+','+al+')';
        x.fillRect(xa,y-P.w/2,xb-xa,P.w);
        for(const k of L.mk){
          if(head<k.f||tail>k.f) continue;
          const pop=outExpo(cl((head-k.f)/.05,0,1)), px=(L.x0+L.len*k.f)*S.W+ox, h=(2+4*P.z)*pop;
          x.fillStyle='rgba('+k.c+','+Math.min(.85,al*2.4)+')';
          x.fillRect(px-.5,y-h,1,h*2);
        }
        if(L.end && head>=1 && tail<1){ x.fillStyle='rgba('+COL.mau+','+Math.min(.8,al*2)+')'; x.fillRect(xb-1.5,y-1.5,3,3); }
      }
    }
  };
}
