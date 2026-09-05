(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`H`,`D`,`C`,`S`],t=[`A`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`,`J`,`Q`,`K`];function n(e){return t.indexOf(e)+1}function r(e){let t=n(e);return t>=10?10:t}function i(e){return`${e.rank}${e.suit}`}function a(){let n=[];for(let r of e)for(let e of t)n.push({rank:e,suit:r});return n}function o(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function s(){let e=o(a()),t=e=>[...e].sort((e,t)=>n(e.rank)-n(t.rank));return{spencer:t(e.slice(0,6)),kari:t(e.slice(6,12)),remaining:e.slice(12)}}function c(e){let t=Math.floor(Math.random()*e.length);return{starter:e[t],remaining:[...e.slice(0,t),...e.slice(t+1)]}}function l(e){return e.rank===`J`?{points:2,card:i(e)}:{points:0,card:null}}function u(e,t){if(t===0)return[[]];if(e.length<t)return[];let n=[];for(let r=0;r<=e.length-t;r++)for(let i of u(e.slice(r+1),t-1))n.push([e[r],...i]);return n}function d(e){let t=0,n=[];for(let a=2;a<=e.length;a++)for(let o of u(e,a))o.reduce((e,t)=>e+r(t.rank),0)===15&&(t+=2,n.push(o.map(i)));return{points:t,combos:n}}function f(e){let t=0,n=[];for(let r of u(e,2))r[0].rank===r[1].rank&&(t+=2,n.push(r.map(i)));return{points:t,combos:n}}function p(e){for(let t=e.length;t>=3;t--){let r=[];for(let i of u(e,t)){let e=i.map(e=>n(e.rank)).sort((e,t)=>e-t),t=!0;for(let n=1;n<e.length;n++)if(e[n]!==e[n-1]+1){t=!1;break}t&&r.push(i)}if(r.length>0)return{points:r.reduce((e,t)=>e+t.length,0),combos:r.map(e=>e.map(i))}}return{points:0,combos:[]}}function m(e,t,n){if(e.length<4)return{points:0,combos:[]};let r=e.map(e=>e.suit);if(!r.every(e=>e===r[0]))return{points:0,combos:[]};let a=r[0];return t.suit===a?{points:5,combos:[[...e,t].map(i)]}:n?{points:0,combos:[]}:{points:4,combos:[e.map(i)]}}function h(e,t){for(let n of e)if(n.rank===`J`&&n.suit===t.suit)return{points:1,combos:[[i(n)]]};return{points:0,combos:[]}}function g(e,t,n=!1){let r=[...e,t],i=d(r),a=f(r),o=p(r),s=m(e,t,n),c=h(e,t);return{points:i.points+a.points+o.points+s.points+c.points,breakdown:{fifteens:i,pairs:a,runs:o,flush:s,nobs:c}}}function _(e,t){let i=[...e,t],a=0,o=[],s=i.reduce((e,t)=>e+r(t.rank),0);s===15&&(a+=2,o.push({type:`fifteen`,points:2})),s===31&&(a+=2,o.push({type:`thirtyOne`,points:2}));let c=0;for(let e=i.length-2;e>=0&&i[e].rank===t.rank;e--)c++;if(c>0){let e=c*(c+1);a+=e,o.push({type:`pairs`,count:c+1,points:e})}if(i.length>=3){let e=0;for(let t=i.length;t>=3;t--){let r=i.slice(i.length-t).map(e=>n(e.rank)).sort((e,t)=>e-t),a=!0;for(let e=1;e<r.length;e++)if(r[e]!==r[e-1]+1){a=!1;break}if(a){e=t;break}}e>=3&&(a+=e,o.push({type:`run`,length:e,points:e}))}return{points:a,breakdown:o,runningTotal:s}}function ee(e,t){return e.reduce((e,t)=>e+r(t.rank),0)+r(t.rank)<=31}function te(e,t){let n=new Set(e.map(i)),o=a().filter(e=>!n.has(i(e))),s=u([0,1,2,3,4,5],2),c=[];for(let[n,a]of s){let s=[e[n],e[a]],l=e.filter((e,t)=>t!==n&&t!==a),u=0;for(let e of o)u+=g(l,e,!1).points;let d=u/o.length,f=r(s[0].rank)+r(s[1].rank),p=s[0].rank===s[1].rank,m=f===15,h=s.some(e=>e.rank===`5`),_=0;p&&(_+=2),m&&(_+=2),h&&(_+=1),f>=10&&f<=15&&(_+=.5);let ee=t?_*.7:-_*.5,te=d+ee;c.push({indices:[n,a],kept:l.map(i),discarded:s.map(i),expectedHandValue:+d.toFixed(2),expectedCribValue:+ee.toFixed(2),totalExpectedValue:+te.toFixed(2)})}return c.sort((e,t)=>t.totalExpectedValue-e.totalExpectedValue),{bestDiscard:c[0].indices,bestExpectedValue:c[0].totalExpectedValue,worstDiscard:c[c.length-1].indices,spread:+(c[0].totalExpectedValue-c[c.length-1].totalExpectedValue).toFixed(2),allOptions:c}}function ne(e,t,n){let a=e.filter(e=>n+r(e.rank)<=31);if(a.length===0)return{bestPlay:null,bestScore:0,allOptions:[]};let o=[];for(let e of a){let n=_(t,e),r=n.runningTotal,a=15-r>0&&15-r<=10,s=31-r>0&&31-r<=10,c=r===5||r===10,l=r===21,u=0;c?u+=1.5:a&&(u+=.5),l?u+=1:s&&(u+=.3);let d=n.points-u;o.push({card:i(e),immediatePoints:n.points,defensivePenalty:+u.toFixed(1),adjustedScore:+d.toFixed(1),runningTotalAfter:r})}return o.sort((e,t)=>t.adjustedScore-e.adjustedScore),{bestPlay:o[0].card,bestScore:o[0].immediatePoints,allOptions:o}}function re(e,t){if(e===29)return`perfect_29`;if(e>=24)return`near_perfect`;if(e>=20)return`exceptional`;if(e===0)return`zero_hand`;let n=[];t.flush?.points>=4&&n.push(`flush`),t.nobs?.points>0&&n.push(`nobs`);let r=t.runs?.combos?.length||0,i=t.runs?.combos?.[0]?.length||0;return r>=4?n.push(`double_double_run`):r===2&&i===4?n.push(`double_run_of_4`):r===2?n.push(`double_run`):r===3?n.push(`triple_run`):i>=4?n.push(`run_of_`+i):i===3&&n.push(`run`),t.pairs?.combos?.length>=6?n.push(`four_of_a_kind`):t.pairs?.combos?.length>=3?n.push(`three_of_a_kind`):t.pairs?.points>0&&n.push(`pair`),t.fifteens?.points>0&&n.push(`fifteens`),n.length===0?`simple`:n.join(`_`)}var ie=()=>void 0,ae={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},v=function(e,t){if(!e)throw oe(t)},oe=function(e){return Error(`Firebase Database (`+ae.SDK_VERSION+`) INTERNAL ASSERT FAILED: `+e)},se=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)==55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)==56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},ce=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[n++];t[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[n++],o=e[n++],s=e[n++],c=((i&7)<<18|(a&63)<<12|(o&63)<<6|s&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let a=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return t.join(``)},le={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,get ENCODED_VALS(){return this.ENCODED_VALS_BASE+`+/=`},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+`-_.`},HAS_NATIVE_SUPPORT:typeof atob==`function`,encodeByteArray(e,t){if(!Array.isArray(e))throw Error(`encodeByteArray takes an array as a parameter`);this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let i=e[t],a=t+1<e.length,o=a?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0,l=i>>2,u=(i&3)<<4|o>>4,d=(o&15)<<2|c>>6,f=c&63;s||(f=64,a||(d=64)),r.push(n[l],n[u],n[d],n[f])}return r.join(``)},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(se(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):ce(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let i=n[e.charAt(t++)],a=t<e.length?n[e.charAt(t)]:0;++t;let o=t<e.length?n[e.charAt(t)]:64;++t;let s=t<e.length?n[e.charAt(t)]:64;if(++t,i==null||a==null||o==null||s==null)throw new ue;let c=i<<2|a>>4;if(r.push(c),o!==64){let e=a<<4&240|o>>2;if(r.push(e),s!==64){let e=o<<6&192|s;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},ue=class extends Error{constructor(){super(...arguments),this.name=`DecodeBase64StringError`}},de=function(e){let t=se(e);return le.encodeByteArray(t,!0)},fe=function(e){return de(e).replace(/\./g,``)},pe=function(e){try{return le.decodeString(e,!0)}catch(e){console.error(`base64Decode failed: `,e)}return null};function me(e){return he(void 0,e)}function he(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:e===void 0&&(e={});break;case Array:e=[];break;default:return t}for(let n in t)!t.hasOwnProperty(n)||!ge(n)||(e[n]=he(e[n],t[n]));return e}function ge(e){return e!==`__proto__`}function _e(){if(typeof self<`u`)return self;if(typeof window<`u`)return window;if(typeof global<`u`)return global;throw Error(`Unable to locate global object.`)}var ve=()=>_e().__FIREBASE_DEFAULTS__,ye=()=>{if(typeof process>`u`)return;let e={}.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},be=()=>{if(typeof document>`u`)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&pe(e[1]);return t&&JSON.parse(t)},xe=()=>{try{return ie()||ve()||ye()||be()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Se=e=>xe()?.emulatorHosts?.[e],Ce=e=>{let t=Se(e);if(!t)return;let n=t.lastIndexOf(`:`);if(n<=0||n+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(n+1),10);return t[0]===`[`?[t.substring(1,n-1),r]:[t.substring(0,n),r]},we=()=>xe()?.config,Te=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e==`function`&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}};function Ee(e,t){if(e.uid)throw Error(`The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.`);let n={alg:`none`,type:`JWT`},r=t||`demo-project`,i=e.iat||0,a=e.sub||e.user_id;if(!a)throw Error(`mockUserToken must contain 'sub' or 'user_id' field!`);let o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:a,user_id:a,firebase:{sign_in_provider:`custom`,identities:{}},...e};return[fe(JSON.stringify(n)),fe(JSON.stringify(o)),``].join(`.`)}function De(){return typeof navigator<`u`&&typeof navigator.userAgent==`string`?navigator.userAgent:``}function Oe(){return typeof window<`u`&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function ke(){return typeof navigator==`object`&&navigator.product===`ReactNative`}function Ae(){return ae.NODE_CLIENT===!0||ae.NODE_ADMIN===!0}function je(){try{return typeof indexedDB==`object`}catch{return!1}}function Me(){return new Promise((e,t)=>{try{let n=!0,r=`validate-browser-context-for-indexeddb-analytics-module`,i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||``)}}catch(e){t(e)}})}var Ne=`FirebaseError`,Pe=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Ne,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Fe.prototype.create)}},Fe=class{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?Ie(i,n):`Error`;return new Pe(r,`${this.serviceName}: ${a} (${r}).`,n)}};function Ie(e,t){return e.replace(Le,(e,n)=>{let r=t[n];return r==null?`<${n}?>`:String(r)})}var Le=/\{\$([^}]+)}/g;function Re(e){return JSON.parse(e)}function y(e){return JSON.stringify(e)}var ze=function(e){let t={},n={},r={},i=``;try{let a=e.split(`.`);t=Re(pe(a[0])||``),n=Re(pe(a[1])||``),i=a[2],r=n.d||{},delete n.d}catch{}return{header:t,claims:n,data:r,signature:i}},Be=function(e){let t=ze(e).claims;return!!t&&typeof t==`object`&&t.hasOwnProperty(`iat`)},Ve=function(e){let t=ze(e).claims;return typeof t==`object`&&t.admin===!0};function He(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function Ue(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]}function We(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Ge(e,t,n){let r={};for(let i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function Ke(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let n=e[i],a=t[i];if(qe(n)&&qe(a)){if(!Ke(n,a))return!1}else if(n!==a)return!1}for(let e of r)if(!n.includes(e))return!1;return!0}function qe(e){return typeof e==`object`&&!!e}function Je(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+`=`+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+`=`+encodeURIComponent(r));return t.length?`&`+t.join(`&`):``}var Ye=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||=0;let n=this.W_;if(typeof e==`string`)for(let r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){let t=n[e-3]^n[e-8]^n[e-14]^n[e-16];n[e]=(t<<1|t>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],a=this.chain_[2],o=this.chain_[3],s=this.chain_[4],c,l;for(let e=0;e<80;e++){e<40?e<20?(c=o^i&(a^o),l=1518500249):(c=i^a^o,l=1859775393):e<60?(c=i&a|o&(i|a),l=2400959708):(c=i^a^o,l=3395469782);let t=(r<<5|r>>>27)+c+s+l+n[e]&4294967295;s=o,o=a,a=(i<<30|i>>>2)&4294967295,i=r,r=t}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+o&4294967295,this.chain_[4]=this.chain_[4]+s&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);let n=t-this.blockSize,r=0,i=this.buf_,a=this.inbuf_;for(;r<t;){if(a===0)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if(typeof e==`string`){for(;r<t;)if(i[a]=e.charCodeAt(r),++a,++r,a===this.blockSize){this.compress_(i),a=0;break}}else for(;r<t;)if(i[a]=e[r],++a,++r,a===this.blockSize){this.compress_(i),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){let e=[],t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=t&255,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let r=24;r>=0;r-=8)e[n]=this.chain_[t]>>r&255,++n;return e}};function Xe(e,t){return`${e} failed: ${t} argument `}var Ze=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319){let t=i-55296;r++,v(r<e.length,`Surrogate pair missing trail surrogate.`);let n=e.charCodeAt(r)-56320;i=65536+(t<<10)+n}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},Qe=function(e){let t=0;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};function $e(e){return e&&e._delegate?e._delegate:e}function et(e){try{return(e.startsWith(`http://`)||e.startsWith(`https://`)?new URL(e).hostname:e).endsWith(`.cloudworkstations.dev`)}catch{return!1}}async function tt(e){return(await fetch(e,{credentials:`include`})).ok}var nt=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode=`LAZY`,this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}},rt=`[DEFAULT]`,it=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new Te;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(n)return null;throw e}else if(n)return null;else throw Error(`Service ${this.name} is not available`)}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(ot(e))try{this.getOrInitializeService({instanceIdentifier:rt})}catch{}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch{}}}}clearInstance(e=rt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>`INTERNAL`in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>`_delete`in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rt){return this.instances.has(e)}getOptions(e=rt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(e)&&t.resolve(r);return r}onInit(e,t){let n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);let i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:at(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=rt){return this.component?this.component.multipleInstances?e:rt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!==`EXPLICIT`}};function at(e){return e===rt?void 0:e}function ot(e){return e.instantiationMode===`EAGER`}var st=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new it(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}},ct=[],b;(function(e){e[e.DEBUG=0]=`DEBUG`,e[e.VERBOSE=1]=`VERBOSE`,e[e.INFO=2]=`INFO`,e[e.WARN=3]=`WARN`,e[e.ERROR=4]=`ERROR`,e[e.SILENT=5]=`SILENT`})(b||={});var lt={debug:b.DEBUG,verbose:b.VERBOSE,info:b.INFO,warn:b.WARN,error:b.ERROR,silent:b.SILENT},ut=b.INFO,dt={[b.DEBUG]:`log`,[b.VERBOSE]:`log`,[b.INFO]:`info`,[b.WARN]:`warn`,[b.ERROR]:`error`},ft=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=dt[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)},pt=class{constructor(e){this.name=e,this._logLevel=ut,this._logHandler=ft,this._userLogHandler=null,ct.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in b))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e==`string`?lt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!=`function`)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,b.DEBUG,...e),this._logHandler(this,b.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,b.VERBOSE,...e),this._logHandler(this,b.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,b.INFO,...e),this._logHandler(this,b.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,b.WARN,...e),this._logHandler(this,b.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,b.ERROR,...e),this._logHandler(this,b.ERROR,...e)}},mt=(e,t)=>t.some(t=>e instanceof t),ht,gt;function _t(){return ht||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function vt(){return gt||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var yt=new WeakMap,bt=new WeakMap,xt=new WeakMap,St=new WeakMap,Ct=new WeakMap;function wt(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(At(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return t.then(t=>{t instanceof IDBCursor&&yt.set(t,e)}).catch(()=>{}),Ct.set(t,e),t}function Tt(e){if(bt.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});bt.set(e,t)}var Et={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return bt.get(e);if(t===`objectStoreNames`)return e.objectStoreNames||xt.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return At(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function Dt(e){Et=e(Et)}function Ot(e){return e===IDBDatabase.prototype.transaction&&!(`objectStoreNames`in IDBTransaction.prototype)?function(t,...n){let r=e.call(jt(this),t,...n);return xt.set(r,t.sort?t.sort():[t]),At(r)}:vt().includes(e)?function(...t){return e.apply(jt(this),t),At(yt.get(this))}:function(...t){return At(e.apply(jt(this),t))}}function kt(e){return typeof e==`function`?Ot(e):(e instanceof IDBTransaction&&Tt(e),mt(e,_t())?new Proxy(e,Et):e)}function At(e){if(e instanceof IDBRequest)return wt(e);if(St.has(e))return St.get(e);let t=kt(e);return t!==e&&(St.set(e,t),Ct.set(t,e)),t}var jt=e=>Ct.get(e);function Mt(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=At(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(At(o.result),e.oldVersion,e.newVersion,At(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var Nt=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],Pt=[`put`,`add`,`delete`,`clear`],Ft=new Map;function It(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(Ft.get(t))return Ft.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=Pt.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Nt.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return Ft.set(t,a),a}Dt(e=>({...e,get:(t,n,r)=>It(t,n)||e.get(t,n,r),has:(t,n)=>!!It(t,n)||e.has(t,n)}));var Lt=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Rt(e)){let t=e.getImmediate();return`${t.library}/${t.version}`}else return null}).filter(e=>e).join(` `)}};function Rt(e){return e.getComponent()?.type===`VERSION`}var zt=`@firebase/app`,Bt=`0.14.10`,Vt=new pt(`@firebase/app`),Ht=`@firebase/app-compat`,Ut=`@firebase/analytics-compat`,Wt=`@firebase/analytics`,Gt=`@firebase/app-check-compat`,Kt=`@firebase/app-check`,qt=`@firebase/auth`,Jt=`@firebase/auth-compat`,Yt=`@firebase/database`,Xt=`@firebase/data-connect`,Zt=`@firebase/database-compat`,Qt=`@firebase/functions`,$t=`@firebase/functions-compat`,en=`@firebase/installations`,tn=`@firebase/installations-compat`,nn=`@firebase/messaging`,rn=`@firebase/messaging-compat`,an=`@firebase/performance`,on=`@firebase/performance-compat`,sn=`@firebase/remote-config`,cn=`@firebase/remote-config-compat`,ln=`@firebase/storage`,un=`@firebase/storage-compat`,dn=`@firebase/firestore`,fn=`@firebase/ai`,pn=`@firebase/firestore-compat`,mn=`firebase`,hn=`12.11.0`,gn=`[DEFAULT]`,_n={[zt]:`fire-core`,[Ht]:`fire-core-compat`,[Wt]:`fire-analytics`,[Ut]:`fire-analytics-compat`,[Kt]:`fire-app-check`,[Gt]:`fire-app-check-compat`,[qt]:`fire-auth`,[Jt]:`fire-auth-compat`,[Yt]:`fire-rtdb`,[Xt]:`fire-data-connect`,[Zt]:`fire-rtdb-compat`,[Qt]:`fire-fn`,[$t]:`fire-fn-compat`,[en]:`fire-iid`,[tn]:`fire-iid-compat`,[nn]:`fire-fcm`,[rn]:`fire-fcm-compat`,[an]:`fire-perf`,[on]:`fire-perf-compat`,[sn]:`fire-rc`,[cn]:`fire-rc-compat`,[ln]:`fire-gcs`,[un]:`fire-gcs-compat`,[dn]:`fire-fst`,[pn]:`fire-fst-compat`,[fn]:`fire-vertex`,"fire-js":`fire-js`,[mn]:`fire-js-all`},vn=new Map,yn=new Map,bn=new Map;function xn(e,t){try{e.container.addComponent(t)}catch(n){Vt.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Sn(e){let t=e.name;if(bn.has(t))return Vt.debug(`There were multiple attempts to register component ${t}.`),!1;bn.set(t,e);for(let t of vn.values())xn(t,e);for(let t of yn.values())xn(t,e);return!0}function Cn(e,t){let n=e.container.getProvider(`heartbeat`).getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function wn(e){return e==null?!1:e.settings!==void 0}var Tn=new Fe(`app`,`Firebase`,{"no-app":`No Firebase App '{$appName}' has been created - call initializeApp() first`,"bad-app-name":`Illegal App name: '{$appName}'`,"duplicate-app":`Firebase App named '{$appName}' already exists with different options or config`,"app-deleted":`Firebase App named '{$appName}' already deleted`,"server-app-deleted":`Firebase Server App has been deleted`,"no-options":`Need to provide options, when not being deployed to hosting via source.`,"invalid-app-argument":`firebase.{$appName}() takes either no argument or a Firebase App instance.`,"invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":`Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.`,"idb-get":`Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.`,"idb-set":`Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.`,"idb-delete":`Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.`,"finalization-registry-not-supported":`FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.`,"invalid-server-app-environment":`FirebaseServerApp is not for use in browser environments.`}),En=class{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new nt(`app`,()=>this,`PUBLIC`))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Tn.create(`app-deleted`,{appName:this._name})}},Dn=hn;function On(e,t={}){let n=e;typeof t!=`object`&&(t={name:t});let r={name:gn,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!=`string`||!i)throw Tn.create(`bad-app-name`,{appName:String(i)});if(n||=we(),!n)throw Tn.create(`no-options`);let a=vn.get(i);if(a){if(Ke(n,a.options)&&Ke(r,a.config))return a;throw Tn.create(`duplicate-app`,{appName:i})}let o=new st(i);for(let e of bn.values())o.addComponent(e);let s=new En(n,r,o);return vn.set(i,s),s}function kn(e=gn){let t=vn.get(e);if(!t&&e===`[DEFAULT]`&&we())return On();if(!t)throw Tn.create(`no-app`,{appName:e});return t}function An(e,t,n){let r=_n[e]??e;n&&(r+=`-${n}`);let i=r.match(/\s|\//),a=t.match(/\s|\//);if(i||a){let e=[`Unable to register library "${r}" with version "${t}":`];i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&a&&e.push(`and`),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Vt.warn(e.join(` `));return}Sn(new nt(`${r}-version`,()=>({library:r,version:t}),`VERSION`))}var jn=`firebase-heartbeat-database`,Mn=1,Nn=`firebase-heartbeat-store`,Pn=null;function Fn(){return Pn||=Mt(jn,Mn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Nn)}catch(e){console.warn(e)}}}}).catch(e=>{throw Tn.create(`idb-open`,{originalErrorMessage:e.message})}),Pn}async function In(e){try{let t=(await Fn()).transaction(Nn),n=await t.objectStore(Nn).get(Rn(e));return await t.done,n}catch(e){if(e instanceof Pe)Vt.warn(e.message);else{let t=Tn.create(`idb-get`,{originalErrorMessage:e?.message});Vt.warn(t.message)}}}async function Ln(e,t){try{let n=(await Fn()).transaction(Nn,`readwrite`);await n.objectStore(Nn).put(t,Rn(e)),await n.done}catch(e){if(e instanceof Pe)Vt.warn(e.message);else{let t=Tn.create(`idb-set`,{originalErrorMessage:e?.message});Vt.warn(t.message)}}}function Rn(e){return`${e.name}!${e.options.appId}`}var zn=1024,Bn=30,Vn=class{constructor(e){this.container=e,this._heartbeatsCache=null,this._storage=new Wn(this.container.getProvider(`app`).getImmediate()),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{let e=this.container.getProvider(`platform-logger`).getImmediate().getPlatformInfoString(),t=Hn();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>Bn){let e=Kn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Vt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return``;let e=Hn(),{heartbeatsToSend:t,unsentEntries:n}=Un(this._heartbeatsCache.heartbeats),r=fe(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Vt.warn(e),``}}};function Hn(){return new Date().toISOString().substring(0,10)}function Un(e,t=zn){let n=[],r=e.slice();for(let i of e){let e=n.find(e=>e.agent===i.agent);if(!e){if(n.push({agent:i.agent,dates:[i.date]}),Gn(n)>t){n.pop();break}}else if(e.dates.push(i.date),Gn(n)>t){e.dates.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var Wn=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return je()?Me().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let e=await In(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return Ln(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return Ln(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}else return}};function Gn(e){return fe(JSON.stringify({version:2,heartbeats:e})).length}function Kn(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}function qn(e){Sn(new nt(`platform-logger`,e=>new Lt(e),`PRIVATE`)),Sn(new nt(`heartbeat`,e=>new Vn(e),`PRIVATE`)),An(zt,Bt,e),An(zt,Bt,`esm2020`),An(`fire-js`,``)}qn(``),An(`firebase`,`12.11.0`,`app`);var Jn=`@firebase/database`,Yn=`1.1.2`,Xn=``;function Zn(e){Xn=e}var Qn=class{constructor(e){this.domStorage_=e,this.prefix_=`firebase:`}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),y(t))}get(e){let t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Re(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}},$n=class{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return He(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}},er=function(e){try{if(typeof window<`u`&&window[e]!==void 0){let t=window[e];return t.setItem(`firebase:sentinel`,`cache`),t.removeItem(`firebase:sentinel`),new Qn(t)}}catch{}return new $n},tr=er(`localStorage`),nr=er(`sessionStorage`),rr=new pt(`@firebase/database`),ir=(function(){let e=1;return function(){return e++}})(),ar=function(e){let t=Ze(e),n=new Ye;n.update(t);let r=n.digest();return le.encodeByteArray(r)},or=function(...e){let t=``;for(let n=0;n<e.length;n++){let r=e[n];Array.isArray(r)||r&&typeof r==`object`&&typeof r.length==`number`?t+=or.apply(null,r):typeof r==`object`?t+=y(r):t+=r,t+=` `}return t},sr=null,cr=!0,lr=function(e,t){v(!t||e===!0||e===!1,`Can't turn on custom loggers persistently.`),e===!0?(rr.logLevel=b.VERBOSE,sr=rr.log.bind(rr),t&&nr.set(`logging_enabled`,!0)):typeof e==`function`?sr=e:(sr=null,nr.remove(`logging_enabled`))},x=function(...e){if(cr===!0&&(cr=!1,sr===null&&nr.get(`logging_enabled`)===!0&&lr(!0)),sr){let t=or.apply(null,e);sr(t)}},ur=function(e){return function(...t){x(e,...t)}},dr=function(...e){let t=`FIREBASE INTERNAL ERROR: `+or(...e);rr.error(t)},fr=function(...e){let t=`FIREBASE FATAL ERROR: ${or(...e)}`;throw rr.error(t),Error(t)},S=function(...e){let t=`FIREBASE WARNING: `+or(...e);rr.warn(t)},pr=function(){typeof window<`u`&&window.location&&window.location.protocol&&window.location.protocol.indexOf(`https:`)!==-1&&S(`Insecure Firebase access from a secure page. Please use https in calls to new Firebase().`)},mr=function(e){return typeof e==`number`&&(e!==e||e===1/0||e===-1/0)},hr=function(e){if(Ae()||document.readyState===`complete`)e();else{let t=!1,n=function(){if(!document.body){setTimeout(n,10);return}t||(t=!0,e())};document.addEventListener?(document.addEventListener(`DOMContentLoaded`,n,!1),window.addEventListener(`load`,n,!1)):document.attachEvent&&(document.attachEvent(`onreadystatechange`,()=>{document.readyState===`complete`&&n()}),window.attachEvent(`onload`,n))}},gr=`[MIN_NAME]`,_r=`[MAX_NAME]`,vr=function(e,t){if(e===t)return 0;if(e===gr||t===_r)return-1;if(t===gr||e===_r)return 1;{let n=Ar(e),r=Ar(t);return n===null?r===null&&e<t?-1:1:r===null?-1:n-r===0?e.length-t.length:n-r}},yr=function(e,t){return e===t?0:e<t?-1:1},br=function(e,t){if(t&&e in t)return t[e];throw Error(`Missing required key (`+e+`) in object: `+y(t))},xr=function(e){if(typeof e!=`object`||!e)return y(e);let t=[];for(let n in e)t.push(n);t.sort();let n=`{`;for(let r=0;r<t.length;r++)r!==0&&(n+=`,`),n+=y(t[r]),n+=`:`,n+=xr(e[t[r]]);return n+=`}`,n},Sr=function(e,t){let n=e.length;if(n<=t)return[e];let r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function C(e,t){for(let n in e)e.hasOwnProperty(n)&&t(n,e[n])}var Cr=function(e){v(!mr(e),`Invalid JSON number`);let t=1023,n,r,i,a,o;e===0?(r=0,i=0,n=1/e==-1/0?1:0):(n=e<0,e=Math.abs(e),e>=2**(1-t)?(a=Math.min(Math.floor(Math.log(e)/Math.LN2),t),r=a+t,i=Math.round(e*2**(52-a)-2**52)):(r=0,i=Math.round(e/2**(1-t-52))));let s=[];for(o=52;o;--o)s.push(i%2?1:0),i=Math.floor(i/2);for(o=11;o;--o)s.push(r%2?1:0),r=Math.floor(r/2);s.push(n?1:0),s.reverse();let c=s.join(``),l=``;for(o=0;o<64;o+=8){let e=parseInt(c.substr(o,8),2).toString(16);e.length===1&&(e=`0`+e),l+=e}return l.toLowerCase()},wr=function(){return!!(typeof window==`object`&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Tr=function(){return typeof Windows==`object`&&typeof Windows.UI==`object`};function Er(e,t){let n=`Unknown Error`;e===`too_big`?n=`The data requested exceeds the maximum size that can be accessed with a single request.`:e===`permission_denied`?n=`Client doesn't have permission to access the desired data.`:e===`unavailable`&&(n=`The service is unavailable`);let r=Error(e+` at `+t._path.toString()+`: `+n);return r.code=e.toUpperCase(),r}var Dr=RegExp(`^-?(0*)\\d{1,10}$`),Or=-2147483648,kr=2147483647,Ar=function(e){if(Dr.test(e)){let t=Number(e);if(t>=Or&&t<=kr)return t}return null},jr=function(e){try{e()}catch(e){setTimeout(()=>{throw S(`Exception was thrown by user callback.`,e.stack||``),e},0)}},Mr=function(){return(typeof window==`object`&&window.navigator&&window.navigator.userAgent||``).search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Nr=function(e,t){let n=setTimeout(e,t);return typeof n==`number`&&typeof Deno<`u`&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n==`object`&&n.unref&&n.unref(),n},Pr=class{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,wn(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(e=>this.appCheck=e)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){S(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}},Fr=class{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(e=>this.auth_=e)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(e=>e&&e.code===`auth/token-not-initialized`?(x(`Got auth/token-not-initialized error.  Treating as null token.`),null):Promise.reject(e)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e=`Provided authentication credentials for the app named "`+this.appName_+`" are invalid. This usually indicates your app was not initialized correctly. `;`credential`in this.firebaseOptions_?e+=`Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.`:`serviceAccount`in this.firebaseOptions_?e+=`Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.`:e+=`Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.`,S(e)}},Ir=class{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}};Ir.OWNER=`owner`;var Lr=`5`,Rr=`v`,zr=`s`,Br=`r`,Vr=`f`,Hr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Ur=`ls`,Wr=`p`,Gr=`ac`,Kr=`websocket`,qr=`long_polling`,Jr=class{constructor(e,t,n,r,i=!1,a=``,o=!1,s=!1,c=null){this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=a,this.includeNamespaceInQueryParams=o,this.isUsingEmulator=s,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(`.`)+1),this.internalHost=tr.get(`host:`+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)===`s-`}isCustomHost(){return this._domain!==`firebaseio.com`&&this._domain!==`firebaseio-demo.com`}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&tr.set(`host:`+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+=`<`+this.persistenceKey+`>`),e}toURLString(){let e=this.secure?`https://`:`http://`,t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:``;return`${e}${this.host}/${t}`}};function Yr(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams}function Xr(e,t,n){v(typeof t==`string`,`typeof type must == string`),v(typeof n==`object`,`typeof params must == object`);let r;if(t===Kr)r=(e.secure?`wss://`:`ws://`)+e.internalHost+`/.ws?`;else if(t===qr)r=(e.secure?`https://`:`http://`)+e.internalHost+`/.lp?`;else throw Error(`Unknown connection type: `+t);Yr(e)&&(n.ns=e.namespace);let i=[];return C(n,(e,t)=>{i.push(e+`=`+t)}),r+i.join(`&`)}var Zr=class{constructor(){this.counters_={}}incrementCounter(e,t=1){He(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return me(this.counters_)}},Qr={},$r={};function ei(e){let t=e.toString();return Qr[t]||(Qr[t]=new Zr),Qr[t]}function ti(e,t){let n=e.toString();return $r[n]||($r[n]=t()),$r[n]}var ni=class{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){let e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&jr(()=>{this.onMessage_(e[t])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&=(this.onClose(),null);break}this.currentResponseNum++}}},ri=`start`,ii=`close`,ai=`pLPCommand`,oi=`pRTLPCB`,si=`id`,ci=`pw`,li=`ser`,ui=`cb`,di=`dframe`,fi=1870,pi=30,mi=fi-pi,hi=25e3,gi=3e4,_i=class e{constructor(e,t,n,r,i,a,o){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=a,this.lastSessionId=o,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ur(e),this.stats_=ei(t),this.urlFn=e=>(this.appCheckToken&&(e[Gr]=this.appCheckToken),Xr(t,qr,e))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ni(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_(`Timed out trying to connect.`),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(gi)),hr(()=>{if(this.isClosed_)return;this.scriptTagHolder=new vi((...e)=>{let[t,n,r,i,a]=e;if(this.incrementIncomingBytes_(e),this.scriptTagHolder)if(this.connectTimeoutTimer_&&=(clearTimeout(this.connectTimeoutTimer_),null),this.everConnected_=!0,t===ri)this.id=n,this.password=r;else if(t===ii)n?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(n,()=>{this.onClosed_()})):this.onClosed_();else throw Error(`Unrecognized command received: `+t)},(...e)=>{let[t,n]=e;this.incrementIncomingBytes_(e),this.myPacketOrderer.handleResponse(t,n)},()=>{this.onClosed_()},this.urlFn);let e={};e[ri]=`t`,e[li]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(e[ui]=this.scriptTagHolder.uniqueCallbackIdentifier),e[Rr]=Lr,this.transportSessionId&&(e[zr]=this.transportSessionId),this.lastSessionId&&(e[Ur]=this.lastSessionId),this.applicationId&&(e[Wr]=this.applicationId),this.appCheckToken&&(e[Gr]=this.appCheckToken),typeof location<`u`&&location.hostname&&Hr.test(location.hostname)&&(e[Br]=Vr);let t=this.urlFn(e);this.log_(`Connecting via long-poll to `+t),this.scriptTagHolder.addTag(t,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){e.forceAllow_=!0}static forceDisallow(){e.forceDisallow_=!0}static isAvailable(){return Ae()?!1:e.forceAllow_?!0:!e.forceDisallow_&&typeof document<`u`&&document.createElement!=null&&!wr()&&!Tr()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&=(this.scriptTagHolder.close(),null),this.myDisconnFrame&&=(document.body.removeChild(this.myDisconnFrame),null),this.connectTimeoutTimer_&&=(clearTimeout(this.connectTimeoutTimer_),null)}onClosed_(){this.isClosed_||(this.log_(`Longpoll is closing itself`),this.shutdown_(),this.onDisconnect_&&=(this.onDisconnect_(this.everConnected_),null))}close(){this.isClosed_||(this.log_(`Longpoll is being closed.`),this.shutdown_())}send(e){let t=y(e);this.bytesSent+=t.length,this.stats_.incrementCounter(`bytes_sent`,t.length);let n=Sr(de(t),mi);for(let e=0;e<n.length;e++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,n.length,n[e]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if(Ae())return;this.myDisconnFrame=document.createElement(`iframe`);let n={};n[di]=`t`,n[si]=e,n[ci]=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display=`none`,document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){let t=y(e).length;this.bytesReceived+=t,this.stats_.incrementCounter(`bytes_received`,t)}},vi=class e{constructor(t,n,r,i){if(this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0,Ae())this.commandCB=t,this.onMessageCB=n;else{this.uniqueCallbackIdentifier=ir(),window[ai+this.uniqueCallbackIdentifier]=t,window[oi+this.uniqueCallbackIdentifier]=n,this.myIFrame=e.createIFrame_();let r=``;this.myIFrame.src&&this.myIFrame.src.substr(0,11)===`javascript:`&&(r=`<script>document.domain="`+document.domain+`";<\/script>`);let i=`<html><body>`+r+`</body></html>`;try{this.myIFrame.doc.open(),this.myIFrame.doc.write(i),this.myIFrame.doc.close()}catch(e){x(`frame writing exception`),e.stack&&x(e.stack),x(e)}}}static createIFrame_(){let e=document.createElement(`iframe`);if(e.style.display=`none`,document.body){document.body.appendChild(e);try{e.contentWindow.document||x(`No IE domain setting required`)}catch{e.src=`javascript:void((function(){document.open();document.domain='`+document.domain+`';document.close();})())`}}else throw`Document body has not initialized. Wait to initialize Firebase until after the document is ready.`;return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent=``,setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},0));let e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;let e={};e[si]=this.myID,e[ci]=this.myPW,e[li]=this.currentSerial;let t=this.urlFn(e),n=``,r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+pi+n.length<=fi;){let e=this.pendingSegs.shift();n=n+`&seg`+r+`=`+e.seg+`&ts`+r+`=`+e.ts+`&d`+r+`=`+e.d,r++}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);let n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(hi));this.addTag(e,()=>{clearTimeout(r),n()})}addTag(e,t){Ae()?this.doNodeLongPoll(e,t):setTimeout(()=>{try{if(!this.sendNewPolls)return;let n=this.myIFrame.doc.createElement(`script`);n.type=`text/javascript`,n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){let e=n.readyState;(!e||e===`loaded`||e===`complete`)&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{x(`Long-poll script failed to load: `+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch{}},1)}},yi=16384,bi=45e3,xi=null;typeof MozWebSocket<`u`?xi=MozWebSocket:typeof WebSocket<`u`&&(xi=WebSocket);var Si=class e{constructor(t,n,r,i,a,o,s){this.connId=t,this.applicationId=r,this.appCheckToken=i,this.authToken=a,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ur(this.connId),this.stats_=ei(n),this.connURL=e.connectionURL_(n,o,s,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,t,n,r,i){let a={};return a[Rr]=Lr,!Ae()&&typeof location<`u`&&location.hostname&&Hr.test(location.hostname)&&(a[Br]=Vr),t&&(a[zr]=t),n&&(a[Ur]=n),r&&(a[Gr]=r),i&&(a[Wr]=i),Xr(e,Kr,a)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_(`Websocket connecting to `+this.connURL),this.everConnected_=!1,tr.set(`previous_websocket_failure`,!0);try{let e;if(Ae()){let t=this.nodeAdmin?`AdminNode`:`Node`;e={headers:{"User-Agent":`Firebase/${Lr}/${Xn}/${process.platform}/${t}`,"X-Firebase-GMPID":this.applicationId||``}},this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(e.headers[`X-Firebase-AppCheck`]=this.appCheckToken);let n={},r=this.connURL.indexOf(`wss://`)===0?n.HTTPS_PROXY||n.https_proxy:n.HTTP_PROXY||n.http_proxy;r&&(e.proxy={origin:r})}this.mySock=new xi(this.connURL,[],e)}catch(e){this.log_(`Error instantiating WebSocket.`);let t=e.message||e.data;t&&this.log_(t),this.onClosed_();return}this.mySock.onopen=()=>{this.log_(`Websocket connected.`),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_(`Websocket connection was disconnected.`),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_(`WebSocket error.  Closing connection.`);let t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){e.forceDisallow_=!0}static isAvailable(){let t=!1;if(typeof navigator<`u`&&navigator.userAgent){let e=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);e&&e.length>1&&parseFloat(e[1])<4.4&&(t=!0)}return!t&&xi!==null&&!e.forceDisallow_}static previouslyFailed(){return tr.isInMemoryStorage||tr.get(`previous_websocket_failure`)===!0}markConnectionHealthy(){tr.remove(`previous_websocket_failure`)}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){let e=this.frames.join(``);this.frames=null;let t=Re(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(v(this.frames===null,`We already have a frame buffer`),e.length<=6){let t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;let t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter(`bytes_received`,t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{let e=this.extractFrameCount_(t);e!==null&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();let t=y(e);this.bytesSent+=t.length,this.stats_.incrementCounter(`bytes_sent`,t.length);let n=Sr(t,yi);n.length>1&&this.sendString_(String(n.length));for(let e=0;e<n.length;e++)this.sendString_(n[e])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&=(clearInterval(this.keepaliveTimer),null),this.mySock&&=(this.mySock.close(),null)}onClosed_(){this.isClosed_||(this.log_(`WebSocket is closing itself`),this.shutdown_(),this.onDisconnect&&=(this.onDisconnect(this.everConnected_),null))}close(){this.isClosed_||(this.log_(`WebSocket is being closed`),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_(`0`),this.resetKeepAlive()},Math.floor(bi))}sendString_(e){try{this.mySock.send(e)}catch(e){this.log_(`Exception thrown from WebSocket.send():`,e.message||e.data,`Closing connection.`),setTimeout(this.onClosed_.bind(this),0)}}};Si.responsesRequiredToBeHealthy=2,Si.healthyTimeout=3e4;var Ci=class e{static get ALL_TRANSPORTS(){return[_i,Si]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(t){let n=Si&&Si.isAvailable(),r=n&&!Si.previouslyFailed();if(t.webSocketOnly&&(n||S(`wss:// URL used, but browser isn't known to support websockets.  Trying anyway.`),r=!0),r)this.transports_=[Si];else{let t=this.transports_=[];for(let n of e.ALL_TRANSPORTS)n&&n.isAvailable()&&t.push(n);e.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw Error(`No transports available`)}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}};Ci.globalTransportInitialized_=!1;var wi=6e4,Ti=5e3,Ei=10*1024,Di=100*1024,Oi=`t`,ki=`d`,Ai=`s`,ji=`r`,Mi=`e`,Ni=`o`,Pi=`a`,Fi=`n`,Ii=`p`,Li=`h`,Ri=class{constructor(e,t,n,r,i,a,o,s,c,l){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=a,this.onReady_=o,this.onDisconnect_=s,this.onKill_=c,this.lastSessionId=l,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ur(`c:`+this.id+`:`),this.transportManager_=new Ci(t),this.log_(`Connection created`),this.start_()}start_(){let e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},0);let r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Nr(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Di?(this.log_(`Connection exceeded healthy timeout but has received `+this.conn_.bytesReceived+` bytes.  Marking connection healthy.`),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Ei?this.log_(`Connection exceeded healthy timeout but has sent `+this.conn_.bytesSent+` bytes.  Leaving connection alive.`):(this.log_(`Closing unhealthy connection after timeout.`),this.close()))},Math.floor(r)))}nextTransportId_(){return`c:`+this.id+`:`+ this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_(`Secondary connection lost.`),this.onSecondaryConnectionLost_()):this.log_(`closing an old connection`)}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_(`message on old connection`))}}sendRequest(e){let t={t:`d`,d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_(`cleaning up and promoting a connection: `+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Oi in e){let t=e[Oi];t===Pi?this.upgradeIfSecondaryHealthy_():t===ji?(this.log_(`Got a reset on secondary, closing it`),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Ni&&(this.log_(`got pong on secondary.`),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){let t=br(`t`,e),n=br(`d`,e);if(t===`c`)this.onSecondaryControl_(n);else if(t===`d`)this.pendingDataMessages.push(n);else throw Error(`Unknown protocol layer: `+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_(`Secondary connection is healthy.`),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_(`sending ping on secondary.`),this.secondaryConn_.send({t:`c`,d:{t:Ii,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_(`sending client ack on secondary`),this.secondaryConn_.send({t:`c`,d:{t:Pi,d:{}}}),this.log_(`Ending transmission on primary`),this.conn_.send({t:`c`,d:{t:Fi,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){let t=br(`t`,e),n=br(`d`,e);t===`c`?this.onControl_(n):t===`d`&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_(`Primary connection is healthy.`),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){let t=br(Oi,e);if(ki in e){let n=e[ki];if(t===Li){let e={...n};this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if(t===Fi){this.log_(`recvd end transmission on primary`),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Ai?this.onConnectionShutdown_(n):t===ji?this.onReset_(n):t===Mi?dr(`Server Error: `+n):t===Ni?(this.log_(`got pong on primary.`),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):dr(`Unknown control packet command: `+t)}}onHandshake_(e){let t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Lr!==n&&S(`Protocol version mismatch detected`),this.tryStartUpgrade_())}tryStartUpgrade_(){let e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),Nr(()=>{this.secondaryConn_&&(this.log_(`Timed out trying to upgrade.`),this.secondaryConn_.close())},Math.floor(wi))}onReset_(e){this.log_(`Reset packet received.  New host: `+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_(`Realtime connection established.`),this.conn_=e,this.state_=1,this.onReady_&&=(this.onReady_(t,this.sessionId),null),this.primaryResponsesRequired_===0?(this.log_(`Primary connection is healthy.`),this.isHealthy_=!0):Nr(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Ti))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_(`sending ping on primary.`),this.sendData_({t:`c`,d:{t:Ii,d:{}}}))}onSecondaryConnectionLost_(){let e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_(`Realtime connection failed.`),this.repoInfo_.isCacheableHost()&&(tr.remove(`host:`+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_(`Realtime connection lost.`),this.close()}onConnectionShutdown_(e){this.log_(`Connection shutdown command received. Shutting down...`),this.onKill_&&=(this.onKill_(e),null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw`Connection is not connected`;this.tx_.send(e)}close(){this.state_!==2&&(this.log_(`Closing realtime connection.`),this.state_=2,this.closeConnections_(),this.onDisconnect_&&=(this.onDisconnect_(),null))}closeConnections_(){this.log_(`Shutting down all connections`),this.conn_&&=(this.conn_.close(),null),this.secondaryConn_&&=(this.secondaryConn_.close(),null),this.healthyTimeout_&&=(clearTimeout(this.healthyTimeout_),null)}},zi=class{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}},Bi=class{constructor(e){this.allowedEvents_=e,this.listeners_={},v(Array.isArray(e)&&e.length>0,`Requires a non-empty array`)}trigger(e,...t){if(Array.isArray(this.listeners_[e])){let n=[...this.listeners_[e]];for(let e=0;e<n.length;e++)n[e].callback.apply(n[e].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});let r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);let r=this.listeners_[e]||[];for(let e=0;e<r.length;e++)if(r[e].callback===t&&(!n||n===r[e].context)){r.splice(e,1);return}}validateEventType_(e){v(this.allowedEvents_.find(t=>t===e),`Unknown event: `+e)}},Vi=class e extends Bi{static getInstance(){return new e}constructor(){super([`online`]),this.online_=!0,typeof window<`u`&&window.addEventListener!==void 0&&!Oe()&&(window.addEventListener(`online`,()=>{this.online_||(this.online_=!0,this.trigger(`online`,!0))},!1),window.addEventListener(`offline`,()=>{this.online_&&(this.online_=!1,this.trigger(`online`,!1))},!1))}getInitialEvent(e){return v(e===`online`,`Unknown event type: `+e),[this.online_]}currentlyOnline(){return this.online_}},Hi=32,Ui=768,w=class{constructor(e,t){if(t===void 0){this.pieces_=e.split(`/`);let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e=``;for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==``&&(e+=`/`+this.pieces_[t]);return e||`/`}};function T(){return new w(``)}function E(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function Wi(e){return e.pieces_.length-e.pieceNum_}function D(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new w(e.pieces_,t)}function Gi(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function Ki(e){let t=``;for(let n=e.pieceNum_;n<e.pieces_.length;n++)e.pieces_[n]!==``&&(t+=`/`+encodeURIComponent(String(e.pieces_[n])));return t||`/`}function qi(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function Ji(e){if(e.pieceNum_>=e.pieces_.length)return null;let t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new w(t,0)}function O(e,t){let n=[];for(let t=e.pieceNum_;t<e.pieces_.length;t++)n.push(e.pieces_[t]);if(t instanceof w)for(let e=t.pieceNum_;e<t.pieces_.length;e++)n.push(t.pieces_[e]);else{let e=t.split(`/`);for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new w(n,0)}function k(e){return e.pieceNum_>=e.pieces_.length}function A(e,t){let n=E(e),r=E(t);if(n===null)return t;if(n===r)return A(D(e),D(t));throw Error(`INTERNAL ERROR: innerPath (`+t+`) is not within outerPath (`+e+`)`)}function Yi(e,t){let n=qi(e,0),r=qi(t,0);for(let e=0;e<n.length&&e<r.length;e++){let t=vr(n[e],r[e]);if(t!==0)return t}return n.length===r.length?0:n.length<r.length?-1:1}function Xi(e,t){if(Wi(e)!==Wi(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function Zi(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(Wi(e)>Wi(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}var Qi=class{constructor(e,t){this.errorPrefix_=t,this.parts_=qi(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let e=0;e<this.parts_.length;e++)this.byteLength_+=Qe(this.parts_[e]);ta(this)}};function $i(e,t){e.parts_.length>0&&(e.byteLength_+=1),e.parts_.push(t),e.byteLength_+=Qe(t),ta(e)}function ea(e){let t=e.parts_.pop();e.byteLength_-=Qe(t),e.parts_.length>0&&--e.byteLength_}function ta(e){if(e.byteLength_>Ui)throw Error(e.errorPrefix_+`has a key path longer than 768 bytes (`+e.byteLength_+`).`);if(e.parts_.length>Hi)throw Error(e.errorPrefix_+`path specified exceeds the maximum depth that can be written (32) or object contains a cycle `+na(e))}function na(e){return e.parts_.length===0?``:`in property '`+e.parts_.join(`.`)+`'`}var ra=class e extends Bi{static getInstance(){return new e}constructor(){super([`visible`]);let e,t;typeof document<`u`&&document.addEventListener!==void 0&&(document.hidden===void 0?document.mozHidden===void 0?document.msHidden===void 0?document.webkitHidden!==void 0&&(t=`webkitvisibilitychange`,e=`webkitHidden`):(t=`msvisibilitychange`,e=`msHidden`):(t=`mozvisibilitychange`,e=`mozHidden`):(t=`visibilitychange`,e=`hidden`)),this.visible_=!0,t&&document.addEventListener(t,()=>{let t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger(`visible`,t))},!1)}getInitialEvent(e){return v(e===`visible`,`Unknown event type: `+e),[this.visible_]}},ia=1e3,aa=300*1e3,oa=30*1e3,sa=1.3,ca=3e4,la=`server_kill`,ua=3,da=class e extends zi{constructor(t,n,r,i,a,o,s,c){if(super(),this.repoInfo_=t,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=a,this.authTokenProvider_=o,this.appCheckTokenProvider_=s,this.authOverride_=c,this.id=e.nextPersistentConnectionId_++,this.log_=ur(`p:`+this.id+`:`),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ia,this.maxReconnectDelay_=aa,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c&&!Ae())throw Error(`Auth override specified in options, but not supported on non Node.js platforms`);ra.getInstance().on(`visible`,this.onVisible_,this),t.host.indexOf(`fblocal`)===-1&&Vi.getInstance().on(`online`,this.onOnline_,this)}sendRequest(e,t,n){let r=++this.requestNumber_,i={r,a:e,b:t};this.log_(y(i)),v(this.connected_,`sendRequest call when we're not connected not allowed.`),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)}get(e){this.initConnection_();let t=new Te,n={action:`g`,request:{p:e._path.toString(),q:e._queryObject},onComplete:e=>{let n=e.d;e.s===`ok`?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;let r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,r){this.initConnection_();let i=e._queryIdentifier,a=e._path.toString();this.log_(`Listen called for `+a+` `+i),this.listens.has(a)||this.listens.set(a,new Map),v(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),`listen() called for non-default but complete query`),v(!this.listens.get(a).has(i),`listen() called twice for same path/queryId.`);let o={onComplete:r,hashFn:t,query:e,tag:n};this.listens.get(a).set(i,o),this.connected_&&this.sendListen_(o)}sendGet_(e){let t=this.outstandingGets_[e];this.sendRequest(`g`,t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(t){let n=t.query,r=n._path.toString(),i=n._queryIdentifier;this.log_(`Listen on `+r+` for `+i);let a={p:r};t.tag&&(a.q=n._queryObject,a.t=t.tag),a.h=t.hashFn(),this.sendRequest(`q`,a,a=>{let o=a.d,s=a.s;e.warnOnListenWarnings_(o,n),(this.listens.get(r)&&this.listens.get(r).get(i))===t&&(this.log_(`listen response`,a),s!==`ok`&&this.removeListen_(r,i),t.onComplete&&t.onComplete(s,o))})}static warnOnListenWarnings_(e,t){if(e&&typeof e==`object`&&He(e,`w`)){let n=Ue(e,`w`);Array.isArray(n)&&~n.indexOf(`no_index`)&&S(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${`".indexOn": "`+t._queryParams.getIndex().toString()+`"`} at ${t._path.toString()} to your security rules for better performance.`)}}refreshAuthToken(e){this.authToken_=e,this.log_(`Auth token refreshed`),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest(`unauth`,{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ve(e))&&(this.log_(`Admin auth credential detected.  Reducing max reconnect time.`),this.maxReconnectDelay_=oa)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_(`App check token refreshed`),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest(`unappeck`,{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){let e=this.authToken_,t=Be(e)?`auth`:`gauth`,n={cred:e};this.authOverride_===null?n.noauth=!0:typeof this.authOverride_==`object`&&(n.authvar=this.authOverride_),this.sendRequest(t,n,t=>{let n=t.s,r=t.d||`error`;this.authToken_===e&&(n===`ok`?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest(`appcheck`,{token:this.appCheckToken_},e=>{let t=e.s,n=e.d||`error`;t===`ok`?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){let n=e._path.toString(),r=e._queryIdentifier;this.log_(`Unlisten called for `+n+` `+r),v(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),`unlisten() called for non-default but complete query`),this.removeListen_(n,r)&&this.connected_&&this.sendUnlisten_(n,r,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_(`Unlisten on `+e+` for `+t);let i={p:e};r&&(i.q=n,i.t=r),this.sendRequest(`n`,i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_(`o`,e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:`o`,data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_(`om`,e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:`om`,data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_(`oc`,e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:`oc`,data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){let i={p:t,d:n};this.log_(`onDisconnect `+e,i),this.sendRequest(e,i,e=>{r&&setTimeout(()=>{r(e.s,e.d)},0)})}put(e,t,n,r){this.putInternal(`p`,e,t,n,r)}merge(e,t,n,r){this.putInternal(`m`,e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();let a={p:t,d:n};i!==void 0&&(a.h=i),this.outstandingPuts_.push({action:e,request:a,onComplete:r}),this.outstandingPutCount_++;let o=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(o):this.log_(`Buffering put: `+t)}sendPut_(e){let t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,n=>{this.log_(t+` response`,n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(n.s,n.d)})}reportStats(e){if(this.connected_){let t={c:e};this.log_(`reportStats`,t),this.sendRequest(`s`,t,e=>{if(e.s!==`ok`){let t=e.d;this.log_(`reportStats`,`Error sending stats: `+t)}})}}onDataMessage_(e){if(`r`in e){this.log_(`from server: `+y(e));let t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else if(`error`in e)throw`A server-side error has occurred: `+e.error;else `a`in e&&this.onDataPush_(e.a,e.b)}onDataPush_(e,t){this.log_(`handleServerMessage`,e,t),e===`d`?this.onDataUpdate_(t.p,t.d,!1,t.t):e===`m`?this.onDataUpdate_(t.p,t.d,!0,t.t):e===`c`?this.onListenRevoked_(t.p,t.q):e===`ac`?this.onAuthRevoked_(t.s,t.d):e===`apc`?this.onAppCheckRevoked_(t.s,t.d):e===`sd`?this.onSecurityDebugPacket_(t):dr(`Unrecognized action received from server: `+y(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_(`connection ready`),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){v(!this.realtime_,`Scheduling a connect when we're already connected/ing?`),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_(`Window became visible.  Reducing delay.`),this.reconnectDelay_=ia,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_(`Browser went online.`),this.reconnectDelay_=ia,this.realtime_||this.scheduleConnect_(0)):(this.log_(`Browser went offline.  Killing connection.`),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_(`data client disconnected`),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&=(new Date().getTime()-this.lastConnectionEstablishedTime_>ca&&(this.reconnectDelay_=ia),null):(this.log_(`Window isn't visible.  Delaying reconnect.`),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());let e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_),t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_(`Trying to reconnect in `+t+`ms`),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*sa)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_(`Making a connection attempt`),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;let t=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+`:`+ e.nextConnectionId_++,a=this.lastSessionId,o=!1,s=null,c=function(){s?s.close():(o=!0,r())};this.realtime_={close:c,sendRequest:function(e){v(s,`sendRequest call when we're not connected not allowed.`),s.sendRequest(e)}};let l=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{let[e,c]=await Promise.all([this.authTokenProvider_.getToken(l),this.appCheckTokenProvider_.getToken(l)]);o?x(`getToken() completed but was canceled`):(x(`getToken() completed. Creating connection.`),this.authToken_=e&&e.accessToken,this.appCheckToken_=c&&c.token,s=new Ri(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,n,r,e=>{S(e+` (`+this.repoInfo_.toString()+`)`),this.interrupt(la)},a))}catch(e){this.log_(`Failed to get token: `+e),o||(this.repoInfo_.nodeAdmin&&S(e),c())}}}interrupt(e){x(`Interrupting connection for reason: `+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&=(clearTimeout(this.establishConnectionTimer_),null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){x(`Resuming connection for reason: `+e),delete this.interruptReasons_[e],We(this.interruptReasons_)&&(this.reconnectDelay_=ia,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){let t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){let t=this.outstandingPuts_[e];t&&`h`in t.request&&t.queued&&(t.onComplete&&t.onComplete(`disconnect`),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map(e=>xr(e)).join(`$`):`default`;let r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete(`permission_denied`)}removeListen_(e,t){let n=new w(e).toString(),r;if(this.listens.has(n)){let e=this.listens.get(n);r=e.get(t),e.delete(t),e.size===0&&this.listens.delete(n)}else r=void 0;return r}onAuthRevoked_(e,t){x(`Auth token revoked: `+e+`/`+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e===`invalid_token`||e===`permission_denied`)&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ua&&(this.reconnectDelay_=oa,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){x(`App check token revoked: `+e+`/`+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e===`invalid_token`||e===`permission_denied`)&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ua&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):`msg`in e&&console.log(`FIREBASE: `+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(let e of this.listens.values())for(let t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){let e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){let e={},t=`js`;Ae()&&(t=this.repoInfo_.nodeAdmin?`admin_node`:`node`),e[`sdk.`+t+`.`+Xn.replace(/\./g,`-`)]=1,Oe()?e[`framework.cordova`]=1:ke()&&(e[`framework.reactnative`]=1),this.reportStats(e)}shouldReconnect_(){let e=Vi.getInstance().currentlyOnline();return We(this.interruptReasons_)&&e}};da.nextPersistentConnectionId_=0,da.nextConnectionId_=0;var j=class e{constructor(e,t){this.name=e,this.node=t}static Wrap(t,n){return new e(t,n)}},fa=class{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){let n=new j(gr,e),r=new j(gr,t);return this.compare(n,r)!==0}minPost(){return j.MIN}},pa,ma=class extends fa{static get __EMPTY_NODE(){return pa}static set __EMPTY_NODE(e){pa=e}compare(e,t){return vr(e.name,t.name)}isDefinedOn(e){throw oe(`KeyIndex.isDefinedOn not expected to be called.`)}indexedValueChanged(e,t){return!1}minPost(){return j.MIN}maxPost(){return new j(_r,pa)}makePost(e,t){return v(typeof e==`string`,`KeyIndex indexValue must always be a string.`),new j(e,pa)}toString(){return`.key`}},ha=new ma,ga=class{constructor(e,t,n,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(e=e,a=t?n(e.key,t):1,r&&(a*=-1),a<0)e=this.isReverse_?e.left:e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(t=this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}},_a=class e{constructor(t,n,r,i,a){this.key=t,this.value=n,this.color=r??e.RED,this.left=i??ya.EMPTY_NODE,this.right=a??ya.EMPTY_NODE}copy(t,n,r,i,a){return new e(t??this.key,n??this.value,r??this.color,i??this.left,a??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return ya.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,r;if(n=this,t(e,n.key)<0)!n.left.isEmpty()&&!n.left.isRed_()&&!n.left.left.isRed_()&&(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),!n.right.isEmpty()&&!n.right.isRed_()&&!n.right.left.isRed_()&&(n=n.moveRedRight_()),t(e,n.key)===0){if(n.right.isEmpty())return ya.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){let t=this.copy(null,null,e.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight_(){let t=this.copy(null,null,e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip_(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){return 2**this.check_()<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw Error(`Red node has red child(`+this.key+`,`+this.value+`)`);if(this.right.isRed_())throw Error(`Right child of (`+this.key+`,`+this.value+`) is red`);let e=this.left.check_();if(e!==this.right.check_())throw Error(`Black depths differ`);return e+(this.isRed_()?0:1)}};_a.RED=!0,_a.BLACK=!1;var va=class{copy(e,t,n,r,i){return this}insert(e,t,n){return new _a(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}},ya=class e{constructor(t,n=e.EMPTY_NODE){this.comparator_=t,this.root_=n}insert(t,n){return new e(this.comparator_,this.root_.insert(t,n,this.comparator_).copy(null,null,_a.BLACK,null,null))}remove(t){return new e(this.comparator_,this.root_.remove(t,this.comparator_).copy(null,null,_a.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),t===0)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;for(;!n.isEmpty();)if(t=this.comparator_(e,n.key),t===0)if(!n.left.isEmpty()){for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}else if(r)return r.key;else return null;else t<0?n=n.left:t>0&&(r=n,n=n.right);throw Error(`Attempted to find predecessor key for a nonexistent key.  What gives?`)}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ga(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ga(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ga(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ga(this.root_,null,this.comparator_,!0,e)}};ya.EMPTY_NODE=new va;function ba(e,t){return vr(e.name,t.name)}function xa(e,t){return vr(e,t)}var Sa;function Ca(e){Sa=e}var wa=function(e){return typeof e==`number`?`number:`+Cr(e):`string:`+e},Ta=function(e){if(e.isLeafNode()){let t=e.val();v(typeof t==`string`||typeof t==`number`||typeof t==`object`&&He(t,`.sv`),`Priority must be a string or number.`)}else v(e===Sa||e.isEmpty(),`priority of unexpected type.`);v(e===Sa||e.getPriority().isEmpty(),`Priority nodes can't have a priority of their own.`)},Ea,Da=class e{static set __childrenNodeConstructor(e){Ea=e}static get __childrenNodeConstructor(){return Ea}constructor(t,n=e.__childrenNodeConstructor.EMPTY_NODE){this.value_=t,this.priorityNode_=n,this.lazyHash_=null,v(this.value_!==void 0&&this.value_!==null,`LeafNode shouldn't be created with null/undefined value.`),Ta(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(t){return new e(this.value_,t)}getImmediateChild(t){return t===`.priority`?this.priorityNode_:e.__childrenNodeConstructor.EMPTY_NODE}getChild(t){return k(t)?this:E(t)===`.priority`?this.priorityNode_:e.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(t,n){return t===`.priority`?this.updatePriority(n):n.isEmpty()&&t!==`.priority`?this:e.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t,n).updatePriority(this.priorityNode_)}updateChild(t,n){let r=E(t);return r===null?n:n.isEmpty()&&r!==`.priority`?this:(v(r!==`.priority`||Wi(t)===1,`.priority must be the last token in a path`),this.updateImmediateChild(r,e.__childrenNodeConstructor.EMPTY_NODE.updateChild(D(t),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e=``;this.priorityNode_.isEmpty()||(e+=`priority:`+wa(this.priorityNode_.val())+`:`);let t=typeof this.value_;e+=t+`:`,t===`number`?e+=Cr(this.value_):e+=this.value_,this.lazyHash_=ar(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(t){return t===e.__childrenNodeConstructor.EMPTY_NODE?1:t instanceof e.__childrenNodeConstructor?-1:(v(t.isLeafNode(),`Unknown node type`),this.compareToLeafNode_(t))}compareToLeafNode_(t){let n=typeof t.value_,r=typeof this.value_,i=e.VALUE_TYPE_ORDER.indexOf(n),a=e.VALUE_TYPE_ORDER.indexOf(r);return v(i>=0,`Unknown leaf type: `+n),v(a>=0,`Unknown leaf type: `+r),i===a?r===`object`?0:this.value_<t.value_?-1:this.value_===t.value_?0:1:a-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){let t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}};Da.VALUE_TYPE_ORDER=[`object`,`boolean`,`number`,`string`];var Oa,ka;function Aa(e){Oa=e}function ja(e){ka=e}var M=new class extends fa{compare(e,t){let n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return i===0?vr(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return j.MIN}maxPost(){return new j(_r,new Da(`[PRIORITY-POST]`,ka))}makePost(e,t){return new j(t,new Da(`[PRIORITY-POST]`,Oa(e)))}toString(){return`.priority`}},Ma=Math.log(2),Na=class{constructor(e){let t=e=>parseInt(Math.log(e)/Ma,10),n=e=>parseInt(Array(e+1).join(`1`),2);this.count=t(e+1),this.current_=this.count-1;let r=n(this.count);this.bits_=e+1&r}nextBitIsOne(){let e=!(this.bits_&1<<this.current_);return this.current_--,e}},Pa=function(e,t,n,r){e.sort(t);let i=function(t,r){let a=r-t,o,s;if(a===0)return null;if(a===1)return o=e[t],s=n?n(o):o,new _a(s,o.node,_a.BLACK,null,null);{let c=parseInt(a/2,10)+t,l=i(t,c),u=i(c+1,r);return o=e[c],s=n?n(o):o,new _a(s,o.node,_a.BLACK,l,u)}},a=function(t){let r=null,a=null,o=e.length,s=function(t,r){let a=o-t,s=o;o-=t;let l=i(a+1,s),u=e[a];c(new _a(n?n(u):u,u.node,r,null,l))},c=function(e){r?(r.left=e,r=e):(a=e,r=e)};for(let e=0;e<t.count;++e){let n=t.nextBitIsOne(),r=2**(t.count-(e+1));n?s(r,_a.BLACK):(s(r,_a.BLACK),s(r,_a.RED))}return a}(new Na(e.length));return new ya(r||t,a)},Fa,Ia={},La=class e{static get Default(){return v(Ia&&M,`ChildrenNode.ts has not been loaded`),Fa||=new e({".priority":Ia},{".priority":M}),Fa}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){let t=Ue(this.indexes_,e);if(!t)throw Error(`No index defined for `+e);return t instanceof ya?t:null}hasIndex(e){return He(this.indexSet_,e.toString())}addIndex(t,n){v(t!==ha,`KeyIndex always exists and isn't meant to be added to the IndexMap.`);let r=[],i=!1,a=n.getIterator(j.Wrap),o=a.getNext();for(;o;)i||=t.isDefinedOn(o.node),r.push(o),o=a.getNext();let s;s=i?Pa(r,t.getCompare()):Ia;let c=t.toString(),l={...this.indexSet_};l[c]=t;let u={...this.indexes_};return u[c]=s,new e(u,l)}addToIndexes(t,n){return new e(Ge(this.indexes_,(e,r)=>{let i=Ue(this.indexSet_,r);if(v(i,`Missing index implementation for `+r),e===Ia)if(i.isDefinedOn(t.node)){let e=[],r=n.getIterator(j.Wrap),a=r.getNext();for(;a;)a.name!==t.name&&e.push(a),a=r.getNext();return e.push(t),Pa(e,i.getCompare())}else return Ia;else{let r=n.get(t.name),i=e;return r&&(i=i.remove(new j(t.name,r))),i.insert(t,t.node)}}),this.indexSet_)}removeFromIndexes(t,n){return new e(Ge(this.indexes_,e=>{if(e===Ia)return e;{let r=n.get(t.name);return r?e.remove(new j(t.name,r)):e}}),this.indexSet_)}},Ra,N=class e{static get EMPTY_NODE(){return Ra||=new e(new ya(xa),null,La.Default)}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Ta(this.priorityNode_),this.children_.isEmpty()&&v(!this.priorityNode_||this.priorityNode_.isEmpty(),`An empty node cannot have a priority`)}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ra}updatePriority(t){return this.children_.isEmpty()?this:new e(this.children_,t,this.indexMap_)}getImmediateChild(e){if(e===`.priority`)return this.getPriority();{let t=this.children_.get(e);return t===null?Ra:t}}getChild(e){let t=E(e);return t===null?this:this.getImmediateChild(t).getChild(D(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(t,n){if(v(n,`We should always be passing snapshot nodes`),t===`.priority`)return this.updatePriority(n);{let r=new j(t,n),i,a;n.isEmpty()?(i=this.children_.remove(t),a=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(t,n),a=this.indexMap_.addToIndexes(r,this.children_));let o=i.isEmpty()?Ra:this.priorityNode_;return new e(i,o,a)}}updateChild(e,t){let n=E(e);if(n===null)return t;{v(E(e)!==`.priority`||Wi(e)===1,`.priority must be the last token in a path`);let r=this.getImmediateChild(n).updateChild(D(e),t);return this.updateImmediateChild(n,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(t){if(this.isEmpty())return null;let n={},r=0,i=0,a=!0;if(this.forEachChild(M,(o,s)=>{n[o]=s.val(t),r++,a&&e.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):a=!1}),!t&&a&&i<2*r){let e=[];for(let t in n)e[t]=n[t];return e}else return t&&!this.getPriority().isEmpty()&&(n[`.priority`]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e=``;this.getPriority().isEmpty()||(e+=`priority:`+wa(this.getPriority().val())+`:`),this.forEachChild(M,(t,n)=>{let r=n.hash();r!==``&&(e+=`:`+t+`:`+r)}),this.lazyHash_=e===``?``:ar(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){let r=this.resolveIndex_(n);if(r){let n=r.getPredecessorKey(new j(e,t));return n?n.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){let t=this.resolveIndex_(e);if(t){let e=t.minKey();return e&&e.name}else return this.children_.minKey()}getFirstChild(e){let t=this.getFirstChildName(e);return t?new j(t,this.children_.get(t)):null}getLastChildName(e){let t=this.resolveIndex_(e);if(t){let e=t.maxKey();return e&&e.name}else return this.children_.maxKey()}getLastChild(e){let t=this.getLastChildName(e);return t?new j(t,this.children_.get(t)):null}forEachChild(e,t){let n=this.resolveIndex_(e);return n?n.inorderTraversal(e=>t(e.name,e.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){let n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,e=>e);{let n=this.children_.getIteratorFrom(e.name,j.Wrap),r=n.peek();for(;r!=null&&t.compare(r,e)<0;)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){let n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,e=>e);{let n=this.children_.getReverseIteratorFrom(e.name,j.Wrap),r=n.peek();for(;r!=null&&t.compare(r,e)>0;)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===za?-1:0}withIndex(t){if(t===ha||this.indexMap_.hasIndex(t))return this;{let n=this.indexMap_.addIndex(t,this.children_);return new e(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===ha||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{let t=e;if(!this.getPriority().equals(t.getPriority()))return!1;if(this.children_.count()===t.children_.count()){let e=this.getIterator(M),n=t.getIterator(M),r=e.getNext(),i=n.getNext();for(;r&&i;){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=e.getNext(),i=n.getNext()}return r===null&&i===null}else return!1}}resolveIndex_(e){return e===ha?null:this.indexMap_.get(e.toString())}};N.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;var za=new class extends N{constructor(){super(new ya(xa),N.EMPTY_NODE,La.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return N.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(j,{MIN:{value:new j(gr,N.EMPTY_NODE)},MAX:{value:new j(_r,za)}}),ma.__EMPTY_NODE=N.EMPTY_NODE,Da.__childrenNodeConstructor=N,Ca(za),ja(za);var Ba=!0;function P(e,t=null){if(e===null)return N.EMPTY_NODE;if(typeof e==`object`&&`.priority`in e&&(t=e[`.priority`]),v(t===null||typeof t==`string`||typeof t==`number`||typeof t==`object`&&`.sv`in t,`Invalid priority type found: `+typeof t),typeof e==`object`&&`.value`in e&&e[`.value`]!==null&&(e=e[`.value`]),typeof e!=`object`||`.sv`in e)return new Da(e,P(t));if(!(e instanceof Array)&&Ba){let n=[],r=!1;if(C(e,(e,t)=>{if(e.substring(0,1)!==`.`){let i=P(t);i.isEmpty()||(r||=!i.getPriority().isEmpty(),n.push(new j(e,i)))}}),n.length===0)return N.EMPTY_NODE;let i=Pa(n,ba,e=>e.name,xa);if(r){let e=Pa(n,M.getCompare());return new N(i,P(t),new La({".priority":e},{".priority":M}))}else return new N(i,P(t),La.Default)}else{let n=N.EMPTY_NODE;return C(e,(t,r)=>{if(He(e,t)&&t.substring(0,1)!==`.`){let e=P(r);(e.isLeafNode()||!e.isEmpty())&&(n=n.updateImmediateChild(t,e))}}),n.updatePriority(P(t))}}Aa(P);var Va=class extends fa{constructor(e){super(),this.indexPath_=e,v(!k(e)&&E(e)!==`.priority`,`Can't create PathIndex with empty path or .priority key`)}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){let n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return i===0?vr(e.name,t.name):i}makePost(e,t){let n=P(e);return new j(t,N.EMPTY_NODE.updateChild(this.indexPath_,n))}maxPost(){return new j(_r,N.EMPTY_NODE.updateChild(this.indexPath_,za))}toString(){return qi(this.indexPath_,0).join(`/`)}},Ha=new class extends fa{compare(e,t){let n=e.node.compareTo(t.node);return n===0?vr(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return j.MIN}maxPost(){return j.MAX}makePost(e,t){return new j(t,P(e))}toString(){return`.value`}};function Ua(e){return{type:`value`,snapshotNode:e}}function Wa(e,t){return{type:`child_added`,snapshotNode:t,childName:e}}function Ga(e,t){return{type:`child_removed`,snapshotNode:t,childName:e}}function Ka(e,t,n){return{type:`child_changed`,snapshotNode:t,childName:e,oldSnap:n}}function qa(e,t){return{type:`child_moved`,snapshotNode:t,childName:e}}var Ja=class{constructor(e){this.index_=e}updateChild(e,t,n,r,i,a){v(e.isIndexed(this.index_),`A node must be indexed if only a child is updated`);let o=e.getImmediateChild(t);return o.getChild(r).equals(n.getChild(r))&&o.isEmpty()===n.isEmpty()||(a!=null&&(n.isEmpty()?e.hasChild(t)?a.trackChildChange(Ga(t,o)):v(e.isLeafNode(),`A child remove without an old child only makes sense on a leaf node`):o.isEmpty()?a.trackChildChange(Wa(t,n)):a.trackChildChange(Ka(t,n,o))),e.isLeafNode()&&n.isEmpty())?e:e.updateImmediateChild(t,n).withIndex(this.index_)}updateFullNode(e,t,n){return n!=null&&(e.isLeafNode()||e.forEachChild(M,(e,r)=>{t.hasChild(e)||n.trackChildChange(Ga(e,r))}),t.isLeafNode()||t.forEachChild(M,(t,r)=>{if(e.hasChild(t)){let i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(Ka(t,r,i))}else n.trackChildChange(Wa(t,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?N.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}},Ya=class e{constructor(t){this.indexedFilter_=new Ja(t.getIndex()),this.index_=t.getIndex(),this.startPost_=e.getStartPost_(t),this.endPost_=e.getEndPost_(t),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){let t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,r,i,a){return this.matches(new j(t,n))||(n=N.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,a)}updateFullNode(e,t,n){t.isLeafNode()&&(t=N.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(N.EMPTY_NODE);let i=this;return t.forEachChild(M,(e,t)=>{i.matches(new j(e,t))||(r=r.updateImmediateChild(e,N.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){let t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){let t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}},Xa=class{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{let t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{let t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new Ya(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,a){return this.rangedFilter_.matches(new j(t,n))||(n=N.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,a):this.fullLimitUpdateChild_(e,t,n,i,a)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=N.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){r=N.EMPTY_NODE.withIndex(this.index_);let e;e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){let t=e.getNext();if(this.withinDirectionalStart(t))if(this.withinDirectionalEnd(t))r=r.updateImmediateChild(t.name,t.node),n++;else break}}else{r=t.withIndex(this.index_),r=r.updatePriority(N.EMPTY_NODE);let e;e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;for(;e.hasNext();){let t=e.getNext();n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t)?n++:r=r.updateImmediateChild(t.name,N.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,r,i){let a;if(this.reverse_){let e=this.index_.getCompare();a=(t,n)=>e(n,t)}else a=this.index_.getCompare();let o=e;v(o.numChildren()===this.limit_,``);let s=new j(t,n),c=this.reverse_?o.getFirstChild(this.index_):o.getLastChild(this.index_),l=this.rangedFilter_.matches(s);if(o.hasChild(t)){let e=o.getImmediateChild(t),u=r.getChildAfterChild(this.index_,c,this.reverse_);for(;u!=null&&(u.name===t||o.hasChild(u.name));)u=r.getChildAfterChild(this.index_,u,this.reverse_);let d=u==null?1:a(u,s);if(l&&!n.isEmpty()&&d>=0)return i?.trackChildChange(Ka(t,n,e)),o.updateImmediateChild(t,n);{i?.trackChildChange(Ga(t,e));let n=o.updateImmediateChild(t,N.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(i?.trackChildChange(Wa(u.name,u.node)),n.updateImmediateChild(u.name,u.node)):n}}else if(n.isEmpty())return e;else if(l)return a(c,s)>=0?(i!=null&&(i.trackChildChange(Ga(c.name,c.node)),i.trackChildChange(Wa(t,n))),o.updateImmediateChild(t,n).updateImmediateChild(c.name,N.EMPTY_NODE)):e;else return e}},Za=class e{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_=``,this.indexStartValue_=null,this.indexStartName_=``,this.indexEndValue_=null,this.indexEndName_=``,this.index_=M}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===``?this.startSet_:this.viewFrom_===`l`}getIndexStartValue(){return v(this.startSet_,`Only valid if start has been set`),this.indexStartValue_}getIndexStartName(){return v(this.startSet_,`Only valid if start has been set`),this.startNameSet_?this.indexStartName_:gr}hasEnd(){return this.endSet_}getIndexEndValue(){return v(this.endSet_,`Only valid if end has been set`),this.indexEndValue_}getIndexEndName(){return v(this.endSet_,`Only valid if end has been set`),this.endNameSet_?this.indexEndName_:_r}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==``}getLimit(){return v(this.limitSet_,`Only valid if limit has been set`),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===M}copy(){let t=new e;return t.limitSet_=this.limitSet_,t.limit_=this.limit_,t.startSet_=this.startSet_,t.startAfterSet_=this.startAfterSet_,t.indexStartValue_=this.indexStartValue_,t.startNameSet_=this.startNameSet_,t.indexStartName_=this.indexStartName_,t.endSet_=this.endSet_,t.endBeforeSet_=this.endBeforeSet_,t.indexEndValue_=this.indexEndValue_,t.endNameSet_=this.endNameSet_,t.indexEndName_=this.indexEndName_,t.index_=this.index_,t.viewFrom_=this.viewFrom_,t}};function Qa(e){return e.loadsAllData()?new Ja(e.getIndex()):e.hasLimit()?new Xa(e):new Ya(e)}function $a(e){let t={};if(e.isDefault())return t;let n;if(e.index_===M?n=`$priority`:e.index_===Ha?n=`$value`:e.index_===ha?n=`$key`:(v(e.index_ instanceof Va,`Unrecognized index type!`),n=e.index_.toString()),t.orderBy=y(n),e.startSet_){let n=e.startAfterSet_?`startAfter`:`startAt`;t[n]=y(e.indexStartValue_),e.startNameSet_&&(t[n]+=`,`+y(e.indexStartName_))}if(e.endSet_){let n=e.endBeforeSet_?`endBefore`:`endAt`;t[n]=y(e.indexEndValue_),e.endNameSet_&&(t[n]+=`,`+y(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function eo(e){let t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;n===``&&(n=e.isViewFromLeft()?`l`:`r`),t.vf=n}return e.index_!==M&&(t.i=e.index_.toString()),t}var to=class e extends zi{reportStats(e){throw Error(`Method not implemented.`)}static getListenId_(e,t){return t===void 0?(v(e._queryParams.isDefault(),`should have a tag if it's not a default query.`),e._path.toString()):`tag$`+t}constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=ur(`p:rest:`),this.listens_={}}listen(t,n,r,i){let a=t._path.toString();this.log_(`Listen called for `+a+` `+t._queryIdentifier);let o=e.getListenId_(t,r),s={};this.listens_[o]=s;let c=$a(t._queryParams);this.restRequest_(a+`.json`,c,(e,t)=>{let n=t;if(e===404&&(n=null,e=null),e===null&&this.onDataUpdate_(a,n,!1,r),Ue(this.listens_,o)===s){let t;t=e?e===401?`permission_denied`:`rest_error:`+e:`ok`,i(t,null)}})}unlisten(t,n){let r=e.getListenId_(t,n);delete this.listens_[r]}get(e){let t=$a(e._queryParams),n=e._path.toString(),r=new Te;return this.restRequest_(n+`.json`,t,(e,t)=>{let i=t;e===404&&(i=null,e=null),e===null?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(Error(i))}),r.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format=`export`,Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(t.auth=r.accessToken),i&&i.token&&(t.ac=i.token);let a=(this.repoInfo_.secure?`https://`:`http://`)+this.repoInfo_.host+e+`?ns=`+this.repoInfo_.namespace+Je(t);this.log_(`Sending REST request for `+a);let o=new XMLHttpRequest;o.onreadystatechange=()=>{if(n&&o.readyState===4){this.log_(`REST Response for `+a+` received. status:`,o.status,`response:`,o.responseText);let e=null;if(o.status>=200&&o.status<300){try{e=Re(o.responseText)}catch{S(`Failed to parse JSON response for `+a+`: `+o.responseText)}n(null,e)}else o.status!==401&&o.status!==404&&S(`Got unsuccessful REST response for `+a+` Status: `+o.status),n(o.status);n=null}},o.open(`GET`,a,!0),o.send()})}},no=class{constructor(){this.rootNode_=N.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}};function ro(){return{value:null,children:new Map}}function io(e,t,n){if(k(t))e.value=n,e.children.clear();else if(e.value!==null)e.value=e.value.updateChild(t,n);else{let r=E(t);e.children.has(r)||e.children.set(r,ro());let i=e.children.get(r);t=D(t),io(i,t,n)}}function ao(e,t,n){e.value===null?oo(e,(e,r)=>{ao(r,new w(t.toString()+`/`+e),n)}):n(t,e.value)}function oo(e,t){e.children.forEach((e,n)=>{t(n,e)})}var so=class{constructor(e){this.collection_=e,this.last_=null}get(){let e=this.collection_.get(),t={...e};return this.last_&&C(this.last_,(e,n)=>{t[e]=t[e]-n}),this.last_=e,t}},co=10*1e3,lo=30*1e3,uo=300*1e3,fo=class{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new so(e);let n=co+(lo-co)*Math.random();Nr(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){let e=this.statsListener_.get(),t={},n=!1;C(e,(e,r)=>{r>0&&He(this.statsToReport_,e)&&(t[e]=r,n=!0)}),n&&this.server_.reportStats(t),Nr(this.reportStats_.bind(this),Math.floor(Math.random()*2*uo))}},po;(function(e){e[e.OVERWRITE=0]=`OVERWRITE`,e[e.MERGE=1]=`MERGE`,e[e.ACK_USER_WRITE=2]=`ACK_USER_WRITE`,e[e.LISTEN_COMPLETE=3]=`LISTEN_COMPLETE`})(po||={});function mo(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ho(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function go(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}var _o=class e{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=po.ACK_USER_WRITE,this.source=mo()}operationForChild(t){if(!k(this.path))return v(E(this.path)===t,`operationForChild called for unrelated child.`),new e(D(this.path),this.affectedTree,this.revert);if(this.affectedTree.value!=null)return v(this.affectedTree.children.isEmpty(),`affectedTree should not have overlapping affected paths.`),this;{let n=this.affectedTree.subtree(new w(t));return new e(T(),n,this.revert)}}},vo=class e{constructor(e,t){this.source=e,this.path=t,this.type=po.LISTEN_COMPLETE}operationForChild(t){return k(this.path)?new e(this.source,T()):new e(this.source,D(this.path))}},yo=class e{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=po.OVERWRITE}operationForChild(t){return k(this.path)?new e(this.source,T(),this.snap.getImmediateChild(t)):new e(this.source,D(this.path),this.snap)}},bo=class e{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=po.MERGE}operationForChild(t){if(k(this.path)){let n=this.children.subtree(new w(t));return n.isEmpty()?null:n.value?new yo(this.source,T(),n.value):new e(this.source,T(),n)}else return v(E(this.path)===t,`Can't get a merge for a child not on the path of the operation`),new e(this.source,D(this.path),this.children)}toString(){return`Operation(`+this.path+`: `+this.source.toString()+` merge: `+this.children.toString()+`)`}},xo=class{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(k(e))return this.isFullyInitialized()&&!this.filtered_;let t=E(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}},So=class{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}};function Co(e,t,n,r){let i=[],a=[];return t.forEach(t=>{t.type===`child_changed`&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&a.push(qa(t.childName,t.snapshotNode))}),wo(e,i,`child_removed`,t,r,n),wo(e,i,`child_added`,t,r,n),wo(e,i,`child_moved`,a,r,n),wo(e,i,`child_changed`,t,r,n),wo(e,i,`value`,t,r,n),i}function wo(e,t,n,r,i,a){let o=r.filter(e=>e.type===n);o.sort((t,n)=>Eo(e,t,n)),o.forEach(n=>{let r=To(e,n,a);i.forEach(i=>{i.respondsTo(n.type)&&t.push(i.createEvent(r,e.query_))})})}function To(e,t,n){return t.type===`value`||t.type===`child_removed`||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}function Eo(e,t,n){if(t.childName==null||n.childName==null)throw oe(`Should only compare child_ events.`);let r=new j(t.childName,t.snapshotNode),i=new j(n.childName,n.snapshotNode);return e.index_.compare(r,i)}function Do(e,t){return{eventCache:e,serverCache:t}}function Oo(e,t,n,r){return Do(new xo(t,n,r),e.serverCache)}function ko(e,t,n,r){return Do(e.eventCache,new xo(t,n,r))}function Ao(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function jo(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}var Mo,No=()=>(Mo||=new ya(yr),Mo),Po=class e{static fromObject(t){let n=new e(null);return C(t,(e,t)=>{n=n.set(new w(e),t)}),n}constructor(e,t=No()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:T(),value:this.value};if(k(e))return null;{let n=E(e),r=this.children.get(n);if(r!==null){let i=r.findRootMostMatchingPathAndValue(D(e),t);return i==null?null:{path:O(new w(n),i.path),value:i.value}}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(t){if(k(t))return this;{let n=E(t),r=this.children.get(n);return r===null?new e(null):r.subtree(D(t))}}set(t,n){if(k(t))return new e(n,this.children);{let r=E(t),i=(this.children.get(r)||new e(null)).set(D(t),n),a=this.children.insert(r,i);return new e(this.value,a)}}remove(t){if(k(t))return this.children.isEmpty()?new e(null):new e(null,this.children);{let n=E(t),r=this.children.get(n);if(r){let i=r.remove(D(t)),a;return a=i.isEmpty()?this.children.remove(n):this.children.insert(n,i),this.value===null&&a.isEmpty()?new e(null):new e(this.value,a)}else return this}}get(e){if(k(e))return this.value;{let t=E(e),n=this.children.get(t);return n?n.get(D(e)):null}}setTree(t,n){if(k(t))return n;{let r=E(t),i=(this.children.get(r)||new e(null)).setTree(D(t),n),a;return a=i.isEmpty()?this.children.remove(r):this.children.insert(r,i),new e(this.value,a)}}fold(e){return this.fold_(T(),e)}fold_(e,t){let n={};return this.children.inorderTraversal((r,i)=>{n[r]=i.fold_(O(e,r),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,T(),t)}findOnPath_(e,t,n){let r=this.value?n(t,this.value):!1;if(r)return r;if(k(e))return null;{let r=E(e),i=this.children.get(r);return i?i.findOnPath_(D(e),O(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,T(),t)}foreachOnPath_(t,n,r){if(k(t))return this;{this.value&&r(n,this.value);let i=E(t),a=this.children.get(i);return a?a.foreachOnPath_(D(t),O(n,i),r):new e(null)}}foreach(e){this.foreach_(T(),e)}foreach_(e,t){this.children.inorderTraversal((n,r)=>{r.foreach_(O(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}},Fo=class e{constructor(e){this.writeTree_=e}static empty(){return new e(new Po(null))}};function Io(e,t,n){if(k(t))return new Fo(new Po(n));{let r=e.writeTree_.findRootMostValueAndPath(t);if(r!=null){let i=r.path,a=r.value,o=A(i,t);return a=a.updateChild(o,n),new Fo(e.writeTree_.set(i,a))}else{let r=new Po(n);return new Fo(e.writeTree_.setTree(t,r))}}}function Lo(e,t,n){let r=e;return C(n,(e,n)=>{r=Io(r,O(t,e),n)}),r}function Ro(e,t){return k(t)?Fo.empty():new Fo(e.writeTree_.setTree(t,new Po(null)))}function zo(e,t){return Bo(e,t)!=null}function Bo(e,t){let n=e.writeTree_.findRootMostValueAndPath(t);return n==null?null:e.writeTree_.get(n.path).getChild(A(n.path,t))}function Vo(e){let t=[],n=e.writeTree_.value;return n==null?e.writeTree_.children.inorderTraversal((e,n)=>{n.value!=null&&t.push(new j(e,n.value))}):n.isLeafNode()||n.forEachChild(M,(e,n)=>{t.push(new j(e,n))}),t}function Ho(e,t){if(k(t))return e;{let n=Bo(e,t);return n==null?new Fo(e.writeTree_.subtree(t)):new Fo(new Po(n))}}function Uo(e){return e.writeTree_.isEmpty()}function Wo(e,t){return Go(T(),e.writeTree_,t)}function Go(e,t,n){if(t.value!=null)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal((t,i)=>{t===`.priority`?(v(i.value!==null,`Priority writes must always be leaf nodes`),r=i.value):n=Go(O(e,t),i,n)}),!n.getChild(e).isEmpty()&&r!==null&&(n=n.updateChild(O(e,`.priority`),r)),n}}function Ko(e,t){return hs(t,e)}function qo(e,t,n,r,i){v(r>e.lastWriteId,`Stacking an older write on top of newer ones`),i===void 0&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=Io(e.visibleWrites,t,n)),e.lastWriteId=r}function Jo(e,t,n,r){v(r>e.lastWriteId,`Stacking an older merge on top of newer ones`),e.allWrites.push({path:t,children:n,writeId:r,visible:!0}),e.visibleWrites=Lo(e.visibleWrites,t,n),e.lastWriteId=r}function Yo(e,t){for(let n=0;n<e.allWrites.length;n++){let r=e.allWrites[n];if(r.writeId===t)return r}return null}function Xo(e,t){let n=e.allWrites.findIndex(e=>e.writeId===t);v(n>=0,`removeWrite called with nonexistent writeId.`);let r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,a=!1,o=e.allWrites.length-1;for(;i&&o>=0;){let t=e.allWrites[o];t.visible&&(o>=n&&Zo(t,r.path)?i=!1:Zi(r.path,t.path)&&(a=!0)),o--}if(!i)return!1;if(a)return Qo(e),!0;if(r.snap)e.visibleWrites=Ro(e.visibleWrites,r.path);else{let t=r.children;C(t,t=>{e.visibleWrites=Ro(e.visibleWrites,O(r.path,t))})}return!0}function Zo(e,t){if(e.snap)return Zi(e.path,t);for(let n in e.children)if(e.children.hasOwnProperty(n)&&Zi(O(e.path,n),t))return!0;return!1}function Qo(e){e.visibleWrites=es(e.allWrites,$o,T()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}function $o(e){return e.visible}function es(e,t,n){let r=Fo.empty();for(let i=0;i<e.length;++i){let a=e[i];if(t(a)){let e=a.path,t;if(a.snap)Zi(n,e)?(t=A(n,e),r=Io(r,t,a.snap)):Zi(e,n)&&(t=A(e,n),r=Io(r,T(),a.snap.getChild(t)));else if(a.children){if(Zi(n,e))t=A(n,e),r=Lo(r,t,a.children);else if(Zi(e,n))if(t=A(e,n),k(t))r=Lo(r,T(),a.children);else{let e=Ue(a.children,E(t));if(e){let n=e.getChild(D(t));r=Io(r,T(),n)}}}else throw oe(`WriteRecord should have .snap or .children`)}}return r}function ts(e,t,n,r,i){if(!r&&!i){let r=Bo(e.visibleWrites,t);if(r!=null)return r;{let r=Ho(e.visibleWrites,t);return Uo(r)?n:n==null&&!zo(r,T())?null:Wo(r,n||N.EMPTY_NODE)}}else{let a=Ho(e.visibleWrites,t);return!i&&Uo(a)?n:!i&&n==null&&!zo(a,T())?null:Wo(es(e.allWrites,function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(Zi(e.path,t)||Zi(t,e.path))},t),n||N.EMPTY_NODE)}}function ns(e,t,n){let r=N.EMPTY_NODE,i=Bo(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(M,(e,t)=>{r=r.updateImmediateChild(e,t)}),r;if(n){let i=Ho(e.visibleWrites,t);return n.forEachChild(M,(e,t)=>{let n=Wo(Ho(i,new w(e)),t);r=r.updateImmediateChild(e,n)}),Vo(i).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}else return Vo(Ho(e.visibleWrites,t)).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}function rs(e,t,n,r,i){v(r||i,`Either existingEventSnap or existingServerSnap must exist`);let a=O(t,n);if(zo(e.visibleWrites,a))return null;{let t=Ho(e.visibleWrites,a);return Uo(t)?i.getChild(n):Wo(t,i.getChild(n))}}function is(e,t,n,r){let i=O(t,n);return Bo(e.visibleWrites,i)??(r.isCompleteForChild(n)?Wo(Ho(e.visibleWrites,i),r.getNode().getImmediateChild(n)):null)}function as(e,t){return Bo(e.visibleWrites,t)}function os(e,t,n,r,i,a,o){let s,c=Ho(e.visibleWrites,t),l=Bo(c,T());if(l!=null)s=l;else if(n!=null)s=Wo(c,n);else return[];if(s=s.withIndex(o),!s.isEmpty()&&!s.isLeafNode()){let e=[],t=o.getCompare(),n=a?s.getReverseIteratorFrom(r,o):s.getIteratorFrom(r,o),c=n.getNext();for(;c&&e.length<i;)t(c,r)!==0&&e.push(c),c=n.getNext();return e}else return[]}function ss(){return{visibleWrites:Fo.empty(),allWrites:[],lastWriteId:-1}}function cs(e,t,n,r){return ts(e.writeTree,e.treePath,t,n,r)}function ls(e,t){return ns(e.writeTree,e.treePath,t)}function us(e,t,n,r){return rs(e.writeTree,e.treePath,t,n,r)}function ds(e,t){return as(e.writeTree,O(e.treePath,t))}function fs(e,t,n,r,i,a){return os(e.writeTree,e.treePath,t,n,r,i,a)}function ps(e,t,n){return is(e.writeTree,e.treePath,t,n)}function ms(e,t){return hs(O(e.treePath,t),e.writeTree)}function hs(e,t){return{treePath:e,writeTree:t}}var gs=class{constructor(){this.changeMap=new Map}trackChildChange(e){let t=e.type,n=e.childName;v(t===`child_added`||t===`child_changed`||t===`child_removed`,`Only child changes supported for tracking`),v(n!==`.priority`,`Only non-priority child changes can be tracked.`);let r=this.changeMap.get(n);if(r){let i=r.type;if(t===`child_added`&&i===`child_removed`)this.changeMap.set(n,Ka(n,e.snapshotNode,r.snapshotNode));else if(t===`child_removed`&&i===`child_added`)this.changeMap.delete(n);else if(t===`child_removed`&&i===`child_changed`)this.changeMap.set(n,Ga(n,r.oldSnap));else if(t===`child_changed`&&i===`child_added`)this.changeMap.set(n,Wa(n,e.snapshotNode));else if(t===`child_changed`&&i===`child_changed`)this.changeMap.set(n,Ka(n,e.snapshotNode,r.oldSnap));else throw oe(`Illegal combination of changes: `+e+` occurred after `+r)}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}},_s=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}},vs=class{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){let t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{let t=this.optCompleteServerCache_==null?this.viewCache_.serverCache:new xo(this.optCompleteServerCache_,!0,!1);return ps(this.writes_,e,t)}}getChildAfterChild(e,t,n){let r=this.optCompleteServerCache_==null?jo(this.viewCache_):this.optCompleteServerCache_,i=fs(this.writes_,r,t,1,n,e);return i.length===0?null:i[0]}};function ys(e){return{filter:e}}function bs(e,t){v(t.eventCache.getNode().isIndexed(e.filter.getIndex()),`Event snap not indexed`),v(t.serverCache.getNode().isIndexed(e.filter.getIndex()),`Server snap not indexed`)}function xs(e,t,n,r,i){let a=new gs,o,s;if(n.type===po.OVERWRITE){let c=n;c.source.fromUser?o=Ts(e,t,c.path,c.snap,r,i,a):(v(c.source.fromServer,`Unknown source.`),s=c.source.tagged||t.serverCache.isFiltered()&&!k(c.path),o=ws(e,t,c.path,c.snap,r,i,s,a))}else if(n.type===po.MERGE){let c=n;c.source.fromUser?o=Ds(e,t,c.path,c.children,r,i,a):(v(c.source.fromServer,`Unknown source.`),s=c.source.tagged||t.serverCache.isFiltered(),o=ks(e,t,c.path,c.children,r,i,s,a))}else if(n.type===po.ACK_USER_WRITE){let s=n;o=s.revert?Ms(e,t,s.path,r,i,a):As(e,t,s.path,s.affectedTree,r,i,a)}else if(n.type===po.LISTEN_COMPLETE)o=js(e,t,n.path,r,a);else throw oe(`Unknown operation type: `+n.type);let c=a.getChanges();return Ss(t,o,c),{viewCache:o,changes:c}}function Ss(e,t,n){let r=t.eventCache;if(r.isFullyInitialized()){let i=r.getNode().isLeafNode()||r.getNode().isEmpty(),a=Ao(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(a)||!r.getNode().getPriority().equals(a.getPriority()))&&n.push(Ua(Ao(t)))}}function Cs(e,t,n,r,i,a){let o=t.eventCache;if(ds(r,n)!=null)return t;{let s,c;if(k(n))if(v(t.serverCache.isFullyInitialized(),`If change path is empty, we must have complete server data`),t.serverCache.isFiltered()){let n=jo(t),i=ls(r,n instanceof N?n:N.EMPTY_NODE);s=e.filter.updateFullNode(t.eventCache.getNode(),i,a)}else{let n=cs(r,jo(t));s=e.filter.updateFullNode(t.eventCache.getNode(),n,a)}else{let l=E(n);if(l===`.priority`){v(Wi(n)===1,`Can't have a priority with additional path components`);let i=o.getNode();c=t.serverCache.getNode();let a=us(r,n,i,c);s=a==null?o.getNode():e.filter.updatePriority(i,a)}else{let u=D(n),d;if(o.isCompleteForChild(l)){c=t.serverCache.getNode();let e=us(r,n,o.getNode(),c);d=e==null?o.getNode().getImmediateChild(l):o.getNode().getImmediateChild(l).updateChild(u,e)}else d=ps(r,l,t.serverCache);s=d==null?o.getNode():e.filter.updateChild(o.getNode(),l,d,u,i,a)}}return Oo(t,s,o.isFullyInitialized()||k(n),e.filter.filtersNodes())}}function ws(e,t,n,r,i,a,o,s){let c=t.serverCache,l,u=o?e.filter:e.filter.getIndexedFilter();if(k(n))l=u.updateFullNode(c.getNode(),r,null);else if(u.filtersNodes()&&!c.isFiltered()){let e=c.getNode().updateChild(n,r);l=u.updateFullNode(c.getNode(),e,null)}else{let e=E(n);if(!c.isCompleteForPath(n)&&Wi(n)>1)return t;let i=D(n),a=c.getNode().getImmediateChild(e).updateChild(i,r);l=e===`.priority`?u.updatePriority(c.getNode(),a):u.updateChild(c.getNode(),e,a,i,_s,null)}let d=ko(t,l,c.isFullyInitialized()||k(n),u.filtersNodes());return Cs(e,d,n,i,new vs(i,d,a),s)}function Ts(e,t,n,r,i,a,o){let s=t.eventCache,c,l,u=new vs(i,t,a);if(k(n))l=e.filter.updateFullNode(t.eventCache.getNode(),r,o),c=Oo(t,l,!0,e.filter.filtersNodes());else{let i=E(n);if(i===`.priority`)l=e.filter.updatePriority(t.eventCache.getNode(),r),c=Oo(t,l,s.isFullyInitialized(),s.isFiltered());else{let a=D(n),l=s.getNode().getImmediateChild(i),d;if(k(a))d=r;else{let e=u.getCompleteChild(i);d=e==null?N.EMPTY_NODE:Gi(a)===`.priority`&&e.getChild(Ji(a)).isEmpty()?e:e.updateChild(a,r)}c=l.equals(d)?t:Oo(t,e.filter.updateChild(s.getNode(),i,d,a,u,o),s.isFullyInitialized(),e.filter.filtersNodes())}}return c}function Es(e,t){return e.eventCache.isCompleteForChild(t)}function Ds(e,t,n,r,i,a,o){let s=t;return r.foreach((r,c)=>{let l=O(n,r);Es(t,E(l))&&(s=Ts(e,s,l,c,i,a,o))}),r.foreach((r,c)=>{let l=O(n,r);Es(t,E(l))||(s=Ts(e,s,l,c,i,a,o))}),s}function Os(e,t,n){return n.foreach((e,n)=>{t=t.updateChild(e,n)}),t}function ks(e,t,n,r,i,a,o,s){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let c=t,l;l=k(n)?r:new Po(null).setTree(n,r);let u=t.serverCache.getNode();return l.children.inorderTraversal((n,r)=>{if(u.hasChild(n)){let l=Os(e,t.serverCache.getNode().getImmediateChild(n),r);c=ws(e,c,new w(n),l,i,a,o,s)}}),l.children.inorderTraversal((n,r)=>{let l=!t.serverCache.isCompleteForChild(n)&&r.value===null;if(!u.hasChild(n)&&!l){let l=Os(e,t.serverCache.getNode().getImmediateChild(n),r);c=ws(e,c,new w(n),l,i,a,o,s)}}),c}function As(e,t,n,r,i,a,o){if(ds(i,n)!=null)return t;let s=t.serverCache.isFiltered(),c=t.serverCache;if(r.value!=null){if(k(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return ws(e,t,n,c.getNode().getChild(n),i,a,s,o);if(k(n)){let r=new Po(null);return c.getNode().forEachChild(ha,(e,t)=>{r=r.set(new w(e),t)}),ks(e,t,n,r,i,a,s,o)}else return t}else{let l=new Po(null);return r.foreach((e,t)=>{let r=O(n,e);c.isCompleteForPath(r)&&(l=l.set(e,c.getNode().getChild(r)))}),ks(e,t,n,l,i,a,s,o)}}function js(e,t,n,r,i){let a=t.serverCache;return Cs(e,ko(t,a.getNode(),a.isFullyInitialized()||k(n),a.isFiltered()),n,r,_s,i)}function Ms(e,t,n,r,i,a){let o;if(ds(r,n)!=null)return t;{let s=new vs(r,t,i),c=t.eventCache.getNode(),l;if(k(n)||E(n)===`.priority`){let n;if(t.serverCache.isFullyInitialized())n=cs(r,jo(t));else{let e=t.serverCache.getNode();v(e instanceof N,`serverChildren would be complete if leaf node`),n=ls(r,e)}n=n,l=e.filter.updateFullNode(c,n,a)}else{let i=E(n),u=ps(r,i,t.serverCache);u==null&&t.serverCache.isCompleteForChild(i)&&(u=c.getImmediateChild(i)),l=u==null?t.eventCache.getNode().hasChild(i)?e.filter.updateChild(c,i,N.EMPTY_NODE,D(n),s,a):c:e.filter.updateChild(c,i,u,D(n),s,a),l.isEmpty()&&t.serverCache.isFullyInitialized()&&(o=cs(r,jo(t)),o.isLeafNode()&&(l=e.filter.updateFullNode(l,o,a)))}return o=t.serverCache.isFullyInitialized()||ds(r,T())!=null,Oo(t,l,o,e.filter.filtersNodes())}}var Ns=class{constructor(e,t){this.query_=e,this.eventRegistrations_=[];let n=this.query_._queryParams,r=new Ja(n.getIndex()),i=Qa(n);this.processor_=ys(i);let a=t.serverCache,o=t.eventCache,s=r.updateFullNode(N.EMPTY_NODE,a.getNode(),null),c=i.updateFullNode(N.EMPTY_NODE,o.getNode(),null),l=new xo(s,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Do(new xo(c,o.isFullyInitialized(),i.filtersNodes()),l),this.eventGenerator_=new So(this.query_)}get query(){return this.query_}};function Ps(e){return e.viewCache_.serverCache.getNode()}function Fs(e){return Ao(e.viewCache_)}function Is(e,t){let n=jo(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!k(t)&&!n.getImmediateChild(E(t)).isEmpty())?n.getChild(t):null}function Ls(e){return e.eventRegistrations_.length===0}function Rs(e,t){e.eventRegistrations_.push(t)}function zs(e,t,n){let r=[];if(n){v(t==null,`A cancel should cancel all event registrations.`);let i=e.query._path;e.eventRegistrations_.forEach(e=>{let t=e.createCancelEvent(n,i);t&&r.push(t)})}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){let i=e.eventRegistrations_[r];if(!i.matches(t))n.push(i);else if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}e.eventRegistrations_=n}else e.eventRegistrations_=[];return r}function Bs(e,t,n,r){t.type===po.MERGE&&t.source.queryId!==null&&(v(jo(e.viewCache_),`We should always have a full cache before handling merges`),v(Ao(e.viewCache_),`Missing event cache, even though we have a server cache`));let i=e.viewCache_,a=xs(e.processor_,i,t,n,r);return bs(e.processor_,a.viewCache),v(a.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),`Once a server snap is complete, it should never go back`),e.viewCache_=a.viewCache,Hs(e,a.changes,a.viewCache.eventCache.getNode(),null)}function Vs(e,t){let n=e.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(M,(e,t)=>{r.push(Wa(e,t))}),n.isFullyInitialized()&&r.push(Ua(n.getNode())),Hs(e,r,n.getNode(),t)}function Hs(e,t,n,r){let i=r?[r]:e.eventRegistrations_;return Co(e.eventGenerator_,t,n,i)}var Us,Ws=class{constructor(){this.views=new Map}};function Gs(e){v(!Us,`__referenceConstructor has already been defined`),Us=e}function Ks(){return v(Us,`Reference.ts has not been loaded`),Us}function qs(e){return e.views.size===0}function Js(e,t,n,r){let i=t.source.queryId;if(i!==null){let a=e.views.get(i);return v(a!=null,`SyncTree gave us an op for an invalid query.`),Bs(a,t,n,r)}else{let i=[];for(let a of e.views.values())i=i.concat(Bs(a,t,n,r));return i}}function Ys(e,t,n,r,i){let a=t._queryIdentifier,o=e.views.get(a);if(!o){let e=cs(n,i?r:null),a=!1;return e?a=!0:r instanceof N?(e=ls(n,r),a=!1):(e=N.EMPTY_NODE,a=!1),new Ns(t,Do(new xo(e,a,!1),new xo(r,i,!1)))}return o}function Xs(e,t,n,r,i,a){let o=Ys(e,t,r,i,a);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,o),Rs(o,n),Vs(o,n)}function Zs(e,t,n,r){let i=t._queryIdentifier,a=[],o=[],s=nc(e);if(i===`default`)for(let[t,i]of e.views.entries())o=o.concat(zs(i,n,r)),Ls(i)&&(e.views.delete(t),i.query._queryParams.loadsAllData()||a.push(i.query));else{let t=e.views.get(i);t&&(o=o.concat(zs(t,n,r)),Ls(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||a.push(t.query)))}return s&&!nc(e)&&a.push(new(Ks())(t._repo,t._path)),{removed:a,events:o}}function Qs(e){let t=[];for(let n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function $s(e,t){let n=null;for(let r of e.views.values())n||=Is(r,t);return n}function ec(e,t){if(t._queryParams.loadsAllData())return rc(e);{let n=t._queryIdentifier;return e.views.get(n)}}function tc(e,t){return ec(e,t)!=null}function nc(e){return rc(e)!=null}function rc(e){for(let t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}var ic;function ac(e){v(!ic,`__referenceConstructor has already been defined`),ic=e}function oc(){return v(ic,`Reference.ts has not been loaded`),ic}var sc=1,cc=class{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Po(null),this.pendingWriteTree_=ss(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}};function lc(e,t,n,r,i){return qo(e.pendingWriteTree_,t,n,r,i),i?Sc(e,new yo(mo(),t,n)):[]}function uc(e,t,n,r){Jo(e.pendingWriteTree_,t,n,r);let i=Po.fromObject(n);return Sc(e,new bo(mo(),t,i))}function dc(e,t,n=!1){let r=Yo(e.pendingWriteTree_,t);if(Xo(e.pendingWriteTree_,t)){let t=new Po(null);return r.snap==null?C(r.children,e=>{t=t.set(new w(e),!0)}):t=t.set(T(),!0),Sc(e,new _o(r.path,t,n))}else return[]}function fc(e,t,n){return Sc(e,new yo(ho(),t,n))}function pc(e,t,n){let r=Po.fromObject(n);return Sc(e,new bo(ho(),t,r))}function mc(e,t){return Sc(e,new vo(ho(),t))}function hc(e,t,n){let r=Oc(e,n);if(r){let n=kc(r),i=n.path,a=n.queryId,o=A(i,t);return Ac(e,i,new vo(go(a),o))}else return[]}function gc(e,t,n,r,i=!1){let a=t._path,o=e.syncPointTree_.get(a),s=[];if(o&&(t._queryIdentifier===`default`||tc(o,t))){let c=Zs(o,t,n,r);qs(o)&&(e.syncPointTree_=e.syncPointTree_.remove(a));let l=c.removed;if(s=c.events,!i){let n=l.findIndex(e=>e._queryParams.loadsAllData())!==-1,i=e.syncPointTree_.findOnPath(a,(e,t)=>nc(t));if(n&&!i){let t=e.syncPointTree_.subtree(a);if(!t.isEmpty()){let n=jc(t);for(let t=0;t<n.length;++t){let r=n[t],i=r.query,a=Tc(e,r);e.listenProvider_.startListening(Mc(i),Ec(e,i),a.hashFn,a.onComplete)}}}!i&&l.length>0&&!r&&(n?e.listenProvider_.stopListening(Mc(t),null):l.forEach(t=>{let n=e.queryToTagMap.get(Dc(t));e.listenProvider_.stopListening(Mc(t),n)}))}Nc(e,l)}return s}function _c(e,t,n,r){let i=Oc(e,r);if(i!=null){let r=kc(i),a=r.path,o=r.queryId,s=A(a,t);return Ac(e,a,new yo(go(o),s,n))}else return[]}function vc(e,t,n,r){let i=Oc(e,r);if(i){let r=kc(i),a=r.path,o=r.queryId,s=A(a,t),c=Po.fromObject(n);return Ac(e,a,new bo(go(o),s,c))}else return[]}function yc(e,t,n,r=!1){let i=t._path,a=null,o=!1;e.syncPointTree_.foreachOnPath(i,(e,t)=>{let n=A(e,i);a||=$s(t,n),o||=nc(t)});let s=e.syncPointTree_.get(i);s?(o||=nc(s),a||=$s(s,T())):(s=new Ws,e.syncPointTree_=e.syncPointTree_.set(i,s));let c;a==null?(c=!1,a=N.EMPTY_NODE,e.syncPointTree_.subtree(i).foreachChild((e,t)=>{let n=$s(t,T());n&&(a=a.updateImmediateChild(e,n))})):c=!0;let l=tc(s,t);if(!l&&!t._queryParams.loadsAllData()){let n=Dc(t);v(!e.queryToTagMap.has(n),`View does not exist, but we have a tag`);let r=Pc();e.queryToTagMap.set(n,r),e.tagToQueryMap.set(r,n)}let u=Ko(e.pendingWriteTree_,i),d=Xs(s,t,n,u,a,c);if(!l&&!o&&!r){let n=ec(s,t);d=d.concat(Fc(e,t,n))}return d}function bc(e,t,n){let r=e.pendingWriteTree_;return ts(r,t,e.syncPointTree_.findOnPath(t,(e,n)=>{let r=$s(n,A(e,t));if(r)return r}),n,!0)}function xc(e,t){let n=t._path,r=null;e.syncPointTree_.foreachOnPath(n,(e,t)=>{let i=A(e,n);r||=$s(t,i)});let i=e.syncPointTree_.get(n);i?r||=$s(i,T()):(i=new Ws,e.syncPointTree_=e.syncPointTree_.set(n,i));let a=r!=null,o=a?new xo(r,!0,!1):null,s=Ko(e.pendingWriteTree_,t._path);return Fs(Ys(i,t,s,a?o.getNode():N.EMPTY_NODE,a))}function Sc(e,t){return Cc(t,e.syncPointTree_,null,Ko(e.pendingWriteTree_,T()))}function Cc(e,t,n,r){if(k(e.path))return wc(e,t,n,r);{let i=t.get(T());n==null&&i!=null&&(n=$s(i,T()));let a=[],o=E(e.path),s=e.operationForChild(o),c=t.children.get(o);if(c&&s){let e=n?n.getImmediateChild(o):null,t=ms(r,o);a=a.concat(Cc(s,c,e,t))}return i&&(a=a.concat(Js(i,e,r,n))),a}}function wc(e,t,n,r){let i=t.get(T());n==null&&i!=null&&(n=$s(i,T()));let a=[];return t.children.inorderTraversal((t,i)=>{let o=n?n.getImmediateChild(t):null,s=ms(r,t),c=e.operationForChild(t);c&&(a=a.concat(wc(c,i,o,s)))}),i&&(a=a.concat(Js(i,e,r,n))),a}function Tc(e,t){let n=t.query,r=Ec(e,n);return{hashFn:()=>(Ps(t)||N.EMPTY_NODE).hash(),onComplete:t=>t===`ok`?r?hc(e,n._path,r):mc(e,n._path):gc(e,n,null,Er(t,n))}}function Ec(e,t){let n=Dc(t);return e.queryToTagMap.get(n)}function Dc(e){return e._path.toString()+`$`+e._queryIdentifier}function Oc(e,t){return e.tagToQueryMap.get(t)}function kc(e){let t=e.indexOf(`$`);return v(t!==-1&&t<e.length-1,`Bad queryKey.`),{queryId:e.substr(t+1),path:new w(e.substr(0,t))}}function Ac(e,t,n){let r=e.syncPointTree_.get(t);return v(r,`Missing sync point for query tag that we're tracking`),Js(r,n,Ko(e.pendingWriteTree_,t),null)}function jc(e){return e.fold((e,t,n)=>{if(t&&nc(t))return[rc(t)];{let e=[];return t&&(e=Qs(t)),C(n,(t,n)=>{e=e.concat(n)}),e}})}function Mc(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new(oc())(e._repo,e._path):e}function Nc(e,t){for(let n=0;n<t.length;++n){let r=t[n];if(!r._queryParams.loadsAllData()){let t=Dc(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}function Pc(){return sc++}function Fc(e,t,n){let r=t._path,i=Ec(e,t),a=Tc(e,n),o=e.listenProvider_.startListening(Mc(t),i,a.hashFn,a.onComplete),s=e.syncPointTree_.subtree(r);if(i)v(!nc(s.value),`If we're adding a query, it shouldn't be shadowed`);else{let t=s.fold((e,t,n)=>{if(!k(e)&&t&&nc(t))return[rc(t).query];{let e=[];return t&&(e=e.concat(Qs(t).map(e=>e.query))),C(n,(t,n)=>{e=e.concat(n)}),e}});for(let n=0;n<t.length;++n){let r=t[n];e.listenProvider_.stopListening(Mc(r),Ec(e,r))}}return o}var Ic=class e{constructor(e){this.node_=e}getImmediateChild(t){return new e(this.node_.getImmediateChild(t))}node(){return this.node_}},Lc=class e{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(t){let n=O(this.path_,t);return new e(this.syncTree_,n)}node(){return bc(this.syncTree_,this.path_)}},Rc=function(e){return e||={},e.timestamp=e.timestamp||new Date().getTime(),e},zc=function(e,t,n){if(!e||typeof e!=`object`)return e;if(v(`.sv`in e,`Unexpected leaf node or priority contents`),typeof e[`.sv`]==`string`)return Bc(e[`.sv`],t,n);if(typeof e[`.sv`]==`object`)return Vc(e[`.sv`],t);v(!1,`Unexpected server value: `+JSON.stringify(e,null,2))},Bc=function(e,t,n){switch(e){case`timestamp`:return n.timestamp;default:v(!1,`Unexpected server value: `+e)}},Vc=function(e,t,n){e.hasOwnProperty(`increment`)||v(!1,`Unexpected server value: `+JSON.stringify(e,null,2));let r=e.increment;typeof r!=`number`&&v(!1,`Unexpected increment value: `+r);let i=t.node();if(v(i!=null,`Expected ChildrenNode.EMPTY_NODE for nulls`),!i.isLeafNode())return r;let a=i.getValue();return typeof a==`number`?a+r:r},Hc=function(e,t,n,r){return Wc(t,new Lc(n,e),r)},Uc=function(e,t,n){return Wc(e,new Ic(t),n)};function Wc(e,t,n){let r=zc(e.getPriority().val(),t.getImmediateChild(`.priority`),n),i;if(e.isLeafNode()){let i=e,a=zc(i.getValue(),t,n);return a!==i.getValue()||r!==i.getPriority().val()?new Da(a,P(r)):e}else{let a=e;return i=a,r!==a.getPriority().val()&&(i=i.updatePriority(new Da(r))),a.forEachChild(M,(e,r)=>{let a=Wc(r,t.getImmediateChild(e),n);a!==r&&(i=i.updateImmediateChild(e,a))}),i}}var Gc=class{constructor(e=``,t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}};function Kc(e,t){let n=t instanceof w?t:new w(t),r=e,i=E(n);for(;i!==null;){let e=Ue(r.node.children,i)||{children:{},childCount:0};r=new Gc(i,r,e),n=D(n),i=E(n)}return r}function qc(e){return e.node.value}function Jc(e,t){e.node.value=t,tl(e)}function Yc(e){return e.node.childCount>0}function Xc(e){return qc(e)===void 0&&!Yc(e)}function Zc(e,t){C(e.node.children,(n,r)=>{t(new Gc(n,e,r))})}function Qc(e,t,n,r){n&&!r&&t(e),Zc(e,e=>{Qc(e,t,!0,r)}),n&&r&&t(e)}function $c(e,t,n){let r=n?e:e.parent;for(;r!==null;){if(t(r))return!0;r=r.parent}return!1}function el(e){return new w(e.parent===null?e.name:el(e.parent)+`/`+e.name)}function tl(e){e.parent!==null&&nl(e.parent,e.name,e)}function nl(e,t,n){let r=Xc(n),i=He(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,tl(e)):!r&&!i&&(e.node.children[t]=n.node,e.node.childCount++,tl(e))}var rl=/[\[\].#$\/\u0000-\u001F\u007F]/,il=/[\[\].#$\u0000-\u001F\u007F]/,al=10*1024*1024,ol=function(e){return typeof e==`string`&&e.length!==0&&!rl.test(e)},sl=function(e){return typeof e==`string`&&e.length!==0&&!il.test(e)},cl=function(e){return e&&=e.replace(/^\/*\.info(\/|$)/,`/`),sl(e)},ll=function(e){return e===null||typeof e==`string`||typeof e==`number`&&!mr(e)||e&&typeof e==`object`&&He(e,`.sv`)},ul=function(e,t,n,r){r&&t===void 0||dl(Xe(e,`value`),t,n)},dl=function(e,t,n){let r=n instanceof w?new Qi(n,e):n;if(t===void 0)throw Error(e+`contains undefined `+na(r));if(typeof t==`function`)throw Error(e+`contains a function `+na(r)+` with contents = `+t.toString());if(mr(t))throw Error(e+`contains `+t.toString()+` `+na(r));if(typeof t==`string`&&t.length>al/3&&Qe(t)>al)throw Error(e+`contains a string greater than 10485760 utf8 bytes `+na(r)+` ('`+t.substring(0,50)+`...')`);if(t&&typeof t==`object`){let n=!1,i=!1;if(C(t,(t,a)=>{if(t===`.value`)n=!0;else if(t!==`.priority`&&t!==`.sv`&&(i=!0,!ol(t)))throw Error(e+` contains an invalid key (`+t+`) `+na(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);$i(r,t),dl(e,a,r),ea(r)}),n&&i)throw Error(e+` contains ".value" child `+na(r)+` in addition to actual children.`)}},fl=function(e,t){let n,r;for(n=0;n<t.length;n++){r=t[n];let i=qi(r);for(let t=0;t<i.length;t++)if(!(i[t]===`.priority`&&t===i.length-1)&&!ol(i[t]))throw Error(e+`contains an invalid key (`+i[t]+`) in path `+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}t.sort(Yi);let i=null;for(n=0;n<t.length;n++){if(r=t[n],i!==null&&Zi(i,r))throw Error(e+`contains a path `+i.toString()+` that is ancestor of another path `+r.toString());i=r}},pl=function(e,t,n,r){if(r&&t===void 0)return;let i=Xe(e,`values`);if(!(t&&typeof t==`object`)||Array.isArray(t))throw Error(i+` must be an object containing the children to replace.`);let a=[];C(t,(e,t)=>{let r=new w(e);if(dl(i,t,O(n,r)),Gi(r)===`.priority`&&!ll(t))throw Error(i+`contains an invalid value for '`+r.toString()+`', which must be a valid Firebase priority (a string, finite number, server value, or null).`);a.push(r)}),fl(i,a)},ml=function(e,t,n,r){if(!(r&&n===void 0)&&!sl(n))throw Error(Xe(e,t)+`was an invalid path = "`+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},hl=function(e,t,n,r){n&&=n.replace(/^\/*\.info(\/|$)/,`/`),ml(e,t,n,r)},gl=function(e,t){if(E(t)===`.info`)throw Error(e+` failed = Can't modify data under /.info/`)},_l=function(e,t){let n=t.path.toString();if(typeof t.repoInfo.host!=`string`||t.repoInfo.host.length===0||!ol(t.repoInfo.namespace)&&t.repoInfo.host.split(`:`)[0]!==`localhost`||n.length!==0&&!cl(n))throw Error(Xe(e,`url`)+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)},vl=class{constructor(){this.eventLists_=[],this.recursionDepth_=0}};function yl(e,t){let n=null;for(let r=0;r<t.length;r++){let i=t[r],a=i.getPath();n!==null&&!Xi(a,n.path)&&(e.eventLists_.push(n),n=null),n===null&&(n={events:[],path:a}),n.events.push(i)}n&&e.eventLists_.push(n)}function bl(e,t,n){yl(e,n),Sl(e,e=>Xi(e,t))}function xl(e,t,n){yl(e,n),Sl(e,e=>Zi(e,t)||Zi(t,e))}function Sl(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){let i=e.eventLists_[r];if(i){let a=i.path;t(a)?(Cl(e.eventLists_[r]),e.eventLists_[r]=null):n=!1}}n&&(e.eventLists_=[]),e.recursionDepth_--}function Cl(e){for(let t=0;t<e.events.length;t++){let n=e.events[t];if(n!==null){e.events[t]=null;let r=n.getEventRunner();sr&&x(`event: `+n.toString()),jr(r)}}}var wl=`repo_interrupt`,Tl=25,El=class{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new vl,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ro(),this.transactionQueueTree_=new Gc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?`https://`:`http://`)+this.repoInfo_.host}};function Dl(e,t,n){if(e.stats_=ei(e.repoInfo_),e.forceRestClient_||Mr())e.server_=new to(e.repoInfo_,(t,n,r,i)=>{Al(e,t,n,r,i)},e.authTokenProvider_,e.appCheckProvider_),setTimeout(()=>jl(e,!0),0);else{if(n!=null){if(typeof n!=`object`)throw Error(`Only objects are supported for option databaseAuthVariableOverride`);try{y(n)}catch(e){throw Error(`Invalid authOverride provided: `+e)}}e.persistentConnection_=new da(e.repoInfo_,t,(t,n,r,i)=>{Al(e,t,n,r,i)},t=>{jl(e,t)},t=>{Ml(e,t)},e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener(t=>{e.server_.refreshAuthToken(t)}),e.appCheckProvider_.addTokenChangeListener(t=>{e.server_.refreshAppCheckToken(t.token)}),e.statsReporter_=ti(e.repoInfo_,()=>new fo(e.stats_,e.server_)),e.infoData_=new no,e.infoSyncTree_=new cc({startListening:(t,n,r,i)=>{let a=[],o=e.infoData_.getNode(t._path);return o.isEmpty()||(a=fc(e.infoSyncTree_,t._path,o),setTimeout(()=>{i(`ok`)},0)),a},stopListening:()=>{}}),Nl(e,`connected`,!1),e.serverSyncTree_=new cc({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,(n,r)=>{let a=i(n,r);xl(e.eventQueue_,t._path,a)}),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function Ol(e){let t=e.infoData_.getNode(new w(`.info/serverTimeOffset`)).val()||0;return new Date().getTime()+t}function kl(e){return Rc({timestamp:Ol(e)})}function Al(e,t,n,r,i){e.dataUpdateCount++;let a=new w(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let o=[];if(i)if(r){let t=Ge(n,e=>P(e));o=vc(e.serverSyncTree_,a,t,i)}else{let t=P(n);o=_c(e.serverSyncTree_,a,t,i)}else if(r){let t=Ge(n,e=>P(e));o=pc(e.serverSyncTree_,a,t)}else{let t=P(n);o=fc(e.serverSyncTree_,a,t)}let s=a;o.length>0&&(s=Jl(e,a)),xl(e.eventQueue_,s,o)}function jl(e,t){Nl(e,`connected`,t),t===!1&&Rl(e)}function Ml(e,t){C(t,(t,n)=>{Nl(e,t,n)})}function Nl(e,t,n){let r=new w(`/.info/`+t),i=P(n);e.infoData_.updateSnapshot(r,i);let a=fc(e.infoSyncTree_,r,i);xl(e.eventQueue_,r,a)}function Pl(e){return e.nextWriteId_++}function Fl(e,t,n){let r=xc(e.serverSyncTree_,t);return r==null?e.server_.get(t).then(r=>{let i=P(r).withIndex(t._queryParams.getIndex());yc(e.serverSyncTree_,t,n,!0);let a;if(t._queryParams.loadsAllData())a=fc(e.serverSyncTree_,t._path,i);else{let n=Ec(e.serverSyncTree_,t);a=_c(e.serverSyncTree_,t._path,i,n)}return xl(e.eventQueue_,t._path,a),gc(e.serverSyncTree_,t,n,null,!0),i},n=>(Hl(e,`get for query `+y(t)+` failed: `+n),Promise.reject(Error(n)))):Promise.resolve(r)}function Il(e,t,n,r,i){Hl(e,`set`,{path:t.toString(),value:n,priority:r});let a=kl(e),o=P(n,r),s=Uc(o,bc(e.serverSyncTree_,t),a),c=Pl(e),l=lc(e.serverSyncTree_,t,s,c,!0);yl(e.eventQueue_,l),e.server_.put(t.toString(),o.val(!0),(n,r)=>{let a=n===`ok`;a||S(`set at `+t+` failed: `+n);let o=dc(e.serverSyncTree_,c,!a);xl(e.eventQueue_,t,o),Ul(e,i,n,r)});let u=eu(e,t);Jl(e,u),xl(e.eventQueue_,u,[])}function Ll(e,t,n,r){Hl(e,`update`,{path:t.toString(),value:n});let i=!0,a=kl(e),o={};if(C(n,(n,r)=>{i=!1,o[n]=Hc(O(t,n),P(r),e.serverSyncTree_,a)}),i)x(`update() called with empty data.  Don't do anything.`),Ul(e,r,`ok`,void 0);else{let i=Pl(e),a=uc(e.serverSyncTree_,t,o,i);yl(e.eventQueue_,a),e.server_.merge(t.toString(),n,(n,a)=>{let o=n===`ok`;o||S(`update at `+t+` failed: `+n);let s=dc(e.serverSyncTree_,i,!o),c=s.length>0?Jl(e,t):t;xl(e.eventQueue_,c,s),Ul(e,r,n,a)}),C(n,n=>{Jl(e,eu(e,O(t,n)))}),xl(e.eventQueue_,t,[])}}function Rl(e){Hl(e,`onDisconnectEvents`);let t=kl(e),n=ro();ao(e.onDisconnect_,T(),(r,i)=>{io(n,r,Hc(r,i,e.serverSyncTree_,t))});let r=[];ao(n,T(),(t,n)=>{r=r.concat(fc(e.serverSyncTree_,t,n)),Jl(e,eu(e,t))}),e.onDisconnect_=ro(),xl(e.eventQueue_,T(),r)}function zl(e,t,n){let r;r=E(t._path)===`.info`?yc(e.infoSyncTree_,t,n):yc(e.serverSyncTree_,t,n),bl(e.eventQueue_,t._path,r)}function Bl(e,t,n){let r;r=E(t._path)===`.info`?gc(e.infoSyncTree_,t,n):gc(e.serverSyncTree_,t,n),bl(e.eventQueue_,t._path,r)}function Vl(e){e.persistentConnection_&&e.persistentConnection_.interrupt(wl)}function Hl(e,...t){let n=``;e.persistentConnection_&&(n=e.persistentConnection_.id+`:`),x(n,...t)}function Ul(e,t,n,r){t&&jr(()=>{if(n===`ok`)t(null);else{let e=(n||`error`).toUpperCase(),i=e;r&&(i+=`: `+r);let a=Error(i);a.code=e,t(a)}})}function Wl(e,t,n,r,i,a){Hl(e,`transaction on `+t);let o={path:t,update:n,onComplete:r,status:null,order:ir(),applyLocally:a,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},s=Gl(e,t,void 0);o.currentInputSnapshot=s;let c=o.update(s.val());if(c===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{dl(`transaction failed: Data returned `,c,o.path),o.status=0;let n=Kc(e.transactionQueueTree_,t),r=qc(n)||[];r.push(o),Jc(n,r);let i;typeof c==`object`&&c&&He(c,`.priority`)?(i=Ue(c,`.priority`),v(ll(i),`Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.`)):i=(bc(e.serverSyncTree_,t)||N.EMPTY_NODE).getPriority().val();let a=kl(e),l=P(c,i),u=Uc(l,s,a);o.currentOutputSnapshotRaw=l,o.currentOutputSnapshotResolved=u,o.currentWriteId=Pl(e);let d=lc(e.serverSyncTree_,t,u,o.currentWriteId,o.applyLocally);xl(e.eventQueue_,t,d),Kl(e,e.transactionQueueTree_)}}function Gl(e,t,n){return bc(e.serverSyncTree_,t,n)||N.EMPTY_NODE}function Kl(e,t=e.transactionQueueTree_){if(t||$l(e,t),qc(t)){let n=Zl(e,t);v(n.length>0,`Sending zero length transaction queue`),n.every(e=>e.status===0)&&ql(e,el(t),n)}else Yc(t)&&Zc(t,t=>{Kl(e,t)})}function ql(e,t,n){let r=Gl(e,t,n.map(e=>e.currentWriteId)),i=r,a=r.hash();for(let e=0;e<n.length;e++){let r=n[e];v(r.status===0,`tryToSendTransactionQueue_: items in queue should all be run.`),r.status=1,r.retryCount++;let a=A(t,r.path);i=i.updateChild(a,r.currentOutputSnapshotRaw)}let o=i.val(!0),s=t;e.server_.put(s.toString(),o,r=>{Hl(e,`transaction put response`,{path:s.toString(),status:r});let i=[];if(r===`ok`){let r=[];for(let t=0;t<n.length;t++)n[t].status=2,i=i.concat(dc(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&r.push(()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved)),n[t].unwatcher();$l(e,Kc(e.transactionQueueTree_,t)),Kl(e,e.transactionQueueTree_),xl(e.eventQueue_,t,i);for(let e=0;e<r.length;e++)jr(r[e])}else{if(r===`datastale`)for(let e=0;e<n.length;e++)n[e].status===3?n[e].status=4:n[e].status=0;else{S(`transaction at `+s.toString()+` failed: `+r);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=r}Jl(e,t)}},a)}function Jl(e,t){let n=Xl(e,t),r=el(n);return Yl(e,Zl(e,n),r),r}function Yl(e,t,n){if(t.length===0)return;let r=[],i=[],a=t.filter(e=>e.status===0).map(e=>e.currentWriteId);for(let o=0;o<t.length;o++){let s=t[o],c=A(n,s.path),l=!1,u;if(v(c!==null,`rerunTransactionsUnderNode_: relativePath should not be null.`),s.status===4)l=!0,u=s.abortReason,i=i.concat(dc(e.serverSyncTree_,s.currentWriteId,!0));else if(s.status===0)if(s.retryCount>=Tl)l=!0,u=`maxretry`,i=i.concat(dc(e.serverSyncTree_,s.currentWriteId,!0));else{let n=Gl(e,s.path,a);s.currentInputSnapshot=n;let r=t[o].update(n.val());if(r!==void 0){dl(`transaction failed: Data returned `,r,s.path);let t=P(r);typeof r==`object`&&r&&He(r,`.priority`)||(t=t.updatePriority(n.getPriority()));let o=s.currentWriteId,c=kl(e),l=Uc(t,n,c);s.currentOutputSnapshotRaw=t,s.currentOutputSnapshotResolved=l,s.currentWriteId=Pl(e),a.splice(a.indexOf(o),1),i=i.concat(lc(e.serverSyncTree_,s.path,l,s.currentWriteId,s.applyLocally)),i=i.concat(dc(e.serverSyncTree_,o,!0))}else l=!0,u=`nodata`,i=i.concat(dc(e.serverSyncTree_,s.currentWriteId,!0))}xl(e.eventQueue_,n,i),i=[],l&&(t[o].status=2,(function(e){setTimeout(e,0)})(t[o].unwatcher),t[o].onComplete&&(u===`nodata`?r.push(()=>t[o].onComplete(null,!1,t[o].currentInputSnapshot)):r.push(()=>t[o].onComplete(Error(u),!1,null))))}$l(e,e.transactionQueueTree_);for(let e=0;e<r.length;e++)jr(r[e]);Kl(e,e.transactionQueueTree_)}function Xl(e,t){let n,r=e.transactionQueueTree_;for(n=E(t);n!==null&&qc(r)===void 0;)r=Kc(r,n),t=D(t),n=E(t);return r}function Zl(e,t){let n=[];return Ql(e,t,n),n.sort((e,t)=>e.order-t.order),n}function Ql(e,t,n){let r=qc(t);if(r)for(let e=0;e<r.length;e++)n.push(r[e]);Zc(t,t=>{Ql(e,t,n)})}function $l(e,t){let n=qc(t);if(n){let e=0;for(let t=0;t<n.length;t++)n[t].status!==2&&(n[e]=n[t],e++);n.length=e,Jc(t,n.length>0?n:void 0)}Zc(t,t=>{$l(e,t)})}function eu(e,t){let n=el(Xl(e,t)),r=Kc(e.transactionQueueTree_,t);return $c(r,t=>{tu(e,t)}),tu(e,r),Qc(r,t=>{tu(e,t)}),n}function tu(e,t){let n=qc(t);if(n){let r=[],i=[],a=-1;for(let t=0;t<n.length;t++)n[t].status===3||(n[t].status===1?(v(a===t-1,`All SENT items should be at beginning of queue.`),a=t,n[t].status=3,n[t].abortReason=`set`):(v(n[t].status===0,`Unexpected transaction status in abort`),n[t].unwatcher(),i=i.concat(dc(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&r.push(n[t].onComplete.bind(null,Error(`set`),!1,null))));a===-1?Jc(t,void 0):n.length=a+1,xl(e.eventQueue_,el(t),i);for(let e=0;e<r.length;e++)jr(r[e])}}function nu(e){let t=``,n=e.split(`/`);for(let e=0;e<n.length;e++)if(n[e].length>0){let r=n[e];try{r=decodeURIComponent(r.replace(/\+/g,` `))}catch{}t+=`/`+r}return t}function ru(e){let t={};e.charAt(0)===`?`&&(e=e.substring(1));for(let n of e.split(`&`)){if(n.length===0)continue;let r=n.split(`=`);r.length===2?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):S(`Invalid query segment '${n}' in query '${e}'`)}return t}var iu=function(e,t){let n=au(e),r=n.namespace;n.domain===`firebase.com`&&fr(n.host+` is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead`),(!r||r===`undefined`)&&n.domain!==`localhost`&&fr(`Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com`),n.secure||pr();let i=n.scheme===`ws`||n.scheme===`wss`;return{repoInfo:new Jr(n.host,n.secure,r,i,t,``,r!==n.subdomain),path:new w(n.pathString)}},au=function(e){let t=``,n=``,r=``,i=``,a=``,o=!0,s=`https`,c=443;if(typeof e==`string`){let l=e.indexOf(`//`);l>=0&&(s=e.substring(0,l-1),e=e.substring(l+2));let u=e.indexOf(`/`);u===-1&&(u=e.length);let d=e.indexOf(`?`);d===-1&&(d=e.length),t=e.substring(0,Math.min(u,d)),u<d&&(i=nu(e.substring(u,d)));let f=ru(e.substring(Math.min(e.length,d)));l=t.indexOf(`:`),l>=0?(o=s===`https`||s===`wss`,c=parseInt(t.substring(l+1),10)):l=t.length;let p=t.slice(0,l);if(p.toLowerCase()===`localhost`)n=`localhost`;else if(p.split(`.`).length<=2)n=p;else{let e=t.indexOf(`.`);r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),a=r}`ns`in f&&(a=f.ns)}return{host:t,port:c,domain:n,subdomain:r,secure:o,scheme:s,pathString:i,namespace:a}},ou=`-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz`,su=(function(){let e=0,t=[];return function(n){let r=n===e;e=n;let i,a=Array(8);for(i=7;i>=0;i--)a[i]=ou.charAt(n%64),n=Math.floor(n/64);v(n===0,`Cannot push at time == 0`);let o=a.join(``);if(r){for(i=11;i>=0&&t[i]===63;i--)t[i]=0;t[i]++}else for(i=0;i<12;i++)t[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=ou.charAt(t[i]);return v(o.length===20,`nextPushId: Length should be 20.`),o}})(),cu=class{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){let e=this.snapshot.ref;return this.eventType===`value`?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+`:`+this.eventType+`:`+y(this.snapshot.exportVal())}},lu=class{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return`cancel`}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+`:cancel`}},uu=class{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return v(this.hasCancelCallback,`Raising a cancel event on a listener with no cancel callback`),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}},du=class e{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return k(this._path)?null:Gi(this._path)}get ref(){return new fu(this._repo,this._path)}get _queryIdentifier(){let e=xr(eo(this._queryParams));return e===`{}`?`default`:e}get _queryObject(){return eo(this._queryParams)}isEqual(t){if(t=$e(t),!(t instanceof e))return!1;let n=this._repo===t._repo,r=Xi(this._path,t._path),i=this._queryIdentifier===t._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Ki(this._path)}},fu=class e extends du{constructor(e,t){super(e,t,new Za,!1)}get parent(){let t=Ji(this._path);return t===null?null:new e(this._repo,t)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}},pu=class e{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(t){let n=new w(t),r=mu(this.ref,t);return new e(this._node.getChild(n),r,M)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(t){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(n,r)=>t(new e(r,mu(this.ref,n),M)))}hasChild(e){let t=new w(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function F(e,t){return e=$e(e),e._checkNotDeleted(`ref`),t===void 0?e._root:mu(e._root,t)}function mu(e,t){return e=$e(e),E(e._path)===null?hl(`child`,`path`,t,!1):ml(`child`,`path`,t,!1),new fu(e._repo,O(e._path,t))}function hu(e,t){e=$e(e),gl(`push`,e._path),ul(`push`,t,e._path,!0);let n=su(Ol(e._repo)),r=mu(e,n),i=mu(e,n),a;return a=t==null?Promise.resolve(i):_u(i,t).then(()=>i),r.then=a.then.bind(a),r.catch=a.then.bind(a,void 0),r}function gu(e){return gl(`remove`,e._path),_u(e,null)}function _u(e,t){e=$e(e),gl(`set`,e._path),ul(`set`,t,e._path,!1);let n=new Te;return Il(e._repo,e._path,t,null,n.wrapCallback(()=>{})),n.promise}function I(e,t){pl(`update`,t,e._path,!1);let n=new Te;return Ll(e._repo,e._path,t,n.wrapCallback(()=>{})),n.promise}function vu(e){e=$e(e);let t=new yu(new uu(()=>{}));return Fl(e._repo,e,t).then(t=>new pu(t,new fu(e._repo,e._path),e._queryParams.getIndex()))}var yu=class e{constructor(e){this.callbackContext=e}respondsTo(e){return e===`value`}createEvent(e,t){let n=t._queryParams.getIndex();return new cu(`value`,this,new pu(e.snapshotNode,new fu(t._repo,t._path),n))}getEventRunner(e){return e.getEventType()===`cancel`?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new lu(this,e,t):null}matches(t){return t instanceof e?!t.callbackContext||!this.callbackContext?!0:t.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}},bu=class e{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e===`children_added`?`child_added`:e;return t=t===`children_removed`?`child_removed`:t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new lu(this,e,t):null}createEvent(e,t){v(e.childName!=null,`Child events should have a childName.`);let n=mu(new fu(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new cu(e.type,this,new pu(e.snapshotNode,n,r),e.prevName)}getEventRunner(e){return e.getEventType()===`cancel`?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(t){return t instanceof e?this.eventType===t.eventType&&(!this.callbackContext||!t.callbackContext||this.callbackContext.matches(t.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}};function xu(e,t,n,r,i){let a;if(typeof r==`object`&&(a=void 0,i=r),typeof r==`function`&&(a=r),i&&i.onlyOnce){let t=n,r=(n,r)=>{Bl(e._repo,e,s),t(n,r)};r.userCallback=n.userCallback,r.context=n.context,n=r}let o=new uu(n,a||void 0),s=t===`value`?new yu(o):new bu(t,o);return zl(e._repo,e,s),()=>Bl(e._repo,e,s)}function Su(e,t,n,r){return xu(e,`value`,t,n,r)}Gs(fu),ac(fu);var Cu=`FIREBASE_DATABASE_EMULATOR_HOST`,wu={},Tu=!1;function Eu(e,t,n,r){let i=t.lastIndexOf(`:`);e.repoInfo_=new Jr(t,et(t.substring(0,i)),e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(e.authTokenProvider_=r)}function Du(e,t,n,r,i){let a=r||e.options.databaseURL;a===void 0&&(e.options.projectId||fr(`Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp().`),x(`Using default host for project `,e.options.projectId),a=`${e.options.projectId}-default-rtdb.firebaseio.com`);let o=iu(a,i),s=o.repoInfo,c,l;typeof process<`u`&&(l={}[Cu]),l?(c=!0,a=`http://${l}?ns=${s.namespace}`,o=iu(a,i),s=o.repoInfo):c=!o.repoInfo.secure;let u=i&&c?new Ir(Ir.OWNER):new Fr(e.name,e.options,t);return _l(`Invalid Firebase Database URL`,o),k(o.path)||fr(`Database URL must point to the root of a Firebase Database (not including a child path).`),new Au(ku(s,e,u,new Pr(e,n)),e)}function Ou(e,t){let n=wu[t];(!n||n[e.key]!==e)&&fr(`Database ${t}(${e.repoInfo_}) has already been deleted.`),Vl(e),delete n[e.key]}function ku(e,t,n,r){let i=wu[t.name];i||(i={},wu[t.name]=i);let a=i[e.toURLString()];return a&&fr(`Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.`),a=new El(e,Tu,n,r),i[e.toURLString()]=a,a}var Au=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type=`database`,this._instanceStarted=!1}get _repo(){return this._instanceStarted||=(Dl(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),!0),this._repoInternal}get _root(){return this._rootInternal||=new fu(this._repo,T()),this._rootInternal}_delete(){return this._rootInternal!==null&&(Ou(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&fr(`Cannot call `+e+` on a deleted database.`)}};function ju(e=kn(),t){let n=Cn(e,`database`).getImmediate({identifier:t});if(!n._instanceStarted){let e=Ce(`database`);e&&Mu(n,...e)}return n}function Mu(e,t,n,r={}){e=$e(e),e._checkNotDeleted(`useEmulator`);let i=`${t}:${n}`,a=e._repoInternal;if(e._instanceStarted){if(i===e._repoInternal.repoInfo_.host&&Ke(r,a.repoInfo_.emulatorOptions))return;fr(`connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.`)}let o;a.repoInfo_.nodeAdmin?(r.mockUserToken&&fr(`mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".`),o=new Ir(Ir.OWNER)):r.mockUserToken&&(o=new Ir(typeof r.mockUserToken==`string`?r.mockUserToken:Ee(r.mockUserToken,e.app.options.projectId))),et(t)&&tt(t),Eu(a,i,r,o)}function Nu(e){Zn(Dn),Sn(new nt(`database`,(e,{instanceIdentifier:t})=>Du(e.getProvider(`app`).getImmediate(),e.getProvider(`auth-internal`),e.getProvider(`app-check-internal`),t),`PUBLIC`).setMultipleInstances(!0)),An(Jn,Yn,e),An(Jn,Yn,`esm2020`)}var Pu={".sv":`timestamp`};function L(){return Pu}var Fu=class{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}};function Iu(e,t,n){if(e=$e(e),gl(`Reference.transaction`,e._path),e.key===`.length`||e.key===`.keys`)throw`Reference.transaction failed: `+e.key+` is a read-only object.`;let r=n?.applyLocally??!0,i=new Te,a=(t,n,r)=>{let a=null;t?i.reject(t):(a=new pu(r,new fu(e._repo,e._path),M),i.resolve(new Fu(n,a)))},o=Su(e,()=>{});return Wl(e._repo,e._path,t,a,o,r),i.promise}da.prototype.simpleListen=function(e,t){this.sendRequest(`q`,{p:e},t)},da.prototype.echo=function(e,t){this.sendRequest(`echo`,{d:e},t)},Nu();var R=ju(On({apiKey:`AIzaSyCIiLQef8o4Ls2xuNeyPpLxDAaFaOfiteg`,authDomain:`cribbage-duo.firebaseapp.com`,databaseURL:`https://cribbage-duo-default-rtdb.firebaseio.com`,projectId:`cribbage-duo`,storageBucket:`cribbage-duo.firebasestorage.app`,messagingSenderId:`671937213429`,appId:`1:671937213429:web:b67f828e4347f49cb5a6bc`,measurementId:`G-4YGDS4XNDY`}));function z(e,t=``){return F(R,t?`games/${e}/${t}`:`games/${e}`)}async function Lu(e=`off`){let t=hu(F(R,`games`)),n=t.key;return await _u(t,{id:n,telemetry:e,phase:`cut_for_deal`,dealer:null,cutForDeal:{spencer:null,kari:null},round:1,scores:{spencer:0,kari:0},hands:{spencer:null,kari:null},crib:null,starter:null,pegging:{pile:null,runningTotal:0,turn:null,go:{spencer:!1,kari:!1}},turnToShow:null,winner:null,createdAt:L(),updatedAt:L()}),n}async function B(e){let t=await vu(z(e));return t.exists()?t.val():null}function Ru(e,t){return Su(z(e),e=>{t(e.exists()?e.val():null)})}async function zu(e,t,n){let r=await B(e),i=t===`spencer`?`kari`:`spencer`,a=r.cutForDeal||{},o={[`cutForDeal/${t}`]:n,updatedAt:L()};if(a[i]){let s=[`A`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`,`J`,`Q`,`K`],c=s.indexOf(n.rank),l=s.indexOf(a[i].rank);if(c===l){await I(z(e),{cutForDeal:null,cutForDealTie:{rank:n.rank,count:(r.cutForDealTie&&r.cutForDealTie.count||0)+1},updatedAt:L()});return}o.dealer=c<l?t:i,o.cutForDealTie=null}await I(z(e),o)}async function Bu(e,t){if((await B(e)).phase!==`cut_for_deal`)return;let n=t===`spencer`?`kari`:`spencer`;await I(z(e),{[`cutForDealReady/${t}`]:!0,updatedAt:L()});let r=await B(e);r.phase===`cut_for_deal`&&r.cutForDealReady?.[n]&&await I(z(e),{phase:`deal`,readyToDeal:{spencer:!1,kari:!1},cutForDealReady:null,updatedAt:L()})}async function Vu(e,t){let n=t===`spencer`?`kari`:`spencer`;return await I(z(e),{[`readyToDeal/${t}`]:!0,updatedAt:L()}),(await B(e)).readyToDeal?.[n]===!0}async function Hu(e,t){await I(z(e),{phase:`discard`,"hands/spencer":t.spencer,"hands/kari":t.kari,crib:null,discards:null,keptHands:null,starter:null,"pegging/pile":null,"pegging/runningTotal":0,"pegging/turn":null,"pegging/go":{spencer:!1,kari:!1},"pegging/lastPlay":null,turnToShow:null,showResult:null,showReady:null,roundScoring:{scoresAtStart:null,spencer:{hand:0,peg:0,crib:0},kari:{hand:0,peg:0,crib:0}},updatedAt:L()})}async function Uu(e,t,n,r){await I(z(e),{[`hands/${t}`]:n,[`keptHands/${t}`]:n,[`discards/${t}`]:r,updatedAt:L()});let i=await B(e),a=i.discards?.spencer?Object.values(i.discards.spencer):[],o=i.discards?.kari?Object.values(i.discards.kari):[];a.length===2&&o.length===2&&i.phase===`discard`&&await I(z(e),{crib:[...a,...o],phase:`cut`,updatedAt:L()})}async function Wu(e,t,n){await I(F(R,`analytics/${e}/roundLog`),{[t]:n})}async function Gu(e){let t=await vu(F(R,`analytics/${e}/roundLog`));return t.exists()?t.val():null}async function Ku(e,t,n){await I(F(R,`analytics/${e}/telemetryUsed`),{[t]:n})}async function qu(e){let t=await vu(F(R,`analytics/${e}/telemetryUsed`));return t.exists()?t.val():null}async function Ju(e,t,n){let r=await B(e),i=r.dealer===`spencer`?`kari`:`spencer`,a={starter:t,heels:n>0?{player:r.dealer,points:n}:null,phase:`play`,"pegging/turn":i,"pegging/pile":null,"pegging/runningTotal":0,"pegging/go":{spencer:!1,kari:!1},"pegging/lastPlay":null,"roundScoring/scoresAtStart":{spencer:r.scores?.spencer||0,kari:r.scores?.kari||0},updatedAt:L()};if(n>0){let e=(r.scores[r.dealer]||0)+n;a[`scores/${r.dealer}`]=Math.min(e,121),e>=121&&(a.phase=`done`,a.winner=r.dealer)}await I(z(e),a)}async function Yu(e,t,n,r){let i=await B(e);if(i.phase!==`play`||i.pegging?.turn!==t)return;let a=Object.values(i.hands[t]||[]),o=a.findIndex(e=>e.rank===n.rank&&e.suit===n.suit);if(o===-1)return;let s=i.pegging.pile?Object.values(i.pegging.pile):[],c=t===`spencer`?`kari`:`spencer`,l=[...a.slice(0,o),...a.slice(o+1)],u=[...s,{...n,playedBy:t}],d=l.length===0,f=Object.values(i.hands[c]||[]),p=i.pegging?.go?.[c]===!0,m;m=d&&f.length>0?c:f.length===0||p?t:c;let h={[`hands/${t}`]:l.length>0?l:null,"pegging/pile":u,"pegging/runningTotal":r.runningTotal,"pegging/turn":m,[`pegging/go/${t}`]:!1,"pegging/lastPlay":{player:t,card:n,points:r.points,breakdown:r.breakdown||[]},updatedAt:L()};if(r.points>0){let e=(i.scores[t]||0)+r.points;h[`scores/${t}`]=Math.min(e,121),h[`roundScoring/${t}/peg`]=(i.roundScoring?.[t]?.peg||0)+r.points,e>=121&&(h.phase=`done`,h.winner=t)}r.runningTotal===31&&!h.winner&&(h[`pegging/pile`]=null,h[`pegging/runningTotal`]=0,h[`pegging/go/spencer`]=!1,h[`pegging/go/kari`]=!1,f.length>0?h[`pegging/turn`]=c:l.length>0&&(h[`pegging/turn`]=t)),await I(z(e),h)}async function Xu(e,t){let n=await B(e),r=t===`spencer`?`kari`:`spencer`;if(n.pegging.go[r]){let i=t,a=(n.scores[i]||0)+1,o=Object.values(n.hands?.[r]||[]),s=Object.values(n.hands?.[t]||[]),c=o.length>0?r:s.length>0?t:r,l={[`scores/${i}`]:Math.min(a,121),[`roundScoring/${i}/peg`]:(n.roundScoring?.[i]?.peg||0)+1,"pegging/pile":null,"pegging/runningTotal":0,"pegging/go":{spencer:!1,kari:!1},"pegging/turn":c,"pegging/lastPlay":{player:i,card:null,points:1,breakdown:[{type:`go`,points:1}]},updatedAt:L()};a>=121&&(l.phase=`done`,l.winner=i),await I(z(e),l)}else if(Object.values(n.hands?.[r]||[]).length===0){let r=t,i=(n.scores[r]||0)+1,a={[`scores/${r}`]:Math.min(i,121),[`roundScoring/${r}/peg`]:(n.roundScoring?.[r]?.peg||0)+1,"pegging/pile":null,"pegging/runningTotal":0,"pegging/go":{spencer:!1,kari:!1},"pegging/turn":r,"pegging/lastPlay":{player:r,card:null,points:1,breakdown:[{type:`go`,points:1}]},updatedAt:L()};i>=121&&(a.phase=`done`,a.winner=r),await I(z(e),a)}else await I(z(e),{[`pegging/go/${t}`]:!0,"pegging/turn":r,updatedAt:L()})}async function Zu(e,t){let n=await B(e),r=(n.scores[t]||0)+1,i={[`scores/${t}`]:Math.min(r,121),[`roundScoring/${t}/peg`]:(n.roundScoring?.[t]?.peg||0)+1,"pegging/lastPlay":{player:t,card:null,points:1,breakdown:[{type:`lastCard`,points:1}]},updatedAt:L()};r>=121&&(i.phase=`done`,i.winner=t),await I(z(e),i)}async function Qu(e){let t=(await B(e)).dealer===`spencer`?`kari`:`spencer`;await I(z(e),{phase:`show`,turnToShow:t,updatedAt:L()})}async function $u(e,t,n,r=null){let i=await B(e),a=(i.scores[t]||0)+n,o={player:t,points:n,phase:i.turnToShow};r&&(o.breakdown=r.breakdown,o.hand=r.hand,o.starter=r.starter,o.who=r.who,o.isCrib=!1);let s={[`scores/${t}`]:Math.min(a,121),[`roundScoring/${t}/hand`]:n,showResult:o,showReady:{spencer:!1,kari:!1},updatedAt:L()};a>=121&&(s.phase=`done`,s.winner=t),await I(z(e),s)}async function ed(e,t){let n=t===`spencer`?`kari`:`spencer`,r=await B(e),i=r.showResult?.phase||r.turnToShow||`show`;await I(z(e),{[`showReady/${t}`]:i,updatedAt:L()});let a=await B(e),o=a.showResult?.phase||a.turnToShow||`show`;if(i===o&&a.showReady?.[n]===o){let t=a.dealer===`spencer`?`kari`:`spencer`,n=a.showResult?.phase||a.turnToShow,r={showResult:null,showReady:null,updatedAt:L()};if(n===t)r.turnToShow=a.dealer;else if(n===a.dealer)r.turnToShow=`crib`;else if(n===`crib`)r.showResult={phase:`round_summary`,roundScoring:a.roundScoring||{},scores:a.scores||{},dealer:a.dealer,round:a.round},r.showReady={spencer:!1,kari:!1},r.turnToShow=`summary`;else if(n===`round_summary`||a.turnToShow===`summary`){let e=a.showResult?.dealer||a.dealer;(a.scores?.spencer||0)>=121||(a.scores?.kari||0)>=121?(r.phase=`done`,r.winner=(a.scores?.spencer||0)>=121?`spencer`:`kari`):(r.phase=`deal`,r.dealer=e===`spencer`?`kari`:`spencer`,r.round=(a.round||1)+1,r.readyToDeal={spencer:!1,kari:!1})}await I(z(e),r)}}async function td(e,t,n=null){let r=await B(e),i=r.dealer,a=(r.scores[i]||0)+t,o={player:i,points:t,phase:`crib`};n&&(o.breakdown=n.breakdown,o.hand=n.hand,o.starter=n.starter,o.who=n.who,o.isCrib=!0);let s={[`scores/${i}`]:Math.min(a,121),[`roundScoring/${i}/crib`]:t,showResult:o,showReady:{spencer:!1,kari:!1},updatedAt:L()};a>=121&&(s.phase=`done`,s.winner=i),await I(z(e),s)}async function nd(e,t,n=null,r=`off`){await _u(F(R,`lobby`),{gameId:e,createdBy:t,seriesType:n,telemetry:r,createdAt:L()})}async function rd(){let e=await vu(F(R,`lobby`));return e.exists()?e.val():null}async function id(e=null){if(!e){await gu(F(R,`lobby`));return}await Iu(F(R,`lobby`),t=>{if(t===null||t.gameId===e)return null})}function ad(e){return Su(F(R,`.info/connected`),t=>{e(t.val()===!0)})}async function od(e,t,n,r=`off`){let i=await Iu(F(R,`lobby`),i=>{if(i===null)return{gameId:e,createdBy:t,seriesType:n??null,telemetry:r,createdAt:Date.now()}});return{claimed:i.committed,current:i.snapshot.val()}}function sd(e){return Su(F(R,`lobby`),t=>{e(t.exists()?t.val():null)})}async function cd(e){await gu(z(e))}async function ld(e){await I(z(e),{phase:`quit`,updatedAt:L()}),await new Promise(e=>setTimeout(e,500)),await gu(z(e))}async function ud(e,t){await I(z(e),t)}var V={GAME_START:`game_start`,ROUND_START:`round_start`,DISCARD:`discard`,CUT:`cut`,HEELS:`heels`,PEG_PLAY:`peg_play`,PEG_FIFTEEN:`peg_fifteen`,PEG_THIRTYONE:`peg_thirty_one`,PEG_PAIR:`peg_pair`,PEG_RUN:`peg_run`,PEG_GO:`peg_go`,PEG_LAST_CARD:`peg_last_card`,HAND_SCORE:`hand_score`,CRIB_SCORE:`crib_score`,ROUND_END:`round_end`,GAME_END:`game_end`,PILE_RESET:`pile_reset`,LEAD_CHANGE:`lead_change`,MILESTONE:`milestone`};async function H(e,t){await hu(F(R,`analytics/${e}/events`),{...JSON.parse(JSON.stringify(t)),timestamp:L()})}async function dd(e){await H(e,{type:V.GAME_START,gameId:e})}async function fd(e,t,n,r,a=null){await H(e,{type:V.ROUND_START,round:t,dealer:n,dealtHands:{spencer:r.spencer.map(i),kari:r.kari.map(i)},...a&&{optimalAnalysis:a}})}async function pd(e,t,n,r,a,o=null){await H(e,{type:V.DISCARD,round:t,player:n,kept:r.map(i),discarded:a.map(i),...o&&{wasOptimal:o.wasOptimal,optimalIndices:o.optimalIndices,expectedValueChosen:o.expectedValueChosen,expectedValueOptimal:o.expectedValueOptimal,pointsLeftOnTable:o.pointsLeftOnTable,discardRank:o.discardRank}})}async function md(e,t,n,r,a,o=null){await H(e,{type:V.CUT,round:t,starter:i(n),heels:r>0,...o&&{starterHelpedSpencer:o.starterHelpedSpencer,starterHelpedKari:o.starterHelpedKari,starterHelpedCrib:o.starterHelpedCrib}}),r>0&&await H(e,{type:V.HEELS,round:t,player:a,points:r})}async function hd(e,t,n,r,a,o=null){await H(e,{type:V.PEG_PLAY,round:t,player:n,card:i(r),points:a.points,runningTotal:a.runningTotal,...o&&{wasOptimalPlay:o.wasOptimalPlay,optimalCard:o.optimalCard,pointsMissed:o.pointsMissed,cardsRemainingInHand:o.cardsRemainingInHand,opponentCardsRemaining:o.opponentCardsRemaining,runningTotalBefore:o.runningTotalBefore,playOrder:o.playOrder,isLeadCard:o.isLeadCard}});for(let i of a.breakdown)i.type===`fifteen`&&await H(e,{type:V.PEG_FIFTEEN,round:t,player:n,points:2,runningTotal:a.runningTotal}),i.type===`thirtyOne`&&await H(e,{type:V.PEG_THIRTYONE,round:t,player:n,points:2}),i.type===`pairs`&&await H(e,{type:V.PEG_PAIR,round:t,player:n,count:i.count,points:i.points,rank:r.rank}),i.type===`run`&&await H(e,{type:V.PEG_RUN,round:t,player:n,length:i.length,points:i.points})}async function gd(e,t,n){await H(e,{type:V.PEG_GO,round:t,player:n})}async function _d(e,t,n){await H(e,{type:V.PEG_LAST_CARD,round:t,player:n,points:1})}async function vd(e,t,n,r,a,o,s=null){await H(e,{type:V.HAND_SCORE,round:t,player:n,hand:r.map(i),starter:i(a),total:o.points,fifteens:o.breakdown.fifteens.points,pairs:o.breakdown.pairs.points,runs:o.breakdown.runs.points,flush:o.breakdown.flush.points,nobs:o.breakdown.nobs.points,fifteenCount:o.breakdown.fifteens.combos.length,pairCount:o.breakdown.pairs.combos.length,runCount:o.breakdown.runs.combos.length,...s&&{handType:s.handType||null,isDealer:s.isDealer??null,potentialWithOptimalDiscard:s.potentialWithOptimalDiscard??null,positionBefore:s.positionBefore??null,positionAfter:s.positionAfter??null}})}async function yd(e,t,n,r,a,o,s=null){await H(e,{type:V.CRIB_SCORE,round:t,player:n,crib:r.map(i),starter:i(a),total:o.points,fifteens:o.breakdown.fifteens.points,pairs:o.breakdown.pairs.points,runs:o.breakdown.runs.points,flush:o.breakdown.flush.points,nobs:o.breakdown.nobs.points,...s&&{dealerDiscards:s.dealerDiscards,nonDealerDiscards:s.nonDealerDiscards}})}async function bd(e,t,n){await H(e,{type:V.ROUND_END,round:t,scores:{...n}})}async function xd(e,t,n,r,i=null){let a={type:V.GAME_END,winner:t,loser:t===`spencer`?`kari`:`spencer`,finalScores:{...n},totalRounds:r,margin:Math.abs(n.spencer-n.kari),skunk:Math.min(n.spencer,n.kari)<=90,doubleSkunk:Math.min(n.spencer,n.kari)<=60};i&&(a.totalHandPoints=i.totalHandPoints,a.totalPegPoints=i.totalPegPoints,a.totalCribPoints=i.totalCribPoints,a.leadChanges=i.leadChanges,a.biggestLead=i.biggestLead,a.closestPoint=i.closestPoint);try{await H(e,a)}catch(e){console.warn(`Analytics event failed:`,e.message)}if(i)try{let t=JSON.parse(JSON.stringify({...a,...i,completedAt:Date.now()}));await I(F(R,`analytics/${e}/summary`),t)}catch(e){console.warn(`Game summary write failed:`,e.message)}await Sd(t,n,r,i);try{await wd(e,i)}catch(e){console.warn(`Records update failed:`,e.message)}}async function Sd(e,t,n,r=null){let i=r?.ghostMode,a=i?[`spencer`]:[`spencer`,`kari`];for(let o of a){let a=F(R,`stats/${i?`ghost`:o}`),s=await vu(a),c=s.exists()?s.val():Cd(),l=o===`spencer`?`kari`:`spencer`,u=o===e,d=(r?.telemetryUsed?.[o]||`off`)===`coach`,f=t[o],p=t[l],m=Math.abs(f-p);await I(a,{gamesPlayed:(c.gamesPlayed||0)+1,wins:(c.wins||0)+(u?1:0),losses:(c.losses||0)+(u?0:1),totalPointsScored:(c.totalPointsScored||0)+f,totalPointsAgainst:(c.totalPointsAgainst||0)+p,totalRoundsPlayed:(c.totalRoundsPlayed||0)+n,highestGameScore:Math.max(c.highestGameScore||0,f),biggestWinMargin:u?Math.max(c.biggestWinMargin||0,f-p):c.biggestWinMargin||0,skunksDealt:(c.skunksDealt||0)+(u&&p<=90?1:0),skunksReceived:(c.skunksReceived||0)+(!u&&f<=90?1:0),doubleSkunkCount:(c.doubleSkunkCount||0)+(u&&p<=60?1:0),currentWinStreak:u?(c.currentWinStreak||0)+1:0,currentLossStreak:u?0:(c.currentLossStreak||0)+1,longestWinStreak:u?Math.max(c.longestWinStreak||0,(c.currentWinStreak||0)+1):c.longestWinStreak||0,longestLossStreak:u?c.longestLossStreak||0:Math.max(c.longestLossStreak||0,(c.currentLossStreak||0)+1),totalHandPoints:(c.totalHandPoints||0)+(r?.totalHandPoints?.[o]||0),handsPlayed:(c.handsPlayed||0)+(r?.handsPlayed?.[o]||0),highestSingleHand:Math.max(c.highestSingleHand||0,r?.highestHand?.[o]||0),zeroHandCount:(c.zeroHandCount||0)+(r?.zeroHands?.[o]||0),totalCribPoints:(c.totalCribPoints||0)+(r?.totalCribPoints?.[o]||0),cribsPlayed:(c.cribsPlayed||0)+(r?.cribsPlayed?.[o]||0),highestCrib:Math.max(c.highestCrib||0,r?.highestCrib?.[o]||0),totalPeggingPoints:(c.totalPeggingPoints||0)+(r?.totalPegPoints?.[o]||0),totalCardsPlayed:(c.totalCardsPlayed||0)+(r?.cardsPlayed?.[o]||0),totalPointsLeftOnTable:(c.totalPointsLeftOnTable||0)+(d?0:r?.pointsLeftOnTable?.[o]||0),coachedGames:(c.coachedGames||0)+(d?1:0),gamesDecidedByUnder5:(c.gamesDecidedByUnder5||0)+(m<5?1:0),gamesDecidedByUnder10:(c.gamesDecidedByUnder10||0)+(m<10?1:0),fastestWin:u?Math.min(c.fastestWin||999,n):c.fastestWin||999,slowestWin:u?Math.max(c.slowestWin||0,n):c.slowestWin||0,totalLeadChanges:(c.totalLeadChanges||0)+(r?.leadChanges||0),updatedAt:L()})}}function Cd(){return{gamesPlayed:0,wins:0,losses:0,totalPointsScored:0,totalPointsAgainst:0,totalRoundsPlayed:0,highestGameScore:0,biggestWinMargin:0,skunksDealt:0,skunksReceived:0,doubleSkunkCount:0,currentWinStreak:0,currentLossStreak:0,longestWinStreak:0,longestLossStreak:0,totalHandPoints:0,handsPlayed:0,highestSingleHand:0,lowestSingleHand:999,zeroHandCount:0,twentyPlusHandCount:0,fifteenPlusHandCount:0,perfectHandCount:0,nearPerfectCount:0,totalFifteensScored:0,totalPairsScored:0,totalRunsScored:0,totalFlushesScored:0,totalNobsScored:0,totalCribPoints:0,cribsPlayed:0,highestCrib:0,lowestCrib:999,zeroCribCount:0,totalPeggingPoints:0,totalCardsPlayed:0,pegFifteens:0,pegPairs:0,pegTriples:0,pegRuns:0,pegLongestRun:0,pegThirtyOnes:0,totalGosReceived:0,totalLastCards:0,totalPointsLeftOnTable:0,totalOptimalDiscards:0,totalSuboptimalDiscards:0,totalDealerPoints:0,totalNonDealerPoints:0,dealerRoundsPlayed:0,nonDealerRoundsPlayed:0,gamesDecidedByUnder5:0,gamesDecidedByUnder10:0,fastestWin:999,slowestWin:0,totalLeadChanges:0}}async function wd(e,t){if(!t)return;let n=F(R,`records`),r=await vu(n),i=r.exists()?r.val():{},a={};t.highestHandOverall&&t.highestHandOverall.points>(i.highestHand?.points||0)&&(a.highestHand={...t.highestHandOverall,gameId:e,date:new Date().toISOString()}),t.highestCribOverall&&t.highestCribOverall.points>(i.highestCrib?.points||0)&&(a.highestCrib={...t.highestCribOverall,gameId:e,date:new Date().toISOString()});let o=t.margin||0;o>(i.biggestBlowout?.margin||0)&&(a.biggestBlowout={margin:o,winner:t.winner,gameId:e,date:new Date().toISOString()});let s=t.totalRounds||0;s>0&&s<(i.fastestWin?.rounds||999)&&(a.fastestWin={rounds:s,winner:t.winner,gameId:e,date:new Date().toISOString()}),s>(i.longestGame?.rounds||0)&&(a.longestGame={rounds:s,gameId:e,date:new Date().toISOString()}),t.leadChanges>(i.mostLeadChanges?.count||0)&&(a.mostLeadChanges={count:t.leadChanges,gameId:e,date:new Date().toISOString()}),Object.keys(a).length>0&&await I(n,a)}async function Td(e){let t=await vu(F(R,`stats/${e}`));if(!t.exists())return Cd();let n=t.val();return{...n,winRate:n.gamesPlayed>0?(n.wins/n.gamesPlayed*100).toFixed(1):`0.0`,avgPointsPerGame:n.gamesPlayed>0?(n.totalPointsScored/n.gamesPlayed).toFixed(1):`0.0`,avgPointsAgainst:n.gamesPlayed>0?(n.totalPointsAgainst/n.gamesPlayed).toFixed(1):`0.0`,avgRoundsPerGame:n.gamesPlayed>0?(n.totalRoundsPlayed/n.gamesPlayed).toFixed(1):`0.0`}}async function Ed(e){let t=await vu(F(R,`analytics/${e}/events`));if(!t.exists())return[];let n=t.val();return Object.values(n).sort((e,t)=>(e.timestamp||0)-(t.timestamp||0))}async function Dd(e){let t=await Ed(e),n={};for(let e of t){if(!e.round)continue;n[e.round]||(n[e.round]={round:e.round,dealer:null,hands:{spencer:0,kari:0},pegging:{spencer:0,kari:0},crib:{player:null,points:0},pegPlays:0,fifteensHit:0,thirtyOnesHit:0,pairsScored:0,runsScored:0,gosCalledSpencer:0,gosCalledKari:0});let t=n[e.round];switch(e.type){case V.ROUND_START:t.dealer=e.dealer;break;case V.HAND_SCORE:t.hands[e.player]=e.total;break;case V.CRIB_SCORE:t.crib={player:e.player,points:e.total};break;case V.PEG_PLAY:t.pegging[e.player]+=e.points,t.pegPlays++;break;case V.PEG_FIFTEEN:t.fifteensHit++;break;case V.PEG_THIRTYONE:t.thirtyOnesHit++;break;case V.PEG_PAIR:t.pairsScored++;break;case V.PEG_RUN:t.runsScored++;break;case V.PEG_GO:e.player===`spencer`?t.gosCalledSpencer++:t.gosCalledKari++;break}}return Object.values(n).sort((e,t)=>e.round-t.round)}async function Od(e){let t=await Ed(e),n={spencer:{},kari:{}};for(let e of t)if(e.type===V.HAND_SCORE){let t=e.total;n[e.player][t]=(n[e.player][t]||0)+1}return n}async function kd(e){let t=await Ed(e),n={spencer:{totalPegPoints:0,fifteens:0,thirtyOnes:0,pairs:0,triples:0,runs:0,longestRun:0,gos:0,lastCards:0,cardsPlayed:0,avgPointsPerPlay:0},kari:{totalPegPoints:0,fifteens:0,thirtyOnes:0,pairs:0,triples:0,runs:0,longestRun:0,gos:0,lastCards:0,cardsPlayed:0,avgPointsPerPlay:0}};for(let e of t){if(!e.player)continue;let t=n[e.player];if(t)switch(e.type){case V.PEG_PLAY:t.totalPegPoints+=e.points,t.cardsPlayed++;break;case V.PEG_FIFTEEN:t.fifteens++;break;case V.PEG_THIRTYONE:t.thirtyOnes++;break;case V.PEG_PAIR:e.count===2&&t.pairs++,e.count>=3&&t.triples++;break;case V.PEG_RUN:t.runs++,t.longestRun=Math.max(t.longestRun,e.length);break;case V.PEG_GO:t.gos++;break;case V.PEG_LAST_CARD:t.lastCards++;break}}for(let e of[`spencer`,`kari`]){let t=n[e];t.avgPointsPerPlay=t.cardsPlayed>0?(t.totalPegPoints/t.cardsPlayed).toFixed(2):`0.00`}return n}async function Ad(){let e=await vu(F(R,`analytics`));if(!e.exists())return{hand:null,crib:null};let t={hand:{points:0,hand:null,starter:null,player:null,gameId:null},crib:{points:0,crib:null,starter:null,player:null,gameId:null}},n=e.val();for(let[e,r]of Object.entries(n))if(r.events)for(let n of Object.values(r.events))n.type===V.HAND_SCORE&&n.total>t.hand.points&&(t.hand={points:n.total,hand:n.hand,starter:n.starter,player:n.player,gameId:e}),n.type===V.CRIB_SCORE&&n.total>t.crib.points&&(t.crib={points:n.total,crib:n.crib,starter:n.starter,player:n.player,gameId:e});return t}async function jd(){let e=await Td(`spencer`),t=await Td(`kari`);return{spencer:e,kari:t,records:await Ad(),totalGames:e.gamesPlayed,spencerLeads:e.wins>t.wins,tied:e.wins===t.wins,seriesScore:`${e.wins}–${t.wins}`}}async function Md(e){return(await Ed(e)).filter(e=>e.type===V.DISCARD&&e.wasOptimal!==void 0).map(e=>({round:e.round,player:e.player,wasOptimal:e.wasOptimal,discardRank:e.discardRank,pointsLeftOnTable:e.pointsLeftOnTable,expectedValueChosen:e.expectedValueChosen,expectedValueOptimal:e.expectedValueOptimal}))}async function Nd(e){let t=await Ed(e),n={spencer:{plays:0,totalPoints:0,optimalPlays:0,missedPoints:0},kari:{plays:0,totalPoints:0,optimalPlays:0,missedPoints:0}};for(let e of t)if(e.type===V.PEG_PLAY&&e.player){let t=n[e.player];t.plays++,t.totalPoints+=e.points||0,e.wasOptimalPlay&&t.optimalPlays++,t.missedPoints+=e.pointsMissed||0}for(let e of[`spencer`,`kari`]){let t=n[e];t.efficiency=t.plays>0?(t.totalPoints/(t.totalPoints+t.missedPoints)*100).toFixed(1):`100.0`,t.avgPointsPerPlay=t.plays>0?(t.totalPoints/t.plays).toFixed(2):`0.00`}return n}async function Pd(){let e=await vu(F(R,`records`));return e.exists()?e.val():{}}async function Fd(e){let t=await Td(e);return{currentWinStreak:t.currentWinStreak||0,currentLossStreak:t.currentLossStreak||0,longestWinStreak:t.longestWinStreak||0,longestLossStreak:t.longestLossStreak||0}}async function Id(){let e=await vu(F(R,`analytics`));if(!e.exists())return[];let t=[];for(let[n,r]of Object.entries(e.val()))r.summary&&t.push({gameId:n,...r.summary});return t.sort((e,t)=>(t.completedAt||0)-(e.completedAt||0)),t}async function Ld(e,t=20){let n=await vu(F(R,`analytics`));if(!n.exists())return{games:[]};let r=[],i=n.val();for(let[e,t]of Object.entries(i))t.summary&&r.push({gameId:e,...t.summary});return r.sort((e,t)=>(e.completedAt||0)-(t.completedAt||0)),{games:r.slice(-t).map(t=>({gameId:t.gameId,won:t.winner===e,score:t.finalScores?.[e]||0,opponentScore:t.finalScores?.[e===`spencer`?`kari`:`spencer`]||0,rounds:t.totalRounds||0,handPoints:t.totalHandPoints?.[e]||0,pegPoints:t.totalPegPoints?.[e]||0,cribPoints:t.totalCribPoints?.[e]||0}))}}async function Rd(e){if(e)try{await gu(F(R,`analytics/${e}`))}catch(e){console.error(`Failed to delete analytics:`,e)}}var zd=[`spencer`,`kari`];function U(e){return e===`spencer`?`kari`:`spencer`}var Bd=!1,W={gameId:null,me:null,round:0,originalHands:null,keptHands:null,discards:null,crib:null,remaining:null,lastPegPlayer:null,listeners:[],playOrder:0,optimalDiscards:null,gameSummary:null};function Vd(e){Bd=e}function Hd(){return Bd}var Ud=!1;function Wd(e){Ud=e}var Gd={off:0,insights:1,coach:2};function Kd(e,t){let n=W.gameSummary;n&&(n.telemetryUsed||={spencer:`off`,kari:`off`},(Gd[t]||0)>(Gd[n.telemetryUsed[e]]||0)&&(n.telemetryUsed[e]=t,$d(),W.gameId&&Ku(W.gameId,e,t).catch(()=>{})))}function G(){return!Bd||Ud}function qd(){W={gameId:null,me:null,round:0,originalHands:null,keptHands:null,discards:null,crib:null,remaining:null,lastPegPlayer:null,listeners:[],playOrder:0,optimalDiscards:null,gameSummary:{totalHandPoints:{spencer:0,kari:0},totalPegPoints:{spencer:0,kari:0},totalCribPoints:{spencer:0,kari:0},handsPlayed:{spencer:0,kari:0},cribsPlayed:{spencer:0,kari:0},highestHand:{spencer:0,kari:0},highestCrib:{spencer:0,kari:0},zeroHands:{spencer:0,kari:0},cardsPlayed:{spencer:0,kari:0},pointsLeftOnTable:{spencer:0,kari:0},highestHandOverall:null,highestCribOverall:null,ghostMode:Ud,telemetryUsed:{spencer:`off`,kari:`off`},leadChanges:0,biggestLead:0,closestPoint:999,lastLeader:null,rounds:[]}}}function Jd(e){return W.listeners.push(e),()=>{W.listeners=W.listeners.filter(t=>t!==e)}}function Yd(e){for(let t of W.listeners)try{t(e,W)}catch(e){console.error(e)}}async function Xd(e,t=`off`){qd();let n=await Lu(t);return W.gameId=n,W.me=e,G()&&await dd(n),{gameId:n,isNew:!0,isCreator:!0,seriesType:null}}async function Zd(e,t=`kari`){qd(),W.gameId=e,W.me=t;let n=await B(e);return W.round=n?.round||1,ef(e),n}function Qd(e){return`cribbage-duo-summary-${e}`}function $d(){try{if(!W.gameId)return;localStorage.setItem(Qd(W.gameId),JSON.stringify(W.gameSummary))}catch{}}function ef(e){try{let t=localStorage.getItem(Qd(e));if(!t)return;let n=JSON.parse(t);n&&Array.isArray(n.rounds)&&(W.gameSummary=n)}catch{}}function tf(e){try{localStorage.removeItem(Qd(e))}catch{}}async function nf(e,t=null,n=`off`){for(let r=0;r<5;r++){let r=await rd();if(r&&r.gameId){let t=await B(r.gameId);if(!t||t.phase===`done`||t.phase===`quit`)await id();else return await Zd(r.gameId,e),{gameId:r.gameId,isNew:!1,isCreator:r.createdBy===e,seriesType:r.seriesType||null}}qd();let i=await Lu(n);W.gameId=i,W.me=e;let{claimed:a}=await od(i,e,t,n);if(a)return G()&&await dd(i),{gameId:i,isNew:!0,isCreator:!0,seriesType:t};await cd(i);let o=await rd();if(o&&o.gameId)return await Zd(o.gameId,e),{gameId:o.gameId,isNew:!1,isCreator:!1,seriesType:o.seriesType||null};await new Promise(e=>setTimeout(e,200))}qd();let r=await Lu(n);return W.gameId=r,W.me=e,await id(),await nd(r,e,t,n),G()&&await dd(r),console.warn(`findOrCreateGame: fell back to direct claim after retries`),{gameId:r,isNew:!0,isCreator:!0,seriesType:t}}async function rf(){W.gameId&&(await id(W.gameId),await Rd(W.gameId),await ld(W.gameId)),qd()}function af(){if(!W.gameId)throw Error(`No active game`);return Ru(W.gameId,e=>{Yd(e)})}async function of(e){let t=W.gameId,n=await B(t),r=e===`spencer`?`kari`:`spencer`,i=n?.cutForDeal?.[r],o=a().filter(e=>!(i&&e.rank===i.rank&&e.suit===i.suit)),s=o[Math.floor(Math.random()*o.length)];await zu(t,e,s)}async function sf(e){let t=W.gameId;await Bu(t,e)}async function cf(e){let t=W.gameId;await Vu(t,e)&&await lf()}async function lf(){let e=W.gameId,t=await B(e);if(t.phase!==`deal`)return;let{spencer:n,kari:r,remaining:i}=s();W.round=t.round||1,W.originalHands={spencer:n,kari:r},W.remaining=i,W.keptHands=null,W.discards=null,W.crib=null,W.lastPegPlayer=null,W.playOrder=0;let a=t.dealer,o=te(n,a===`spencer`),c=te(r,a===`kari`);W.optimalDiscards={spencer:o,kari:c},await Hu(e,{spencer:n,kari:r}),G()&&await fd(e,W.round,t.dealer,{spencer:n,kari:r},{optimalDiscardSpencer:{bestDiscard:o.bestDiscard,bestExpectedValue:o.bestExpectedValue,spread:o.spread},optimalDiscardKari:{bestDiscard:c.bestDiscard,bestExpectedValue:c.bestExpectedValue,spread:c.spread}})}async function uf(e,t){let n=W.gameId,r=await B(n),i=K(r.hands[e]);if(r.phase!==`discard`||i.length!==6)return;if(t.length!==2)throw Error(`Must discard exactly 2 cards`);let a=t.map(e=>i[e]),o=i.filter((e,n)=>!t.includes(n));W.keptHands||={},W.discards||={},W.keptHands[e]=o,W.discards[e]=a,await Uu(n,e,o,a);let s=null,c=W.optimalDiscards?.[e];if(c){let n=[...t].sort((e,t)=>e-t),r=[...c.bestDiscard].sort((e,t)=>e-t),i=n[0]===r[0]&&n[1]===r[1],a=c.allOptions.find(e=>{let t=[...e.indices].sort((e,t)=>e-t);return t[0]===n[0]&&t[1]===n[1]}),o=a?c.allOptions.indexOf(a)+1:15;s={wasOptimal:i,optimalIndices:c.bestDiscard,expectedValueChosen:a?.totalExpectedValue||0,expectedValueOptimal:c.bestExpectedValue,pointsLeftOnTable:+(c.bestExpectedValue-(a?.totalExpectedValue||0)).toFixed(2),discardRank:o},i||(W.gameSummary.pointsLeftOnTable[e]+=s.pointsLeftOnTable)}G()&&await pd(n,W.round,e,o,a,s);let l=await B(n);l.phase===`cut`&&(W.crib=K(l.crib))}async function df(){let e=W.gameId,t=await B(e);if(t.phase!==`cut`)throw Error(`Not in cut phase`);let n=W.remaining;n||=xf(t);let{starter:r}=c(n),i=l(r);await Ju(e,r,i.points);let a=null,o=W.keptHands?.spencer,s=W.keptHands?.kari,u=W.crib;if(o&&s){let e=g(o,o[0],!1).points,t=g(o,r,!1).points,n=g(s,s[0],!1).points,i=g(s,r,!1).points,c=u?g(u,r,!0).points:0;a={starterHelpedSpencer:t-e,starterHelpedKari:i-n,starterHelpedCrib:c}}return G()&&await md(e,W.round,r,i.points,t.dealer,a),{starter:r,heels:i}}async function ff(e,t){let n=W.gameId,r=await B(n);if(r.phase!==`play`)throw Error(`Not in play phase`);if(r.pegging.turn!==e)throw Error(`Not your turn`);let a=K(r.pegging.pile);if(!ee(a,t))throw Error(`Card would exceed 31`);let o=_(a,t);W.lastPegPlayer=e,W.playOrder=(W.playOrder||0)+1;let s=U(e),c=K(r.hands[e]),l=K(r.hands[s]),u=r.pegging?.runningTotal||0,d=ne(c,a,u),f=d.bestPlay===i(t),p={wasOptimalPlay:f,optimalCard:d.bestPlay,pointsMissed:f?0:Math.max(0,d.bestScore-o.points),cardsRemainingInHand:c.length-1,opponentCardsRemaining:l.length,runningTotalBefore:u,playOrder:W.playOrder,isLeadCard:a.length===0};return W.gameSummary.totalPegPoints[e]+=o.points,W.gameSummary.cardsPlayed[e]++,await Yu(n,e,t,o),G()&&await hd(n,W.round,e,t,o,p),{pegScore:o,peggingDone:await mf(await B(n))}}async function pf(e){let t=W.gameId,n=await B(t);if(n.phase!==`play`)throw Error(`Not in play phase`);if(n.pegging.turn!==e)throw Error(`Not your turn`);await Xu(t,e),G()&&await gd(t,W.round,e),await mf(await B(t))}async function mf(e){let t=K(e.hands?.spencer),n=K(e.hands?.kari);return t.length===0&&n.length===0?(K(e.pegging?.pile).length>0&&W.lastPegPlayer&&(await Zu(W.gameId,W.lastPegPlayer),G()&&await _d(W.gameId,W.round,W.lastPegPlayer)),await Qu(W.gameId),!0):!1}function hf(e,t){let n=K(e.hands?.[t]);if(n.length===0)return!1;let i=e.pegging?.runningTotal||0;return!n.some(e=>i+r(e.rank)<=31)}function gf(e,t){let n=K(e.hands?.[t]),i=e.pegging?.runningTotal||0;return n.filter(e=>i+r(e.rank)<=31)}async function _f(e){let t=W.gameId,n=await B(t);if(n.phase!==`show`)throw Error(`Not in show phase`);let r=W.keptHands?.[e]||K(n.keptHands?.[e])||K(n.hands?.[e]),a=n.starter,o=g(r,a,!1),s=o.breakdown,c={breakdown:{fifteens:{points:s.fifteens.points,combos:s.fifteens.combos},pairs:{points:s.pairs.points,combos:s.pairs.combos},runs:{points:s.runs.points,combos:s.runs.combos},flush:{points:s.flush.points,combos:s.flush.combos},nobs:{points:s.nobs.points,combos:s.nobs.combos}},hand:r.map(i),starter:i(a),who:e};await $u(t,e,o.points,c);let l=W.gameSummary;l.totalHandPoints[e]+=o.points,l.handsPlayed[e]++,l.highestHand[e]=Math.max(l.highestHand[e],o.points),o.points===0&&l.zeroHands[e]++,(!l.highestHandOverall||o.points>l.highestHandOverall.points)&&(l.highestHandOverall={points:o.points,hand:r.map(i),starter:i(a),player:e});let u=await B(t),d=(u.scores?.spencer||0)-(u.scores?.kari||0),f=Math.abs(d),p=d>0?`spencer`:d<0?`kari`:null;p&&l.lastLeader&&p!==l.lastLeader&&l.leadChanges++,p&&(l.lastLeader=p),l.biggestLead=Math.max(l.biggestLead,f),f>0&&(l.closestPoint=Math.min(l.closestPoint,f));let m=re(o.points,o.breakdown),h=n.dealer===e;return G()&&await vd(t,W.round,e,r,a,o,{handType:m,isDealer:h,positionBefore:n.scores?.[e]||0,positionAfter:u.scores?.[e]||0}),{hand:r,starter:a,...o}}async function vf(){let e=W.gameId,t=await B(e);if(t.phase!==`show`)throw Error(`Not in show phase`);if(t.turnToShow!==`crib`)throw Error(`Not time for crib yet`);let n=W.crib||K(t.crib),r=t.starter,a=g(n,r,!0),o=a.breakdown,s={breakdown:{fifteens:{points:o.fifteens.points,combos:o.fifteens.combos},pairs:{points:o.pairs.points,combos:o.pairs.combos},runs:{points:o.runs.points,combos:o.runs.combos},flush:{points:o.flush.points,combos:o.flush.combos},nobs:{points:o.nobs.points,combos:o.nobs.combos}},hand:n.map(i),starter:i(r),who:t.dealer};await td(e,a.points,s);let c=W.gameSummary,l=t.dealer;c.totalCribPoints[l]=(c.totalCribPoints[l]||0)+a.points,c.cribsPlayed[l]=(c.cribsPlayed[l]||0)+1,c.highestCrib[l]=Math.max(c.highestCrib[l]||0,a.points),(!c.highestCribOverall||a.points>c.highestCribOverall.points)&&(c.highestCribOverall={points:a.points,crib:n.map(i),starter:i(r),player:l});let u={dealerDiscards:W.discards?.[l]?.map(i)||null,nonDealerDiscards:W.discards?.[U(l)]?.map(i)||null};G()&&await yd(e,W.round,l,n,r,a,u);let d=await B(e),f=d.roundScoring;if(f&&!W.gameSummary.rounds.some(e=>e.round===W.round)){let t=d.dealer;W.gameSummary.rounds.push({round:W.round,hands:{spencer:f.spencer?.hand||0,kari:f.kari?.hand||0},pegging:{spencer:f.spencer?.peg||0,kari:f.kari?.peg||0},crib:{player:t,points:f[t]?.crib||0}}),$d();let n=W.gameSummary.rounds[W.gameSummary.rounds.length-1];Wu(e,n.round,n).catch(()=>{})}return G()&&await bd(e,W.round,d.scores),{crib:n,starter:r,...a}}async function yf(){let e=W.gameId;if(e)try{let[t,n]=await Promise.all([Gu(e),qu(e)]),r=W.gameSummary;if(t&&r){for(let e of Object.values(t))e&&e.round&&!r.rounds.some(t=>t.round===e.round)&&r.rounds.push(e);r.rounds.sort((e,t)=>e.round-t.round)}if(n&&r){r.telemetryUsed||={spencer:`off`,kari:`off`};for(let e of[`spencer`,`kari`])(Gd[n[e]]||0)>(Gd[r.telemetryUsed[e]]||0)&&(r.telemetryUsed[e]=n[e])}$d()}catch{}}async function bf(e){let t=W.gameId;await ed(t,e);let n=await B(t);if(n.phase===`done`&&n.winner){await yf();let e=W.gameSummary;e.winner=n.winner,e.margin=Math.abs((n.scores?.spencer||0)-(n.scores?.kari||0)),e.totalRounds=n.round,e.finalScores={...n.scores},G()&&await xd(t,n.winner,n.scores,n.round,e),tf(t),await id(t)}}function K(e){return e?Array.isArray(e)?e:Object.values(e):[]}function xf(e){let t=new Set;for(let n of zd)for(let r of K(e.hands?.[n]))t.add(i(r));for(let n of K(e.crib))t.add(i(n));return a().filter(e=>!t.has(i(e)))}var Sf=!1;async function Cf(e){if(Sf||e.phase!==`play`||W.me!==e.pegging?.turn)return;let t=K(e.hands?.spencer),n=K(e.hands?.kari);if(t.length===0&&n.length===0){Sf=!0;try{K(e.pegging?.pile).length>0&&W.lastPegPlayer&&(await Zu(W.gameId,W.lastPegPlayer),G()&&await _d(W.gameId,W.round,W.lastPegPlayer)),await Qu(W.gameId)}finally{Sf=!1}return}let i=e.pegging?.turn;if(i){let a=i===`spencer`?t:n,o=U(i)===`spencer`?t:n;if(a.length>0&&o.length>0){let t=e.pegging?.runningTotal||0,n=a.some(e=>t+r(e.rank)<=31),s=o.some(e=>t+r(e.rank)<=31);if(!n&&!s){Sf=!0;try{await Xu(W.gameId,i)}finally{Sf=!1}}}}}var q={_app:null,_board:null,_boardThemeId:null,_lastScores:null,_unsubscribe:null,_currentView:`login`,_series:null,_selectedCards:[],_lastGameState:null,_lastLocalState:null,_showAnalytics:null,_seriesSummary:null,_pegAnnouncement:null,_showBreakdown:null,_roundSummary:null,_player:null,_isGhost:!1,_avatarIndex:0,_lobbyUnsub:null,_telRankCache:{key:null,ranks:null},_roundScoring:{spencer:{hand:0,peg:0,crib:0},kari:{hand:0,peg:0,crib:0},round:0,dealer:null},_pegAnnouncementTimer:null,_lastAnnouncedPlay:null,_lastAnnouncedHeels:null,_spentPiles:[],_spentRoundKey:null,_lastPileSnapshot:{cards:[],total:0}},wf=[{id:`neon`,name:`Neon`,desc:`Default — dark glass + amber edge`},{id:`classic`,name:`Classic`,desc:`Cream face, black & red ink`},{id:`carbon`,name:`Carbon`,desc:`Stealth graphite with neon accents`},{id:`vivid`,name:`Vivid`,desc:`Bright white faces, bold color`}];function Tf(){try{let e=`cribbage-duo-card-skin-${q._player||`spencer`}`;return localStorage.getItem(e)||`neon`}catch{return`neon`}}function Ef(e){try{let t=`cribbage-duo-card-skin-${q._player||`spencer`}`;localStorage.setItem(t,e)}catch{}Df()}function Df(){let e=Tf();document.body.classList.remove(`card-skin-neon`,`card-skin-classic`,`card-skin-carbon`,`card-skin-vivid`),document.body.classList.add(`card-skin-${e}`)}function Of(e){q._app.innerHTML=e}function kf(){return`cribbage-duo-telemetry-${q._player||`spencer`}`}function Af(){try{let e=localStorage.getItem(kf());return e===`insights`||e===`coach`?e:`off`}catch{return`off`}}function jf(e){try{localStorage.setItem(kf(),e)}catch{}}function Mf(e){return Hd()?Af():e?.telemetry===`insights`||e?.telemetry===`coach`?e.telemetry:`off`}var Nf={spencer:new Set,kari:new Set},Pf=[{id:`midnight`,name:`Midnight`,desc:`The classic dark felt`},{id:`nebula`,name:`Nebula`,desc:`Vivid purple starfield`},{id:`aurora`,name:`Aurora`,desc:`Teal and violet glow`},{id:`sunset`,name:`Sunset`,desc:`Warm pink and gold`}];function Ff(){try{let e=`cribbage-duo-bg-${q._player||`spencer`}`,t=localStorage.getItem(e);return Pf.some(e=>e.id===t)?t:`midnight`}catch{return`midnight`}}function If(e){try{let t=`cribbage-duo-bg-${q._player||`spencer`}`;localStorage.setItem(t,e)}catch{}Lf()}function Lf(){let e=Ff();document.body.classList.remove(...Pf.map(e=>`bg-${e.id}`)),document.body.classList.add(`bg-${e}`)}function Rf(){return`cribbage-duo-active-${q._isGhost?`ghost`:q._player||`spencer`}`}function zf(e){try{localStorage.setItem(Rf(),JSON.stringify({...e,savedAt:Date.now()}))}catch{}}function Bf(){try{let e=localStorage.getItem(Rf()),t=e?JSON.parse(e):null;return t&&t.gameId?t:null}catch{return null}}function Vf(){try{localStorage.removeItem(Rf())}catch{}}var Hf={A:0,2:1,3:2,4:3,5:4,6:5,7:6,8:7,9:8,10:9,J:10,Q:11,K:12},Uf=e=>e.rank+e.suit,Wf=[[5.38,4.23,4.52,5.43,5.45,3.85,3.85,3.8,3.66,3.71,3.96,3.67,3.57],[0,6.02,4.52,4.52,5.45,3.93,3.81,3.66,3.71,3.62,3.79,3.52,3.51],[0,0,5.94,4.91,5.97,3.81,3.58,3.52,3.67,3.56,3.86,3.52,3.51],[0,0,0,5.67,6.48,3.87,3.72,3.69,3.59,3.54,3.83,3.46,3.46],[0,0,0,0,8.79,6.63,6.01,5.48,5.43,6.34,6.92,6.34,6.29],[0,0,0,0,0,5.76,4.98,4.72,5.13,3.17,3.42,3.05,3.03],[0,0,0,0,0,0,5.9,6.61,4.11,3.26,3.54,3.05,3.05],[0,0,0,0,0,0,0,5.63,4.72,3.8,3.85,3.44,3.11],[0,0,0,0,0,0,0,0,5.27,4.23,4.38,3,2.9],[0,0,0,0,0,0,0,0,0,4.93,4.71,3.42,2.88],[0,0,0,0,0,0,0,0,0,0,5.45,4.68,3.95],[0,0,0,0,0,0,0,0,0,0,0,4.8,3.58],[0,0,0,0,0,0,0,0,0,0,0,0,4.63]];function Gf(e,t){let n=Hf[e.rank],r=Hf[t.rank];if(n>r){let e=n;n=r,r=e}let i=Wf[n][r];return e.suit===t.suit&&(i+=.2),i}function Kf(e){let t=e.map(e=>r(e.rank)),n=e.map(e=>Hf[e.rank]),i=0;for(let e=3;e<16;e++){let n=0;for(let r=0;r<4;r++)e&1<<r&&(n+=t[r]);n===15&&(i+=2)}for(let t=0;t<4;t++)for(let n=t+1;n<4;n++)e[t].rank===e[n].rank&&(i+=2);let a=[...n].sort((e,t)=>e-t);if(a[3]-a[0]===3&&a[1]-a[0]===1&&a[2]-a[1]===1&&a[3]-a[2]===1)i+=4;else for(let[e,t,r]of[[0,1,2],[0,1,3],[0,2,3],[1,2,3]]){let a=[n[e],n[t],n[r]].sort((e,t)=>e-t);a[2]-a[0]===2&&a[1]-a[0]===1&&(i+=3)}return i}function qf(e,t){let n=-1/0,i=[0,1];for(let a=0;a<6;a++)for(let o=a+1;o<6;o++){let s=Kf(e.filter((e,t)=>t!==a&&t!==o)),c=r(e[a].rank)+r(e[o].rank),l=s+(t?c*.15:-c*.1);l>n&&(n=l,i=[a,o])}return i}function Jf(e,t){let n=new Set(e.map(Uf)),r=a().filter(e=>!n.has(Uf(e))),i=-1/0,o=[0,1];for(let n=0;n<6;n++)for(let a=n+1;a<6;a++){let s=e.filter((e,t)=>t!==n&&t!==a),c=0;for(let e of r)c+=g(s,e,!1).points;let l=c/r.length,u=Gf(e[n],e[a]),d=l+(t?u:-u);d>i&&(i=d,o=[n,a])}return o}function Yf(e,t,n=`hard`){return n===`hard`?Jf(e,t):qf(e,t)}function Xf(e,t){let n=new Set(e.map(Uf)),r=a().filter(e=>!n.has(Uf(e))),i=[];for(let n=0;n<6;n++)for(let a=n+1;a<6;a++){let o=e.filter((e,t)=>t!==n&&t!==a),s=0;for(let e of r)s+=g(o,e,!1).points;let c=s/r.length,l=Gf(e[n],e[a]);i.push({discardIndices:[n,a],keptEV:+c.toFixed(2),cribEV:+l.toFixed(2),netEV:+(c+(t?l:-l)).toFixed(2)})}return i.sort((e,t)=>t.netEV-e.netEV),i}function Zf(e,t){let n=new Set(t.map(Uf)),r=a().filter(e=>!n.has(Uf(e))),i=Kf(e),o=1/0,s=-1/0,c=0,l=0,u={};for(let t of r){let n=g(e,t,!1).points;c+=n,n<o&&(o=n),n>s&&(s=n),n>i&&l++,u[t.rank]=Math.max(u[t.rank]||0,n)}let d=Object.entries(u).filter(([,e])=>e===s).map(([e])=>e);return{base:i,min:o,avg:+(c/r.length).toFixed(1),max:s,cutsThatImprove:l,totalCuts:r.length,bestCutRanks:d}}function Qf(e,t,n,i={}){let a=i.myHand||e,o=Math.max(i.oppCount||0,0),s={};for(let e of np)s[e]=4;let c=[...a,...t];i.starter&&c.push(i.starter);for(let e of c)e&&s[e.rank]>0&&s[e.rank]--;let l=Object.values(s).reduce((e,t)=>e+t,0);return e.map(e=>{let n=_(t,e),i=[...t,e],a=0;if(o>0)for(let e of np){if(s[e]<=0||n.runningTotal+r(e)>31)continue;let t=_(i,{rank:e,suit:`X`});if(t.points>0){let n=tp(s[e],l,o);a=Math.max(a,t.points*n)}}return{card:e,immediate:n.points,danger:+a.toFixed(1),newTotal:n.runningTotal}})}function $f(e){let t={};for(let e of np)t[e]=4;for(let n of e)n&&t[n.rank]>0&&t[n.rank]--;let n=t[10]+t.J+t.Q+t.K,r=t.A+t[2]+t[3]+t[4];return{byRank:t,fives:t[5],tens:n,low:r}}function ep(e,t,n){let i=e[0],a=-1;for(let n of e){let e=_(t,n);e.points>a&&(a=e.points,i=n)}if(a===0){let t=e.find(e=>n+r(e.rank)===15),a=e.find(e=>n+r(e.rank)===31);i=t||a||[...e].sort((e,t)=>r(e.rank)-r(t.rank))[0]}return i}function tp(e,t,n){if(e<=0||t<=0||n<=0)return 0;if(n>=t)return 1;let r=1;for(let i=0;i<n;i++){let n=t-e-i,a=t-i;if(n<=0){r=0;break}r*=n/a}return 1-r}var np=[`A`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`,`J`,`Q`,`K`];function rp(e,t,n,i){let a=i.myHand||e,o=Math.max(i.oppCount||0,0),s={};for(let e of np)s[e]=4;let c=[...a,...t];i.starter&&c.push(i.starter);for(let e of c)e&&s[e.rank]>0&&s[e.rank]--;let l=Object.values(s).reduce((e,t)=>e+t,0),u=e[0],d=-1/0;for(let n of e){let e=_(t,n),i=[...t,n],c=e.runningTotal,f=e.points*2.2,p=0;if(o>0)for(let e of np){if(s[e]<=0||c+r(e)>31)continue;let t=_(i,{rank:e,suit:`X`});if(t.points>0){let n=tp(s[e],l,o);p=Math.max(p,t.points*n)}}if(f-=p*1.5,a.filter(e=>e.rank===n.rank).length>=2&&c+r(n.rank)*2<=31){let e=tp(s[n.rank],l,o);f+=6*.35*e}f+=r(n.rank)*.03,f>d&&(d=f,u=n)}return u}function ip(e,t,n,r={}){return!e||e.length===0?null:e.length===1?e[0]:r.difficulty===`hard`?rp(e,t,n,r):ep(e,t,n)}var ap=`cribbage-duo-ai-difficulty`,op=`hard`;try{let e=localStorage.getItem(ap);(e===`easy`||e===`hard`)&&(op=e)}catch{}function sp(e){if(!(e!==`easy`&&e!==`hard`)){op=e;try{localStorage.setItem(ap,e)}catch{}}}function cp(){return op}var J=null,lp=!1,up=!1,dp=0,fp=null,pp=0,mp=null,hp=5;function gp(e){J=e,lp=!0}function _p(){lp=!1,J=null,fp=null}function vp(){return lp}function yp(){return J}async function bp(e){if(!lp||!J||!e||e.phase===`quit`||e.phase===`done`&&!e.showResult)return;if(e.phase!==mp&&(pp=0,mp=e.phase),pp>=hp){console.warn(`AI circuit breaker tripped — skipping until state changes meaningfully`);return}if(up)if(dp&&Date.now()-dp>3e3)console.warn(`AI thinking timeout — force reset`),up=!1;else{fp=e;return}let t=!0;try{up=!0,dp=Date.now();let n=e.phase===`play`?400+Math.random()*400:800+Math.random()*700;switch(await new Promise(e=>setTimeout(e,n)),e.phase){case`cut_for_deal`:e.cutForDeal?.[J]?e.dealer&&!e.cutForDealReady?.[J]&&await sf(J):await of(J);break;case`discard`:await xp(e);break;case`cut`:await Sp(e);break;case`play`:try{await Cp(e)}catch(e){console.warn(`AI peg error (will retry):`,e.message),t=!1}break;case`show`:case`done`:await wp(e);break;case`deal`:e.readyToDeal?.[J]||await cf(J);break}}catch(e){console.error(`AI error:`,e),t=!1}finally{up=!1}if(t?pp=0:pp++,fp){let e=fp;fp=null,setTimeout(()=>{bp(e)},0)}}async function xp(e){let t=K(e.hands[J]);if(t.length!==6)return;let n=Yf(t,e.dealer===J,op);await uf(J,n)}async function Sp(e){U(e.dealer)===J&&await df()}async function Cp(e){if(e.pegging?.turn!==J)return;if(hf(e,J)){await pf(J);return}let t=gf(e,J);if(t.length===0)return;let n=ip(t,K(e.pegging?.pile),e.pegging?.runningTotal||0,{difficulty:op,myHand:K(e.hands?.[J]),oppCount:K(e.hands?.[U(J)]).length,starter:e.starter||null});await ff(J,n)}async function wp(e){let t=e.showResult?.phase||e.turnToShow||`show`;if(e.showResult&&e.showReady?.[J]!==t){await new Promise(e=>setTimeout(e,600)),await bf(J);return}}function Tp(e,t,n=1){let r=n;return`
    <!-- Head -->
    <circle cx="${e}" cy="${t}" r="${20*r}" fill="#e8b89a"/>
    <!-- Beard -->
    <path d="M${e-14*r} ${t+4*r} Q${e-16*r} ${t+22*r} ${e} ${t+26*r} Q${e+16*r} ${t+22*r} ${e+14*r} ${t+4*r}" fill="#5a3a2a"/>
    <path d="M${e-10*r} ${t+6*r} Q${e-12*r} ${t+18*r} ${e} ${t+22*r} Q${e+12*r} ${t+18*r} ${e+10*r} ${t+6*r}" fill="#4a2a1a"/>
    <!-- Glasses -->
    <rect x="${e-14*r}" y="${t-6*r}" width="${12*r}" height="${9*r}" rx="${2*r}" fill="none" stroke="#222" stroke-width="${1.8*r}"/>
    <rect x="${e+2*r}" y="${t-6*r}" width="${12*r}" height="${9*r}" rx="${2*r}" fill="none" stroke="#222" stroke-width="${1.8*r}"/>
    <line x1="${e-2*r}" y1="${t-1*r}" x2="${e+2*r}" y2="${t-1*r}" stroke="#222" stroke-width="${1.5*r}"/>
    <!-- Eyes behind glasses -->
    <circle cx="${e-8*r}" cy="${t-1*r}" r="${1.8*r}" fill="#3a2a1a"/>
    <circle cx="${e+8*r}" cy="${t-1*r}" r="${1.8*r}" fill="#3a2a1a"/>
    <!-- Beanie -->
    <path d="M${e-18*r} ${t-8*r} Q${e-20*r} ${t-26*r} ${e} ${t-28*r} Q${e+20*r} ${t-26*r} ${e+18*r} ${t-8*r}" fill="#555"/>
    <rect x="${e-19*r}" y="${t-12*r}" width="${38*r}" height="${5*r}" rx="${2*r}" fill="#666"/>
    <!-- Beanie fold detail -->
    <line x1="${e-15*r}" y1="${t-10*r}" x2="${e+15*r}" y2="${t-10*r}" stroke="#777" stroke-width="${.8*r}"/>
  `}function Ep(e,t,n=1){let r=n;return`
    <!-- Hair behind head -->
    <ellipse cx="${e}" cy="${t+4*r}" rx="${24*r}" ry="${28*r}" fill="#2a1810"/>
    <!-- Hair flowing down -->
    <path d="M${e-22*r} ${t+8*r} Q${e-26*r} ${t+45*r} ${e-18*r} ${t+55*r}" fill="none" stroke="#2a1810" stroke-width="${10*r}" stroke-linecap="round"/>
    <path d="M${e+22*r} ${t+8*r} Q${e+26*r} ${t+45*r} ${e+18*r} ${t+55*r}" fill="none" stroke="#2a1810" stroke-width="${10*r}" stroke-linecap="round"/>
    <!-- Head -->
    <circle cx="${e}" cy="${t}" r="${18*r}" fill="#f0c9a8"/>
    <!-- Hair top layer -->
    <path d="M${e-18*r} ${t-2*r} Q${e-18*r} ${t-22*r} ${e} ${t-22*r} Q${e+18*r} ${t-22*r} ${e+18*r} ${t-2*r}" fill="#2a1810"/>
    <!-- Side part -->
    <path d="M${e-4*r} ${t-22*r} Q${e-14*r} ${t-18*r} ${e-18*r} ${t-4*r}" fill="#3a2818" opacity="0.6"/>
    <!-- Glasses -->
    <rect x="${e-13*r}" y="${t-5*r}" width="${11*r}" height="${8*r}" rx="${2*r}" fill="none" stroke="#333" stroke-width="${1.5*r}"/>
    <rect x="${e+2*r}" y="${t-5*r}" width="${11*r}" height="${8*r}" rx="${2*r}" fill="none" stroke="#333" stroke-width="${1.5*r}"/>
    <line x1="${e-2*r}" y1="${t-1*r}" x2="${e+2*r}" y2="${t-1*r}" stroke="#333" stroke-width="${1.2*r}"/>
    <!-- Eyes behind glasses -->
    <circle cx="${e-7*r}" cy="${t-1*r}" r="${1.5*r}" fill="#3a2a1a"/>
    <circle cx="${e+7*r}" cy="${t-1*r}" r="${1.5*r}" fill="#3a2a1a"/>
    <!-- Slight smile -->
    <path d="M${e-5*r} ${t+7*r} Q${e} ${t+11*r} ${e+5*r} ${t+7*r}" fill="none" stroke="#a07060" stroke-width="${1*r}"/>
    <!-- Small earrings -->
    <circle cx="${e-17*r}" cy="${t+2*r}" r="${1.5*r}" fill="#ddd"/>
    <circle cx="${e+17*r}" cy="${t+2*r}" r="${1.5*r}" fill="#ddd"/>
  `}var Dp=[e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="sb0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a3a5a"/><stop offset="100%" stop-color="#0a1a2e"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#0a1628" stroke="#00d4ff" stroke-width="2"/>
    ${Tp(100,48)}
    <!-- Massive torso -->
    <path d="M72 72 L128 72 L134 130 L66 130 Z" fill="url(#sb0)"/>
    <!-- Tank top neckline -->
    <path d="M82 72 Q100 80 118 72" fill="none" stroke="#0a2a4a" stroke-width="1.5"/>
    <!-- Huge biceps - flexing up -->
    <ellipse cx="52" cy="72" rx="20" ry="16" fill="#e8b89a" transform="rotate(-25 52 72)"/>
    <ellipse cx="148" cy="72" rx="20" ry="16" fill="#e8b89a" transform="rotate(25 148 72)"/>
    <!-- Forearms up -->
    <rect x="36" y="52" width="14" height="26" rx="7" fill="#e8b89a" transform="rotate(-15 43 65)"/>
    <rect x="150" y="52" width="14" height="26" rx="7" fill="#e8b89a" transform="rotate(15 157 65)"/>
    <!-- Fists -->
    <circle cx="38" cy="48" r="8" fill="#e8b89a"/>
    <circle cx="162" cy="48" r="8" fill="#e8b89a"/>
    <!-- Legs -->
    <rect x="76" y="130" width="20" height="42" rx="8" fill="url(#sb0)"/>
    <rect x="104" y="130" width="20" height="42" rx="8" fill="url(#sb0)"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="12" font-family="system-ui" font-weight="800">FLEXIN'</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="sb1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a3a5a"/><stop offset="100%" stop-color="#0a1a2e"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#0a1628" stroke="#00d4ff" stroke-width="2"/>
    <!-- Cape -->
    <path d="M72 68 C48 85 35 145 50 175 L72 150 Z" fill="#003366" opacity="0.5"/>
    <path d="M128 68 C152 85 165 145 150 175 L128 150 Z" fill="#003366" opacity="0.5"/>
    ${Tp(100,46)}
    <!-- Massive torso -->
    <path d="M70 68 L130 68 L136 128 L64 128 Z" fill="url(#sb1)"/>
    <!-- Chest emblem -->
    <polygon points="92,84 100,76 108,84 104,96 96,96" fill="#ffd700" opacity="0.8"/>
    <!-- Arms on hips -->
    <path d="M70 80 L44 96 L48 105 L66 92 Z" fill="#e8b89a"/>
    <path d="M130 80 L156 96 L152 105 L134 92 Z" fill="#e8b89a"/>
    <!-- Power stance legs -->
    <polygon points="78,128 66,175 86,175" fill="url(#sb1)"/>
    <polygon points="122,128 134,175 114,175" fill="url(#sb1)"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="12" font-family="system-ui" font-weight="800">SUPER SPENCE</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="sb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a3a5a"/><stop offset="100%" stop-color="#0a1a2e"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#0a1628" stroke="#00d4ff" stroke-width="2"/>
    ${Tp(100,42)}
    <!-- Extra wide shoulders / massive torso -->
    <path d="M58 66 L142 66 L148 120 L52 120 Z" fill="url(#sb2)"/>
    <!-- Championship belt -->
    <rect x="56" y="118" width="88" height="10" rx="3" fill="#ffd700"/>
    <ellipse cx="100" cy="123" r="8" ry="6" fill="#ffaa00" stroke="#ffd700" stroke-width="1.5"/>
    <text x="100" y="126" text-anchor="middle" fill="#8B6914" font-size="6" font-weight="800">#1</text>
    <!-- Huge arms hanging -->
    <ellipse cx="44" cy="82" rx="18" ry="14" fill="#e8b89a"/>
    <ellipse cx="156" cy="82" rx="18" ry="14" fill="#e8b89a"/>
    <!-- Thick legs -->
    <rect x="72" y="128" width="24" height="44" rx="10" fill="url(#sb2)"/>
    <rect x="104" y="128" width="24" height="44" rx="10" fill="url(#sb2)"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="12" font-family="system-ui" font-weight="800">THE CHAMP</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="sb3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a3a5a"/><stop offset="100%" stop-color="#0a1a2e"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#0a1628" stroke="#00d4ff" stroke-width="2"/>
    ${Tp(100,46)}
    <!-- Torso -->
    <path d="M72 70 L128 70 L132 128 L68 128 Z" fill="url(#sb3)"/>
    <!-- Buff arms holding cards -->
    <path d="M72 82 L50 95 L54 105 L70 94 Z" fill="#e8b89a"/>
    <path d="M128 82 L150 95 L146 105 L130 94 Z" fill="#e8b89a"/>
    <!-- Giant card left hand -->
    <g transform="translate(30, 80) rotate(-15)">
      <rect width="28" height="38" rx="3" fill="#fff" stroke="#ccc" stroke-width="1"/>
      <text x="4" y="14" fill="#e00" font-size="12" font-weight="800">A</text>
      <text x="14" y="30" fill="#e00" font-size="16">&#9829;</text>
    </g>
    <!-- Giant card right hand -->
    <g transform="translate(142, 78) rotate(12)">
      <rect width="28" height="38" rx="3" fill="#fff" stroke="#ccc" stroke-width="1"/>
      <text x="4" y="14" fill="#222" font-size="12" font-weight="800">A</text>
      <text x="14" y="30" fill="#222" font-size="16">&#9824;</text>
    </g>
    <!-- Legs -->
    <rect x="78" y="128" width="18" height="42" rx="7" fill="url(#sb3)"/>
    <rect x="104" y="128" width="18" height="42" rx="7" fill="url(#sb3)"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="12" font-family="system-ui" font-weight="800">CARD SHARK</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="sb4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8e0d0"/><stop offset="100%" stop-color="#d0c8b8"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#0a1628" stroke="#00d4ff" stroke-width="2"/>
    ${Tp(100,44)}
    <!-- Gi (karate uniform) - massive -->
    <path d="M66 66 L134 66 L138 130 L62 130 Z" fill="url(#sb4)"/>
    <!-- Gi lapel V -->
    <path d="M88 66 L100 90 L112 66" fill="none" stroke="#bbb" stroke-width="1.5"/>
    <!-- Chest visible in V -->
    <path d="M90 68 L100 86 L110 68" fill="#e8b89a"/>
    <!-- Black belt -->
    <rect x="66" y="110" width="68" height="6" rx="1" fill="#222"/>
    <!-- Chop arm extended -->
    <path d="M134 78 L168 88 L166 96 L136 88 Z" fill="#e8b89a"/>
    <!-- Other arm cocked -->
    <path d="M66 84 L46 78 L44 86 L64 90 Z" fill="#e8b89a"/>
    <!-- Wide stance legs -->
    <rect x="70" y="130" width="20" height="38" rx="7" fill="url(#sb4)"/>
    <path d="M110 130 L132 168 L142 162 L118 130 Z" fill="url(#sb4)"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="12" font-family="system-ui" font-weight="800">SENSEI</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sb5coat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8f8f8"/><stop offset="60%" stop-color="#eaeaea"/><stop offset="100%" stop-color="#d8d8d8"/></linearGradient>
      <linearGradient id="sb5tweed" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8B7355"/><stop offset="50%" stop-color="#7a6245"/><stop offset="100%" stop-color="#6a5235"/></linearGradient>
      <linearGradient id="sb5board" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a5a2a"/><stop offset="100%" stop-color="#1a3a1a"/></linearGradient>
      <linearGradient id="sb5brain" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffbbdd"/><stop offset="100%" stop-color="#ff88aa"/></linearGradient>
      <linearGradient id="sb5skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0c4a0"/><stop offset="100%" stop-color="#d8a080"/></linearGradient>
      <radialGradient id="sb5steth"><stop offset="0%" stop-color="#888"/><stop offset="100%" stop-color="#444"/></radialGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#0a1628" stroke="#00d4ff" stroke-width="2"/>
    <!-- Chalkboard with wood frame -->
    <rect x="16" y="6" width="168" height="84" rx="2" fill="#5a3a1a"/>
    <rect x="20" y="10" width="160" height="76" rx="2" fill="url(#sb5board)"/>
    <rect x="24" y="14" width="152" height="68" rx="1" fill="#1a3a1a"/>
    <!-- Chalk tray -->
    <rect x="24" y="80" width="152" height="4" rx="1" fill="#5a3a1a"/>
    <rect x="30" y="79" width="12" height="3" rx="1" fill="#eee" opacity="0.6"/>
    <rect x="46" y="79" width="8" height="3" rx="1" fill="#ffee88" opacity="0.5"/>
    <!-- Chalk dust particles -->
    <circle cx="38" cy="76" r="1" fill="#fff" opacity="0.15"/>
    <circle cx="42" cy="73" r="0.8" fill="#fff" opacity="0.1"/>
    <circle cx="35" cy="74" r="0.6" fill="#fff" opacity="0.12"/>
    <circle cx="50" cy="75" r="0.7" fill="#fff" opacity="0.08"/>
    <!-- Cribbage equations on board -->
    <text x="32" y="32" fill="#8fbc8f" font-size="7" font-family="monospace">15=2 + 15=4</text>
    <text x="32" y="44" fill="#8fbc8f" font-size="7" font-family="monospace">J&#9824; + 5&#9829; = 15</text>
    <text x="32" y="56" fill="#8fbc8f" font-size="6" font-family="monospace">E(hand)=&#8721;P(s)&#183;V</text>
    <text x="32" y="68" fill="#8fbc8f" font-size="6" font-family="monospace">P(29)=1/216580</text>
    <text x="115" y="35" fill="#afdaaf" font-size="10" font-family="monospace" font-weight="bold">29!</text>
    <text x="110" y="50" fill="#8fbc8f" font-size="5" font-family="monospace">max=29pts</text>
    <text x="110" y="62" fill="#8fbc8f" font-size="5" font-family="monospace">&#8730;(crib)</text>
    <!-- Framed PhD diploma with gold frame -->
    <rect x="144" y="16" width="28" height="20" rx="1" fill="#c8a030" stroke="#ffd700" stroke-width="1.5"/>
    <rect x="147" y="19" width="22" height="14" rx="1" fill="#ffeedd"/>
    <text x="158" y="26" text-anchor="middle" fill="#6a4a1a" font-size="3.5" font-weight="bold">DOCTORATE</text>
    <text x="158" y="30" text-anchor="middle" fill="#8B6914" font-size="4" font-weight="bold">PhD</text>
    <!-- Framed MD diploma with gold frame -->
    <rect x="144" y="40" width="28" height="20" rx="1" fill="#c8a030" stroke="#ffd700" stroke-width="1.5"/>
    <rect x="147" y="43" width="22" height="14" rx="1" fill="#ffeedd"/>
    <text x="158" y="50" text-anchor="middle" fill="#6a4a1a" font-size="3.5" font-weight="bold">MEDICAL</text>
    <text x="158" y="54" text-anchor="middle" fill="#8B6914" font-size="4" font-weight="bold">MD</text>
    ${Tp(100,72)}
    <!-- Oversized brain bulging through beanie -->
    <ellipse cx="100" cy="36" rx="30" ry="20" fill="url(#sb5brain)" opacity="0.45"/>
    <path d="M76 38 Q82 28 92 33 Q97 26 106 30 Q112 24 118 32 Q124 28 126 38" fill="url(#sb5brain)" opacity="0.35"/>
    <!-- Brain fold lines -->
    <path d="M80 36 Q86 30 92 36" fill="none" stroke="#dd6699" stroke-width="0.7" opacity="0.4"/>
    <path d="M92 32 Q98 26 106 32" fill="none" stroke="#dd6699" stroke-width="0.7" opacity="0.4"/>
    <path d="M106 34 Q114 28 120 36" fill="none" stroke="#dd6699" stroke-width="0.7" opacity="0.4"/>
    <path d="M84 40 Q90 35 96 40" fill="none" stroke="#dd6699" stroke-width="0.5" opacity="0.3"/>
    <path d="M102 38 Q110 32 116 40" fill="none" stroke="#dd6699" stroke-width="0.5" opacity="0.3"/>
    <!-- Lab coat body -->
    <path d="M62 94 L138 94 L142 172 L58 172 Z" fill="url(#sb5coat)"/>
    <!-- Lab coat left panel -->
    <path d="M62 94 L100 94 L100 172 L58 172 Z" fill="#e4e4e4"/>
    <!-- Lab coat right panel overlap -->
    <path d="M96 94 L138 94 L142 172 L92 172 Z" fill="url(#sb5coat)"/>
    <!-- Lapel left -->
    <path d="M80 94 L92 110 L88 112 L78 98 Z" fill="#ddd" stroke="#ccc" stroke-width="0.5"/>
    <!-- Lapel right -->
    <path d="M120 94 L108 110 L112 112 L122 98 Z" fill="#ddd" stroke="#ccc" stroke-width="0.5"/>
    <!-- Lab coat breast pocket -->
    <rect x="110" y="108" width="14" height="10" rx="1" fill="none" stroke="#ccc" stroke-width="0.8"/>
    <!-- Pocket protector with pens -->
    <rect x="112" y="106" width="10" height="4" rx="1" fill="#ddeeff" opacity="0.7"/>
    <line x1="114" y1="102" x2="114" y2="110" stroke="#2244aa" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="117" y1="101" x2="117" y2="110" stroke="#cc2222" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="120" y1="103" x2="120" y2="110" stroke="#22aa22" stroke-width="1" stroke-linecap="round"/>
    <!-- Lower coat pocket left -->
    <rect x="68" y="140" width="18" height="12" rx="1" fill="none" stroke="#ccc" stroke-width="0.7"/>
    <!-- Lower coat pocket right -->
    <rect x="114" y="140" width="18" height="12" rx="1" fill="none" stroke="#ccc" stroke-width="0.7"/>
    <!-- Tweed jacket visible underneath -->
    <path d="M82 94 L118 94 L116 126 L84 126 Z" fill="url(#sb5tweed)"/>
    <!-- Tweed texture lines -->
    <line x1="86" y1="98" x2="116" y2="98" stroke="#6a5235" stroke-width="0.4" opacity="0.5"/>
    <line x1="86" y1="104" x2="116" y2="104" stroke="#6a5235" stroke-width="0.4" opacity="0.5"/>
    <line x1="86" y1="110" x2="116" y2="110" stroke="#6a5235" stroke-width="0.4" opacity="0.5"/>
    <!-- Tweed jacket V-neck -->
    <path d="M90 94 L100 108 L110 94" fill="none" stroke="#5a4225" stroke-width="1.2"/>
    <!-- Chest visible in V -->
    <path d="M92 96 L100 106 L108 96" fill="#e8b89a"/>
    <!-- Elbow patches on coat sleeves -->
    <ellipse cx="48" cy="112" rx="6" ry="8" fill="#7a6245" opacity="0.6"/>
    <ellipse cx="152" cy="112" rx="6" ry="8" fill="#7a6245" opacity="0.6"/>
    <!-- Stethoscope tubing from neck -->
    <path d="M94 96 Q90 108 86 118 Q82 128 80 136 Q78 142 76 146" fill="none" stroke="#555" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M106 96 Q108 106 106 114" fill="none" stroke="#555" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Stethoscope earpieces (tucked at neck) -->
    <circle cx="94" cy="94" r="1.5" fill="#888"/>
    <circle cx="106" cy="94" r="1.5" fill="#888"/>
    <!-- Stethoscope chest piece -->
    <circle cx="76" cy="148" r="6" fill="url(#sb5steth)" stroke="#333" stroke-width="1"/>
    <circle cx="76" cy="148" r="4" fill="#666" stroke="#555" stroke-width="0.5"/>
    <circle cx="76" cy="148" r="2" fill="#777"/>
    <!-- Thick buff arms busting out of sleeves -->
    <ellipse cx="48" cy="108" rx="20" ry="14" fill="url(#sb5skin)"/>
    <path d="M36 102 Q48 96 60 102" fill="none" stroke="#d8a080" stroke-width="0.6" opacity="0.5"/>
    <ellipse cx="152" cy="108" rx="20" ry="14" fill="url(#sb5skin)"/>
    <path d="M140 102 Q152 96 164 102" fill="none" stroke="#d8a080" stroke-width="0.6" opacity="0.5"/>
    <!-- Sleeve cuffs (stretched) -->
    <path d="M60 100 Q60 94 62 94" fill="none" stroke="#ccc" stroke-width="1.5"/>
    <path d="M140 100 Q140 94 138 94" fill="none" stroke="#ccc" stroke-width="1.5"/>
    <!-- Hands -->
    <ellipse cx="36" cy="118" rx="7" ry="6" fill="#e8b89a"/>
    <ellipse cx="164" cy="118" rx="7" ry="6" fill="#e8b89a"/>
    <!-- Legs in dress pants -->
    <rect x="74" y="164" width="20" height="20" rx="6" fill="#2a2a4a"/>
    <rect x="106" y="164" width="20" height="20" rx="6" fill="#2a2a4a"/>
    <!-- Shoe tops -->
    <rect x="72" y="180" width="24" height="6" rx="3" fill="#1a1a2a"/>
    <rect x="104" y="180" width="24" height="6" rx="3" fill="#1a1a2a"/>
    <!-- Coat hem detail -->
    <path d="M58 172 Q80 168 100 172 Q120 176 142 172" fill="none" stroke="#ccc" stroke-width="0.6"/>
    <text x="100" y="202" text-anchor="middle" fill="#00d4ff" font-size="9" font-family="system-ui" font-weight="800">PROFESSOR DOCTOR</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sb6flannel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#cc2222"/><stop offset="100%" stop-color="#991111"/></linearGradient>
      <linearGradient id="sb6skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0c4a0"/><stop offset="100%" stop-color="#d8a080"/></linearGradient>
      <linearGradient id="sb6axe" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#aaa"/><stop offset="40%" stop-color="#ccc"/><stop offset="100%" stop-color="#888"/></linearGradient>
      <linearGradient id="sb6handle" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a07030"/><stop offset="50%" stop-color="#8B6914"/><stop offset="100%" stop-color="#6a4a0a"/></linearGradient>
      <linearGradient id="sb6tree" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a5a2a"/><stop offset="100%" stop-color="#0a3a1a"/></linearGradient>
      <linearGradient id="sb6boot" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5a3a1a"/><stop offset="100%" stop-color="#3a2a0a"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#0a1628" stroke="#00d4ff" stroke-width="2"/>
    <!-- Snow on ground -->
    <ellipse cx="100" cy="185" rx="96" ry="12" fill="#c8ddef" opacity="0.15"/>
    <!-- Pine forest background — 7 trees at varying depths -->
    <polygon points="12,110 20,40 28,110" fill="#0a3a1a" opacity="0.3"/>
    <polygon points="20,110 30,55 40,110" fill="url(#sb6tree)" opacity="0.35"/>
    <rect x="28" y="105" width="4" height="10" fill="#3a2a1a" opacity="0.3"/>
    <polygon points="38,108 48,48 58,108" fill="#0a3a1a" opacity="0.25"/>
    <polygon points="140,108 150,42 160,108" fill="url(#sb6tree)" opacity="0.35"/>
    <rect x="148" y="103" width="4" height="10" fill="#3a2a1a" opacity="0.3"/>
    <polygon points="155,110 165,52 175,110" fill="#0a3a1a" opacity="0.3"/>
    <polygon points="168,110 176,60 184,110" fill="#0a2a18" opacity="0.25"/>
    <!-- Snow on trees -->
    <path d="M18 44 Q20 40 22 44" fill="#ddeeff" opacity="0.4"/>
    <path d="M28 58 Q30 55 32 58" fill="#ddeeff" opacity="0.35"/>
    <path d="M46 52 Q48 48 50 52" fill="#ddeeff" opacity="0.3"/>
    <path d="M148 46 Q150 42 152 46" fill="#ddeeff" opacity="0.4"/>
    <path d="M163 56 Q165 52 167 56" fill="#ddeeff" opacity="0.3"/>
    <!-- Log stump -->
    <ellipse cx="165" cy="155" rx="12" ry="5" fill="#8a6a3a"/>
    <rect x="153" y="150" width="24" height="10" rx="2" fill="#7a5a2a"/>
    <ellipse cx="165" cy="150" rx="12" ry="5" fill="#a07840"/>
    <!-- Stump rings -->
    <circle cx="165" cy="150" r="8" fill="none" stroke="#8a6a3a" stroke-width="0.5"/>
    <circle cx="165" cy="150" r="5" fill="none" stroke="#8a6a3a" stroke-width="0.4"/>
    <circle cx="165" cy="150" r="2" fill="#8a6a3a"/>
    <!-- Wood chips and sawdust flying (10 pieces) -->
    <rect x="42" y="72" width="5" height="2" rx="1" fill="#c8a060" transform="rotate(30 44 73)" opacity="0.7"/>
    <rect x="155" y="78" width="4" height="2" rx="1" fill="#c8a060" transform="rotate(-45 157 79)" opacity="0.6"/>
    <rect x="50" y="64" width="3" height="2" rx="1" fill="#c8a060" transform="rotate(60 51 65)" opacity="0.5"/>
    <rect x="148" y="88" width="4" height="1.5" rx="0.5" fill="#d4a850" transform="rotate(20 150 88)" opacity="0.5"/>
    <rect x="38" y="82" width="3" height="1.5" rx="0.5" fill="#c8a060" transform="rotate(-30 39 82)" opacity="0.4"/>
    <rect x="160" y="68" width="4" height="2" rx="1" fill="#d4a850" transform="rotate(50 162 69)" opacity="0.45"/>
    <circle cx="45" cy="76" r="1.5" fill="#c8a060" opacity="0.5"/>
    <circle cx="152" cy="74" r="1" fill="#d4a850" opacity="0.4"/>
    <rect x="55" y="58" width="3" height="1" rx="0.5" fill="#c8a060" transform="rotate(75 56 58)" opacity="0.35"/>
    <rect x="145" y="62" width="3.5" height="1.5" rx="0.5" fill="#c8a060" transform="rotate(-60 146 62)" opacity="0.4"/>
    ${Tp(100,46)}
    <!-- Flannel shirt — massive torso -->
    <path d="M60 68 L140 68 L146 140 L54 140 Z" fill="url(#sb6flannel)"/>
    <!-- Buffalo plaid pattern — horizontal lines -->
    <line x1="60" y1="76" x2="140" y2="76" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="60" y1="84" x2="140" y2="84" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="60" y1="92" x2="140" y2="92" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="60" y1="100" x2="140" y2="100" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="60" y1="108" x2="140" y2="108" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="60" y1="116" x2="140" y2="116" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="60" y1="124" x2="140" y2="124" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="60" y1="132" x2="140" y2="132" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <!-- Buffalo plaid — vertical lines -->
    <line x1="68" y1="68" x2="62" y2="140" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="78" y1="68" x2="72" y2="140" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="88" y1="68" x2="82" y2="140" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="98" y1="68" x2="92" y2="140" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="108" y1="68" x2="102" y2="140" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="118" y1="68" x2="112" y2="140" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="128" y1="68" x2="122" y2="140" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <line x1="138" y1="68" x2="134" y2="140" stroke="#111" stroke-width="1.2" opacity="0.4"/>
    <!-- Flannel collar -->
    <path d="M82 68 L90 76 L100 68" fill="#aa1a1a" stroke="#111" stroke-width="0.5"/>
    <path d="M118 68 L110 76 L100 68" fill="#aa1a1a" stroke="#111" stroke-width="0.5"/>
    <!-- Suspenders -->
    <line x1="82" y1="68" x2="78" y2="140" stroke="#3a3a2a" stroke-width="3"/>
    <line x1="118" y1="68" x2="122" y2="140" stroke="#3a3a2a" stroke-width="3"/>
    <!-- Suspender buckles -->
    <rect x="76" y="82" width="6" height="4" rx="1" fill="#888"/>
    <rect x="118" y="82" width="6" height="4" rx="1" fill="#888"/>
    <!-- Rolled-up sleeves showing massive forearms -->
    <path d="M60 76 L38 88 L36 100 L56 90 Z" fill="url(#sb6skin)"/>
    <path d="M140 76 L162 88 L164 100 L144 90 Z" fill="url(#sb6skin)"/>
    <!-- Sleeve roll cuffs -->
    <path d="M56 76 L42 82" fill="none" stroke="#991111" stroke-width="3"/>
    <path d="M144 76 L158 82" fill="none" stroke="#991111" stroke-width="3"/>
    <!-- Forearm muscle definition -->
    <path d="M42 90 Q46 86 50 90" fill="none" stroke="#d0a080" stroke-width="0.6" opacity="0.5"/>
    <path d="M150 90 Q154 86 158 90" fill="none" stroke="#d0a080" stroke-width="0.6" opacity="0.5"/>
    <!-- Fists -->
    <circle cx="34" cy="102" r="7" fill="#e8b89a"/>
    <circle cx="166" cy="102" r="7" fill="#e8b89a"/>
    <!-- Double-bit axe -->
    <line x1="155" y1="34" x2="172" y2="128" stroke="url(#sb6handle)" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Wood grain lines on handle -->
    <line x1="158" y1="50" x2="160" y2="60" stroke="#6a4a0a" stroke-width="0.5" opacity="0.5"/>
    <line x1="162" y1="75" x2="164" y2="85" stroke="#6a4a0a" stroke-width="0.5" opacity="0.5"/>
    <line x1="165" y1="95" x2="167" y2="105" stroke="#6a4a0a" stroke-width="0.5" opacity="0.5"/>
    <!-- Axe head — double bit -->
    <path d="M146 28 L154 18 L162 24 L158 34 Z" fill="url(#sb6axe)" stroke="#666" stroke-width="0.5"/>
    <path d="M162 24 L170 20 L168 32 L158 34 Z" fill="url(#sb6axe)" stroke="#666" stroke-width="0.5"/>
    <!-- Axe edge highlights -->
    <line x1="148" y1="22" x2="154" y2="19" stroke="#eee" stroke-width="0.8" opacity="0.6"/>
    <line x1="168" y1="22" x2="169" y2="28" stroke="#eee" stroke-width="0.8" opacity="0.6"/>
    <!-- Legs in work jeans -->
    <rect x="70" y="138" width="24" height="34" rx="8" fill="#3a3a4a"/>
    <rect x="106" y="138" width="24" height="34" rx="8" fill="#3a3a4a"/>
    <!-- Jean seam lines -->
    <line x1="82" y1="140" x2="82" y2="170" stroke="#2a2a3a" stroke-width="0.5"/>
    <line x1="118" y1="140" x2="118" y2="170" stroke="#2a2a3a" stroke-width="0.5"/>
    <!-- Work boots -->
    <rect x="66" y="168" width="32" height="10" rx="4" fill="url(#sb6boot)"/>
    <rect x="102" y="168" width="32" height="10" rx="4" fill="url(#sb6boot)"/>
    <!-- Boot lace detail -->
    <line x1="76" y1="169" x2="82" y2="169" stroke="#333" stroke-width="0.5"/>
    <line x1="76" y1="172" x2="82" y2="172" stroke="#333" stroke-width="0.5"/>
    <line x1="118" y1="169" x2="124" y2="169" stroke="#333" stroke-width="0.5"/>
    <line x1="118" y1="172" x2="124" y2="172" stroke="#333" stroke-width="0.5"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="12" font-family="system-ui" font-weight="800">LUMBERJACK</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sb7hoodie" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a2a4a"/><stop offset="50%" stop-color="#1a1a3a"/><stop offset="100%" stop-color="#0a0a1e"/></linearGradient>
      <linearGradient id="sb7chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eee"/><stop offset="30%" stop-color="#bbb"/><stop offset="70%" stop-color="#ddd"/><stop offset="100%" stop-color="#999"/></linearGradient>
      <linearGradient id="sb7deck" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#333"/><stop offset="100%" stop-color="#111"/></linearGradient>
      <radialGradient id="sb7platter"><stop offset="0%" stop-color="#555"/><stop offset="40%" stop-color="#222"/><stop offset="60%" stop-color="#333"/><stop offset="80%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#111"/></radialGradient>
      <linearGradient id="sb7fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity="0.08"/></linearGradient>
      <linearGradient id="sb7skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0c4a0"/><stop offset="100%" stop-color="#d8a080"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#0a0818" stroke="#00d4ff" stroke-width="2"/>
    <!-- Speaker stacks in background -->
    <rect x="10" y="60" width="18" height="50" rx="2" fill="#1a1a1a" opacity="0.5"/>
    <rect x="12" y="64" width="14" height="10" rx="1" fill="#111" opacity="0.6"/>
    <circle cx="19" cy="69" r="4" fill="#0a0a0a" opacity="0.5"/>
    <rect x="12" y="78" width="14" height="10" rx="1" fill="#111" opacity="0.6"/>
    <circle cx="19" cy="83" r="4" fill="#0a0a0a" opacity="0.5"/>
    <rect x="12" y="92" width="14" height="14" rx="1" fill="#111" opacity="0.6"/>
    <circle cx="19" cy="99" r="5" fill="#0a0a0a" opacity="0.5"/>
    <rect x="172" y="60" width="18" height="50" rx="2" fill="#1a1a1a" opacity="0.5"/>
    <rect x="174" y="64" width="14" height="10" rx="1" fill="#111" opacity="0.6"/>
    <circle cx="181" cy="69" r="4" fill="#0a0a0a" opacity="0.5"/>
    <rect x="174" y="78" width="14" height="10" rx="1" fill="#111" opacity="0.6"/>
    <circle cx="181" cy="83" r="4" fill="#0a0a0a" opacity="0.5"/>
    <rect x="174" y="92" width="14" height="14" rx="1" fill="#111" opacity="0.6"/>
    <circle cx="181" cy="99" r="5" fill="#0a0a0a" opacity="0.5"/>
    <!-- Laser/neon light beams from above -->
    <line x1="30" y1="12" x2="55" y2="100" stroke="#ff00ff" stroke-width="2.5" opacity="0.12"/>
    <line x1="50" y1="12" x2="65" y2="100" stroke="#ff00ff" stroke-width="1.5" opacity="0.08"/>
    <line x1="170" y1="12" x2="145" y2="100" stroke="#00ffff" stroke-width="2.5" opacity="0.12"/>
    <line x1="150" y1="12" x2="135" y2="100" stroke="#00ffff" stroke-width="1.5" opacity="0.08"/>
    <line x1="90" y1="12" x2="85" y2="90" stroke="#ffff00" stroke-width="2" opacity="0.08"/>
    <line x1="110" y1="12" x2="115" y2="90" stroke="#ffff00" stroke-width="2" opacity="0.08"/>
    <line x1="70" y1="12" x2="75" y2="95" stroke="#44ff44" stroke-width="1.5" opacity="0.06"/>
    <line x1="130" y1="12" x2="125" y2="95" stroke="#ff4444" stroke-width="1.5" opacity="0.06"/>
    <!-- Neon glow spots -->
    <circle cx="40" cy="25" r="10" fill="#ff00ff" opacity="0.06"/>
    <circle cx="160" cy="25" r="10" fill="#00ffff" opacity="0.06"/>
    <circle cx="100" cy="20" r="8" fill="#ffff00" opacity="0.04"/>
    ${Tp(100,48)}
    <!-- Over-ear headphones -->
    <!-- Chrome headband -->
    <path d="M70 30 Q70 14 100 12 Q130 14 130 30" fill="none" stroke="url(#sb7chrome)" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Left ear cup -->
    <rect x="62" y="38" width="14" height="18" rx="4" fill="#333" stroke="#444" stroke-width="1"/>
    <rect x="64" y="40" width="10" height="14" rx="3" fill="#222"/>
    <!-- Left padding -->
    <ellipse cx="69" cy="47" rx="6" ry="8" fill="#2a2a2a" stroke="#3a3a3a" stroke-width="0.5"/>
    <!-- Right ear cup -->
    <rect x="124" y="38" width="14" height="18" rx="4" fill="#333" stroke="#444" stroke-width="1"/>
    <rect x="126" y="40" width="10" height="14" rx="3" fill="#222"/>
    <!-- Right padding -->
    <ellipse cx="131" cy="47" rx="6" ry="8" fill="#2a2a2a" stroke="#3a3a3a" stroke-width="0.5"/>
    <!-- Hoodie torso -->
    <path d="M66 74 L134 74 L138 140 L62 140 Z" fill="url(#sb7hoodie)"/>
    <!-- Hood neckline -->
    <path d="M78 74 Q84 68 88 74" fill="none" stroke="#3a3a5a" stroke-width="1"/>
    <path d="M112 74 Q116 68 122 74" fill="none" stroke="#3a3a5a" stroke-width="1"/>
    <!-- Hoodie V-neck -->
    <path d="M88 74 L100 88 L112 74" fill="none" stroke="#2a2a4a" stroke-width="1.2"/>
    <!-- Drawstrings -->
    <line x1="90" y1="76" x2="88" y2="92" stroke="#4a4a6a" stroke-width="0.8"/>
    <line x1="110" y1="76" x2="112" y2="92" stroke="#4a4a6a" stroke-width="0.8"/>
    <circle cx="88" cy="93" r="1" fill="#4a4a6a"/>
    <circle cx="112" cy="93" r="1" fill="#4a4a6a"/>
    <!-- Front pocket -->
    <path d="M78 112 L122 112 L124 130 L76 130 Z" fill="#1a1a2e" stroke="#2a2a3a" stroke-width="0.5"/>
    <path d="M78 112 Q100 108 122 112" fill="none" stroke="#2a2a3a" stroke-width="0.6"/>
    <!-- Hoodie fold lines -->
    <line x1="86" y1="88" x2="84" y2="110" stroke="#1a1a2e" stroke-width="0.5" opacity="0.4"/>
    <line x1="114" y1="88" x2="116" y2="110" stroke="#1a1a2e" stroke-width="0.5" opacity="0.4"/>
    <!-- Buff arms reaching to decks -->
    <path d="M66 86 L38 108 L40 118 L64 98 Z" fill="url(#sb7skin)"/>
    <path d="M134 86 L162 108 L160 118 L136 98 Z" fill="url(#sb7skin)"/>
    <!-- Arm muscle highlights -->
    <path d="M50 100 Q54 96 58 100" fill="none" stroke="#d8a080" stroke-width="0.5" opacity="0.4"/>
    <path d="M142 100 Q146 96 150 100" fill="none" stroke="#d8a080" stroke-width="0.5" opacity="0.4"/>
    <!-- Left hand on record (scratching pose) -->
    <ellipse cx="34" cy="120" rx="7" ry="5" fill="#e8b89a"/>
    <!-- Right hand on mixer -->
    <ellipse cx="166" cy="120" rx="7" ry="5" fill="#e8b89a"/>
    <!-- Left turntable -->
    <rect x="10" y="118" width="52" height="30" rx="3" fill="url(#sb7deck)" stroke="#444" stroke-width="0.5"/>
    <circle cx="36" cy="130" r="14" fill="url(#sb7platter)"/>
    <circle cx="36" cy="130" r="10" fill="none" stroke="#3a3a3a" stroke-width="0.3"/>
    <circle cx="36" cy="130" r="6" fill="none" stroke="#3a3a3a" stroke-width="0.3"/>
    <circle cx="36" cy="130" r="2" fill="#666"/>
    <!-- Tonearm left -->
    <line x1="52" y1="120" x2="42" y2="126" stroke="#888" stroke-width="1.2"/>
    <circle cx="52" cy="120" r="2" fill="#aaa"/>
    <circle cx="42" cy="126" r="1" fill="#aaa"/>
    <!-- Pitch slider left -->
    <rect x="14" y="122" width="3" height="18" rx="1" fill="#444"/>
    <rect x="14" y="128" width="3" height="4" rx="1" fill="#ff4444"/>
    <!-- Right turntable -->
    <rect x="138" y="118" width="52" height="30" rx="3" fill="url(#sb7deck)" stroke="#444" stroke-width="0.5"/>
    <circle cx="164" cy="130" r="14" fill="url(#sb7platter)"/>
    <circle cx="164" cy="130" r="10" fill="none" stroke="#3a3a3a" stroke-width="0.3"/>
    <circle cx="164" cy="130" r="6" fill="none" stroke="#3a3a3a" stroke-width="0.3"/>
    <circle cx="164" cy="130" r="2" fill="#666"/>
    <!-- Tonearm right -->
    <line x1="148" y1="120" x2="158" y2="126" stroke="#888" stroke-width="1.2"/>
    <circle cx="148" cy="120" r="2" fill="#aaa"/>
    <circle cx="158" cy="126" r="1" fill="#aaa"/>
    <!-- Pitch slider right -->
    <rect x="183" y="122" width="3" height="18" rx="1" fill="#444"/>
    <rect x="183" y="130" width="3" height="4" rx="1" fill="#ff4444"/>
    <!-- Mixer/crossfader in center -->
    <rect x="62" y="124" width="76" height="24" rx="2" fill="#222" stroke="#444" stroke-width="0.5"/>
    <!-- Mixer knobs -->
    <circle cx="76" cy="132" r="3" fill="#555" stroke="#666" stroke-width="0.5"/>
    <circle cx="88" cy="132" r="3" fill="#555" stroke="#666" stroke-width="0.5"/>
    <circle cx="112" cy="132" r="3" fill="#555" stroke="#666" stroke-width="0.5"/>
    <circle cx="124" cy="132" r="3" fill="#555" stroke="#666" stroke-width="0.5"/>
    <!-- Crossfader -->
    <rect x="82" y="140" width="36" height="4" rx="1" fill="#333"/>
    <rect x="94" y="139" width="8" height="6" rx="2" fill="#888"/>
    <!-- Volume meters -->
    <rect x="98" y="128" width="2" height="8" rx="0.5" fill="#00ff00" opacity="0.5"/>
    <rect x="102" y="130" width="2" height="6" rx="0.5" fill="#00ff00" opacity="0.4"/>
    <rect x="106" y="132" width="2" height="4" rx="0.5" fill="#ffff00" opacity="0.3"/>
    <!-- Fog/haze at bottom -->
    <ellipse cx="100" cy="170" rx="90" ry="16" fill="url(#sb7fog)"/>
    <ellipse cx="60" cy="175" rx="50" ry="10" fill="#fff" opacity="0.03"/>
    <ellipse cx="140" cy="172" rx="50" ry="12" fill="#fff" opacity="0.03"/>
    <!-- Legs -->
    <rect x="78" y="140" width="18" height="32" rx="7" fill="url(#sb7hoodie)"/>
    <rect x="104" y="140" width="18" height="32" rx="7" fill="url(#sb7hoodie)"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="12" font-family="system-ui" font-weight="800">DJ SPENCE</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sb8coat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a2a5a"/><stop offset="50%" stop-color="#142248"/><stop offset="100%" stop-color="#0a1430"/></linearGradient>
      <linearGradient id="sb8gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe066"/><stop offset="50%" stop-color="#ffd700"/><stop offset="100%" stop-color="#cc9900"/></linearGradient>
      <linearGradient id="sb8hat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a2a1a"/><stop offset="100%" stop-color="#1a0a00"/></linearGradient>
      <linearGradient id="sb8skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0c4a0"/><stop offset="100%" stop-color="#d8a080"/></linearGradient>
      <linearGradient id="sb8ocean" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a4488"/><stop offset="100%" stop-color="#062244"/></linearGradient>
      <linearGradient id="sb8wheel" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a07830"/><stop offset="50%" stop-color="#8B6914"/><stop offset="100%" stop-color="#6a4a0a"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#0a1628" stroke="#00d4ff" stroke-width="2"/>
    <!-- Skull and crossbones flag in background -->
    <line x1="28" y1="18" x2="28" y2="90" stroke="#5a3a1a" stroke-width="2.5"/>
    <rect x="30" y="18" width="36" height="28" rx="1" fill="#111"/>
    <!-- Skull on flag -->
    <circle cx="48" cy="28" r="6" fill="#ddd" opacity="0.6"/>
    <rect x="45" y="34" width="6" height="5" rx="1" fill="#ddd" opacity="0.5"/>
    <!-- Crossbones -->
    <line x1="40" y1="36" x2="56" y2="44" stroke="#ddd" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
    <line x1="56" y1="36" x2="40" y2="44" stroke="#ddd" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
    <!-- Flag flutter -->
    <path d="M30 18 Q40 14 50 18 Q60 22 66 18" fill="none" stroke="#222" stroke-width="0.5"/>
    <!-- Rope coils on deck -->
    <circle cx="168" cy="160" r="8" fill="none" stroke="#8a7a5a" stroke-width="2.5" opacity="0.4"/>
    <circle cx="168" cy="160" r="5" fill="none" stroke="#8a7a5a" stroke-width="2" opacity="0.3"/>
    <circle cx="168" cy="160" r="2.5" fill="#8a7a5a" opacity="0.3"/>
    <!-- More rope -->
    <path d="M20 155 Q26 148 32 155 Q38 162 44 155" fill="none" stroke="#8a7a5a" stroke-width="1.5" opacity="0.3"/>
    <!-- Ocean waves at bottom -->
    <path d="M2 170 Q20 164 40 170 Q60 176 80 170 Q100 164 120 170 Q140 176 160 170 Q180 164 198 170 L198 210 L2 210 Z" fill="url(#sb8ocean)" opacity="0.5"/>
    <path d="M2 176 Q25 170 50 176 Q75 182 100 176 Q125 170 150 176 Q175 182 198 176" fill="none" stroke="#3a6aaa" stroke-width="1" opacity="0.4"/>
    <path d="M2 182 Q30 176 60 182 Q90 188 120 182 Q150 176 180 182" fill="none" stroke="#3a6aaa" stroke-width="0.8" opacity="0.3"/>
    <!-- Wave foam -->
    <path d="M30 170 Q35 168 40 170" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.2"/>
    <path d="M100 170 Q105 168 110 170" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.2"/>
    <path d="M160 170 Q165 168 170 170" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.2"/>
    ${Tp(100,50)}
    <!-- Tricorn hat OVER the beanie -->
    <path d="M56 28 Q60 6 100 2 Q140 6 144 28 L132 36 Q100 24 68 36 Z" fill="url(#sb8hat)"/>
    <!-- Hat brim underside -->
    <path d="M68 36 Q100 30 132 36" fill="#2a1a0a" stroke="#1a0a00" stroke-width="0.5"/>
    <!-- Gold trim on hat -->
    <path d="M68 36 Q100 28 132 36" fill="none" stroke="url(#sb8gold)" stroke-width="2"/>
    <path d="M62 28 Q68 16 80 12" fill="none" stroke="url(#sb8gold)" stroke-width="1" opacity="0.5"/>
    <path d="M138 28 Q132 16 120 12" fill="none" stroke="url(#sb8gold)" stroke-width="1" opacity="0.5"/>
    <!-- Feather on hat -->
    <path d="M128 14 Q140 6 148 10 Q142 14 136 12 Q134 18 128 14" fill="#cc2222" opacity="0.8"/>
    <line x1="128" y1="14" x2="148" y2="10" stroke="#aa1a1a" stroke-width="0.5" opacity="0.6"/>
    <!-- Skull emblem on hat -->
    <circle cx="100" cy="18" r="5" fill="#ddd" opacity="0.5"/>
    <rect x="97" y="23" width="6" height="4" rx="1" fill="#ddd" opacity="0.4"/>
    <line x1="95" y1="25" x2="105" y2="29" stroke="#ddd" stroke-width="1" opacity="0.3" stroke-linecap="round"/>
    <line x1="105" y1="25" x2="95" y2="29" stroke="#ddd" stroke-width="1" opacity="0.3" stroke-linecap="round"/>
    <!-- Navy captain coat -->
    <path d="M58 74 L142 74 L148 155 L52 155 Z" fill="url(#sb8coat)"/>
    <!-- Coat left panel -->
    <path d="M58 74 L100 74 L100 155 L52 155 Z" fill="#122040"/>
    <!-- Coat right panel overlap -->
    <path d="M96 74 L142 74 L148 155 L90 155 Z" fill="url(#sb8coat)"/>
    <!-- Gold epaulettes -->
    <rect x="50" y="72" width="16" height="6" rx="2" fill="url(#sb8gold)"/>
    <path d="M50 78 L54 82 L58 78 L62 82 L66 78" fill="url(#sb8gold)" opacity="0.7"/>
    <rect x="134" y="72" width="16" height="6" rx="2" fill="url(#sb8gold)"/>
    <path d="M134 78 L138 82 L142 78 L146 82 L150 78" fill="url(#sb8gold)" opacity="0.7"/>
    <!-- Gold trim on coat edges -->
    <line x1="96" y1="74" x2="90" y2="155" stroke="url(#sb8gold)" stroke-width="1.5"/>
    <line x1="58" y1="74" x2="52" y2="155" stroke="url(#sb8gold)" stroke-width="1" opacity="0.5"/>
    <line x1="142" y1="74" x2="148" y2="155" stroke="url(#sb8gold)" stroke-width="1" opacity="0.5"/>
    <!-- Double row of brass buttons -->
    <circle cx="88" cy="86" r="2.5" fill="url(#sb8gold)" stroke="#aa8800" stroke-width="0.5"/>
    <circle cx="88" cy="98" r="2.5" fill="url(#sb8gold)" stroke="#aa8800" stroke-width="0.5"/>
    <circle cx="88" cy="110" r="2.5" fill="url(#sb8gold)" stroke="#aa8800" stroke-width="0.5"/>
    <circle cx="88" cy="122" r="2.5" fill="url(#sb8gold)" stroke="#aa8800" stroke-width="0.5"/>
    <circle cx="102" cy="86" r="2.5" fill="url(#sb8gold)" stroke="#aa8800" stroke-width="0.5"/>
    <circle cx="102" cy="98" r="2.5" fill="url(#sb8gold)" stroke="#aa8800" stroke-width="0.5"/>
    <circle cx="102" cy="110" r="2.5" fill="url(#sb8gold)" stroke="#aa8800" stroke-width="0.5"/>
    <circle cx="102" cy="122" r="2.5" fill="url(#sb8gold)" stroke="#aa8800" stroke-width="0.5"/>
    <!-- Cuff details -->
    <rect x="54" y="96" width="8" height="5" rx="1" fill="url(#sb8gold)" opacity="0.6"/>
    <rect x="138" y="96" width="8" height="5" rx="1" fill="url(#sb8gold)" opacity="0.6"/>
    <!-- Crossed anchor emblem on coat -->
    <line x1="92" y1="130" x2="98" y2="142" stroke="url(#sb8gold)" stroke-width="1" opacity="0.5"/>
    <line x1="98" y1="130" x2="92" y2="142" stroke="url(#sb8gold)" stroke-width="1" opacity="0.5"/>
    <circle cx="95" cy="132" r="2" fill="url(#sb8gold)" opacity="0.4"/>
    <!-- Buff arms -->
    <ellipse cx="42" cy="90" rx="20" ry="15" fill="url(#sb8skin)"/>
    <path d="M30 84 Q42 78 54 84" fill="none" stroke="#d8a080" stroke-width="0.5" opacity="0.4"/>
    <ellipse cx="158" cy="90" rx="20" ry="15" fill="url(#sb8skin)"/>
    <path d="M146 84 Q158 78 170 84" fill="none" stroke="#d8a080" stroke-width="0.5" opacity="0.4"/>
    <!-- Ship wheel in right hand — 8 spokes -->
    <circle cx="172" cy="112" r="16" fill="none" stroke="url(#sb8wheel)" stroke-width="3"/>
    <circle cx="172" cy="112" r="10" fill="none" stroke="url(#sb8wheel)" stroke-width="1.5"/>
    <!-- Brass center hub -->
    <circle cx="172" cy="112" r="4" fill="#c89830" stroke="#aa8020" stroke-width="1"/>
    <!-- 8 spokes -->
    <line x1="172" y1="96" x2="172" y2="101" stroke="url(#sb8wheel)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="172" y1="123" x2="172" y2="128" stroke="url(#sb8wheel)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="156" y1="112" x2="161" y2="112" stroke="url(#sb8wheel)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="183" y1="112" x2="188" y2="112" stroke="url(#sb8wheel)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="161" y1="101" x2="164" y2="104" stroke="url(#sb8wheel)" stroke-width="2" stroke-linecap="round"/>
    <line x1="183" y1="101" x2="180" y2="104" stroke="url(#sb8wheel)" stroke-width="2" stroke-linecap="round"/>
    <line x1="161" y1="123" x2="164" y2="120" stroke="url(#sb8wheel)" stroke-width="2" stroke-linecap="round"/>
    <line x1="183" y1="123" x2="180" y2="120" stroke="url(#sb8wheel)" stroke-width="2" stroke-linecap="round"/>
    <!-- Colorful parrot on left shoulder -->
    <!-- Parrot body -->
    <ellipse cx="46" cy="72" rx="8" ry="11" fill="#22bb44"/>
    <path d="M40 72 Q46 68 52 72" fill="#1a9938" opacity="0.6"/>
    <!-- Parrot head -->
    <ellipse cx="44" cy="62" rx="6" ry="6" fill="#22cc44"/>
    <!-- Parrot eye ring -->
    <circle cx="42" cy="61" r="2.5" fill="#fff"/>
    <circle cx="42" cy="61" r="1.5" fill="#111"/>
    <!-- Parrot beak -->
    <path d="M38 62 L34 60 L36 64 Z" fill="#ff8800" stroke="#cc6600" stroke-width="0.5"/>
    <!-- Parrot wing detail -->
    <path d="M50 68 Q56 74 52 82" fill="none" stroke="#1a8830" stroke-width="2" stroke-linecap="round"/>
    <path d="M48 70 Q54 76 50 84" fill="none" stroke="#1aaa38" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    <!-- Parrot tail feathers -->
    <path d="M48 82 L52 96 L46 94 Z" fill="#cc2222"/>
    <path d="M50 82 L56 94 L50 92 Z" fill="#2222cc"/>
    <path d="M46 82 L48 95 L42 93 Z" fill="#22aa22"/>
    <!-- Parrot head crest -->
    <path d="M46 56 Q50 52 48 56" fill="#ffdd00"/>
    <!-- Legs in captain boots -->
    <rect x="72" y="150" width="22" height="22" rx="7" fill="#1a0a00"/>
    <rect x="106" y="150" width="22" height="22" rx="7" fill="#1a0a00"/>
    <!-- Boot cuffs -->
    <path d="M72 154 Q83 150 94 154" fill="none" stroke="url(#sb8gold)" stroke-width="1"/>
    <path d="M106 154 Q117 150 128 154" fill="none" stroke="url(#sb8gold)" stroke-width="1"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="11" font-family="system-ui" font-weight="800">EL CAPITAN</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sb9sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#040a1a"/><stop offset="50%" stop-color="#0a1a3a"/><stop offset="100%" stop-color="#0a2a4a"/></linearGradient>
      <linearGradient id="sb9skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0c4a0"/><stop offset="100%" stop-color="#d8a080"/></linearGradient>
      <linearGradient id="sb9fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6a4a2a"/><stop offset="50%" stop-color="#5a3a1a"/><stop offset="100%" stop-color="#4a2a0a"/></linearGradient>
      <linearGradient id="sb9mtn1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a5a7a"/><stop offset="100%" stop-color="#2a3a5a"/></linearGradient>
      <linearGradient id="sb9mtn2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5a6a8a"/><stop offset="100%" stop-color="#3a4a6a"/></linearGradient>
      <linearGradient id="sb9aurora1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#00ff88" stop-opacity="0"/><stop offset="30%" stop-color="#00ff88" stop-opacity="0.25"/><stop offset="70%" stop-color="#00ffaa" stop-opacity="0.2"/><stop offset="100%" stop-color="#00ff88" stop-opacity="0"/></linearGradient>
      <linearGradient id="sb9aurora2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#00ccff" stop-opacity="0"/><stop offset="40%" stop-color="#00ddff" stop-opacity="0.18"/><stop offset="60%" stop-color="#44ffee" stop-opacity="0.15"/><stop offset="100%" stop-color="#00ccff" stop-opacity="0"/></linearGradient>
      <linearGradient id="sb9aurora3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8844cc" stop-opacity="0"/><stop offset="50%" stop-color="#aa66ff" stop-opacity="0.15"/><stop offset="100%" stop-color="#8844cc" stop-opacity="0"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="url(#sb9sky)" stroke="#00d4ff" stroke-width="2"/>
    <!-- Stars scattered in sky -->
    <circle cx="20" cy="15" r="1" fill="#fff" opacity="0.7"/>
    <circle cx="55" cy="10" r="0.8" fill="#fff" opacity="0.5"/>
    <circle cx="90" cy="8" r="1.2" fill="#fff" opacity="0.6"/>
    <circle cx="130" cy="12" r="0.8" fill="#fff" opacity="0.5"/>
    <circle cx="160" cy="18" r="1" fill="#fff" opacity="0.6"/>
    <circle cx="175" cy="8" r="0.7" fill="#fff" opacity="0.4"/>
    <circle cx="40" cy="28" r="0.6" fill="#fff" opacity="0.4"/>
    <circle cx="110" cy="22" r="1" fill="#fff" opacity="0.5"/>
    <circle cx="145" cy="30" r="0.7" fill="#fff" opacity="0.45"/>
    <circle cx="70" cy="18" r="0.8" fill="#fff" opacity="0.35"/>
    <circle cx="185" cy="28" r="0.6" fill="#fff" opacity="0.3"/>
    <circle cx="15" cy="35" r="0.7" fill="#fff" opacity="0.3"/>
    <!-- Northern lights — 4 undulating bands -->
    <path d="M10 18 Q40 10 70 22 Q100 34 130 20 Q160 8 190 18" fill="url(#sb9aurora1)" stroke="#00ff88" stroke-width="0.5" opacity="0.3"/>
    <path d="M5 28 Q35 16 65 30 Q95 44 130 28 Q160 14 195 30" fill="url(#sb9aurora2)" stroke="#00ddff" stroke-width="0.4" opacity="0.25"/>
    <path d="M10 38 Q45 26 80 40 Q110 52 140 36 Q170 22 195 40" fill="url(#sb9aurora3)" stroke="#aa66ff" stroke-width="0.4" opacity="0.2"/>
    <path d="M15 48 Q50 36 85 48 Q115 58 145 44 Q170 32 190 48" fill="none" stroke="#44ffaa" stroke-width="2" opacity="0.08"/>
    <!-- Snowy mountain range — 5 peaks with depth layers -->
    <!-- Far mountains (lighter) -->
    <polygon points="0,105 25,65 50,105" fill="#3a4a6a" opacity="0.5"/>
    <polygon points="150,105 180,62 200,105" fill="#3a4a6a" opacity="0.5"/>
    <!-- Mid mountains -->
    <polygon points="10,110 50,55 90,110" fill="url(#sb9mtn1)"/>
    <polygon points="60,110 95,48 130,110" fill="url(#sb9mtn2)"/>
    <polygon points="110,110 145,52 180,110" fill="url(#sb9mtn1)"/>
    <!-- Snow caps with highlight -->
    <polygon points="50,55 42,68 58,68" fill="#eef4ff"/>
    <polygon points="50,55 46,62 54,62" fill="#fff" opacity="0.7"/>
    <polygon points="95,48 87,62 103,62" fill="#eef4ff"/>
    <polygon points="95,48 91,56 99,56" fill="#fff" opacity="0.7"/>
    <polygon points="145,52 137,66 153,66" fill="#eef4ff"/>
    <polygon points="145,52 141,60 149,60" fill="#fff" opacity="0.7"/>
    <polygon points="25,65 20,74 30,74" fill="#ddeeff" opacity="0.6"/>
    <polygon points="180,62 175,72 185,72" fill="#ddeeff" opacity="0.6"/>
    <!-- Mountain ridge detail lines -->
    <line x1="50" y1="55" x2="70" y2="90" stroke="#2a3a5a" stroke-width="0.5" opacity="0.4"/>
    <line x1="95" y1="48" x2="75" y2="88" stroke="#3a4a6a" stroke-width="0.5" opacity="0.4"/>
    <line x1="145" y1="52" x2="165" y2="90" stroke="#2a3a5a" stroke-width="0.5" opacity="0.4"/>
    <!-- Snow falling -->
    <circle cx="25" cy="50" r="1.2" fill="#fff" opacity="0.5"/>
    <circle cx="50" cy="42" r="1" fill="#fff" opacity="0.4"/>
    <circle cx="80" cy="55" r="1.3" fill="#fff" opacity="0.45"/>
    <circle cx="120" cy="40" r="1" fill="#fff" opacity="0.35"/>
    <circle cx="155" cy="48" r="1.2" fill="#fff" opacity="0.4"/>
    <circle cx="175" cy="55" r="1" fill="#fff" opacity="0.35"/>
    <circle cx="35" cy="70" r="0.8" fill="#fff" opacity="0.3"/>
    <circle cx="170" cy="65" r="0.9" fill="#fff" opacity="0.3"/>
    <circle cx="65" cy="38" r="0.8" fill="#fff" opacity="0.3"/>
    <circle cx="140" cy="35" r="0.7" fill="#fff" opacity="0.25"/>
    ${Tp(100,56)}
    <!-- Breath vapor from mouth (cold!) -->
    <ellipse cx="112" cy="82" rx="8" ry="4" fill="#fff" opacity="0.08"/>
    <ellipse cx="118" cy="80" rx="6" ry="3" fill="#fff" opacity="0.06"/>
    <ellipse cx="122" cy="78" rx="4" ry="2" fill="#fff" opacity="0.04"/>
    <!-- Bear fur cape — left side -->
    <path d="M56 76 L48 80 Q26 100 32 160 L56 142 Z" fill="url(#sb9fur)"/>
    <!-- Fur texture left cape -->
    <path d="M34 100 Q38 96 42 100" fill="none" stroke="#7a5a3a" stroke-width="1" opacity="0.5"/>
    <path d="M32 112 Q36 108 40 112" fill="none" stroke="#7a5a3a" stroke-width="0.8" opacity="0.4"/>
    <path d="M34 124 Q38 120 42 124" fill="none" stroke="#7a5a3a" stroke-width="0.8" opacity="0.4"/>
    <path d="M36 136 Q40 132 44 136" fill="none" stroke="#7a5a3a" stroke-width="0.7" opacity="0.35"/>
    <path d="M30 106 Q33 103 36 106" fill="none" stroke="#6a4a2a" stroke-width="0.6" opacity="0.3"/>
    <!-- Bear fur cape — right side -->
    <path d="M144 76 L152 80 Q174 100 168 160 L144 142 Z" fill="url(#sb9fur)"/>
    <!-- Fur texture right cape -->
    <path d="M158 100 Q162 96 166 100" fill="none" stroke="#7a5a3a" stroke-width="1" opacity="0.5"/>
    <path d="M160 112 Q164 108 168 112" fill="none" stroke="#7a5a3a" stroke-width="0.8" opacity="0.4"/>
    <path d="M158 124 Q162 120 166 124" fill="none" stroke="#7a5a3a" stroke-width="0.8" opacity="0.4"/>
    <path d="M156 136 Q160 132 164 136" fill="none" stroke="#7a5a3a" stroke-width="0.7" opacity="0.35"/>
    <path d="M164 106 Q167 103 170 106" fill="none" stroke="#6a4a2a" stroke-width="0.6" opacity="0.3"/>
    <!-- Cape fur collar -->
    <path d="M56 76 Q70 72 80 76 Q90 80 100 76 Q110 72 120 76 Q130 80 144 76" fill="url(#sb9fur)" stroke="#7a5a3a" stroke-width="0.8"/>
    <!-- Fur collar detail -->
    <path d="M60 76 Q65 72 70 76" fill="none" stroke="#8a6a4a" stroke-width="0.6" opacity="0.4"/>
    <path d="M80 76 Q85 73 90 76" fill="none" stroke="#8a6a4a" stroke-width="0.6" opacity="0.4"/>
    <path d="M110 76 Q115 73 120 76" fill="none" stroke="#8a6a4a" stroke-width="0.6" opacity="0.4"/>
    <path d="M130 76 Q135 72 140 76" fill="none" stroke="#8a6a4a" stroke-width="0.6" opacity="0.4"/>
    <!-- SHIRTLESS massive torso -->
    <path d="M64 76 L136 76 L140 140 L60 140 Z" fill="url(#sb9skin)"/>
    <!-- Pec definition -->
    <path d="M78 82 Q88 92 100 82 Q112 92 122 82" fill="none" stroke="#d0a080" stroke-width="1.2"/>
    <!-- Pec highlight -->
    <path d="M82 84 Q90 80 96 84" fill="none" stroke="#f0c8a8" stroke-width="0.5" opacity="0.4"/>
    <path d="M104 84 Q110 80 118 84" fill="none" stroke="#f0c8a8" stroke-width="0.5" opacity="0.4"/>
    <!-- Center chest line -->
    <line x1="100" y1="84" x2="100" y2="134" stroke="#d0a080" stroke-width="0.8"/>
    <!-- Abs — 6 pack -->
    <path d="M84 96 Q100 100 116 96" fill="none" stroke="#d0a080" stroke-width="0.7"/>
    <path d="M85 106 Q100 110 115 106" fill="none" stroke="#d0a080" stroke-width="0.7"/>
    <path d="M86 116 Q100 120 114 116" fill="none" stroke="#d0a080" stroke-width="0.6"/>
    <!-- Oblique lines -->
    <path d="M68 90 Q72 100 70 110" fill="none" stroke="#d0a080" stroke-width="0.5" opacity="0.5"/>
    <path d="M132 90 Q128 100 130 110" fill="none" stroke="#d0a080" stroke-width="0.5" opacity="0.5"/>
    <!-- Body highlight (top) -->
    <path d="M70 78 Q100 74 130 78" fill="none" stroke="#f0c8a8" stroke-width="0.6" opacity="0.3"/>
    <!-- Body shadow (bottom) -->
    <path d="M64 135 Q100 140 136 135" fill="none" stroke="#c09070" stroke-width="0.8" opacity="0.3"/>
    <!-- MASSIVE flexing arms -->
    <ellipse cx="42" cy="86" rx="26" ry="20" fill="url(#sb9skin)" transform="rotate(-20 42 86)"/>
    <!-- Bicep highlight left -->
    <path d="M30 80 Q42 72 50 80" fill="none" stroke="#f0c8a8" stroke-width="0.6" opacity="0.4"/>
    <!-- Bicep shadow left -->
    <path d="M34 94 Q42 100 50 94" fill="none" stroke="#c09070" stroke-width="0.6" opacity="0.3"/>
    <ellipse cx="158" cy="86" rx="26" ry="20" fill="url(#sb9skin)" transform="rotate(20 158 86)"/>
    <!-- Bicep highlight right -->
    <path d="M150 80 Q158 72 170 80" fill="none" stroke="#f0c8a8" stroke-width="0.6" opacity="0.4"/>
    <!-- Bicep shadow right -->
    <path d="M150 94 Q158 100 166 94" fill="none" stroke="#c09070" stroke-width="0.6" opacity="0.3"/>
    <!-- Forearms up -->
    <rect x="26" y="60" width="18" height="32" rx="9" fill="url(#sb9skin)" transform="rotate(-20 35 76)"/>
    <rect x="156" y="60" width="18" height="32" rx="9" fill="url(#sb9skin)" transform="rotate(20 165 76)"/>
    <!-- Fists -->
    <circle cx="28" cy="54" r="10" fill="#e8b89a"/>
    <circle cx="172" cy="54" r="10" fill="#e8b89a"/>
    <!-- Knuckle lines -->
    <path d="M24 52 Q28 50 32 52" fill="none" stroke="#d0a080" stroke-width="0.5" opacity="0.4"/>
    <path d="M168 52 Q172 50 176 52" fill="none" stroke="#d0a080" stroke-width="0.5" opacity="0.4"/>
    <!-- Fur loincloth/skirt -->
    <path d="M66 138 L134 138 L130 170 L70 170 Z" fill="url(#sb9fur)"/>
    <!-- Fur edge detail -->
    <path d="M66 138 Q76 142 86 138 Q96 134 106 138 Q116 142 126 138 Q130 136 134 138" fill="#7a5a3a" stroke="#8a6a4a" stroke-width="0.5"/>
    <!-- Fur texture on loincloth -->
    <path d="M76 148 Q80 144 84 148" fill="none" stroke="#7a5a3a" stroke-width="0.6" opacity="0.4"/>
    <path d="M96 150 Q100 146 104 150" fill="none" stroke="#7a5a3a" stroke-width="0.6" opacity="0.4"/>
    <path d="M116 148 Q120 144 124 148" fill="none" stroke="#7a5a3a" stroke-width="0.6" opacity="0.4"/>
    <path d="M86 158 Q90 155 94 158" fill="none" stroke="#6a4a2a" stroke-width="0.5" opacity="0.3"/>
    <path d="M106 158 Q110 155 114 158" fill="none" stroke="#6a4a2a" stroke-width="0.5" opacity="0.3"/>
    <!-- Bare legs -->
    <rect x="74" y="164" width="20" height="18" rx="8" fill="url(#sb9skin)"/>
    <rect x="106" y="164" width="20" height="18" rx="8" fill="url(#sb9skin)"/>
    <!-- Bare feet in snow -->
    <ellipse cx="84" cy="182" rx="12" ry="4" fill="#e8b89a"/>
    <ellipse cx="116" cy="182" rx="12" ry="4" fill="#e8b89a"/>
    <!-- Snow around feet -->
    <ellipse cx="84" cy="184" rx="16" ry="3" fill="#ddeeff" opacity="0.3"/>
    <ellipse cx="116" cy="184" rx="16" ry="3" fill="#ddeeff" opacity="0.3"/>
    <text x="100" y="200" text-anchor="middle" fill="#00d4ff" font-size="12" font-family="system-ui" font-weight="800">GRIZZLY MODE</text>
  </svg>`],Op=[e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="kb0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a1a2e"/><stop offset="100%" stop-color="#2a0a18"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#1a0a14" stroke="#ff6b9d" stroke-width="2"/>
    ${Ep(100,46)}
    <!-- Crown -->
    <g transform="translate(100, 18)">
      <polygon points="-16,8 -12,-2 -6,4 0,-6 6,4 12,-2 16,8" fill="#ffd700"/>
      <rect x="-16" y="8" width="32" height="4" rx="1" fill="#ffaa00"/>
      <circle cx="-8" cy="0" r="2" fill="#ff4444"/>
      <circle cx="0" cy="-4" r="2" fill="#00ccff"/>
      <circle cx="8" cy="0" r="2" fill="#44ff44"/>
    </g>
    <!-- Slim torso -->
    <path d="M82 76 L118 76 L122 132 L78 132 Z" fill="url(#kb0)"/>
    <!-- Toned arms on hips -->
    <ellipse cx="62" cy="88" rx="13" ry="11" fill="#f0c9a8" transform="rotate(-15 62 88)"/>
    <ellipse cx="138" cy="88" rx="13" ry="11" fill="#f0c9a8" transform="rotate(15 138 88)"/>
    <!-- Power stance legs -->
    <polygon points="84,132 76,176 92,176" fill="url(#kb0)"/>
    <polygon points="116,132 124,176 108,176" fill="url(#kb0)"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">PRINCESS</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="kb1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a1a2e"/><stop offset="100%" stop-color="#2a0a18"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#1a0a14" stroke="#ff6b9d" stroke-width="2"/>
    ${Ep(100,46)}
    <!-- Armor torso -->
    <path d="M82 76 L118 76 L122 130 L78 130 Z" fill="url(#kb1)"/>
    <!-- Armor details -->
    <path d="M88 76 L100 88 L112 76" fill="none" stroke="#666" stroke-width="1"/>
    <ellipse cx="100" cy="100" rx="10" ry="7" fill="none" stroke="#666" stroke-width="0.8"/>
    <!-- Sword arm raised -->
    <path d="M118 84 L150 60 L152 68 L124 90 Z" fill="#f0c9a8"/>
    <!-- Sword -->
    <line x1="148" y1="58" x2="160" y2="26" stroke="#c0c0c0" stroke-width="3" stroke-linecap="round"/>
    <line x1="144" y1="60" x2="158" y2="56" stroke="#888" stroke-width="4" stroke-linecap="round"/>
    <!-- Shield arm -->
    <path d="M82 86 L60 92 L58 100 L78 96 Z" fill="#f0c9a8"/>
    <ellipse cx="50" cy="98" rx="14" ry="16" fill="#333" stroke="#666" stroke-width="1.5"/>
    <path d="M44 90 L50 84 L56 90" fill="none" stroke="#888" stroke-width="1"/>
    <!-- Legs -->
    <polygon points="84,130 78,174 92,174" fill="url(#kb1)"/>
    <polygon points="116,130 122,174 108,174" fill="url(#kb1)"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">WARRIOR</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="kb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a1a2e"/><stop offset="100%" stop-color="#2a0a18"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#1a0a14" stroke="#ff6b9d" stroke-width="2"/>
    ${Ep(100,46)}
    <!-- Sports top -->
    <path d="M82 76 L118 76 L122 130 L78 130 Z" fill="url(#kb2)"/>
    <!-- Toned arm - jab extended -->
    <path d="M118 84 L156 72 L158 80 L122 92 Z" fill="#f0c9a8"/>
    <!-- Boxing glove on jab -->
    <ellipse cx="162" cy="74" rx="12" ry="10" fill="#ff3333"/>
    <path d="M154 68 Q162 62 170 68" fill="#cc2222"/>
    <!-- Guard arm -->
    <path d="M82 84 L64 78 L62 88 L80 92 Z" fill="#f0c9a8"/>
    <ellipse cx="56" cy="80" rx="10" ry="9" fill="#ff3333"/>
    <!-- Legs in stance -->
    <rect x="82" y="130" width="14" height="40" rx="6" fill="url(#kb2)"/>
    <rect x="106" y="130" width="14" height="40" rx="6" fill="url(#kb2)" transform="rotate(5 113 150)"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">KNOCKOUT</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="kb3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a1a2e"/><stop offset="100%" stop-color="#2a0a18"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#1a0a14" stroke="#ff6b9d" stroke-width="2"/>
    <!-- Cape flowing -->
    <path d="M72 72 C46 90 34 150 48 180 L72 155 Z" fill="#cc2266" opacity="0.45"/>
    <path d="M128 72 C154 90 166 150 152 180 L128 155 Z" fill="#cc2266" opacity="0.45"/>
    ${Ep(100,46)}
    <!-- Superhero suit torso -->
    <path d="M82 76 L118 76 L122 130 L78 130 Z" fill="url(#kb3)"/>
    <!-- Chest emblem - star -->
    <polygon points="100,86 103,92 110,92 105,97 107,104 100,100 93,104 95,97 90,92 97,92" fill="#ffd700" opacity="0.8"/>
    <!-- Arms - flying pose -->
    <path d="M82 80 L52 68 L54 76 L80 86 Z" fill="#f0c9a8"/>
    <path d="M118 80 L148 68 L146 76 L120 86 Z" fill="#f0c9a8"/>
    <!-- Legs -->
    <polygon points="84,130 78,174 92,174" fill="url(#kb3)"/>
    <polygon points="116,130 122,174 108,174" fill="url(#kb3)"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">SUPER K</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="kb4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a3a2a"/><stop offset="100%" stop-color="#2a1a10"/></linearGradient></defs>
    <circle cx="100" cy="110" r="98" fill="#1a0a14" stroke="#ff6b9d" stroke-width="2"/>
    ${Ep(100,48)}
    <!-- Viking helmet over hair -->
    <path d="M76 36 Q76 16 100 14 Q124 16 124 36" fill="#888" opacity="0.8"/>
    <rect x="74" y="34" width="52" height="6" rx="2" fill="#999"/>
    <!-- Horns -->
    <path d="M76 36 Q64 18 58 8" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round"/>
    <path d="M124 36 Q136 18 142 8" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round"/>
    <!-- Fur-trimmed armor -->
    <path d="M78 78 L122 78 L128 132 L72 132 Z" fill="url(#kb4)"/>
    <!-- Fur trim at top -->
    <path d="M78 78 Q88 82 94 78 Q100 74 106 78 Q116 82 122 78" fill="#8a7a6a" stroke="#9a8a7a" stroke-width="1"/>
    <!-- Toned arms with bracers -->
    <ellipse cx="62" cy="92" rx="12" ry="10" fill="#f0c9a8"/>
    <rect x="50" y="86" width="8" height="12" rx="2" fill="#888"/>
    <ellipse cx="138" cy="92" rx="12" ry="10" fill="#f0c9a8"/>
    <rect x="142" y="86" width="8" height="12" rx="2" fill="#888"/>
    <!-- Legs -->
    <polygon points="84,132 78,176 92,176" fill="url(#kb4)"/>
    <polygon points="116,132 122,176 108,176" fill="url(#kb4)"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">VIKING PRINCESS</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kb5robe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a1a5a"/><stop offset="50%" stop-color="#2a1a4a"/><stop offset="100%" stop-color="#1a0a2a"/></linearGradient>
      <linearGradient id="kb5staff" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5a3a2a"/><stop offset="50%" stop-color="#4a2a1a"/><stop offset="100%" stop-color="#3a1a0a"/></linearGradient>
      <radialGradient id="kb5orb"><stop offset="0%" stop-color="#fff" stop-opacity="0.8"/><stop offset="30%" stop-color="#cc88ff" stop-opacity="0.7"/><stop offset="60%" stop-color="#8844cc" stop-opacity="0.5"/><stop offset="100%" stop-color="#4422aa" stop-opacity="0.3"/></radialGradient>
      <linearGradient id="kb5skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8d0b0"/><stop offset="100%" stop-color="#e0b090"/></linearGradient>
      <radialGradient id="kb5glow"><stop offset="0%" stop-color="#aa66ff" stop-opacity="0.2"/><stop offset="100%" stop-color="#aa66ff" stop-opacity="0"/></radialGradient>
      <linearGradient id="kb5fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8844cc" stop-opacity="0"/><stop offset="100%" stop-color="#6622aa" stop-opacity="0.15"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#0a0818" stroke="#ff6b9d" stroke-width="2"/>
    <!-- Crescent moon in background -->
    <circle cx="40" cy="28" r="12" fill="#eeeedd" opacity="0.15"/>
    <circle cx="44" cy="24" r="10" fill="#0a0818"/>
    <!-- Stars with twinkle effect (4-point stars) -->
    <polygon points="25,50 26,47 27,50 30,51 27,52 26,55 25,52 22,51" fill="#fff" opacity="0.4"/>
    <polygon points="170,25 171,22 172,25 175,26 172,27 171,30 170,27 167,26" fill="#fff" opacity="0.35"/>
    <polygon points="160,70 161,68 162,70 164,71 162,72 161,74 160,72 158,71" fill="#fff" opacity="0.3"/>
    <polygon points="30,85 31,83 32,85 34,86 32,87 31,89 30,87 28,86" fill="#fff" opacity="0.25"/>
    <circle cx="55" cy="20" r="0.8" fill="#fff" opacity="0.4"/>
    <circle cx="145" cy="40" r="0.7" fill="#fff" opacity="0.35"/>
    <circle cx="175" cy="55" r="0.6" fill="#fff" opacity="0.3"/>
    <circle cx="20" cy="70" r="0.8" fill="#fff" opacity="0.25"/>
    <!-- Purple energy glow -->
    <circle cx="100" cy="100" r="70" fill="url(#kb5glow)"/>
    <circle cx="100" cy="100" r="55" fill="none" stroke="#8844cc" stroke-width="0.8" opacity="0.12"/>
    <circle cx="100" cy="100" r="80" fill="none" stroke="#6622aa" stroke-width="0.5" opacity="0.08"/>
    <!-- Floating magical runes/symbols — 6 different symbols -->
    <text x="30" y="55" fill="#aa66ff" font-size="12" opacity="0.35" transform="rotate(-20 30 55)">&#9733;</text>
    <text x="170" y="45" fill="#cc88ff" font-size="10" opacity="0.3" transform="rotate(15 170 45)">&#10038;</text>
    <text x="22" y="120" fill="#bb77ff" font-size="9" opacity="0.25" transform="rotate(10 22 120)">&#9672;</text>
    <text x="175" y="130" fill="#aa66ff" font-size="10" opacity="0.25" transform="rotate(-10 175 130)">&#9674;</text>
    <text x="42" y="160" fill="#9955ee" font-size="8" opacity="0.2" transform="rotate(25 42 160)">&#10017;</text>
    <text x="165" y="95" fill="#bb77ff" font-size="9" opacity="0.2" transform="rotate(-30 165 95)">&#10070;</text>
    ${Ep(100,46)}
    <!-- Flowing dark robes — body -->
    <path d="M68 76 L132 76 L142 178 L58 178 Z" fill="url(#kb5robe)"/>
    <!-- Robe left panel -->
    <path d="M68 76 L100 76 L100 178 L58 178 Z" fill="#28184a"/>
    <!-- Robe right panel overlap -->
    <path d="M96 76 L132 76 L142 178 L86 178 Z" fill="url(#kb5robe)"/>
    <!-- Robe neckline V -->
    <path d="M86 76 L100 94 L114 76" fill="none" stroke="#6a3a8a" stroke-width="1.2"/>
    <!-- Center seam -->
    <line x1="100" y1="94" x2="100" y2="174" stroke="#4a2a6a" stroke-width="0.8" opacity="0.5"/>
    <!-- Gold trim at robe edges -->
    <line x1="68" y1="76" x2="58" y2="178" stroke="#c8a030" stroke-width="1" opacity="0.4"/>
    <line x1="132" y1="76" x2="142" y2="178" stroke="#c8a030" stroke-width="1" opacity="0.4"/>
    <!-- Robe fold lines -->
    <path d="M78 100 Q80 120 76 140" fill="none" stroke="#3a1a5a" stroke-width="0.6" opacity="0.4"/>
    <path d="M122 100 Q120 120 124 140" fill="none" stroke="#3a1a5a" stroke-width="0.6" opacity="0.4"/>
    <path d="M86 110 Q88 130 84 155" fill="none" stroke="#3a1a5a" stroke-width="0.5" opacity="0.3"/>
    <path d="M114 110 Q112 130 116 155" fill="none" stroke="#3a1a5a" stroke-width="0.5" opacity="0.3"/>
    <!-- Robe hem with glow -->
    <path d="M58 178 Q72 172 86 178 Q100 184 114 178 Q128 172 142 178" fill="none" stroke="#8844cc" stroke-width="1.5" opacity="0.4"/>
    <path d="M60 176 Q80 170 100 176 Q120 170 140 176" fill="none" stroke="#aa66ff" stroke-width="0.8" opacity="0.2"/>
    <!-- Gold trim at hem -->
    <path d="M58 178 Q80 172 100 178 Q120 172 142 178" fill="none" stroke="#c8a030" stroke-width="0.8" opacity="0.3"/>
    <!-- Sash/belt -->
    <path d="M74 118 L126 118 L124 124 L76 124 Z" fill="#5a2a8a" opacity="0.6"/>
    <path d="M74 118 Q100 114 126 118" fill="none" stroke="#c8a030" stroke-width="0.5" opacity="0.4"/>
    <!-- Slim arms -->
    <ellipse cx="56" cy="92" rx="13" ry="11" fill="url(#kb5skin)"/>
    <path d="M46 86 Q56 80 66 86" fill="none" stroke="#e0b090" stroke-width="0.5" opacity="0.4"/>
    <ellipse cx="144" cy="92" rx="13" ry="11" fill="url(#kb5skin)"/>
    <path d="M134 86 Q144 80 154 86" fill="none" stroke="#e0b090" stroke-width="0.5" opacity="0.4"/>
    <!-- Hands -->
    <ellipse cx="44" cy="104" rx="5" ry="4" fill="#f0c9a8"/>
    <ellipse cx="156" cy="104" rx="5" ry="4" fill="#f0c9a8"/>
    <!-- Glowing staff — gnarled wood shaft -->
    <path d="M152 38 Q150 60 154 80 Q156 100 152 120 Q150 140 156 170" fill="none" stroke="url(#kb5staff)" stroke-width="5" stroke-linecap="round"/>
    <!-- Staff wood texture/knots -->
    <path d="M150 60 Q154 58 152 62" fill="none" stroke="#6a4a3a" stroke-width="0.8" opacity="0.5"/>
    <path d="M156 90 Q152 88 154 94" fill="none" stroke="#6a4a3a" stroke-width="0.8" opacity="0.5"/>
    <path d="M150 120 Q154 118 152 124" fill="none" stroke="#6a4a3a" stroke-width="0.7" opacity="0.4"/>
    <path d="M154 150 Q150 148 152 154" fill="none" stroke="#6a4a3a" stroke-width="0.7" opacity="0.4"/>
    <!-- Crystal orb on staff -->
    <circle cx="150" cy="34" r="14" fill="url(#kb5orb)"/>
    <!-- Inner glow rings -->
    <circle cx="150" cy="34" r="10" fill="none" stroke="#cc88ff" stroke-width="0.8" opacity="0.5"/>
    <circle cx="150" cy="34" r="6" fill="none" stroke="#ddaaff" stroke-width="0.5" opacity="0.4"/>
    <circle cx="150" cy="34" r="3" fill="#fff" opacity="0.5"/>
    <!-- Orb sparkle -->
    <polygon points="150,22 151,19 152,22 155,23 152,24 151,27 150,24 147,23" fill="#fff" opacity="0.3"/>
    <!-- Purple energy spirals around staff -->
    <path d="M140 50 Q160 55 145 65 Q130 70 150 80" fill="none" stroke="#8844cc" stroke-width="1" opacity="0.25"/>
    <path d="M160 70 Q140 75 155 85 Q170 90 150 100" fill="none" stroke="#aa66ff" stroke-width="0.8" opacity="0.2"/>
    <path d="M145 100 Q165 105 150 115 Q135 120 155 130" fill="none" stroke="#8844cc" stroke-width="0.7" opacity="0.15"/>
    <!-- Floating spell book nearby -->
    <g transform="translate(26, 130) rotate(-8)">
      <rect width="24" height="18" rx="2" fill="#3a1a0a" stroke="#5a3a2a" stroke-width="1"/>
      <!-- Open book pages -->
      <rect x="2" y="2" width="9" height="14" rx="1" fill="#f0e8d8"/>
      <rect x="13" y="2" width="9" height="14" rx="1" fill="#f0e8d8"/>
      <!-- Page text/glowing lines -->
      <line x1="4" y1="5" x2="10" y2="5" stroke="#aa66ff" stroke-width="0.5" opacity="0.6"/>
      <line x1="4" y1="8" x2="9" y2="8" stroke="#aa66ff" stroke-width="0.5" opacity="0.5"/>
      <line x1="4" y1="11" x2="10" y2="11" stroke="#aa66ff" stroke-width="0.5" opacity="0.4"/>
      <line x1="15" y1="5" x2="20" y2="5" stroke="#aa66ff" stroke-width="0.5" opacity="0.5"/>
      <line x1="15" y1="8" x2="21" y2="8" stroke="#aa66ff" stroke-width="0.5" opacity="0.4"/>
      <line x1="15" y1="11" x2="19" y2="11" stroke="#aa66ff" stroke-width="0.5" opacity="0.35"/>
      <!-- Book glow -->
      <rect width="24" height="18" rx="2" fill="#8844cc" opacity="0.08"/>
    </g>
    <!-- Mystical fog at feet -->
    <ellipse cx="100" cy="178" rx="60" ry="10" fill="url(#kb5fog)"/>
    <ellipse cx="70" cy="180" rx="30" ry="6" fill="#6622aa" opacity="0.06"/>
    <ellipse cx="130" cy="179" rx="35" ry="7" fill="#8844cc" opacity="0.05"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">SORCERESS</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kb6suit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#dd2222"/><stop offset="50%" stop-color="#cc1111"/><stop offset="100%" stop-color="#991111"/></linearGradient>
      <linearGradient id="kb6helmet" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ee3333"/><stop offset="50%" stop-color="#cc2222"/><stop offset="100%" stop-color="#991111"/></linearGradient>
      <linearGradient id="kb6skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8d0b0"/><stop offset="100%" stop-color="#e0b090"/></linearGradient>
      <linearGradient id="kb6car" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#cc2222"/><stop offset="100%" stop-color="#881111"/></linearGradient>
      <linearGradient id="kb6ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#333"/><stop offset="100%" stop-color="#222"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#1a0a14" stroke="#ff6b9d" stroke-width="2"/>
    <!-- Race car silhouette behind -->
    <path d="M20 158 Q30 148 50 146 L60 138 L140 138 L150 146 Q170 148 180 158 L180 168 L20 168 Z" fill="#222" opacity="0.35"/>
    <path d="M50 146 L60 138 L140 138 L150 146" fill="none" stroke="#333" stroke-width="0.5" opacity="0.3"/>
    <!-- Car body detail -->
    <path d="M35 158 L50 146 L150 146 L165 158" fill="url(#kb6car)" opacity="0.2"/>
    <!-- Spoiler -->
    <rect x="140" y="134" width="20" height="3" rx="1" fill="#333" opacity="0.3"/>
    <!-- Wheels -->
    <circle cx="50" cy="165" r="8" fill="#111" opacity="0.3"/>
    <circle cx="50" cy="165" r="5" fill="#222" opacity="0.25"/>
    <circle cx="150" cy="165" r="8" fill="#111" opacity="0.3"/>
    <circle cx="150" cy="165" r="5" fill="#222" opacity="0.25"/>
    <!-- Tire marks/skid marks on ground -->
    <path d="M30 175 Q60 172 90 175 Q120 178 150 175" fill="none" stroke="#333" stroke-width="2" opacity="0.3" stroke-dasharray="8 4"/>
    <path d="M40 180 Q70 177 100 180 Q130 183 160 180" fill="none" stroke="#333" stroke-width="1.5" opacity="0.2" stroke-dasharray="6 3"/>
    <!-- Pit equipment — gas can -->
    <rect x="170" y="108" width="10" height="14" rx="2" fill="#cc4444" opacity="0.3"/>
    <rect x="172" y="104" width="6" height="6" rx="1" fill="#aa3333" opacity="0.3"/>
    <!-- Pit equipment — tire -->
    <circle cx="178" cy="135" r="8" fill="#111" opacity="0.3"/>
    <circle cx="178" cy="135" r="5" fill="#222" opacity="0.25"/>
    <circle cx="178" cy="135" r="2" fill="#333" opacity="0.2"/>
    ${Ep(100,48)}
    <!-- Racing suit body -->
    <path d="M76 78 L124 78 L128 148 L72 148 Z" fill="url(#kb6suit)"/>
    <!-- Racing suit shading -->
    <path d="M76 78 L100 78 L100 148 L72 148 Z" fill="#bb1111" opacity="0.3"/>
    <!-- White racing stripes -->
    <line x1="76" y1="88" x2="128" y2="88" stroke="#fff" stroke-width="3" opacity="0.3"/>
    <line x1="76" y1="92" x2="128" y2="92" stroke="#fff" stroke-width="1.5" opacity="0.2"/>
    <!-- Black accent stripe -->
    <line x1="76" y1="95" x2="128" y2="95" stroke="#111" stroke-width="1" opacity="0.3"/>
    <!-- Number 1 on suit -->
    <circle cx="100" cy="108" r="10" fill="#fff" opacity="0.15"/>
    <text x="100" y="113" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold" opacity="0.3">1</text>
    <!-- Sponsor patches with tiny text -->
    <rect x="76" y="120" width="20" height="10" rx="2" fill="#fff" opacity="0.15"/>
    <text x="86" y="127" text-anchor="middle" fill="#fff" font-size="3" opacity="0.25">SPEED</text>
    <rect x="104" y="120" width="20" height="10" rx="2" fill="#ffd700" opacity="0.15"/>
    <text x="114" y="127" text-anchor="middle" fill="#ffd700" font-size="3" opacity="0.25">TURBO</text>
    <rect x="78" y="132" width="16" height="8" rx="1" fill="#00aaff" opacity="0.12"/>
    <text x="86" y="138" text-anchor="middle" fill="#00aaff" font-size="2.5" opacity="0.2">FUEL</text>
    <rect x="106" y="132" width="16" height="8" rx="1" fill="#44ff44" opacity="0.12"/>
    <text x="114" y="138" text-anchor="middle" fill="#44ff44" font-size="2.5" opacity="0.2">GRIP</text>
    <!-- Suit collar -->
    <path d="M86 78 Q93 74 98 78" fill="none" stroke="#aa1111" stroke-width="1.5"/>
    <path d="M102 78 Q107 74 114 78" fill="none" stroke="#aa1111" stroke-width="1.5"/>
    <!-- Toned arms -->
    <ellipse cx="60" cy="94" rx="14" ry="11" fill="url(#kb6skin)"/>
    <path d="M50 88 Q60 82 70 88" fill="none" stroke="#e0b090" stroke-width="0.5" opacity="0.4"/>
    <ellipse cx="140" cy="94" rx="14" ry="11" fill="url(#kb6skin)"/>
    <path d="M130 88 Q140 82 150 88" fill="none" stroke="#e0b090" stroke-width="0.5" opacity="0.4"/>
    <!-- Gloves tucked in belt area -->
    <path d="M126 146 L132 148 L130 154 L124 152 Z" fill="#111" opacity="0.4"/>
    <path d="M128 146 L130 148" fill="none" stroke="#333" stroke-width="0.5" opacity="0.3"/>
    <!-- Helmet under left arm with visor detail -->
    <ellipse cx="36" cy="112" rx="16" ry="14" fill="url(#kb6helmet)"/>
    <!-- Helmet highlight -->
    <path d="M24 106 Q36 100 48 106" fill="none" stroke="#ff4444" stroke-width="0.5" opacity="0.4"/>
    <!-- Visor -->
    <path d="M24 110 Q36 106 48 110" fill="#111" opacity="0.6"/>
    <path d="M26 112 Q36 108 46 112" fill="#1a1a4a" opacity="0.4"/>
    <!-- Visor reflection -->
    <path d="M30 110 Q34 108 38 110" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.2"/>
    <!-- Ventilation slots on helmet -->
    <line x1="30" y1="104" x2="34" y2="104" stroke="#aa1111" stroke-width="0.5" opacity="0.4"/>
    <line x1="36" y1="104" x2="40" y2="104" stroke="#aa1111" stroke-width="0.5" opacity="0.4"/>
    <!-- Helmet stripe -->
    <path d="M36 98 L36 120" fill="none" stroke="#ffd700" stroke-width="1.5" opacity="0.3"/>
    <!-- Checkered flag waving in right hand -->
    <line x1="162" y1="58" x2="162" y2="112" stroke="#555" stroke-width="2.5"/>
    <!-- Flag with wave/flutter — 4 rows x 5 cols of proper checkers -->
    <g transform="translate(140, 50)">
      <path d="M0 0 Q5 -2 10 0 Q15 2 20 0 Q25 -2 30 0 L30 7 Q25 5 20 7 Q15 9 10 7 Q5 5 0 7 Z" fill="#fff"/>
      <path d="M5 0 Q7.5 -1 10 0 L10 7 Q7.5 6 5 7 Z" fill="#222"/>
      <path d="M15 0 Q17.5 1 20 0 L20 7 Q17.5 8 15 7 Z" fill="#222"/>
      <path d="M25 0 Q27.5 -1 30 0 L30 7 Q27.5 6 25 7 Z" fill="#222"/>
      <path d="M0 7 Q5 5 10 7 Q15 9 20 7 Q25 5 30 7 L30 14 Q25 12 20 14 Q15 16 10 14 Q5 12 0 14 Z" fill="#fff"/>
      <path d="M0 7 Q2.5 6 5 7 L5 14 Q2.5 13 0 14 Z" fill="#222"/>
      <path d="M10 7 Q12.5 8 15 7 L15 14 Q12.5 15 10 14 Z" fill="#222"/>
      <path d="M20 7 Q22.5 6 25 7 L25 14 Q22.5 13 20 14 Z" fill="#222"/>
    </g>
    <!-- Legs in racing suit -->
    <rect x="78" y="144" width="16" height="30" rx="6" fill="url(#kb6suit)"/>
    <rect x="106" y="144" width="16" height="30" rx="6" fill="url(#kb6suit)"/>
    <!-- Leg stripes -->
    <line x1="78" y1="154" x2="94" y2="154" stroke="#fff" stroke-width="1" opacity="0.2"/>
    <line x1="106" y1="154" x2="122" y2="154" stroke="#fff" stroke-width="1" opacity="0.2"/>
    <!-- Racing boots -->
    <rect x="76" y="170" width="20" height="8" rx="3" fill="#111"/>
    <rect x="104" y="170" width="20" height="8" rx="3" fill="#111"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="11" font-family="system-ui" font-weight="800">KARI ANDRETTI</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kb7armor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a3a2a"/><stop offset="50%" stop-color="#3a2a2a"/><stop offset="100%" stop-color="#1a1010"/></linearGradient>
      <linearGradient id="kb7blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#e0e0e8"/><stop offset="40%" stop-color="#c0c0d0"/><stop offset="80%" stop-color="#d8d8e0"/><stop offset="100%" stop-color="#a0a0b0"/></linearGradient>
      <linearGradient id="kb7skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8d0b0"/><stop offset="100%" stop-color="#e0b090"/></linearGradient>
      <linearGradient id="kb7plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#555"/><stop offset="50%" stop-color="#3a3a3a"/><stop offset="100%" stop-color="#444"/></linearGradient>
      <linearGradient id="kb7hakama" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a1a2a"/><stop offset="100%" stop-color="#1a0a1a"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#1a0a14" stroke="#ff6b9d" stroke-width="2"/>
    <!-- Cherry blossom tree in background -->
    <!-- Trunk -->
    <path d="M162 180 Q160 140 155 120 Q150 100 158 80" fill="none" stroke="#5a3a2a" stroke-width="4" stroke-linecap="round"/>
    <!-- Branches -->
    <path d="M158 80 Q170 65 178 58" fill="none" stroke="#5a3a2a" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M155 90 Q140 75 134 68" fill="none" stroke="#5a3a2a" stroke-width="2" stroke-linecap="round"/>
    <path d="M160 100 Q175 90 182 85" fill="none" stroke="#5a3a2a" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M156 110 Q145 100 138 95" fill="none" stroke="#4a2a1a" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Cherry blossoms on branches (clusters of 10+) -->
    <circle cx="178" cy="55" r="3" fill="#ffaacc" opacity="0.5"/>
    <circle cx="175" cy="52" r="2.5" fill="#ffbbdd" opacity="0.45"/>
    <circle cx="181" cy="58" r="2" fill="#ffccdd" opacity="0.4"/>
    <circle cx="174" cy="58" r="2.5" fill="#ffaacc" opacity="0.45"/>
    <circle cx="134" cy="65" r="2.5" fill="#ffaacc" opacity="0.45"/>
    <circle cx="130" cy="68" r="2" fill="#ffbbdd" opacity="0.4"/>
    <circle cx="138" cy="62" r="2" fill="#ffccdd" opacity="0.35"/>
    <circle cx="182" cy="82" r="2.5" fill="#ffaacc" opacity="0.4"/>
    <circle cx="185" cy="85" r="2" fill="#ffbbdd" opacity="0.35"/>
    <circle cx="180" cy="88" r="2" fill="#ffccdd" opacity="0.3"/>
    <circle cx="138" cy="92" r="2" fill="#ffaacc" opacity="0.35"/>
    <circle cx="142" cy="95" r="2.5" fill="#ffbbdd" opacity="0.3"/>
    <!-- Falling petals (10 at various sizes/opacities) -->
    <ellipse cx="30" cy="35" rx="2.5" ry="1.5" fill="#ffaacc" opacity="0.45" transform="rotate(-30 30 35)"/>
    <ellipse cx="50" cy="55" rx="2" ry="1.2" fill="#ffbbdd" opacity="0.4" transform="rotate(20 50 55)"/>
    <ellipse cx="25" cy="80" rx="1.8" ry="1" fill="#ffaacc" opacity="0.35" transform="rotate(-15 25 80)"/>
    <ellipse cx="45" cy="110" rx="2.2" ry="1.3" fill="#ffccdd" opacity="0.3" transform="rotate(40 45 110)"/>
    <ellipse cx="170" cy="115" rx="2" ry="1.2" fill="#ffaacc" opacity="0.3" transform="rotate(-25 170 115)"/>
    <ellipse cx="35" cy="140" rx="1.8" ry="1" fill="#ffbbdd" opacity="0.25" transform="rotate(15 35 140)"/>
    <ellipse cx="160" cy="145" rx="2" ry="1.2" fill="#ffccdd" opacity="0.25" transform="rotate(-35 160 145)"/>
    <ellipse cx="25" cy="160" rx="1.5" ry="0.8" fill="#ffaacc" opacity="0.2" transform="rotate(25 25 160)"/>
    <ellipse cx="60" cy="75" rx="2" ry="1.2" fill="#ffbbdd" opacity="0.35" transform="rotate(-10 60 75)"/>
    <ellipse cx="40" cy="165" rx="1.5" ry="0.8" fill="#ffaacc" opacity="0.15" transform="rotate(30 40 165)"/>
    <!-- Temple/pagoda silhouette with tiered roofs -->
    <rect x="14" y="100" width="30" height="45" rx="1" fill="#1a1020" opacity="0.35"/>
    <path d="M8 100 L29 86 L50 100" fill="#1a1020" opacity="0.3"/>
    <path d="M12 100 L29 90 L46 100" fill="#1a1020" opacity="0.25"/>
    <path d="M10 88 L29 78 L48 88" fill="#1a1020" opacity="0.2"/>
    <!-- Pagoda roof curves -->
    <path d="M6 100 Q10 98 14 100" fill="none" stroke="#2a1a2a" stroke-width="0.5" opacity="0.2"/>
    <path d="M44 100 Q48 98 50 100" fill="none" stroke="#2a1a2a" stroke-width="0.5" opacity="0.2"/>
    <!-- Stone lantern -->
    <rect x="18" y="150" width="8" height="16" rx="1" fill="#4a4a4a" opacity="0.25"/>
    <path d="M16 150 L22 144 L28 150" fill="#4a4a4a" opacity="0.2"/>
    <rect x="20" y="154" width="4" height="4" rx="1" fill="#ffaa44" opacity="0.15"/>
    ${Ep(100,48)}
    <!-- Samurai armor do (chest piece) -->
    <path d="M72 78 L128 78 L130 132 L70 132 Z" fill="url(#kb7armor)"/>
    <!-- Armor plate layers with lacing -->
    <rect x="74" y="82" width="52" height="10" rx="2" fill="url(#kb7plate)"/>
    <line x1="70" y1="86" x2="72" y2="88" stroke="#cc3333" stroke-width="0.8" opacity="0.6"/>
    <line x1="80" y1="86" x2="82" y2="88" stroke="#cc3333" stroke-width="0.8" opacity="0.6"/>
    <line x1="90" y1="86" x2="92" y2="88" stroke="#cc3333" stroke-width="0.8" opacity="0.6"/>
    <line x1="110" y1="86" x2="112" y2="88" stroke="#cc3333" stroke-width="0.8" opacity="0.6"/>
    <line x1="120" y1="86" x2="122" y2="88" stroke="#cc3333" stroke-width="0.8" opacity="0.6"/>
    <line x1="130" y1="86" x2="132" y2="88" stroke="#cc3333" stroke-width="0.8" opacity="0.6"/>
    <rect x="74" y="94" width="52" height="10" rx="2" fill="url(#kb7plate)" opacity="0.9"/>
    <line x1="70" y1="98" x2="72" y2="100" stroke="#cc3333" stroke-width="0.8" opacity="0.5"/>
    <line x1="80" y1="98" x2="82" y2="100" stroke="#cc3333" stroke-width="0.8" opacity="0.5"/>
    <line x1="90" y1="98" x2="92" y2="100" stroke="#cc3333" stroke-width="0.8" opacity="0.5"/>
    <line x1="110" y1="98" x2="112" y2="100" stroke="#cc3333" stroke-width="0.8" opacity="0.5"/>
    <line x1="120" y1="98" x2="122" y2="100" stroke="#cc3333" stroke-width="0.8" opacity="0.5"/>
    <line x1="130" y1="98" x2="132" y2="100" stroke="#cc3333" stroke-width="0.8" opacity="0.5"/>
    <rect x="74" y="106" width="52" height="10" rx="2" fill="url(#kb7plate)" opacity="0.8"/>
    <rect x="74" y="118" width="52" height="10" rx="2" fill="url(#kb7plate)" opacity="0.7"/>
    <!-- Shoulder guards (sode) with lacing detail -->
    <rect x="48" y="76" width="22" height="16" rx="3" fill="url(#kb7plate)" stroke="#555" stroke-width="0.5"/>
    <line x1="42" y1="80" x2="42" y2="88" stroke="#cc3333" stroke-width="0.6" opacity="0.5"/>
    <line x1="48" y1="80" x2="48" y2="88" stroke="#cc3333" stroke-width="0.6" opacity="0.5"/>
    <line x1="54" y1="80" x2="54" y2="88" stroke="#cc3333" stroke-width="0.6" opacity="0.5"/>
    <rect x="130" y="76" width="22" height="16" rx="3" fill="url(#kb7plate)" stroke="#555" stroke-width="0.5"/>
    <line x1="142" y1="80" x2="142" y2="88" stroke="#cc3333" stroke-width="0.6" opacity="0.5"/>
    <line x1="148" y1="80" x2="148" y2="88" stroke="#cc3333" stroke-width="0.6" opacity="0.5"/>
    <line x1="154" y1="80" x2="154" y2="88" stroke="#cc3333" stroke-width="0.6" opacity="0.5"/>
    <!-- Arm guards (kote) -->
    <rect x="46" y="96" width="8" height="14" rx="2" fill="#444" stroke="#555" stroke-width="0.5"/>
    <rect x="146" y="96" width="8" height="14" rx="2" fill="#444" stroke="#555" stroke-width="0.5"/>
    <!-- Toned arms -->
    <ellipse cx="58" cy="102" rx="11" ry="10" fill="url(#kb7skin)"/>
    <path d="M50 96 Q58 90 66 96" fill="none" stroke="#e0b090" stroke-width="0.5" opacity="0.4"/>
    <ellipse cx="142" cy="102" rx="11" ry="10" fill="url(#kb7skin)"/>
    <path d="M134 96 Q142 90 150 96" fill="none" stroke="#e0b090" stroke-width="0.5" opacity="0.4"/>
    <!-- Hands -->
    <ellipse cx="46" cy="114" rx="5" ry="4" fill="#f0c9a8"/>
    <ellipse cx="154" cy="114" rx="5" ry="4" fill="#f0c9a8"/>
    <!-- Katana — polished blade with edge highlight -->
    <line x1="142" y1="46" x2="38" y2="142" stroke="url(#kb7blade)" stroke-width="3" stroke-linecap="round"/>
    <!-- Blade edge highlight -->
    <line x1="143" y1="48" x2="40" y2="140" stroke="#fff" stroke-width="0.5" opacity="0.3"/>
    <!-- Blade hamon line (temper pattern) -->
    <path d="M138 52 Q132 60 126 65 Q120 70 114 76 Q108 82 102 88 Q96 94 90 100 Q84 106 78 112 Q72 118 66 124 Q60 130 54 136" fill="none" stroke="#ddd" stroke-width="0.5" opacity="0.2" stroke-dasharray="3 2"/>
    <!-- Tsuba (circular guard) -->
    <circle cx="140" cy="50" r="5" fill="#555" stroke="#666" stroke-width="1"/>
    <circle cx="140" cy="50" r="3" fill="#444"/>
    <!-- Handle wrap (tsuka) with diamond pattern -->
    <rect x="140" y="44" width="22" height="6" rx="2" fill="#2a1a0a" transform="rotate(-42 151 47)"/>
    <!-- Ray-skin diamond pattern on handle -->
    <circle cx="148" cy="44" r="0.8" fill="#f0e8d0" opacity="0.4" transform="rotate(-42 151 47)"/>
    <circle cx="152" cy="42" r="0.8" fill="#f0e8d0" opacity="0.4" transform="rotate(-42 151 47)"/>
    <circle cx="156" cy="40" r="0.8" fill="#f0e8d0" opacity="0.35" transform="rotate(-42 151 47)"/>
    <!-- Hakama pants with pleats -->
    <path d="M72 132 L128 132 L132 178 L68 178 Z" fill="url(#kb7hakama)"/>
    <!-- Pleat lines -->
    <line x1="80" y1="132" x2="78" y2="178" stroke="#2a1a2a" stroke-width="0.8" opacity="0.4"/>
    <line x1="90" y1="132" x2="88" y2="178" stroke="#2a1a2a" stroke-width="0.8" opacity="0.4"/>
    <line x1="100" y1="132" x2="100" y2="178" stroke="#2a1a2a" stroke-width="0.8" opacity="0.4"/>
    <line x1="110" y1="132" x2="112" y2="178" stroke="#2a1a2a" stroke-width="0.8" opacity="0.4"/>
    <line x1="120" y1="132" x2="122" y2="178" stroke="#2a1a2a" stroke-width="0.8" opacity="0.4"/>
    <!-- Hakama tie -->
    <rect x="76" y="130" width="48" height="4" rx="1" fill="#3a2a2a" stroke="#4a3a3a" stroke-width="0.5"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">SAMURAI K</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kb8suit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eee"/><stop offset="30%" stop-color="#ddd"/><stop offset="70%" stop-color="#ccc"/><stop offset="100%" stop-color="#aaa"/></linearGradient>
      <linearGradient id="kb8earth" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2266bb"/><stop offset="50%" stop-color="#1a5599"/><stop offset="100%" stop-color="#224488"/></linearGradient>
      <radialGradient id="kb8atmo"><stop offset="70%" stop-color="#2266bb" stop-opacity="0"/><stop offset="90%" stop-color="#4488dd" stop-opacity="0.3"/><stop offset="100%" stop-color="#66aaff" stop-opacity="0.15"/></radialGradient>
      <linearGradient id="kb8nebula" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#220044" stop-opacity="0.3"/><stop offset="50%" stop-color="#440066" stop-opacity="0.15"/><stop offset="100%" stop-color="#220044" stop-opacity="0.05"/></linearGradient>
      <linearGradient id="kb8panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#999"/><stop offset="100%" stop-color="#666"/></linearGradient>
      <linearGradient id="kb8glove" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ccc"/><stop offset="100%" stop-color="#999"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#050510" stroke="#ff6b9d" stroke-width="2"/>
    <!-- Nebula/galaxy colors in deep background -->
    <ellipse cx="40" cy="60" rx="40" ry="30" fill="url(#kb8nebula)"/>
    <ellipse cx="160" cy="140" rx="35" ry="25" fill="url(#kb8nebula)" transform="rotate(30 160 140)"/>
    <!-- Star field (25+ stars) -->
    <circle cx="18" cy="18" r="1" fill="#fff" opacity="0.7"/>
    <circle cx="45" cy="12" r="0.8" fill="#fff" opacity="0.5"/>
    <circle cx="75" cy="20" r="1.2" fill="#fff" opacity="0.6"/>
    <circle cx="110" cy="15" r="0.8" fill="#fff" opacity="0.45"/>
    <circle cx="140" cy="22" r="1" fill="#fff" opacity="0.55"/>
    <circle cx="170" cy="14" r="0.7" fill="#fff" opacity="0.4"/>
    <circle cx="185" cy="30" r="1" fill="#fff" opacity="0.5"/>
    <circle cx="25" cy="45" r="0.8" fill="#fff" opacity="0.45"/>
    <circle cx="60" cy="40" r="0.7" fill="#fff" opacity="0.35"/>
    <circle cx="175" cy="50" r="1" fill="#fff" opacity="0.5"/>
    <circle cx="15" cy="75" r="0.9" fill="#fff" opacity="0.4"/>
    <circle cx="185" cy="75" r="0.8" fill="#fff" opacity="0.35"/>
    <circle cx="30" cy="100" r="1" fill="#fff" opacity="0.35"/>
    <circle cx="175" cy="95" r="0.7" fill="#fff" opacity="0.3"/>
    <circle cx="20" cy="130" r="0.8" fill="#fff" opacity="0.3"/>
    <circle cx="180" cy="125" r="1" fill="#fff" opacity="0.35"/>
    <circle cx="15" cy="155" r="0.7" fill="#fff" opacity="0.25"/>
    <circle cx="185" cy="150" r="0.8" fill="#fff" opacity="0.3"/>
    <circle cx="35" cy="170" r="0.6" fill="#fff" opacity="0.2"/>
    <circle cx="165" cy="170" r="0.7" fill="#fff" opacity="0.25"/>
    <circle cx="55" cy="28" r="0.6" fill="#aaccff" opacity="0.35"/>
    <circle cx="130" cy="8" r="0.8" fill="#ffddaa" opacity="0.4"/>
    <circle cx="95" cy="5" r="0.7" fill="#fff" opacity="0.45"/>
    <circle cx="160" cy="60" r="0.6" fill="#aaddff" opacity="0.3"/>
    <circle cx="40" cy="85" r="0.7" fill="#fff" opacity="0.3"/>
    <!-- Earth through porthole -->
    <circle cx="160" cy="42" r="24" fill="none" stroke="#555" stroke-width="3.5"/>
    <circle cx="160" cy="42" r="23" fill="none" stroke="#444" stroke-width="1"/>
    <!-- Porthole bolts -->
    <circle cx="140" cy="42" r="1.5" fill="#555"/>
    <circle cx="180" cy="42" r="1.5" fill="#555"/>
    <circle cx="160" cy="22" r="1.5" fill="#555"/>
    <circle cx="160" cy="62" r="1.5" fill="#555"/>
    <!-- Earth -->
    <circle cx="160" cy="42" r="20" fill="url(#kb8earth)"/>
    <!-- Continents -->
    <path d="M148 36 Q152 32 158 35 Q162 38 160 42 Q156 40 150 42 Q146 40 148 36" fill="#2a8a2a" opacity="0.5"/>
    <path d="M164 34 Q170 32 174 36 Q172 40 168 42 Q164 38 164 34" fill="#2a8a2a" opacity="0.45"/>
    <path d="M155 48 Q162 46 166 50 Q164 54 158 52 Q154 50 155 48" fill="#2a8a2a" opacity="0.4"/>
    <!-- Cloud swirls -->
    <path d="M146 38 Q150 36 154 38" fill="none" stroke="#fff" stroke-width="0.8" opacity="0.3"/>
    <path d="M162 44 Q166 42 170 44" fill="none" stroke="#fff" stroke-width="0.6" opacity="0.25"/>
    <path d="M152 50 Q156 48 160 50" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.2"/>
    <!-- Atmosphere glow -->
    <circle cx="160" cy="42" r="21" fill="url(#kb8atmo)"/>
    ${Ep(100,48)}
    <!-- Hair floating in zero-g (multiple wavy strands) -->
    <path d="M78 34 Q65 18 55 28" fill="none" stroke="#2a1810" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
    <path d="M82 30 Q72 12 62 20" fill="none" stroke="#2a1810" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
    <path d="M86 28 Q80 14 70 16" fill="none" stroke="#2a1810" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
    <path d="M122 34 Q135 18 145 28" fill="none" stroke="#2a1810" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
    <path d="M118 30 Q128 12 138 20" fill="none" stroke="#2a1810" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
    <path d="M114 28 Q120 14 130 16" fill="none" stroke="#2a1810" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
    <!-- Space suit body -->
    <path d="M70 78 L130 78 L134 158 L66 158 Z" fill="url(#kb8suit)"/>
    <!-- Suit panel lines -->
    <line x1="70" y1="78" x2="66" y2="158" stroke="#bbb" stroke-width="0.5" opacity="0.5"/>
    <line x1="130" y1="78" x2="134" y2="158" stroke="#bbb" stroke-width="0.5" opacity="0.5"/>
    <line x1="86" y1="78" x2="84" y2="158" stroke="#bbb" stroke-width="0.3" opacity="0.3"/>
    <line x1="114" y1="78" x2="116" y2="158" stroke="#bbb" stroke-width="0.3" opacity="0.3"/>
    <!-- Suit collar ring -->
    <path d="M80 78 Q100 72 120 78" fill="none" stroke="#999" stroke-width="2"/>
    <!-- Control panel on chest -->
    <rect x="78" y="84" width="44" height="22" rx="3" fill="url(#kb8panel)" stroke="#777" stroke-width="0.8"/>
    <!-- Panel screen -->
    <rect x="82" y="87" width="20" height="8" rx="1" fill="#1a2a1a"/>
    <text x="92" y="93" text-anchor="middle" fill="#44ff44" font-size="4" font-family="monospace" opacity="0.7">O2 98%</text>
    <!-- Panel buttons -->
    <circle cx="88" cy="100" r="2.5" fill="#44ff44" opacity="0.6"/>
    <circle cx="96" cy="100" r="2.5" fill="#ff4444" opacity="0.6"/>
    <circle cx="104" cy="100" r="2.5" fill="#4488ff" opacity="0.6"/>
    <!-- Panel toggle switches -->
    <rect x="110" y="88" width="3" height="6" rx="1" fill="#666"/>
    <rect x="110" y="88" width="3" height="3" rx="1" fill="#888"/>
    <rect x="116" y="88" width="3" height="6" rx="1" fill="#666"/>
    <rect x="116" y="91" width="3" height="3" rx="1" fill="#888"/>
    <!-- NASA-style mission patch on left chest -->
    <circle cx="72" cy="94" r="8" fill="#1a2a5a" stroke="#888" stroke-width="0.8"/>
    <path d="M68 94 Q72 88 76 94" fill="none" stroke="#ff6b9d" stroke-width="1" opacity="0.5"/>
    <circle cx="72" cy="96" r="1" fill="#fff" opacity="0.4"/>
    <!-- Flag patch on right arm -->
    <rect x="136" y="86" width="12" height="8" rx="1" fill="#cc2222" opacity="0.4"/>
    <rect x="136" y="86" width="12" height="3" rx="1" fill="#fff" opacity="0.2"/>
    <!-- Life support backpack outline -->
    <rect x="68" y="80" width="8" height="30" rx="2" fill="#bbb" opacity="0.3"/>
    <rect x="124" y="80" width="8" height="30" rx="2" fill="#bbb" opacity="0.3"/>
    <!-- Backpack detail lines -->
    <line x1="70" y1="88" x2="74" y2="88" stroke="#999" stroke-width="0.5" opacity="0.3"/>
    <line x1="70" y1="96" x2="74" y2="96" stroke="#999" stroke-width="0.5" opacity="0.3"/>
    <!-- Toned arms in suit -->
    <ellipse cx="56" cy="96" rx="14" ry="12" fill="url(#kb8suit)"/>
    <path d="M46 90 Q56 84 66 90" fill="none" stroke="#ccc" stroke-width="0.5" opacity="0.3"/>
    <ellipse cx="144" cy="96" rx="14" ry="12" fill="url(#kb8suit)"/>
    <path d="M134 90 Q144 84 154 90" fill="none" stroke="#ccc" stroke-width="0.5" opacity="0.3"/>
    <!-- Suit joint rings on arms -->
    <path d="M46 102 Q56 106 66 102" fill="none" stroke="#999" stroke-width="1"/>
    <path d="M134 102 Q144 106 154 102" fill="none" stroke="#999" stroke-width="1"/>
    <!-- Gloves -->
    <circle cx="44" cy="112" r="7" fill="url(#kb8glove)"/>
    <path d="M38 110 Q44 106 50 110" fill="none" stroke="#bbb" stroke-width="0.5" opacity="0.4"/>
    <circle cx="156" cy="112" r="7" fill="url(#kb8glove)"/>
    <path d="M150 110 Q156 106 162 110" fill="none" stroke="#bbb" stroke-width="0.5" opacity="0.4"/>
    <!-- Tether cable floating -->
    <path d="M54 130 Q40 140 36 155 Q34 168 42 175" fill="none" stroke="#888" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
    <circle cx="42" cy="175" r="2" fill="#888" opacity="0.3"/>
    <!-- Floating tools (wrench) -->
    <g transform="translate(170, 130) rotate(25)">
      <rect x="0" y="0" width="3" height="14" rx="1" fill="#888" opacity="0.35"/>
      <circle cx="1.5" cy="0" r="3" fill="none" stroke="#888" stroke-width="1.5" opacity="0.3"/>
    </g>
    <!-- Floating pen -->
    <g transform="translate(28, 145) rotate(-40)">
      <rect x="0" y="0" width="2" height="12" rx="0.5" fill="#333" opacity="0.3"/>
      <polygon points="1,12 0,15 2,15" fill="#333" opacity="0.25"/>
    </g>
    <!-- Legs in suit -->
    <rect x="74" y="152" width="20" height="26" rx="8" fill="url(#kb8suit)"/>
    <rect x="106" y="152" width="20" height="26" rx="8" fill="url(#kb8suit)"/>
    <!-- Suit leg joint rings -->
    <path d="M76 162 Q84 166 94 162" fill="none" stroke="#999" stroke-width="0.8"/>
    <path d="M108 162 Q116 166 124 162" fill="none" stroke="#999" stroke-width="0.8"/>
    <!-- Boots -->
    <rect x="72" y="174" width="24" height="8" rx="4" fill="#999"/>
    <rect x="104" y="174" width="24" height="8" rx="4" fill="#999"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">ASTRONAUT K</text>
  </svg>`,e=>`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kb9jacket" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#222"/><stop offset="50%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#0a0a0a"/></linearGradient>
      <linearGradient id="kb9guitar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#cc2222"/><stop offset="50%" stop-color="#aa1111"/><stop offset="100%" stop-color="#881111"/></linearGradient>
      <linearGradient id="kb9skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f8d0b0"/><stop offset="100%" stop-color="#e0b090"/></linearGradient>
      <linearGradient id="kb9flame1" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#ff6600"/><stop offset="50%" stop-color="#ff9900"/><stop offset="100%" stop-color="#ffcc00"/></linearGradient>
      <linearGradient id="kb9flame2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#ff4400"/><stop offset="50%" stop-color="#ff7700"/><stop offset="100%" stop-color="#ffaa00"/></linearGradient>
      <linearGradient id="kb9stage" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#222"/><stop offset="100%" stop-color="#111"/></linearGradient>
    </defs>
    <circle cx="100" cy="110" r="98" fill="#0a0808" stroke="#ff6b9d" stroke-width="2"/>
    <!-- Marshall amp stack silhouette behind -->
    <rect x="12" y="55" width="28" height="35" rx="2" fill="#111" opacity="0.4"/>
    <rect x="14" y="58" width="24" height="14" rx="1" fill="#0a0a0a" opacity="0.5"/>
    <circle cx="20" cy="65" r="4" fill="#080808" opacity="0.4"/>
    <circle cx="32" cy="65" r="4" fill="#080808" opacity="0.4"/>
    <rect x="14" y="74" width="24" height="14" rx="1" fill="#0a0a0a" opacity="0.5"/>
    <circle cx="20" cy="81" r="4" fill="#080808" opacity="0.4"/>
    <circle cx="32" cy="81" r="4" fill="#080808" opacity="0.4"/>
    <rect x="160" y="55" width="28" height="35" rx="2" fill="#111" opacity="0.4"/>
    <rect x="162" y="58" width="24" height="14" rx="1" fill="#0a0a0a" opacity="0.5"/>
    <circle cx="168" cy="65" r="4" fill="#080808" opacity="0.4"/>
    <circle cx="180" cy="65" r="4" fill="#080808" opacity="0.4"/>
    <rect x="162" y="74" width="24" height="14" rx="1" fill="#0a0a0a" opacity="0.5"/>
    <circle cx="168" cy="81" r="4" fill="#080808" opacity="0.4"/>
    <circle cx="180" cy="81" r="4" fill="#080808" opacity="0.4"/>
    <!-- Stage lights from above (3 colored beams) -->
    <path d="M50 5 L25 100 L55 100 Z" stroke="#ff4444" stroke-width="0.5" fill="#ff4444" opacity="0.05"/>
    <path d="M100 5 L80 100 L120 100 Z" stroke="#4488ff" stroke-width="0.5" fill="#4488ff" opacity="0.04"/>
    <path d="M150 5 L145 100 L175 100 Z" stroke="#ffaa44" stroke-width="0.5" fill="#ffaa44" opacity="0.05"/>
    <!-- Light source dots -->
    <circle cx="50" cy="8" r="4" fill="#ff4444" opacity="0.15"/>
    <circle cx="100" cy="8" r="4" fill="#4488ff" opacity="0.12"/>
    <circle cx="150" cy="8" r="4" fill="#ffaa44" opacity="0.15"/>
    <!-- Pyrotechnic bursts left side -->
    <path d="M18 130 Q20 115 16 100" fill="none" stroke="url(#kb9flame1)" stroke-width="3" opacity="0.35"/>
    <path d="M22 132 Q26 118 24 105" fill="none" stroke="url(#kb9flame1)" stroke-width="2.5" opacity="0.3"/>
    <path d="M14 128 Q12 112 18 98" fill="none" stroke="url(#kb9flame2)" stroke-width="2" opacity="0.25"/>
    <path d="M26 134 Q30 120 28 108" fill="none" stroke="url(#kb9flame2)" stroke-width="1.5" opacity="0.2"/>
    <!-- Spark particles left -->
    <circle cx="16" cy="100" r="1.5" fill="#ffcc00" opacity="0.4"/>
    <circle cx="24" cy="105" r="1" fill="#ffaa00" opacity="0.35"/>
    <circle cx="12" cy="108" r="1.2" fill="#ff8800" opacity="0.3"/>
    <!-- Pyrotechnic bursts right side -->
    <path d="M182 130 Q180 115 184 100" fill="none" stroke="url(#kb9flame1)" stroke-width="3" opacity="0.35"/>
    <path d="M178 132 Q174 118 176 105" fill="none" stroke="url(#kb9flame1)" stroke-width="2.5" opacity="0.3"/>
    <path d="M186 128 Q188 112 182 98" fill="none" stroke="url(#kb9flame2)" stroke-width="2" opacity="0.25"/>
    <path d="M174 134 Q170 120 172 108" fill="none" stroke="url(#kb9flame2)" stroke-width="1.5" opacity="0.2"/>
    <!-- Spark particles right -->
    <circle cx="184" cy="100" r="1.5" fill="#ffcc00" opacity="0.4"/>
    <circle cx="176" cy="105" r="1" fill="#ffaa00" opacity="0.35"/>
    <circle cx="188" cy="108" r="1.2" fill="#ff8800" opacity="0.3"/>
    <!-- Smoke/haze effects -->
    <ellipse cx="100" cy="170" rx="90" ry="12" fill="#fff" opacity="0.03"/>
    <ellipse cx="60" cy="168" rx="40" ry="8" fill="#fff" opacity="0.02"/>
    <ellipse cx="140" cy="172" rx="45" ry="10" fill="#fff" opacity="0.02"/>
    <!-- Stage floor -->
    <rect x="4" y="172" width="192" height="6" rx="1" fill="url(#kb9stage)" opacity="0.4"/>
    <!-- Stage monitor wedge -->
    <path d="M60 175 L80 175 L82 168 L62 172 Z" fill="#222" opacity="0.4"/>
    <path d="M62 172 L82 168" fill="none" stroke="#333" stroke-width="0.5" opacity="0.3"/>
    <!-- Crowd silhouettes at bottom (12+ heads) -->
    <ellipse cx="14" cy="190" rx="10" ry="7" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="30" cy="188" rx="9" ry="8" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="46" cy="191" rx="10" ry="7" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="62" cy="187" rx="9" ry="8" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="78" cy="190" rx="10" ry="7" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="94" cy="188" rx="9" ry="8" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="110" cy="191" rx="10" ry="7" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="126" cy="187" rx="9" ry="8" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="142" cy="190" rx="10" ry="7" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="158" cy="188" rx="9" ry="8" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="174" cy="191" rx="10" ry="7" fill="#0a0a0a" opacity="0.6"/>
    <ellipse cx="190" cy="189" rx="9" ry="8" fill="#0a0a0a" opacity="0.6"/>
    <!-- Raised hands in crowd -->
    <line x1="22" y1="185" x2="20" y2="178" stroke="#0a0a0a" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
    <line x1="70" y1="183" x2="72" y2="176" stroke="#0a0a0a" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
    <line x1="134" y1="184" x2="132" y2="177" stroke="#0a0a0a" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
    <line x1="166" y1="185" x2="168" y2="178" stroke="#0a0a0a" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
    ${Ep(100,46)}
    <!-- Black leather jacket -->
    <path d="M76 76 L124 76 L128 142 L72 142 Z" fill="url(#kb9jacket)"/>
    <!-- Jacket left panel -->
    <path d="M76 76 L100 76 L100 142 L72 142 Z" fill="#181818"/>
    <!-- Jacket right overlap -->
    <path d="M96 76 L124 76 L128 142 L92 142 Z" fill="url(#kb9jacket)"/>
    <!-- Lapels -->
    <path d="M86 76 L96 94 L92 96 L84 80 Z" fill="#2a2a2a" stroke="#333" stroke-width="0.5"/>
    <path d="M114 76 L104 94 L108 96 L116 80 Z" fill="#2a2a2a" stroke="#333" stroke-width="0.5"/>
    <!-- Zipper detail -->
    <line x1="100" y1="92" x2="100" y2="140" stroke="#666" stroke-width="1.2"/>
    <line x1="99" y1="94" x2="101" y2="94" stroke="#888" stroke-width="0.5"/>
    <line x1="99" y1="98" x2="101" y2="98" stroke="#888" stroke-width="0.5"/>
    <line x1="99" y1="102" x2="101" y2="102" stroke="#888" stroke-width="0.5"/>
    <line x1="99" y1="106" x2="101" y2="106" stroke="#888" stroke-width="0.5"/>
    <line x1="99" y1="110" x2="101" y2="110" stroke="#888" stroke-width="0.5"/>
    <!-- Zipper pull -->
    <rect x="98" y="90" width="4" height="3" rx="1" fill="#888"/>
    <!-- Studs/rivets along seams -->
    <circle cx="88" cy="82" r="1" fill="#888" opacity="0.5"/>
    <circle cx="88" cy="90" r="1" fill="#888" opacity="0.5"/>
    <circle cx="88" cy="98" r="1" fill="#888" opacity="0.5"/>
    <circle cx="112" cy="82" r="1" fill="#888" opacity="0.5"/>
    <circle cx="112" cy="90" r="1" fill="#888" opacity="0.5"/>
    <circle cx="112" cy="98" r="1" fill="#888" opacity="0.5"/>
    <!-- Shoulder studs -->
    <circle cx="78" cy="78" r="1" fill="#888" opacity="0.4"/>
    <circle cx="82" cy="78" r="1" fill="#888" opacity="0.4"/>
    <circle cx="118" cy="78" r="1" fill="#888" opacity="0.4"/>
    <circle cx="122" cy="78" r="1" fill="#888" opacity="0.4"/>
    <!-- Jacket pocket -->
    <path d="M106 118 L124 118 L126 130 L108 130 Z" fill="#151515" stroke="#2a2a2a" stroke-width="0.5"/>
    <!-- Jacket collar -->
    <path d="M82 76 Q88 70 94 76" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M106 76 Q112 70 118 76" fill="none" stroke="#333" stroke-width="1.5"/>
    <!-- Left arm — raised fist/devil horns -->
    <path d="M76 84 L50 74 L48 82 L74 92 Z" fill="url(#kb9skin)"/>
    <!-- Devil horns hand -->
    <circle cx="36" cy="72" r="6" fill="#f0c9a8"/>
    <line x1="32" y1="72" x2="30" y2="62" stroke="#f0c9a8" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="70" x2="42" y2="60" stroke="#f0c9a8" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Right arm on guitar -->
    <path d="M124 84 L152 96 L150 106 L126 96 Z" fill="url(#kb9skin)"/>
    <ellipse cx="162" cy="108" rx="6" ry="5" fill="#f0c9a8"/>
    <!-- Electric guitar — Les Paul shape -->
    <!-- Guitar body -->
    <ellipse cx="108" cy="122" rx="20" ry="14" fill="url(#kb9guitar)"/>
    <ellipse cx="96" cy="118" rx="14" ry="10" fill="url(#kb9guitar)"/>
    <!-- Body binding -->
    <ellipse cx="108" cy="122" rx="20" ry="14" fill="none" stroke="#ddd" stroke-width="0.5" opacity="0.3"/>
    <!-- Cutaway -->
    <path d="M92 112 Q96 116 92 120" fill="#0a0808"/>
    <!-- Pickups -->
    <rect x="100" y="116" width="14" height="4" rx="1" fill="#333" stroke="#444" stroke-width="0.5"/>
    <rect x="100" y="124" width="14" height="4" rx="1" fill="#444" stroke="#555" stroke-width="0.5"/>
    <!-- Pickup pole pieces -->
    <circle cx="103" cy="118" r="0.5" fill="#888"/>
    <circle cx="107" cy="118" r="0.5" fill="#888"/>
    <circle cx="111" cy="118" r="0.5" fill="#888"/>
    <circle cx="103" cy="126" r="0.5" fill="#888"/>
    <circle cx="107" cy="126" r="0.5" fill="#888"/>
    <circle cx="111" cy="126" r="0.5" fill="#888"/>
    <!-- Bridge -->
    <rect x="102" y="130" width="10" height="3" rx="1" fill="#888"/>
    <!-- Pickup selector -->
    <circle cx="120" cy="118" r="1.5" fill="#888"/>
    <!-- Volume/tone knobs -->
    <circle cx="118" cy="128" r="2" fill="#333" stroke="#555" stroke-width="0.5"/>
    <circle cx="124" cy="126" r="2" fill="#333" stroke="#555" stroke-width="0.5"/>
    <!-- Guitar neck -->
    <rect x="82" y="56" width="6" height="64" rx="2" fill="#3a2a1a"/>
    <!-- Fret markers -->
    <circle cx="85" cy="68" r="1" fill="#ddd" opacity="0.3"/>
    <circle cx="85" cy="80" r="1" fill="#ddd" opacity="0.3"/>
    <circle cx="85" cy="92" r="1" fill="#ddd" opacity="0.3"/>
    <!-- Fret lines -->
    <line x1="82" y1="64" x2="88" y2="64" stroke="#888" stroke-width="0.3"/>
    <line x1="82" y1="72" x2="88" y2="72" stroke="#888" stroke-width="0.3"/>
    <line x1="82" y1="80" x2="88" y2="80" stroke="#888" stroke-width="0.3"/>
    <line x1="82" y1="88" x2="88" y2="88" stroke="#888" stroke-width="0.3"/>
    <line x1="82" y1="96" x2="88" y2="96" stroke="#888" stroke-width="0.3"/>
    <!-- Headstock -->
    <rect x="80" y="48" width="10" height="10" rx="2" fill="#2a1a0a"/>
    <!-- Tuning pegs -->
    <circle cx="80" cy="50" r="1.5" fill="#888"/>
    <circle cx="80" cy="54" r="1.5" fill="#888"/>
    <circle cx="80" cy="58" r="1.5" fill="#888"/>
    <circle cx="90" cy="50" r="1.5" fill="#888"/>
    <circle cx="90" cy="54" r="1.5" fill="#888"/>
    <circle cx="90" cy="58" r="1.5" fill="#888"/>
    <!-- Strings -->
    <line x1="83" y1="58" x2="83" y2="132" stroke="#ddd" stroke-width="0.3" opacity="0.4"/>
    <line x1="84.5" y1="58" x2="84.5" y2="132" stroke="#ddd" stroke-width="0.3" opacity="0.4"/>
    <line x1="86" y1="58" x2="86" y2="132" stroke="#ddd" stroke-width="0.25" opacity="0.35"/>
    <line x1="87.5" y1="58" x2="87.5" y2="132" stroke="#ccc" stroke-width="0.25" opacity="0.35"/>
    <!-- Legs in skinny jeans -->
    <rect x="78" y="140" width="16" height="34" rx="5" fill="#1a1a2a"/>
    <rect x="108" y="140" width="16" height="34" rx="5" fill="#1a1a2a"/>
    <!-- Jean seams -->
    <line x1="86" y1="142" x2="86" y2="172" stroke="#151520" stroke-width="0.5"/>
    <line x1="116" y1="142" x2="116" y2="172" stroke="#151520" stroke-width="0.5"/>
    <!-- Boots -->
    <rect x="76" y="170" width="20" height="8" rx="3" fill="#111"/>
    <rect x="106" y="170" width="20" height="8" rx="3" fill="#111"/>
    <!-- Boot buckles -->
    <rect x="82" y="172" width="4" height="3" rx="1" fill="#888" opacity="0.4"/>
    <rect x="112" y="172" width="4" height="3" rx="1" fill="#888" opacity="0.4"/>
    <text x="100" y="200" text-anchor="middle" fill="#ff6b9d" font-size="12" font-family="system-ui" font-weight="800">ROCKSTAR</text>
  </svg>`];function kp(e,t,n=120){let r=e===`spencer`?Dp:Op;return r[Math.abs(t)%r.length](n)}function Ap(e,t){let n=e===`spencer`?[`Flexin'`,`Super Spence`,`The Champ`,`Card Shark`,`Sensei`,`Professor Doctor`,`Lumberjack`,`DJ Spence`,`El Capitán`,`Grizzly Mode`]:[`Princess`,`Warrior`,`Knockout`,`Super K`,`Viking Queen`,`Sorceress`,`Kari Andretti`,`Samurai K`,`Astronaut K`,`Rockstar`];return n[Math.abs(t)%n.length]}var jp={1430:`spencer`,"0143":`kari`,6161:`ghost`},Mp=`cribbage-duo-auth`;function Np(e){let t=jp[e];if(!t)return null;let n=Rp(),r=n[t]?.avatarIndex??-1,i;do i=Math.floor(Math.random()*10);while(i===r);return n[t]={avatarIndex:i,lastLogin:Date.now()},zp(n),{player:t,avatarIndex:i}}function Pp(){try{let e=sessionStorage.getItem(`cribbage-duo-session`);return e?JSON.parse(e):null}catch{return null}}function Fp(e,t){sessionStorage.setItem(`cribbage-duo-session`,JSON.stringify({player:e,avatarIndex:t}))}function Ip(){sessionStorage.removeItem(`cribbage-duo-session`)}function Lp(e){return Rp()[e]?.avatarIndex??0}function Rp(){try{let e=localStorage.getItem(Mp);return e?JSON.parse(e):{}}catch{return{}}}function zp(e){try{localStorage.setItem(Mp,JSON.stringify(e))}catch{}}function Bp(e){return`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="110" r="98" fill="#0a0a14" stroke="#E8A020" stroke-width="2"/>
    <!-- Hood -->
    <path d="M50 90 Q50 30 100 20 Q150 30 150 90 L145 130 L55 130 Z" fill="#1a1a2e"/>
    <path d="M55 90 Q55 38 100 28 Q145 38 145 90 L140 125 L60 125 Z" fill="#12122a"/>
    <!-- Shadow face -->
    <ellipse cx="100" cy="80" rx="30" ry="25" fill="#0a0a18"/>
    <!-- Glowing eyes -->
    <circle cx="88" cy="76" r="4" fill="#E8A020" opacity="0.9"/>
    <circle cx="112" cy="76" r="4" fill="#E8A020" opacity="0.9"/>
    <circle cx="88" cy="76" r="2" fill="#F5C842"/>
    <circle cx="112" cy="76" r="2" fill="#F5C842"/>
    <!-- Eye glow -->
    <circle cx="88" cy="76" r="8" fill="#E8A020" opacity="0.15"/>
    <circle cx="112" cy="76" r="8" fill="#E8A020" opacity="0.15"/>
    <!-- Cloak body -->
    <path d="M55 130 L50 185 L150 185 L145 130 Z" fill="#1a1a2e"/>
    <path d="M60 130 L100 140 L140 130" fill="none" stroke="#2a2a4e" stroke-width="1"/>
    <!-- Cloak folds -->
    <line x1="80" y1="130" x2="75" y2="185" stroke="#12122a" stroke-width="1.5"/>
    <line x1="120" y1="130" x2="125" y2="185" stroke="#12122a" stroke-width="1.5"/>
    <!-- Question mark -->
    <text x="100" y="165" text-anchor="middle" fill="#E8A020" font-size="28" font-family="serif" font-weight="700" opacity="0.3">?</text>
    <text x="100" y="207" text-anchor="middle" fill="#E8A020" font-size="12" font-family="system-ui" font-weight="800">GHOST</text>
  </svg>`}function Vp(e){return`<svg viewBox="0 0 200 220" width="${e}" height="${e*1.1}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="110" r="98" fill="#0a0a14" stroke="#FF3B5C" stroke-width="2"/>
    <!-- Antenna -->
    <line x1="100" y1="38" x2="100" y2="22" stroke="#4A5568" stroke-width="4"/>
    <circle cx="100" cy="18" r="6" fill="#FF3B5C"/>
    <circle cx="100" cy="18" r="10" fill="#FF3B5C" opacity="0.2"/>
    <!-- Head -->
    <rect x="55" y="38" width="90" height="66" rx="14" fill="#2D3748"/>
    <rect x="60" y="43" width="80" height="56" rx="10" fill="#1A2230"/>
    <!-- Visor eyes -->
    <rect x="70" y="58" width="22" height="14" rx="3" fill="#FF3B5C" opacity="0.9"/>
    <rect x="108" y="58" width="22" height="14" rx="3" fill="#FF3B5C" opacity="0.9"/>
    <rect x="74" y="61" width="6" height="8" rx="1" fill="#FFD9E0"/>
    <rect x="112" y="61" width="6" height="8" rx="1" fill="#FFD9E0"/>
    <!-- Mouth grille -->
    <rect x="82" y="82" width="36" height="8" rx="3" fill="#0a0a14"/>
    <line x1="90" y1="82" x2="90" y2="90" stroke="#2D3748" stroke-width="2"/>
    <line x1="100" y1="82" x2="100" y2="90" stroke="#2D3748" stroke-width="2"/>
    <line x1="110" y1="82" x2="110" y2="90" stroke="#2D3748" stroke-width="2"/>
    <!-- Neck + body -->
    <rect x="88" y="104" width="24" height="10" fill="#4A5568"/>
    <rect x="58" y="114" width="84" height="66" rx="12" fill="#2D3748"/>
    <rect x="64" y="120" width="72" height="54" rx="8" fill="#1A2230"/>
    <!-- Chest light -->
    <circle cx="100" cy="140" r="10" fill="#FF3B5C" opacity="0.85"/>
    <circle cx="100" cy="140" r="15" fill="#FF3B5C" opacity="0.15"/>
    <!-- Panel details -->
    <rect x="74" y="158" width="14" height="6" rx="2" fill="#4A5568"/>
    <rect x="93" y="158" width="14" height="6" rx="2" fill="#4A5568"/>
    <rect x="112" y="158" width="14" height="6" rx="2" fill="#4A5568"/>
    <text x="100" y="207" text-anchor="middle" fill="#FF3B5C" font-size="12" font-family="system-ui" font-weight="800">CPU</text>
  </svg>`}function Hp(e,t){return q._isGhost&&e===q._player?Bp(t):vp()&&e===yp()?Vp(t):kp(e,Lp(e),t)}function Up(e){let t=e.match(/<circle[^>]*r="98"[^>]*\/>/);return t?{badgeSvg:`${e.slice(0,e.indexOf(`>`)+1)}${t[0]}</svg>`,innerSvg:e.replace(t[0],``)}:{badgeSvg:``,innerSvg:e}}function Wp(e,t){let{badgeSvg:n,innerSvg:r}=Up(Hp(e,t)),i=q._isGhost&&e===q._player,a=vp()&&e===yp(),o=i?37:a?39:24,s=i||a?25:28,c=`polygon(0% 0%, ${s}% 0%, ${s}% ${o}%, ${100-s}% ${o}%, ${100-s}% 0%, 100% 0%, 100% 100%, 0% 100%)`;return`<span class="flap-ava" style="width:${t}px;height:${Math.round(t*1.1)}px">
    <span class="flap-half flap-badge">${n}</span>
    <span class="flap-half flap-rest" style="clip-path:${c}">${r}</span>
    <span class="flap-half flap-top" style="clip-path:inset(0 ${s}% ${100-o}% ${s}%);transform-origin:${s+4}% ${o}%">${r}</span>
  </span>`}function Gp(e,t){let{badgeSvg:n,innerSvg:r}=Up(Hp(e,t)),i=q._isGhost&&e===q._player,a=vp()&&e===yp(),o=i?60:a?55:58;return`<span class="hip-ava" style="width:${t}px;height:${Math.round(t*1.1)}px">
    <span class="flap-half flap-badge">${n}</span>
    <span class="flap-half hip-legs" style="clip-path:inset(${o-1}% 0 0 0)">${r}</span>
    <span class="flap-half hip-torso" style="clip-path:inset(0 0 ${100-o}% 0);transform-origin:50% ${o}%">${r}</span>
  </span>`}var Kp=[{id:`walnut`,name:`Dark Walnut Classic`,description:`Rich walnut with brass inlay`,preview:()=>em(35,55),render:em,renderBackground:Qp,renderOverlay:$p,holeColor:`rgba(10,5,0,0.5)`,labelColor:`rgba(184,148,62,0.3)`,spencerColor:`#00d4ff`,spencerGlow:`rgba(0,212,255,0.3)`,kariColor:`#ff6b9d`,kariGlow:`rgba(255,107,157,0.3)`},{id:`driftwood`,name:`Coastal Driftwood`,description:`Weathered sea wood with rope & compass`,preview:()=>rm(45,30),render:rm,renderBackground:tm,renderOverlay:nm,holeColor:`rgba(30,20,10,0.45)`,labelColor:`rgba(160,144,128,0.3)`,spencerColor:`#00d4ff`,spencerGlow:`rgba(0,212,255,0.3)`,kariColor:`#ff6b9d`,kariGlow:`rgba(255,107,157,0.3)`},{id:`obsidian`,name:`Obsidian & Gold`,description:`Black stone with gold leaf tracks`,preview:()=>om(60,40),render:om,renderBackground:im,renderOverlay:am,holeColor:`rgba(0,0,0,0.5)`,labelColor:`rgba(212,168,73,0.25)`,spencerColor:`#00d4ff`,spencerGlow:`rgba(0,212,255,0.4)`,kariColor:`#ff6b9d`,kariGlow:`rgba(255,107,157,0.4)`}],qp=`cribbage-duo-board`;function Jp(e=null){try{let t=e?`${qp}-${e}`:qp,n=localStorage.getItem(t);return Kp.find(e=>e.id===n)||Kp[0]}catch{return Kp[0]}}function Yp(e,t=null){try{let n=t?`${qp}-${t}`:qp;localStorage.setItem(n,e)}catch{}}function Xp(e,t,n,r,i,a,o=5){let s=t-e,c=Math.max(r/100*s,0),l=e+c,u=``;u+=`<rect x="${e}" y="${n-o/2}" width="${s}" height="${o}" rx="${o/2}" fill="rgba(0,0,0,0.35)"/>`,u+=`<rect x="${e+.5}" y="${n-o/2+.5}" width="${s-1}" height="${o-1}" rx="${(o-1)/2}" fill="rgba(0,0,0,0.15)"/>`,r>.5&&(u+=`<rect x="${e}" y="${n-o/2}" width="${Math.max(c,o)}" height="${o}" rx="${o/2}" fill="${i}" opacity="0.85"/>`,u+=`<circle cx="${l}" cy="${n}" r="${o+1}" fill="${i}"/>`,u+=`<circle cx="${l}" cy="${n}" r="${o-1}" fill="#fff" opacity="0.3"/>`,u+=`<circle cx="${l}" cy="${n}" r="${o+4}" fill="none" stroke="${a}" stroke-width="1" opacity="0.5"/>`);for(let t of[30,60,90]){let r=e+t/121*s;u+=`<line x1="${r}" y1="${n-o-3}" x2="${r}" y2="${n+o+3}" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>`}return u+=`<circle cx="${e}" cy="${n}" r="2" fill="rgba(255,255,255,0.15)"/>`,u+=`<circle cx="${t}" cy="${n}" r="2.5" fill="#ffd700" opacity="0.4"/>`,u}function Zp(e,t,n,r,i=8,a=580){let o=[];for(let s=0;s<e;s++){let c=5+200/e*s,l=Math.sin(s*.7)*i,u=n+Math.random()*r,d=a*.25,f=a*.5,p=a*.75;o.push(`<path d="M0 ${c} Q${d} ${c+l} ${f} ${c-l*.5} Q${p} ${c+l*.3} ${a} ${c}" fill="none" stroke="${t}" stroke-width="${.5+Math.random()*.8}" opacity="${u}"/>`)}return o.join(``)}function Qp(){return`
    <defs>
      <linearGradient id="walnut-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3d2414"/>
        <stop offset="30%" stop-color="#4a2c18"/>
        <stop offset="70%" stop-color="#3a2010"/>
        <stop offset="100%" stop-color="#2d1a0c"/>
      </linearGradient>
    </defs>
    <rect width="580" height="200" rx="12" fill="url(#walnut-bg)"/>
    <rect x="1" y="1" width="578" height="198" rx="11" fill="none" stroke="#5a3a22" stroke-width="0.5" opacity="0.4"/>
    <rect x="3" y="3" width="574" height="194" rx="10" fill="none" stroke="#1a0a04" stroke-width="0.5" opacity="0.3"/>
    ${Zp(40,`#1a0e05`,.03,.04)}
    ${[[12,12],[568,12],[12,188],[568,188]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="5" fill="#b8943e" opacity="0.6"/>
       <circle cx="${e}" cy="${t}" r="3" fill="#d4aa50" opacity="0.4"/>
       <circle cx="${e}" cy="${t}" r="1.5" fill="#e8c060" opacity="0.3"/>`).join(``)}
    <rect x="20" y="20" width="540" height="160" rx="6" fill="none" stroke="#b8943e" stroke-width="0.6" opacity="0.25"/>
    <g transform="translate(290,45)" opacity="0.2">
      <path d="M0,-12 L3,-3 L12,-3 L5,3 L7,12 L0,7 L-7,12 L-5,3 L-12,-3 L-3,-3 Z" fill="#d4aa50"/>
    </g>
    <text x="290" y="62" text-anchor="middle" fill="#b8943e" font-size="7" font-family="Georgia,serif" letter-spacing="3" opacity="0.35">CRIBBAGE DUO</text>
  `}function $p(){return`
    <defs>
      <linearGradient id="walnut-edge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5a3a22"/>
        <stop offset="100%" stop-color="#2a1608"/>
      </linearGradient>
    </defs>
    <rect width="580" height="100" rx="12" fill="url(#walnut-edge)" opacity="0.04"/>
  `}function em(e,t){return`<svg viewBox="0 0 580 200" class="board-svg" xmlns="http://www.w3.org/2000/svg">
    ${Qp()}
    <text x="36" y="98" fill="#00d4ff" font-size="9" font-family="system-ui" font-weight="700" opacity="0.8">S</text>
    <text x="36" y="120" fill="#ff6b9d" font-size="9" font-family="system-ui" font-weight="700" opacity="0.8">K</text>
    ${Xp(50,555,95,e,`#00d4ff`,`rgba(0,212,255,0.3)`)}
    ${Xp(50,555,117,t,`#ff6b9d`,`rgba(255,107,157,0.3)`)}
    <g fill="#b8943e" font-size="6" font-family="Georgia,serif" opacity="0.3" text-anchor="middle">
      <text x="50" y="140">0</text>
      <text x="175.20661157024796" y="140">30</text>
      <text x="300.4132231404959" y="140">60</text>
      <text x="425.61983471074376" y="140">90</text>
      <text x="555" y="140">121</text>
    </g>
    ${$p()}
  </svg>`}function tm(){let e=Zp(35,`#4a4035`,.04,.05,12),t=(e,t,n)=>`
    <ellipse cx="${e}" cy="${t}" rx="${n}" ry="${n*.8}" fill="#3a3025" opacity="0.2"/>
    <ellipse cx="${e}" cy="${t}" rx="${n*.6}" ry="${n*.5}" fill="#2a2018" opacity="0.15"/>
    ${[0,1,2,3,4].map(r=>`<ellipse cx="${e}" cy="${t}" rx="${n+2+r}" ry="${n*.8+1+r*.5}" fill="none" stroke="#4a4035" stroke-width="0.3" opacity="${.06-r*.01}" transform="rotate(${r*8} ${e} ${t})"/>`).join(``)}
  `;return`
    <defs>
      <linearGradient id="drift-bg" x1="0" y1="0" x2="0.1" y2="1">
        <stop offset="0%" stop-color="#8a8a82"/>
        <stop offset="40%" stop-color="#74756e"/>
        <stop offset="100%" stop-color="#5d6058"/>
      </linearGradient>
    </defs>
    <rect width="580" height="200" rx="8" fill="url(#drift-bg)"/>
    <rect width="580" height="200" rx="8" fill="#a8b0a4" opacity="0.1"/>
    ${e}
    ${t(65,45,8)}
    ${t(310,155,6)}
    ${t(180,30,5)}
    <rect x="10" y="10" width="560" height="180" rx="6" fill="none" stroke="#8a7a65" stroke-width="2" stroke-dasharray="6 3" opacity="0.25"/>
    <g transform="translate(535, 40)" opacity="0.2">
      <circle r="18" fill="none" stroke="#c0b090" stroke-width="0.5"/>
      <circle r="12" fill="none" stroke="#c0b090" stroke-width="0.3"/>
      ${[0,90,180,270].map(e=>`<line x1="0" y1="0" x2="${Math.cos(e*Math.PI/180)*16}" y2="${Math.sin(e*Math.PI/180)*16}" stroke="#c0b090" stroke-width="0.5"/>`).join(``)}
      ${[45,135,225,315].map(e=>`<line x1="0" y1="0" x2="${Math.cos(e*Math.PI/180)*10}" y2="${Math.sin(e*Math.PI/180)*10}" stroke="#c0b090" stroke-width="0.3"/>`).join(``)}
      <polygon points="0,-15 -2,-3 2,-3" fill="#c0b090"/>
      <text y="-20" text-anchor="middle" fill="#c0b090" font-size="5" font-weight="700">N</text>
    </g>
    <g transform="translate(45, 105)" opacity="0.08">
      <line x1="0" y1="-15" x2="0" y2="15" stroke="#fff" stroke-width="2.5"/>
      <line x1="-8" y1="-12" x2="8" y2="-12" stroke="#fff" stroke-width="2"/>
      <path d="M-10 12 Q0 20 10 12" fill="none" stroke="#fff" stroke-width="2.5"/>
      <circle cy="-16" r="3" fill="none" stroke="#fff" stroke-width="1.5"/>
    </g>
    <text x="290" y="62" text-anchor="middle" fill="#a09080" font-size="7" font-family="Georgia,serif" letter-spacing="4" opacity="0.3">DRIFTWOOD</text>
  `}function nm(){return Array.from({length:20},()=>`<circle cx="${Math.random()*580}" cy="${Math.random()*200}" r="${.5+Math.random()}" fill="#fff" opacity="${.02+Math.random()*.03}"/>`).join(``)}function rm(e,t){return`<svg viewBox="0 0 580 200" class="board-svg" xmlns="http://www.w3.org/2000/svg">
    ${tm()}
    <text x="36" y="98" fill="#00d4ff" font-size="9" font-family="system-ui" font-weight="700" opacity="0.7">S</text>
    <text x="36" y="120" fill="#ff6b9d" font-size="9" font-family="system-ui" font-weight="700" opacity="0.7">K</text>
    ${Xp(50,555,95,e,`#00d4ff`,`rgba(0,212,255,0.3)`)}
    ${Xp(50,555,117,t,`#ff6b9d`,`rgba(255,107,157,0.3)`)}
    <g fill="#a09080" font-size="6" font-family="Georgia,serif" opacity="0.25" text-anchor="middle">
      <text x="50" y="138">0</text>
      <text x="175.20661157024796" y="138">30</text>
      <text x="300.4132231404959" y="138">60</text>
      <text x="425.61983471074376" y="138">90</text>
      <text x="555" y="138">121</text>
    </g>
    ${nm()}
  </svg>`}function im(){let e=[];for(let t=0;t<15;t++){let t=Math.random()*200,n=t+(Math.random()-.5)*60,r=Math.random()*150,i=r+150+Math.random()*280,a=.03+Math.random()*.04;e.push(`<path d="M${r} ${t} Q${(r+i)/2} ${(t+n)/2+(Math.random()-.5)*30} ${i} ${n}" fill="none" stroke="#2a2a3a" stroke-width="${.3+Math.random()*.6}" opacity="${a}"/>`)}return`
    <defs>
      <linearGradient id="obs-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0d0d14"/>
        <stop offset="30%" stop-color="#111118"/>
        <stop offset="70%" stop-color="#0a0a10"/>
        <stop offset="100%" stop-color="#08080e"/>
      </linearGradient>
      <linearGradient id="gold-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#d4a849"/>
        <stop offset="50%" stop-color="#f0d060"/>
        <stop offset="100%" stop-color="#b8922e"/>
      </linearGradient>
    </defs>
    <rect width="580" height="200" rx="10" fill="url(#obs-bg)"/>
    ${e.join(``)}
    <rect x="6" y="6" width="568" height="188" rx="7" fill="none" stroke="url(#gold-fill)" stroke-width="1.2" opacity="0.85"/>
    <rect x="10" y="10" width="560" height="180" rx="5" fill="none" stroke="url(#gold-fill)" stroke-width="0.5" opacity="0.5"/>
    ${[[18,18,0],[562,18,90],[562,182,180],[18,182,270]].map(([e,t,n])=>`
      <g transform="translate(${e},${t}) rotate(${n})" opacity="0.3">
        <path d="M0,0 Q8,-2 12,0 Q14,4 12,8 Q8,6 4,8 Q2,4 0,0 Z" fill="url(#gold-fill)" stroke="none"/>
        <path d="M2,2 Q6,0 10,2" fill="none" stroke="#f0d060" stroke-width="0.3" opacity="0.5"/>
      </g>
    `).join(``)}
    <g transform="translate(290,45)" opacity="0.25">
      <polygon points="0,-10 8,0 0,10 -8,0" fill="none" stroke="url(#gold-fill)" stroke-width="0.6"/>
      <polygon points="0,-6 5,0 0,6 -5,0" fill="url(#gold-fill)" opacity="0.3"/>
      <line x1="-20" y1="0" x2="-10" y2="0" stroke="url(#gold-fill)" stroke-width="0.4"/>
      <line x1="10" y1="0" x2="20" y2="0" stroke="url(#gold-fill)" stroke-width="0.4"/>
    </g>
    <text x="290" y="62" text-anchor="middle" fill="#d4a849" font-size="7" font-family="Georgia,serif" letter-spacing="5" opacity="0.25">OBSIDIAN</text>
  `}function am(){return`
    <defs>
      <linearGradient id="obs-sheen" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.06"/>
        <stop offset="50%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    <rect width="580" height="200" rx="10" fill="url(#obs-sheen)"/>
    ${Array.from({length:12},()=>`<circle cx="${20+Math.random()*540}" cy="${20+Math.random()*160}" r="0.5" fill="#fff" opacity="${.05+Math.random()*.08}"/>`).join(``)}
    <path d="M50 2 Q290 10 530 2" fill="none" stroke="#fff" stroke-width="0.3" opacity="0.04"/>
  `}function om(e,t){return`<svg viewBox="0 0 580 200" class="board-svg" xmlns="http://www.w3.org/2000/svg">
    ${im()}
    <text x="36" y="98" fill="#00d4ff" font-size="9" font-family="system-ui" font-weight="700" opacity="0.8">S</text>
    <text x="36" y="120" fill="#ff6b9d" font-size="9" font-family="system-ui" font-weight="700" opacity="0.8">K</text>
    ${Xp(50,555,95,e,`#00d4ff`,`rgba(0,212,255,0.4)`)}
    ${Xp(50,555,117,t,`#ff6b9d`,`rgba(255,107,157,0.4)`)}
    <g fill="#d4a849" font-size="6" font-family="Georgia,serif" opacity="0.2" text-anchor="middle">
      <text x="50" y="140">0</text>
      <text x="175.20661157024796" y="140">30</text>
      <text x="300.4132231404959" y="140">60</text>
      <text x="425.61983471074376" y="140">90</text>
      <text x="555" y="140">121</text>
    </g>
    ${am()}
  </svg>`}var sm={BEST_OF_3:{length:3,winsNeeded:2,name:`Best of 3`,segmentSize:3},BEST_OF_5:{length:5,winsNeeded:3,name:`Best of 5`,segmentSize:3},BEST_OF_7:{length:7,winsNeeded:4,name:`Best of 7`,segmentSize:3},SPENCER_CHALLENGE:{length:11,winsNeeded:6,name:`The Spencer Challenge`,segmentSize:3}};function cm(e){let t=sm[e];if(!t)throw Error(`Unknown series type: ${e}`);return{type:e,config:t,status:`active`,games:[],wins:{spencer:0,kari:0},winner:null,startedAt:Date.now(),completedAt:null}}function lm(e,t){let n={gameNumber:e.games.length+1,gameId:t.gameId,winner:t.winner,finalScores:{...t.finalScores},margin:Math.abs(t.finalScores.spencer-t.finalScores.kari),rounds:t.totalRounds,skunk:Math.min(t.finalScores.spencer,t.finalScores.kari)<=90,doubleSkunk:Math.min(t.finalScores.spencer,t.finalScores.kari)<=60,timestamp:Date.now(),analytics:null};return e.games.push(n),e.wins[t.winner]++,e.wins.spencer>=e.config.winsNeeded?(e.status=`complete`,e.winner=`spencer`,e.completedAt=Date.now()):e.wins.kari>=e.config.winsNeeded&&(e.status=`complete`,e.winner=`kari`,e.completedAt=Date.now()),e.games.length>=e.config.length&&!e.winner&&(e.status=`complete`,e.winner=e.wins.spencer>e.wins.kari?`spencer`:`kari`,e.completedAt=Date.now()),{series:e,seriesOver:e.status===`complete`,gamesPlayed:e.games.length,gamesRemaining:e.config.length-e.games.length,clinchNumber:um(e)}}function um(e){let t=Math.max(e.wins.spencer,e.wins.kari);return e.config.winsNeeded-t}function dm(e){return Math.min(e.wins.spencer,e.wins.kari)+(e.config.length-e.games.length)===e.config.winsNeeded}async function fm(e){let[t,n,r]=await Promise.all([Dd(e),kd(e),Od(e)]),i={spencer:[],kari:[]},a={spencer:[],kari:[]},o={spencer:0,kari:0};for(let e of t)e.hands.spencer!==void 0&&i.spencer.push(e.hands.spencer),e.hands.kari!==void 0&&i.kari.push(e.hands.kari),e.crib.player&&a[e.crib.player].push(e.crib.points),o.spencer+=e.pegging.spencer,o.kari+=e.pegging.kari;return{roundStats:t,peggingStats:n,handDist:r,summary:{spencer:mm(`spencer`,i.spencer,a.spencer,o.spencer,n.spencer),kari:mm(`kari`,i.kari,a.kari,o.kari,n.kari)},totalRounds:t.length}}function pm(e,t){let n=[...e?.rounds||[]],r=n.some(e=>e.round===(t?.round||0));if(t?.phase===`done`&&t.roundScoring&&!r){let e=t.roundScoring,r=t.dealer;n.push({round:t.round,hands:{spencer:e.spencer?.hand||0,kari:e.kari?.hand||0},pegging:{spencer:e.spencer?.peg||0,kari:e.kari?.peg||0},crib:{player:r,points:r&&e[r]?.crib||0},partial:!0})}let i={spencer:[],kari:[]},a={spencer:[],kari:[]},o={spencer:0,kari:0};for(let e of n)i.spencer.push(e.hands?.spencer||0),i.kari.push(e.hands?.kari||0),e.crib?.player&&a[e.crib.player].push(e.crib.points||0),o.spencer+=e.pegging?.spencer||0,o.kari+=e.pegging?.kari||0;let s=e=>{let t={};for(let n of e)t[n]=(t[n]||0)+1;return t},c={fifteens:0,pairs:0,runs:0,longestRun:0,avgPointsPerPlay:0,gos:0};return{roundStats:n,peggingStats:{spencer:c,kari:c},handDist:{spencer:s(i.spencer),kari:s(i.kari)},summary:{spencer:mm(`spencer`,i.spencer,a.spencer,o.spencer,c),kari:mm(`kari`,i.kari,a.kari,o.kari,c)},totalRounds:n.length}}function mm(e,t,n,r,i){return{handScores:t,avgHandScore:t.length?(t.reduce((e,t)=>e+t,0)/t.length).toFixed(1):`0.0`,highHand:t.length?Math.max(...t):0,lowHand:t.length?Math.min(...t):0,zeroHands:t.filter(e=>e===0).length,cribScores:n,avgCribScore:n.length?(n.reduce((e,t)=>e+t,0)/n.length).toFixed(1):`0.0`,highCrib:n.length?Math.max(...n):0,totalPegging:r,pegFifteens:i.fifteens,pegPairs:i.pairs,pegRuns:i.runs,pegLongestRun:i.longestRun,avgPegPerPlay:i.avgPointsPerPlay,gosCalledAgainst:i.gos}}function hm(e){if(e.config.length<=3)return[];let t=[],n=e.config.segmentSize;for(let r=0;r<e.games.length;r+=n){let i=e.games.slice(r,r+n);if(i.length===0)break;let a=Math.floor(r/n)+1,o=`Games ${r+1}–${r+i.length}`,s={spencer:0,kari:0},c={spencer:[],kari:[]},l=[],u=0;for(let e of i)s[e.winner]++,c.spencer.push(e.finalScores.spencer),c.kari.push(e.finalScores.kari),l.push(e.margin),e.skunk&&u++;t.push({segment:a,gameRange:o,games:i.map(e=>e.gameNumber),gamesPlayed:i.length,complete:i.length===n,wins:{...s},segmentWinner:s.spencer>s.kari?`spencer`:s.kari>s.spencer?`kari`:`tied`,avgScore:{spencer:ym(c.spencer),kari:ym(c.kari)},highScore:{spencer:c.spencer.length?Math.max(...c.spencer):0,kari:c.kari.length?Math.max(...c.kari):0},avgMargin:ym(l),closestGame:l.length?Math.min(...l):0,blowoutGame:l.length?Math.max(...l):0,skunks:u,gameAnalytics:i.map(e=>({gameNumber:e.gameNumber,gameId:e.gameId,analytics:e.analytics}))})}return t}function gm(e){let t={spencer:[],kari:[]},n=[],r={spencer:[],kari:[]},i={player:null,count:0};for(let a of e.games)t.spencer.push(a.finalScores.spencer),t.kari.push(a.finalScores.kari),n.push(a.margin),i.player===a.winner?i.count++:(i.player&&r[i.player].push(i.count),i={player:a.winner,count:1});i.player&&r[i.player].push(i.count);let a=e.games.map(t=>({gameNumber:t.gameNumber,winner:t.winner,margin:t.margin,skunk:t.skunk,cumulativeWins:{spencer:e.games.filter((e,n)=>n<t.gameNumber&&e.winner===`spencer`).length+(t.winner===`spencer`?1:0),kari:e.games.filter((e,n)=>n<t.gameNumber&&e.winner===`kari`).length+(t.winner===`kari`?1:0)}})),o=vm(e);return{type:e.type,name:e.config.name,gamesPlayed:e.games.length,maxGames:e.config.length,winner:e.winner,finalRecord:`${e.wins.spencer}–${e.wins.kari}`,duration:e.completedAt?Math.round((e.completedAt-e.startedAt)/6e4):null,spencer:{wins:e.wins.spencer,avgScore:ym(t.spencer),highScore:t.spencer.length?Math.max(...t.spencer):0,lowScore:t.spencer.length?Math.min(...t.spencer):0,totalPoints:t.spencer.reduce((e,t)=>e+t,0),longestWinStreak:r.spencer.length?Math.max(...r.spencer):0,skunks:e.games.filter(e=>e.winner===`spencer`&&e.skunk).length,doubleSkunks:e.games.filter(e=>e.winner===`spencer`&&e.doubleSkunk).length},kari:{wins:e.wins.kari,avgScore:ym(t.kari),highScore:t.kari.length?Math.max(...t.kari):0,lowScore:t.kari.length?Math.min(...t.kari):0,totalPoints:t.kari.reduce((e,t)=>e+t,0),longestWinStreak:r.kari.length?Math.max(...r.kari):0,skunks:e.games.filter(e=>e.winner===`kari`&&e.skunk).length,doubleSkunks:e.games.filter(e=>e.winner===`kari`&&e.doubleSkunk).length},avgMargin:ym(n),closestGame:n.length?Math.min(...n):0,biggestBlowout:n.length?Math.max(...n):0,totalSkunks:e.games.filter(e=>e.skunk).length,timeline:a,comebacks:o,segments:hm(e),awards:_m(e)}}function _m(e){let t=[],n=[...e.games].sort((e,t)=>t.margin-e.margin)[0];n&&t.push({title:`Biggest Blowout`,player:n.winner,detail:`Game ${n.gameNumber}: won by ${n.margin} points`,value:n.margin});let r=[...e.games].sort((e,t)=>e.margin-t.margin)[0];r&&t.push({title:`Nail Biter`,player:r.winner,detail:`Game ${r.gameNumber}: won by only ${r.margin} points`,value:r.margin});for(let n of[`spencer`,`kari`]){let r=e.games.map(e=>e.finalScores[n]);if(r.length>=3){let e=r.reduce((e,t)=>e+t,0)/r.length,i=r.reduce((t,n)=>t+(n-e)**2,0)/r.length;t.push({title:`Consistency Rating`,player:n,detail:`Std deviation: ${Math.sqrt(i).toFixed(1)} points`,value:Math.sqrt(i)})}}for(let n of[`spencer`,`kari`]){let r=e.games.filter(e=>e.winner===n&&e.skunk).length;r>0&&t.push({title:`Skunk Master`,player:n,detail:`${r} skunk${r>1?`s`:``} dealt`,value:r})}let i=vm(e);if(i.length>0){let e=i[0];t.push({title:`Comeback Kid`,player:e.player,detail:`Came back from ${e.deficit} games down`,value:e.deficit})}let a={spencer:e.games.reduce((e,t)=>e+t.finalScores.spencer,0),kari:e.games.reduce((e,t)=>e+t.finalScores.kari,0)},o=a.spencer>a.kari?`spencer`:`kari`;return t.push({title:`Point Machine`,player:o,detail:`${a[o]} total points across ${e.games.length} games`,value:a[o]}),t}function vm(e){let t=[],n={spencer:0,kari:0},r={spencer:0,kari:0};for(let t of e.games){r[t.winner]++;let e=r.spencer-r.kari;e>0&&(n.kari=Math.max(n.kari,e)),e<0&&(n.spencer=Math.max(n.spencer,-e))}if(e.winner){let r=n[e.winner];r>0&&t.push({player:e.winner,deficit:r,description:`${e.winner} overcame a ${r}-game deficit to win the series`})}return t}function ym(e){return e.length?(e.reduce((e,t)=>e+t,0)/e.length).toFixed(1):`0.0`}function bm(e){if(e.status===`complete`)return`${e.config.name} complete: ${e.winner} wins ${e.wins.spencer}–${e.wins.kari}`;let t=e.games.length+1,n=e.wins.spencer>e.wins.kari?`Spencer leads`:e.wins.kari>e.wins.spencer?`Kari leads`:`Tied`;return`${e.config.name} — Game ${t} · ${n} ${e.wins.spencer}–${e.wins.kari}`}function xm(e){for(let t of[`spencer`,`kari`])if(e.wins[t]===e.config.winsNeeded-1)return{player:t,canClinch:!0};return{player:null,canClinch:!1}}var Sm=121,Cm=580,wm=200,Tm=60,Em=498,Dm=150,Om=46,km=98,Am=Em,jm=(Dm+Om)/2,Mm=(Dm-Om)/2,Nm=Tm,Pm=(Om+km)/2,Fm=(km-Om)/2,Im=7,Lm=34,Rm=10,zm=34,Bm=8,Vm=34,Hm=(Em-Tm)/(Lm-1),Um={x:Tm+(Vm-1)*Hm+14,y:km},Wm=2.9,Gm=4.5,Km=Gm*1.3,qm=Math.PI/180;function Jm(e,t,n=!1){if(n){let n=Jm(e,t,!1);return{x:n.x,y:wm-n.y}}if(e<=0)return{x:Tm-14,y:Dm+t};if(e>=Sm)return{x:Um.x,y:Um.y};if(e<=Lm)return{x:Tm+(e-1)*Hm,y:Dm+t};if(e<=Lm+Rm){let n=(90-180*(e-Lm)/(Rm+1))*qm,r=Mm+t;return{x:Am+r*Math.cos(n),y:jm+r*Math.sin(n)}}if(e<=Lm+Rm+zm)return{x:Em-(e-Lm-Rm-1)*Hm,y:Om-t};if(e<=Lm+Rm+zm+Bm){let n=(-90-180*(e-Lm-Rm-zm)/(Bm+1))*qm,r=Fm+t;return{x:Nm+r*Math.cos(n),y:Pm+r*Math.sin(n)}}return{x:Tm+(e-Lm-Rm-zm-Bm-1)*Hm,y:km+t}}function Ym(e,t,n,r=!1){let i=[];for(let a=e;a<=t;a++){let e=Jm(a,n,r);i.push(`${e.x.toFixed(1)},${e.y.toFixed(1)}`)}return i.join(` `)}function Xm(e,t,n=!1){let r=Ym(1,Sm-1,e,n),i=``;return i+=`<polyline points="${r}" fill="none" stroke="rgba(0,0,0,0.32)" stroke-width="6.6" stroke-linecap="round" stroke-linejoin="round"/>`,t&&(i+=`<polyline points="${r}" fill="none" stroke="${t}" stroke-width="6.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.10"/>`),i}function Zm(e,t,n=!1){let r=``;for(let i=1;i<Sm;i++){let{x:a,y:o}=Jm(i,e,n),s=i%5==0?Wm+.3:Wm;r+=`<circle cx="${a}" cy="${o}" r="${s}" fill="${t}" opacity="0.7"/>`,r+=`<circle cx="${a}" cy="${o}" r="${s-.4}" fill="rgba(0,0,0,0.4)"/>`}return r}function Qm(e,t,n={}){let r=(n.orientation||`horizontal`)===`vertical`,i={spencer:{front:0,back:0},kari:{front:0,back:0},animating:{spencer:null,kari:null}},a=Im,o=-Im,s=r,c=(e,t)=>Jm(e,t,s),l=s?-1:1,u=r?`0 0 ${wm} ${Cm}`:`0 0 ${Cm} ${wm}`,d=`http://www.w3.org/2000/svg`,f=document.createElementNS(d,`svg`);f.setAttribute(`viewBox`,u),f.setAttribute(`preserveAspectRatio`,`xMidYMid meet`),f.setAttribute(`class`,`board-svg${r?` board-svg-vertical`:``}`),f.setAttribute(`xmlns`,d);let p=f;r&&(p=document.createElementNS(d,`g`),p.setAttribute(`transform`,`translate(0 ${Cm}) rotate(-90)`),p.setAttribute(`class`,`board-rotation`),f.appendChild(p));let m=document.createElementNS(d,`g`);m.setAttribute(`class`,`board-bg`),m.innerHTML=t.renderBackground(),p.appendChild(m);let h=document.createElementNS(d,`g`);h.setAttribute(`class`,`board-holes`),p.appendChild(h);let g=document.createElementNS(d,`g`);g.setAttribute(`class`,`board-pegs`),p.appendChild(g);let _=document.createElementNS(d,`g`);if(_.setAttribute(`class`,`board-overlay`),t.renderOverlay&&(_.innerHTML=t.renderOverlay()),p.appendChild(_),r){let e=document.createElementNS(d,`g`);e.setAttribute(`class`,`board-labels-vertical`);let n=t.spencerColor||`#00d4ff`,r=t.kariColor||`#ff6b9d`,i=t.labelColor||`rgba(255,255,255,0.35)`,a=Jm(0,Im,!0),o=Jm(0,-Im,!0),s=Jm(Sm,0,!0);e.innerHTML=`
      <text x="${a.y}" y="${Cm-a.x+18}" fill="${n}" font-size="10" font-family="system-ui" font-weight="800" text-anchor="middle" opacity="0.9">S</text>
      <text x="${o.y}" y="${Cm-o.x+18}" fill="${r}" font-size="10" font-family="system-ui" font-weight="800" text-anchor="middle" opacity="0.9">K</text>
      <g fill="${i}" font-size="9" font-family="Georgia,serif" font-weight="600" opacity="0.85">
        <text x="${s.y}" y="${Cm-s.x-12}" text-anchor="middle">121</text>
      </g>
    `,f.appendChild(e)}e.innerHTML=``,e.appendChild(f);let ee=t.holeColor||`rgba(0,0,0,0.3)`,te=t.labelColor||`rgba(255,255,255,0.25)`,ne=t.spencerColor||`#00d4ff`,re=t.kariColor||`#ff6b9d`;{let e=``;e+=Xm(a,ne,s),e+=Xm(o,re,s),e+=Zm(a,ee,s),e+=Zm(o,ee,s),e+=`<g stroke="rgba(255,255,255,0.07)" stroke-width="0.5">`;for(let t=5;t<Sm;t+=5){let n=c(t,a+3.2),r=c(t,o-3.2);e+=`<line x1="${n.x}" y1="${n.y}" x2="${r.x}" y2="${r.y}"/>`}e+=`</g>`,e+=`<g fill="${te}" font-size="6.5" font-family="Georgia,serif" font-weight="600" text-anchor="middle">`;let t=(e,t)=>{let n=c(e,a+t);return{x:n.x,y:n.y}},n=t(30,9);e+=`<text x="${n.x}" y="${n.y+2}">30</text>`;let r=t(60,9);e+=`<text x="${r.x}" y="${r.y+2}">60</text>`;let i=t(90,9);e+=`<text x="${i.x}" y="${i.y+2}">90</text>`;let u=c(0,0);e+=`<text x="${u.x}" y="${u.y+14*l+(s?4:0)}">0</text>`;let d=c(Sm,0);e+=`<text x="${d.x+13}" y="${d.y+2}" fill="#ffd700" opacity="0.8">121</text>`,e+=`</g>`;{let t=c(91,a+4),n=c(91,o-4);e+=`<line x1="${t.x}" y1="${t.y}" x2="${n.x}" y2="${n.y}" stroke="#ff3b5c" stroke-width="1" opacity="0.5" stroke-dasharray="2 1"/>`,e+=`<text x="${t.x-5}" y="${t.y+3}" fill="#ff3b5c" font-size="4" font-weight="700" text-anchor="middle" opacity="0.55">S</text>`}for(let t of[a,o]){let n=c(0,t);e+=`<circle cx="${n.x}" cy="${n.y}" r="${Wm+1.6}" fill="none" stroke="${ee}" stroke-width="0.7" opacity="0.6"/>`,e+=`<circle cx="${n.x}" cy="${n.y}" r="${Wm}" fill="${ee}" opacity="0.7"/>`,e+=`<circle cx="${n.x}" cy="${n.y}" r="${Wm-.4}" fill="rgba(0,0,0,0.4)"/>`}e+=`<text x="${Tm-27}" y="${c(0,a).y+3}" fill="${ne}" font-size="8" font-family="system-ui" font-weight="800" text-anchor="middle">S</text>`,e+=`<text x="${Tm-27}" y="${c(0,o).y+2.5}" fill="${re}" font-size="8" font-family="system-ui" font-weight="800" text-anchor="middle">K</text>`;let f=c(Sm,0);e+=`<circle cx="${f.x}" cy="${f.y}" r="${Wm+2.4}" fill="#ffd700" opacity="0.18"/>`,e+=`<circle cx="${f.x}" cy="${f.y}" r="${Wm+1.2}" fill="none" stroke="#ffd700" stroke-width="0.7" opacity="0.55"/>`,e+=`<circle cx="${f.x}" cy="${f.y}" r="${Wm}" fill="rgba(0,0,0,0.4)"/>`,h.innerHTML=e}function ie(e,t){return c(t,e===`spencer`?a:o)}function ae(e,t,n,r){if(!e)return``;let i=r?Gm:Gm-.9,a=r?Km:(Gm-.9)*1.3,o=e.y-a*.18,s=r?1:.4,c=``;return c+=`<ellipse cx="${e.x+.5}" cy="${e.y+1.4}" rx="${i*.85}" ry="${a*.55}" fill="rgba(0,0,0,0.55)" opacity="${r?.7:.35}"/>`,r&&(c+=`<ellipse cx="${e.x}" cy="${o}" rx="${i+3}" ry="${a+3}" fill="${n}" opacity="0.32"/>`),c+=`<ellipse cx="${e.x}" cy="${o}" rx="${i}" ry="${a}" fill="${t}" opacity="${s}"/>`,c+=`<ellipse cx="${e.x-.4}" cy="${o-a*.55}" rx="${i*.5}" ry="${a*.28}" fill="#fff" opacity="${r?.5:.22}"/>`,c}function v(e,t,n){return t<=1?``:`<polyline points="${Ym(1,Math.min(t,Sm),e===`spencer`?a:o,s)}" fill="none" stroke="${n}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.18"/>`}function oe(){let e=``,n=t.spencerColor||`#00d4ff`,r=t.spencerGlow||`rgba(0,212,255,0.3)`,a=t.kariColor||`#ff6b9d`,o=t.kariGlow||`rgba(255,107,157,0.3)`;e+=v(`spencer`,i.spencer.front||0,n),e+=v(`kari`,i.kari.front||0,a),i.spencer.back>0&&(e+=ae(ie(`spencer`,i.spencer.back),n,r,!1)),e+=ae(ie(`spencer`,i.spencer.front||0),n,r,!0),i.kari.back>0&&(e+=ae(ie(`kari`,i.kari.back),a,o,!1)),e+=ae(ie(`kari`,i.kari.front||0),a,o,!0),g.innerHTML=e}function se(e){let n=e===`spencer`?t.spencerGlow||`rgba(0,212,255,0.3)`:t.kariGlow||`rgba(255,107,157,0.3)`,r=i[e].front;if(r<=0)return;let{x:a,y:o}=ie(e,r),s=document.createElementNS(d,`circle`);s.setAttribute(`cx`,a),s.setAttribute(`cy`,o),s.setAttribute(`r`,Gm),s.setAttribute(`fill`,n),s.setAttribute(`opacity`,`0.6`),s.classList.add(`peg-pulse`),g.appendChild(s);let c=0;function l(){c++;let e=c/12,t=Gm+e*5,n=.6*(1-e);s.setAttribute(`r`,t),s.setAttribute(`opacity`,n),c<12?requestAnimationFrame(l):s.remove()}requestAnimationFrame(l)}function ce(e,t,n,r){let a=n-t;if(a<=0){r&&r();return}let o=a<=4?110:a<=8?90:a<=15?65:45,s=t,c=0;function l(t){c||=t,t-c>=o&&(c=t,s++,s>Sm&&(s=Sm),i[e].front=s,oe()),s<n?i[e].animating=requestAnimationFrame(l):(i[e].animating=null,se(e),r&&r())}i[e].animating=requestAnimationFrame(l)}function le(e,t){let n=i[e],r=n.front;t=Math.max(0,Math.min(t,Sm)),t!==r&&(n.animating&&=(cancelAnimationFrame(n.animating),null),t>r?(n.back=r,ce(e,r,t)):(n.front=t,n.back=Math.max(0,t-1),oe()))}function ue(e,t){i.spencer.animating&&(cancelAnimationFrame(i.spencer.animating),i.spencer.animating=null),i.kari.animating&&(cancelAnimationFrame(i.kari.animating),i.kari.animating=null),i.spencer.front=Math.min(e,Sm),i.spencer.back=Math.max(0,e-1),i.kari.front=Math.min(t,Sm),i.kari.back=Math.max(0,t-1),oe()}function de(){i.spencer.animating&&(cancelAnimationFrame(i.spencer.animating),i.spencer.animating=null),i.kari.animating&&(cancelAnimationFrame(i.kari.animating),i.kari.animating=null),i.spencer.front=0,i.spencer.back=0,i.kari.front=0,i.kari.back=0,oe()}function fe(e){}function pe(){i.spencer.animating&&cancelAnimationFrame(i.spencer.animating),i.kari.animating&&cancelAnimationFrame(i.kari.animating),e.innerHTML=``}return oe(),{updateScore:le,setScores:ue,reset:de,setTheme:fe,destroy:pe,_container:e}}var $m={2:[[50,18],[50,82,1]],3:[[50,18],[50,50],[50,82,1]],4:[[30,20],[70,20],[30,80,1],[70,80,1]],5:[[30,20],[70,20],[50,50],[30,80,1],[70,80,1]],6:[[30,20],[70,20],[30,50],[70,50],[30,80,1],[70,80,1]],7:[[30,18],[70,18],[50,34],[30,50],[70,50],[30,82,1],[70,82,1]],8:[[30,18],[70,18],[50,34],[30,50],[70,50],[50,66,1],[30,82,1],[70,82,1]],9:[[30,16],[70,16],[30,39],[70,39],[50,50],[30,61,1],[70,61,1],[30,84,1],[70,84,1]],10:[[30,15],[70,15],[50,26],[30,41],[70,41],[30,59,1],[70,59,1],[50,74,1],[30,85,1],[70,85,1]]};function eh(e,t){return e===`A`?`<span class="card-ace">${t}</span>`:e===`J`||e===`Q`||e===`K`?`
      <span class="card-court">
        <span class="court-rank">${e}</span>
        <span class="court-suit">${t}</span>
      </span>`:`<span class="card-pips">${($m[e]||[]).map(([e,n,r])=>`<i class="pip${r?` flip`:``}" style="left:${e}%;top:${n}%">${t}</i>`).join(``)}</span>`}function Y(e,t=!1,n=!1,r=null,i=null,a=null,o=!1){let s={H:`♥`,D:`♦`,C:`♣`,S:`♠`}[e.suit];return`
    <div class="${[`card`,e.suit===`H`||e.suit===`D`?`suit-red`:`suit-blue`,`suit-${(e.suit||``).toLowerCase()}`,t?`clickable`:``,o?`starter`:``].filter(Boolean).join(` `)}" ${[r===null?``:`data-index="${r}"`,i?`data-player="${i}"`:``,a?`data-card-action="${a}"`:``,`data-rank="${e.rank}"`,`data-suit="${e.suit}"`].filter(Boolean).join(` `)}>
      <span class="card-corner top-left">
        <span class="corner-rank">${e.rank}</span>
        <span class="corner-suit">${s}</span>
      </span>
      ${eh(e.rank,s)}
      <span class="card-corner bottom-right">
        <span class="corner-rank">${e.rank}</span>
        <span class="corner-suit">${s}</span>
      </span>
    </div>
  `}var th=`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Y2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2FjYmNjY2BjY1xWY2NjXmNgY1lgW1hYY1djW15YX1BeV1pOW09eSVtLWUVWR1ZBVEBXPFMyTjZPMk80UCtJLEYtRS5DJkQfPx0+HDkbNRkxGCkVKRIgFR4QHRAZCxcNDAoPBwsMDwYHBwUDBQUDAgUDAgEBAQEBBAECAgMBAQEDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYWNjY2NjY15jY19jY2NeY2JfY2NdX1lhXV9fYlxhWWJWXVdjVGNVYVFaS1xMX05bQFxJWkJcSFpAWDxSQk42VThQMEsoRipFKUgpRSFAIT4hOx80IywZMhwlGyASIxkjERkNFhAXDw0HDQgLBg4CCQYJAggCCgQFBAMBBAEDAQUBAgEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NiY2NgXmJaY2BjWmBcY1tgW2BcYFlgW2JVYVZjVV9UXlVaSmBNW1FdR1lJVT9YOldCV0FTNlM3UTRJKkksUCxDK0ApOh83IDUeLBwrGiwbJSIqGxsVGxAYEhQNFBAQDQoHDQoNBwoGBgEGAQcDBgEFAgIBBAEHAQQBAgEBAQIBAQEBAQIBAQEBAQEBAQEBAQEBAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2JjYGNiY2BjYmFfY2BjXmNdYltfXGNaY1hjVmNVX1RhVF5NXlJbRVpNVUlZSFZGWT5WP1U3TjxROU44TS9JL0wzPSU/Jz4pOR4yHy8iKh0pHSQYHhsYGBMRFRUSChIMDAoODAwJCwgNBQwECgMIAQkCBAEFAQQBAQEBAQIBAQEEAQQBAQECAQEBAQEBAQEBAQEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY11jY2NiY19jYWBgY19gYGNfY2FhW2JbX15iXF9ZYlRiWF5WYE1hUF1PX0haQl5GVkNbQ1dBVUNZN04+Tj1MOEkuRDFHMkIqPCc8KjsnMiYqHiUdKxUmEyEZIBggCxoQDw4TDhMLCgkKBgYHCAYFAQgGBAEFAQYCAQEEAQIBBAICAQYBAQEBAQEBAQEBAQEBAQEBAQEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2BjYmNeY15jYGNcX2NjXmNcY15jX2JZYVZjWmJYYVRhVmFPYE9iTVxJXU9dRlpKV0JYRVlCUz1TPVA4TDtJN00wQyxCKT4xOjAsKTAjKBwmGyYgIBogGhQXHA8UDxINDwgTCA0HCgcNBAcCCgIGAgYDBgEGAQYBBAEBAQEBBAEBAQEBAQEDAQEBAQEBAQEBAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2FjYWNjY2NjY2NfY2FjY2NiY2BjYmNgY1piXF1bYl9iWGJYYl1jV2BaYVReT2FMXlZdSl1PWUhbS1dGWEFWO1E6UD5ON0k5TjhHMkcyPzBALzopLyQvJywlIiElGh0ZIBsbFBoRHBIPDQ8IEQcNAQsCCwMJBAsDCQIHAQQBBgEEAQQBAQEDAQEBAQEBAQEBAQEBAQEBAQEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2JjY2NjY2NjYmNiY2BjY2NjY2NjXmNfYVxjXGJdY1pjXF5bY1NcWGBaYVNdUF5LXk1YSFpKWUZYSVNFVD9PPFI/TztFOUQxQzY+NkAuOTEuLTIrLCskJiEbHxwhGxoXHBMXDxkREQwTDREHCwYMBQsEDAYKAQkCBgECAQgBBQEGAQIBAQEBAQEBAQEBAQEBAQECAQEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjXWNjY2NjY2NjY2BjY2NjY2NjX2NbY2NjYGNgY1tjXGNeX1piW2NbY1lhWWFZYlJjV15PYVZbVF1TXlBXS1ZEW0hURVFBV0FRP1A6SzpIPEAvPTs/MTctLDEsJy8pKSUpGx0dIBscFRcWFRIUDBEODgsPBgsIEAILBgsBCAEJAgYBCgEFAQIBBAEBAQMBAQEBAQEBAQEBAQEBAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY19jYmFgY2NjX2NdY15jWWNfY1piXWFYY1VjWGBZYFNiU2NOX1FfUlxLWktXSVJGVkNVQk4/RkFPQUs7RzxANz00PjY1KjQtNSInKCsmKR8nGywXIxEfEx4NGAkYCxMKEwgPBwwCCQIPAQwBBQEIAQYBCQEBAQIBAQEEAQEBAQEBAQEBAQEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjX2NjY2NjY2NjY2NjYmNiY2JjYGNeY2FjYmNhY1xiX2FXYllhXGNcYlNfUWJZXltdVF9SW1JcTFlKVFFYS1ZFU0dSSE1ESUBFN0s/Pzw/NTk0NCw1KzAvLicrJiQkKhskFiUSHRIeEBwIEwgXBBcCEwYIAhIBCQEJAQkBCQEQAQMBAwEBAQEBAQEBAQEBAQEBAQEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjXWNhY1xjYmNgY2FhYGNgY2FjXmJfY11iXmNeYmFjV2BaX1NjWGJXX09eVFlRXlNcTltOVVBTTlFETkJQR0lBRkJEOD49NTU2MzMvNTIuKjIjKCIlHikaHxIeEiANGg8YCRoEFwMSBBYDEwMSAQ4BCgEJAQoBCAIFAQQBAwEBAQIBAQEBAQEBAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NhY2NjY2NjY2BjY2NiY2BjY2NfY11jYWNdY2JjXmJfY15gWmJfYVxjWF1ZXVdbWVZYYE9eVVhSVlFZT1NMT0dVSVZJT01MP0lARkVCO0E2QCw8MTYnMCYwJCceKhogFyEVIQggDiAHGQcfBRwIFwIXAxUCEwEQAQsBCgEKAQMBBwEDAQIBAQEBAQEBAQEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYGNjY2FjY2NjY2BjYWNgY11hYmJeY2FjX2NdY19hYGFbYlpcWWBXYVhcVl5cWlZXUVVWVVVTS1VMU0xURUtDTUtJQkY7Pjk/Pzc0ODA2KDgoLSAxICkhJxQqDiMQIAwhBR8HIAIVAxgEGgEVARQBDgEOAQ0BBgEFAQMBAQEBAQEBAQEBAQEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2FjY2NfYGNjY2JiY15jXmNeY2JiW2NjY2BjXmNbYV1eXWBeXlxhW2BfYlpbWl5ZX1NXT1NWVlJUT0xNSkpORkpCSUFHQUE+PzZEMTYuMyoyJjMfMhssEjAULhElDykPKQkgBiADHAMfAhwBFQEUARIBCQEFAQUBBwEFAQEBAgEBAQEBAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NdY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYWJjY2NfY2NjY2NgY2JjY2NhY11jYGJgY19jW2NdX1hiW2BdYldgXF9bYF5fWF9XXFNWVVRUVE9RT1FHS0lMR0xCQj9ENTssQDU7KzkoMx00IjQWMBcsFisUJgwqBicHJgYfAhsCFAIUARYBEgERAQsBBQEEAQEBAQEDAQEBAQEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYGNjY2NjYGNjY2NjYmNfXl9iY2JhY2NjX2NfYmBgYmNeY11iWGBdYFpbW1xZW1NaWlhQVVVVTlBNUVFTSlBIUUBCOUQ/QDZEMUEqOyk5JDshPRc/FjATLQ8tDycILgYlAycDIQMdAR0BEwITAQ0BDAEIAQcBBAECAQEBAwEBAQEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjXmBjY2NgY2JjY2NjY2NjY2NgY2JjYmJhY2NjY2NgYmBhYWFhX2BjX11fYlxhYV9cYFhcW1tcWVNYU1NVWlZZSlhMUU1PRU5FTj1NOEs1Qy0/LUMjPxw4GzYTOxQ4ESwMMQsnCCYIJwQlAiEBIAEZARgDEgELAgcBCAEGAQMBAQEBAQEBAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2BjY2NjY2NjY2NgY2NjY2NiY2NgY2JjY2JjX2NfX1xjX15eYV9bW2FaW1hZV1xYXVRVT1ZUWFNaSVRDSEhLQU82SDtIM0ctRSRCJ0QdPxs7GD4NOQs4Cz0JLQgyBCYDIgQjAxgCHwEQARIBCgEJAQQBBQECAQEBAQEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NgY2NiY2NiY2NjYmNiY2NjY2NhYmNjYGJiYGFjYGFiYV5hXmNfXl5cXFpcW1hdWVhWWFNSS1hNWEVTSFRFTz5OOlIrSi1MKkUlRBxBHEMVPRk+DTwLNgs2CTADMwIlASMCHQEcARICEwIPAgUBBwIFAQMBAQEBAQEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYWNjY2NjYmNjY2NjY2NjY2NiY2BiYmNiX2FgYWNgYWJhXV1fYl9bYFZfW1pWXFxbU1VUVFJTS1hGV0RVRlY3TDNVLkwoTCtPH0YYTBhNE0AMPQw7DD8NNAwsBC8GKAMdASQBGAEQAQkBBgIKAQEBBQEBAQEBAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYWNjY2JjYmJjY15jY2NjY2FiY2NiYmNiYWJgY2FjYWFfXmJhXmBaXlhcWVlTWVRaUFxOWkpXQ1JGU0NXNVc1UilOJ08pTR5KG0wQSxVLDUQKQAo9CTkHNgIvBSQEJwMZBBYDDAQPAQUBBAEBAQEBAQEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NiYmNjY15jYWNiY2JdY2JjYmFgY2FiXGFdYVpcXGFVYFtgVGJSW1RcUltKXUJWP1o6VjRYMlQpVS1OJlEcShpQEVAURQ1DCkEHOgk1CTAJJgQlBSMBFQQTBQwBBQEFAgICAQEBAQEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2JjY2NiY2NjYWNjY2NjY2BhY2NjY2NhY19eYmNfYGFhXGBZX11fWl9TYVRhUl1LX0tdQ1tBXDxZNVozVjFNJlEhUxtSIVYeTxJOEUUKQxBDDjwJOAsxBCUGJwQaBRIEDAEMAggCAgMCAQEBAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NiYmNjY2NiY2NjY2FjX2NcYl5iXWBcX1tiVWFOX1BiSV1MX0JXPF0/YDhZLlkqVCdWHlQdVRlOFVIRUg9JDkYMPgg4BjgHLgQrBhcFEwgKBQgDBQMEAwEBAgEBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NiY2NjY19jY2NgY2BjYWFeYGFiXGBgY11hWFxWY1VgT2JOX0ZeS19CXkNdNV00WC5bIFYmXRpXGlMaVhRKFEoPSA9MBjgMOgQwAisGIgUbBxMHCgcLBAMIAgIBBAEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYGNjY2NjY2NjY2NjY2NjYmJjYmNjY2NiYmJiY2BgXmNgY1pjXWNbYlphWmJUYkhgS2BIXkFiPV1CWzRdLF4nWy9aKlweVh5QHVEYURJLFUkLOws6DTUFKAsjCh0IEAoMBAkDBAQCBQICAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYGNjY2NjY2NjY2JjY2NjYGNjY2NiY2NjYmNhY2FjYmJeY2FiWWNgYltjVmBXYldiUWNMY01hTGJBYTdgOF80YCxdMlklViZbIFQeVxtTGVISRxI/ET8RMg0pCyoOIw4RCA4MDgcFDQECAQMBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYmNdY2BjXWNeY11jWGJZY1djWWNRY09jTGJMYkVgQWA5YT5jL2EyWjJbKF0qXCBZGFgYURZLGUkURw85EjIRJwwfExoTEwkJBgUJBgcBAgEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NiY2NjY2JiY19jX2NfY2BjXGNaY1pjW2NaYFFjTWNLYkZiUWFFYkVhOGE9YDZgMGExVyZcKlokURxOHUwYShVCGDYRORAkHBsTGxMSCwoHBwgEBgEDAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYmNjY2NjY2NgY2NjYGNiY2FjXmNgY19jXGNYY1xjVGJOYlJiUGNMYUtiR19EYUFhN2E7XC9cJ1woWSpXJlMjUCJCGkUdPx0sGy4fIRUgGQ0XDBEGEQQHAgQBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYWNjY2NjY2NiY19jYmNjY19jYWNdY15jXWNaYlljWWNUY1RjUmNJYkxiRWM+YUJePWA/XDRdMVcuUytVKUgoSCRDJjEiMCAfHBceFR4JEwYPBAkBBAEBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2BiYWNaY19jXGNfYFhjVmNWY1djVWNSY1ViTGJIYElfS2JCXT5gOV89WC5VMEs5UidGKUEnNzA2KSUlJSEVIxAaDBMEDQELAQEBY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYmNjY2NjY2NjY2NjYmNjY2FjX2NhY19jYWNaY1tjWmNZY1RjUWJSY1RjS2JPYkhePV9GW0JaQFY5UjtKQEczQjg9NyouJDIXLRInDR4JGgkTAgQBAQFjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjYmNhY2BjY2NgY2FjXmNaY19jW2NaY15jXGNTYFBgT2FVXU1gSVtIWklSRVFCSUJBOD1FLzYrOyAuGSwRJxAbBxgFCQUBAWNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2JjY2NjY2NjYmNjY2FjYmNiY2JjYGNgY1xjXmNiY1tjYGJaYVZjWF9OYlReUFxJWE5YT1dNTUlLTUNHOEQzSSlAIkEZNhAvDCUHFwgOAgEEY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2JjYmNjY2FjY2NjY2NjYmNjY2NjY2NiY2NjYGNhY1xjYWNaY11jW2NdY1tfXmBVYFVdVF1VV1NXUU1ORkpBSDpLK0kjSCRDGzcRKA4XCAsEAQVjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYmNjY2NjYmNiY2FjYmJcY1xgXmBgYVxdW15bXFhXVVVaVFlMWEhVOU46TjBMJ0McNhQxFxkQEA4BDGNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYmNjY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2JjYWNjY2NjYGJiYmFiYV9fXWBdX1pcWl1UXUpfSVhEXTxUM1EuTC4/HzUdIRcPGAIRY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjYWJjY19iX2JiYWFiY11eX2FZYFRiVV5TXE5dRF5AVzxRL0QwODAkKQ0lBBxjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NhY2NjYmNhY2JjYWNhYl1iWmFYYVthVWFUXkxZQ1RFSUNAPCoyGiwSI2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NiY2JjY2NjY2FjY2NdY15jYGJcYltgV1xUWUpRUkBQOUYjSB4/Y2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYmNiY2JjX2JWY1JgR10/VSZOGkQ=`,nh=null;function rh(){if(!nh){let e=atob(th);nh=new Uint8Array(e.length);for(let t=0;t<e.length;t++)nh[t]=e.charCodeAt(t)}return nh}function ih(e,t,n){let r=Math.max(0,Math.min(120,e|0)),i=Math.max(0,Math.min(120,t|0));return e>=121?100:t>=121?0:rh()[(r*121+i)*2+(n?1:0)]}function ah(e,t,n){let r=[],i=U(t),a=ih(e.scores?.[t]||0,e.scores?.[i]||0,e.dealer===t);if(r.push({k:`WIN`,v:`<b class="tel-wp ${t}">${a}%</b>`}),e.phase===`discard`){let i=K(e.hands?.[t]);if(i.length===6){let a=e.dealer===t,o=i.map(e=>e.rank+e.suit).join(``)+(a?`D`:`P`);q._telRankCache.key!==o&&(q._telRankCache={key:o,ranks:Xf(i,a)});let s=q._telRankCache.ranks,c=e=>`${e.rank}${{H:`♥`,D:`♦`,C:`♣`,S:`♠`}[e.suit]}`,l=[...Nf[t]||[]].sort((e,t)=>e-t);if(l.length===2){let e=Zf(i.filter((e,t)=>!l.includes(t)),i);if(r.push({k:`CUT`,v:`${e.min}–${e.max} · avg ${e.avg}`}),r.push({k:`IMPROVE`,v:`${e.cutsThatImprove}/${e.totalCuts} · best ${e.bestCutRanks.slice(0,2).join(`,`)}`}),n===`coach`){let e=s.findIndex(e=>e.discardIndices[0]===l[0]&&e.discardIndices[1]===l[1]);r.push({k:`RANK`,v:e===0?`#1/15 · optimal ✓`:`#${e+1}/15 · best EV ${s[0].netEV}`}),e>0&&r.push({k:`COACH`,v:`toss ${s[0].discardIndices.map(e=>c(i[e])).join(`+`)}`,reco:!0})}}else n===`coach`?r.push({k:`COACH`,v:`toss ${s[0].discardIndices.map(e=>c(i[e])).join(`+`)} · EV ${s[0].netEV}`,reco:!0}):r.push({k:`DISCARD`,v:`select two for read-out`,dim:!0})}}if(e.phase===`play`){let n=K(e.hands?.[t]),i=K(e.pegging?.pile),a=q._spentPiles.flatMap(e=>e.cards),o=[...n,...i,...a];e.starter&&o.push(e.starter);let s=$f(o);r.push({k:`UNSEEN`,v:`5s:${s.fives} · 10s:${s.tens} · A–4:${s.low}`})}return r}function oh(e,t,n){let r=document.getElementById(`tel-box`);if(!r)return;let i=!1;try{i=localStorage.getItem(`cribbage-duo-telbox-min`)===`1`}catch{}let a=ah(e,t,n);r.classList.toggle(`tel-min`,i),r.innerHTML=`
    <div class="tel-box-head" id="tel-box-head">
      <span class="tel-dot ${n}"></span>
      <span class="tel-box-title">TELEMETRY·${n.toUpperCase()}</span>
      <button class="tel-box-min" aria-label="Collapse">${i?`▸`:`▾`}</button>
    </div>
    ${i?``:`<div class="tel-box-body">${a.map(e=>`
      <div class="tel-row${e.reco?` tel-reco`:``}${e.dim?` tel-dim`:``}">
        <span class="tel-k">${e.k}</span><span class="tel-v">${e.v}</span>
      </div>`).join(``)}</div>`}
  `;try{let e=JSON.parse(localStorage.getItem(`cribbage-duo-telbox-pos`)||`null`);e&&typeof e.x==`number`&&(r.style.left=Math.min(Math.max(0,e.x),window.innerWidth-80)+`px`,r.style.top=Math.min(Math.max(0,e.y),window.innerHeight-44)+`px`,r.style.right=`auto`,r.style.bottom=`auto`)}catch{}r.querySelector(`.tel-box-min`)?.addEventListener(`click`,r=>{r.stopPropagation();try{localStorage.setItem(`cribbage-duo-telbox-min`,i?`0`:`1`)}catch{}oh(e,t,n)}),r.querySelector(`#tel-box-head`).addEventListener(`pointerdown`,e=>{if(e.target.closest(`.tel-box-min`))return;let t=r.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top,a=e=>{let a=Math.min(Math.max(0,e.clientX-n),window.innerWidth-t.width),o=Math.min(Math.max(0,e.clientY-i),window.innerHeight-44);r.style.left=a+`px`,r.style.top=o+`px`,r.style.right=`auto`,r.style.bottom=`auto`},o=()=>{document.removeEventListener(`pointermove`,a),document.removeEventListener(`pointerup`,o);try{localStorage.setItem(`cribbage-duo-telbox-pos`,JSON.stringify({x:r.offsetLeft,y:r.offsetTop}))}catch{}};document.addEventListener(`pointermove`,a),document.addEventListener(`pointerup`,o),e.preventDefault()})}function sh(){if(!q._lastGameState)return;let e=Mf(q._lastGameState);e!==`off`&&oh(q._lastGameState,q._player,e)}function ch(e,t){if(e.pegging?.turn!==t)return;let n=K(e.hands?.[t]),r=K(e.pegging?.pile),i=gf(e,t);if(!i.length)return;let a=Qf(i,r,e.pegging?.runningTotal||0,{myHand:n,oppCount:K(e.hands?.[U(t)]).length,starter:e.starter||null}),o=-1/0,s=null;for(let e of a){let t=e.immediate*2.2-e.danger*1.5;t>o&&(o=t,s=e.card.rank+e.card.suit)}for(let e of a){let t=q._app.querySelector(`.hand-cards .card[data-rank="${e.card.rank}"][data-suit="${e.card.suit}"]`);if(!t||t.querySelector(`.tel-badge`))continue;let n=document.createElement(`span`);n.className=`tel-badge`+(e.card.rank+e.card.suit===s?` tel-best`:``),n.textContent=`+${e.immediate}${e.danger>0?` −${e.danger}`:``}`,t.appendChild(n)}}function lh(e,t,n){let r=window.devicePixelRatio||1;e.width=t*r,e.height=n*r,e.style.width=`${t}px`,e.style.height=`${n}px`;let i=e.getContext(`2d`);return i.scale(r,r),i}function uh(e,t,n,r=3){if(!(t.length<2)){if(e.beginPath(),e.strokeStyle=n,e.lineWidth=r,e.lineCap=`round`,e.lineJoin=`round`,t.length===2){e.moveTo(t[0].x,t[0].y),e.lineTo(t[1].x,t[1].y),e.stroke();return}e.moveTo(t[0].x,t[0].y);for(let n=0;n<t.length-1;n++){let r=t[Math.max(n-1,0)],i=t[n],a=t[n+1],o=t[Math.min(n+2,t.length-1)],s=.35,c=i.x+(a.x-r.x)*s,l=i.y+(a.y-r.y)*s,u=a.x-(o.x-i.x)*s,d=a.y-(o.y-i.y)*s;e.bezierCurveTo(c,l,u,d,a.x,a.y)}e.stroke()}}function dh(e,t,n,r=.15,i){if(!(t.length<2)){e.save(),e.globalAlpha=r,e.beginPath(),e.moveTo(t[0].x,i),e.lineTo(t[0].x,t[0].y);for(let n=0;n<t.length-1;n++){let r=t[Math.max(n-1,0)],i=t[n],a=t[n+1],o=t[Math.min(n+2,t.length-1)],s=.35,c=i.x+(a.x-r.x)*s,l=i.y+(a.y-r.y)*s,u=a.x-(o.x-i.x)*s,d=a.y-(o.y-i.y)*s;e.bezierCurveTo(c,l,u,d,a.x,a.y)}e.lineTo(t[t.length-1].x,i),e.closePath(),e.fillStyle=n,e.fill(),e.restore()}}function fh(e,t,n,r=5,i=12){for(let a of t)e.save(),e.globalAlpha=.3,e.beginPath(),e.arc(a.x,a.y,i,0,Math.PI*2),e.fillStyle=n,e.fill(),e.restore(),e.beginPath(),e.arc(a.x,a.y,r,0,Math.PI*2),e.fillStyle=n,e.fill(),e.beginPath(),e.arc(a.x,a.y,r*.4,0,Math.PI*2),e.fillStyle=X.background,e.fill()}var X={spencer:`#4FC3F7`,spencerGlow:`#4FC3F744`,kari:`#FF3B5C`,kariGlow:`#FF3B5C44`,grid:`#ffffff0d`,axis:`#ffffff33`,text:`#8b98a8`,label:`#ccc`,highlight:`#E8A020`,background:`#0d1520`};function ph(){if(typeof window>`u`||!document.documentElement)return;let e=getComputedStyle(document.documentElement),t=(t,n)=>(e.getPropertyValue(t)||``).trim()||n;X.spencer=t(`--cyan`,X.spencer),X.spencerGlow=X.spencer+`44`,X.kari=t(`--pink`,X.kari),X.kariGlow=X.kari+`44`,X.highlight=t(`--amber`,X.highlight),X.background=t(`--bg-mid`,X.background)}function mh(e,t,n,r={}){let i={top:40,right:30,bottom:50,left:55,...r.padding},a=e-i.left-i.right,o=t-i.top-i.bottom,s=n.flat?n:n.flatMap(e=>Array.isArray(e)?e.map(e=>e.y??e):[e.y??e]),c=r.minY??Math.min(0,...s),l=r.maxY??Math.max(...s)*1.1;if(r.maxY==null){let e=r.ySteps??5;l=c+Math.max(1,Math.ceil((l-c)/e))*e}let u=r.xCount??r.xLabels?.length??(Array.isArray(n[0])?n[0].length:n.length);return{pad:i,plotW:a,plotH:o,minY:c,maxY:l,xCount:u,scaleX:e=>i.left+e/Math.max(u-1,1)*a,bandX:e=>i.left+(e+.5)/Math.max(u,1)*a,scaleY:e=>i.top+o-(e-c)/(l-c)*o}}function hh(e,t,n,r,i={}){let{pad:a,plotW:o,plotH:s,minY:c,maxY:l,xCount:u,scaleX:d,scaleY:f}=r,p=i.ySteps??5,m=(l-c)/p;e.strokeStyle=X.grid,e.lineWidth=1,e.font=`12px system-ui, sans-serif`,e.fillStyle=X.text,e.textAlign=`right`,e.textBaseline=`middle`;for(let t=0;t<=p;t++){let n=c+t*m,r=f(n);e.beginPath(),e.moveTo(a.left,r),e.lineTo(a.left+o,r),e.stroke(),!(i.skipMaxLabel&&t===p)&&e.fillText(Math.round(n).toString(),a.left-8,r)}e.textAlign=`center`,e.textBaseline=`top`;let h=i.useBand?r.bandX:d,g=i.xLabels??Array.from({length:u},(e,t)=>t+1);for(let t=0;t<u;t++)e.fillText(g[t].toString(),h(t),a.top+s+8);e.strokeStyle=X.axis,e.lineWidth=1,e.beginPath(),e.moveTo(a.left,a.top),e.lineTo(a.left,a.top+s),e.lineTo(a.left+o,a.top+s),e.stroke(),i.title&&(e.fillStyle=X.label,e.font=`bold 14px system-ui, sans-serif`,e.textAlign=`center`,e.textBaseline=`top`,e.fillText(i.title,t/2,10)),i.xLabel&&(e.fillStyle=X.text,e.font=`12px system-ui, sans-serif`,e.textAlign=`center`,e.textBaseline=`bottom`,e.fillText(i.xLabel,t/2,n-6))}function gh(e,t,n={}){ph();let r=n.width??600,i=n.height??320,a=lh(e,r,i),o=mh(r,i,[...t.spencer||[],...t.kari||[]],n);a.fillStyle=X.background,a.fillRect(0,0,r,i),hh(a,r,i,o,n);for(let[e,n]of[[`spencer`,X.spencer],[`kari`,X.kari]]){let r=t[e];if(!r||!r.length)continue;let i=r.map((e,t)=>({x:o.scaleX(t),y:o.scaleY(e)}));dh(a,i,n,.1,o.pad.top+o.plotH),uh(a,i,n,3),fh(a,i,n,4,10)}xh(a,r,o.pad,n.labels)}function _h(e,t,n={}){ph();let r=n.width??600,i=n.height??320,a=lh(e,r,i),o=mh(r,i,[...t.spencer||[],...t.kari||[]],n);a.fillStyle=X.background,a.fillRect(0,0,r,i),hh(a,r,i,o,{...n,useBand:!0});let s=o.plotW/o.xCount,c=Math.min(s*.32,34);for(let e=0;e<o.xCount;e++){let n=o.bandX(e),r=o.pad.top+o.plotH;for(let[i,[s,l]]of[[`spencer`,X.spencer],[`kari`,X.kari]].entries()){let u=(t[s]||[])[e]??0,d=(u-o.minY)/(o.maxY-o.minY)*o.plotH,f=n-c-4/2+i*(c+4),p=Math.min(4,c/2);bh(a,f,r-d,c,d,p),a.fillStyle=l,a.fill(),u>0&&(a.fillStyle=X.label,a.font=`11px system-ui, sans-serif`,a.textAlign=`center`,a.textBaseline=`bottom`,a.fillText(u.toString(),f+c/2,r-d-4))}}xh(a,r,o.pad,n.labels)}function vh(e,t,n={}){gh(e,t,{...n,maxY:121,skipMaxLabel:!0,title:n.title??`Score Race to 121`,xLabel:n.xLabel??`Round`});let r=n.width??600,i=n.height??320,a=e.getContext(`2d`),o=window.devicePixelRatio||1;a.save(),a.scale(1/o,1/o);let s=mh(r,i,[121],{...n,maxY:121});a.scale(o,o);let c=s.scaleY(121);a.setLineDash([6,4]),a.strokeStyle=X.highlight,a.lineWidth=1.5,a.beginPath(),a.moveTo(s.pad.left,c),a.lineTo(s.pad.left+s.plotW,c),a.stroke(),a.setLineDash([]),a.fillStyle=X.highlight,a.font=`bold 11px system-ui, sans-serif`,a.textAlign=`right`,a.fillText(`121`,s.pad.left-8,c),a.restore()}function yh(e,t,n={}){ph();let r=n.width??640,i=n.height??300,a=lh(e,r,i),o=n.labels??{spencer:`Spencer`,kari:`Kari`},s=[0,...t.diff||[]],c=s.length,l=Math.max(10,...s.map(Math.abs)),u=Math.ceil(l/10)*10,d={top:36,right:24,bottom:36,left:46},f=r-d.left-d.right,p=i-d.top-d.bottom,m=d.top+p/2,h=e=>d.left+e/Math.max(c-1,1)*f,g=e=>m-e/u*(p/2);a.fillStyle=X.background,a.fillRect(0,0,r,i),a.strokeStyle=X.grid,a.lineWidth=1,a.font=`11px system-ui, sans-serif`,a.fillStyle=X.text,a.textAlign=`right`,a.textBaseline=`middle`;for(let e of[-u,-u/2,u/2,u]){let t=g(e);a.beginPath(),a.moveTo(d.left,t),a.lineTo(d.left+f,t),a.stroke(),a.fillText((e>0?`+`:``)+e,d.left-8,t)}a.strokeStyle=X.axis,a.lineWidth=1.5,a.beginPath(),a.moveTo(d.left,m),a.lineTo(d.left+f,m),a.stroke(),a.fillStyle=X.text,a.fillText(`0`,d.left-8,m),a.textAlign=`center`,a.textBaseline=`top`;for(let e=0;e<c;e++)a.fillText(e===0?``:`R`+e,h(e),d.top+p+8);let _=s.map((e,t)=>({x:h(t),y:g(e)}));for(let[e,t,n]of[[X.spencer,d.top-2,m-d.top+2],[X.kari,m,p/2+4]])a.save(),a.beginPath(),a.rect(d.left-6,t,f+12,n),a.clip(),dh(a,_,e,.16,m),uh(a,_,e,2.5),a.restore();for(let e=0;e<c;e++){let t=s[e],n=t>0?X.spencer:t<0?X.kari:X.axis;fh(a,[_[e]],n,4,9)}a.font=`600 11px system-ui, sans-serif`,a.textAlign=`left`,a.textBaseline=`middle`,a.fillStyle=X.spencer,a.fillRect(d.left+2,d.top-16,8,8),a.fillStyle=X.label,a.fillText(o.spencer+` leads`,d.left+15,d.top-12),a.fillStyle=X.kari,a.fillRect(d.left+2,d.top+p+20,8,8),a.fillStyle=X.label,a.fillText(o.kari+` leads`,d.left+15,d.top+p+24);for(let e of t.annotations||[]){if(e.i<1||e.i>=c)continue;let t=h(e.i),n=_[e.i].y;a.strokeStyle=X.highlight,a.lineWidth=2,a.beginPath(),a.arc(t,n,8,0,Math.PI*2),a.stroke();let r=s[e.i]>=0;a.font=`600 11px system-ui, sans-serif`,a.textAlign=`center`,a.textBaseline=r?`bottom`:`top`,a.fillStyle=X.highlight,a.fillText(e.label,t,r?n-12:n+12)}if(e._worm={pad:d,plotW:f,n:c,meta:t.roundsMeta||[],labels:o},!e._wormBound){e._wormBound=!0;let t=()=>{let t=e.parentElement?.querySelector(`.chart-tooltip`);return!t&&e.parentElement&&(t=document.createElement(`div`),t.className=`chart-tooltip`,e.parentElement.appendChild(t)),t};e.addEventListener(`mousemove`,n=>{let r=e._worm;if(!r)return;let i=e.getBoundingClientRect(),a=(n.clientX-i.left)*(parseFloat(e.style.width)/i.width||1),o=Math.round((a-r.pad.left)/r.plotW*(r.n-1)),s=r.meta[o-1],c=t();if(!c)return;if(!s){c.style.opacity=`0`;return}let l=s.spencer-s.kari,u=l>0?r.labels.spencer:l<0?r.labels.kari:`Level`;c.innerHTML=`<strong>Round `+s.round+`</strong> `+r.labels.spencer+` `+s.spencer+` · `+r.labels.kari+` `+s.kari+(l===0?` · level`:` · `+u+` +`+Math.abs(l)),c.style.opacity=`1`,c.style.left=Math.min(n.clientX-i.left+14,i.width-170)+`px`,c.style.top=n.clientY-i.top-34+`px`}),e.addEventListener(`mouseleave`,()=>{let t=e.parentElement?.querySelector(`.chart-tooltip`);t&&(t.style.opacity=`0`)})}}function bh(e,t,n,r,i,a){i<=0||(a=Math.min(a,i/2,r/2),e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+r-a,n),e.arcTo(t+r,n,t+r,n+a,a),e.lineTo(t+r,n+i),e.lineTo(t,n+i),e.lineTo(t,n+a),e.arcTo(t,n,t+a,n,a),e.closePath())}function xh(e,t,n,r){let i=r?.spencer??`Spencer`,a=r?.kari??`Kari`,o=n.top-20;e.font=`12px system-ui, sans-serif`,e.fillStyle=X.spencer,e.fillRect(t/2-90,o-5,12,12),e.fillStyle=X.label,e.textAlign=`left`,e.fillText(i,t/2-74,o+5),e.fillStyle=X.kari,e.fillRect(t/2+20,o-5,12,12),e.fillStyle=X.label,e.fillText(a,t/2+36,o+5)}var Sh={"Avg Hand":`Average points per counted hand this game.  6-8 is solid; the all-time average in cribbage is about 8.`,"High Hand":`The best single hand either of you counted this game.`,"Big Hands (20+)":`Hands worth 20 points or more.  These are rare — a couple per game is a hot night.`,"Pegging Pts":`Points scored during the card-by-card play: 15s, 31s, pairs, runs, Gos, and last card.`,"Avg Crib":`Average points per crib, counted only on the rounds you were dealer.`,"Zero Hands":`Hands that scored absolutely nothing.  It happens to everyone.`,"Optimal discards":`How often the four cards kept were the mathematically best keep out of the 15 possible choices, judged by expected points across every card that could be cut.`,"Avg discard rank (of 15)":`Every deal has 15 possible ways to discard, ranked #1 (best) to #15 (worst) by expected points.  This is the average rank of the choices actually made.  #1.0 would be perfect play.`,"Points left on table":`Expected points given away by keeping or playing something other than the best option, summed over the whole game.  Lower is better; 0 is flawless.`,"Pegging efficiency":`Of the pegging points that were actually available on your turns, the percentage you took.`,"Pegging points missed":`Points passed up during pegging — times a different card in hand would have scored more.`,"Starter help":`How many points the cut card added to the hand compared to an average cut.  Positive means the deck was kind, negative means it robbed you.  Pure luck — nobody controls the cut.`};function Ch(e){return Sh[e]?`<button class="tip-btn" aria-label="Explain ${e}">?</button>`:``}function wh(e){return Sh[e]?`<div class="tip-pop">${Sh[e]}</div>`:``}function Th(e,t,n){let r=e.winner,i=U(r),a=e.scores[r]-e.scores[i],o=e.scores[i]<=90,s=e.scores[i]<=60,c=r===t,l=``;s?l=`DOUBLE SKUNK!`:o?l=`SKUNKED!`:a<=5?l=`A nail-biter!`:a>=30&&(l=`Dominant performance!`);let u=r===`spencer`?[`#4FC3F7`,`#F5C842`,`#E8F4FD`,`#2f6fec`]:[`#FF3B5C`,`#F5C842`,`#FFE8ED`,`#FF6B9D`];return`
    <div class="game-over">
      <div class="go-confetti">${Array.from({length:30},(e,t)=>{let n=u[t%u.length],r=(t*37+11)%100,i=t*13%22/10,a=2.8+t*7%15/10,o=6+t%4*2,s=t*47%360;return`<i class="confetti" style="left:${r}%;animation-delay:${i}s;animation-duration:${a}s;background:${n};width:${o}px;height:${Math.round(o*.45)}px;--rot:${s}deg"></i>`}).join(``)}</div>
      <div class="go-podium">
        <div class="go-loser-ava">${Hp(i,66)}</div>
        <div class="go-winner-ava">${Gp(r,116)}</div>
        <div class="go-podium-spacer"></div>
      </div>
      <h1>${c?`You Win!`:`${$(r)} Wins!`}</h1>
      <div class="final-score">${e.scores[r]} – ${e.scores[i]}</div>
      ${l?`<p class="go-flavor ${s||o?`go-skunk`:``}">${l}</p>`:``}
      <div class="actions mt-3">
        <button class="btn btn-primary" data-action="post-game-analytics">Game Breakdown</button>
        ${q._series?`<button class="btn" data-action="next-series-game">Next Game</button>`:``}
        <button class="btn" data-action="main-menu">Main Menu</button>
      </div>
    </div>
  `}async function Eh(e){q._currentView=`analytics`,q._app.innerHTML=`<div class="waiting"><div class="spinner"></div>Crunching the numbers...</div>`;let t=q._lastLocalState?.gameId;if(!t){Q();return}await yf();let n=Hd()?pm(q._lastLocalState?.gameSummary,e):await fm(t),r=e.winner,i=U(r),a=n.summary,o=e.scores[r],s=e.scores[i],c=o-s,l=s<=90,u=s<=60,d=``;u?d=`Double Skunk!`:l?d=`Skunked!`:c<=5?d=`A nail-biter`:c>=30&&(d=`Dominant`);let f=q._lastLocalState?.gameSummary||{},p=f.highestHandOverall,m=f.highestCribOverall,h=a.spencer?.handScores||[],g=a.kari?.handScores||[],_=e=>e.filter(e=>e>=20).length,ee=Ah(n.roundStats,a,r);Nh(n.roundStats,e.scores);let te=await Ph(t,r,e.scores),ne={};try{ne=await Pd()||{}}catch{ne={}}Of(`
    <div class="analytics">
      <!-- Big celebratory headline -->
      <div class="winner-banner ${r}">
        <div class="winner-banner-line">
          <span class="winner-name">${$(r)}</span>
          <span class="winner-verb">WINS</span>
        </div>
        <div class="winner-score-line">
          <span class="winner-score-win ${r}">${o}</span>
          <span class="winner-score-sep">–</span>
          <span class="winner-score-lose">${s}</span>
        </div>
        ${d?`<div class="winner-flavor">${d}</div>`:``}
      </div>

      ${Rh(ne,t)}

      ${Ih(te,r)}
      ${(()=>{let e=q._lastLocalState?.gameSummary?.telemetryUsed||{},t=[`spencer`,`kari`].filter(t=>e[t]===`coach`);return t.length?`<p class="tel-note tel-note-center">Coach telemetry was on for ${t.map($).join(` and `)} — this game's skill metrics were not added to the lifetime ledger.</p>`:``})()}

      <div class="chart-container glass">
        <h3>The Story of the Game</h3>
        <canvas id="chart-worm"></canvas>
        <p class="chart-caption">The worm is the score gap after every scoring moment.
          <span class="vd-name spencer">${$(`spencer`)}</span> rides above the line,
          <span class="vd-name kari">${$(`kari`)}</span> below.
          Flags mark hands of 16 or more.</p>
      </div>

      <!-- Quick stats (3-column grid on desktop) -->
      <div class="bd-stats-grid">
        ${Oh(`Avg Hand`,a.spencer?.avgHandScore,a.kari?.avgHandScore)}
        ${Oh(`High Hand`,a.spencer?.highHand,a.kari?.highHand)}
        ${Oh(`Big Hands (20+)`,_(h),_(g))}
        ${Oh(`Pegging Pts`,a.spencer?.totalPegging,a.kari?.totalPegging)}
        ${Oh(`Avg Crib`,a.spencer?.avgCribScore,a.kari?.avgCribScore)}
        ${Oh(`Zero Hands`,a.spencer?.zeroHands??0,a.kari?.zeroHands??0)}
      </div>

      <!-- Best hand / crib with actual cards displayed -->
      ${p||m?`
        <div class="bd-best-section">
          ${p?kh(`Best Hand`,p):``}
          ${m?kh(`Best Crib`,m):``}
        </div>
      `:``}

      <!-- Insights -->
      ${ee.length?`
        <div class="bd-insights glass">
          ${ee.map(e=>`<div class="bd-insight"><span class="bd-insight-dot ${e.tone||``}"></span><span class="bd-insight-text">${e.text}</span></div>`).join(``)}
        </div>
      `:``}

      <!-- Charts -->
      <div class="chart-container glass">
        <canvas id="chart-score-race"></canvas>
      </div>

      <div class="chart-container glass">
        <h3>Hand Scores by Round</h3>
        <canvas id="chart-hand-rounds"></canvas>
      </div>

      <div class="chart-container glass">
        <h3>Points by Round</h3>
        <canvas id="chart-round-points"></canvas>
      </div>

      ${zh(ne)}

      <div class="actions mt-2">
        ${q._series?`<button class="btn btn-primary" data-action="next-series-game">Next Game</button>`:``}
        <button class="btn btn-primary" data-action="play-again">Play Again</button>
        <button class="btn" data-action="main-menu">Main Menu</button>
      </div>
    </div>
  `),jh(n,e),Mh(e),setTimeout(()=>{let e=document.querySelector(`.winner-score-win`),t=document.querySelector(`.winner-score-lose`);e&&Dh(e,0,o,900),t&&Dh(t,0,s,900)},250)}function Dh(e,t,n,r){if(!e)return;let i=performance.now(),a=e=>1-(1-e)**3;function o(s){let c=Math.min(1,(s-i)/r);e.textContent=Math.round(t+(n-t)*a(c)),c<1?requestAnimationFrame(o):e.textContent=n}requestAnimationFrame(o)}function Oh(e,t,n){return`
    <div class="stat-card glass${Sh[e]?` has-tip`:``}">
      <div class="stat-label">${e}${Ch(e)}</div>
      <div class="stat-row"><span class="stat-who spencer">${$(`spencer`)}</span><span class="stat-value spencer">${t??`-`}</span></div>
      <div class="stat-row"><span class="stat-who kari">${$(`kari`)}</span><span class="stat-value kari">${n??`-`}</span></div>
      ${wh(e)}
    </div>
  `}function kh(e,t){let n=e=>e?typeof e==`object`?e:{rank:e.slice(0,-1),suit:e.slice(-1)}:null,r=t.hand||t.crib,i=(Array.isArray(r)?r:Object.values(r||{})).map(n).filter(Boolean),a=n(t.starter);return`
    <div class="bd-best-card glass">
      <div class="bd-best-header">
        <span class="bd-best-label">${e}</span>
        <span class="bd-best-who text-${t.player===`spencer`?`cyan`:`pink`}">${$(t.player)}</span>
        <span class="bd-best-pts">${t.points}</span>
      </div>
      <div class="bd-best-cards">
        ${i.map(e=>Y(e,!1)).join(``)}
        ${a?`<div class="bd-best-starter-sep"></div>${Y(a,!1,!1,null,null,null,!0)}`:``}
      </div>
    </div>
  `}function Ah(e,t,n){let r=[],i=e||[];if(i.length===0)return r;let a={round:0,who:null,margin:0};for(let e of i){let t=(e.hands?.spencer||0)+(e.pegging?.spencer||0)+(e.crib?.player===`spencer`?e.crib.points:0),n=(e.hands?.kari||0)+(e.pegging?.kari||0)+(e.crib?.player===`kari`?e.crib.points:0),r=Math.abs(t-n);r>a.margin&&(a={round:e.round,who:t>n?`spencer`:`kari`,margin:r,sPts:t,kPts:n})}if(a.margin>=6&&r.push({text:`Biggest swing: <strong>Round ${a.round}</strong> — ${$(a.who)} +${a.margin}.`,tone:a.who===n?`positive`:`neutral`}),i.length>=3){let e=i.slice(-3),t=0,a=0;for(let n of e)t+=(n.hands?.spencer||0)+(n.pegging?.spencer||0)+(n.crib?.player===`spencer`?n.crib.points:0),a+=(n.hands?.kari||0)+(n.pegging?.kari||0)+(n.crib?.player===`kari`?n.crib.points:0);let o=t>a?`spencer`:`kari`,s=Math.max(t,a),c=Math.min(t,a);s-c>=6&&r.push({text:`Closed strong: <strong>${$(o)}</strong> took ${s} of the last 3 rounds' points (vs ${c}).`,tone:o===n?`positive`:`neutral`})}let o=parseFloat(t.spencer?.avgCribScore)||0,s=parseFloat(t.kari?.avgCribScore)||0;if(Math.abs(o-s)>=1.5){let e=o>s?`spencer`:`kari`;r.push({text:`${$(e)}'s crib outpointed (<strong>${(o>s?o:s).toFixed(1)}</strong> vs ${(o>s?s:o).toFixed(1)} avg).`,tone:`neutral`})}return r.slice(0,3)}function jh(e,t){let n={spencer:$(`spencer`),kari:$(`kari`)},r=e=>{let t=e.parentElement?e.parentElement.clientWidth-40:600;return Math.max(320,Math.min(t,820))},i=document.getElementById(`chart-worm`);i&&e.roundStats?.length&&yh(i,Nh(e.roundStats,t.scores),{width:r(i),height:300,labels:n});let a=document.getElementById(`chart-hand-rounds`);a&&e.roundStats?.length&&_h(a,{spencer:e.roundStats.map(e=>e.hands?.spencer??0),kari:e.roundStats.map(e=>e.hands?.kari??0)},{width:r(a),height:280,xLabels:e.roundStats.map(e=>e.round),xLabel:`Round`,title:``,labels:n});let o=document.getElementById(`chart-score-race`);if(o&&e.roundStats){let t=e.roundStats,i=0,a=0,s=[0],c=[0];for(let e of t)i+=(e.hands?.spencer||0)+(e.pegging?.spencer||0)+(e.crib?.player===`spencer`?e.crib.points:0),a+=(e.hands?.kari||0)+(e.pegging?.kari||0)+(e.crib?.player===`kari`?e.crib.points:0),s.push(i),c.push(a);vh(o,{spencer:s,kari:c},{width:r(o),height:300,xLabel:`Round`,xLabels:[`Start`,...t.map(e=>e.round)],title:``,labels:n})}let s=document.getElementById(`chart-round-points`);if(s&&e.roundStats?.length>0){let t=e.roundStats;_h(s,{spencer:t.map(e=>(e.hands?.spencer||0)+(e.pegging?.spencer||0)+(e.crib?.player===`spencer`?e.crib.points:0)),kari:t.map(e=>(e.hands?.kari||0)+(e.pegging?.kari||0)+(e.crib?.player===`kari`?e.crib.points:0))},{width:r(s),height:280,title:``,xLabel:`Round`,xLabels:t.map(e=>e.round),labels:n})}}function Mh(e){q._app.querySelectorAll(`.tip-btn`).forEach(e=>e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.closest(`.has-tip`);if(!n)return;let r=n.classList.contains(`tip-open`);q._app.querySelectorAll(`.has-tip.tip-open`).forEach(e=>e.classList.remove(`tip-open`)),r||n.classList.add(`tip-open`)})),q._app.querySelectorAll(`[data-action="next-series-game"]`).forEach(t=>t.addEventListener(`click`,()=>ag(e))),q._app.querySelectorAll(`[data-action="play-again"]`).forEach(e=>e.addEventListener(`click`,async()=>{q._unsubscribe&&=(q._unsubscribe(),null);let e=Hd(),t=q._series?.type||null;await id(q._lastLocalState?.gameId),_p(),q._series=null,e?await vg():t?await yg(t):await _g()})),q._app.querySelectorAll(`[data-action="main-menu"]`).forEach(e=>e.addEventListener(`click`,async()=>{q._unsubscribe&&=(q._unsubscribe(),null),_p(),await id(q._lastLocalState?.gameId),Q()}))}function Nh(e,t){let n=0,r=0,i=[],a=[];for(let t of e)n+=(t.hands?.spencer||0)+(t.pegging?.spencer||0)+(t.crib?.player===`spencer`&&t.crib.points||0),r+=(t.hands?.kari||0)+(t.pegging?.kari||0)+(t.crib?.player===`kari`&&t.crib.points||0),i.push(n-r),a.push({round:t.round,spencer:n,kari:r});if(t&&a.length){let o=a.length-1;a[o]={round:e[o].round,spencer:t.spencer??n,kari:t.kari??r},i[o]=a[o].spencer-a[o].kari}let o=[];return e.forEach((e,t)=>{for(let n of[`spencer`,`kari`]){let r=e.hands?.[n]||0;r>=16&&o.push({i:t+1,pts:r,pl:n})}}),{diff:i,roundsMeta:a,annotations:o.sort((e,t)=>t.pts-e.pts).slice(0,4).map(e=>({i:e.i,label:`${$(e.pl).charAt(0)} ${e.pts}`,tone:e.pl}))}}async function Ph(e,t,n){let r={discard:null,pegging:null,luck:null,localLeft:null,sentence:``},i=q._lastLocalState?.gameSummary;if(!Hd()&&e)try{let[t,n,i]=await Promise.all([Md(e),Nd(e),Ed(e)]);if(t.length){let e={spencer:{n:0,opt:0,rankSum:0,left:0},kari:{n:0,opt:0,rankSum:0,left:0}};for(let n of t){let t=e[n.player];t&&(t.n++,n.wasOptimal&&t.opt++,t.rankSum+=n.discardRank||0,t.left+=n.pointsLeftOnTable||0)}(e.spencer.n||e.kari.n)&&(r.discard=e)}n&&(n.spencer?.plays||n.kari?.plays)&&(r.pegging=n);let a={spencer:0,kari:0,n:0};for(let e of i)e.starterHelpedSpencer!==void 0&&(a.spencer+=e.starterHelpedSpencer||0,a.kari+=e.starterHelpedKari||0,a.n++);a.n&&(r.luck=a)}catch{}return!r.discard&&i?.pointsLeftOnTable&&(r.localLeft=i.pointsLeftOnTable),r.sentence=Fh(r,t,n),r}function Fh(e,t,n){let r=U(t),i=$(t),a=$(r),o=[`${i} wins ${n[t]}–${n[r]}.`],s=0,c=0;if(e.discard){let n=e.discard[t],c=e.discard[r];n?.n&&c?.n&&(o.push(`Discards: ${i} optimal ${n.opt}/${n.n}, ${a} ${c.opt}/${c.n}.`),s+=c.left-n.left)}else if(e.localLeft){let n=e.localLeft[t]??0,c=e.localLeft[r]??0;o.push(`Points left on the table: ${i} ${n.toFixed(1)}, ${a} ${c.toFixed(1)}.`),s+=c-n}if(e.pegging){let n=e.pegging[t],i=e.pegging[r];n&&i&&(s+=(i.missedPoints||0)-(n.missedPoints||0))}return e.luck&&(c=t===`spencer`?e.luck.spencer-e.luck.kari:e.luck.kari-e.luck.spencer,Math.abs(c)>=1?o.push(`Starter cuts favored ${c>0?i:a} by ${Math.abs(c).toFixed(0)}.`):o.push(`Starter cuts were even.`)),{facts:o,call:s>=2&&s>=c?`Earned`:c>=2&&c>s?`The Deck Helped`:`Split Decision`}}function Ih(e,t){let n=[],r=(e,t,n,r=``)=>`
    <div class="vd-row${Sh[e]?` has-tip`:``}">
      <span class="vd-val spencer">${t}</span>
      <span class="vd-label">${e}${Ch(e)}${r?`<span class="vd-hint">${r}</span>`:``}</span>
      <span class="vd-val kari">${n}</span>
      ${wh(e)}
    </div>`;if(e.discard){let t=e.discard.spencer,i=e.discard.kari,a=e=>e.n?Math.round(e.opt/e.n*100)+`%`:`—`,o=e=>e.n?`#`+(e.rankSum/e.n).toFixed(1):`—`;n.push(r(`Optimal discards`,a(t),a(i),`skill`)),n.push(r(`Avg discard rank (of 15)`,o(t),o(i),`skill`)),n.push(r(`Points left on table`,t.left.toFixed(1),i.left.toFixed(1),`skill`))}else e.localLeft&&n.push(r(`Points left on table`,(e.localLeft.spencer??0).toFixed(1),(e.localLeft.kari??0).toFixed(1),`skill`));if(e.pegging){let t=e.pegging.spencer,i=e.pegging.kari;n.push(r(`Pegging efficiency`,t.efficiency+`%`,i.efficiency+`%`,`skill`)),n.push(r(`Pegging points missed`,t.missedPoints,i.missedPoints,`skill`))}if(e.luck&&n.push(r(`Starter help`,(e.luck.spencer>=0?`+`:``)+e.luck.spencer.toFixed(0),(e.luck.kari>=0?`+`:``)+e.luck.kari.toFixed(0),`luck`)),!n.length&&!e.sentence)return``;let i=e=>e.replaceAll($(`spencer`),`<span class="vd-name spencer">${$(`spencer`)}</span>`).replaceAll($(`kari`),`<span class="vd-name kari">${$(`kari`)}</span>`);return`
    <div class="bd-verdict glass">
      <div class="vd-head">
        <span class="vd-player spencer">${$(`spencer`)}</span>
        <h3>Skill vs Luck</h3>
        <span class="vd-player kari">${$(`kari`)}</span>
      </div>
      ${n.join(``)}
      <div class="vd-callout">Verdict: ${e.sentence.call}</div>
      ${e.sentence.facts.slice(1).map(e=>`<div class="vd-fact">${i(e)}</div>`).join(``)}
    </div>`}var Lh={highestHand:{icon:`🃏`,label:`Highest Hand`,fmt:e=>`${e.points} pts`},highestCrib:{icon:`🧺`,label:`Highest Crib`,fmt:e=>`${e.points} pts`},biggestComeback:{icon:`📈`,label:`Biggest Comeback`,fmt:e=>`\u2212${e.deficit} down`},fastestWin:{icon:`⚡`,label:`Fastest Win`,fmt:e=>`${e.rounds} rounds`},mostPeggingInRound:{icon:`🎯`,label:`Most Pegging, 1 Rd`,fmt:e=>`${e.points} pts`},highestRoundTotal:{icon:`🔥`,label:`Biggest Round`,fmt:e=>`${e.points} pts`},biggestBlowout:{icon:`💥`,label:`Biggest Blowout`,fmt:e=>`by ${e.margin}`},mostLeadChanges:{icon:`🔁`,label:`Most Lead Changes`,fmt:e=>`${e.count}`},longestGame:{icon:`⏳`,label:`Longest Game`,fmt:e=>`${e.rounds} rounds`},mostZeroHands:{icon:`🧊`,label:`Most Zero Hands`,fmt:e=>`${e.count}`}};function Rh(e,t){if(!e||!t)return``;let n=Object.entries(Lh).filter(([n])=>e[n]&&e[n].gameId===t).map(([t,n])=>{let r=e[t],i;try{i=n.fmt(r)}catch{i=``}return`<div class="fresh-record"><span class="fresh-icon">${n.icon}</span><span class="fresh-text">New all-time record &mdash; <strong>${n.label}</strong>: ${i}${r.player?` (${$(r.player)})`:``}</span></div>`});return n.length?`<div class="fresh-records glass">${n.join(``)}</div>`:``}function zh(e){let t=Object.entries(Lh).filter(([t])=>e[t]).map(([t,n])=>{let r=e[t],i;try{i=n.fmt(r)}catch{i=``}let a=r.player||r.winner;return`
        <div class="award-card">
          <div class="award-icon">${n.icon}</div>
          <div class="award-title">${n.label}</div>
          <div class="award-value">${i}</div>
          ${a?`<div class="award-holder ${a}">${$(a)}</div>`:``}
        </div>`});return t.length?`
    <div class="records-wall glass">
      <h3>All-Time Records</h3>
      <div class="awards">${t.join(``)}</div>
    </div>`:``}async function Bh(){if(q._currentView=`analytics`,q._app.innerHTML=`<div class="waiting"><div class="spinner"></div>Loading stats...</div>`,q._isGhost){let e=await Td(`ghost`)||{},t=e.wins||0,n=e.losses||0,r=t+n;q._app.innerHTML=`
      <div class="analytics ghost-dash">
        <h2>Ghost vs Computer</h2>
        <p class="gd-sub">${t}-${n} ${t===n?`series tied`:t>n?`Ghost leads`:`Computer leads`}</p>

        <div class="gd-hero">
          ${Hh(`Record`,`${t}W-${n}L`)}
          ${Hh(`Win Rate`,r>0?(t/r*100).toFixed(0)+`%`:`-`)}
          ${Hh(`Avg Score`,e.avgPointsPerGame||`-`)}
        </div>

        <div class="gd-card glass gd-solo">
          ${Z(`High Score`,e.highestGameScore||`-`)}
          ${Z(`Best Hand`,e.highestSingleHand===999?`-`:e.highestSingleHand||`-`)}
          ${Z(`Skunks Dealt`,e.skunksDealt||0)}
          ${Z(`Skunks Received`,e.skunksReceived||0)}
        </div>

        <div class="actions mt-2">
          <button class="btn" data-action="main-menu">Main Menu</button>
        </div>
      </div>
    `}else{let e=await jd();q._app.innerHTML=`
      <div class="analytics">
        <h2>Head to Head</h2>
        <p class="text-center text-muted mb-3">${e.seriesScore||`0-0`} ${e.tied?`(Tied!)`:`(${e.spencerLeads?`Spencer`:`Kari`} leads)`}</p>

        <div class="h2h glass">
          ${Vh(`Games`,e.spencer?.gamesPlayed,e.kari?.gamesPlayed)}
          ${Vh(`Wins`,e.spencer?.wins,e.kari?.wins)}
          ${Vh(`Win Rate`,(e.spencer?.winRate??0)+`%`,(e.kari?.winRate??0)+`%`)}
          ${Vh(`Avg Pts`,e.spencer?.avgPointsPerGame,e.kari?.avgPointsPerGame)}
          ${Vh(`High Score`,e.spencer?.highestGameScore,e.kari?.highestGameScore)}
          ${Vh(`Biggest Win`,e.spencer?.biggestWinMargin,e.kari?.biggestWinMargin)}
          ${Vh(`Win Streak`,e.spencer?.longestWinStreak,e.kari?.longestWinStreak)}
          ${Vh(`Skunks`,e.spencer?.skunksDealt,e.kari?.skunksDealt)}
        </div>

        <div class="actions mt-2">
          <button class="btn" data-action="main-menu">Main Menu</button>
        </div>
      </div>
    `}q._app.querySelectorAll(`[data-action="main-menu"]`).forEach(e=>e.addEventListener(`click`,()=>Q()))}function Vh(e,t,n){return`
    <div class="h2h-row">
      <span class="h2h-val">${t??`-`}</span>
      <span class="h2h-label">${e}</span>
      <span class="h2h-val">${n??`-`}</span>
    </div>
  `}function Hh(e,t){return`
    <div class="gd-hero-tile glass">
      <span class="gd-hero-val">${t??`-`}</span>
      <span class="gd-hero-label">${e}</span>
    </div>
  `}function Z(e,t){return`
    <div class="gd-row">
      <span class="gd-row-label">${e}</span>
      <span class="gd-row-val">${t??`-`}</span>
    </div>
  `}async function Uh(){if(q._currentView=`analytics`,q._app.innerHTML=`<div class="waiting"><div class="spinner"></div>Loading dashboard...</div>`,q._isGhost){await Wh();return}let[e,t,n,r,i,a,o,s]=await Promise.all([Td(`spencer`),Td(`kari`),Td(`ghost`),Pd(),Fd(`spencer`),Fd(`kari`),Ld(`spencer`,10),Ld(`kari`,10)]),c=e=>{if(!e.games||e.games.length===0)return{score:`-`,winRate:`-`};let t=e.games.map(e=>e.score),n=e.games.filter(e=>e.won).length;return{score:(t.reduce((e,t)=>e+t,0)/t.length).toFixed(0),winRate:(n/e.games.length*100).toFixed(0)+`%`,games:e.games.length}},l=c(o),u=c(s),d=(e,t,n)=>`
    <div class="dash-stat">
      <span class="dash-val spencer">${t??`-`}</span>
      <span class="dash-label">${e}</span>
      <span class="dash-val kari">${n??`-`}</span>
    </div>
  `,f=(e,t)=>t?`
      <div class="dash-record">
        <span class="dash-record-label">${e}</span>
        <span class="dash-record-val">${t.points||t.margin||t.rounds||t.count||`-`}</span>
        <span class="dash-record-who">${t.winner||t.player||``}</span>
      </div>
    `:``;q._app.innerHTML=`
    <div class="analytics stats-dashboard">
      <h2>Stats Dashboard</h2>

      <!-- Overview -->
      <div class="dash-section glass">
        <h3>Overview</h3>
        <div class="dash-header-row">
          <span class="dash-player-label spencer">Spencer</span>
          <span></span>
          <span class="dash-player-label kari">Kari</span>
        </div>
        ${d(`Record`,`${e.wins||0}W-${e.losses||0}L`,`${t.wins||0}W-${t.losses||0}L`)}
        ${d(`Win Rate`,e.winRate?e.winRate+`%`:`-`,t.winRate?t.winRate+`%`:`-`)}
        ${d(`Avg Score`,e.avgPointsPerGame||`-`,t.avgPointsPerGame||`-`)}
        ${d(`Win Streak`,i.currentWinStreak||0,a.currentWinStreak||0)}
        ${d(`Best Streak`,i.longestWinStreak||0,a.longestWinStreak||0)}
      </div>

      <!-- Hands -->
      <div class="dash-section glass">
        <h3>Hand Scoring</h3>
        <div class="dash-header-row">
          <span class="dash-player-label spencer">Spencer</span>
          <span></span>
          <span class="dash-player-label kari">Kari</span>
        </div>
        ${d(`Hands Played`,e.handsPlayed||0,t.handsPlayed||0)}
        ${d(`Avg Hand`,e.handsPlayed>0?(e.totalHandPoints/e.handsPlayed).toFixed(1):`-`,t.handsPlayed>0?(t.totalHandPoints/t.handsPlayed).toFixed(1):`-`)}
        ${d(`Best Hand`,e.highestSingleHand===999?`-`:e.highestSingleHand||0,t.highestSingleHand===999?`-`:t.highestSingleHand||0)}
        ${d(`Zero Hands`,e.zeroHandCount||0,t.zeroHandCount||0)}
        ${d(`20+ Hands`,e.twentyPlusHandCount||0,t.twentyPlusHandCount||0)}
      </div>

      <!-- Pegging -->
      <div class="dash-section glass">
        <h3>Pegging</h3>
        <div class="dash-header-row">
          <span class="dash-player-label spencer">Spencer</span>
          <span></span>
          <span class="dash-player-label kari">Kari</span>
        </div>
        ${d(`Total Peg Pts`,e.totalPeggingPoints||0,t.totalPeggingPoints||0)}
        ${d(`Cards Played`,e.totalCardsPlayed||0,t.totalCardsPlayed||0)}
        ${d(`Avg Per Card`,e.totalCardsPlayed>0?(e.totalPeggingPoints/e.totalCardsPlayed).toFixed(2):`-`,t.totalCardsPlayed>0?(t.totalPeggingPoints/t.totalCardsPlayed).toFixed(2):`-`)}
        ${d(`Peg 15s`,e.pegFifteens||0,t.pegFifteens||0)}
        ${d(`Peg 31s`,e.pegThirtyOnes||0,t.pegThirtyOnes||0)}
        ${d(`Peg Pairs`,e.pegPairs||0,t.pegPairs||0)}
      </div>

      <!-- Crib -->
      <div class="dash-section glass">
        <h3>Crib</h3>
        <div class="dash-header-row">
          <span class="dash-player-label spencer">Spencer</span>
          <span></span>
          <span class="dash-player-label kari">Kari</span>
        </div>
        ${d(`Cribs Played`,e.cribsPlayed||0,t.cribsPlayed||0)}
        ${d(`Avg Crib`,e.cribsPlayed>0?(e.totalCribPoints/e.cribsPlayed).toFixed(1):`-`,t.cribsPlayed>0?(t.totalCribPoints/t.cribsPlayed).toFixed(1):`-`)}
        ${d(`Best Crib`,e.highestCrib===999?`-`:e.highestCrib||0,t.highestCrib===999?`-`:t.highestCrib||0)}
        ${d(`Zero Cribs`,e.zeroCribCount||0,t.zeroCribCount||0)}
      </div>

      <!-- Efficiency -->
      <div class="dash-section glass">
        <h3>Play Quality</h3>
        <div class="dash-header-row">
          <span class="dash-player-label spencer">Spencer</span>
          <span></span>
          <span class="dash-player-label kari">Kari</span>
        </div>
        ${d(`Pts Left on Table`,(e.totalPointsLeftOnTable||0).toFixed(1),(t.totalPointsLeftOnTable||0).toFixed(1))}
        ${d(`Optimal Discards`,e.totalOptimalDiscards||0,t.totalOptimalDiscards||0)}
        ${d(`Skunks Dealt`,e.skunksDealt||0,t.skunksDealt||0)}
        ${d(`Skunks Received`,e.skunksReceived||0,t.skunksReceived||0)}
      </div>

      <!-- Recent Form -->
      <div class="dash-section glass">
        <h3>Recent Form (Last ${l.games||10} Games)</h3>
        <div class="dash-header-row">
          <span class="dash-player-label spencer">Spencer</span>
          <span></span>
          <span class="dash-player-label kari">Kari</span>
        </div>
        ${d(`Win Rate`,l.winRate,u.winRate)}
        ${d(`Avg Score`,l.score,u.score)}
      </div>

      <!-- Records -->
      ${r.highestHand||r.biggestBlowout||r.fastestWin?`
        <div class="dash-section glass">
          <h3>All-Time Records</h3>
          <div class="dash-records-grid">
            ${f(`Highest Hand`,r.highestHand)}
            ${f(`Highest Crib`,r.highestCrib)}
            ${f(`Biggest Blowout`,r.biggestBlowout)}
            ${f(`Fastest Win`,r.fastestWin)}
            ${f(`Longest Game`,r.longestGame)}
            ${f(`Most Lead Changes`,r.mostLeadChanges)}
          </div>
        </div>
      `:``}

      <!-- Game Stats -->
      <div class="dash-section glass">
        <h3>Fun Facts</h3>
        <div class="dash-facts">
          <div class="dash-fact">Total Rounds Played: <strong>${e.totalRoundsPlayed||0}</strong></div>
          <div class="dash-fact">Closest Games (< 5 pts): <strong>${e.gamesDecidedByUnder5||0}</strong></div>
          <div class="dash-fact">Fastest Win: <strong>${e.fastestWin===999?`-`:e.fastestWin||`-`} rounds</strong></div>
          <div class="dash-fact">Total Lead Changes: <strong>${e.totalLeadChanges||0}</strong></div>
        </div>
      </div>

      ${(n.gamesPlayed||0)>0?`
        <div class="dash-section glass" style="border-color: rgba(232,160,32,0.15);">
          <h3>Ghost vs Computer</h3>
          <div class="dash-facts">
            <div class="dash-fact">Games: <strong>${n.gamesPlayed||0}</strong></div>
            <div class="dash-fact">Record: <strong>${n.wins||0}W-${n.losses||0}L</strong></div>
            <div class="dash-fact">Win Rate: <strong>${n.gamesPlayed>0?(n.wins/n.gamesPlayed*100).toFixed(0):0}%</strong></div>
            <div class="dash-fact">Avg Score: <strong>${n.gamesPlayed>0?(n.totalPointsScored/n.gamesPlayed).toFixed(0):`-`}</strong></div>
            <div class="dash-fact">Best Hand: <strong>${n.highestSingleHand===999?`-`:n.highestSingleHand||`-`}</strong></div>
            <div class="dash-fact">Skunks Dealt: <strong>${n.skunksDealt||0}</strong></div>
          </div>
        </div>
      `:``}

      <div class="actions mt-3">
        <button class="btn" data-action="main-menu">Main Menu</button>
      </div>
    </div>
  `,q._app.querySelectorAll(`[data-action="main-menu"]`).forEach(e=>e.addEventListener(`click`,()=>Q()))}async function Wh(){let e=await Td(`ghost`)||{},t=e.wins||0,n=e.losses||0,r=t+n;q._app.innerHTML=`
    <div class="analytics ghost-dash">
      <h2>Ghost vs Computer</h2>
      <p class="gd-sub">${r} game${r===1?``:`s`} on record</p>

      <div class="gd-hero">
        ${Hh(`Record`,`${t}W-${n}L`)}
        ${Hh(`Win Rate`,r>0?(t/r*100).toFixed(0)+`%`:`-`)}
        ${Hh(`Avg Score`,e.avgPointsPerGame||`-`)}
      </div>

      <div class="gd-grid">
        <div class="gd-card glass">
          <h3>Hands</h3>
          ${Z(`Hands Played`,e.handsPlayed||0)}
          ${Z(`Avg Hand`,e.handsPlayed>0?(e.totalHandPoints/e.handsPlayed).toFixed(1):`-`)}
          ${Z(`Best Hand`,e.highestSingleHand===999?`-`:e.highestSingleHand||`-`)}
          ${Z(`Zero Hands`,e.zeroHandCount||0)}
        </div>

        <div class="gd-card glass">
          <h3>Pegging</h3>
          ${Z(`Peg Points`,e.totalPeggingPoints||0)}
          ${Z(`Cards Played`,e.totalCardsPlayed||0)}
          ${Z(`Avg Per Card`,e.totalCardsPlayed>0?(e.totalPeggingPoints/e.totalCardsPlayed).toFixed(2):`-`)}
          ${Z(`Peg Share`,r>0&&e.totalPointsScored>0?(e.totalPeggingPoints/e.totalPointsScored*100).toFixed(0)+`%`:`-`)}
        </div>

        <div class="gd-card glass">
          <h3>Crib</h3>
          ${Z(`Cribs Played`,e.cribsPlayed||0)}
          ${Z(`Avg Crib`,e.cribsPlayed>0?(e.totalCribPoints/e.cribsPlayed).toFixed(1):`-`)}
          ${Z(`Best Crib`,e.highestCrib===999?`-`:e.highestCrib||`-`)}
          ${Z(`Zero Cribs`,e.zeroCribCount||0)}
        </div>

        <div class="gd-card glass">
          <h3>Game</h3>
          ${Z(`High Score`,e.highestGameScore||`-`)}
          ${Z(`Total Rounds`,e.totalRoundsPlayed||0)}
          ${Z(`Skunks Dealt`,e.skunksDealt||0)}
          ${Z(`Skunks Received`,e.skunksReceived||0)}
        </div>
      </div>

      <div class="actions mt-3">
        <button class="btn" data-action="main-menu">Main Menu</button>
      </div>
    </div>
  `,q._app.querySelectorAll(`[data-action="main-menu"]`).forEach(e=>e.addEventListener(`click`,()=>Q()))}function Gh(){if(!q._series||q._series.status!==`complete`)return;q._currentView=`series-recap`;let e=gm(q._series);q._app.innerHTML=`
    <div class="analytics series-recap">
      <h2>${e.name}</h2>
      <p class="text-center text-gold mb-2">${$(e.winner)} wins ${e.finalRecord}</p>

      <!-- Timeline -->
      <div class="series-timeline">
        ${e.timeline.map(e=>`
          <div class="timeline-game ${e.winner}">
            <span>G${e.gameNumber}</span>
          </div>
        `).join(``)}
      </div>

      <!-- Awards -->
      ${e.awards?.length>0?`
        <div class="awards">
          ${e.awards.map(e=>`
            <div class="award-card glass">
              <div class="award-title">${e.title}</div>
              <div class="award-value">${$(e.player)} — ${e.detail}</div>
            </div>
          `).join(``)}
        </div>
      `:``}

      <div class="actions mt-3">
        <button class="btn" data-action="main-menu">Main Menu</button>
      </div>
    </div>
  `,q._app.querySelectorAll(`[data-action="main-menu"]`).forEach(e=>e.addEventListener(`click`,()=>Q()))}function Kh(e,t){if(!e)return;if(Lf(),e.phase===`quit`){q._unsubscribe&&=(q._unsubscribe(),null),Vf(),q._series=null,q._lastGameState=null,q._lastLocalState=null,q._app.innerHTML=`
      <div class="phase-panel glass text-center" style="margin-top:80px;">
        <h2>Game Ended</h2>
        <p class="text-muted">The other player quit the game.</p>
        <button class="btn btn-primary" id="quit-back-btn">Back to Menu</button>
      </div>
    `,setTimeout(()=>{document.getElementById(`quit-back-btn`)?.addEventListener(`click`,()=>Q())},50);return}let n=q._player,r=U(n);if(e.phase===`done`&&!e.showResult){Of(Th(e,n,r)),eg(e,n);return}let i=null;e.phase===`play`?i=e.pegging?.turn:e.phase===`deal`?i=e.dealer:e.phase===`cut`&&(i=U(e.dealer));let a=e.scores.spencer||0,o=e.scores.kari||0,s=``,c=``,l=``;if(e.showResult)({mainContent:s,oppSection:c,dockContent:l}=Qh(e,n));else switch(e.phase){case`cut_for_deal`:({mainContent:s,oppSection:c,dockContent:l}=qh(e,n,r));break;case`discard`:({mainContent:s,oppSection:c,dockContent:l}=Jh(e,n,r));break;case`cut`:({mainContent:s,oppSection:c,dockContent:l}=Yh(e,n));break;case`play`:({mainContent:s,oppSection:c,dockContent:l}=Xh(e,n,r));break;case`show`:({mainContent:s,oppSection:c,dockContent:l}=Qh(e,n));break;case`deal`:({mainContent:s,oppSection:c,dockContent:l}=$h(e,n,r));break;default:s=`<p style="text-align:center">Phase: ${e.phase}</p>`}let u=q._series?`
    <div class="series-bar">
      <span>${q._series.type.replace(/_/g,` `)}</span>
      <span>${bm(q._series)}</span>
      ${xm(q._series).canClinch?`<span class="text-green">${$(xm(q._series).player)} can clinch!</span>`:``}
      ${dm(q._series)?`<span class="text-red">Elimination!</span>`:``}
    </div>`:``,d=Mf(e);Of(`
    <div class="game-layout me-${n}">
      <div class="top-bar top-bar-slim">
        <div class="tb-player spencer ${i===`spencer`?`active`:``}">
          ${e.dealer===`spencer`?`<span class="dealer-badge">Crib</span>`:``}
          <div class="tb-avatar">${Hp(`spencer`,44)}</div>
          <span class="tb-name">${$(`spencer`)}</span>
        </div>
        <div class="tb-spacer"></div>
        <div class="tb-player kari ${i===`kari`?`active`:``}">
          <span class="tb-name">${$(`kari`)}</span>
          <div class="tb-avatar">${Hp(`kari`,44)}</div>
          ${e.dealer===`kari`?`<span class="dealer-badge">Crib</span>`:``}
        </div>
        <button class="tb-tel ${d}" data-action="tel-cycle" title="${Hd()?`Tap to change telemetry`:`Table rule — tap to change for BOTH players`}">${d===`off`?`TEL·OFF`:d===`insights`?`INSIGHTS`:`COACH`}</button>
        <button class="tb-quit" data-action="quit-game" title="Quit">&times;</button>
      </div>
      <div class="peg-tracks" id="peg-tracks-container">
      </div>
      ${d===`off`?``:`<div class="tel-box" id="tel-box"></div>`}
      ${u}
      <div class="game-main">${s}</div>
      ${c}
      ${l}
    </div>
  `),eg(e,n),d!==`off`&&(oh(e,n,d),e.phase===`play`&&d===`coach`&&ch(e,n),[`discard`,`cut`,`play`,`show`].includes(e.phase)&&Kd(n,d));let f=document.getElementById(`peg-tracks-container`);if(f){let e=Jp(q._player);if(!q._board||q._boardThemeId!==e.id){let t=document.createElement(`div`);t.className=`board-svg-inline`,f.innerHTML=``,f.appendChild(t),q._board=Qm(t,e,{orientation:window.innerWidth>=1200?`vertical`:`horizontal`}),q._boardThemeId=e.id,q._board.setScores(a,o),q._lastScores={spencer:a,kari:o}}else{let e=q._board._container;e&&e.parentNode!==f&&(f.innerHTML=``,f.appendChild(e)),q._lastScores.spencer!==a&&q._board.updateScore(`spencer`,a),q._lastScores.kari!==o&&q._board.updateScore(`kari`,o),q._lastScores={spencer:a,kari:o}}}}function qh(e,t,n){let r=e.cutForDeal||{},i=r[t],a=r[n];if(i&&a){let r=e.dealer,o=e.cutForDealReady||{},s=o[t]===!0,c=o[n]===!0,l;return l=s?`<span class="text-muted" style="font-size:0.85rem">Waiting for ${$(n)}...</span>`:c?`<button class="btn btn-primary" data-action="cfd-continue">Continue</button>
        <span class="text-muted" style="font-size:0.75rem;margin-top:4px">${$(n)} is ready</span>`:`<button class="btn btn-primary" data-action="cfd-continue">Continue</button>`,{mainContent:`
      <div class="zone-header">
        <span class="zone-title">Cut for Deal</span>
      </div>
      <div class="cfd-results">
        <div class="cfd-player ${t}">
          <div class="cfd-avatar ${r===t?`cfd-win`:`cfd-lose`}">${Hp(t,60)}</div>
          <span class="cfd-name">${$(t)}</span>
          ${Y(i,!1)}
        </div>
        <span class="cfd-vs">vs</span>
        <div class="cfd-player ${n}">
          <div class="cfd-avatar ${r===n?`cfd-win`:`cfd-lose`}">${Hp(n,60)}</div>
          <span class="cfd-name">${$(n)}</span>
          ${Y(a,!1)}
        </div>
      </div>
      <div class="cfd-result">${$(r)} deals first</div>
      <div style="margin-top:16px;display:flex;flex-direction:column;align-items:center">
        ${l}
      </div>
    `,oppSection:``,dockContent:``}}if(!i){let t=Array.from({length:40},(e,t)=>`<div class="card face-down clickable cut-for-deal-card" data-cut-index="${t}"></div>`).join(``);return{mainContent:`
      <div class="zone-header">
        <span class="zone-title">Cut for Deal</span>
        <span class="zone-subtitle">${a?`${$(n)} has cut — your turn!`:e.cutForDealTie?`Both cut ${e.cutForDealTie.rank}s — tie!  Cut again.`:`Lowest card deals`}</span>
      </div>
      <div class="cut-stack">
        <div class="cut-spread">${t}</div>
        <button class="btn btn-primary btn-lg" data-action="cfd-cut-btn">Cut the Deck</button>
      </div>
    `,oppSection:``,dockContent:``}}return{mainContent:`
    <div class="zone-header">
      <span class="zone-title">Cut for Deal</span>
      <span class="zone-subtitle">Waiting for ${$(n)} to cut...</span>
    </div>
    <div class="cfd-results">
      <div class="cfd-player ${t}">
        <div class="cfd-avatar">${Hp(t,60)}</div>
        <span class="cfd-name">Your cut</span>
        ${Y(i,!1)}
      </div>
    </div>
  `,oppSection:``,dockContent:``}}function Jh(e,t,n){let r=K(e.hands[t]),i=K(e.hands[n]),a=r.length===4,o=i.length===4?`<span class="opp-status-badge ready">Discarded &#10003;</span>`:`<span class="opp-status-badge">${i.length}/6 held</span>`,s=`
    <div class="play-row pr-top">
      <div class="opp-module">
        <div class="opp-avatar">${Hp(n,54)}</div>
        <span class="opp-name text-${n===`spencer`?`cyan`:`pink`}">${$(n)}</span>
        ${o}
        <div class="opp-cards">
          ${i.map(()=>`<div class="card-back-sm"></div>`).join(``)}
        </div>
      </div>
      <div class="pp-score-chip ${n}">${e.scores[n]||0}</div>
    </div>
  `;return{mainContent:`
    <div class="play-row pr-mid" style="flex-direction:column;gap:10px;">
      <div class="zone-header">
        <span class="zone-title">Discard to ${$(e.dealer)}'s Crib</span>
        <span class="zone-subtitle">${a?`Waiting for opponent...`:`Pick 2 cards to discard`}</span>
      </div>
    </div>
  `,oppSection:s,dockContent:`
    <div class="play-row pr-bot hand-dock">
      <div class="hand-cards">${r.map((e,n)=>Y(e,!a,!1,n,t)).join(``)}</div>
      <div class="pr-bot-actions">
        ${a?``:`<button class="btn btn-primary btn-sm btn-discard" data-player="${t}" disabled>Discard</button>`}
        <div class="pp-score-chip ${t}">${e.scores[t]||0}</div>
      </div>
    </div>
  `}}function Yh(e,t){let n=U(t),r=U(e.dealer),i=t===r,a=Array.from({length:40},(e,t)=>`<div class="card face-down ${i?`clickable cut-card`:``}" data-cut-index="${t}"></div>`).join(``),o=K(e.keptHands?.[t])||K(e.hands?.[t]),s=K(e.keptHands?.[n])||K(e.hands?.[n]),c=`
    <div class="play-row pr-top">
      <div class="opp-hand">
        <div class="opp-avatar">${Hp(n,54)}</div>
        <span class="opp-label text-${n===`spencer`?`cyan`:`pink`}">${$(n)}</span>
        <div class="opp-cards">
          ${s.map(()=>`<div class="card-back-sm"></div>`).join(``)}
        </div>
        <span class="opp-count">${s.length} card${s.length===1?``:`s`}</span>
      </div>
      <div class="pp-score-chip ${n}">${e.scores[n]||0}</div>
    </div>
  `;return{mainContent:`
    <div class="play-row pr-mid pr-cut">
      <div class="zone-header">
        <span class="zone-title">Cut the Deck</span>
        <span class="zone-subtitle">${i?`Reveal the starter card`:`Waiting for ${$(r)} to cut...`}</span>
      </div>
      <div class="cut-stack">
        <div class="cut-spread">${a}</div>
        ${i?`<button class="btn btn-primary btn-lg" data-action="cut-deck-btn">Cut the Deck</button>`:``}
      </div>
    </div>
  `,oppSection:c,dockContent:`
    <div class="play-row pr-bot hand-dock">
      <div class="hand-cards">
        ${o.map(e=>Y(e,!1)).join(``)}
      </div>
      <div class="pr-bot-actions">
        <div class="pp-score-chip ${t}">${e.scores[t]||0}</div>
      </div>
    </div>
  `}}function Xh(e,t,n){let r=K(e.pegging?.pile),i=e.pegging?.runningTotal||0,a=`${q._lastLocalState?.gameId||``}|round-${e.round??0}`;if(a!==q._spentRoundKey&&(q._spentRoundKey=a,q._spentPiles=[],q._lastPileSnapshot={cards:[],total:0}),r.length<q._lastPileSnapshot.cards.length&&q._lastPileSnapshot.cards.length>0){let t=q._lastPileSnapshot.cards,n=q._lastPileSnapshot.total,r=e.pegging?.lastPlay;if(r?.card){let e=Array.isArray(r.breakdown)?r.breakdown:Object.values(r.breakdown||{}),i=e=>e===`A`?1:[`10`,`J`,`Q`,`K`].includes(e)?10:parseInt(e,10),a=t[t.length-1];!(a&&a.rank===r.card.rank&&a.suit===r.card.suit)&&e.some(e=>e.type===`thirtyOne`)&&n+i(r.card.rank)===31&&(t=[...t,{...r.card,playedBy:r.player}],n=31)}q._spentPiles.push({cards:t,total:n,reason:n===31?`31`:`Go`,key:`${q._spentPiles.length}-${n}`,bornAt:Date.now()})}q._lastPileSnapshot={cards:r,total:i};let o=e.pegging?.turn,s=o===t,c=K(e.hands?.[t]),l=K(e.hands?.[n]);c.length===0&&l.length===0&&Cf(e);let u=s&&hf(e,t),d=s?gf(e,t):[];if(e.heels&&e.heels.points>0&&r.length===0&&!e.pegging?.lastPlay){let t=`heels-${e.starter?.rank}${e.starter?.suit}`;t!==q._lastAnnouncedHeels&&(q._lastAnnouncedHeels=t,og(`His Heels!`,e.heels.player,e.heels.points))}let f=e.pegging?.lastPlay;if(f&&f.points>0){let t=K(e.pegging?.pile),n=`${f.player}-${f.card?.rank||`go`}${f.card?.suit||``}-${f.points}-${t.length}`;n!==q._lastAnnouncedPlay&&(q._lastAnnouncedPlay=n,f.player&&q._roundScoring[f.player]&&(q._roundScoring[f.player].peg+=f.points),og((Array.isArray(f.breakdown)?f.breakdown:Object.values(f.breakdown||{})).map(e=>{switch(e.type){case`fifteen`:return`15 for 2`;case`thirtyOne`:return`31 for 2`;case`go`:return`Go for 1`;case`lastCard`:return`Last card for 1`;case`pairs`:return e.count===2?`Pair for ${e.points}`:e.count===3?`Three of a kind for ${e.points}`:`Four of a kind for ${e.points}`;case`run`:return`Run of ${e.length} for ${e.points}`;default:return`${e.points} pts`}}).join(` + `),f.player,f.points))}let p=q._pegAnnouncement?`
    <div class="peg-announcement ${q._pegAnnouncement.player}">
      <span class="peg-announcement-ava">${Wp(q._pegAnnouncement.player,38)}</span>
      <span class="peg-announcement-who">${$(q._pegAnnouncement.player)}</span>
      <span class="peg-announcement-text">${q._pegAnnouncement.text}</span>
      <span class="peg-announcement-points">+${q._pegAnnouncement.points}</span>
    </div>
  `:``,m=`
    <div class="play-row pr-top">
      <div class="opp-hand">
        <div class="opp-avatar ${o===n?`their-turn`:``}">${Hp(n,54)}</div>
        <span class="opp-label text-${n===`spencer`?`cyan`:`pink`}">${$(n)}</span>
        <div class="opp-cards">
          ${l.map(()=>`<div class="card-back-sm"></div>`).join(``)}
          ${l.length===0?`<span class="text-muted" style="font-size:0.65rem">&mdash;</span>`:``}
        </div>
        <span class="opp-count">${l.length} card${l.length===1?``:`s`}</span>
      </div>
      <div class="pp-score-chip ${n}">${e.scores[n]||0}</div>
    </div>
  `;return{mainContent:`
    ${p}
    <div class="play-row pr-mid peg-zone">
      <div class="pz-starter">
        <span class="pz-label">Starter</span>
        ${e.starter?Y(e.starter,!1,!1,null,null,null,!0):`<div class="card-back-sm"></div>`}
      </div>
      <div class="pz-pile">
        ${r.map(e=>`<div class="pile-card ${e.playedBy||``}">${Y(e,!1)}</div>`).join(``)}
        ${r.length===0?`<span class="text-muted" style="font-size:0.75rem">No cards yet</span>`:``}
      </div>
      <div class="pp-count-chip" style="--pct:${Math.min(100,Math.round(i/31*100))}">
        <span class="pp-count-num">${i}</span>
        <span class="pp-count-max">/31</span>
      </div>
    </div>
    ${q._spentPiles.length?`
      <div class="pz-spent">
        ${q._spentPiles.map(e=>`
          <div class="spent-pile ${Date.now()-e.bornAt<1600?`just-spent`:``}">
            <div class="spent-cards">
              ${e.cards.map(e=>`<div class="spent-card ${e.playedBy||``}">${Y(e,!1)}</div>`).join(``)}
            </div>
            <span class="spent-badge ${e.reason===`31`?`gold`:``}">${e.reason}</span>
          </div>
        `).join(``)}
      </div>
    `:``}
    <div class="pz-status ${s?`your-turn`:`waiting`}">
      ${s&&!u?`Your turn!`:s&&u?``:`${$(o||n)}'s turn`}
    </div>
  `,oppSection:m,dockContent:`
    <div class="play-row pr-bot hand-dock">
      <div class="hand-cards ${u?`hand-cards-mini`:``}">
        ${c.map(e=>{if(u)return Y(e,!1);let n=d.some(t=>t.rank===e.rank&&t.suit===e.suit),r=Y(e,s,!1,null,t,`peg`);return n?r:r.replace(`class="card `,`class="card dimmed `)}).join(``)}
        ${c.length===0?`<span class="text-muted">No cards left</span>`:``}
      </div>
      <div class="pr-bot-actions">
        ${u?`<button class="btn btn-pink btn-go" data-player="${t}">Say "Go"</button>`:``}
        <div class="pp-score-chip ${t}">${e.scores[t]||0}</div>
      </div>
    </div>
  `}}function Zh(e){let t={H:`♥`,D:`♦`,C:`♣`,S:`♠`},n=e=>{let n=e.slice(-1),r=e.slice(0,-1);return`<span class="bd-card ${n===`H`||n===`D`?`red`:``}">${r}${t[n]}</span>`},r=e=>e.map(n).join(` `),i=[{key:`fifteens`,label:`15s`},{key:`pairs`,label:`Pairs`},{key:`runs`,label:`Runs`},{key:`flush`,label:`Flush`},{key:`nobs`,label:`Nobs`}],a=``;for(let t of i){let n=e.breakdown[t.key];if(n&&n.points>0){let e=(n.combos||[]).map(e=>`<div class="bd-combo" data-cards="${e.join(`,`)}">${r(e)}</div>`).join(``);a+=`<div class="bd-category"><div class="bd-cat-header"><span class="bd-cat-label">${t.label}</span><span class="bd-cat-pts">${n.points}</span></div>${e}</div>`}}return e.points===0&&(a=`<div class="bd-zero">No points</div>`),a}function Qh(e,t){let n=U(t);if(e.showResult?.phase===`round_summary`){let r=e.showResult,i=r.roundScoring||{},a=e.showReady||{},o=a[t]===`round_summary`,s=a[n]===`round_summary`,c=i.spencer?.hand||0,l=i.spencer?.peg||0,u=i.spencer?.crib||0,d=i.kari?.hand||0,f=i.kari?.peg||0,p=i.kari?.crib||0,m=c+l+u,h=d+f+p,g=(e,t,n)=>`
      <div class="rs-row">
        <span class="rs-val spencer">${t}</span>
        <span class="rs-label">${e}</span>
        <span class="rs-val kari">${n}</span>
      </div>`,_=o?`<span class="text-muted" style="font-size:0.85rem">Waiting for ${$(n)}...</span>`:`<button class="btn btn-primary" data-action="show-continue">Continue</button>`;return!o&&s&&(_+=`<span class="text-muted" style="font-size:0.75rem;margin-top:4px">${$(n)} is ready</span>`),{mainContent:`
      <div class="round-summary">
        <div class="rs-title">Round ${r.round||``} Complete</div>
        <div class="rs-header">
          <span class="rs-player spencer">${$(`spencer`)}</span>
          <span></span>
          <span class="rs-player kari">${$(`kari`)}</span>
        </div>
        ${g(`Hand`,c,d)}
        ${g(`Pegging`,l,f)}
        ${g(`Crib`,u,p)}
        <div class="rs-divider"></div>
        ${g(`Round Total`,m,h)}
        <div class="rs-divider"></div>
        ${g(`Game Score`,r.scores?.spencer||0,r.scores?.kari||0)}
        <div style="margin-top:16px;display:flex;flex-direction:column;align-items:center">
          ${_}
        </div>
      </div>
    `,oppSection:``,dockContent:``}}if(e.showResult){let r=e.showResult,a=e.showReady||{},o=r.phase||e.turnToShow||`show`,s=a[t]===o,c=a[n]===o,l=r.isCrib||r.phase===`crib`,u=r.who||r.player,d=l?`${$(u)}'s Crib`:`${$(u)}'s Hand`,f=[];f=r.hand?(Array.isArray(r.hand)?r.hand:Object.values(r.hand)).map(e=>{if(typeof e==`object`)return e;let t=e.slice(-1);return{rank:e.slice(0,-1),suit:t}}):l?K(e.crib):K(e.keptHands?.[u])||K(e.hands?.[u]);let p=f.map(e=>`<div class="bd-card-wrap" data-key="${i(e)}">${Y(e,!1)}</div>`).join(``),m=e.starter;if(r.starter&&typeof r.starter==`string`){let e=r.starter.slice(-1);m={rank:r.starter.slice(0,-1),suit:e}}let h=m?i(m):``,g=m?`<div class="bd-card-wrap" data-key="${h}">${Y(m,!1,!1,null,null,null,!0)}</div>`:``,_=``;if(r.breakdown){let e={};for(let t of[`fifteens`,`pairs`,`runs`,`flush`,`nobs`]){let n=r.breakdown[t];n?e[t]={points:n.points||0,combos:n.combos?(Array.isArray(n.combos)?n.combos:Object.values(n.combos)).map(e=>Array.isArray(e)?e:Object.values(e)):[]}:e[t]={points:0,combos:[]}}_=Zh({points:r.points,breakdown:e})}let ee;s?ee=`<span class="text-muted" style="font-size:0.85rem">Waiting for ${$(n)}...</span>`:(ee=`<button class="btn btn-primary" data-action="show-continue">Next</button>`,c&&(ee+=`<span class="text-muted" style="font-size:0.75rem;margin-top:4px">${$(n)} is ready</span>`));let te=r.points>=29?`perfect-hand`:r.points>=24?`mega-hand`:r.points>=20?`big-hand`:``,ne=te===`perfect-hand`?`PERFECT 29!`:te===`mega-hand`?`MONSTER HAND!`:te===`big-hand`?`BIG HAND!`:``;return{mainContent:`
      <div class="show-result ${te}">
        ${ne?`<div class="bd-tier-banner ${u}">${ne}</div>`:``}
        <div class="bd-title"><span class="bd-title-ava ${r.points===0?`ava-sad`:r.points>=12?`ava-stoked`:``}">${Hp(u,40)}</span>${d}</div>
        <div class="bd-cards">
          ${p}
          <div class="bd-starter-sep"></div>
          ${g}
        </div>
        ${_?`<div class="bd-breakdown">${_}</div>`:``}
        <div class="bd-total">
          <span>Total</span>
          <span class="bd-total-pts">${r.points}</span>
        </div>
        <div style="margin-top:12px;display:flex;flex-direction:column;align-items:center">
          ${ee}
        </div>
      </div>
    `,oppSection:``,dockContent:``}}let r=e.turnToShow,a,o;r===`crib`?(a=`${$(e.dealer)}'s Crib`,o=K(e.crib)):(a=`${$(r)}'s Hand`,o=K(e.keptHands?.[r])||K(e.hands?.[r]));let s=o.length>0?o.map(e=>Y(e,!1)).join(``):``,c=e.starter?Y(e.starter,!1,!1,null,null,null,!0):``;return{mainContent:`
    <div class="show-result">
      <div class="bd-title">${a}</div>
      ${s||c?`
        <div class="bd-cards">
          ${s}
          ${s&&c?`<div class="bd-starter-sep"></div>`:``}
          ${c}
        </div>
      `:``}
      <button class="btn btn-primary" data-action="show">Count ${r===`crib`?`Crib`:`Hand`}</button>
    </div>
  `,oppSection:``,dockContent:``}}function $h(e,t,n){let r=e.readyToDeal||{},i=r[t]===!0,a=r[n]===!0,o;return o=i&&!a?`<span class="zone-subtitle">Waiting for ${$(n)}...</span>`:!i&&a?`<span class="zone-subtitle">${$(n)} is ready</span>`:``,{mainContent:`
    <div class="zone-header">
      <span class="zone-title">${e.round>1?`Next Round`:`Ready?`}</span>
      <span class="zone-subtitle">${$(e.dealer)} deals</span>
      ${o}
    </div>
    <div style="margin-top:16px">
      ${i?`<span class="text-muted" style="font-size:0.85rem">Waiting...</span>`:`<button class="btn btn-primary btn-lg" data-action="deal">Deal Cards</button>`}
    </div>
  `,oppSection:``,dockContent:``}}function eg(e,t){q._app.querySelectorAll(`.card.clickable[data-player="${t}"]:not([data-card-action])`).forEach(e=>{e.addEventListener(`click`,()=>tg(e))}),q._app.querySelectorAll(`.btn-discard`).forEach(e=>{e.addEventListener(`click`,()=>ng(e.dataset.player))}),q._app.querySelectorAll(`[data-action="cfd-continue"]`).forEach(e=>e.addEventListener(`click`,()=>sf(t))),q._app.querySelectorAll(`.cut-for-deal-card.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{q._app.querySelectorAll(`.cut-for-deal-card`).forEach(e=>e.classList.remove(`clickable`)),e.classList.add(`selected`),of(t)})}),q._app.querySelectorAll(`.cut-card.clickable`).forEach(e=>{e.addEventListener(`click`,()=>{q._app.querySelectorAll(`.cut-card`).forEach(e=>e.classList.remove(`clickable`)),e.classList.add(`selected`),df()})}),q._app.querySelectorAll(`[data-action="cut-deck-btn"]`).forEach(e=>e.addEventListener(`click`,()=>{e.disabled=!0,q._app.querySelectorAll(`.cut-card`).forEach(e=>e.classList.remove(`clickable`)),df()})),q._app.querySelectorAll(`[data-action="cfd-cut-btn"]`).forEach(e=>e.addEventListener(`click`,()=>{e.disabled=!0,q._app.querySelectorAll(`.cut-for-deal-card`).forEach(e=>e.classList.remove(`clickable`)),of(t)})),q._app.querySelectorAll(`[data-action="tel-cycle"]`).forEach(e=>e.addEventListener(`click`,async()=>{let e=[`off`,`insights`,`coach`];if(Hd()){let t=e[(e.indexOf(Af())+1)%e.length];jf(t),q._lastGameState&&Kh(q._lastGameState,q._lastLocalState);return}let t=q._lastLocalState?.gameId;if(!t)return;let n=q._lastGameState?.telemetry||`off`,r=e[(e.indexOf(n)+1)%e.length];try{await ud(t,{telemetry:r})}catch{}})),q._app.querySelectorAll(`[data-card-action="peg"].clickable`).forEach(e=>{e.addEventListener(`click`,()=>rg(e))}),q._app.querySelectorAll(`.btn-go`).forEach(e=>{e.addEventListener(`click`,async()=>{e.disabled=!0;try{await pf(e.dataset.player)}catch(t){console.error(`Say Go failed:`,t),e.disabled=!1}})}),q._app.querySelectorAll(`[data-action="show"]`).forEach(t=>t.addEventListener(`click`,()=>{t.disabled=!0,ig(e).catch(()=>{t.disabled=!1})})),q._app.querySelectorAll(`[data-action="show-continue"]`).forEach(e=>e.addEventListener(`click`,async()=>{e.disabled=!0,q._showBreakdown=null,await bf(t)}));let n=null,r=e=>{q._app.querySelectorAll(`.bd-card-wrap`).forEach(e=>e.classList.remove(`highlight`));for(let t of e)q._app.querySelectorAll(`.bd-card-wrap[data-key="${t}"]`).forEach(e=>e.classList.add(`highlight`))};q._app.querySelectorAll(`.bd-combo[data-cards]`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{n||(r(e.dataset.cards.split(`,`)),e.classList.add(`active-combo`))}),e.addEventListener(`mouseleave`,()=>{n||(q._app.querySelectorAll(`.bd-card-wrap`).forEach(e=>e.classList.remove(`highlight`)),e.classList.remove(`active-combo`))}),e.addEventListener(`click`,()=>{if(q._app.querySelectorAll(`.bd-combo`).forEach(e=>e.classList.remove(`active-combo`,`locked-combo`)),n===e){n=null,q._app.querySelectorAll(`.bd-card-wrap`).forEach(e=>e.classList.remove(`highlight`));return}n=e,e.classList.add(`active-combo`,`locked-combo`),r(e.dataset.cards.split(`,`))})}),q._app.querySelectorAll(`[data-action="deal"]`).forEach(e=>e.addEventListener(`click`,()=>cf(t))),q._app.querySelectorAll(`[data-action="quit-game"]`).forEach(e=>e.addEventListener(`click`,()=>{confirm(`Quit this game? It will be abandoned.`)&&Sg()})),q._app.querySelectorAll(`[data-action="post-game-analytics"]`).forEach(t=>t.addEventListener(`click`,()=>Eh(e))),q._app.querySelectorAll(`[data-action="next-series-game"]`).forEach(t=>t.addEventListener(`click`,()=>ag(e))),q._app.querySelectorAll(`[data-action="main-menu"]`).forEach(e=>e.addEventListener(`click`,async()=>{q._unsubscribe&&=(q._unsubscribe(),null),await id(q._lastLocalState?.gameId),Q()}))}function tg(e){let t=e.dataset.player,n=parseInt(e.dataset.index),r=Nf[t];r.has(n)?(r.delete(n),e.classList.remove(`selected`)):r.size<2&&(r.add(n),e.classList.add(`selected`));let i=q._app.querySelector(`.btn-discard[data-player="${t}"]`);i&&(i.disabled=r.size!==2),sh()}async function ng(e){let t=Nf[e];if(t.size!==2)return;let n=[...t];Nf[e]=new Set,await uf(e,n)}async function rg(e){if(e.dataset.playing)return;e.dataset.playing=`true`;let t=e.dataset.player,n=e.dataset.rank,r=e.dataset.suit;try{await ff(t,{rank:n,suit:r})}catch(e){console.warn(`Peg play failed:`,e.message)}finally{delete e.dataset.playing}}async function ig(e){e.turnToShow===`crib`?await vf():await _f(e.turnToShow)}async function ag(e){if(q._series){let t={gameId:q._lastLocalState?.gameId,winner:e.winner,finalScores:{...e.scores},totalRounds:e.round};if(lm(q._series,t).seriesOver){Gh();return}}await xg()}function og(e,t,n){q._pegAnnouncement={text:e,player:t,points:n},q._pegAnnouncementTimer&&clearTimeout(q._pegAnnouncementTimer),q._lastGameState&&q._currentView===`game`&&setTimeout(()=>{q._lastGameState&&q._currentView===`game`&&Kh(q._lastGameState,q._lastLocalState)},0),q._pegAnnouncementTimer=setTimeout(()=>{q._pegAnnouncement=null,q._lastGameState&&q._currentView===`game`&&Kh(q._lastGameState,q._lastLocalState)},2e3)}function sg(e){if(!e)return`-`;let t=new Date(e),n={month:`short`,day:`numeric`};return t.getFullYear()!==new Date().getFullYear()&&(n.year=`numeric`),t.toLocaleDateString(`en-US`,n)}function cg(e){let t=e.ghostMode?{spencer:`Ghost`,kari:`Computer`}:{spencer:`Spencer`,kari:`Kari`},n=e.ghostMode?{spencer:`ghost`,kari:`comp`}:{spencer:`spencer`,kari:`kari`},r=e.winner===`kari`?`kari`:`spencer`,i=r===`spencer`?`kari`:`spencer`,a=e.finalScores?.[r]??0,o=e.finalScores?.[i]??0,s=e.doubleSkunk?`<span class="mh-badge">DBL SKUNK</span>`:e.skunk?`<span class="mh-badge">SKUNK</span>`:``,c=e.telemetryUsed||{},l=c.spencer===`coach`||c.kari===`coach`?`<span class="mh-badge tel">COACH</span>`:c.spencer===`insights`||c.kari===`insights`?`<span class="mh-badge tel">INSIGHTS</span>`:``,u=(e,t)=>`
    <span class="mh-fact"><span class="mh-fact-label">${e}</span> <span class="mh-fact-val">${t??`-`}</span></span>`,d=r=>`
    <div class="mh-pts-line">
      <span class="mh-name ${n[r]}">${t[r]}</span>
      <span class="mh-pts-val">${e.totalHandPoints?.[r]??`-`}</span> hand
      <span class="mh-pts-val">${e.totalPegPoints?.[r]??`-`}</span> peg
      <span class="mh-pts-val">${e.totalCribPoints?.[r]??`-`}</span> crib
    </div>`;return`
    <div class="mh-row glass" data-gid="${e.gameId}">
      <div class="mh-main">
        <span class="mh-date">${sg(e.completedAt)}</span>
        <span class="mh-matchup">
          <span class="mh-name ${n[r]}">${t[r]}</span>
          <span class="mh-def">d.</span>
          <span class="mh-name ${n[i]}">${t[i]}</span>
        </span>
        <span class="mh-score">${a} - ${o}</span>
        ${s}${l}
        <span class="mh-series">${e._series||``}</span>
      </div>
      <div class="mh-detail">
        <div class="mh-facts">
          ${u(`Rounds`,e.totalRounds)}
          ${u(`Margin`,e.margin)}
          ${u(`Lead Changes`,e.leadChanges)}
          ${u(`Biggest Lead`,e.biggestLead)}
          ${u(`Closest Gap`,e.closestPoint===999?`-`:e.closestPoint)}
        </div>
        ${d(r)}
        ${d(i)}
      </div>
    </div>
  `}async function lg(){q._currentView=`analytics`,q._app.innerHTML=`<div class="waiting"><div class="spinner"></div>Loading history...</div>`;let e=await Id(),t=0,n=0,r=0,i=0;for(let a=e.length-1;a>=0;a--){let o=e[a];o.ghostMode?(o.winner===`kari`?i++:r++,o._series=`${r}-${i}`):(o.winner===`kari`?n++:t++,o._series=`${t}-${n}`)}let a=e.filter(e=>!e.ghostMode),o=e.filter(e=>e.ghostMode),s=q._isGhost&&o.length?`ghost`:a.length?`duo`:`all`,c=()=>{let l=s===`duo`?a:s===`ghost`?o:e,u=s===`ghost`?`<span class="mh-name ghost">Ghost</span> ${r} - ${i} <span class="mh-name comp">Computer</span>`:`<span class="mh-name spencer">Spencer</span> ${t} - ${n} <span class="mh-name kari">Kari</span>`,d=a.length&&o.length?`
      <div class="mh-chips">
        <button class="mh-chip ${s===`duo`?`active`:``}" data-filter="duo">Spencer vs Kari</button>
        <button class="mh-chip ${s===`ghost`?`active`:``}" data-filter="ghost">Ghost</button>
        <button class="mh-chip ${s===`all`?`active`:``}" data-filter="all">All</button>
      </div>`:``;q._app.innerHTML=`
      <div class="analytics match-history">
        <h2>Match History</h2>
        <p class="mh-banner">${e.length?u:``}</p>
        ${d}
        ${l.length?`<div class="mh-list">${l.map(cg).join(``)}</div>`:`<p class="text-center text-muted mt-3">No games on record yet.  Play one!</p>`}
        <div class="actions mt-3">
          <button class="btn" data-action="main-menu">Main Menu</button>
        </div>
      </div>
    `,q._app.querySelectorAll(`.mh-chip`).forEach(e=>e.addEventListener(`click`,()=>{s=e.dataset.filter,c()})),q._app.querySelectorAll(`.mh-row`).forEach(e=>e.addEventListener(`click`,()=>e.classList.toggle(`open`))),q._app.querySelectorAll(`[data-action="main-menu"]`).forEach(e=>e.addEventListener(`click`,()=>Q()))};c()}async function Q(){Lf(),q._currentView=`menu`,document.body.classList.remove(`in-game`),Df(),q._lobbyUnsub&&=(q._lobbyUnsub(),null);let e=q._isGhost?Bp(80):kp(q._player,q._avatarIndex,80),t=q._isGhost?`Shadow Agent`:Ap(q._player,q._avatarIndex),n=Jp(q._player),r=q._isGhost?`gold`:q._player===`spencer`?`cyan`:`pink`,i=U(q._player),a=!1,o=null,s=e=>new Promise((t,n)=>setTimeout(()=>n(Error(`firebase timeout`)),e));if(!q._isGhost)try{if(o=await Promise.race([rd(),s(3e3)]),o&&o.gameId&&o.createdBy===i){let e=await Promise.race([B(o.gameId),s(3e3)]);e&&e.phase!==`done`&&e.phase!==`quit`?a=!0:(await Promise.race([clearActiveGame(),s(3e3)]).catch(()=>{}),o=null)}}catch(e){console.warn(`Lobby check failed (proceeding to menu anyway):`,e.message),o=null}let c=null,l=Bf();if(l)try{let e=await Promise.race([B(l.gameId),s(3e3)]),t=l.series&&l.series.status!==`complete`;e&&e.phase!==`quit`&&(e.phase!==`done`||t)?c={rec:l,game:e}:Vf()}catch(e){console.warn(`Resume check failed:`,e.message)}ug=dg(o);let u;if(c)u=pg(c.rec,c.game);else if(q._isGhost)u=`
      <div class="menu-section">
        <h2>Ghost Mode</h2>
        <button class="btn btn-cta btn-lg" data-action="vs-computer">Play vs Computer</button>
        <div class="ai-diff">
          <span class="ai-diff-label">Computer</span>
          <button class="mh-chip ai-diff-chip ${cp()===`easy`?`active`:``}" data-diff="easy">Easy</button>
          <button class="mh-chip ai-diff-chip ${cp()===`hard`?`active`:``}" data-diff="hard">Hard</button>
        </div>
        <div class="ai-diff tel-picker">
          <span class="ai-diff-label">Telemetry</span>
          <button class="mh-chip tel-chip ${Af()===`off`?`active`:``}" data-tel="off">Off</button>
          <button class="mh-chip tel-chip ${Af()===`insights`?`active`:``}" data-tel="insights">Insights</button>
          <button class="mh-chip tel-chip ${Af()===`coach`?`active`:``}" data-tel="coach">Coach</button>
        </div>
      </div>
    `;else if(a){let e=o.seriesType?o.seriesType.replace(/_/g,` `):`Single Game`;u=`
      <div class="menu-section join-prompt glass" style="border: 2px solid var(--${i===`spencer`?`cyan`:`pink`}); text-align:center;">
        <h2>${Eg(i)} is waiting!</h2>
        <p class="text-muted">${e}${o.telemetry&&o.telemetry!==`off`?` · Telemetry: ${o.telemetry.toUpperCase()} (table rule)`:``}</p>
        <button class="btn btn-primary btn-lg pulse-btn" data-action="join-lobby-game">Join Game</button>
      </div>
    `}else u=`
      <div class="menu-section">
        <h2>vs ${Eg(i)}</h2>
        <button class="btn btn-cta btn-lg btn-stacked" data-action="single-game">
          <span class="btn-main">Open Sesame</span>
          <span class="btn-sub">Single game · race to 121</span>
        </button>
        <div class="series-buttons">
          <button class="btn btn-series" data-action="series" data-type="BEST_OF_3">Best of 3</button>
          <button class="btn btn-series" data-action="series" data-type="BEST_OF_5">Best of 5</button>
          <button class="btn btn-series" data-action="series" data-type="BEST_OF_7">Best of 7</button>
          <button class="btn btn-series btn-gold" data-action="series" data-type="SPENCER_CHALLENGE">
            Spencer Challenge
          </button>
        </div>
        <div class="ai-diff tel-picker">
          <span class="ai-diff-label">Telemetry</span>
          <button class="mh-chip tel-chip ${Af()===`off`?`active`:``}" data-tel="off">Off</button>
          <button class="mh-chip tel-chip ${Af()===`insights`?`active`:``}" data-tel="insights">Insights</button>
          <button class="mh-chip tel-chip ${Af()===`coach`?`active`:``}" data-tel="coach">Coach</button>
        </div>
        <p class="tel-note">Table rule: applies to both players, shown to both.</p>
      </div>

      <div class="menu-section">
        <h2>vs Computer</h2>
        <button class="btn btn-medium btn-lg" data-action="vs-computer">Play vs Computer</button>
        <div class="ai-diff">
          <span class="ai-diff-label">Computer</span>
          <button class="mh-chip ai-diff-chip ${cp()===`easy`?`active`:``}" data-diff="easy">Easy</button>
          <button class="mh-chip ai-diff-chip ${cp()===`hard`?`active`:``}" data-diff="hard">Hard</button>
        </div>
        <div class="ai-diff tel-picker">
          <span class="ai-diff-label">Telemetry</span>
          <button class="mh-chip tel-chip ${Af()===`off`?`active`:``}" data-tel="off">Off</button>
          <button class="mh-chip tel-chip ${Af()===`insights`?`active`:``}" data-tel="insights">Insights</button>
          <button class="mh-chip tel-chip ${Af()===`coach`?`active`:``}" data-tel="coach">Coach</button>
        </div>
      </div>
    `;let d=Kp.findIndex(e=>e.id===n.id);q._app.innerHTML=`
    <div class="menu-screen">
      <div class="game-header">
        <h1>Cribbage Duo</h1>
        <p class="subtitle">${q._isGhost?`Ghost Mode`:`Spencer vs Kari`}</p>
      </div>

      <div class="menu-card glass">
        <!-- Player badge -->
        <div class="player-badge">
          <div class="badge-avatar">${e}</div>
          <div class="badge-info">
            <span class="badge-name text-${r}">${Eg(q._player)}</span>
            <span class="badge-title">${t}</span>
          </div>
          <button class="btn btn-sm btn-danger logout-btn">Log Out</button>
        </div>

        <div class="menu-divider"></div>

        <!-- Board selector -->
        <div class="board-selector">
          <h3>Choose Your Board</h3>
          <div class="board-carousel-wrap">
            <button class="board-arrow board-arrow-left" data-dir="left">&#8249;</button>
            <div class="board-carousel">
              ${Kp.map(e=>`
                <div class="board-option ${e.id===n.id?`selected`:``}" data-board="${e.id}">
                  <div class="board-preview">${e.preview()}</div>
                  <span class="board-name">${e.name}</span>
                  <span class="board-desc">${e.description}</span>
                </div>
              `).join(``)}
            </div>
            <button class="board-arrow board-arrow-right" data-dir="right">&#8250;</button>
          </div>
          <div class="board-dots">
            ${Kp.map((e,t)=>`<span class="board-dot ${t===d?`active`:``}" data-index="${t}"></span>`).join(``)}
          </div>
        </div>

        <div class="menu-divider"></div>

        <!-- Card skin selector -->
        <div class="card-skin-selector">
          <h3>Choose Your Cards</h3>
          <div class="card-skin-chips">
            ${wf.map(e=>`
              <button class="card-skin-chip ${e.id===Tf()?`selected`:``}" data-skin="${e.id}" title="${e.desc}">
                <span class="card-skin-preview card-skin-preview-${e.id}">A<span class="ss">♠</span></span>
                <span class="card-skin-name">${e.name}</span>
              </button>
            `).join(``)}
          </div>
        </div>

        <div class="menu-divider"></div>

        <!-- Table (background) selector -->
        <div class="card-skin-selector bg-theme-selector">
          <h3>Choose Your Table</h3>
          <div class="card-skin-chips">
            ${Pf.map(e=>`
              <button class="bg-theme-chip ${e.id===Ff()?`selected`:``}" data-bg="${e.id}" title="${e.desc}">
                <span class="bg-theme-preview bg-theme-preview-${e.id}"></span>
                <span class="card-skin-name">${e.name}</span>
              </button>
            `).join(``)}
          </div>
        </div>

        <div class="menu-divider"></div>

        ${u}

        <div class="menu-divider"></div>

        <div class="menu-section stats-row">
          <button class="btn btn-ghost" data-action="head-to-head">Head to Head</button>
          <button class="btn btn-ghost" data-action="stats-dashboard">Stats</button>
          <button class="btn btn-ghost" data-action="match-history">History</button>
        </div>
      </div>
    </div>
  `,q._app.querySelectorAll(`.board-option`).forEach(e=>{e.addEventListener(`click`,()=>{q._app.querySelectorAll(`.board-option`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),Yp(e.dataset.board,q._player);let t=[...q._app.querySelectorAll(`.board-option`)].indexOf(e);q._app.querySelectorAll(`.board-dot`).forEach((e,n)=>e.classList.toggle(`active`,n===t))})}),q._app.querySelectorAll(`.bg-theme-chip`).forEach(e=>{e.addEventListener(`click`,()=>{q._app.querySelectorAll(`.bg-theme-chip`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),If(e.dataset.bg)})}),q._app.querySelectorAll(`.card-skin-chip`).forEach(e=>{e.addEventListener(`click`,()=>{q._app.querySelectorAll(`.card-skin-chip`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),Ef(e.dataset.skin)})});let f=q._app.querySelector(`.board-carousel`),p=q._app.querySelectorAll(`.board-dot`);if(f){let e=f.querySelector(`.board-option.selected`);e&&setTimeout(()=>e.scrollIntoView({inline:`center`,behavior:`instant`}),50),q._app.querySelectorAll(`.board-arrow`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.dir===`left`?-1:1,n=f.querySelector(`.board-option`)?.offsetWidth||260;f.scrollBy({left:t*(n+16),behavior:`smooth`})})}),f.addEventListener(`scroll`,()=>{let e=f.querySelector(`.board-option`)?.offsetWidth||260,t=Math.round(f.scrollLeft/(e+16));p.forEach((e,n)=>e.classList.toggle(`active`,n===t))}),p.forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.index),n=f.querySelectorAll(`.board-option`);n[t]&&n[t].scrollIntoView({inline:`center`,behavior:`smooth`})})})}q._app.querySelector(`.logout-btn`).addEventListener(`click`,async()=>{q._unsubscribe&&=(q._unsubscribe(),null),q._lobbyUnsub&&=(q._lobbyUnsub(),null),await rf(),Vf(),q._series=null,q._lastGameState=null,q._lastLocalState=null,q._selectedCards=[],Nf.spencer=new Set,Nf.kari=new Set,Ip(),q._player=null,Cg()}),q._app.querySelectorAll(`[data-action="single-game"]`).forEach(e=>e.addEventListener(`click`,()=>_g())),q._app.querySelectorAll(`[data-action="series"]`).forEach(e=>e.addEventListener(`click`,()=>yg(e.dataset.type))),q._app.querySelectorAll(`[data-action="join-lobby-game"]`).forEach(e=>e.addEventListener(`click`,()=>bg())),q._app.querySelectorAll(`[data-action="vs-computer"]`).forEach(e=>e.addEventListener(`click`,()=>vg())),q._app.querySelectorAll(`[data-action="resume-game"]`).forEach(e=>e.addEventListener(`click`,()=>hg(c.rec))),q._app.querySelectorAll(`[data-action="abandon-game"]`).forEach(e=>e.addEventListener(`click`,()=>gg(c.rec))),q._app.querySelectorAll(`.ai-diff-chip`).forEach(e=>e.addEventListener(`click`,()=>{sp(e.dataset.diff),q._app.querySelectorAll(`.ai-diff-chip`).forEach(t=>t.classList.toggle(`active`,t.dataset.diff===e.dataset.diff))})),q._app.querySelectorAll(`.tel-chip`).forEach(e=>e.addEventListener(`click`,()=>{jf(e.dataset.tel),q._app.querySelectorAll(`.tel-chip`).forEach(t=>t.classList.toggle(`active`,t.dataset.tel===e.dataset.tel))})),q._app.querySelectorAll(`[data-action="head-to-head"]`).forEach(e=>e.addEventListener(`click`,()=>Bh())),q._app.querySelectorAll(`[data-action="stats-dashboard"]`).forEach(e=>e.addEventListener(`click`,()=>Uh())),q._app.querySelectorAll(`[data-action="match-history"]`).forEach(e=>e.addEventListener(`click`,()=>lg())),!q._isGhost&&(q._lobbyUnsub=sd(e=>{if(q._currentView!==`menu`)return;let t=dg(e);t!==ug&&(ug=t,Q())}))}var ug=null;function dg(e){return e&&e.gameId?`${e.gameId}|${e.createdBy}`:`none`}var fg={cut_for_deal:`Cutting for deal`,deal:`Ready to deal`,discard:`Discarding to the crib`,cut:`Cutting the starter`,play:`Pegging`,show:`Counting hands`,done:`Game over`};function pg(e,t){let n=q._player,r=U(n),i=e.mode===`computer`,a=q._isGhost?`Ghost`:Eg(n),o=i?`Computer`:Eg(r),s=t.scores||{},c=e.series&&sm[e.series.type]?`${sm[e.series.type].name} · ${e.series.wins?.[n]||0}–${e.series.wins?.[r]||0}`:`Single game`,l=fg[t.phase]||`In progress`,u=q._isGhost?`gold`:n===`spencer`?`cyan`:`pink`;return`
    <div class="menu-section resume-card glass" style="border: 2px solid var(--${u}); text-align:center;">
      <h2>Game in progress</h2>
      <p class="resume-line">${a} <b class="text-${u}">${s[n]||0}</b> · <b class="text-${i?`gold`:r===`spencer`?`cyan`:`pink`}">${s[r]||0}</b> ${o}</p>
      <p class="text-muted">${c} · Round ${t.round||1} · ${l}</p>
      <button class="btn btn-cta btn-lg pulse-btn" data-action="resume-game">Resume Game</button>
      <button class="btn btn-ghost btn-sm resume-abandon" data-action="abandon-game">Abandon it</button>
    </div>
  `}function mg(e){if(!e||!e.type||!sm[e.type])return null;let t=cm(e.type);return Object.assign(t,e,{config:t.config})}async function hg(e){q._lobbyUnsub&&=(q._lobbyUnsub(),null),e.mode===`computer`?(gp(e.aiPlayer||U(q._player)),Vd(!0),Wd(!!e.ghost)):(_p(),Vd(!1),Wd(!1)),q._series=mg(e.series),await xg(e.seriesType||null,{resumeGameId:e.gameId})}async function gg(e){if(confirm(`Abandon this game? It will be deleted for both players.`)){q._lobbyUnsub&&=(q._lobbyUnsub(),null);try{await Zd(e.gameId,q._player),await rf()}catch(e){console.warn(`Abandon failed (clearing record anyway):`,e.message)}Vf(),q._series=null,Q()}}async function _g(){q._series=null,_p(),Vd(!1),await xg(null)}async function vg(){q._series=null,gp(U(q._player)),Vd(!0),Wd(q._isGhost),await xg(null)}async function yg(e){q._series=cm(e),_p(),Vd(!1),await xg(e)}async function bg(){q._lobbyUnsub&&=(q._lobbyUnsub(),null),_p(),Vd(!1),Wd(!1);let e=await rd();if(!e||!e.gameId){Q();return}e.seriesType?q._series=cm(e.seriesType):q._series=null,await xg(e.seriesType)}async function xg(e=null,t={}){q._currentView=`game`,document.body.classList.add(`in-game`),Df(),q._selectedCards=[],q._showAnalytics=null,q._showBreakdown=null,q._board=null,q._boardThemeId=null,q._lastScores=null,Nf.spencer=new Set,Nf.kari=new Set,q._lobbyUnsub&&=(q._lobbyUnsub(),null),q._app.innerHTML=`<div class="waiting"><div class="spinner"></div>Setting up the table...</div>`;let n;if(t.resumeGameId){let r=await Zd(t.resumeGameId,q._player);if(!r||r.phase===`quit`){Vf(),q._series=null,_p(),Q();return}n={gameId:t.resumeGameId,isNew:!1,isCreator:!0,seriesType:e}}else n=Hd()?await Xd(q._player,Af()):await nf(q._player,e,Af());!n.isCreator&&n.seriesType&&!q._series&&(q._series=cm(n.seriesType)),zf({gameId:n.gameId,mode:Hd()?`computer`:`duo`,aiPlayer:Hd()?yp():null,ghost:q._isGhost,seriesType:q._series?.type||n.seriesType||null,series:q._series}),q._unsubscribe&&q._unsubscribe(),Jd((e,t)=>{q._lastGameState=e,q._lastLocalState=t,q._currentView===`game`&&setTimeout(()=>{q._currentView===`game`&&(Kh(e,t),vp()&&bp(e))},0)}),q._unsubscribe=af()}async function Sg(){q._unsubscribe&&=(q._unsubscribe(),null),_p(),await rf(),Vf(),q._series=null,q._lastGameState=null,q._lastLocalState=null,q._board=null,q._boardThemeId=null,q._lastScores=null,Q()}function Cg(){q._currentView=`login`,q._app.innerHTML=`
    <div class="login-screen">
      <span class="version-stamp">v3.1 — Sep 5, 2026</span>
      <div class="login-header">
        <h1 class="login-title">Cribbage Duo</h1>
        <p class="login-subtitle">Spencer vs Kari</p>
      </div>
      <div class="login-card glass">
        <h2>Enter Your PIN</h2>
        <div class="pin-display">
          <span class="pin-dot"></span>
          <span class="pin-dot"></span>
          <span class="pin-dot"></span>
          <span class="pin-dot"></span>
        </div>
        <div class="pin-error hidden" id="pin-error">Wrong PIN — try again</div>
        <div class="pin-pad">
          ${[1,2,3,4,5,6,7,8,9,null,0,`del`].map(e=>e===null?`<div class="pin-key empty"></div>`:e===`del`?`<button class="pin-key pin-del" data-key="del">&#9003;</button>`:`<button class="pin-key" data-key="${e}">${e}</button>`).join(``)}
        </div>
      </div>
    </div>
  `;let e=``,t=q._app.querySelectorAll(`.pin-dot`),n=q._app.querySelector(`#pin-error`);function r(){t.forEach((t,n)=>{t.classList.toggle(`filled`,n<e.length)})}q._app.querySelectorAll(`.pin-key[data-key]`).forEach(t=>{t.addEventListener(`click`,()=>{let i=t.dataset.key;if(i===`del`){e=e.slice(0,-1),n.classList.add(`hidden`),r();return}if(!(e.length>=4)&&(e+=i,r(),e.length===4)){let t=Np(e);if(t)q._player=t.player===`ghost`?`spencer`:t.player,q._isGhost=t.player===`ghost`,q._avatarIndex=t.avatarIndex,Fp(t.player,q._avatarIndex),wg();else{n.classList.remove(`hidden`),e=``,r();let t=q._app.querySelector(`.login-card`);t.classList.add(`shake`),setTimeout(()=>t.classList.remove(`shake`),500)}}})})}function wg(){let e=q._isGhost?Bp(220):kp(q._player,q._avatarIndex,220),t=q._isGhost?`Shadow Agent`:Ap(q._player,q._avatarIndex),n=q._isGhost?`Ghost`:Eg(q._player),r=q._isGhost?`gold`:q._player===`spencer`?`cyan`:`pink`;q._app.innerHTML=`
    <div class="login-success">
      <div class="avatar-reveal">
        ${e}
      </div>
      <h2 class="text-${r}">Welcome, ${n}!</h2>
      <p class="avatar-name">"${t}"</p>
      <button class="btn btn-primary btn-lg enter-btn">Let's Go</button>
    </div>
  `,q._app.querySelector(`.enter-btn`).addEventListener(`click`,e=>{e.target.disabled=!0,Q()})}function Tg(e){q._app=e;let t=!1;ad(e=>{e&&(t=!0),t&&document.body.classList.toggle(`offline`,!e)}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&(q._currentView!==`game`||!q._lastGameState||vp()&&bp(q._lastGameState))});let n=Pp();n?(q._isGhost=n.player===`ghost`,q._player=q._isGhost?`spencer`:n.player,q._avatarIndex=n.avatarIndex,Q()):Cg()}function Eg(e){return e?e.charAt(0).toUpperCase()+e.slice(1):``}function $(e){return vp()&&e===yp()?`Computer`:q._isGhost&&e===q._player?`Ghost`:Eg(e)}Tg(document.querySelector(`#app`));