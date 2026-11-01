import{M as F,P as et,S as D,V,a as W,D as Zt,b as na,c as q,Q as wt,O as Gt,Z as ia,A as ca,C as la,I as ua,d as yt,G as Ft,B as ct,F as N,e as ft,f as da,g as it,W as ha,h as fa,i as va,T as ma,j as pa}from"./three.module-CwGaZDe4.js";import{R as Ot,V as Pt,B as Mt,a as xe,S as It,C as vt}from"./glslChunks-BPS8m5j-.js";import{S as Bt,L as Jt}from"./GamePage-C-I34L1q.js";import{ik as ga}from"./index-CU7zjk6X.js";import{al as wa}from"./GameBoard-C50E92ul.js";import"./ManaCostPips-BPI4I23H.js";import"./useAltToggle-D4hJBU4c.js";import"./useShiftHeld-Dlg3FhSd.js";import"./cardImageSrcSet-CuP_PMst.js";import"./loopDetectionMode-DbQzspkQ.js";import"./PopoverMenu-CVMHTzN5.js";import"./ScoreBadge-DAMVqxAD.js";import"./ConnectionToast-C7T-k_Lz.js";import"./p2p-adapter-asBxLGzB.js";import"./aiRandomPool-Cja2ofRb.js";const xa=440,At=420,Ma=340,ya=150,Aa=.6,Sa=.5,ba=.5,Ca=300,te=.002,Ra=400,ka=4e3,Ta=150,_a=150,Ea=2,Rt=63/88,Fa=.05,Oa=170,Pa=.65,Ia=q.degToRad(14),La=q.degToRad(9),za=.16,Da=90,Tt=.046,Ga=.028,Ua=.72,St=.36,Wa=.12,Ba=.72,Ha={Stack:{curve:"panel",durationMs:xa},Battlefield:{curve:"land",durationMs:At},Graveyard:{curve:"panel",durationMs:At},Hand:{curve:"panel",durationMs:Ma},Library:{curve:"panel",durationMs:At},Exile:{curve:"panel",durationMs:At}},Na=new V(1,0,0),ee=new V(0,1,0),Ka=new V(0,0,1),Me=s=>Math.min(Math.max(s,0),1),kt=(s,t,e)=>{const a=Me((e-s)/(t-s));return a*a*(3-2*a)},Va=s=>s<.5?4*s*s*s:1-(-2*s+2)**3/2,$a=s=>1-(1-s)**3,ja=s=>1-(1-s)**2,bt=(s,t,e)=>s+(t-s)*e;function ye(s,t){switch(s){case"none":return 0;case"toFront":return t?0:Math.PI;case"toBack":return t?Math.PI:0}}function Ht(s){return s.w/s.h>Rt?{...s,w:s.h*Rt}:{...s,h:s.w/Rt}}function Za(s,t){return{...Ht(s),z:0,bump:0,flip:ye(t,!1)}}function Ut(s,t,e,a,o){const c=a.x-e.x,r=a.y-e.y,n=Math.hypot(c,r)||1;let i=-r/n,l=c/n;l>0&&(i=-i,l=-l);const u=Math.min(n*za,Da),f=(e.x+a.x)/2+i*u,h=(e.y+a.y)/2+l*u,m=j=>{const tt=1-j;return[tt*tt*e.x+2*tt*j*f+j*j*a.x,tt*tt*e.y+2*tt*j*h+j*j*a.y]},v=Oa*(s==="land"?1:Pa)*Math.min(1,.35+n/500);let w,g;switch(s){case"land":w=$a(Math.min(t/Ua,1)),g=t<St?v*ja(t/St):v*(1-((t-St)/(1-St))**2);break;case"panel":w=Va(t),g=v*Math.sin(Math.PI*t);break}const[p,x]=m(w),[y,k]=m(Math.min(w+.01,1)),S=g+e.z*(1-w),b=e.bump*(1-t)+(1-e.bump)*Math.sin(Math.PI*t),T=bt(e.flip,o,kt(Wa,Ba,t)),_=bt(e.angleDeg,a.angleDeg,w),A=new wt().setFromAxisAngle(Ka,-q.degToRad(_)),M=new wt().setFromAxisAngle(Na,Ia*b),C=new wt().setFromAxisAngle(ee,T),R=y-p,I=-(k-x),B=Math.hypot(R,I),$=B>1e-4?new V(-I/B,R/B,0):ee,X=new wt().setFromAxisAngle($,La*b).multiply(A).multiply(M).multiply(C);return{x:p,y:x,z:S,w:bt(e.w,a.w,w),h:bt(e.h,a.h,w),angleDeg:_,bump:b,flip:T,quaternion:X,planar:A}}const qa=`
  varying vec2 vUv; varying vec3 vN;
  void main() {
    vUv = uv;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,Xa=`
  uniform sampler2D uFront, uBack; uniform vec2 uSize; uniform float uRadius, uAlpha, uWash, uWashTime;
  uniform vec3 uWashTint;
  varying vec2 vUv; varying vec3 vN;
  ${Ot}
  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float edge = clamp(0.5 - roundedBox(p, uSize * 0.5, uRadius), 0.0, 1.0);
    if (edge <= 0.0) discard;
    vec2 c = vUv - 0.5;
    float d = length(c);
    vec2 uv = vUv + c / max(d, 0.001) * sin(d * 70.0 - uWashTime * 16.0) * 0.004 * uWash * (1.0 - uWash) * 4.0;
    vec3 n = gl_FrontFacing ? vN : -vN;
    vec3 col = gl_FrontFacing ? texture2D(uFront, uv).rgb : texture2D(uBack, vec2(1.0 - uv.x, uv.y)).rgb;
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, mix(vec3(luma), uWashTint, 0.55) * 0.5 + uWashTint * 0.45, uWash * 0.8);
    vec3 L = normalize(vec3(-0.35, 0.55, 0.76));
    vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
    float shade = 1.0 + 0.55 * (dot(n, L) - L.z);
    float spec = max(pow(max(dot(n, H), 0.0), 40.0) - pow(H.z, 40.0), 0.0) * 0.45;
    gl_FragColor = vec4(col * clamp(shade, 0.35, 1.4) + spec, edge * uAlpha);
    #include <colorspace_fragment>
  }`,Ya=`
  uniform vec2 uSize; uniform float uRadius, uBlur, uAlpha;
  varying vec2 vUv;
  ${Ot}
  void main() {
    vec2 p = (vUv - 0.5) * (uSize + 2.0 * uBlur);
    float d = roundedBox(p, uSize * 0.5, uRadius);
    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha * (1.0 - smoothstep(-uBlur, uBlur, d)));
  }`,Qa=`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Ae=new et(1,1);function Nt(s,t,e){const a=new F(Ae,new D({vertexShader:qa,fragmentShader:Xa,transparent:!0,side:Zt,uniforms:{uFront:{value:s},uBack:{value:t},uSize:{value:new W(1,1)},uRadius:{value:Tt},uAlpha:{value:e},uWash:{value:0},uWashTime:{value:0},uWashTint:{value:new V}}}));return a.renderOrder=2,a.frustumCulled=!1,a}function Se(){const s=new F(Ae,new D({vertexShader:Qa,fragmentShader:Ya,transparent:!0,depthWrite:!1,depthTest:!1,uniforms:{uSize:{value:new W},uRadius:{value:Tt},uBlur:{value:2},uAlpha:{value:0}}}));return s.renderOrder=0,s.frustumCulled=!1,s}function Ja(){const s=new na(new Uint8Array([0,0,0,255]),1,1);return s.needsUpdate=!0,s}const ts={warmUp(s){const t=s.backTexture??s.placeholderTexture,e=Nt(t,t,0);e.name="card-flight-warmup";const a=Se();return a.name="card-shadow-warmup",[e,a]}},es={water:[.72,.85,.94],pale:[.88,.88,.86]},as=s=>s.kind==="hold"?"hold":s.el??"remembered";class ss{constructor(t,e){this.host=t,this.params=e,this.objectId=e.objectId,this.profile=Ha[e.route.to],this.targetFlip=ye(e.flip,!0),this.state=e.from,this.holdPose={...e.from,y:e.from.y-e.from.h*Sa};const a=e.back??t.placeholderTexture;this.card=Nt(e.front??a,a,1),this.card.name="card-flight",e.wash&&this.card.material.uniforms.uWashTint.value.set(...es[e.wash.look]),t.scene.add(this.card),e.tier==="full"?(this.shadow=Se(),this.shadow.name="card-shadow",t.scene.add(this.shadow)):this.shadow=null,e.rest&&this.restOn(e.rest,a)}objectId;card;rest=null;shadow;profile;targetFlip;holdPose;state;phase={kind:"flying"};flightStartMs=null;leg=null;absentAfterCommit=0;arrivedMs=null;previousAim=null;restOn({pose:t,surface:e,radius:a},o){const c=Nt(e,o,1);c.name="card-flight-rest",c.position.set(t.x,-t.y,0),c.rotation.z=-q.degToRad(t.angleDeg),c.scale.set(t.w,t.h,1),c.material.uniforms.uSize.value.set(t.w,t.h),c.material.uniforms.uRadius.value=a,this.host.scene.add(c),this.rest=c,this.card.visible=!1}leaveRest(){const{rest:t}=this;t&&(this.host.scene.remove(t),t.material.dispose(),this.params.rest?.surface.dispose(),this.rest=null,this.card.visible=!0)}currentState(){return this.state}isReleased(){switch(this.phase.kind){case"flying":case"settling":return!1;case"fading":case"revealing":return!0}}update(t){this.flightStartMs??=t+this.params.delayMs,this.applyWash(t);const{pace:e}=this.params;switch(this.phase.kind){case"revealing":return this.reveal(t,this.phase);case"fading":{const a=1-(t-this.phase.startMs)/this.phase.durationMs;return a<=0?!1:(this.draw(this.phase.frame,1,a),!0)}case"settling":{const a=Math.min((t-this.phase.startMs)/(ya*e),1);return this.draw(this.phase.frame,1-Ga*Math.sin(Math.PI*a),1),a>=1&&this.release("land",{kind:"revealing",sinceMs:t,then:"dispose",baseOpacity:null}),!0}case"flying":return t>=this.flightStartMs?(this.leaveRest(),this.fly(t,this.flightStartMs)):(this.rest||this.draw(Ut(this.profile.curve,0,this.state,this.state,this.state.flip),1,1),!0)}}applyWash(t){const{wash:e}=this.params;if(!e)return;const a=this.card.material.uniforms;a.uWash.value=kt(0,1,(t-e.startMs)/e.durationMs),a.uWashTime.value=t/1e3}fly(t,e){const{pace:a}=this.params,o=this.params.aim(this.host.canvasOrigin()),c=as(o),r=o.kind==="hold"?this.holdPose:Ht(o.pose),n=this.profile.durationMs;if(!this.leg)this.leg={start:this.state,startMs:t,durationMs:n*a,aimKey:c};else if(c!==this.leg.aimKey){const m=(t-e)/a,v=Math.max(Aa*n,n-m)*a;this.leg={start:this.state,startMs:t,durationMs:v,aimKey:c}}const i=Me((t-this.leg.startMs)/this.leg.durationMs),l=Ut(this.profile.curve,i,this.leg.start,r,this.targetFlip);this.state=l,this.draw(l,1,1);const u=this.previousAim;this.previousAim=o.kind==="hold"?null:{key:c,pose:o.pose,opacity:o.kind==="own"?o.opacity:null};const f=this.params.committed();return this.absentAfterCommit=f&&o.kind!=="own"?this.absentAfterCommit+1:0,this.absentAfterCommit>=Ea||t-e>=ka*a?(this.release("abandon",{kind:"fading",startMs:t,durationMs:Ta*a,frame:l}),!0):i<1||o.kind!=="own"?(this.arrivedMs=null,!0):(this.arrivedMs??=t,(u?.key===c&&u.opacity!==null&&os(u.pose,o.pose)<ba&&Math.abs(u.opacity-o.opacity)<te||t-this.arrivedMs>=Ca*a)&&this.land(t,o.pose,l),!0)}land(t,e,a){if(!(Math.abs(e.w/e.h-Rt)<=Fa)){this.release("land",{kind:"revealing",sinceMs:t,then:"crossfade",baseOpacity:null});return}switch(this.profile.curve){case"land":this.phase={kind:"settling",startMs:t,frame:a};return;case"panel":this.release("land",{kind:"revealing",sinceMs:t,then:"dispose",baseOpacity:null});return}}reveal(t,e){const a=this.params.aim(this.host.canvasOrigin());if(a.kind!=="own")return!1;const o=Ut(this.profile.curve,1,this.state,Ht(a.pose),this.targetFlip);this.state=o,this.draw(o,1,1);const c=e.baseOpacity??a.opacity;if(this.phase={...e,baseOpacity:c},!(a.faceImagesSettled||a.opacity<c-te||t-e.sinceMs>=Ra))return!0;switch(e.then){case"dispose":return!1;case"crossfade":return this.phase={kind:"fading",startMs:t,durationMs:_a*this.params.pace,frame:o},!0}}release(t,e){this.phase=e,this.params.onRelease(t)}draw(t,e,a){const{card:o,shadow:c}=this;o.position.set(t.x,-t.y,t.z),o.quaternion.copy(t.quaternion),o.scale.set(t.w*e,t.h*e,1);const r=o.material.uniforms;if(r.uSize.value.set(t.w,t.h),r.uRadius.value=t.w*Tt,r.uAlpha.value=a,!c)return;const n=2+t.z*.09;c.position.set(t.x+t.z*.3,-t.y-t.z*.42,0),c.quaternion.copy(t.planar),c.scale.set(t.w+n*2,t.h+n*2,1);const i=c.material.uniforms;i.uSize.value.set(t.w,t.h),i.uRadius.value=t.w*Tt,i.uBlur.value=n,i.uAlpha.value=a*.5*kt(1,18,t.z)*(1-kt(160,520,t.z))}dispose(){this.leaveRest(),this.host.scene.remove(this.card),this.card.material.dispose(),this.params.front?.dispose(),this.shadow&&(this.host.scene.remove(this.shadow),this.shadow.material.dispose())}}function os(s,t){return Math.max(Math.hypot(s.x-t.x,s.y-t.y),Math.abs(s.w-t.w),Math.abs(s.h-t.h))}function rs(s,t){return new ss(s,t)}const lt={full:1,reduced:.5},rt={transparent:!0,depthWrite:!1,depthTest:!1,blending:la,blendEquation:ca,blendSrc:Gt,blendDst:Gt,blendSrcAlpha:ia,blendDstAlpha:Gt},mt={transparent:!0,depthWrite:!1,depthTest:!1},d=(s,t)=>s+Math.random()*(t-s),K=s=>q.clamp(s,0,1),z=(s,t)=>Math.round(s*t),st=`
  ${Pt}
  float fbm(vec2 p) { return vnoise(p) * 0.55 + vnoise(p * 2.1 + 3.7) * 0.3 + vnoise(p * 4.3 + 9.1) * 0.15; }`,ns={fire:0,lightning:1,life:2},Lt=`
  uniform float uPalette;
  vec3 ramp(float h) {
    h = clamp(h, 0.0, 1.0);
    if (uPalette > 1.5) {
      vec3 g = mix(vec3(0.32, 0.2, 0.05), vec3(1.0, 0.8, 0.42), smoothstep(0.0, 0.5, h));
      return mix(g, vec3(1.0, 0.98, 0.9), smoothstep(0.55, 1.0, h));
    }
    if (uPalette > 0.5) {
      vec3 e = mix(vec3(0.08, 0.1, 0.35), vec3(0.35, 0.55, 1.0), smoothstep(0.0, 0.5, h));
      return mix(e, vec3(0.92, 0.96, 1.0), smoothstep(0.55, 1.0, h));
    }
    vec3 c = mix(vec3(0.3, 0.03, 0.01), vec3(1.0, 0.32, 0.04), smoothstep(0.0, 0.45, h));
    c = mix(c, vec3(1.0, 0.72, 0.28), smoothstep(0.4, 0.75, h));
    return mix(c, vec3(1.0, 0.96, 0.84), smoothstep(0.78, 1.0, h));
  }`,is=`
  attribute vec3 aPos; attribute vec3 aVel; attribute vec4 aTime; attribute vec4 aLook;
  uniform float uTime, uAccZ;
  varying vec2 vUv; varying float vA, vHeat, vSeed;
  #ifdef FROM_KEY
  ${st}
  ${Mt}
  uniform float uBurnStart, uBurnS;
  #endif
  void main() {
    float spawn = aTime.x;
    #ifdef FROM_KEY
    spawn += uBurnStart + (burnKey(vec2(aPos.x, -aPos.y)) + 0.08) / ${xe.toFixed(2)} * uBurnS;
    #endif
    float age = uTime - spawn;
    float a = age / aTime.y;
    if (age < 0.0 || a >= 1.0) { gl_Position = vec4(0.0, 0.0, 2.0, 1.0); return; }
    float drag = aTime.z;
    vec3 p = aPos + aVel * (1.0 - exp(-drag * age)) / drag;
    p.z += 0.5 * uAccZ * age * age;
    #if defined(SPARK) || defined(DROP) || defined(ICE)
    // Sparks and drops fall to the table and stay on it.
    p.z = max(p.z, 0.0);
    #endif
    #ifdef SPARK
    vec3 v = aVel * exp(-drag * age) + vec3(0.0, 0.0, uAccZ * age);
    vec2 dir = length(v.xy) > 0.001 ? normalize(v.xy) : vec2(1.0, 0.0);
    float len = max(length(v.xy) * aLook.w, aLook.x);
    vec3 local = p + vec3(dir * (position.x - 0.5) * len + vec2(-dir.y, dir.x) * position.y * aLook.x, 0.0);
    #else
    float s = mix(aLook.x, aLook.y, 1.0 - (1.0 - a) * (1.0 - a));
    #ifdef DROP
    // A drop does not turn: its highlight stays on the side facing the light.
    vec3 local = p + vec3(position.xy * s, 0.0);
    #else
    float ang = aTime.w * 6.2831 + age * (aTime.w - 0.5) * 3.0;
    vec3 local = p + vec3(mat2(cos(ang), sin(ang), -sin(ang), cos(ang)) * position.xy * s, 0.0);
    #endif
    #endif
    vUv = position.xy + 0.5; vA = a; vHeat = aLook.z; vSeed = aTime.w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(local, 1.0);
  }`,cs=`
  uniform float uGain, uCool, uTime; uniform vec3 uTint;
  varying vec2 vUv; varying float vA, vHeat, vSeed;
  ${st}
  ${Lt}
  void main() {
    vec2 q = vUv * 2.0 - 1.0;
    #if defined(SPARK)
    float across = 1.0 - smoothstep(0.1, 1.0, abs(q.y));
    float along = smoothstep(0.0, 1.0, vUv.x);
    gl_FragColor = vec4(ramp(vHeat * (1.0 - 0.6 * vA)) * across * along * (1.0 - vA * vA) * uGain, 0.0);
    #elif defined(SMOKE)
    float r = length(q) + (vnoise(q * 2.2 + vSeed * 37.0) - 0.5) * 0.5;
    float fade = smoothstep(0.0, 0.2, vA) * (1.0 - smoothstep(0.4, 1.0, vA));
    gl_FragColor = vec4(uTint, (1.0 - smoothstep(0.3, 1.0, r)) * fade * uGain);
    #elif defined(ICE)
    float edge = abs(q.x) * 1.7 + abs(q.y);
    if (edge > 1.0) discard;
    float facet = step(0.0, q.x + q.y * 0.25);
    vec3 col = mix(uTint * 0.65, vec3(0.92, 0.99, 1.0), facet);
    col = mix(col, vec3(1.0), smoothstep(0.82, 0.98, edge));
    gl_FragColor = vec4(col, (1.0 - smoothstep(0.4, 1.0, vA)) * uGain);
    #elif defined(DROP)
    // A bead of water: a clear body, a rim darkened where it bends the light,
    // and the highlight of the light above. It thins out as it spreads.
    float r = length(q);
    if (r >= 1.0) discard;
    float fade = smoothstep(0.0, 0.05, vA) * (1.0 - smoothstep(0.5, 1.0, vA));
    float rim = smoothstep(0.6, 0.95, r) * (1.0 - smoothstep(0.95, 1.0, r));
    float glint = 1.0 - smoothstep(0.05, 0.3, length(q - vec2(-0.3, 0.35)));
    vec3 col = mix(mix(uTint, uTint * 0.4, rim), vec3(1.0), glint);
    gl_FragColor = vec4(col, (0.22 + 0.5 * rim + 0.75 * glint) * fade * uGain);
    #else
    float r = length(q) + (vnoise(q * 2.4 + vSeed * 37.0 + vA * 2.5) - 0.5) * 0.7;
    float shape = pow(max(1.0 - r, 0.0), 1.5);
    float fade = smoothstep(0.0, 0.1, vA) * (1.0 - vA);
    #ifdef EMBER
    shape = 1.0 - smoothstep(0.2, 1.0, length(q));
    fade *= 0.65 + 0.35 * sin(uTime * 40.0 + vSeed * 60.0);
    #endif
    gl_FragColor = vec4(ramp(vHeat * exp(-vA * uCool)) * shape * fade * uGain, 0.0);
    #endif
  }`;function O(s,t,e,{accZ:a,gain:o,cool:c=1.6,palette:r="fire",tint:n=[.09,.075,.065],order:i,key:l}){const u=s.length,f=new et(1,1),h=new ua;h.setIndex(f.index),h.setAttribute("position",f.getAttribute("position"));const m=new Float32Array(u*3),v=new Float32Array(u*3),w=new Float32Array(u*4),g=new Float32Array(u*4);s.forEach((x,y)=>{m.set(x.pos,y*3),v.set(x.vel,y*3),w.set([x.spawn,x.life,Math.max(x.drag,.1),Math.random()],y*4),g.set([x.s0,x.s1??x.s0,x.heat??1,x.stretch??0],y*4)}),h.setAttribute("aPos",new yt(m,3)),h.setAttribute("aVel",new yt(v,3)),h.setAttribute("aTime",new yt(w,4)),h.setAttribute("aLook",new yt(g,4)),h.instanceCount=u;const p=new F(h,new D({vertexShader:is,fragmentShader:cs,defines:{[t]:"",...l?{FROM_KEY:""}:{}},uniforms:{uTime:e,uAccZ:{value:a},uGain:{value:o},uCool:{value:c},uPalette:{value:ns[r]},uTint:{value:new V(...n)},...l},...t==="SMOKE"||t==="DROP"||t==="ICE"?mt:rt}));return p.frustumCulled=!1,p.renderOrder=i,p}const ls=`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,us=`
  uniform vec3 uColor; uniform float uIntensity;
  varying vec2 vUv;
  void main() {
    float r = length(vUv * 2.0 - 1.0);
    #if defined(RING)
    float a = exp(-pow((r - 0.82) / 0.05, 2.0)) * (1.0 - smoothstep(0.95, 1.0, r));
    gl_FragColor = vec4(uColor * a * uIntensity, 0.0);
    #elif defined(SHADOW)
    gl_FragColor = vec4(0.0, 0.0, 0.0, exp(-r * r * 4.5) * (1.0 - smoothstep(0.9, 1.0, r)) * uIntensity);
    #elif defined(RIPPLE)
    // The swell's slope across the ring, turned toward or away from the light
    // above the table's top left: the cards' own light.
    float d = (r - 0.8) / 0.08;
    vec2 outward = r > 0.0 ? (vUv * 2.0 - 1.0) / r : vec2(0.0);
    float lit = 1.7 * d * exp(-d * d) * (0.3 + 0.7 * dot(outward, normalize(vec2(-0.55, 0.83))));
    float a = clamp(abs(lit), 0.0, 1.0) * (1.0 - smoothstep(0.95, 1.0, r)) * uIntensity;
    gl_FragColor = vec4(lit > 0.0 ? uColor : vec3(0.0), a);
    #else
    float a = (exp(-r * r * 6.0) + 0.6 * exp(-r * 14.0)) * (1.0 - smoothstep(0.8, 1.0, r));
    gl_FragColor = vec4(uColor * a * uIntensity, 0.0);
    #endif
  }`;function P(s,t,e,a){const o=new F(s,new D({vertexShader:ls,fragmentShader:us,defines:t==="GLOW"?{}:{[t]:""},uniforms:{uColor:{value:new V(...e)},uIntensity:{value:0}},...t==="SHADOW"||t==="RIPPLE"?mt:rt}));return o.renderOrder=a,o.frustumCulled=!1,o.visible=!1,o}function U(s,t,e,a,o,c){s.visible=c>.002,s.visible&&(s.position.set(t,e,a),s.scale.setScalar(o),s.material.uniforms.uIntensity.value=c)}class pt{constructor(t,e,a,o){this.host=t,this.timing=a,this.group.name=e,this.startMs=a.startMs,this.frame=o({group:this.group,unit:this.unit,clock:this.clock}),t.scene.add(this.group)}group=new Ft;unit=new et(1,1);clock={value:0};frame;startMs;landed=!1;update(t){this.startMs??=t;const e=(t-this.startMs)/1e3/this.timing.pace;return this.clock.value=e,this.frame(e),this.timing.impact&&e>=this.timing.impact.atS&&this.land(),e<this.timing.endS}land(){this.landed||!this.timing.impact||(this.landed=!0,this.timing.impact.land())}dispose(){this.land(),this.host.scene.remove(this.group),this.group.traverse(t=>{t instanceof F&&(t.geometry!==this.unit&&t.geometry.dispose(),t.material.dispose())}),this.unit.dispose()}}const zt=[.5,.74,.88],qt=[.8,.88,.93],ae=(s,t,e,a)=>(1-a)*(1-a)*s+2*(1-a)*a*t+a*a*e;function Xt({S:s,C:t,T:e},a){return[ae(s[0],t[0],e[0],a),ae(s[1],t[1],e[1],a)]}function be(s){let t=0,e=s.S;for(let a=1;a<=16;a++){const o=Xt(s,a/16);t+=Math.hypot(o[0]-e[0],o[1]-e[1]),e=o}return t}const ut=48;function _t(s,t){const e=[],a=[],o=[],c=Array.from({length:ut+1},(i,l)=>Xt(s,l/ut)),r=c.map((i,l)=>{const u=c[Math.max(l-1,0)],f=c[Math.min(l+1,ut)],h=Math.hypot(f[0]-u[0],f[1]-u[1])||1,m=-(f[1]-u[1])/h,v=(f[0]-u[0])/h;return{l:[i[0]+m*t,i[1]+v*t],r:[i[0]-m*t,i[1]-v*t]}});for(let i=0;i<ut;i++){const l=i/ut,u=(i+1)/ut,f=r[i],h=r[i+1],m=[[f.l,1,l],[f.r,-1,l],[h.l,1,u],[f.r,-1,l],[h.r,-1,u],[h.l,1,u]];for(const[v,w,g]of m)e.push(v[0],v[1],12),a.push(w),o.push(g)}const n=new ct;return n.setAttribute("position",new N(e,3)),n.setAttribute("aAcross",new N(a,1)),n.setAttribute("aAlong",new N(o,1)),n}function Ce(s,t,e,a,o,c){const r=()=>{const n=d(0,Math.PI*2);if(!e)return[Math.cos(n),Math.sin(n)];const i=-e[0]*.4+Math.cos(n),l=-e[1]*.4+Math.sin(n),u=Math.hypot(i,l)||1;return[i/u,l/u]};for(let n=0;n<z(70*a,o);n++){const[i,l]=r(),u=d(120,560)*a;c.drops.push({pos:[s[0],s[1],6],vel:[i*u,l*u,d(80,360)],spawn:t+d(0,.06),life:d(.4,.8),drag:d(3,5),s0:d(2.5,5)*a,s1:d(3,6)*a})}for(let n=0;n<z(22,o);n++){const[i,l]=r(),u=d(60,200)*a;c.mist.push({pos:[s[0],s[1],8],vel:[i*u,l*u,d(10,50)],spawn:t+d(0,.08),life:d(.6,1.1),drag:3,s0:d(14,22)*a,s1:d(50,90)*a})}}const Re=220,ke=.45,ds={tsunami:"WAVE",light:"LIGHT",smoke:"SMOKE"},hs=`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fs=`
  uniform float uFront, uLength, uTrail, uTime, uGain; uniform vec3 uTint;
  varying vec2 vUv;
  ${st}
  void main() {
    float along = vUv.x * uLength;
    float across = vUv.y * 2.0 - 1.0;
    float sides = 1.0 - smoothstep(0.7, 1.0, abs(across));
    // Behind the front d < 0; its edge churns across its width.
    float d = along - uFront - (vnoise(vec2(across * 5.0, uTime * 1.6)) - 0.5) * 36.0;
    #ifdef WAVE
    // A wall of water: white foam on its crest, clear water behind it that
    // darkens and thins toward its trailing edge, streaked by its flow.
    if (d > 10.0) discard;
    float foam = exp(-pow(d / 16.0, 2.0)) * (0.55 + 0.6 * vnoise(vec2(along * 0.06 - uTime * 3.0, across * 9.0)));
    float body = smoothstep(-uTrail, -uTrail * 0.25, d) * step(d, 0.0);
    float flow = smoothstep(0.55, 0.85, fbm(vec2(along * 0.03 + uTime * 2.4, across * 4.0)));
    vec3 col = mix(uTint * 0.55, uTint, body);
    col = mix(col, vec3(1.0), clamp(foam + flow * 0.35 * body, 0.0, 1.0));
    gl_FragColor = vec4(col, clamp(body * 0.5 + foam * 0.9 + flow * 0.2 * body, 0.0, 1.0) * sides * uGain);
    #endif
    #ifdef LIGHT
    // A wall of light: brightest on its edge, a softer glow left behind it
    // and a little thrown ahead.
    float wall = exp(-pow(d / 34.0, 2.0));
    float wake = d < 0.0 ? exp(d / 140.0) * 0.35 : exp(-d / 26.0) * 0.4;
    float shimmer = 0.75 + 0.45 * fbm(vec2(along * 0.02 - uTime * 1.5, across * 3.0));
    gl_FragColor = vec4(uTint * (wall + wake) * shimmer * sides * uGain, 0.0);
    #endif
    #ifdef SMOKE
    // Rolling smoke: a billowing leading edge, thick behind it, thinning out
    // toward its tail.
    float n = fbm(vec2(along * 0.012 - uTime * 0.5, across * 2.2 + uTime * 0.3));
    float edge = 1.0 - smoothstep(-50.0, 26.0, d + (n - 0.5) * 90.0);
    float tail = smoothstep(-uTrail * 1.2, -uTrail * 0.3, d);
    float density = edge * tail * (0.45 + 0.75 * n);
    // Its billows catch a little light, so it reads even over a dark board.
    vec3 col = mix(uTint, vec3(0.3, 0.25, 0.34), smoothstep(0.45, 0.9, n) * (1.0 - tail * 0.4));
    gl_FragColor = vec4(col, clamp(density, 0.0, 1.0) * 0.85 * sides * uGain);
    #endif
  }`,vs={tsunami:new V(...zt),light:new V(1,.95,.82),smoke:new V(.05,.03,.07)};function Te(s,t,e){return new D({vertexShader:hs,fragmentShader:fs,...s==="light"?rt:mt,defines:{[ds[s]]:""},uniforms:{uFront:{value:0},uLength:{value:e},uTrail:{value:Re},uTime:t,uGain:{value:0},uTint:{value:vs[s]}}})}const ms=s=>s*s*(3-2*s),Ct=([s,t])=>[s,-t];function ps({group:s,unit:t,clock:e},{path:a,look:o,tier:c}){const r=Ct(a.from),n=Ct(a.to),i=Math.hypot(n[0]-r[0],n[1]-r[1]),l=[(n[0]-r[0])/i,(n[1]-r[1])/i],u=Re*1.3,f=i+u+Jt,h=new F(t,Te(o,e,f)),m=(i+Jt-u)/2;h.position.set(r[0]+l[0]*m,r[1]+l[1]*m,4),h.rotation.z=Math.atan2(l[1],l[0]),h.scale.set(f,a.halfWidth*2,1),h.renderOrder=4,s.add(h);const v=lt[c];switch(o){case"tsunami":{const g={drops:[],mist:[]};for(const p of a.hits)Ce(Ct(p.at),p.atS,l,.8,v/2,g);s.add(O(g.mist,"SMOKE",e,{accZ:20,gain:.18,tint:qt,order:3}),O(g.drops,"DROP",e,{accZ:-900,gain:1,tint:zt,order:6}));break}case"smoke":{const g=a.hits.flatMap(p=>Array.from({length:z(10,v)},()=>{const[x,y]=Ct(p.at);return{pos:[x+d(-30,30),y+d(-40,40),4],vel:[l[0]*d(20,80),l[1]*d(20,80),d(20,60)],spawn:p.atS+d(0,.12),life:d(.7,1.2),drag:2,s0:d(30,50),s1:d(90,140)}}));s.add(O(g,"SMOKE",e,{accZ:30,gain:.55,tint:[.04,.025,.06],order:3}));break}}const w=h.material.uniforms;return g=>{w.uFront.value=u+K(g/Bt)*i,w.uGain.value=K(g/.08)*(1-ms(K((g-Bt)/ke)))}}function gs(s,t){const e={endS:Bt+ke+.9,pace:t.pace,impact:null,startMs:t.startMs};return new pt(s,"board-sweep",e,a=>ps(a,t))}const ws={warmUp(){const s={value:0},t=new et(1,1),e=[{pos:[0,0,0],vel:[0,0,0],spawn:-2,life:1,drag:1,s0:0}],a=[...["tsunami","light","smoke"].map(o=>new F(t,Te(o,s,1))),O(e,"SMOKE",s,{accZ:0,gain:0,order:3}),O(e,"DROP",s,{accZ:0,gain:0,order:6})];return a.forEach((o,c)=>{o.name=`board-sweep-warmup-${c}`}),a}},Kt=.9,xs=1,se=`
  ${st}
  ${Mt}
  uniform float uFront, uCurl, uChar;
  varying vec2 vCard, vUv;
  void main() {
    vUv = uv;
    vCard = vec2(uv.x * uSize.x, (1.0 - uv.y) * uSize.y);
    vec3 p = position;
    float d = burnKey(vCard) - uFront;
    p.z += uCurl * (d >= 0.0 ? 1.0 - smoothstep(0.0, 0.16, d) : 1.0 - 0.5 * smoothstep(0.0, uChar, -d));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }`,Ms=`
  uniform sampler2D uMap; uniform float uRadius, uFront, uScorch, uChar;
  varying vec2 vCard, vUv; 
  ${st}
  ${Mt}
  ${It}
  ${vt}
  void main() {
    float corner = cornerMask(vCard, uSize, uRadius);
    if (corner <= 0.0) discard;
    float d = burnKey(vCard) - uFront;
    // Charred paper holds together for a while behind the front, then crumbles unevenly.
    float crumble = -uChar + (vnoise(vCard * 0.22 + 11.0) - 0.5) * 0.1;
    if (d < crumble) discard;
    vec3 col = texture2D(uMap, vUv).rgb;
    // Scorch where the fire hit: browned halo, charred core.
    float halo = 1.0 - smoothstep(0.0, 1.0, distance(vCard, uKeyImpact) / (uScorchR * 1.7));
    col = mix(col, col * vec3(0.62, 0.42, 0.26), halo * uScorch * 0.6);
    col = mix(col, vec3(0.012, 0.008, 0.006), scorchMask(vCard) * uScorch * 0.88);
    // Burn front: the paper browns, chars, then glows at the edge before it goes.
    col = mix(col, col * vec3(0.5, 0.33, 0.2), (1.0 - smoothstep(0.05, 0.22, d)) * 0.85);
    vec3 charCol = vec3(0.018, 0.013, 0.01) * (0.6 + 0.8 * vnoise(vCard * 0.35));
    col = mix(col, charCol, 1.0 - smoothstep(-0.01, 0.06, d));
    // Grey ash right before it falls apart.
    col = mix(col, vec3(0.1, 0.095, 0.09), (1.0 - smoothstep(crumble, crumble + 0.06, d)));
    col = mix(col, vec3(1.0, 0.25, 0.03), exp(-abs(d) * 90.0));
    gl_FragColor = vec4(col, corner);
    #include <colorspace_fragment>
  }`,ys=`
  varying vec2 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xy;
    gl_Position = projectionMatrix * viewMatrix * w;
  }`,As=`
  uniform vec2 uCenter; uniform float uAngle, uFront, uBand, uFlameH, uGain, uTime;
  varying vec2 vWorld;
  ${st}
  ${Mt}
  // World (y-up) to card pixels (y-down), undoing the CSS rotate() of a tapped card.
  vec2 toCard(vec2 w) {
    vec2 s = vec2(w.x - uCenter.x, uCenter.y - w.y);
    float c = cos(uAngle), sn = sin(uAngle);
    return vec2(c * s.x + sn * s.y, -sn * s.x + c * s.y) + uSize * 0.5;
  }
  float fuel(vec2 w) {
    vec2 c = toCard(w);
    if (c.x < 0.0 || c.y < 0.0 || c.x > uSize.x || c.y > uSize.y) return 0.0;
    float d = burnKey(c) - uFront;
    return (1.0 - smoothstep(0.0, 0.03, d)) * smoothstep(-uBand, -uBand * 0.35, d);
  }
  vec3 blackbody(float f) {
    vec3 c = mix(vec3(0.0), vec3(0.5, 0.05, 0.0), smoothstep(0.0, 0.25, f));
    c = mix(c, vec3(1.0, 0.34, 0.03), smoothstep(0.2, 0.5, f));
    c = mix(c, vec3(1.0, 0.7, 0.24), smoothstep(0.5, 0.8, f));
    return mix(c, vec3(1.0, 0.93, 0.76), smoothstep(0.82, 1.0, f));
  }
  void main() {
    const int N = 28;
    float dh = uFlameH / float(N);
    float acc = 0.0;
    for (int i = 0; i < N; i++) {
      float hgt = float(i) * dh;
      float k = hgt / uFlameH;
      // Flames lean and wave more the higher they reach.
      float sway = (vnoise(vec2(vWorld.x * 0.012 + hgt * 0.008, uTime * 1.4)) - 0.5) * hgt * 0.7;
      acc = max(acc, fuel(vWorld - vec2(sway, hgt)) * pow(1.0 - k, 1.3));
    }
    if (acc <= 0.001) discard;
    vec2 q = vWorld * vec2(0.06, 0.032) - vec2(0.0, uTime * 2.6);
    q += (vec2(fbm(q + vec2(0.0, uTime * 0.9)), fbm(q * 1.3 + 5.2)) - 0.5) * 1.7;
    float n = fbm(q * 1.4);
    float f = clamp(acc * (0.25 + 1.1 * n) - 0.18, 0.0, 1.0);
    // Light scales with density too, so thin flame stays see-through instead of a solid sheet.
    gl_FragColor = vec4(blackbody(f) * (0.25 + 0.75 * f) * uGain, 0.0);
  }`,Ss=`
  uniform float uRadius, uFront, uScorchGlow, uGain, uTime, uChar;
  varying vec2 vCard;
  ${st}
  ${Mt}
  ${It}
  ${vt}
  ${Lt}
  void main() {
    float corner = cornerMask(vCard, uSize, uRadius);
    if (corner <= 0.0) discard;
    float d = burnKey(vCard) - uFront;
    float band = exp(-abs(d) * 70.0);
    float flick = 0.7 + 0.6 * vnoise(vCard * 0.12 + vec2(uTime * 7.0, -uTime * 5.0));
    // Ember veins glow through the char and cool as it ages.
    float vein = (1.0 - smoothstep(0.0, 0.05, abs(fbm(vCard * 0.1 + 3.0) - 0.5))) * step(d, 0.0) * smoothstep(-uChar, 0.0, d);
    band += vein * 0.7;
    float m = scorchMask(vCard);
    vec3 e = ramp(0.8) * band * flick + ramp(0.65) * (m * (1.0 - m) * 4.0 + m * 0.35) * uScorchGlow * flick;
    gl_FragColor = vec4(e * uGain * corner, 0.0);
  }`;function _e({pose:s,surface:t,radius:e,impact:a,amount:o,tier:c}){const{w:r,h:n}=s,i=q.degToRad(s.angleDeg),l=a.u*r,u=a.v*n,f=.8+Math.min(o,8)*.07,h={value:0},m={uSize:{value:new W(r,n)},uKeyImpact:{value:new W(l,u)},uKeyMax:{value:Math.hypot(Math.max(l,r-l),Math.max(u,n-u))},uKeyMode:{value:0},uBurnStart:{value:0},uBurnS:{value:Kt}},v={...m,uImpact:m.uKeyImpact,uMap:{value:t},uRadius:{value:e},uTime:h,uFront:{value:-.08},uCurl:{value:10},uChar:{value:.24},uScorch:{value:1},uScorchR:{value:Math.min(r,n)*.3*Math.min(f,1.3)},uScorchGlow:{value:.2},uGain:{value:1.195},uPalette:{value:0}},w=new Ft;w.name="card-burn",w.position.set(s.x,-s.y,0),w.rotation.z=-i;const g=new et(r,n,32,44),p=new F(g,new D({vertexShader:se,fragmentShader:Ms,uniforms:v,...mt})),x=new F(g,new D({vertexShader:se,fragmentShader:Ss,uniforms:v,...rt}));p.renderOrder=1,x.renderOrder=2,w.add(p,x);const y=n*.45,k=Math.abs(r*Math.cos(i))+Math.abs(n*Math.sin(i))+32,S=Math.abs(r*Math.sin(i))+Math.abs(n*Math.cos(i))+32+y,b=new F(new et(k,S),new D({vertexShader:ys,fragmentShader:As,...rt,uniforms:{...m,uFront:v.uFront,uTime:h,uCenter:{value:new W(s.x,-s.y)},uAngle:{value:i},uBand:{value:.16},uFlameH:{value:y},uGain:{value:1.14}}}));b.name="card-burn-flame",b.position.set(s.x,-s.y+y/2,4),b.renderOrder=5;const T=[],_=[],A=new W(-Math.sin(i),Math.cos(i));for(let C=0;C<z(90,lt[c]);C++){const R=d(0,r),I=d(0,n),B=R-l,$=I-u,X=Math.hypot(B,$)||1,j=d(15,60);T.push({pos:[R,-I,2],vel:[B/X*j+d(-30,30),-$/X*j+d(-30,30),d(40,170)],spawn:d(0,.05),life:d(.4,1.1),drag:1.6,s0:d(1.6,3.4),s1:d(.8,1.8),heat:d(.8,1)}),C%2===0&&_.push({pos:[R,-I,4],vel:[A.x*d(20,50)+d(-15,15),A.y*d(20,50)+d(-15,15),d(20,60)],spawn:d(.1,.35),life:d(.9,1.5),drag:1.5,s0:d(14,22),s1:d(55,90)})}const M=[O(_,"SMOKE",h,{accZ:30,gain:.34,order:3,key:m}),O(T,"EMBER",h,{accZ:140,gain:1.31,cool:1.3,order:5,key:m})];for(const C of M)C.position.set(-r/2,n/2,0),w.add(C);for(const C of[p,x,b,...M])C.frustumCulled=!1;return{group:w,fire:b,clock:h,uniforms:v}}const bs={warmUp(s){const{group:t,fire:e}=_e({pose:{x:2,y:2,w:4,h:4,angleDeg:0},surface:s.placeholderTexture,radius:0,impact:{u:.5,v:.5},amount:3,tier:"reduced"});return[t,e]}};class Cs{constructor(t,e){this.host=t,this.params=e,this.parts=_e(e),this.startMs=e.startMs,t.scene.add(this.parts.group,this.parts.fire)}parts;startMs;update(t){this.startMs??=t;const e=Math.max(0,(t-this.startMs)/1e3/this.params.pace);return this.parts.clock.value=e,this.parts.uniforms.uFront.value=-.08+e/Kt*xe,this.parts.uniforms.uScorchGlow.value=.2*Math.exp(-e/.2),e<Kt+xs}dispose(t){const{group:e,fire:a}=this.parts;this.host.scene.remove(e,a);const o=new Set;e.traverse(c=>{c instanceof F&&(o.add(c.geometry),c.material.dispose())});for(const c of o)c.dispose();a.geometry.dispose(),a.material.dispose(),this.params.surface.dispose(),t||this.params.onDone()}}function Rs(s,t){return new Cs(s,t)}const dt=.46,ks=.7,oe=.08,Ee=.76,Ts=.05,re={full:38,reduced:26},Et=320,_s=2600,Es=.55,Fs=.045,Os=1.6,Ps=new W(.32,-.42),Is=.3,ne=.01;function Ls(s,t,e,a,o){const c=[];for(let r=0;r<s.length;r++){const n=s[r],i=s[(r+1)%s.length],l=(n[0]-t)*a+(n[1]-e)*o,u=(i[0]-t)*a+(i[1]-e)*o;if(l<=0&&c.push(n),l<=0!=u<=0){const f=l/(l-u);c.push([n[0]+(i[0]-n[0])*f,n[1]+(i[1]-n[1])*f])}}return c}function zs(s,t,e,a,o){const c=[],r=(l,u)=>l>.5&&l<s-.5&&u>.5&&u<t-.5,n=Math.min(s,t);let i=Math.round(o*.7);for(const[l,u]of[[.07,6],[.24,7],[.46,8]]){const f=Math.random()*Math.PI*2;for(let h=0;h<u&&i>0;h++){const m=f+(h+(Math.random()-.5)*.5)*(Math.PI*2/u),v=n*l*(.85+Math.random()*.3),w=e+Math.cos(m)*v,g=a+Math.sin(m)*v;r(w,g)&&(c.push([w,g]),i--)}}for(;c.length<o;)c.push([Math.random()*s,Math.random()*t]);return c}function Ds(s,t,e){const a=[];return e.forEach(([o,c],r)=>{let n=[[0,0],[s,0],[s,t],[0,t]];e.forEach(([i,l],u)=>{r!==u&&n.length&&(n=Ls(n,(o+i)/2,(c+l)/2,i-o,l-c))}),n.length>=3&&a.push(n)}),a}function Fe(s,t,e,a){const o=(c,r)=>Math.abs(s[c]-r)<ne&&Math.abs(t[c]-r)<ne;return o(0,0)||o(0,e)||o(1,0)||o(1,a)}function Gs(s,t,e){let a=0;for(let o=0;o<s.length;o++){const c=s[o],r=s[(o+1)%s.length],n=(r[0]-c[0])*(e-c[1])-(r[1]-c[1])*(t-c[0]);if(n!==0){if(a===0)a=Math.sign(n);else if(Math.sign(n)!==a)return!1}}return!0}function Oe(s,t,e,a){const o=t[0]-s[0],c=t[1]-s[1],r=(s[0]+t[0])/2-e,n=(s[1]+t[1])/2-a;return Math.abs(o*r+c*n)/(Math.hypot(o,c)*Math.hypot(r,n)||1)}const Vt=s=>`${Math.round(s[0]*20)},${Math.round(s[1]*20)}`;function Us(s,t){const e=a=>Math.round(a*20);return e(s[0])<e(t[0])||e(s[0])===e(t[0])&&e(s[1])<e(t[1])?1:-1}function Ws(s,t){const e=[Vt(s),Vt(t)].sort().join("|");let a=2166136261;for(let o=0;o<e.length;o++)a=Math.imul(a^e.charCodeAt(o),16777619);return(a>>>0)/4294967296}function Bs(s,t,e,a,o){const c=new Map,r=u=>{const f=Vt(u);let h=c.get(f);return h||(h={p:u,adj:[],dist:1/0,done:!1},c.set(f,h)),h};for(const u of s)u.forEach((f,h)=>{const m=u[(h+1)%u.length],v=r(f),w=r(m);if(Fe(f,m,t,e)||v===w)return;const g=Math.hypot(m[0]-f[0],m[1]-f[1])*(1+Math.random()*.35)*(1+1.6*(1-Oe(f,m,a,o)));v.adj.push([w,g]),w.adj.push([v,g])});const n=s.find(u=>Gs(u,a,o))??s[0];for(const u of n){const f=r(u);f.dist=Math.min(f.dist,Math.hypot(u[0]-a,u[1]-o))}const i=[...c.values()];for(;;){let u=null;for(const f of i)!f.done&&f.dist<1/0&&(!u||f.dist<u.dist)&&(u=f);if(!u)break;u.done=!0;for(const[f,h]of u.adj)f.dist=Math.min(f.dist,u.dist+h)}let l=0;for(const u of i)u.dist===1/0&&(u.dist=Math.hypot(u.p[0]-a,u.p[1]-o)*1.3),l=Math.max(l,u.dist);return u=>r(u).dist/(l||1)}const ie={position:3,normal:3,aCard:2,aFace:1,aEdge:1,aArrive:1,aShardArrive:1,aSide:1,aRadial:1,aCenter:2,aVel:3,aAxis:3,aSpin:1,aDelay:1};function Pe(s,t,e,a,o){const c=Ds(s,t,zs(s,t,e,a,o)),r=Bs(c,s,t,e,a),n=Object.fromEntries(Object.keys(ie).map(h=>[h,[]])),i=[],l=Math.hypot(Math.max(e,s-e),Math.max(a,t-a)),u=new V;for(const h of c){const m=h.reduce((M,C)=>M+C[0],0)/h.length,v=h.reduce((M,C)=>M+C[1],0)/h.length,w=m-e,g=v-a,p=Math.hypot(w,g)||1,x=1-p/l,y=Math.min(...h.map(r)),k=Et*(.22+x*.45)*(.7+Math.random()*.6),S=[w/p*k,-(g/p)*k,Et*(1.5+x*.9)*(.75+Math.random()*.5)];u.set(Math.random()-.5,Math.random()-.5,(Math.random()<.5?-1:1)*(.5+Math.random()*.8)).normalize();const b=(2+Math.random()*5)*(Math.random()<.5?-1:1)*(.6+x*.6);let T=1,_=1;const A=(M,C,R,I,B,$,X)=>{n.position.push(M-m,-(C-v),R),n.normal.push(...I),n.aCard.push(M,C),n.aFace.push(B),n.aEdge.push($),n.aArrive.push(X),n.aShardArrive.push(y),n.aSide.push(T),n.aRadial.push(_),n.aCenter.push(m,v),n.aVel.push(...S),n.aAxis.push(u.x,u.y,u.z),n.aSpin.push(b),n.aDelay.push(y*.05)};h.forEach((M,C)=>{const R=h[(C+1)%h.length],I=R[0]-M[0],B=R[1]-M[1],$=Fe(M,R,s,t),X=$?1e4:Math.abs((m-M[0])*B-(v-M[1])*I)/(Math.hypot(I,B)||1);T=Us(M,R),_=Oe(M,R,e,a);const j=Math.hypot((M[0]+R[0])/2-e,(M[1]+R[1])/2-a)/l,tt=Ws(M,R)<Math.min(Math.max(1.2-j*1.5+_*.45,.08),1),E=tt?r(M):2,L=tt?r(R):2,Z=Math.max(E,L),G=Os/2;A(m,v,G,[0,0,1],0,X,Z),A(R[0],R[1],G,[0,0,1],0,0,L),A(M[0],M[1],G,[0,0,1],0,0,E),A(m,v,-G,[0,0,-1],1,X,Z),A(M[0],M[1],-G,[0,0,-1],1,0,E),A(R[0],R[1],-G,[0,0,-1],1,0,L);const at=Math.hypot(I,B)||1,Y=[B/at,I/at,0];A(M[0],M[1],G,Y,2,0,0),A(R[0],R[1],G,Y,2,0,0),A(R[0],R[1],-G,Y,2,0,0),A(M[0],M[1],G,Y,2,0,0),A(R[0],R[1],-G,Y,2,0,0),A(M[0],M[1],-G,Y,2,0,0),$||i.push([M[0],M[1],R[0],R[1],Math.min(r(M),r(R))])})}const f=new ct;for(const[h,m]of Object.entries(ie))f.setAttribute(h,new N(n[h],m));return{geometry:f,edges:i}}const Ie=`
  attribute vec2 aCard; attribute float aFace; attribute float aEdge; attribute float aArrive; attribute float aShardArrive;
  attribute float aSide; attribute float aRadial; attribute vec2 aCenter; attribute vec3 aVel; attribute vec3 aAxis; attribute float aSpin; attribute float aDelay;
  uniform float uTime, uFall, uGravity, uProg, uTilt;
  uniform vec2 uImpact;
  vec3 rot(vec3 v, vec3 k, float a) { float c = cos(a), s = sin(a); return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c); }
  vec3 shardWorld(out vec3 nW, out float life) {
    vec2 d2 = aCenter - uImpact;
    float dl = length(d2);
    vec2 dir = dl > 0.001 ? d2 / dl : vec2(1.0, 0.0);
    vec3 dirW = vec3(dir.x, -dir.y, 0.0);
    // While the crack reaches it, each shard lifts its outer edge a little so light picks out the break.
    float reached = smoothstep(aShardArrive, aShardArrive + 0.12, uProg);
    vec3 tiltAxis = vec3(dirW.y, -dirW.x, 0.0);
    float tilt = uTilt * reached;
    float t = max(uTime - aDelay, 0.0);
    life = clamp(t / uFall, 0.0, 1.0);
    float g = uGravity, z, spinA;
    vec2 xy;
    // Top-down: burst toward the viewer, land on the board, one small hop, slide to rest.
    float vz = aVel.z, tl = 2.0 * vz / g;
    if (t < tl) { z = vz * t - 0.5 * g * t * t; xy = aVel.xy * t; spinA = aSpin * t; }
    else {
      float tau = t - tl, vz1 = vz * 0.22, tl1 = 2.0 * vz1 / g;
      z = tau < tl1 ? vz1 * tau - 0.5 * g * tau * tau : 0.0;
      float slide = (1.0 - exp(-5.0 * tau)) / 5.0;
      xy = aVel.xy * (tl + 0.45 * slide);
      spinA = aSpin * (tl + 0.35 * slide);
    }
    float shrink = 1.0 - 0.25 * smoothstep(0.7, 1.0, life);
    vec3 p = rot(rot(position, tiltAxis, tilt), aAxis, spinA) * shrink;
    vec3 n = rot(rot(normal, tiltAxis, tilt), aAxis, spinA);
    vec3 local = p + vec3(aCenter.x, -aCenter.y, 0.0) + vec3(0.0, 0.0, 1.5 * reached) + vec3(xy, z);
    vec4 w = modelMatrix * vec4(local, 1.0);
    nW = normalize(mat3(modelMatrix) * n);
    return w.xyz;
  }`,Hs=`
  ${Ie}
  varying vec2 vCard; varying float vFace, vEdge, vArrive, vShade, vSpec, vAlpha, vSide, vRadial;
  void main() {
    vec3 nW; float life;
    vSide = aSide; vRadial = aRadial;
    vec3 w = shardWorld(nW, life);
    vec3 L = normalize(vec3(-0.35, 0.55, 0.76));
    vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
    vec3 rest = vec3(0.0, 0.0, aFace > 0.5 && aFace < 1.5 ? -1.0 : 1.0);
    // Lit relative to rest, so the unbroken card matches the DOM exactly.
    vShade = 1.0 + 0.6 * (dot(nW, L) - dot(rest, L));
    vSpec = aFace < 0.5 ? max(pow(max(dot(nW, H), 0.0), 48.0) - pow(H.z, 48.0), 0.0) * 0.55 : 0.0;
    vAlpha = 1.0 - smoothstep(0.62, 1.0, life);
    vCard = aCard; vFace = aFace; vEdge = aEdge; vArrive = aArrive;
    gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
  }`,Ns=`
  uniform sampler2D uMap; uniform vec2 uSize, uImpact; uniform float uRadius, uProg, uRim, uDrain, uCrazeR;
  varying vec2 vCard; varying float vFace, vEdge, vArrive, vShade, vSpec, vAlpha, vSide, vRadial;
  ${vt}
  ${Pt}
  vec2 hash22(vec2 p) { float h = hash21(p); return vec2(h, hash21(p + h + 19.19)); }
  // Worley F2 - F1: small near cell borders, which draws a fine crack network.
  float cellEdge(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float d1 = 8.0, d2 = 8.0;
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 r = g + hash22(i + g) - f;
      float d = dot(r, r);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
    return sqrt(d2) - sqrt(d1);
  }
  void main() {
    float corner = cornerMask(vCard, uSize, uRadius);
    if (corner <= 0.0) discard;
    vec3 col;
    if (vFace < 0.5) {
      col = texture2D(uMap, vec2(vCard.x / uSize.x, 1.0 - vCard.y / uSize.y)).rgb;
      float grey = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(col, vec3(grey) * 0.9, uDrain);
      vec3 paper = vec3(0.62, 0.58, 0.52);
      // Crazing: a fine crack network around the hit, spreading quickly.
      float dImp = distance(vCard, uImpact);
      float crazeReach = 1.0 - smoothstep(uProg * uCrazeR * 1.6, uProg * uCrazeR * 1.6 + 3.0, dImp);
      float crazeMask = (1.0 - smoothstep(uCrazeR * 0.25, uCrazeR, dImp)) * crazeReach;
      float ce = cellEdge(vCard / 6.5) * 6.5 * 0.5;
      col = mix(col, vec3(0.004), (1.0 - smoothstep(0.1, 0.4, ce)) * crazeMask * 0.5);
      // Stress-whitened card stock right at the impact.
      float bruise = (1.0 - smoothstep(1.5, 7.0, dImp)) * step(0.001, uProg) * (0.4 + 0.6 * vnoise(vCard * 0.9));
      col = mix(col, paper, bruise * 0.55 * uRim);
      // Main cracks wander around the straight fracture edge; both neighbouring shards
      // read the same noise, so they agree on one centreline.
      float wob = (vnoise(vCard * 0.32) - 0.5) * 2.4 + (vnoise(vCard * 1.4 + 17.0) - 0.5) * 0.5;
      float s = abs(vSide * vEdge - wob);
      float on = step(vArrive, uProg);
      float width = mix(0.7, 0.28, clamp(vArrive, 0.0, 1.0)) * mix(0.55, 1.0, vRadial);
      float line = 1.0 - smoothstep(width * 0.35, width, s);
      // Paper shows in broken patches along the lip, not as a continuous outline.
      float chip = smoothstep(0.4, 0.75, vnoise(vCard * 0.25 + 5.0));
      float lip = (1.0 - smoothstep(width, width + 1.2, s)) * (1.0 - line) * chip;
      col = mix(col, paper, lip * on * uRim);
      col = mix(col, vec3(0.002), line * on * 0.92);
    } else if (vFace < 1.5) {
      col = vec3(0.075, 0.045, 0.024);
    } else {
      col = vec3(0.42, 0.39, 0.34);
    }
    col = col * clamp(vShade, 0.3, 1.5) + vSpec;
    gl_FragColor = vec4(col, vAlpha * corner);
    #include <colorspace_fragment>
  }`,Ks=`
  ${Ie}
  uniform vec2 uShadowDir;
  varying vec2 vCard; varying float vFace, vAlpha;
  void main() {
    vec3 nW; float life;
    vec3 w = shardWorld(nW, life);
    float height = max(w.z, 0.0);
    w.xy += uShadowDir * height;
    w.z = 0.0;
    // Higher shards cast fainter shadows; the resting card casts none of its own.
    vAlpha = smoothstep(1.0, 8.0, height) * (1.0 - smoothstep(60.0, 420.0, height)) * (1.0 - smoothstep(0.62, 1.0, life));
    vCard = aCard; vFace = aFace;
    gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
  }`,Vs=`
  uniform vec2 uSize; uniform float uRadius, uStrength;
  varying vec2 vCard; varying float vFace, vAlpha;
  ${vt}
  void main() {
    if (vFace > 0.5) discard;
    float corner = cornerMask(vCard, uSize, uRadius);
    if (corner <= 0.0) discard;
    gl_FragColor = vec4(0.0, 0.0, 0.0, vAlpha * corner * uStrength);
  }`,$s=`
  attribute vec3 aVel; attribute float aLife; attribute float aSize; attribute float aDelay;
  uniform float uTime, uGravity, uDpr;
  varying float vA;
  void main() {
    float t = max(uTime - aDelay, 0.0);
    float life = clamp(t / aLife, 0.0, 1.0);
    vec3 p = position + vec3(aVel.xy * t, 0.0);
    p.z += max(aVel.z * t - 0.5 * uGravity * t * t, 0.0);
    vA = step(0.0001, uTime - aDelay) * (1.0 - life);
    gl_PointSize = aSize * uDpr;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.0);
  }`,js=`
  varying float vA;
  void main() {
    vec2 q = abs(gl_PointCoord - 0.5);
    if (q.x + q.y > 0.6) discard;
    gl_FragColor = vec4(0.42, 0.39, 0.34, vA * 0.85);
    #include <colorspace_fragment>
  }`;function Le(s,t){const e=[],a=[],o=[],c=[],r=[];for(let i=0;i<t;i++){const[l,u,f,h,m]=s[Math.floor(Math.random()*s.length)],v=Math.random();e.push(l+(f-l)*v,-(u+(h-u)*v),1);const w=Math.random()*Math.PI*2,g=Et*(.3+Math.random()*.8);a.push(Math.cos(w)*g,Math.sin(w)*g,Et*(1+Math.random()*1.2)),o.push(.3+Math.random()*.4),c.push(1.2+Math.random()*1.6),r.push(m*.05)}const n=new ct;return n.setAttribute("position",new N(e,3)),n.setAttribute("aVel",new N(a,3)),n.setAttribute("aLife",new N(o,1)),n.setAttribute("aSize",new N(c,1)),n.setAttribute("aDelay",new N(r,1)),n}function Zs(s,t,e){return{uTime:{value:0},uFall:{value:Ee},uGravity:{value:_s},uProg:{value:0},uTilt:{value:Fs},uImpact:{value:e},uSize:{value:new W(s,t)}}}function ze(s,t,e,a,o){return new D({vertexShader:Hs,fragmentShader:Ns,transparent:!0,side:Zt,uniforms:{...Zs(t,e,o),uMap:{value:s},uRadius:{value:a},uRim:{value:Es},uDrain:{value:0},uCrazeR:{value:Math.min(t,e)*.22}}})}function De(s){return new D({vertexShader:Ks,fragmentShader:Vs,transparent:!0,depthWrite:!1,depthTest:!1,side:Zt,uniforms:{...s,uShadowDir:{value:Ps},uStrength:{value:Is}}})}function Ge(s,t){return new D({vertexShader:$s,fragmentShader:js,transparent:!0,depthWrite:!1,uniforms:{uTime:s.uTime,uGravity:s.uGravity,uDpr:{value:t}}})}const qs={warmUp(s){const{geometry:t,edges:e}=Pe(4,4,2,2,2),a=new F(t,ze(s.placeholderTexture,4,4,0,new W(2,2)));a.name="card-shatter-warmup";const o=new F(t,De(a.material.uniforms));o.name="card-shatter-shadow-warmup";const c=new ft(Le(e,1),Ge(a.material.uniforms,1));return c.name="card-shatter-flakes-warmup",[a,o,c]}};class Xs{constructor(t,e){this.host=t,this.params=e,this.startMs=e.startMs;const{pose:a,surface:o,radius:c,impact:r,tier:n,pixelRatio:i}=e,{w:l,h:u}=a,f=r.u*l,h=r.v*u,{geometry:m,edges:v}=Pe(l,u,f,h,re[n]),w=new W(f,h);if(this.shards=new F(m,ze(o,l,u,c,w)),this.shards.name="card-shatter-shards",this.shards.position.set(-l/2,u/2,0),this.shards.frustumCulled=!1,this.shards.renderOrder=1,this.group.add(this.shards),n==="full"){const g=new F(m,De(this.shards.material.uniforms));g.name="card-shatter-shadow",g.renderOrder=0;const p=new ft(Le(v,Math.round(re.full*1.6)),Ge(this.shards.material.uniforms,i));p.name="card-shatter-flakes",p.renderOrder=2;for(const x of v.length?[g,p]:[g])x.position.copy(this.shards.position),x.frustumCulled=!1,this.group.add(x),this.extras.push(x)}this.group.position.set(a.x,-a.y,0),this.group.rotation.z=-q.degToRad(a.angleDeg),this.group.name="card-shatter",t.scene.add(this.group)}group=new Ft;startMs;shards;extras=[];update(t){this.startMs??=t;const e=Math.max(0,(t-this.startMs)/1e3/this.params.pace),a=dt*ks,o=e<a?0:e<dt?(e-a)*oe:(dt-a)*oe+(e-dt),c=this.shards.material.uniforms;return c.uTime.value=o,c.uProg.value=Math.min(e/a,1)**.8,c.uDrain.value=.3*Math.min(e/dt,1),this.group.scale.setScalar(1-.018*Math.sin(Math.min(e/.09,1)*Math.PI)),e<dt+Ee+Ts}dispose(t){this.host.scene.remove(this.group),this.shards.geometry.dispose(),this.shards.material.dispose(),this.params.surface.dispose();for(const e of this.extras)e.geometry!==this.shards.geometry&&e.geometry.dispose(),e.material.dispose();t||this.params.onDone()}}function Ys(s,t){return new Xs(s,t)}const H=ga/1e3,Q=.14,ce=.035,Qs=[0,.075,.16],Js={fire:1.4,lightning:1.2,water:1.1},to=.22,eo=.8,J=.85,le=(s,t,e,a)=>(1-a)*(1-a)*s+2*(1-a)*a*t+a*a*e,Yt=`
  attribute float aAcross, aAlong; varying float vAcross, vAlong;
  void main() { vAcross = aAcross; vAlong = aAlong; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,ao=`
  uniform float uIntensity, uReveal; uniform vec3 uGlow;
  varying float vAcross, vAlong;
  void main() {
    if (vAlong > uReveal) discard;
    float v = abs(vAcross);
    float core = 1.0 - smoothstep(0.06, 0.16, v);
    float glow = exp(-v * 4.0) * (1.0 - smoothstep(0.7, 1.0, v));
    gl_FragColor = vec4((uGlow * glow + vec3(core)) * uIntensity, 0.0);
  }`;function ue(s,t,e,a){let o=[s,t],c=Math.hypot(t[0]-s[0],t[1]-s[1])*e;for(let r=0;r<a;r++){const n=[o[0]];for(let i=1;i<o.length;i++){const[l,u]=o[i-1],[f,h]=o[i],m=Math.hypot(f-l,h-u)||1,v=(Math.random()-.5)*c;n.push([(l+f)/2-(h-u)/m*v,(u+h)/2+(f-l)/m*v],o[i])}o=n,c*=.55}return o}function Ue(s,t){const e=ue(s,t,.22,6),a=[{pts:e,w:15,start:0,span:1,taper:!1}],o=Math.hypot(t[0]-s[0],t[1]-s[1]);for(let l=0,u=2+Math.floor(Math.random()*3);l<u;l++){const f=Math.floor(d(.15,.75)*(e.length-1)),h=e[f],m=e[f+1],v=Math.atan2(m[1]-h[1],m[0]-h[0])+(Math.random()<.5?-1:1)*d(.35,.9),w=o*d(.1,.28);a.push({pts:ue(h,[h[0]+Math.cos(v)*w,h[1]+Math.sin(v)*w],.3,4),w:8,start:f/(e.length-1),span:.15,taper:!0})}const c=[],r=[],n=[];for(const{pts:l,w:u,start:f,span:h,taper:m}of a){const v=[0];for(let p=1;p<l.length;p++)v.push(v[p-1]+Math.hypot(l[p][0]-l[p-1][0],l[p][1]-l[p-1][1]));const w=v[v.length-1]||1,g=l.map((p,x)=>{const y=l[Math.max(x-1,0)],k=l[Math.min(x+1,l.length-1)],S=k[0]-y[0],b=k[1]-y[1],T=Math.hypot(S,b)||1,_=v[x]/w,A=u*(m?1-_*.85:1-_*.25);return{l:[p[0]-b/T*A,p[1]+S/T*A],r:[p[0]+b/T*A,p[1]-S/T*A],s:f+_*h}});for(let p=0;p<l.length-1;p++){const x=g[p],y=g[p+1],k=[[x.l,1,x.s],[x.r,-1,x.s],[y.l,1,y.s],[x.r,-1,x.s],[y.r,-1,y.s],[y.l,1,y.s]];for(const[S,b,T]of k)c.push(S[0],S[1],0),r.push(b),n.push(T)}}const i=new ct;return i.setAttribute("position",new N(c,3)),i.setAttribute("aAcross",new N(r,1)),i.setAttribute("aAlong",new N(n,1)),i}function We(){return new D({vertexShader:Yt,fragmentShader:ao,...rt,uniforms:{uIntensity:{value:0},uReveal:{value:0},uGlow:{value:new V(.45,.55,1)}}})}const Be=`
  uniform vec2 uOccCenter, uOccHalf; uniform float uOccAngle, uOccRadius;
  varying vec2 vWorld;
  bool occluded() {
    if (uOccHalf.x <= 0.0) return false;
    vec2 d = vWorld - uOccCenter;
    float c = cos(uOccAngle), s = sin(uOccAngle);
    return roundedBox(vec2(c * d.x - s * d.y, s * d.x + c * d.y), uOccHalf, uOccRadius) < 0.0;
  }`,de=`
  uniform vec2 uSize, uPush; uniform float uTiltA, uSink; uniform vec3 uTiltAxis;
  varying vec2 vCard, vUv, vWorld; varying float vShade;
  vec3 rot(vec3 v, vec3 k, float a) { float c = cos(a), s = sin(a); return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c); }
  void main() {
    vUv = uv;
    vCard = vec2(uv.x * uSize.x, (1.0 - uv.y) * uSize.y);
    vec3 p = position;
    p.z -= uSink;
    p = rot(p, uTiltAxis, uTiltA);
    p.xy += uPush;
    vWorld = (modelMatrix * vec4(p, 1.0)).xy;
    // Lit relative to rest, so the untouched copy matches the DOM card exactly.
    vec3 L = normalize(vec3(-0.35, 0.55, 0.76));
    vShade = 1.0 + 0.6 * (dot(rot(vec3(0.0, 0.0, 1.0), uTiltAxis, uTiltA), L) - L.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }`,so=`
  uniform sampler2D uMap; uniform float uRadius, uScorch;
  varying vec2 vCard, vUv; varying float vShade;
  uniform vec2 uSize;
  ${st}
  ${It}
  ${vt}
  ${Be}
  void main() {
    float corner = cornerMask(vCard, uSize, uRadius);
    if (corner <= 0.0 || occluded()) discard;
    vec3 col = texture2D(uMap, vUv).rgb;
    #ifdef FROST
    vec2 d = vCard - uImpact;
    float a = atan(d.y, d.x);
    float veins = 1.0 - smoothstep(0.0, 0.09, abs(sin(a * 6.0 + length(d) * 0.035 + fbm(d * 0.07) * 0.6)));
    float frost = scorchMask(vCard) * uScorch;
    col = mix(col, vec3(0.58, 0.83, 0.94), frost * 0.45);
    col = mix(col, vec3(0.92, 0.98, 1.0), frost * veins * 0.85);
    #else
    float halo = 1.0 - smoothstep(0.0, 1.0, distance(vCard, uImpact) / (uScorchR * 1.7));
    col = mix(col, col * vec3(0.62, 0.42, 0.26), halo * uScorch * 0.6);
    col = mix(col, vec3(0.012, 0.008, 0.006), scorchMask(vCard) * uScorch * 0.88);
    #endif
    gl_FragColor = vec4(col * clamp(vShade, 0.3, 1.5), corner);
    #include <colorspace_fragment>
  }`,oo=`
  uniform float uRadius, uScorch, uScorchGlow, uGain, uTime;
  uniform vec2 uSize;
  varying vec2 vCard;
  ${st}
  ${It}
  ${vt}
  ${Be}
  ${Lt}
  void main() {
    float corner = cornerMask(vCard, uSize, uRadius);
    if (corner <= 0.0 || occluded()) discard;
    float m = scorchMask(vCard);
    #ifdef FROST
    float sheen = smoothstep(0.68, 0.9, vnoise(vCard * 0.12)) * m;
    gl_FragColor = vec4(vec3(0.42, 0.78, 1.0) * sheen * uScorch * 0.45 * corner, 0.0);
    #else
    float flick = 0.7 + 0.6 * vnoise(vCard * 0.12 + vec2(uTime * 7.0, -uTime * 5.0));
    vec3 e = ramp(0.65) * (m * (1.0 - m) * 4.0 + m * 0.35) * uScorchGlow * flick;
    gl_FragColor = vec4(e * uGain * corner, 0.0);
    #endif
  }`;function He(s,t,e,a,o,c,r,n){const i=n==="water",l=i?{FROST:""}:{},u={uMap:{value:s},uSize:{value:new W(t,e)},uRadius:{value:a},uImpact:{value:o},uScorchR:{value:Math.min(t,e)*(i?.42:.3)*Math.min(c,1.3)},uScorch:{value:0},uScorchGlow:{value:0},uGain:{value:.6+.7*J},uPalette:{value:0},uTime:r,uTiltA:{value:0},uTiltAxis:{value:new V(0,1,0)},uPush:{value:new W},uSink:{value:0},uOccCenter:{value:new W},uOccHalf:{value:new W},uOccAngle:{value:0},uOccRadius:{value:0}};return{uniforms:u,card:new D({vertexShader:de,fragmentShader:so,defines:l,uniforms:u,...mt}),glow:new D({vertexShader:de,fragmentShader:oo,defines:l,uniforms:u,...rt})}}function ht(s,t,e){const a=q.degToRad(s.angleDeg),o=(t-.5)*s.w,c=(e-.5)*s.h;return[s.x+o*Math.cos(a)-c*Math.sin(a),-(s.y+o*Math.sin(a)+c*Math.cos(a))]}class Ne{constructor(t,e,a){this.host=t,this.params=e,this.motion=a;const{pose:o,surface:c,radius:r}=e,{impact:n,dir:i,scale:l,mark:u}=a;this.startMs=a.startMs;const f=q.degToRad(o.angleDeg);this.local=[i[0]*Math.cos(f)-i[1]*Math.sin(f),i[0]*Math.sin(f)+i[1]*Math.cos(f)],this.materials=He(c,o.w,o.h,r,new W(n.u*o.w,n.v*o.h),l,this.clock,u),this.materials.uniforms.uTiltAxis.value.set(-this.local[1],this.local[0],0),this.geometry=new et(o.w,o.h);const h=new F(this.geometry,this.materials.card),m=new F(this.geometry,this.materials.glow);h.renderOrder=1,m.renderOrder=2,this.group.name="damage-hit",this.group.position.set(o.x,-o.y,0),this.group.rotation.z=-f,this.group.visible=!1,this.group.add(h,m),t.scene.add(this.group)}group=new Ft;geometry;materials;clock={value:0};local;startMs;atRest=!1;landed=!1;update(t){this.startMs??=t;const{amount:e,scale:a,pace:o,impactS:c,mark:r}=this.motion,n=(t-this.startMs)/1e3/o;this.clock.value=n;const i=n-c;if(this.group.visible=this.atRest||i>=0,this.group.visible&&this.occlude(this.materials.uniforms),i<0)return!0;this.landed||(this.landed=!0,this.motion.onImpact?.());const l=this.materials.uniforms;l.uTiltA.value=Math.min(.1+.03*e,.3)*Math.exp(-i*8)*Math.sin(i*22);const u=9*a*(1-Math.exp(-i*40))*Math.exp(-i*6);return l.uPush.value.set(this.local[0]*u,this.local[1]*u),l.uSink.value=8*a*(1-Math.exp(-i*50))*Math.exp(-i*9),r&&(l.uScorch.value=Math.min(i/.05,1)*(1-q.smoothstep(i,.25,.75)),l.uScorchGlow.value=Math.exp(-i/.2)*Math.min(i/.02,1)),i<eo}occlude(t){const e=this.motion.occluder?.(this.host.canvasOrigin())??null;if(!e){t.uOccHalf.value.set(0,0);return}const{pose:a,radius:o}=e;t.uOccCenter.value.set(a.x,-a.y),t.uOccHalf.value.set(a.w/2,a.h/2),t.uOccAngle.value=q.degToRad(a.angleDeg),t.uOccRadius.value=o}showAtRest(){this.atRest=!0,this.group.visible=!0}dispose(t){this.host.scene.remove(this.group),this.geometry.dispose(),this.materials.card.dispose(),this.materials.glow.dispose(),this.params.surface.dispose(),t||this.params.onDone()}}function Ke(s,t,e,a,o){const c=(r,n)=>{const i=d(0,Math.PI*2);return[Math.cos(i),Math.sin(i),d(r,n)*e]};for(let r=0;r<o.core;r++){const[n,i,l]=c(40,140);a.flames.push({pos:[s[0],s[1],8],vel:[n*l,i*l,d(20,80)],spawn:t+d(0,.02),life:d(.12,.2),drag:4,s0:d(28,40)*e,s1:d(60,95)*e,heat:1})}for(let r=0;r<o.fire;r++){const[n,i,l]=c(200,640);a.flames.push({pos:[s[0]+n*d(0,8),s[1]+i*d(0,8),8],vel:[n*l,i*l,d(60,320)],spawn:t+d(0,.04),life:d(.25,.55),drag:d(5,7),s0:d(9,16)*e,s1:d(26,54)*e,heat:d(.75,1)})}for(let r=0;r<o.smoke;r++){const[n,i,l]=c(70,220);a.smoke.push({pos:[s[0]+n*d(0,14),s[1]+i*d(0,14),10],vel:[n*l,i*l,d(20,80)],spawn:t+d(.05,.14),life:d(.7,1.2),drag:3,s0:d(20,30)*e,s1:d(70,110)*e})}for(let r=0;r<o.sparks;r++){const[n,i,l]=c(450,1100);a.sparks.push({pos:[s[0],s[1],6],vel:[n*l,i*l,d(120,420)],spawn:t+d(0,.03),life:d(.35,.7),drag:2.2,s0:d(1.4,2.4),heat:d(.85,1),stretch:.03})}}const ro=`
  uniform float uHead, uTail, uTime; varying float vAcross, vAlong;
  ${st}
  ${Lt}
  void main() {
    if (vAlong > uHead || vAlong < uTail) discard;
    float along = (vAlong - uTail) / max(uHead - uTail, 0.001);
    float churn = vnoise(vec2(vAlong * 80.0 - uTime * 18.0, vAcross * 3.0));
    float width = pow(along, 0.65) * (0.75 + 0.25 * churn);
    float edge = abs(vAcross) / max(width, 0.001);
    float body = 1.0 - smoothstep(0.35, 1.0, edge);
    float heat = mix(0.5, 1.0, along) * (1.0 - 0.35 * edge);
    gl_FragColor = vec4(ramp(heat) * body * smoothstep(0.0, 0.15, along), 0.0);
  }`;function Ve(s){return new D({vertexShader:Yt,fragmentShader:ro,...rt,uniforms:{uHead:{value:0},uTail:{value:0},uTime:s}})}function no({group:s,unit:t,clock:e,S:a,T:o,span:c,scale:r,share:n,boardLight:i}){const l=o[0]-a[0],u=o[1]-a[1],f=Math.hypot(l,u)||1,h=[l/f,u/f],m=l>=0?[-h[1],h[0]]:[h[1],-h[0]],v=f*.1,w=30+f*.07,g=[(a[0]+o[0])/2+m[0]*v,(a[1]+o[1])/2+m[1]*v],p=E=>K((E-Q)/(H-Q))**1.35,x=E=>14*(1-E)+Math.sin(Math.PI*E)*w,y=E=>{const L=p(E);return[le(a[0],g[0],o[0],L),le(a[1],g[1],o[1],L),x(L)]},k={S:a,C:g,T:o},S=Math.min(1,120*r/be(k)),b=_t(k,24*r),T=b.getAttribute("position"),_=b.getAttribute("aAlong");for(let E=0;E<T.count;E++)T.setZ(E,x(_.getX(E)));const A=new F(b,Ve(e));A.renderOrder=7,A.frustumCulled=!1,s.add(A);const M={flames:[],smoke:[],sparks:[]};for(let E=0;E<z(26,n);E++){const L=d(0,Math.PI*2),Z=d(0,10)*r;M.flames.push({pos:[a[0]+Math.cos(L)*Z,a[1]+Math.sin(L)*Z,10],vel:[-Math.cos(L)*Z*2,-Math.sin(L)*Z*2,d(10,40)],spawn:d(0,Q),life:d(.1,.2),drag:3,s0:d(4,8)*r,s1:d(10,18)*r,heat:d(.85,1)})}const C=z(200,n);for(let E=0;E<C;E++){const L=Q+(E+Math.random())/C*(H-Q),[Z,G,at]=y(L),Y=d(40,110);M.flames.push({pos:[Z+d(-3,3),G+d(-3,3),at],vel:[-h[0]*Y+d(-40,40),-h[1]*Y+d(-40,40),d(0,50)],spawn:L,life:d(.08,.18),drag:3.5,s0:d(11,16)*r,s1:d(16,24)*r,heat:d(.85,1)}),E%2===0&&E>C*.2&&M.smoke.push({pos:[Z,G,at],vel:[d(-25,25),d(-25,25),d(10,40)],spawn:L+.05,life:d(.5,.9),drag:2,s0:10*r,s1:d(30,46)*r})}Ke(o,H,r,M,{core:z(14,n),fire:z(90+30*r,n),smoke:z(30,n),sparks:z(50*r,n)}),s.add(O(M.smoke,"SMOKE",e,{accZ:40,gain:.34,order:3}),O(M.flames,"FLAME",e,{accZ:220,gain:.55+.75*J,cool:1.7,order:5}),O(M.sparks,"SPARK",e,{accZ:-1600,gain:.8+.5*J,order:6}));const R=P(t,"GLOW",[1,.86,.6],8),I=P(t,"GLOW",[1,.42,.1],8),B=P(t,"GLOW",[1,.72,.4],7),$=P(t,"RING",[1,.8,.58],6);s.add(R,I,B,$);const X=i?P(t,"GLOW",[1,.45,.12],4):null,j=i?P(t,"SHADOW",[0,0,0],0):null,tt=i?P(t,"GLOW",[1,.45,.14],4):null;for(const E of[X,j,tt])E&&s.add(E);return E=>{const L=K(E/Q),Z=E<H;A.material.uniforms.uHead.value=p(E),A.material.uniforms.uTail.value=Math.max(0,p(E)-S),A.visible=E>=Q&&Z;const[G,at,Y]=y(E);U(R,G,at,Y+1,42*r*(.35+.65*L),Z?1.1*L:0),U(I,G,at,Y,80*r*(.5+.5*L),Z?.35*J*L:0),X&&U(X,G,at,0,180*r,Z?.08*J*L:0),j&&U(j,G+.32*Y,at-.42*Y,0,30*r+Y*.25,Z?.28*L:0);const ot=E-H,ra=ot<0?0:ot<.03?ot/.03:Math.exp(-(ot-.03)/.09);U(B,o[0],o[1],24,320*r,ra*(.35+.9*J)),tt&&U(tt,o[0],o[1],0,760*r,ot>=0?.32*J*Math.exp(-ot/.35)*Math.min(ot/.03,1):0);const Dt=K(ot/.34);U($,o[0],o[1],2,(.5+2.6*(1-(1-Dt)**3))*c*r,ot>=0&&Dt<1?(1-Dt)**2*(.35+.65*J):0)}}function io({group:s,unit:t,clock:e,S:a,T:o,span:c,scale:r,share:n,boardLight:i}){const l=Qs.map(S=>H-ce+S),u=l[0],f=Math.hypot(o[0]-a[0],o[1]-a[1]),h={flames:[],smoke:[],sparks:[]};Ke(o,H,r*.8,h,{core:z(6,n),fire:z(30,n),smoke:z(12,n),sparks:z(70*r,n)}),s.add(O(h.smoke,"SMOKE",e,{accZ:40,gain:.3,order:3}),O(h.flames,"FLAME",e,{accZ:220,gain:.5+.6*J,cool:1.9,order:5}),O(h.sparks,"SPARK",e,{accZ:-1600,gain:.9+.5*J,palette:"lightning",order:6}));const m=We(),v=new F(new ct,m);v.position.z=10,v.renderOrder=7,v.frustumCulled=!1;const w=P(t,"GLOW",[.6,.72,1],8),g=P(t,"GLOW",[.75,.85,1],7),p=P(t,"RING",[.8,.9,1],6);s.add(v,w,g,p);const x=i?P(t,"GLOW",[.5,.6,1],4):null,y=i?P(t,"GLOW",[.45,.5,.9],4):null;for(const S of[x,y])S&&s.add(S);let k=-1;return S=>{const b=l.filter(C=>S>=C).length-1;b!==k&&(k=b,v.geometry.dispose(),v.geometry=Ue(a,o));const T=b<0?0:Math.exp(-(S-l[b])/.05);m.uniforms.uIntensity.value=T*(.75+.5*J)*d(.85,1.15),m.uniforms.uReveal.value=K((S-u)/ce),v.visible=T>.01,U(w,a[0],a[1],12,70*r,S<u?Math.random()*.9*(S/u):T*.8);const _=S-H,A=_<0?0:_<.02?_/.02:Math.exp(-(_-.02)/.08);U(g,o[0],o[1],24,300*r,Math.max(A,_>=0?T*.6:0)*(.35+.9*J)),x&&U(x,o[0],o[1],0,700*r,_>=0?.3*J*Math.exp(-_/.3):0),y&&U(y,(a[0]+o[0])/2,(a[1]+o[1])/2,0,f*1.6,.1*J*T);const M=K(_/.3);U(p,o[0],o[1],2,(.5+2.2*(1-(1-M)**3))*c*r,_>=0&&M<1?(1-M)**2*(.3+.6*J):0)}}const co=`
  uniform float uHead, uTail, uLength;
  varying float vAcross, vAlong;
  void main() {
    if (vAlong > uHead || vAlong < uTail) discard;
    float along = (vAlong - uTail) / max(uHead - uTail, 0.001);
    float width = min((1.0 - along) / 0.35, 1.0) * min(along / 0.6, 1.0);
    float across = abs(vAcross) / max(width, 0.001);
    if (across > 1.0) discard;
    vec3 col = mix(vec3(0.12, 0.4, 0.64), vec3(0.76, 0.94, 1.0), step(0.0, vAcross));
    float core = 1.0 - smoothstep(0.04, 0.15, across);
    col = mix(col, vec3(0.96, 1.0, 1.0), core);
    float vein = pow(max(0.0, sin(vAlong * uLength * 0.3 + abs(vAcross) * 12.0)), 16.0);
    col = mix(col, vec3(0.85, 0.97, 1.0), vein * 0.35);
    gl_FragColor = vec4(col, 0.95);
  }`;function $e(s){return new D({vertexShader:Yt,fragmentShader:co,...mt,uniforms:{uHead:{value:0},uTail:{value:0},uLength:{value:s}}})}function lo({group:s,unit:t,clock:e,S:a,T:o,span:c,scale:r,share:n}){const i=o[0]-a[0],l=o[1]-a[1],u=Math.hypot(i,l)||1,f=[i/u,l/u],h=i>=0?[-f[1],f[0]]:[f[1],-f[0]],m=u*.025,v={S:a,C:[(a[0]+o[0])/2+h[0]*m,(a[1]+o[1])/2+h[1]*m],T:o},w=A=>K((A-Q)/(H-Q))**1.15,g=A=>{const M=Math.max(0,w(A)-Math.min(1,110*r/u));return M+(1-M)*K((A-H)/to)},p=[],x=[];for(let A=0;A<z(18,n);A++){const M=d(0,Math.PI*2),C=d(14,30)*r;p.push({pos:[a[0]+Math.cos(M)*C,a[1]+Math.sin(M)*C,8],vel:[-Math.cos(M)*C*3,-Math.sin(M)*C*3,0],spawn:d(0,Q*.7),life:d(.15,.22),drag:3,s0:d(2,3.5)*r})}const y=z(70,n);for(let A=0;A<y;A++){const M=Q+(A+Math.random())/y*(H-Q),[C,R]=Xt(v,w(M)),I=(Math.random()<.5?-1:1)*d(15,55);p.push({pos:[C,R,12],vel:[h[0]*I-f[0]*35,h[1]*I-f[1]*35,d(5,30)],spawn:M,life:d(.2,.4),drag:4,s0:d(3,6)*r}),x.push({pos:[C,R,5],vel:[h[0]*I*.2,h[1]*I*.2,8],spawn:M,life:.4,drag:3,s0:16*r,s1:38*r})}for(let A=0;A<z(85,n);A++){const M=d(0,Math.PI*2),C=d(140,500)*r;p.push({pos:[o[0],o[1],8],vel:[Math.cos(M)*C,Math.sin(M)*C,d(50,180)],spawn:H+d(0,.04),life:d(.35,.75),drag:3,s0:d(9,20)*r,s1:2}),A%2===0&&x.push({pos:[o[0],o[1],3],vel:[Math.cos(M)*130,Math.sin(M)*130,12],spawn:H,life:.8,drag:3,s0:28*r,s1:80*r})}s.add(O(x,"SMOKE",e,{accZ:20,gain:.4,tint:qt,order:3}),O(p,"ICE",e,{accZ:-600,gain:1,tint:zt,order:6}));const k=new F(_t(v,24*r),$e(be(v)));k.renderOrder=5,k.frustumCulled=!1;const S=P(t,"RIPPLE",[.92,.96,1],4),b=P(t,"GLOW",[.65,.88,1],7),T=Wt.map(()=>P(t,"RING",[.65,.88,1],4));s.add(k,S,b,...T);const _=k.material.uniforms;return A=>{_.uHead.value=w(A),_.uTail.value=g(A),k.visible=A>=Q&&_.uTail.value<1;const M=K(A/Q),C=1-K((A-Q)/.2);U(S,a[0],a[1],2,(.6+.8*M)*48*r,.6*M*C);const R=A-H;U(b,o[0],o[1],14,180*r,R>=0?.8*Math.exp(-R/.12):0),T.forEach((I,B)=>{const $=K((A-H-Wt[B])/.6),X=A>=H+Wt[B]&&$<1;U(I,o[0],o[1],2,(.2+2.2*(1-(1-$)**2))*c*r,X?(1-$)**2*.7:0)})}}const Wt=[0,.09,.2],uo={fire:no,lightning:io,water:lo},ho=1.2,fo=[.46,.41,.34],vo=[.19,.16,.13];function mo({group:s,unit:t,clock:e,T:a,dir:o,span:c,scale:r,share:n,impactS:i}){const l=()=>{const v=d(0,Math.PI*2);return[Math.cos(v),Math.sin(v)]},u=v=>{if(!o)return l();const[w,g]=l(),p=o[0]+w*v,x=o[1]+g*v,y=Math.hypot(p,x)||1;return[p/y,x/y]},f=[];for(let v=0;v<z(40,n);v++){const[w,g]=v%2===0?u(.7):l(),p=d(50,210)*r;f.push({pos:[a[0]+d(-6,6),a[1]+d(-6,6),4],vel:[w*p,g*p,d(10,60)],spawn:i+d(0,.05),life:d(.6,1.1),drag:d(3,4.5),s0:d(8,14)*r,s1:d(38,70)*r})}const h=[];for(let v=0;v<z(24,n);v++){const[w,g]=u(.9),p=d(180,420)*r;h.push({pos:[a[0],a[1],4],vel:[w*p,g*p,0],spawn:i+d(0,.03),life:d(.25,.45),drag:5,s0:d(2,3.5)*r,s1:d(1.5,2.5)*r})}s.add(O(f,"SMOKE",e,{accZ:30,gain:.55,tint:fo,order:3}),O(h,"SMOKE",e,{accZ:0,gain:.9,tint:vo,order:4}));const m=P(t,"RING",[.92,.88,.8],6);return s.add(m),v=>{const w=v-i,g=K(w/.3);U(m,a[0],a[1],2,(.5+2*(1-(1-g)**3))*c*r,w>=0&&g<1?(1-g)**2*.4:0)}}function po(s,{hit:t,...e}){const a=t?{u:d(.35,.65),v:d(.3,.55)}:{u:.5,v:.5},o=ht(e.from,.5,.5),c=ht(e.to,a.u,a.v),r=t?.8+Math.min(e.amount,8)*.07:.7,n=Math.hypot(c[0]-o[0],c[1]-o[1])||1,i=[(c[0]-o[0])/n,(c[1]-o[1])/n],{cause:l,to:u,tier:f,pace:h,onImpact:m}=e,v={endS:H+Js[l],pace:h,impact:{atS:H,land:m},startMs:null},w=g=>uo[l]({...g,S:o,T:c,span:Math.min(u.w,u.h),scale:e.cause==="lightning"?r:r*1.65,share:lt[f],boardLight:f==="full"});return{strike:new pt(s,"damage-strike",v,w),impact:a,hit:t&&new Ne(s,t,{impact:a,dir:i,scale:r,amount:e.amount,pace:e.pace,mark:l,impactS:H,startMs:null,occluder:null,onImpact:null})}}function go(s,{from:t,to:e,amount:a,tier:o,pace:c,startMs:r,impactS:n}){const i=ht(e,.5,.5),l=t&&ht(t,.5,.5),u=l?Math.hypot(i[0]-l[0],i[1]-l[1]):0,f=l&&u>0?[(i[0]-l[0])/u,(i[1]-l[1])/u]:null,h={endS:n+ho,pace:c,impact:null,startMs:r},m=v=>mo({...v,T:i,dir:f,span:Math.min(e.w,e.h),scale:.8+Math.min(a,8)*.07,share:lt[o],impactS:n});return new pt(s,"damage-blow",h,m)}function wo(s,t){const{hit:e,from:a,amount:o}=t,c=ht(e.pose,.5,.5),r=a?ht(a,.5,.5):c,n=Math.hypot(c[0]-r[0],c[1]-r[1]),i=n>0?[(c[0]-r[0])/n,(c[1]-r[1])/n]:[0,-1];return new Ne(s,e,{impact:{u:.5,v:.5},dir:i,scale:.8+Math.min(o,8)*.07,amount:o,pace:t.pace,mark:null,impactS:t.impactS,startMs:t.startMs,occluder:t.occluder,onImpact:t.onImpact})}const xo={warmUp(s){const t={value:0},e=new et(1,1),a=[{pos:[0,0,0],vel:[0,0,0],spawn:-2,life:1,drag:1,s0:0}],o=[O(a,"FLAME",t,{accZ:0,gain:0,order:5}),O(a,"SPARK",t,{accZ:0,gain:0,order:6}),O(a,"SMOKE",t,{accZ:0,gain:0,order:3}),O(a,"DROP",t,{accZ:0,gain:0,order:6}),O(a,"ICE",t,{accZ:0,gain:0,order:6}),P(e,"GLOW",[0,0,0],8),P(e,"RING",[0,0,0],6),P(e,"SHADOW",[0,0,0],0),P(e,"RIPPLE",[0,0,0],4),new F(Ue([0,0],[1,0]),We()),new F(_t({S:[0,0],C:[1,0],T:[2,0]},1),Ve(t)),new F(_t({S:[0,0],C:[1,0],T:[2,0]},1),$e(2))];for(const c of["fire","water"]){const{card:r,glow:n}=He(s.placeholderTexture,2,2,0,new W,1,t,c);o.push(new F(e,r),new F(e,n))}return o.forEach((c,r)=>{c.name=`damage-strike-warmup-${r}`}),o}},Mo=1.4,yo=.9,Ao=[.24,.03,.05],So={P1P1:[.36,.78,.38],M1M1:[.82,.24,.22],loyalty:[.95,.66,.2]},bo=[.82,.8,.74];function Co(s){return So[s]??bo}const je=s=>[s.x,-s.y];function Ro(s,{at:t,amount:e,tier:a,pace:o}){const[c,r]=je(t),n=lt[a],i=Math.min(Math.abs(e),10),l={endS:Mo,pace:o,impact:null,startMs:null},u=({group:f,unit:h,clock:m})=>{const v=[];if(e>0){for(let g=0;g<z(18+3*i,n);g++)v.push({pos:[c+d(-.45,.45)*t.w,r+d(-.4,.3)*t.h,6],vel:[d(-18,18),d(45,115),0],spawn:d(0,.35),life:d(.7,1.05),drag:.8,s0:d(3,5),s1:d(6,10),heat:d(.75,1)});f.add(O(v,"FLAME",m,{accZ:0,gain:.7,cool:.9,palette:"life",order:5}));const w=P(h,"GLOW",[1,.84,.55],4);return f.add(w),g=>U(w,c,r,0,Math.max(t.w,t.h)*1.6,.32*K(g/.1)*Math.exp(-Math.max(g-.1,0)/.45))}for(let w=0;w<z(14+2*i,n);w++)v.push({pos:[c+d(-.4,.4)*t.w,r+d(-.2,.3)*t.h,6],vel:[d(-12,12),-d(35,80),0],spawn:d(0,.3),life:d(.8,1.1),drag:1.2,s0:d(6,10),s1:d(24,38)});return f.add(O(v,"SMOKE",m,{accZ:0,gain:.55,tint:Ao,order:3})),()=>{}};return new pt(s,"life-change",l,u)}function ko(s,{at:t,counterType:e,change:a,count:o,tier:c,pace:r}){const[n,i]=je(t),l=Co(e),u=Math.min(t.w,t.h),f=lt[c],h={endS:yo,pace:r,impact:null,startMs:null},m=({group:v,unit:w,clock:g})=>{const p=[];for(let y=0;y<z(10+4*Math.min(o,5),f);y++){const k=d(0,Math.PI*2),S=d(.6,.95)*u,[b,T]=[Math.cos(k),Math.sin(k)],_=d(60,120);p.push(a==="added"?{pos:[n+b*S,i+T*S,6],vel:[-b*_,-T*_,0],spawn:d(0,.15),life:d(.35,.55),drag:2.5,s0:d(4,7),s1:d(2,4)}:{pos:[n+b*S*.3,i+T*S*.3,6],vel:[b*_,T*_+30,0],spawn:d(0,.12),life:d(.45,.7),drag:2,s0:d(3,5),s1:d(8,12)})}v.add(O(p,"SMOKE",g,{accZ:0,gain:.8,tint:l,order:3}));const x=P(w,"RING",l,6);return v.add(x),y=>{const k=K(y/.4),S=1-(1-k)**3,b=a==="added"?2.4-1.4*S:1+1.4*S,T=a==="added"?.55*Math.sin(Math.PI*k):.55*(1-k)**2;U(x,n,i,2,b*u,T)}};return new pt(s,"counter-change",h,m)}const nt=wa/1e3,To=.9,he=.05,_o={water:{color:[.88,.95,1],strength:1},pale:{color:[1,1,.96],strength:.7}},fe=s=>s*s*(3-2*s);function Eo({group:s,unit:t,clock:e},a,o,c,{look:r,tier:n}){const{color:i,strength:l}=_o[r],u=p=>({atS:p,mesh:P(t,"RIPPLE",i,4)}),f=p=>[a[0]+(o[0]-a[0])*p,a[1]+(o[1]-a[1])*p],h=[0,.1].map(u),m=Array.from({length:Math.floor(nt/he)},(p,x)=>u(x*he)),v=[0,.08,.18].map(p=>u(nt+p)),w=P(t,"RIPPLE",i,5);if(s.add(w,...[...h,...m,...v].map(({mesh:p})=>p)),r==="water"){const p=Math.hypot(o[0]-a[0],o[1]-a[1])||1,x={drops:[],mist:[]};Ce(o,nt,[(o[0]-a[0])/p,(o[1]-a[1])/p],.9,lt[n],x),s.add(O(x.mist,"SMOKE",e,{accZ:20,gain:.26,tint:qt,order:3}),O(x.drops,"DROP",e,{accZ:-900,gain:1,tint:zt,order:6}))}const g=({atS:p,mesh:x},[y,k],S,b,T,_,A)=>{const M=K((S-p)/b),C=S>=p&&M<1;U(x,y,k,2,(T+(_-T)*(1-(1-M)**2))*c,C?(1-M)**1.5*A*l:0)};return p=>{const x=fe(K(p/nt));U(w,...f(x),3,c*.8,p<nt?.9*l*Math.min(p/.06,1):0);for(const y of h)g(y,a,p,.5,.5,2,.8);for(const y of m)g(y,f(fe(y.atS/nt)),p,.35,.3,1,.5);for(const y of v)g(y,o,p,.6,.4,2.4,.9)}}function ve(s){return[s.x,-s.y]}function Fo(s,t){const e=Math.min(t.to.w,t.to.h),a={endS:nt+To,pace:t.pace,impact:null,startMs:null};return new pt(s,"counter-ripple",a,o=>Eo(o,ve(t.from),ve(t.to),e,t))}const Oo={warmUp(){const s={value:0},t=[{pos:[0,0,0],vel:[0,0,0],spawn:-2,life:1,drag:1,s0:0}],e=[P(new et(1,1),"RIPPLE",[0,0,0],4),O(t,"SMOKE",s,{accZ:0,gain:0,order:3}),O(t,"DROP",s,{accZ:0,gain:0,order:6})];return e.forEach((a,o)=>{a.name=`counter-ripple-warmup-${o}`}),e}},me=.22,xt=.56,$t=.62,Po={full:4200,reduced:2e3},Io=14,Lo=.4,zo=.6,Do=.85,Ze=new da(-1e4,0,0,0),gt=(s,t,e)=>{const a=Math.min(Math.max((e-s)/(t-s),0),1);return a*a*(3-2*a)},qe=`
  uniform vec2 uFirst; uniform float uAspect, uSacrifice;
  ${Pt}
  float fbm(vec2 p) { return vnoise(p) * 0.55 + vnoise(p * 2.1 + 7.3) * 0.3 + vnoise(p * 4.3 + 1.7) * 0.15; }
  // 0 = released first, 1 = released last.
  float dissolveKey(vec2 uv) {
    vec2 a = vec2(uAspect, 1.0);
    if (uSacrifice > 0.5) return clamp(1.0 - length((uv - 0.5) * a) / length(a * 0.5) + (fbm(uv * a * 9.0) - 0.5) * 0.22, 0.0, 1.0);
    float along = 0.5 - dot(uv - 0.5, uFirst) / (abs(uFirst.x) + abs(uFirst.y));
    return clamp(along * 0.72 + fbm(uv * a * 6.0) * 0.28, 0.0, 1.0);
  }`,Qt=`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Go=`
  uniform sampler2D uMap; uniform vec2 uSize; uniform float uRadius, uProg, uPale, uEdge;
  varying vec2 vUv;
  ${qe}
  ${Ot}
  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float corner = clamp(0.5 - roundedBox(p, uSize * 0.5, uRadius), 0.0, 1.0);
    float gap = dissolveKey(vUv) - uProg;
    if (corner <= 0.0 || gap < 0.0) discard;
    vec3 col = texture2D(uMap, vUv).rgb;
    if (uSacrifice > 0.5) {
      col *= 1.0 - uPale * 1.8;
      float edge = (1.0 - smoothstep(0.0, 0.045, gap)) * step(0.0001, uProg);
      col = mix(col, vec3(0.7, 0.12, 0.32), edge);
      gl_FragColor = vec4(col, corner);
      #include <colorspace_fragment>
      return;
    }
    vec3 pale = vec3(0.78, 0.8, 0.84);
    float grey = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(col, mix(vec3(grey), pale, 0.5), uPale);
    // Ahead of the front the card thins toward pale; the front itself is a hairline.
    col = mix(col, pale, (1.0 - smoothstep(0.0, 0.07, gap)) * 0.6 * step(0.0001, uProg));
    col = mix(col, vec3(0.92, 0.94, 0.97), (1.0 - smoothstep(0.0, 0.012, gap)) * uEdge * step(0.0001, uProg));
    gl_FragColor = vec4(col, corner);
    #include <colorspace_fragment>
  }`,Uo=`
  uniform vec2 uSize; uniform float uRadius, uBlur, uAlpha;
  varying vec2 vUv;
  ${Ot}
  void main() {
    vec2 p = (vUv - 0.5) * (uSize + 2.0 * uBlur);
    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha * (1.0 - smoothstep(-uBlur, uBlur, roundedBox(p, uSize * 0.5, uRadius))));
  }`,Wo=`
  uniform float uTime, uAlpha;
  varying vec2 vUv;
  ${Pt}
  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    if (r > 1.0) discard;
    float a = atan(p.y, p.x);
    float spiral = pow(0.5 + 0.5 * sin(a * 3.0 + r * 22.0 + uTime * 10.0), 5.0);
    float rim = exp(-pow((r - 0.72) * 18.0, 2.0));
    float curl = spiral * smoothstep(0.2, 0.6, r) * (1.0 - smoothstep(0.72, 1.0, r));
    vec3 col = vec3(0.035, 0.006, 0.02) + vec3(0.5, 0.045, 0.13) * (rim + curl * 0.7);
    gl_FragColor = vec4(col, (1.0 - smoothstep(0.8, 1.0, r)) * uAlpha);
    #include <colorspace_fragment>
  }`;function Xe(){return new D({vertexShader:Qt,fragmentShader:Wo,transparent:!0,depthWrite:!1,depthTest:!1,uniforms:{uTime:{value:0},uAlpha:{value:0}}})}const Bo=`
  attribute vec2 aUv; attribute vec3 aRand;
  uniform sampler2D uMap; uniform vec2 uSize; uniform float uT, uCross, uTravel, uLift, uDpr, uHeld, uAngle, uGhostScale, uGhostAngle, uHolderAngle;
  uniform vec3 uCardPos; uniform vec3 uGhostPos; uniform vec4 uHolder;
  varying vec3 vCol; varying float vA;
  ${qe}
  // Counter-clockwise by a (world y up), as a mesh's rotation.z turns.
  vec2 turn(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
  void main() {
    float birth = (dissolveKey(aUv) + 0.03) / 1.06 * uCross;
    float age = uT - birth;
    float life = uTravel * (0.7 + 0.6 * aRand.z);
    float k = clamp(age / life, 0.0, 1.0);
    vec2 offset = (aUv - 0.5) * uSize;
    vec3 start = uCardPos + vec3(turn(offset, uAngle), uLift);
    vec3 pos;
    float alpha;
    if (uHeld > 0.5) {
      // Arc to the same spot on the ghost card, lifting over the board on the way.
      vec3 end = uGhostPos + vec3(turn(offset * uGhostScale, uGhostAngle), 0.0);
      float e = k * k * (3.0 - 2.0 * k);
      vec3 mid = mix(start, end, 0.5) + vec3((aRand.x - 0.5) * 28.0, (aRand.y - 0.5) * 20.0, 80.0 + aRand.z * 50.0);
      pos = mix(mix(start, mid, e), mix(mid, end, e), e);
      alpha = 1.0;
      // Flakes landing where the holder card covers the ghost tuck under it.
      vec2 d = abs(turn(pos.xy - uHolder.xy, -uHolderAngle)) - uHolder.zw;
      float inside = 1.0 - smoothstep(-3.0, 1.0, max(d.x, d.y));
      alpha *= 1.0 - inside * smoothstep(0.55, 0.9, k);
      alpha *= 1.0 - smoothstep(0.9, 1.0, k) * 0.9;
    } else if (uSacrifice > 0.5) {
      // The card's released fragments spiral inward and disappear into the table.
      float angle = k * 4.0;
      vec2 curled = turn(turn(offset, uAngle), angle) * pow(1.0 - k, 1.8);
      pos = uCardPos + vec3(curled, uLift * (1.0 - k) - k * 24.0);
      alpha = 1.0 - smoothstep(0.5, 1.0, k);
    } else {
      // Drift up the screen and toward the viewer, with a slow sideways sway.
      float a = age;
      pos = start + vec3(sin(a * 4.0 + aRand.x * 6.28) * 7.0 * a + (aRand.x - 0.5) * 110.0 * a,
                         (55.0 + aRand.y * 95.0) * a,
                         (90.0 + aRand.z * 180.0) * a);
      alpha = 0.85 * (1.0 - smoothstep(0.25, 1.0, k));
    }
    vec3 col = texture2D(uMap, aUv).rgb;
    vCol = mix(col, vec3(0.86, 0.88, 0.92), uHeld > 0.5 ? 0.15 : smoothstep(0.2, 0.9, k) * 0.5);
    if (uSacrifice > 0.5) vCol = mix(col * 0.4, vec3(0.9, 0.18, 0.36), smoothstep(0.0, 0.7, k));
    vA = age > 0.0 && k < 1.0 ? alpha : 0.0;
    gl_PointSize = vA > 0.0 ? (1.1 + aRand.y * 1.2) * uDpr * (uHeld > 0.5 ? 1.0 : 1.0 - 0.5 * k) : 0.0;
    gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
  }`,Ho=`
  varying vec3 vCol; varying float vA;
  void main() {
    vec2 q = abs(gl_PointCoord - 0.5);
    if (q.x + q.y > 0.62) discard;
    gl_FragColor = vec4(vCol, vA);
    #include <colorspace_fragment>
  }`;function Ye(s,t){const e=Math.max(1,Math.round(Math.sqrt(s*t))),a=Math.max(1,Math.round(s/e)),o=[],c=[];for(let n=0;n<a;n++)for(let i=0;i<e;i++)o.push((i+Math.random())/e,(n+Math.random())/a),c.push(Math.random(),Math.random(),Math.random());const r=new ct;return r.setAttribute("position",new N(new Float32Array(o.length/2*3),3)),r.setAttribute("aUv",new N(o,2)),r.setAttribute("aRand",new N(c,3)),r}function Qe(s,t,e){return{uSacrifice:{value:0},uFirst:{value:e},uAspect:{value:s/t},uSize:{value:new W(s,t)}}}function Je(s,t,e,a,o){return new D({vertexShader:Qt,fragmentShader:Go,transparent:!0,uniforms:{...Qe(t,e,o),uMap:{value:s},uRadius:{value:a},uProg:{value:0},uPale:{value:0},uEdge:{value:zo}}})}function ta(s,t,e){return new D({vertexShader:Qt,fragmentShader:Uo,transparent:!0,depthWrite:!1,depthTest:!1,uniforms:{uSize:{value:new W(s,t)},uRadius:{value:e},uBlur:{value:2},uAlpha:{value:0}}})}function ea(s,t,e,a,o){return new D({vertexShader:Bo,fragmentShader:Ho,transparent:!0,depthWrite:!1,uniforms:{...Qe(t,e,a),uMap:{value:s},uT:{value:-1},uCross:{value:xt},uTravel:{value:$t},uLift:{value:0},uDpr:{value:o},uHeld:{value:0},uAngle:{value:0},uGhostScale:{value:1},uGhostAngle:{value:0},uHolderAngle:{value:0},uCardPos:{value:new V},uGhostPos:{value:new V},uHolder:{value:Ze.clone()}}})}const No={warmUp(s){const t=new W(0,-1),e=new F(new et(1,1),Je(s.placeholderTexture,4,4,0,t));e.name="exile-dissolve-warmup";const a=new F(e.geometry,ta(4,4,0));a.name="exile-dissolve-shadow-warmup";const o=new ft(Ye(1,1),ea(s.placeholderTexture,4,4,t,1));o.name="exile-dissolve-flakes-warmup";const c=new F(e.geometry,Xe());return c.name="sacrifice-vortex-warmup",[e,a,o,c]}};class Ko{constructor(t,e){this.host=t,this.params=e;const{pose:a,surface:o,radius:c,tier:r,pixelRatio:n,link:i}=e,{w:l,h:u}=a,f=new W(0,-1),h=i?.(t.canvasOrigin()).holder;h&&(h.x!==a.x||h.y!==a.y)&&f.set(h.x-a.x,-(h.y-a.y)).normalize(),this.card=new F(this.plane,Je(o,l,u,c,f)),this.card.name="exile-dissolve",this.card.scale.set(l,u,1),this.card.position.set(a.x,-a.y,0),this.card.rotation.z=-q.degToRad(a.angleDeg),this.card.frustumCulled=!1,this.card.renderOrder=2,this.card.material.uniforms.uSacrifice.value=e.look==="sacrifice"?1:0,t.scene.add(this.card),e.look==="sacrifice"&&(this.vortex=new F(this.plane,Xe()),this.vortex.name="sacrifice-vortex",this.vortex.position.set(a.x,-a.y,0),this.vortex.renderOrder=1,this.vortex.frustumCulled=!1,t.scene.add(this.vortex)),r==="full"&&(this.shadow=new F(this.plane,ta(l,u,c)),this.shadow.name="exile-dissolve-shadow",this.shadow.rotation.z=this.card.rotation.z,this.shadow.frustumCulled=!1,this.shadow.renderOrder=0,t.scene.add(this.shadow)),this.flakes=new ft(Ye(Po[r],l/u),ea(o,l,u,f,n)),this.flakes.name="exile-dissolve-flakes";const m=this.flakes.material.uniforms;m.uCardPos.value.set(a.x,-a.y,0),m.uGhostPos.value.set(a.x,-a.y,0),m.uAngle.value=this.card.rotation.z,m.uGhostAngle.value=this.card.rotation.z,m.uHeld.value=i?1:0,m.uSacrifice.value=e.look==="sacrifice"?1:0,this.flakes.frustumCulled=!1,this.flakes.renderOrder=3,t.scene.add(this.flakes)}plane=new et(1,1);card;shadow=null;flakes;vortex=null;startMs=null;arrived=!1;update(t){this.startMs??=t;const{pose:e,pace:a,link:o}=this.params,c=(t-this.startMs)/1e3/a,r=gt(0,1,c/me),n=this.params.look==="sacrifice",i=Io*r*(n?-.5:1),l=c-me;this.card.position.z=i;const u=this.card.material.uniforms;u.uPale.value=Lo*r,u.uProg.value=l<=0?0:-.03+1.06*(l/xt);const f=this.flakes.material.uniforms;if(f.uT.value=l,f.uLift.value=i,this.vortex){const h=gt(0,.16,c)*(1-gt(.85,1.55,c));this.vortex.scale.set(e.w*1.4*h,e.h*.9*h,1),this.vortex.material.uniforms.uTime.value=c,this.vortex.material.uniforms.uAlpha.value=h}if(o&&this.aimLink(o(this.host.canvasOrigin())),this.shadow){const h=2+i*.35;this.shadow.position.set(e.x+i*.3,-e.y-i*.42,0),this.shadow.scale.set(e.w+h*2,e.h+h*2,1);const m=this.shadow.material.uniforms;m.uBlur.value=h,m.uAlpha.value=.45*gt(1,10,i)*(1-gt(.1,.8,l/xt))}return o&&!this.arrived&&l>xt+$t*Do&&this.arrive(),l<xt+$t*1.3}aimLink({ghost:t,holder:e}){const a=this.flakes.material.uniforms,o=t??e;o&&(a.uGhostPos.value.set(o.x,-o.y,0),a.uGhostAngle.value=-q.degToRad(o.angleDeg)),t&&(a.uGhostScale.value=t.w/this.params.pose.w),e?(a.uHolder.value.set(e.x,-e.y,e.w/2,e.h/2),a.uHolderAngle.value=-q.degToRad(e.angleDeg)):a.uHolder.value.copy(Ze)}arrive(){this.arrived=!0,this.params.onArrive()}dispose(t){this.host.scene.remove(this.card,this.flakes),this.vortex&&(this.host.scene.remove(this.vortex),this.vortex.material.dispose()),this.shadow&&(this.host.scene.remove(this.shadow),this.shadow.material.dispose()),this.plane.dispose(),this.card.material.dispose(),this.flakes.geometry.dispose(),this.flakes.material.dispose(),this.params.surface.dispose(),!t&&!this.arrived&&this.arrive()}}function Vo(s,t){return new Ko(s,t)}const $o=110,pe=.7,jo=.3,aa=new it(.42,.39,.34),Zo={White:new it(15787720),Blue:new it(3832789),Black:new it(4865877),Red:new it(14173230),Green:new it(4165450)},qo=new V(0,0,1),Xo=`
  attribute vec2 aVel;
  attribute float aLife;
  attribute float aSize;
  uniform float uTime;
  uniform float uDpr;
  varying float vA;
  void main() {
    float life = clamp(uTime / aLife, 0.0, 1.0);
    // Drag: fast out of the card's footprint, then drifting to a stop.
    vec2 off = aVel * (1.0 - exp(-7.0 * uTime)) / 7.0;
    vA = 1.0 - life;
    gl_PointSize = aSize * uDpr;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy + off, position.z, 1.0);
  }
`,Yo=`
  uniform vec3 uColor;
  varying float vA;
  void main() {
    vec2 q = gl_PointCoord - 0.5;
    if (dot(q, q) > 0.25) discard;
    gl_FragColor = vec4(uColor, vA * 0.75);
    #include <colorspace_fragment>
  }
`;function Qo(s){const t=aa.clone();if(!s?.length)return t;const e=new it(0,0,0);for(const a of s)e.add(Zo[a]);return e.multiplyScalar(1/s.length),t.lerp(e,jo)}function sa(s,t,e){const a=new ft(s,new D({vertexShader:Xo,fragmentShader:Yo,transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uDpr:{value:e},uColor:{value:t}}}));return a.frustumCulled=!1,a.renderOrder=1,a}function oa(s,t,e,a){const o=new ct;return o.setAttribute("position",new N(s,3)),o.setAttribute("aVel",new N(t,2)),o.setAttribute("aLife",new N(e,1)),o.setAttribute("aSize",new N(a,1)),o}const Jo={warmUp(){const s=sa(oa([0,0,1],[0,0],[1],[0]),aa.clone(),1);return s.name="landing-dust-warmup",[s]}};class tr{constructor(t,e,a,o,c){this.host=t,this.pace=o;const r=[],n=[],i=[],l=[],{w:u,h:f}=e,h=new wt().setFromAxisAngle(qo,-q.degToRad(e.angleDeg)),m=new V,v=2*(u+f);for(let w=0;w<$o;w++){let g=Math.random()*v,p,x,y,k;g<u?[p,x,y,k]=[g-u/2,f/2,0,1]:(g-=u)<f?[p,x,y,k]=[u/2,f/2-g,1,0]:(g-=f)<u?[p,x,y,k]=[u/2-g,-f/2,0,-1]:(g-=u,[p,x,y,k]=[-u/2,-f/2+g,-1,0]);const S=140+Math.random()*260,b=(Math.random()-.5)*.9;m.set(p,x,0).applyQuaternion(h),r.push(e.x+m.x,-e.y+m.y,1),m.set((y+k*b)*S,(k-y*b)*S,0).applyQuaternion(h),n.push(m.x,m.y),i.push(.3+Math.random()*(pe-.3)),l.push(1.2+Math.random()*1.8)}this.points=sa(oa(r,n,i,l),Qo(a),c),this.points.name="landing-dust",t.scene.add(this.points)}points;startMs=null;update(t){this.startMs??=t;const e=(t-this.startMs)/1e3/this.pace;return this.points.material.uniforms.uTime.value=e,e<pe}dispose(){this.host.scene.remove(this.points),this.points.geometry.dispose(),this.points.material.dispose()}}function er(s,t,e,a,o){return new tr(s,t,e,a,o)}const ar=[ts,Jo,qs,bs,No,xo,Oo,ws],jt=28;function sr(s,t,e){const a=e/2/Math.tan(q.degToRad(jt/2));s.fov=jt,s.aspect=t/e,s.position.set(t/2,-e/2,a),s.near=a*.05,s.far=a*4,s.updateProjectionMatrix()}function ge(s,t){for(const[e,a]of s)a===t&&s.delete(e)}function we(s){const t=new ma(s);return t.colorSpace=pa,t.anisotropy=4,t.needsUpdate=!0,t}class or{constructor(t,e,a){this.canvas=t,this.renderer=e,this.callbacks=a,e.setClearColor(0,0),this.backTexture=a.backImage?we(a.backImage):null,this.origin=t.getBoundingClientRect(),this.resizeObserver=new ResizeObserver(()=>{this.sizeDirty=!0}),this.resizeObserver.observe(t),t.addEventListener("webglcontextlost",this.handleContextLost),t.addEventListener("webglcontextrestored",this.handleContextRestored)}scene=new fa;placeholderTexture=Ja();backTexture;camera=new va(jt,1,1,1e4);active=new Set;flights=new Map;boardEffects=new Map;resizeObserver;warmUpObjects=null;pixelRatio=1;origin;raf=0;sizeDirty=!0;contextLost=!1;disposed=!1;async start(){await this.prepare()&&this.callbacks.onReady(this)}async prepare(){this.applySize(),this.warmUpObjects||(this.warmUpObjects=ar.flatMap(t=>t.warmUp(this)),this.scene.add(...this.warmUpObjects));for(const t of this.warmUpObjects)t.visible=!0,t.frustumCulled=!1;if(this.backTexture&&this.renderer.initTexture(this.backTexture),await this.renderer.compileAsync(this.scene,this.camera),this.disposed)return!1;this.renderer.render(this.scene,this.camera);for(const t of this.warmUpObjects)t.visible=!1;return!this.contextLost}handleContextLost=()=>{this.contextLost=!0,cancelAnimationFrame(this.raf),this.raf=0,this.disposeEffects(),this.canvas.style.visibility="hidden",this.callbacks.onContextLost()};handleContextRestored=()=>{this.contextLost=!1,this.callbacks.onContextRestored(),this.start()};frame=t=>{this.raf=0,this.sizeDirty&&this.applySize(),this.origin=this.canvas.getBoundingClientRect();for(const a of this.active)a.update(t)||(this.active.delete(a),a.dispose(!1),ge(this.flights,a),ge(this.boardEffects,a));this.renderer.render(this.scene,this.camera);const e=this.active.size>0;this.canvas.style.visibility=e?"visible":"hidden",e&&(this.raf=requestAnimationFrame(this.frame))};applySize(){const{width:t,height:e}=this.canvas.getBoundingClientRect(),a=Math.max(1,t),o=Math.max(1,e);this.renderer.setSize(a,o,!1),sr(this.camera,a,o),this.sizeDirty=!1}disposeEffects(){for(const t of this.active)t.dispose(!0);this.active.clear(),this.flights.clear(),this.boardEffects.clear()}canvasOrigin(){return this.origin}setPixelRatio(t){this.pixelRatio=t,this.renderer.setPixelRatio(t)}uploadFace(t){const e=we(t);return this.renderer.initTexture(e),e}hasBack(){return this.backTexture!==null}hasFlight(t){return this.flights.get(t)?.isReleased()===!1}dropReleasedFlight(t){const e=this.flights.get(t);e?.isReleased()&&(this.active.delete(e),e.dispose(!0),this.flights.delete(t))}startCardFlight(t){const{objectId:e}=t,a=this.flights.get(e),o=a&&!a.isReleased()?a.currentState():t.from&&Za(t.from,t.flip);if(!o)return!1;a&&(this.active.delete(a),a.dispose(!0));const{landingColors:c,...r}=t,n=rs(this,{...r,from:o,back:this.backTexture,onRelease:i=>{i==="land"&&t.route.to==="Battlefield"&&t.tier==="full"&&this.add(er(this,n.currentState(),c,t.pace,this.pixelRatio)),t.onRelease(i)}});return this.flights.set(e,n),this.add(n),!0}startShatter({objectId:t,...e}){this.addBoardEffect(t,Ys(this,{...e,pixelRatio:this.pixelRatio}))}startBurn({objectId:t,...e}){this.addBoardEffect(t,Rs(this,e))}startDissolve({objectId:t,...e}){this.addBoardEffect(t,Vo(this,{...e,pixelRatio:this.pixelRatio}))}startDamageStrike(t){const{strike:e,hit:a,impact:o}=po(this,t);return this.add(e),a&&t.hit&&(this.addBoardEffect(t.hit.objectId,a),t.hit.atRest&&a.showAtRest()),o}startDamageBlow(t){this.add(go(this,t))}startDamageKnockback({objectId:t,atRest:e,...a}){const o=wo(this,a);this.addBoardEffect(t,o),e&&o.showAtRest()}startCounterRipple(t){this.add(Fo(this,t))}startBoardSweep(t){this.add(gs(this,t))}startLifeChange(t){this.add(Ro(this,t))}startCounterChange(t){this.add(ko(this,t))}addBoardEffect(t,e){const a=this.boardEffects.get(t);a&&(this.active.delete(a),a.dispose(!0)),this.boardEffects.set(t,e),this.add(e)}add(t){this.active.add(t),!this.raf&&!this.contextLost&&(this.raf=requestAnimationFrame(this.frame))}dispose(){this.disposed=!0,this.canvas.removeEventListener("webglcontextlost",this.handleContextLost),this.canvas.removeEventListener("webglcontextrestored",this.handleContextRestored),this.resizeObserver.disconnect(),cancelAnimationFrame(this.raf),this.raf=0,this.disposeEffects();const t=new Set,e=new Set;for(const a of this.warmUpObjects??[])a.traverse(o=>{if(!(!(o instanceof F)&&!(o instanceof ft))){t.add(o.geometry);for(const c of Array.isArray(o.material)?o.material:[o.material])e.add(c)}});for(const a of t)a.dispose();for(const a of e)a.dispose();this.placeholderTexture.dispose(),this.backTexture?.dispose(),this.scene.clear(),this.warmUpObjects=null,this.renderer.dispose(),this.renderer.forceContextLoss()}}function Mr(s,t){let e;try{e=new ha({canvas:s,alpha:!0,antialias:!1,powerPreference:"low-power"})}catch{t.onFailed();return}new or(s,e,t).start()}export{ar as SCENE_EFFECT_KINDS,sr as fitPixelCamera,Mr as initCardVfxScene};
