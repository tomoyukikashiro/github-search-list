(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{166:function(e,t,a){"use strict";a.r(t);a(102),a(109);var n=a(0),r=a.n(n),l=a(168),c=a(181),s=a(170),u=a(40),i=a(83),o=a(182),m=a.n(o),f=(a(185),a(104),a(44),a(189),a(190)),p=a.n(f),d=(a(111),a(70),a(45),a(103),a(191),a(192)),b=a.n(d),g=null,E=new Map,h=function(){var e=p()(m.a.mark(function e(t,a){var n,r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return g=g||new b.a({auth:t}),e.next=3,Promise.all(a.map(function(e){return g.search.issuesAndPullRequests({q:e}).then(function(e){return e.data.items})}));case 3:return n=e.sent,r=n.reduce(function(e,t){var a=t.filter(function(t){return!e.find(function(e){return e.id===t.id})});return[].concat(e,a)},[]),E.set(a,r),e.abrupt("return",E);case 7:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),v=function(e){var t=e.tasks,a=function(e){return"#"+e.number+" "+e.title};return t.length?r.a.createElement("ul",{className:"list-group list-group-flush"},t.map(function(e){return r.a.createElement("li",{key:e.id,className:"list-group-item"},r.a.createElement("span",{className:"text-secondary mr-2"},function(e){return e.repository_url.split("/").pop()}(e)),r.a.createElement("a",{href:e.html_url,title:a(e),target:"_blank",rel:"noopener noreferrer"},a(e)),r.a.createElement("div",null,e.labels.length&&e.labels.map(function(e){return r.a.createElement("span",{key:e.id,className:"badge badge-light mr-1",style:{color:"#fff",backgroundColor:"#"+e.color}},e.name)})))})):r.a.createElement("ul",{className:"list-group list-group-flush"},r.a.createElement("li",{className:"list-group-item"},"なし"))},k=function(e){var t=e.token,a=e.queries;if(!t)return r.a.createElement(r.a.Fragment,null);var n=E.get(a);if(n)return r.a.createElement(v,{tasks:n});throw h(t,a)};t.default=function(){var e=Object(n.useContext)(u.c).searchQueryState,t=Object(n.useContext)(i.b),a=t.tokenState,o=t.setTokenState,m=Object(n.useState)(0),f=m[0],p=m[1];Object(n.useEffect)(function(){if(!e.length)return Object(l.b)("/settings")},[]);return r.a.createElement(s.a,null,r.a.createElement("div",{className:"mb-3"},r.a.createElement("form",{className:"form-inline",onSubmit:function(e){e.preventDefault(),f?(E.clear(),p(function(e){return e+1})):p(function(e){return e+1}),o(e.target.elements.namedItem("gt").value)}},r.a.createElement("div",{className:"form-group mr-2 w-25"},r.a.createElement("input",{className:"form-control w-100",type:"password",name:"gt",defaultValue:a})),r.a.createElement("button",{className:"btn btn-primary"}," ",f?"refetch":"fetch"))),e.map(function(e){return r.a.createElement("div",{key:e.id,className:"card mb-4"},r.a.createElement("h5",{className:"card-header d-flex justify-content-between align-items-center"},r.a.createElement("span",null,e.name),r.a.createElement("button",{className:"btn btn-outline-dark",onClick:function(){return function(e){var t=E.get(e.queryString);t&&c.writeText(t.map(function(e){return function(e){var t=e.repository_url.split("/").pop();return"[#"+e.number+" "+e.title+"]("+e.html_url+") ["+t+"]"}(e)}).join("\n"))}(e)}},"copy as markdown")),r.a.createElement("div",{className:"card-body"},r.a.createElement(n.Suspense,{fallback:r.a.createElement(r.a.Fragment,null,"Loading...")},r.a.createElement(k,{token:a,queries:e.queryString}))))}))}},167:function(e,t,a){var n;e.exports=(n=a(171))&&n.default||n},168:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(6),c=a.n(l),s=a(41),u=a.n(s);a.d(t,"a",function(){return u.a}),a.d(t,"b",function(){return s.navigate});a(167),r.a.createContext({});c.a.object,c.a.string.isRequired,c.a.func,c.a.func},170:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(168);t.a=function(e){var t=e.children;return r.a.createElement("div",{className:"container my-5"},r.a.createElement("a",{href:"https://github.com/tomoyukikashiro/github-search-list"},r.a.createElement("img",{style:{position:"absolute",top:0,left:0,border:0},src:"https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png",alt:"Fork me on GitHub"})),r.a.createElement("header",{className:"mb-4 d-flex justify-content-between align-items-center"},r.a.createElement("h1",null,"Github Search List"),r.a.createElement("ul",{className:"nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(l.a,{className:"nav-link",activeClassName:"disabled",to:"/"},"HOME")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(l.a,{className:"nav-link",activeClassName:"disabled",to:"/settings"},"SETTINGS")))),r.a.createElement("main",null,t))}},171:function(e,t,a){"use strict";a.r(t);a(42);var n=a(0),r=a.n(n),l=a(6),c=a.n(l),s=a(67),u=function(e){var t=e.location,a=e.pageResources;return a?r.a.createElement(s.a,Object.assign({location:t,pageResources:a},a.json)):null};u.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},t.default=u}}]);
//# sourceMappingURL=component---src-pages-index-js-4bac703521141f40b4e3.js.map