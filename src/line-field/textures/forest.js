import { cl, rnd, outExpo, gauss, COL } from '../util.js';

/* D · Forest plot en panneaux (portage à l'identique du proto 7)
   Chaque ligne = une étude ou un sous-groupe : estimation + IC.
   Les estimations se réactualisent une par une, lentement. */
export function Forest(S){
  const RP=22; let rows=[], panels=[];
  function reest(r,t){ r.fe=r.e; r.fh=r.h; r.te=gauss()*.15+.04; r.th=rnd(.035,.15); r.t0=t; r.next=t+rnd(7,16); }
  return {
    resize(t){ rows=[]; panels=[];
      const pc=Math.max(2,Math.round(S.W/330)), pw=S.W/pc;
      for(let p=0;p<pc;p++){ const P={pw, nx:p*pw+pw*.42}; panels.push(P);
        for(let y=RP/2; y<S.H+RP; y+=RP){
          const r={P, y:y+(p%2)*RP/2, w:rnd(.3,1), z:Math.random()<.35?1:.5, dia:Math.random()<.07};
          r.e=gauss()*.15+.04; r.h=rnd(.035,.15); reest(r,t-3); r.next=t+rnd(0,14); rows.push(r); } } },
    draw(x,t){
      x.strokeStyle='rgba('+COL.mau+',.08)'; x.lineWidth=1; x.setLineDash([2,4]); x.beginPath();
      for(const P of panels){ const px=Math.round(P.nx+S.nx*6)+.5; x.moveTo(px,0); x.lineTo(px,S.H); }
      x.stroke(); x.setLineDash([]);
      for(const r of rows){
        if(t>=r.next) reest(r,t);
        const k=outExpo(cl((t-r.t0)/2.4,0,1)); r.e=r.fe+(r.te-r.fe)*k; r.h=r.fh+(r.th-r.fh)*k;
        const ox=S.nx*10*r.z, oy=S.ny*5*r.z, cx=r.P.nx+r.e*r.P.pw+ox, y=r.y+oy, hw=r.h*r.P.pw;
        const g=S.glow(cx,y,220,70), a=Math.min(.6,(r.z===1?.2:.1)*(1+2*g));
        if(r.dia){
          x.fillStyle='rgba('+COL.blu+','+Math.min(.7,a*1.4)+')';
          x.beginPath(); x.moveTo(cx-hw,y); x.lineTo(cx,y-3.5); x.lineTo(cx+hw,y); x.lineTo(cx,y+3.5); x.fill();
        } else {
          x.fillStyle='rgba('+COL.mau+','+a+')'; x.fillRect(cx-hw,y-.5,hw*2,1);
          const sz=(1.5+3.5*r.w)*(r.z===1?1:.7);
          x.fillStyle='rgba('+COL.mau+','+Math.min(.75,a*1.8)+')'; x.fillRect(cx-sz/2,y-sz/2,sz,sz);
        }
      }
    }
  };
}
