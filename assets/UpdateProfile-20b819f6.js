import{r as a,f as P,h as y,i as w,j as t,S as A,k as E,B as S}from"./index-947d2898.js";import{u as F,F as G,R as n}from"./RHFTextField-481993f0.js";import{R as x}from"./RHFAutocomplete-974d5ff5.js";import{a as u,e as l}from"./axios-99f4dd66.js";import{D as R}from"./Divider-8bed6034.js";import"./IconButton-3a3ad926.js";function k(){var c,g;const[p,v]=a.useState([]),[d,h]=a.useState([]),{isLoggedIn:f,getUser:r,login:j}=P(),m=y(),i=F({defaultValues:{currentPassword:"",newPassword:"",newPassword1:""}});a.useEffect(()=>{u.get(l.genres).then(e=>{v(e.data)})},[]),a.useEffect(()=>{u.get(l.artists).then(e=>{h(e.data)})},[]),a.useEffect(()=>{var e,s;i.reset({favouriteGenres:(e=r())==null?void 0:e.favouriteGenres,favouriteArtists:(s=r())==null?void 0:s.favouriteArtists})},[p,d]),a.useEffect(()=>{f()||m(w.login.path)},[f]);const b=async e=>{var s;try{const o=await u.put(`${l.users}/${(s=r())==null?void 0:s.username}`,e);j(o.data),i.reset(),m(w.profile.path)}catch(o){console.log(o)}};return t.jsx(G,{...i,children:t.jsx("form",{onSubmit:i.handleSubmit(b),children:t.jsxs(A,{spacing:2,children:[t.jsx("h2",{children:"Puoi aggiornare la password oppure i tuoi artisti e generi musicali preferiti! "}),t.jsx(E,{variant:"subtitle1",children:"Se non vuoi aggiornare la password, semplicemente lascia i campi relativi vuoti."}),t.jsx(n,{type:"password",label:"Password attuale",name:"currentPassword"}),t.jsx(n,{type:"password",label:"Nuova Password",name:"newPassword"}),t.jsx(n,{type:"password",label:"Conferma Nuova Password",name:"newPassword1"}),t.jsx(x,{name:"favouriteGenres",options:p,defaultValue:(c=r())==null?void 0:c.favouriteGenres,getOptionLabel:e=>e._id,isOptionEqualToValue:(e,s)=>e._id===s._id,label:"Generi preferiti",multiple:!0}),t.jsx(x,{name:"favouriteArtists",options:d,defaultValue:(g=r())==null?void 0:g.favouriteArtists,getOptionLabel:e=>e.artist.name,isOptionEqualToValue:(e,s)=>e._id===s._id,label:"Artisti preferiti",multiple:!0}),t.jsx(R,{}),t.jsx(S,{type:"submit",children:"Modifica i miei dati."})]})})})}export{k as default};
