import{r as a,h as b,f as y,i as d,j as e,S as v,B as E}from"./index-947d2898.js";import{a as o,e as n}from"./axios-99f4dd66.js";import{u as R,F as S,R as r}from"./RHFTextField-481993f0.js";import{R as c}from"./RHFAutocomplete-974d5ff5.js";import{D as w}from"./Divider-8bed6034.js";import"./IconButton-3a3ad926.js";function T(){const[l,m]=a.useState(!1),[x,f]=a.useState([]),[j,g]=a.useState([]),i=R(),p=b(),{isLoggedIn:u}=y();a.useEffect(()=>{u()&&p(d.profile.path)},[u]),a.useEffect(()=>{o.get(n.genres).then(t=>{f(t.data)})},[]),a.useEffect(()=>{o.get(n.artists).then(t=>{g(t.data)})},[]);const h=async t=>{try{const s=await o.post(n.register,t);m(!1),p(d.login.path),i.reset()}catch(s){m(!0),console.log(s)}};return e.jsxs("div",{children:[e.jsx(S,{...i,children:e.jsx("form",{onSubmit:i.handleSubmit(h),children:e.jsxs(v,{spacing:2,children:[e.jsx("h2",{children:"Registrati!"}),e.jsx(r,{type:"email",label:"email",name:"email"}),e.jsx(r,{type:"text",label:"name",name:"name"}),e.jsx(r,{type:"text",label:"surname",name:"surname"}),e.jsx(r,{type:"text",label:"username",name:"username"}),e.jsx(r,{type:"password",label:"password",name:"password"}),e.jsx(r,{type:"password",label:"password1",name:"password1"}),e.jsx(c,{name:"favouriteGenres",options:x,getOptionLabel:t=>t._id,isOptionEqualToValue:(t,s)=>t._id===s._id,label:"Generi preferiti",multiple:!0}),e.jsx(c,{name:"favouriteArtists",options:j,getOptionLabel:t=>t.artist.name,isOptionEqualToValue:(t,s)=>t._id===s._id,label:"Artisti preferiti",multiple:!0}),e.jsx(w,{}),e.jsx(E,{type:"submit",children:"Register"})]})})}),l&&e.jsx("div",{children:l})]})}export{T as default};
