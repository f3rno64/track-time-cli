"use strict";(self.webpackChunktrack_time_cli_docs=self.webpackChunktrack_time_cli_docs||[]).push([[711],{7789:(e,t,r)=>{r.r(t),r.d(t,{default:()=>o});r(9474);var s=r(8379),a=r(1598),i=r(4331),c=r(4507),l=r(2101),n=r(3274);function d(e){let{year:t,posts:r}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.A,{as:"h3",id:t,children:t}),(0,n.jsx)("ul",{children:r.map((e=>(0,n.jsx)("li",{children:(0,n.jsxs)(s.A,{to:e.metadata.permalink,children:[e.metadata.formattedDate," - ",e.metadata.title]})},e.metadata.date)))})]})}function h(e){let{years:t}=e;return(0,n.jsx)("section",{className:"margin-vert--lg",children:(0,n.jsx)("div",{className:"container",children:(0,n.jsx)("div",{className:"row",children:t.map(((e,t)=>(0,n.jsx)("div",{className:"col col--4 margin-vert--lg",children:(0,n.jsx)(d,{...e})},t)))})})})}function o(e){let{archive:t}=e;const r=(0,a.T)({id:"theme.blog.archive.title",message:"Archive",description:"The page & hero title of the blog archive page"}),s=(0,a.T)({id:"theme.blog.archive.description",message:"Archive",description:"The page & hero description of the blog archive page"}),d=function(e){const t=e.reduce(((e,t)=>{const r=t.metadata.date.split("-")[0],s=e.get(r)??[];return e.set(r,[t,...s])}),new Map);return Array.from(t,(e=>{let[t,r]=e;return{year:t,posts:r}}))}(t.blogPosts);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.be,{title:r,description:s}),(0,n.jsxs)(c.A,{children:[(0,n.jsx)("header",{className:"hero hero--primary",children:(0,n.jsxs)("div",{className:"container",children:[(0,n.jsx)(l.A,{as:"h1",className:"hero__title",children:r}),(0,n.jsx)("p",{className:"hero__subtitle",children:s})]})}),(0,n.jsx)("main",{children:d.length>0&&(0,n.jsx)(h,{years:d})})]})]})}}}]);