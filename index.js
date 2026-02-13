import{i as G,a as P,S as K,N as V,P as z}from"./assets/vendor-nO3sPJ2J.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const Z={position:"topRight",timeout:4e3,theme:"dark",backgroundColor:"#060307",progressBarColor:"#4E75FF"},I=(e,t="error")=>{G[t]({...Z,title:t==="error"?"Error":"Success",message:e,backgroundColor:t==="error"?"#1a0505":"#060307"})};P.defaults.baseURL="https://sound-wave.b.goit.study/api";async function B(e,t,s={}){var r,n;try{return(await P({method:e,url:t,...s})).data}catch(a){const i=((n=(r=a.response)==null?void 0:r.data)==null?void 0:n.message)||a.message;return I(i),null}}const q=({page:e=1,limit:t})=>B("get","/artists",{params:{page:e,limit:t}}),J=e=>B("get",`/artists/${e}`),Q=e=>B("get","/feedbacks",{params:{limit:e}}),W=new URL("/js_123_mdarntl-code/assets/sprite-D9unHibT.svg",import.meta.url).href,X=document.querySelector(".artists-list");function x(e){const t=e.map(({_id:s,strArtist:r,strArtistThumb:n,genres:a,strBiographyEN:i})=>{const d=a.map(l=>`<span class="artist-genre">${l}</span>`).join("");return`
          <li class="artist-card">
            <img
              src="${n}"
              alt="${r}"
              class="artist-img"
            />
            <div class="artist-genres">
              ${d}
            </div>
            <h4 class="artist-name">${r}</h4>
            <p class="artist-description">
              ${i}
            </p>
            <button
              type="button"
              class="artist-link"
              data-id="${s}"
              >
              Learn more
            </button>
          </li>
        `}).join("");X.insertAdjacentHTML("beforeend",t)}function ee(e){return e.length===0?'<p class="no-data">No tracks found</p>':e.map(t=>`
    <div class="artistModal-album-item">
      <h4 class="artistModal-album-name">${t.strAlbum}</h4>
      <div class="artistModal-track-header">
        <span>Track</span>
        <span>Time</span>
        <span>Link</span>
      </div>
      <ul class="artistModal-track-list">
        ${t.tracks.map(s=>{const r=Math.floor(s.intDuration/1e3),n=Math.floor(r/60),a=String(r%60).padStart(2,"0"),i=s.movie?s.movie.split(" ")[0]:null;return`
            <li class="artistModal-track-item">
              <span class="artistModal-track-name">${s.strTrack}</span>
              <span class="artistModal-track-duration">${n}:${a}</span>
              <span class="artistModal-track-link">
                ${i&&i!=="null"?`
                  <a href="${i}" target="_blank" class="artistModal-yt-link" rel="noopener noreferrer">
                    <svg class="artistModal-yt-icon" width="24" height="24">
                      <use href="${W}#icon-Youtube"></use> 
                    </svg>
                  </a>`:""}
              </span>
            </li>`}).join("")}
      </ul>
    </div>`).join("")}function te({artist:e,yearsActive:t,specificInfoMarkup:s,albumsMarkup:r}){const{strArtist:n,strArtistThumb:a,strCountry:i,strBiographyEN:d,genres:l}=e;return`
    <div class="artistModal-content-wrapper">
      <h2 class="artistModal-title">${n}</h2>
      <div class="artistModal-info-wrapper">
        <div class="artistModal-img-wrapper">
          <img src="${a}" class="artistModal-img" alt="${n}">
        </div>
        <div class="artistModal-info-grid">
          <div class="artistModal-info-group">
            <div class="artistModal-info-item">
              <span class="artistModal-info-label">Years active</span>
              <p class="artistModal-info-value">${t}</p>
            </div>     
            ${s}      
            <div class="artistModal-info-item">
              <span class="artistModal-info-label">Country</span>
              <p class="artistModal-info-value">${i||"Unknown"}</p>
            </div>
          </div>
          <div class="artistModal-desc">
            <span class="artistModal-info-label">Biography</span>
            <p>${d||"Biography not available"}</p>
          </div>
          <div class="artistModal-genres">
            ${(l||[]).map(u=>`<span class="artist-genre">${u}</span>`).join("")}
          </div>
        </div> 
      </div>
      <h2 class="artistModal-albums-title">Albums</h2>
      <div class="artistModal-albums-section">${r}</div>
    </div>`}const f=document.querySelector(".artists-button");let S=1;const H=8;let m=[],A=0;function se(){f.classList.remove("is-hidden")}function F(){f.classList.add("is-hidden")}async function ne(){const e=await q({page:S,limit:H});e&&(A=e.totalArtists,x(e.artists),m=[...m,...e.artists],m.length<A?se():F())}ne();f.addEventListener("click",ae);async function ae(e){e.preventDefault(),S+=1,f.disabled=!0,f.classList.add("loading");const t=await q({page:S,limit:H});f.classList.remove("loading"),f.disabled=!1,t&&(x(t.artists),m=[...m,...t.artists],m.length>=A&&(F(),I("You have reached the limit","error")))}const re=3;let w=null;async function ie(){const e=await Q(re),t=e==null?void 0:e.data;if(!Array.isArray(t)||t.length===0){console.warn("[Feedback] feedbacks array is empty or invalid");return}oe(t),ce()}function oe(e){const t=document.getElementById("feedbackList");t&&(t.innerHTML="",e.forEach(({name:s,rating:r,descr:n})=>{t.insertAdjacentHTML("beforeend",`
      <div class="swiper-slide feedback-card">
        <div class="feedback-rating">
          ${le(r)}
        </div>
        <p class="feedback-text">"${n}"</p>
        <p class="feedback-author">— ${s}</p>
      </div>
      `)}))}function le(e=0){const t=Math.round(e);let s="";for(let r=1;r<=5;r++)s+=`<span class="star ${r<=t?"active":""}">★</span>`;return s}function ce(){w&&w.destroy(!0,!0),w=new K(".feedback-swiper",{modules:[V,z],slidesPerView:1,loop:!0,grabCursor:!0,navigation:{nextEl:".feedback-next",prevEl:".feedback-prev"},pagination:{el:".feedback-pagination",clickable:!0}})}document.addEventListener("DOMContentLoaded",ie);const de=new URL("/js_123_mdarntl-code/assets/sprite-D9unHibT.svg",import.meta.url).href;(function(){const e=document.querySelector(".header-btn"),t=document.querySelector(".header-menu");if(!e||!t)return;const s=e.querySelector("use"),r="#icon-exit",n="#icon-menu-burger";let a=null,i=t.parentNode,d=t.nextSibling;function l(c){if(!s)return;const k=de+c;s.setAttribute("href",k),s.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",k)}function u(){a=document.createElement("div"),a.className="header-overlay",Object.assign(a.style,{position:"fixed",top:"0",left:"0",right:"0",bottom:"0",background:"#060307",zIndex:"999",overflow:"auto",display:"none"}),document.body.appendChild(a),t.addEventListener("click",c=>{c.target.closest('a[href^="#"]')&&b()})}function g(){a||u(),a.style.display="block",document.body.style.overflow="hidden",a.appendChild(t),t.classList.add("is-open"),e.setAttribute("aria-expanded","true"),l(r),document.addEventListener("keydown",h)}function b(){!a||a.style.display==="none"||(a.style.display="none",document.body.style.overflow="",i.insertBefore(t,d),t.classList.remove("is-open"),e.setAttribute("aria-expanded","false"),l(n),document.removeEventListener("keydown",h))}function h(c){c.key==="Escape"&&b()}e.addEventListener("click",c=>{c.preventDefault(),e.getAttribute("aria-expanded")==="true"?b():g()})})();const j=16;function ue(){const e=document.querySelectorAll(".hero-gallery-track");me(e),pe(e),fe()}function fe(){const e=document.querySelector("[data-scroll-to]");e&&e.addEventListener("click",function(){const t=this.dataset.scrollTo,s=document.getElementById(t);s&&s.scrollIntoView({behavior:"smooth",block:"start"})})}function me(e){e.forEach(t=>{[...t.querySelectorAll(".hero-gallery-img")].forEach(r=>{const n=r.cloneNode(!0);t.appendChild(n)})})}function pe(e){e.forEach(t=>{be(t);const s=ge(t),r=he(s);let n=0,a=0;function i(){ye(t,n),ke(t)}function d(){a++,a===r.length&&i()}r.forEach(l=>{const u=l.querySelector("img");ve(u)?(n+=N(l),d()):u.addEventListener("load",()=>{setTimeout(()=>{n+=N(l),d()},10)})}),Le(t)})}function ge(e){return[...e.querySelectorAll(".hero-gallery-img")]}function he(e){return e.slice(0,e.length/2)}function ve(e){return e.complete&&e.naturalHeight!==0}function N(e){return e.offsetHeight+j}function ye(e,t){const s=t-j;e.style.setProperty("--original-height",`${s}px`)}function be(e){e.style.animationPlayState="paused"}function ke(e){e.style.animationPlayState="running"}function Le(e){if(!Me(e))return;const t=setInterval(()=>{const s=e.style.getPropertyValue("--original-height");s&&(e.style.transform=`translateY(calc(-1 * ${s}))`,clearInterval(t))},50)}function Me(e){return e.closest(".hero-gallery-column-right")}document.addEventListener("DOMContentLoaded",ue);const o={overlay:document.getElementById("artist-modal-overlay"),closeBtn:document.getElementById("modal-close"),detailsContainer:document.getElementById("artist-details"),loader:document.getElementById("loader"),artistsList:document.querySelector(".artists-list")};var O;(O=o.artistsList)==null||O.addEventListener("click",Ee);async function Ee(e){const t=e.target.closest(".artist-link");if(!t)return;const s=t.dataset.id;we(s)}async function we(e){D(),Ie(),Ae(),o.detailsContainer.innerHTML="";try{const t=await J(e);if(!t)return;const s=t.tracksList||[],r={};s.forEach(function(a){const i=a.strAlbum||"Other Tracks";r[i]||(r[i]={strAlbum:i,tracks:[]}),r[i].tracks.push(a)});const n=Object.values(r);Se(t,n)}catch(t){console.error("Помилка при завантаженні даних:",t),I("Error loading artist details")}finally{$e()}}function Se(e,t){const{strArtist:s,strArtistThumb:r,intFormedYear:n,intBornYear:a,intDiedYear:i,strCountry:d,strBiographyEN:l,strGender:u,intMembers:g,genres:b}=e;let h="information missing";const c=n||a;c&&(h=`${c} – ${i&&i!=="null"&&i!==""?i:"present"}`);const _=g&&parseInt(g)>1?`<div class="artistModal-info-item">
         <span class="artistModal-info-label">Members</span>
         <p class="artistModal-info-value">${g}</p>
       </div>`:`<div class="artistModal-info-item">
         <span class="artistModal-info-label">Sex</span>
         <p class="artistModal-info-value">${u||"Not specified"}</p>
       </div>`,U=ee(t);o.detailsContainer.innerHTML=te({artist:e,yearsActive:h,specificInfoMarkup:_,albumsMarkup:U})}function D(){var e,t;(e=o.overlay)==null||e.classList.toggle("is-hidden"),document.body.style.overflow=(t=o.overlay)!=null&&t.classList.contains("is-hidden")?"":"hidden"}function Ae(){var e;(e=o.loader)==null||e.classList.remove("is-hidden")}function $e(){var e;(e=o.loader)==null||e.classList.add("is-hidden")}function M(){D(),Be()}function Y(e){e.code==="Escape"&&M()}function R(e){e.target===o.overlay&&M()}function Ie(){var e,t;(e=o.closeBtn)==null||e.addEventListener("click",M),(t=o.overlay)==null||t.addEventListener("click",R),window.addEventListener("keydown",Y)}function Be(){var e,t;(e=o.closeBtn)==null||e.removeEventListener("click",M),(t=o.overlay)==null||t.removeEventListener("click",R),window.removeEventListener("keydown",Y)}document.getElementById("app-loader");const T=document.querySelector("[data-feedback-open]"),Ce=document.querySelector("[data-feedback-close]"),y=document.querySelector("[data-feedback-backdrop]"),v=document.querySelector(".feedback-form"),L=document.querySelector(".form-error"),$=document.querySelector("[data-rating]");let p=0;function Ne(){y.classList.remove("is-hidden"),document.body.classList.add("modal-open"),v.reset(),p=0,C(p),L.hidden=!0}function E(){var e;y.classList.add("is-hidden"),document.body.classList.remove("modal-open"),(e=document.activeElement)==null||e.blur()}T&&T.addEventListener("click",Ne);Ce.addEventListener("click",E);y.addEventListener("click",e=>{e.target===y&&E()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!y.classList.contains("is-hidden")&&E()});$&&$.addEventListener("click",e=>{e.target.tagName==="BUTTON"&&(p=Number(e.target.dataset.value),C(p))});function C(e){$.querySelectorAll("button").forEach(s=>{s.classList.toggle("is-active",Number(s.dataset.value)<=e)})}function Te({name:e,message:t,rating:s}){return!e||e.length<2||e.length>16?"Name must be between 2 and 16 characters":!t||t.length<10||t.length>512?"Message must be between 10 and 512 characters":!s||s<1||s>5?"Rating must be between 1 and 5":null}v.addEventListener("submit",async e=>{e.preventDefault();const t=v.elements.name.value.trim(),s=v.elements.message.value.trim(),r=p,n=Te({name:t,message:s,rating:r});if(n){L.textContent=n,L.hidden=!1;return}L.hidden=!0;const a={name:t,rating:r,descr:s};try{await postFeedback(a)}finally{v.reset(),p=0,C(0),E()}});
//# sourceMappingURL=index.js.map
