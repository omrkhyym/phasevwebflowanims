import { cl, rnd, sq, outExpo, COL } from '../util.js';

/* B · Matrice patients × visites (portage à l'identique du proto 7)
   Une ligne = un patient, une colonne = une visite planifiée. */
export function Matrix(S){
  const P=18; let rows=[], cols=0, ox0=0, oy0=0;
  function newRow(r,t,first){
    r.start=Math.floor(rnd(0,.5)*cols);
    const span=cols-r.start;
    r.stop=Math.random()<.14 ? r.start+Math.floor(rnd(.3,.8)*span) : cols;   // arrêt prématuré
    r.done=first ? Math.floor(rnd(0,r.stop-r.start)) : 0;
    r.born=new Float32Array(cols).fill(-99);
    r.kind=new Uint8Array(cols);
    for(let c=0;c<cols;c++){ const q=Math.random(); r.kind[c]=q<.05?1:q<.09?2:0; }   // 1 visite manquée, 2 query ouverte
    r.next=t+rnd(.5,5); r.endAt=-1; r.t0=first?-99:t;
  }
  return {
    resize(t){ cols=Math.ceil(S.W/P)+1; const n=Math.ceil(S.H/P)+1;
      ox0=(S.W-(cols-1)*P)/2; oy0=(S.H-(n-1)*P)/2;
      rows=[]; for(let i=0;i<n;i++){ const r={}; newRow(r,t,true); rows.push(r); } },
    draw(x,t){
      const m=S.m, sx=S.nx*5, sy=S.ny*3;
      rows.forEach((r,ri)=>{
        if(r.start+r.done<r.stop && t>=r.next){ r.born[r.start+r.done]=t; r.done++; r.next=t+rnd(1.5,5.5); }
        if(r.start+r.done>=r.stop && r.endAt<0) r.endAt=t+rnd(4,9);
        let rf=cl((t-r.t0)/1.5,0,1);
        if(r.endAt>0){ if(t>r.endAt+1.5){ newRow(r,t,false); rf=0; } else if(t>r.endAt) rf=1-(t-r.endAt)/1.5; }
        const y=oy0+ri*P+sy;
        const gr=m.a*Math.exp(-sq((y-m.y)/18));
        for(let c=0;c<cols;c++){
          const px=ox0+c*P+sx, rel=c-r.start;
          const gc=m.a*Math.exp(-sq((px-m.x)/18));
          const g=Math.max(gr*Math.exp(-sq((px-m.x)/360)), gc*Math.exp(-sq((y-m.y)/240)));
          let col=COL.mau, al, rad;
          if(rel<0 || c>=r.stop){ al=.03; rad=.7; }                     // grille de fond
          else if(rel<r.done){
            if(r.kind[c]===1){ al=.03; rad=.7; }                          // visite manquée : trou
            else { const pop=outExpo(cl((t-r.born[c])/.6,0,1));
              col=r.kind[c]===2?COL.tea:COL.mau; al=(.07+.15*pop)*rf+.03*(1-rf); rad=.8+.7*pop*rf; }
          } else { al=.03+.04*rf; rad=.8; }                                // visite planifiée
          if(c===r.stop-1 && r.stop<cols && rel<r.done){ col=COL.blu; }   // dernière visite avant arrêt
          al=Math.min(.6,al+.2*g);
          x.fillStyle='rgba('+col+','+al+')';
          x.beginPath(); x.arc(px,y,rad,0,6.2832); x.fill();
        }
      });
    }
  };
}
