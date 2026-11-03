/* Rumo aos 90 kg — funcionamento offline (versão 7) */
const V="rumo90-v7", EXT="rumo90-ext";
const SHELL=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png"];
const OPT=["./pdf.min.mjs","./pdf.worker.min.mjs"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(V).then(async c=>{ await Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{}))); await Promise.all(OPT.map(u=>c.add(u).catch(()=>{}))); }).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==EXT).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
function idb(){ return new Promise((r,j)=>{ const q=indexedDB.open("rumo90",1);
  q.onupgradeneeded=()=>{ const d=q.result; if(!d.objectStoreNames.contains("kv")) d.createObjectStore("kv"); if(!d.objectStoreNames.contains("blobs")) d.createObjectStore("blobs"); };
  q.onsuccess=()=>r(q.result); q.onerror=()=>j(q.error); }); }
function blob(id){ return idb().then(d=>new Promise((r,j)=>{ const g=d.transaction("blobs","readonly").objectStore("blobs").get(id); g.onsuccess=()=>r(g.result); g.onerror=()=>j(g.error); })); }
function putShared(v){ return idb().then(d=>new Promise((r,j)=>{ const t=d.transaction("kv","readwrite"); t.objectStore("kv").put(v,"shared"); t.oncomplete=()=>r(); t.onerror=()=>j(t.error); })); }
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method==="POST"&&u.origin===location.origin&&u.pathname.endsWith("/share")){
    e.respondWith((async()=>{ try{ const fd=await e.request.formData(); const f=fd.get("file"); if(f&&f.size) await putShared({blob:f,name:f.name,type:f.type}); }catch(err){} return Response.redirect("./#hoje",303); })()); return; }
  if(u.origin===location.origin&&u.pathname.includes("/_blob/")){
    const id=u.pathname.split("/_blob/")[1];
    e.respondWith(blob(id).then(v=>v?new Response(v.blob,{headers:{"content-type":v.type||v.blob.type}}):new Response("",{status:404})).catch(()=>new Response("",{status:404}))); return; }
  if(e.request.method!=="GET") return;
  if(u.origin===location.origin){
    if(e.request.mode==="navigate"||u.pathname.endsWith("/index.html")){
      e.respondWith(fetch(e.request.url,{cache:"no-store"}).then(r=>{ if(r.ok){ const c=r.clone(); caches.open(V).then(x=>x.put("./index.html",c)); } return r; }).catch(()=>caches.match("./index.html"))); return; }
    e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{ if(r.ok){ const c=r.clone(); caches.open(V).then(x=>x.put(e.request,c)); } return r; }))); return; }
  if(/fonts\.(googleapis|gstatic)\.com$|cdnjs\.cloudflare\.com$/.test(u.host)){
    e.respondWith(caches.open(EXT).then(c=>c.match(e.request).then(m=>{ const f=fetch(e.request).then(r=>{ if(r.ok||r.type==="opaque") c.put(e.request,r.clone()); return r; }).catch(()=>m); return m||f; }))); }
});
