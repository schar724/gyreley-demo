if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let a={};const o=e=>i(e,l),t={module:{uri:l},exports:a,require:o};s[l]=Promise.all(n.map((e=>t[e]||o(e)))).then((e=>(r(...e),a)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"d51a3053e9b2e7f8b5bbf2da3d6e4361"},{url:"apple-touch-icon-180x180.png",revision:"a7580efc691d25a85444e34350999949"},{url:"assets/DashboardMap-aU2Q5rk5.js",revision:null},{url:"assets/date-fns-BCQeT5_J.js",revision:null},{url:"assets/g2047-DdK1mvyt.png",revision:null},{url:"assets/headlessui-BJ1NCv23.js",revision:null},{url:"assets/index-BYQPEeeO.js",revision:null},{url:"assets/index-y6Lem-o-.css",revision:null},{url:"assets/map-CcB1rkac.js",revision:null},{url:"assets/pfmanual.lazy-Igp8LOkF.js",revision:null},{url:"assets/react-native-GsF6yjT-.js",revision:null},{url:"assets/tanstack-router-6gikp-PH.js",revision:null},{url:"assets/vendor-BRGH1Yg5.js",revision:null},{url:"assets/zod-ZSsin5GI.js",revision:null},{url:"favicon.ico",revision:"519fb82bf1eb8e4318c97d92b0b7431a"},{url:"g2047.png",revision:"2e363fb11071b212ef9e2a69b93aa777"},{url:"index.html",revision:"205910cd1b48bff9c132ab80dc7b21b4"},{url:"maskable-icon-512x512.png",revision:"b3ebaa23b8f3544deafe9689b705d5a2"},{url:"pwa-192x192.png",revision:"db8dbd737519b14709b8a92a8ca3009f"},{url:"pwa-512x512.png",revision:"8119ba676cd219c4410b728c550655ca"},{url:"pwa-64x64.png",revision:"6937dfae6bda2eeed3dc1274df5373e6"},{url:"registerSW.js",revision:"5e0c944c958314bf5b74db984f160db1"},{url:"manifest.webmanifest",revision:"666c8c962597f6e421a147be06f306c4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/^\/completesignup/]}))}));
