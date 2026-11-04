import{W as R,h as _,x as B,S as U,a as D,P as G,M as P,y as k,j as z}from"./three.module-CwGaZDe4.js";import{H as N}from"./index-jJaycAFU.js";import{V}from"./glslChunks-BPS8m5j-.js";const W=`
  float rain(vec2 uv) {
    vec2 p = uv * vec2(110.0, 45.0);
    p.x += p.y * 0.22;
    float lane = floor(p.x);
    p.y += uTime * (9.0 + hash21(vec2(lane, 3.0)) * 6.0);
    vec2 cell = floor(p);
    vec2 f = fract(p);
    float dropMask = step(0.96, hash21(cell));
    return dropMask * (1.0 - smoothstep(0.015, 0.09, abs(f.x - 0.5)))
      * smoothstep(0.1, 0.5, f.y) * (1.0 - smoothstep(0.5, 0.95, f.y));
  }

  float motes(vec2 uv, float speed, float radius) {
    float light = 0.0;
    for (int i = 0; i < 40; i++) {
      float seed = float(i);
      vec2 start = vec2(hash21(vec2(seed, 1.0)), hash21(vec2(seed, 8.0)));
      vec2 pos = fract(start + vec2(sin(uTime * 0.4 + seed) * 0.025, uTime * speed));
      vec2 d = (uv - pos) * vec2(1.778, 1.0);
      light += exp(-dot(d, d) / (radius * radius)) * (0.5 + 0.5 * sin(seed + uTime));
    }
    return light;
  }
`,$={White:`
    float clouds = vnoise(uv * 9.0 + vec2(uTime * 0.07, uTime * 0.025));
    color += vec3(0.13, 0.11, 0.07) * clouds * rim * uIntensity;
    color += vec3(0.8, 0.67, 0.36) * motes(uv, 0.012, 0.003) * rim * uAmbiance;
  `,Black:`
    float fog = vnoise(uv * 7.0 + vec2(uTime * 0.07, -uTime * 0.04));
    float detail = vnoise(uv * 19.0 + vec2(-uTime * 0.03, uTime * 0.02));
    color = mix(color, vec3(0.20, 0.23, 0.26), fog * detail * rim * 0.65 * uAmbiance);
    float candle = smoothstep(0.08, 0.25, original.r - original.b);
    color += vec3(0.16, 0.065, 0.015) * candle * rim
      * vnoise(uv * 60.0 + uTime * 3.0) * uIntensity;
  `,Red:`
    float lava = smoothstep(0.10, 0.32, original.r - original.g) * rim;
    float flow = vnoise(uv * 28.0 + vec2(uTime * 0.18, -uTime * 0.10));
    vec2 heat = vec2(sin(uv.y * 90.0 + uTime * 2.0), cos(uv.x * 70.0 - uTime)) * 0.003;
    color = texture2D(uArt, uv + heat * lava * uIntensity).rgb;
    color += vec3(0.3, 0.055, 0.005) * lava * flow * uIntensity;
    color += vec3(0.95, 0.23, 0.025) * motes(uv, 0.06, 0.002) * rim * uAmbiance;
  `,Green:`
    float foliage = smoothstep(0.015, 0.08, original.g - original.r) * rim;
    vec2 breeze = vec2(sin(uv.y * 35.0 + uTime * 0.8), cos(uv.x * 28.0 - uTime * 0.6));
    color = texture2D(uArt, uv + breeze * foliage * 0.002 * uIntensity).rgb;
    color *= 1.0 - vnoise(uv * 12.0 + vec2(uTime * 0.06, 0.0)) * rim * 0.13 * uIntensity;
    color += vec3(0.72, 0.80, 0.85) * motes(uv, -0.035, 0.0035) * rim * uAmbiance;
  `},O=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;function q(e){return`
    uniform sampler2D uArt;
    uniform vec2 uCover;
    uniform float uTime, uIntensity, uAmbiance;
    varying vec2 vUv;
    ${V}
    ${W}
    ${e==="Blue"?j:""}
    void main() {
      vec2 uv = (vUv - 0.5) * uCover + 0.5;
      vec3 original = texture2D(uArt, uv).rgb;
      float edge = max(abs(uv.x - 0.5) / 0.5, abs(uv.y - 0.5) / 0.5);
      float rim = smoothstep(0.68, 0.94, edge);
      vec3 color = original;
      ${e==="Blue"?H:$[e]}
      gl_FragColor = vec4(color, 1.0);
      #include <colorspace_fragment>
    }
  `}const j=`  float flame(vec2 uv, vec2 center, float seed) {
    vec2 p = (uv - center) / vec2(0.017, 0.038);
    float shape = exp(-dot(p, p) * 2.0);
    float flutter = vnoise(vec2(seed, uTime * 3.0));
    return shape * (0.25 + flutter * 0.75);
  }

`,H=`

    // Art-directed prototype mask: only blue/cyan pixels at the outer shoreline.
    // The quiet playing floor is never displaced, including at narrow viewports.

    float blue = smoothstep(0.025, 0.11, original.b - original.r);
    float cyan = 1.0 - smoothstep(0.08, 0.22, original.b - original.g);
    float water = rim * blue * cyan;
    float drift = vnoise(uv * vec2(30.0, 18.0) + vec2(uTime * 0.10, -uTime * 0.07));
    vec2 ripple = vec2(
      sin(uv.y * 95.0 + uTime * 2.2 + drift * 4.0),
      cos(uv.x * 80.0 - uTime * 1.6 + drift * 3.0)
    );
    color = texture2D(uArt, uv + ripple * water * 0.006 * uIntensity).rgb;
    float glint = pow(max(0.0, sin(uv.y * 210.0 + uv.x * 55.0 - uTime * 0.7 + drift * 5.0)), 12.0);
    color += vec3(0.07, 0.13, 0.15) * water * glint * uIntensity;
    // UV anchors belong to this painting, so CSS-cover cropping moves them with it.
    float fire = flame(uv, vec2(0.066, 0.907), 1.0)
               + flame(uv, vec2(0.933, 0.907), 4.0)
               + flame(uv, vec2(0.039, 0.267), 7.0)
               + flame(uv, vec2(0.957, 0.261), 10.0);
    color += vec3(0.04, 0.15, 0.22) * fire * uIntensity;
    color += vec3(0.06, 0.09, 0.12) * rain(uv) * smoothstep(0.84, 0.98, edge) * uAmbiance;
`;function X(e,v,m,M,I){let o;try{o=new R({canvas:e,alpha:!0,antialias:!1,powerPreference:"low-power"})}catch{return()=>{}}o.setPixelRatio(Math.min(window.devicePixelRatio,m==="full"?1.5:1));const f=new _,C=new B(-1,1,1,-1,0,1),d=new D(1,1),n=new U({vertexShader:O,fragmentShader:q(v),depthTest:!1,depthWrite:!1,uniforms:{uArt:{value:null},uCover:{value:d},uTime:{value:0},uIntensity:{value:M},uAmbiance:{value:I}}}),p=new G(2,2);f.add(new P(p,n));let a=!1,c=!1,s=!1,t=0,r=0,h=0,l=!0;const F=1e3/(m==="full"?30:20),g=new ResizeObserver(()=>{l=!0});g.observe(e);const y=new k().load(N[v],i=>{if(a){i.dispose();return}i.colorSpace=z,n.uniforms.uArt.value=i,c=!0,u()});function b(i){if(t=0,!(a||s||document.hidden||!c)&&(t=requestAnimationFrame(b),!(r&&i-r<F))){if(l){const{width:A,height:w}=e.getBoundingClientRect();o.setSize(Math.max(1,A),Math.max(1,w),!1);const E=y.image,L=Math.max(1,A)/Math.max(1,w),S=E.width/E.height;d.set(Math.min(1,L/S),Math.min(1,S/L)),l=!1}r&&(h+=Math.min(i-r,100)),r=i,n.uniforms.uTime.value=h/1e3,o.render(f,C),e.style.visibility="visible"}}function u(){cancelAnimationFrame(t),t=0,r=0,!a&&!s&&c&&!document.hidden&&(t=requestAnimationFrame(b))}function x(){s=!0,cancelAnimationFrame(t),e.style.visibility="hidden"}function T(){s=!1,l=!0,u()}return document.addEventListener("visibilitychange",u),e.addEventListener("webglcontextlost",x),e.addEventListener("webglcontextrestored",T),()=>{a=!0,cancelAnimationFrame(t),document.removeEventListener("visibilitychange",u),e.removeEventListener("webglcontextlost",x),e.removeEventListener("webglcontextrestored",T),g.disconnect(),e.style.visibility="hidden",p.dispose(),n.dispose(),y.dispose(),o.dispose(),o.forceContextLoss()}}export{X as createArenaBackgroundScene};
