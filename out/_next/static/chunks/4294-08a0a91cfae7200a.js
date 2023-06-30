"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4294],{47434:function(e,r,t){t.d(r,{L:function(){return i}});var a=t(9268),o=t(98945);let i=e=>{let{text:r}=e;return(0,a.jsx)(o.Z.Text,{className:"text-[#152C5B] font-medium",children:r})}},76511:function(e,r,t){t.d(r,{n:function(){return C}});var a=t(9268),o=t(96230),i=t(52641),n=t(4660),d=t(47434),l=t(86006),c=t(83206),s=t(70509),u=t(76234),x=t(53235),p=t(80970),m=t(40994),b=t(50946),h=t(5710),f=t(42301),j=t(34138),v=t(58682),y=t(84153),g=t(68919),_=t(63731);let k=e=>{var r;let{handleCancel:t,client:o=null}=e,k=(0,n.I)(),Z=(0,i.useSelector)(e=>e.crud.data),I=(0,i.useSelector)(e=>e.auth.user),{data:w}=(0,j.tn)(null),{data:C}=(0,v.iv)(null==I?void 0:null===(r=I.data)||void 0===r?void 0:r.cod_usuario),[N,{isLoading:T,isError:P,error:E,isSuccess:q,data:D}]=(0,y.wc)(),[S,{isLoading:F,isError:O,error:A,isSuccess:W,data:z}]=(0,_.oJ)(),[L,{isLoading:U,isError:M,error:V,isSuccess:H,data:B}]=(0,_.Dl)(),[G]=c.Z.useForm(),[Q,R]=(0,l.useState)(h.Xo);(0,l.useEffect)(()=>{if(Z){var e,r,t,a,o,i,n,d;R({...Z,cod_propiedad:null===(e=Z.propiedad)||void 0===e?void 0:e.cod_propiedad,nombre_propiedad:null===(r=Z.propiedad)||void 0===r?void 0:r.nombre,cod_trabajador:null===(t=Z.trabajador)||void 0===t?void 0:t.cod_trabajador,nombre_trabajador:null===(a=Z.trabajador)||void 0===a?void 0:a.nombre}),G.setFieldsValue({...Z,cod_propiedad:null===(o=Z.propiedad)||void 0===o?void 0:o.cod_propiedad,nombre_propiedad:null===(i=Z.propiedad)||void 0===i?void 0:i.nombre,cod_trabajador:null===(n=Z.trabajador)||void 0===n?void 0:n.cod_trabajador,nombre_trabajador:null===(d=Z.trabajador)||void 0===d?void 0:d.nombre})}},[Z]),(0,l.useEffect)(()=>{o&&(R(o),G.setFieldsValue(o))},[o]);let Y=(e,r)=>{if(!r&&e.target){let{name:r,value:t}=e.target;G.setFieldsValue({[r]:t||""}),R(e=>({...e,[r]:t||""}))}else G.setFieldsValue({[r]:e||""}),R(t=>({...t,[r]:e||""}))},X=async e=>{try{if(o){let e={cod_propiedad:Q.cod_propiedad,cod_trabajador:Q.cod_trabajador};await N({values:e,id:o.cod_cliente})}else if(Z){console.log("\uD83D\uDE80 ~ file: FormNewClientWorked.js:125 ~ onFinish ~ editClientWorked:",Z);let r={celular:e.celular,nombre:e.nombre,correo:e.correo,dni:e.dni,cod_propiedad:Q.cod_propiedad,cod_trabajador:Q.cod_trabajador};await L({clientWorked:r,codClient:Z.cod_cliente,codSale:Z.cod_venta})}else{var r;let t={celular:e.celular,nombre:e.nombre,correo:e.correo,dni:e.dni,cod_propiedad:Q.cod_propiedad,cod_trabajador:Q.cod_trabajador,creado_por:null===(r=I.data)||void 0===r?void 0:r.cod_usuario};await S(t)}}catch(e){g.toast.error(e)}};(0,l.useEffect)(()=>{if(W&&(g.toast.success(null==z?void 0:z.msg),t()),O){var e;g.toast.error(null===(e=A.data)||void 0===e?void 0:e.msg)}},[W,O]),(0,l.useEffect)(()=>{if(H&&(g.toast.success(null==B?void 0:B.msg),t()),M){var e;g.toast.error(null===(e=V.data)||void 0===e?void 0:e.msg)}},[H,M]),(0,l.useEffect)(()=>{if(q&&(g.toast.success(null==D?void 0:D.msg),t()),P){var e;g.toast.error(null===(e=E.data)||void 0===e?void 0:e.msg)}},[q,P]);let J=(0,l.useMemo)(()=>null==w?void 0:w.data,[w]),[$,K]=(0,l.useState)([]),ee=null==J?void 0:J.map(e=>({cod:e.cod_usuario,value:e.nombre}));(0,l.useEffect)(()=>{if(w){var e;if((null===(e=I.data)||void 0===e?void 0:e.cod_rol)===1)K(ee);else{let e=ee.filter(e=>{var r;return e.cod===(null===(r=I.data)||void 0===r?void 0:r.cod_usuario)});K(e)}}},[w]);let er=e=>{if(e){let{value:r,cod:t}=e;G.setFieldValue({cod_trabajador:t||"",nombre_trabajador:r||""}),R(e=>({...e,cod_trabajador:t||"",nombre_trabajador:r||""}))}},et=(0,l.useMemo)(()=>null==C?void 0:C.data,[C]),ea=null==et?void 0:et.map(e=>({cod:e.cod_propiedad,value:e.nombre})),eo=e=>{if(e){let{value:r,cod:t}=e;G.setFieldValue({cod_propiedad:t||"",nombre_propiedad:r||""}),R(e=>({...e,cod_propiedad:t||"",nombre_propiedad:r||""}))}};return(0,a.jsx)(c.Z,{form:G,layout:"vertical",requiredMark:!0,onFinish:X,autoComplete:"off",scrollToFirstError:!0,children:(0,a.jsxs)(s.Z,{gutter:[16,16],children:[(0,a.jsx)(u.Z,{xs:24,md:12,lg:16,children:(0,a.jsx)(c.Z.Item,{name:"nombre",label:(0,a.jsx)(d.L,{text:"Nombre Completo"}),hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el nombre completo"}],children:(0,a.jsx)(x.Z,{name:"nombre",placeholder:"Ingrese el nombre completo",value:Q.nombre,onChange:Y,allowClear:!0,readOnly:o})})}),(0,a.jsx)(u.Z,{xs:24,md:12,lg:8,children:(0,a.jsx)(c.Z.Item,{name:"dni",label:(0,a.jsx)(d.L,{text:"N\xb0 de DNI"}),hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el DNI"},{validator:(e,r)=>r&&8!==r.toString().length?Promise.reject(Error("El campo debe tener 8 d\xedgitos")):Promise.resolve()}],children:(0,a.jsx)(p.Z,{name:"dni",maxLength:8,placeholder:"N\xfamero de DNI",value:Q.dni,onChange:e=>Y(e,"dni"),className:"w-full",readOnly:o})})}),(0,a.jsx)(u.Z,{xs:24,md:12,lg:16,children:(0,a.jsx)(c.Z.Item,{name:"correo",label:(0,a.jsx)(d.L,{text:"Correo"}),hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el correo"},{type:"email",message:"El correo no es v\xe1lido"}],children:(0,a.jsx)(x.Z,{type:"email",name:"correo",placeholder:"Correo",value:Q.correo,onChange:Y,allowClear:!0,readOnly:o})})}),(0,a.jsx)(u.Z,{xs:24,md:12,lg:8,children:(0,a.jsx)(c.Z.Item,{name:"celular",label:(0,a.jsx)(d.L,{text:"Celular"}),hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el tel\xe9fono"}],children:(0,a.jsx)(x.Z,{name:"celular",placeholder:"Celular",value:Q.celular,onChange:Y,allowClear:!0,readOnly:o})})}),(0,a.jsx)(u.Z,{xs:24,md:12,lg:12,children:(0,a.jsx)(c.Z.Item,{name:"nombre_propiedad",value:Q.nombre_propiedad,label:(0,a.jsx)(d.L,{text:"\xdaltima propiedad comprada"}),hasFeedback:!0,rules:[{required:!0,message:"Por seleccione la ultima propiedad comprada"}],children:(0,a.jsx)(m.Z,{name:"nombre_propiedad",value:Q.nombre_propiedad,onChange:(e,r)=>eo(r),allowClear:!0,options:ea||[],filterOption:(e,r)=>-1!==r.value.toUpperCase().indexOf(e.toUpperCase()),children:(0,a.jsx)(x.Z,{placeholder:"Buscar propiedad",prefix:(0,a.jsx)(f.Z,{})})})})}),(0,a.jsx)(u.Z,{xs:24,md:12,lg:12,children:(0,a.jsx)(c.Z.Item,{name:"nombre_trabajador",value:Q.nombre_trabajador,label:(0,a.jsx)(d.L,{text:"Trabajador encargado de la \xfaltima venta"}),hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el trabajador encargado"}],children:(0,a.jsx)(m.Z,{name:"nombre_trabajador",value:Q.nombre_trabajador,onChange:(e,r)=>er(r),allowClear:!0,options:$||[],filterOption:(e,r)=>-1!==r.value.toUpperCase().indexOf(e.toUpperCase()),children:(0,a.jsx)(x.Z,{placeholder:"Buscar Trabajador",prefix:(0,a.jsx)(f.Z,{})})})})}),(0,a.jsx)(u.Z,{span:24,children:(0,a.jsx)(c.Z.Item,{children:(0,a.jsxs)(s.Z,{gutter:[16,16],justify:"end",children:[(0,a.jsx)(u.Z,{xs:24,md:12,lg:4,justify:"end",order:k?2:1,children:(0,a.jsx)(b.ZP,{onClick:t,className:"w-full",children:"Cancelar"},"back")}),(0,a.jsx)(u.Z,{xs:24,md:12,lg:6,order:k?1:2,children:(0,a.jsx)(b.ZP,{type:"primary",loading:o?T:Z?U:F,htmlType:"submit",className:"w-full",children:o?"Pasar Cliente":"Guardar cliente"})})]})})})]})})};var Z=t(90362),I=t(98945),w=t(92951);let C=e=>{let{isModalOpen:r,handleCancel:t,client:n=null}=e,d=(0,i.useDispatch)(),l=(0,i.useSelector)(e=>e.crud.data),c=()=>{d((0,o.qD)()),t()};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(Z.Z,{title:(0,a.jsx)(I.Z.Title,{level:3,className:"text-center text-text-title",children:l?"Editar Cliente Trabajado":"Nuevo Cliente Trabajado"}),style:{top:20},width:1e3,open:r,onCancel:c,footer:null,children:[(0,a.jsx)(w.Z,{className:"mt-0"}),(0,a.jsx)(k,{handleCancel:c,client:n})]})})}},24294:function(e,r,t){t.d(r,{kB:function(){return U},Q:function(){return M},km:function(){return L},q$:function(){return W},PN:function(){return z},xV:function(){return V},RM:function(){return B},eB:function(){return G},t1:function(){return R},i:function(){return Q},$J:function(){return H}});var a=t(9268),o=t(98945),i=t(67806),n=t(50946),d=t(37957),l=t(15480),c=t(8540),s=t(57981),u=t(1762),x=t(98898),p=t(12785),m=t(86006);let b=e=>{var r;let{images:t}=e,[o,i]=(0,m.useState)(!1);return(0,a.jsx)(a.Fragment,{children:(null==t?void 0:t.length)>0?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(x.Z,{preview:{visible:!1},width:100,height:100,src:null===(r=t[0])||void 0===r?void 0:r.url,onClick:()=>i(!0)}),(0,a.jsx)("div",{style:{display:"none"},children:(0,a.jsx)(x.Z.PreviewGroup,{preview:{visible:o,onVisibleChange:e=>i(e)},children:t.map((e,r)=>(0,a.jsx)(x.Z,{src:e.url},r))})})," "]}):(0,a.jsx)("div",{className:"w-[100px] h-[100px] bg-gray-200",children:(0,a.jsx)("div",{className:"flex justify-center items-center h-full",children:(0,a.jsx)(p.Z,{})})})})};var h=t(90362),f=t(4537),j=t(69659),v=t(63161);let y=e=>{let{video:r}=e,[t,i]=(0,m.useState)(!1),d=()=>{i(!0)},l=()=>{i(!1)};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",onClick:d,children:(0,a.jsx)(f.Z,{})}),t&&(0,a.jsx)(h.Z,{open:t,onCancel:l,footer:null,centered:!0,className:"w-[30rem] h-80 relative",children:""!==r?(0,a.jsx)("div",{className:"absolute top-0 left-0 right-0 bottom-0 w-full h-full",children:(0,a.jsx)(v.Z,{url:r,width:"100%",height:"20rem",controls:!0})}):(0,a.jsxs)("div",{className:"w-full h-full flex flex-col gap-4 justify-center items-center text-red-500",children:[(0,a.jsx)(j.Z,{}),(0,a.jsx)(o.Z.Text,{className:"text-red-500",children:"No se encontro el video"})]})})]})};var g=t(35200);let _=e=>{let{data:r,enableProperty:t}=e,i=()=>{t(r.cod_propiedad)};return(0,a.jsx)(g.Z,{checked:r.propiedadHabilitada,onChange:i,children:(0,a.jsx)(o.Z.Text,{className:r.propiedadHabilitada?"text-green-500":"text-red-500",children:r.propiedadHabilitada?"Habilitado":"Deshabilitado"})})};var k=t(14682),Z=t(3508);let I=e=>{let{data:r,stateProperty:t}=e,o=e=>{t(e,r.cod_propiedad)};return(0,a.jsx)(Z.Z,{value:r.estado,options:k.p.map(e=>(null==r?void 0:r.propiedadHabilitada)?{...e,disabled:!r.estado}:e),className:"w-full",onChange:o})};var w=t(88334),C=t(70544);let N=e=>{let{titulo:r}=e,{isModalOpen:t,handleOpen:i,handleCancel:d}=(0,w.d)();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.ZP,{icon:(0,a.jsx)(C.Z,{}),className:"flex",onClick:i,children:"Visualizar"}),t&&(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(h.Z,{open:t,onCancel:d,footer:null,width:800,bodyStyle:{height:"85vh"},className:"top-5",children:""!==r?(0,a.jsx)("iframe",{title:"PDF Viewer",src:r,width:"100%",height:"100%",style:{position:"absolute",top:0,bottom:0,left:0,right:0}}):(0,a.jsxs)("div",{className:"w-full h-full flex flex-col gap-4 justify-center items-center text-red-500",children:[(0,a.jsx)(j.Z,{}),(0,a.jsx)(o.Z.Text,{className:"text-red-500",children:"No se encontro un titulo de propiedad"})]})})})]})},T=(e,r)=>{var t;return(null===(t=e.data)||void 0===t?void 0:t.cod_rol)!==1&&(null==e?void 0:e.data.cod_usuario)!==(null==r?void 0:r.creado_por)};var P=t(72083),E=t(52641);let q=e=>{let{quotation:r}=e,t=(0,E.useSelector)(e=>e.auth.user),o=()=>{var e,t;window.open("https://api.whatsapp.com/send?phone=".concat(null==r?void 0:null===(e=r.cliente)||void 0===e?void 0:e.celular,"&text=Cotizaci\xf3n: Propiedad - ").concat(null==r?void 0:null===(t=r.propiedad)||void 0===t?void 0:t.nombre),"_blank")};return(0,a.jsx)(n.ZP,{className:"flex justify-center items-center border-green-500 text-green-500 hover:bg-green-500 hover:text-white",icon:(0,a.jsx)(P.Z,{}),onClick:o,disabled:T(t,r)||!1,children:"Enviar"})};var D=t(7310);let S=e=>{let{quotation:r,sendMailQuotationPDF:t}=e,o=(0,E.useSelector)(e=>e.auth.user);return(0,a.jsx)(n.ZP,{className:"flex justify-center items-center border-primary-300 text-primary-500 hover:bg-primary-300 hover:text-white",icon:(0,a.jsx)(D.Z,{}),onClick:()=>t(r.cod_cotizacion),disabled:T(o,r)||!1,children:"Enviar"})};var F=t(76511);let O=e=>{let{client:r}=e,{isModalOpen:t,handleOpen:o,handleCancel:i}=(0,w.d)(),d=(0,E.useSelector)(e=>e.auth.user);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.ZP,{onClick:o,className:"w-full border-primary",disabled:T(d,r)||!1,children:"Cambiar a cliente trabajado"}),t&&(0,a.jsx)(F.n,{isModalOpen:t,handleCancel:i,client:r})]})},A=e=>{let{text:r}=e;return(0,a.jsx)("span",{className:"capitalize",children:r})},W=(e,r,t,l,x)=>{let p=(0,E.useSelector)(e=>e.auth.user);return[{title:"ID",dataIndex:"cod_propiedad",key:"cod_propiedad",width:50},{title:"Imagenes",dataIndex:"imagenes",key:"imagenes",width:150,render:e=>(0,a.jsx)(b,{images:e})},{title:"Video",dataIndex:"video",key:"video",width:150,render:e=>(0,a.jsx)(y,{video:e})},{title:"Nombre",dataIndex:"nombre",key:"nombre",render:e=>(0,a.jsx)(A,{text:e}),sorter:(e,r)=>e.nombre.localeCompare(r.nombre)},{title:"Propietario",key:"propietario",dataIndex:"propietario",render:e=>(0,a.jsx)(A,{text:e.nombre}),sorter:(e,r)=>e.propietario.nombre.localeCompare(r.propietario.nombre)},{title:"Tipo",key:"tipo",dataIndex:"tipo",sorter:(e,r)=>e.tipo.localeCompare(r.tipo),render:e=>(0,a.jsx)(o.Z.Text,{className:"rounded-2xl capitalize px-4 py-1 ".concat("casa"===e?"text-green-500 bg-green-200":"departamento"===e?"text-blue-500 bg-blue-200":"terreno"===e?"text-secundary bg-secundary-200":"local"===e?"text-cyan-600 bg-cyan-200":"oficina"===e?"text-gray-500 bg-gray-200":"text-indigo-800 bg-indigo-200"),children:e})},{title:"Precio",key:"precio",dataIndex:"precio",width:100,sorter:(e,r)=>e.precio-r.precio},{title:"Direcci\xf3n",key:"direccion",dataIndex:"direccion",sorter:(e,r)=>e.direccion.localeCompare(r.direccion)},{title:"Zona",key:"zona",dataIndex:"zona",sorter:(e,r)=>e.zona.localeCompare(r.zona)},{title:"Estado",key:"estado",dataIndex:"estado",width:150,render:(r,t)=>(0,a.jsx)(I,{data:t,stateProperty:e})},{title:"Habilitar",key:"propiedad_habilitada",dataIndex:"propiedad_habilitada",width:150,render:(e,t)=>(0,a.jsx)(_,{data:t,enableProperty:r})},{title:"Fecha de creaci\xf3n",key:"createdAt",dataIndex:"createdAt",width:150},{title:"Acciones",key:"acciones",dataIndex:"acciones",fixed:"right",width:150,render:(e,r)=>(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)(i.Z,{title:"Descargar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(c.Z,{}),onClick:()=>x(null==r?void 0:r.nombre,null==r?void 0:r.cod_propiedad)})}),(0,a.jsx)(i.Z,{title:"Editar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(s.Z,{}),onClick:()=>t(r),disabled:T(p,r)||!1})}),(0,a.jsx)(d.Z,{placement:"left",title:"\xbfEst\xe1 seguro de eliminar el registro?",onConfirm:()=>l(r.cod_propiedad),okText:"Si",cancelText:"No",disabled:T(p,r)||!1,children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(u.Z,{}),danger:!0,disabled:T(p,r)||!1})})]})}]},z=()=>[{title:"ID",dataIndex:"cod_propiedad",key:"cod_propiedad",width:50},{title:"Imagenes",dataIndex:"imagenes",key:"imagenes",width:150,render:e=>(0,a.jsx)(b,{images:e})},{title:"Video",dataIndex:"video",key:"video",width:150,render:e=>(0,a.jsx)(y,{video:e})},{title:"Nombre",dataIndex:"nombre",key:"nombre",render:e=>(0,a.jsx)(A,{text:e})},{title:"Propietario",key:"propietario",dataIndex:"propietario",render:e=>(0,a.jsx)(A,{text:e.nombre})},{title:"Tipo",key:"tipo",dataIndex:"tipo",render:e=>(0,a.jsx)(o.Z.Text,{className:"rounded-2xl capitalize px-4 py-1 ".concat("casa"===e?"text-green-500 bg-green-200":"departamento"===e?"text-blue-500 bg-blue-200":"terreno"===e?"text-secundary bg-secundary-200":"local"===e?"text-cyan-600 bg-cyan-200":"oficina"===e?"text-gray-500 bg-gray-200":"text-indigo-800 bg-indigo-200"),children:e})},{title:"Precio",key:"precio",dataIndex:"precio",width:100},{title:"Direcci\xf3n",key:"direccion",dataIndex:"direccion"},{title:"Zona",key:"zona",dataIndex:"zona"}],L=(e,r)=>{let t=(0,E.useSelector)(e=>e.auth.user);return[{title:"Id",dataIndex:"cod_propietario",key:"cod_propietario",width:50},{title:"Nombre completo",dataIndex:"nombre",key:"nombre",render:e=>(0,a.jsx)(A,{text:e}),sorter:(e,r)=>e.nombre.localeCompare(r.nombre),width:200},{title:"DNI",dataIndex:"dni",key:"dni"},{title:"Direcci\xf3n",dataIndex:"direccion",key:"direccion"},{title:"Celular",dataIndex:"celular",key:"celular"},{title:"Titulo de propiedad",dataIndex:"titulo_propiedad",key:"titulo_propiedad",render:e=>(0,a.jsx)(N,{titulo:e})},{title:"Acciones",dataIndex:"acciones",key:"acciones",fixed:"right",width:100,render:(o,l)=>(0,a.jsxs)("div",{className:"flex justify-center gap-4",children:[(0,a.jsx)(i.Z,{title:"Editar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(s.Z,{}),onClick:()=>e(l),disabled:T(t,l)||!1})}),(0,a.jsx)(d.Z,{placement:"left",title:"\xbfEst\xe1 seguro de eliminar el registro?",onConfirm:()=>r(l.cod_propietario),okText:"Si",cancelText:"No",disabled:T(t,l)||!1,children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(u.Z,{}),danger:!0,disabled:T(t,l)||!1})})]})}]},U=(e,r)=>{let t=(0,E.useSelector)(e=>e.auth.user);return[{title:"Id",dataIndex:"cod_cliente",key:"cod_cliente",width:50},{title:"Nombre completo",dataIndex:"nombre",key:"nombre",width:200,render:e=>(0,a.jsx)(A,{text:e}),sorter:(e,r)=>e.nombre.localeCompare(r.nombre)},{title:"DNI",dataIndex:"dni",key:"dni"},{title:"Celular",dataIndex:"celular",key:"celular"},{title:"Correo",dataIndex:"correo",key:"correo"},{title:"Acciones",dataIndex:"acciones",key:"acciones",fixed:"right",width:320,render:(o,l)=>(0,a.jsxs)("div",{className:"flex flex-row gap-2",children:[(0,a.jsx)(O,{client:l,children:"Cambiar a cliente trabajado"}),(0,a.jsx)(i.Z,{title:"Editar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(s.Z,{}),onClick:()=>e(l),disabled:T(t,l)||!1})}),(0,a.jsx)(d.Z,{placement:"left",title:"\xbfEst\xe1 seguro de eliminar el registro?",onConfirm:()=>r(l.cod_cliente),okText:"Si",cancelText:"No",disabled:T(t,l)||!1,children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(u.Z,{}),danger:!0,disabled:T(t,l)||!1})})]})}]},M=(e,r)=>{let t=(0,E.useSelector)(e=>e.auth.user);return[{title:"ID",dataIndex:"cod_cliente",key:"cod_cliente",width:50},{title:"Nombre completo",dataIndex:"nombre",key:"nombre",width:200,render:e=>(0,a.jsx)(A,{text:e}),sorter:(e,r)=>e.nombre.localeCompare(r.nombre)},{title:"DNI",dataIndex:"dni",key:"dni"},{title:"Celular",dataIndex:"celular",key:"celular"},{title:"Correo",dataIndex:"correo",key:"correo"},{title:"\xdaltima propiedad Ofertada",dataIndex:"propiedad_ofertada",key:"propiedad_ofertada",width:250,render:(e,r)=>{var t;return(0,a.jsx)(A,{text:(null===(t=r.propiedad)||void 0===t?void 0:t.nombre)||""})}},{title:"Trabajador encargado de la ultima venta",dataIndex:"trabajador_nombre",key:"trabajador_nombre",width:300,render:(e,r)=>{var t;return(0,a.jsx)(A,{text:(null===(t=r.trabajador)||void 0===t?void 0:t.nombre)||""})}},{title:"Acciones",dataIndex:"acciones",key:"acciones",fixed:"right",width:100,render:(o,l)=>(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)(i.Z,{title:"Editar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(s.Z,{}),onClick:()=>e(l),disabled:T(t,l)||!1})}),(0,a.jsx)(d.Z,{placement:"left",title:"\xbfEst\xe1 seguro de eliminar el registro?",onConfirm:()=>r(l.cod_cliente,l.cod_venta),okText:"Si",cancelText:"No",disabled:T(t,l)||!1,children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(u.Z,{}),danger:!0,disabled:T(t,l)||!1})})]})}]},V=(e,r,t,o)=>{let l=(0,E.useSelector)(e=>e.auth.user);return[{title:"Id",dataIndex:"cod_cotizacion",key:"cod_cotizacion",width:50},{title:"Fecha emisi\xf3n",dataIndex:"fecha_emision",key:"fecha_emision",width:100},{title:"Fecha caducidad",dataIndex:"fecha_vencimiento",key:"fecha_vencimiento",width:150},{title:"Nombre cliente",dataIndex:"nombre_cliente",key:"nombre_cliente",render:(e,r)=>{var t;return(0,a.jsx)(A,{text:(null===(t=r.cliente)||void 0===t?void 0:t.nombre)||""})}},{title:"Correo cliente",dataIndex:"correo_cliente",key:"correo_cliente",render:(e,r)=>{var t;return(null===(t=r.cliente)||void 0===t?void 0:t.correo)||""}},{title:"Celular cliente",dataIndex:"celular_cliente",key:"celular_cliente",render:(e,r)=>{var t;return(null===(t=r.cliente)||void 0===t?void 0:t.celular)||""}},{title:"Enviar por correo",render:(e,r)=>(0,a.jsx)(S,{quotation:r,sendMailQuotationPDF:o})},{title:"Enviar por whatsapp",render:(e,r)=>(0,a.jsx)(q,{quotation:r})},{title:"Acciones",dataIndex:"acciones",key:"acciones",fixed:"right",width:150,render:(o,x)=>(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)(i.Z,{title:"Descargar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(c.Z,{}),onClick:()=>{var e;return t(null==x?void 0:null===(e=x.cliente)||void 0===e?void 0:e.nombre,null==x?void 0:x.cod_cotizacion)}})}),(0,a.jsx)(i.Z,{title:"Editar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(s.Z,{}),onClick:()=>e(x),disabled:T(l,x)||!1})}),(0,a.jsx)(d.Z,{placement:"left",title:"\xbfEst\xe1 seguro de eliminar el registro?",onConfirm:()=>r(x.cod_cotizacion),okText:"Si",cancelText:"No",disabled:T(l,x)||!1,children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(u.Z,{}),danger:!0,disabled:T(l,x)||!1})})]})}]},H=(e,r)=>[{title:"Id",dataIndex:"cod_usuario",key:"cod_usuario",width:50},{title:"Nombre",dataIndex:"nombre",key:"nombre",render:e=>(0,a.jsx)(A,{text:e})},{title:"DNI",dataIndex:"dni",key:"dni"},{title:"Oficina",dataIndex:"oficina",key:"oficina"},{title:"Correo",dataIndex:"correo",key:"correo"},{title:"Celular",dataIndex:"celular",key:"celular"},{title:"Acciones",dataIndex:"acciones",key:"acciones",fixed:"right",width:100,render:(t,o)=>(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)(i.Z,{title:"Editar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(s.Z,{}),onClick:()=>e(o)})}),(0,a.jsx)(d.Z,{placement:"left",title:"\xbfEst\xe1 seguro de eliminar el registro?",onConfirm:()=>r(o.cod_usuario),okText:"Si",cancelText:"No",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(u.Z,{}),danger:!0})})]})}],B=()=>[{title:"Id",dataIndex:"id",key:"id",width:100,sorter:(e,r)=>e.id-r.id},{title:"Nombre",dataIndex:"nombre",key:"nombre",render:e=>(0,a.jsx)(A,{text:e})},{title:"Fecha ingreso",dataIndex:"fecha_ingreso",key:"fecha_ingreso"},{title:"Hora ingreso",dataIndex:"hora_ingreso",key:"hora_ingreso"}],G=()=>[{title:"ID",dataIndex:"cod_agente",key:"cod_agente"},{title:"Nombre",dataIndex:"nombre",key:"nombre",render:e=>(0,a.jsx)(A,{text:e})},{title:"Ofertas de propiedades",dataIndex:"propiedad",key:"propiedad",render:e=>e.length>0?(0,a.jsx)(l.Z,{color:"green",children:"Se encuentra ofertando propiedades"}):(0,a.jsx)(l.Z,{color:"red",children:"No se encuentra ofertando propiedades"})}],Q=(e,r)=>[{title:"ID",dataIndex:"cod_usuario",key:"cod_usuario",width:50},{title:"Nombre",dataIndex:"nombre",key:"nombre",render:e=>(0,a.jsx)(A,{text:e})},{title:"DNI",dataIndex:"dni",key:"dni"},{title:"Correo",dataIndex:"correo",key:"correo"},{title:"Celular",dataIndex:"celular",key:"celular"},{title:"Rol",dataIndex:"rol",key:"rol",sorter:(e,r)=>e.rol.rol.localeCompare(r.rol.rol),render:e=>(0,a.jsx)("span",{className:"capitalize",children:e.rol})},{title:"Oficina",dataIndex:"oficina",key:"oficina"},{title:"Acciones",dataIndex:"acciones",key:"acciones",fixed:"right",width:100,render:(t,o)=>(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)(i.Z,{title:"Editar",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(s.Z,{}),onClick:()=>e(o)})}),(0,a.jsx)(d.Z,{placement:"left",title:"\xbfEst\xe1 seguro de eliminar el registro?",onConfirm:()=>r(o.cod_usuario),okText:"Si",cancelText:"No",children:(0,a.jsx)(n.ZP,{className:"flex justify-center items-center",icon:(0,a.jsx)(u.Z,{}),danger:!0})})]})}],R=(e,r)=>[{title:"ID",dataIndex:"cod_rol",key:"cod_rol",width:50},{title:"Rol",dataIndex:"rol",key:"rol",render:e=>(0,a.jsx)(A,{text:e})}]},14682:function(e,r,t){t.d(r,{p:function(){return a}});let a=[{value:"activo",label:"Activo"},{value:"pendiente",label:"Pendiente"},{value:"observacion",label:"En observaci\xf3n"},{value:"inactivo",label:"Inactivo"},{value:"vendida",label:"Vendida"}]},5710:function(e,r,t){t.d(r,{B2:function(){return o},Hi:function(){return u},RW:function(){return c},Xo:function(){return n},bU:function(){return d},dZ:function(){return a},ds:function(){return x},iI:function(){return l},jy:function(){return p},n8:function(){return i},w5:function(){return s}});let a={key:"",imagenes:[],video:"",nombre:"",cod_propietario:"",nombre_propietario:"",tipo:"",precio:"",direccion:"",zona:"",descripcion:"",estado:"",caracteristicas:"",metraje:"",propiedadHabilitada:!1,areaLibre:"",cocheraAdicional:"",comision:"",observaciones:""},o={cod_propietario:"",nombre:"",dni:"",celular:"",direccion:"",titulo_propiedad:""},i={cod_cliente:"",nombre:"",dni:"",celular:"",correo:""},n={cod_cliente:"",nombre:"",dni:"",celular:"",correo:"",cod_propiedad:"",nombre_propiedad:"",cod_trabajador:"",nombre_trabajador:""},d={cod_cotizacion:"",fecha_emision:new Date,fecha_caducidad:new Date,cod_propiedad:"",nombre_propiedad:"",propiedad:null,cod_cliente:"",cliente:"",nombre_cliente:"",dni_cliente:"",correo_cliente:"",celular_cliente:"",cod_trabajador:"",nombre_trabajador:""},l={propietario:"",area_terreno:0,valor_m2:0,area_construccion:0,valor_construccion:0,antiguedad_propiedad:0,valor_remodelacion:0},c={propietario:"",area_ocupada:0,area_libre:0,area_construida:0,antiguedad_propiedad:0,valor_comercial:0,valor_estacionamiento:0,valor_deposito:0,valor_remodelacion:0},s={propietario:"",area_terreno:0,valor_m2:0,area_construccion:0,valor_construccion:0,antiguedad_propiedad:0,valor_remodelacion:0},u={cod_agente:"",nombre:"",dni:"",oficina:"",correo:"",celular:""},x={cod_usuario:"",nombre:"",dni:"",correo:"",password:"",celular:"",cod_rol:"",oficina:""},p={cod_rol:"",nombre:"",permisos:[]}},4660:function(e,r,t){t.d(r,{I:function(){return i}});var a=t(86006),o=t(55129);let i=()=>{let{windowSize:e}=(0,o.i)(),[r,t]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{e.width<768?t(!0):t(!1)},[e]),r}},88334:function(e,r,t){t.d(r,{d:function(){return o}});var a=t(86006);let o=()=>{let[e,r]=(0,a.useState)(!1),t=()=>{r(!0)},o=()=>{r(!1)},i=()=>{r(!1)};return{isModalOpen:e,handleOpen:t,handleOk:o,handleCancel:i}}},55129:function(e,r,t){t.d(r,{i:function(){return o}});var a=t(86006);let o=()=>{let[e,r]=(0,a.useState)({width:void 0,height:void 0});(0,a.useEffect)(()=>{function e(){r({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]);let[t,o]=(0,a.useState)(100),[i,n]=(0,a.useState)(100);return(0,a.useEffect)(()=>{e.width>1024?(o(100),n(100)):e.width>768?(o(80),n(80)):(o(40),n(40))},[e]),{windowSize:e,width:t,height:i}}},96230:function(e,r,t){t.d(r,{qD:function(){return n},qT:function(){return i}});let{createSlice:a}=t(50803),o=a({name:"crud",initialState:{loading:!1,error:null,data:null},reducers:{setDataToEdit:(e,r)=>{e.loading=!0,e.error=null,e.data=r.payload.data},resetDataToEdit:e=>{e.loading=!0,e.error=null,e.data=null}}}),{setDataToEdit:i,resetDataToEdit:n}=o.actions;r.ZP=o.reducer},84153:function(e,r,t){t.d(r,{BV:function(){return o},NM:function(){return n},ZX:function(){return i},jg:function(){return l},mC:function(){return d},wc:function(){return c}});var a=t(32895);let o=(0,a.createApi)({reducerPath:"clientPossibleApi",baseQuery:(0,a.fetchBaseQuery)({baseUrl:"http://3.86.194.103/api/v1/"}),refetchOnMountOrArgChange:!0,refetchOnFocus:!0,refetchOnReconnect:!0,tagTypes:["clientPossible"],endpoints:e=>({getClientPossible:e.query({query:()=>({url:"cliente/posible/",method:"GET"}),providesTags:["clientPossible"]}),createClientPossible:e.mutation({query:e=>({url:"cliente/posible/",method:"POST",body:e}),invalidatesTags:["clientPossible"]}),updateClientPossible:e.mutation({query:e=>{let{clientPossible:r,id:t}=e;return{url:"cliente/posible/".concat(t),method:"PUT",body:r}},invalidatesTags:["clientPossible"]}),deleteClientPossible:e.mutation({query:e=>({url:"cliente/".concat(e),method:"DELETE"}),invalidatesTags:["clientPossible"]}),changeClientPossibleToClientWorked:e.mutation({query:e=>{let{values:r,id:t}=e;return{url:"cliente/posible/trabajado/".concat(t),method:"PUT",body:r}},invalidatesTags:["clientPossible"]})})}),{useGetClientPossibleQuery:i,useCreateClientPossibleMutation:n,useUpdateClientPossibleMutation:d,useDeleteClientPossibleMutation:l,useChangeClientPossibleToClientWorkedMutation:c}=o},63731:function(e,r,t){t.d(r,{Dl:function(){return d},Em:function(){return l},XM:function(){return c},l9:function(){return i},oJ:function(){return n},pN:function(){return o}});var a=t(32895);let o=(0,a.createApi)({reducerPath:"clientWorkedApi",baseQuery:(0,a.fetchBaseQuery)({baseUrl:"http://3.86.194.103/api/v1/"}),refetchOnMountOrArgChange:!0,refetchOnFocus:!0,refetchOnReconnect:!0,tagTypes:["clientWorked"],endpoints:e=>({getClientWorked:e.query({query:()=>({url:"cliente/trabajado",method:"GET"}),providesTags:["clientWorked"]}),createClientWorked:e.mutation({query:e=>({url:"cliente/trabajado",method:"POST",body:e}),invalidatesTags:["clientWorked"]}),updateClientWorked:e.mutation({query:e=>{let{clientWorked:r,codClient:t,codSale:a}=e;return{url:"cliente/trabajado/".concat(t,"/").concat(a),method:"PUT",body:r}},invalidatesTags:["clientWorked"]}),deleteClientWorked:e.mutation({query:e=>{let{codClient:r,codSale:t}=e;return{url:"cliente/trabajado/".concat(r,"/").concat(t),method:"DELETE"}},invalidatesTags:["clientWorked"]}),getClientWorkedAndPossibles:e.query({query:()=>({url:"cliente/todos",method:"GET"}),providesTags:["clientWorked"]})})}),{useGetClientWorkedQuery:i,useCreateClientWorkedMutation:n,useUpdateClientWorkedMutation:d,useDeleteClientWorkedMutation:l,useGetClientWorkedAndPossiblesQuery:c}=o},58682:function(e,r,t){t.d(r,{JD:function(){return d},Sf:function(){return n},YW:function(){return u},_o:function(){return p},b7:function(){return h},dX:function(){return c},f2:function(){return s},iv:function(){return m},ri:function(){return x}});var a=t(32895),o=t(86902),i=t.n(o);let n=(0,a.createApi)({reducerPath:"propertiesApi",baseQuery:(0,a.fetchBaseQuery)({baseUrl:"http://3.86.194.103/api/v1/"}),refetchOnMountOrArgChange:!0,refetchOnFocus:!0,refetchOnReconnect:!0,tagTypes:["property"],endpoints:e=>({getProperties:e.query({query:()=>({url:"propiedad",method:"GET"}),providesTags:["property"]}),getProperty:e.query({query:e=>({url:"propiedad/".concat(e),method:"GET"}),invalidatesTags:["property"]}),createProperty:e.mutation({query:e=>({url:"propiedad",method:"POST",body:e}),invalidatesTags:["property"]}),updateProperty:e.mutation({query:e=>{let{property:r,id:t}=e;return{url:"propiedad/".concat(t),method:"PUT",body:r}},invalidatesTags:["property"]}),deleteProperty:e.mutation({query:e=>({url:"propiedad/".concat(e),method:"DELETE"}),invalidatesTags:["property"]}),enableProperty:e.mutation({query:e=>({url:"propiedad/habilitado/".concat(e),method:"GET"}),invalidatesTags:["property"]}),estateProperty:e.mutation({query:e=>{let{state:r,id:t}=e;return{url:"propiedad/estado/".concat(t),method:"PUT",body:r}},invalidatesTags:["property"]}),getPropertiesByUser:e.query({query:e=>({url:"propiedad/usuario/".concat(e),method:"GET"}),providesTags:["property"]}),downloadProperty:e.query({query:e=>{let{nombre:r,id:t}=e;return{url:"propiedad/descargar/".concat(t),method:"GET",responseType:"blob",responseHandler:async e=>{let t=await e.blob(),a=URL.createObjectURL(t),o=document.createElement("a");o.href=a,o.setAttribute("download","Propiedad_".concat(r,"_").concat(i()().format("YYYY-MM-DD-HH-mm-ss"),".pdf")),o.setAttribute("target","_blank"),document.body.appendChild(o),o.click()},cache:"no-cache"}}})})}),{useGetPropertiesQuery:d,useGetPropertyQuery:l,useCreatePropertyMutation:c,useUpdatePropertyMutation:s,useDeletePropertyMutation:u,useEnablePropertyMutation:x,useEstatePropertyMutation:p,useGetPropertiesByUserQuery:m,useLazyGetPropertiesByUserQuery:b,useLazyDownloadPropertyQuery:h}=n},34138:function(e,r,t){t.d(r,{An:function(){return d},YT:function(){return o},ss:function(){return l},tn:function(){return i},zL:function(){return n}});var a=t(32895);let o=(0,a.createApi)({reducerPath:"workersApi",baseQuery:(0,a.fetchBaseQuery)({baseUrl:"http://3.86.194.103/api/v1/"}),refetchOnMountOrArgChange:!0,refetchOnFocus:!0,refetchOnReconnect:!0,tagTypes:["workers"],endpoints:e=>({getWorkers:e.query({query:()=>({url:"agente",method:"GET"}),providesTags:["workers"]}),createWorker:e.mutation({query:e=>({url:"agente",method:"POST",body:e}),invalidatesTags:["workers"]}),updateWorker:e.mutation({query:e=>{let{worker:r,id:t}=e;return{url:"agente/".concat(t),method:"PUT",body:r}},invalidatesTags:["workers"]}),deleteWorker:e.mutation({query:e=>({url:"agente/".concat(e),method:"DELETE"}),invalidatesTags:["workers"]})})}),{useGetWorkersQuery:i,useCreateWorkerMutation:n,useUpdateWorkerMutation:d,useDeleteWorkerMutation:l}=o}}]);