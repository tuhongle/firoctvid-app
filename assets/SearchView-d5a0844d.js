import{d as p,u as S,w as C,r as h,c as q,o as t,a as c,b as n,e as u,F as w,f as y,T as R,M as k,_ as B,p as V,g as a,t as N,i as f,S as g,n as A,h as L}from"./index-2212144c.js";const T=p({__name:"SearchComp",props:{query:{}},async setup(i){let s,l;const o=i,e=S();e.searchResults=[],e.searchResults.push(...([s,l]=C(()=>e.getResults(o.query,1)),s=await s,l(),s));const d=h(null),m=h(1);window.onscroll=async()=>{if(window.scrollY>150?e.showNavbar=!1:e.showNavbar=!0,d.value.getBoundingClientRect().bottom<window.innerHeight){m.value++;const r=await e.getResults(o.query,m.value);r.length&&e.searchResults.push(...r)}};const v=q(()=>e.searchResults.sort((_,r)=>r.popularity-_.popularity));return(_,r)=>(t(),c("div",{class:"row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5",ref_key:"searchCards",ref:d},[n(R,{name:"card",appear:""},{default:u(()=>[(t(!0),c(w,null,y(v.value,(b,x)=>(t(),c("div",{class:"col mb-3",key:x},[n(k,{card:b},null,8,["card"])]))),128))]),_:1})],512))}});const F=B(T,[["__scopeId","data-v-bf82a0c1"]]),M={class:"bg-black text-light py-5",style:{"margin-top":"90px"}},$={class:"container-xl"},D={class:"row gy-3 align-items-center mb-5"},E={class:"col"},G={class:"mb-0"},H={class:"row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"},I=p({__name:"SearchPage",props:{query:{}},setup(i){return(s,l)=>{const o=V("AnimationLoader");return t(),c("main",M,[a("div",$,[a("div",D,[a("div",E,[a("h3",G,'Search results of "'+N(s.query.replace(/%20/g," "))+'"',1)])]),(t(),f(g,null,{fallback:u(()=>[a("div",H,[(t(),c(w,null,y(10,e=>a("div",{class:"col mb-3",key:e,style:{"min-height":"250px !important"}},[n(o)])),64))])]),default:u(()=>[n(F,{query:s.query},null,8,["query"])]),_:1}))])])}}}),Y=p({__name:"SearchView",setup(i){const s=A();return(l,o)=>(t(),f(g,null,{default:u(()=>[n(I,{query:L(s).params.id},null,8,["query"])]),_:1}))}});export{Y as default};
