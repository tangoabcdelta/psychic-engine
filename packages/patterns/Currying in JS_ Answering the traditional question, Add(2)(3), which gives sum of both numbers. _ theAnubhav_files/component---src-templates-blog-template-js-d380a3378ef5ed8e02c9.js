(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"4M6O":function(e,t,n){"use strict";n("rE2o"),n("ioFf"),n("RW0V"),n("rGqo"),n("yt8O"),n("Btvt"),n("XfO3"),n("T39b");var i=n("TqRt");t.__esModule=!0,t.insertScript=function(e,t,n){var i=window.document.createElement("script");return i.async=!0,i.src=e,i.id=t,n.appendChild(i),i},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var i;return function(){var r=this,a=arguments,o=function(){i=null,n||e.apply(r,a)},s=n&&!i;window.clearTimeout(i),i=setTimeout(o,t),s&&e.apply(r,a)}},t.isReactElement=a,t.shallowComparison=function(e,t){var n=new Set(Object.keys(e),Object.keys(t)),i=Array.isArray(n),r=0;for(n=i?n:n[Symbol.iterator]();;){var o;if(i){if(r>=n.length)break;o=n[r++]}else{if((r=n.next()).done)break;o=r.value}var s=o;if(e[s]!==t[s]&&!a(e[s]))return!0}return!1};var r=i(n("q1tI"));function a(e){return!!r.default.isValidElement(e)||!!Array.isArray(e)&&e.some((function(e){return r.default.isValidElement(e)}))}},ORnI:function(e,t,n){"use strict";var i=n("TqRt");t.__esModule=!0,t.default=void 0;var r=i(n("VUT9"));t.Disqus=r.default;var a=i(n("qASQ"));t.CommentCount=a.default;var o=r.default;t.default=o},VUT9:function(e,t,n){"use strict";var i=n("TqRt");t.__esModule=!0,t.default=void 0;var r=i(n("pVnL")),a=i(n("8OQS")),o=i(n("VbXa")),s=i(n("q1tI")),l=i(n("17x9")),c=n("4M6O"),d=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="theanubhav",t.config?n.config=t.config:n.config={identifier:t.identifier,url:t.url,title:t.title},n}(0,o.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&window.document&&this.shortname&&this.cleanInstance(),this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,c.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.loadInstance=function(){if("undefined"!=typeof window&&window.document&&this.shortname){var e=this.config;window.disqus_config=function(){this.page.identifier=e.identifier,this.page.title=e.title,this.page.url=e.url},(0,c.insertScript)("https://"+this.shortname+".disqus.com/embed.js","disqus-embed-script",window.document.body)}},n.cleanInstance=function(){(0,c.removeScript)("disqus-embed-script",window.document.body),window&&window.DISQUS&&window.DISQUS.reset();try{delete window.DISQUS}catch(t){window.DISQUS=void 0}var e=window.document.getElementById("disqus_thread");if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild)},n.render=function(){var e=this.props,t=(e.config,(0,a.default)(e,["config"]));return s.default.createElement("div",(0,r.default)({id:"disqus_thread"},t,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/Disqus.jsx",lineNumber:73},__self:this}))},t}(s.default.Component);t.default=d,d.propTypes={config:l.default.shape({identifier:l.default.string,title:l.default.string,url:l.default.string}),identifier:l.default.string,title:l.default.string,url:l.default.string}},YvAW:function(e,t,n){},b4ge:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return u})),n.d(t,"pageQuery",(function(){return m}));n("KKXr");var i=n("q1tI"),r=n.n(i),a=n("TJpk"),o=n.n(a),s=n("7oih"),l=(n("YvAW"),n("qHiR"),n("ORnI")),c=n("/eHF"),d=n.n(c);function u(e){var t=e.data,n=t.markdownRemark,i=t.site,a=n.frontmatter,c=n.html,u=n.fields,m=a.date,f=a.path,p=a.title,h=a.subtitle,g=a.ghrepo,w="",v="";if(g){var b=g.split("/");w=b[0],v=b[1]}var E={url:""+(i.siteMetadata.siteUrl+f),title:p};return r.a.createElement(s.a,{title:p},r.a.createElement(o.a,null,r.a.createElement("meta",{name:"description",content:a.subtitle})),r.a.createElement("div",{className:"blog-post-container mt-5"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12 col-md-10"},r.a.createElement("div",null,r.a.createElement(d.a,{bottom:!0},r.a.createElement("h1",{style:{fontSize:"3em"}},p||r.a.createElement("br",null)," "),h?r.a.createElement("h3",{style:{fontStyle:"italic",fontWeight:300}},h):"",r.a.createElement("span",{className:"post-meta"},"Posted on ",m),r.a.createElement("br",null),r.a.createElement("span",{className:"pos-meta"},Math.ceil(u.readingTime.minutes+1)," minutes read"))))),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12 col-md-10"},r.a.createElement("div",{id:"header-gh-btns"},g?r.a.createElement(r.a.Fragment,null,r.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user="+w+"&repo="+v+"&type=star&count=true",frameBorder:"0",scrolling:"0",width:"120px",height:"20px"}),r.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user="+w+"&repo="+v+"&type=watch&v=2&count=true",frameBorder:"0",scrolling:"0",width:"120px",height:"20px"}),r.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user="+w+"&repo="+v+"&type=fork&count=true",frameBorder:"0",scrolling:"0",width:"120px",height:"20px"}),r.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user="+w+"&type=follow&count=true",frameBorder:"0",scrolling:"0",width:"220px",height:"20px"})):""))),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12 col-md-10"},r.a.createElement("div",{dangerouslySetInnerHTML:{__html:c}}))),r.a.createElement(l.Disqus,{config:E}))))}var m="3499669761"},qASQ:function(e,t,n){"use strict";var i=n("TqRt");t.__esModule=!0,t.default=void 0;var r=i(n("pVnL")),a=i(n("8OQS")),o=i(n("VbXa")),s=i(n("q1tI")),l=i(n("17x9")),c=n("4M6O"),d=(0,c.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),u=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="theanubhav",n}(0,o.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,c.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?d():(0,c.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,c.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var e=this.props,t=e.config,n=e.placeholder,i=(0,a.default)(e,["config","placeholder"]);return s.default.createElement("span",(0,r.default)({className:"disqus-comment-count","data-disqus-identifier":t.identifier,"data-disqus-url":t.url},i,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentCount.jsx",lineNumber:49},__self:this}),n)},t}(s.default.Component);t.default=u,u.defaultProps={placeholder:"..."},u.propTypes={config:l.default.shape({identifier:l.default.string,title:l.default.string,url:l.default.string}),placeholder:l.default.string}},qHiR:function(e,t,n){}}]);
//# sourceMappingURL=component---src-templates-blog-template-js-d380a3378ef5ed8e02c9.js.map