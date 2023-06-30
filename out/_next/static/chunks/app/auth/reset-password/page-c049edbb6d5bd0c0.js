(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2048],{76234:function(e,r,t){"use strict";var n=t(39436);r.Z=n.Z},34886:function(e,r,t){Promise.resolve().then(t.bind(t,28500))},28500:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return Z}});var n=t(9268),i=t(2803),s=t(71470),a=t(83206),o=t(84070),c=t(15834),l=t(98945),u=t(42437),d=t(53235),f=t(50946),h=t(76234),m=t(97129),x=t(86006),p=t(99329),g=function(){return(g=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var i in r=arguments[t])Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);return e}).apply(this,arguments)},v=x.forwardRef(function(e,r){var t=g(g({},x.useContext(p.s)),e);return x.createElement("svg",g({width:"1.5em",height:"1.5em",viewBox:"0 0 24 24",strokeWidth:1.5,fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:r},t),x.createElement("path",{d:"M9 9l4.5 3L18 9M3 13.5h2M1 10.5h4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),x.createElement("path",{d:"M5 7.5V7a2 2 0 012-2h13a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2v-.5",stroke:"currentColor",strokeLinecap:"round"}))}),j=t(56008),y=t(68919),w=t(52641);function Z(){let e=(0,w.useSelector)(e=>e.auth.userType),r=(0,w.useDispatch)(),[t,{isLoading:p,isError:g,error:Z,isSuccess:b,data:k}]=(0,s.zN)(),[C,E]=(0,x.useState)(null),N=(0,j.useRouter)(),[P]=a.Z.useForm(),[O,T]=(0,x.useState)(!1),I=async e=>{try{await t(e)}catch(e){y.toast.error(e)}};(0,x.useEffect)(()=>{if(b&&(y.toast.success(null==k?void 0:k.msg),T(!0)),g){var e;y.toast.error(null===(e=Z.data)||void 0===e?void 0:e.msg)}},[b,g]);let{data:L,isSuccess:S,isError:F,error:z}=(0,s.S3)(C),V=e=>{E(e.codigoVerificacion)};return(0,x.useEffect)(()=>{if(S&&null!==C&&(y.toast.success(null==L?void 0:L.msg),r((0,i.s)({code:C})),N.push("/auth/reset-password/update-password")),F&&null!==C){var e;y.toast.error(null===(e=z.data)||void 0===e?void 0:e.msg)}},[S,F]),(0,n.jsx)("div",{className:"flex justify-center items-center relative",children:(0,n.jsx)(o.Z,{className:"w-[23rem] shadow-lg",children:(0,n.jsxs)(c.Z,{direction:"vertical",align:"center",size:"large",children:[(0,n.jsx)(l.Z.Title,{level:3,className:"font-normal text-text-title uppercase",children:e}),O?(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(c.Z,{direction:"vertical",size:"large",justify:"center",align:"center",children:[(0,n.jsx)(h.Z,{children:(0,n.jsx)("div",{className:"bg-primary-100 rounded-md p-4 text-lg text-primary animate-bounce",children:(0,n.jsx)(v,{width:30,height:30,strokeWidth:1})})}),(0,n.jsxs)(h.Z,{children:[(0,n.jsx)(l.Z.Title,{className:"text-primary text-xls",children:"Revisa tu bandeja de entrada"}),(0,n.jsx)(l.Z.Text,{children:"Hemos enviado un c\xf3digo de recuperaci\xf3n de contrase\xf1a a su correo electr\xf3nico."})]}),(0,n.jsx)(h.Z,{children:(0,n.jsxs)(a.Z,{layout:"vertical",form:P,name:"register",onFinish:V,className:"w-80",scrollToFirstError:!0,children:[(0,n.jsx)(a.Z.Item,{name:"codigoVerificacion",label:"C\xf3digo de Verificaci\xf3n",rules:[{required:!0,message:"\xa1Ingrese el c\xf3digo de verificaci\xf3n!"}],hasFeedback:!0,children:(0,n.jsx)(d.Z,{name:"codigoVerificacion"})}),(0,n.jsx)(a.Z.Item,{children:(0,n.jsx)(c.Z,{direction:"vertical",size:"small",align:"center",className:"w-full",children:(0,n.jsx)(f.ZP,{type:"primary",htmlType:"submit",style:{width:250},children:"Verificar c\xf3digo"})})})]})})]})}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{message:"\xa1Importante!",description:"Ingrese su correo electr\xf3nico para enviarle un codigo de restablecimiento de contrase\xf1a.",type:"info",showIcon:!0}),(0,n.jsxs)(a.Z,{className:"w-80",layout:"vertical",name:"normal_login",onFinish:I,children:[(0,n.jsx)(a.Z.Item,{name:"correo",label:"Correo Electr\xf3nico",hasFeedback:!0,rules:[{type:"email",message:"\xa1La entrada no es un correo electr\xf3nico v\xe1lido!"},{required:!0,message:"\xa1Ingrese su correo electr\xf3nico!"}],children:(0,n.jsx)(d.Z,{type:"email",name:"correo",prefix:(0,n.jsx)(m.Z,{className:"site-form-item-icon"}),placeholder:"Correo Electr\xf3nico"})}),(0,n.jsx)(a.Z.Item,{children:(0,n.jsx)(c.Z,{direction:"vertical",size:"small",align:"center",className:"w-full",children:(0,n.jsx)(f.ZP,{loading:p,type:"primary",htmlType:"submit",style:{width:250},children:"Enviar"})})})]}),(0,n.jsx)("div",{className:"text-gray-500",children:"\xbfYa tienes el c\xf3digo?"}),(0,n.jsx)(f.ZP,{onClick:()=>T(!0),children:"A\xf1adir codigo"})]})]})})})}},2803:function(e,r,t){"use strict";t.d(r,{s:function(){return s}});let{createSlice:n}=t(50803),i=n({name:"codePass",initialState:{code:null},reducers:{setCodePass:(e,r)=>{e.code=r.payload.code}}}),{setCodePass:s}=i.actions;r.Z=i.reducer},71470:function(e,r,t){"use strict";t.d(r,{Gt:function(){return i},S3:function(){return a},a3:function(){return o},zN:function(){return s}});var n=t(32895);let i=(0,n.createApi)({reducerPath:"passwordApi",baseQuery:(0,n.fetchBaseQuery)({baseUrl:"http://3.86.194.103/api/v1/"}),endpoints:e=>({forgotPassword:e.mutation({query:e=>({url:"usuario/recuperar",method:"POST",body:e})}),validateCode:e.query({query:e=>({url:"usuario/recuperar/codigo/".concat(e),method:"GET"})}),updatePassword:e.mutation({query:e=>({url:"usuario/cambiar/contrasenia",method:"POST",body:e})})})}),{useForgotPasswordMutation:s,useValidateCodeQuery:a,useUpdatePasswordMutation:o}=i},99329:function(e,r,t){"use strict";t.d(r,{s:function(){return n}});var n=t(86006).createContext({})},97129:function(e,r,t){"use strict";var n=t(86006),i=t(99329),s=function(){return(s=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var i in r=arguments[t])Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);return e}).apply(this,arguments)},a=n.forwardRef(function(e,r){var t=s(s({},n.useContext(i.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:r},t),n.createElement("path",{d:"M7 9l5 3.5L17 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),n.createElement("path",{d:"M2 17V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z",stroke:"currentColor"}))});r.Z=a}},function(e){e.O(0,[8779,4790,8945,2641,803,4389,545,4176,2913,1452,1728,3206,5243,4070,2955,2667,8139,1744],function(){return e(e.s=34886)}),_N_E=e.O()}]);