(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4186],{32546:function(e,a,l){Promise.resolve().then(l.bind(l,19064))},19064:function(e,a,l){"use strict";l.r(a),l.d(a,{default:function(){return A}});var i=l(9268),t=l(96230),n=l(90362),r=l(98945),o=l(52641),c=l(5710),d=l(4660),s=l(83206),u=l(70509),x=l(76234),m=l(92951),h=l(40994),p=l(53235),j=l(80970),f=l(30015),v=l(50946),b=l(97278),Z=l(86006),_=l(47434),g=l(42301),y=l(24294),Y=l(86902),C=l.n(Y),D=l(14856),M=l(63731),k=l(58682),w=l(29274),N=l(91608),F=l(39558),I=l(66625);let O=e=>{let{loading:a,columns:l,data:t}=e,n=[{title:"Descripci\xf3n",dataIndex:"descripcion",key:"descripcion"},{title:"Caracter\xedsticas",dataIndex:"caracteristicas",key:"caracteristicas"},{title:"Metraje",dataIndex:"metraje",metraje:"metraje",width:80,render:e=>e+" m\xb2"},{title:"\xc1rea libre",dataIndex:"areaLibre",key:"areaLibre",width:100,render:e=>e+" m\xb2"},{title:"Cochera adicional",dataIndex:"cocheraAdicional",key:"cocheraAdicional",width:150,render:e=>e?(0,i.jsx)(w.Z,{color:"green",text:"SI"}):(0,i.jsx)(w.Z,{color:"red",text:"NO"})},{title:"Observaciones",dataIndex:"observaciones",key:"observaciones"},{title:"Porcentaje de comisi\xf3n",dataIndex:"comision",key:"comision",render:e=>e+" %"}];return(0,i.jsx)(N.Z,{loading:a,columns:l,dataSource:t,rowKey:e=>null==e?void 0:e.cod_propiedad,pagination:!1,scroll:{x:2e3,y:"max-content"},expandable:{expandedRowRender:e=>e&&(0,i.jsx)(N.Z,{columns:n,dataSource:[{key:e.cod_propiedad,descripcion:e.descripcion,caracteristicas:e.caracteristicas,metraje:e.metraje,areaLibre:e.areaLibre,cocheraAdicional:e.cocheraAdicional,observaciones:e.observaciones,comision:e.comision}],rowKey:e=>e.key,pagination:!1}),expandIcon:e=>{let{expanded:a,onExpand:l,record:t}=e;return a?(0,i.jsx)(F.Z,{onClick:e=>l(t,e)}):(0,i.jsx)(I.Z,{onClick:e=>l(t,e)})}}})};var q=l(68919),E=l(57212);let L=e=>{let{handleCancel:a}=e,l=(0,d.I)(),t=(0,o.useSelector)(e=>e.crud.data),n=(0,y.PN)(),Y=(0,o.useSelector)(e=>e.auth.user.data),[w,{isLoading:N,isError:F,error:I,isSuccess:L,data:z}]=(0,D.ic)(),[S,{isLoading:T,isError:P,error:A,isSuccess:Q,data:U}]=(0,D.kD)(),{data:V}=(0,M.XM)(null),{data:B}=(0,k.iv)(null==Y?void 0:Y.cod_usuario),[G]=s.Z.useForm(),[R,K]=(0,Z.useState)(c.bU),H=(0,Z.useMemo)(()=>null==V?void 0:V.data,[V]),X=null==H?void 0:H.map(e=>({cod:e.cod_cliente,value:e.nombre,data:e})),J=e=>{if(e){let{value:a,cod:l,data:i}=e;G.setFieldValue({cod_cliente:l||"",cliente:i||"",nombre_cliente:a||"",dni_cliente:(null==i?void 0:i.dni)||"",correo_cliente:(null==i?void 0:i.correo)||"",celular_cliente:(null==i?void 0:i.celular)||""}),K(e=>({...e,cod_cliente:l||"",cliente:i||"",nombre_cliente:a||"",dni_cliente:(null==i?void 0:i.dni)||"",correo_cliente:(null==i?void 0:i.correo)||"",celular_cliente:(null==i?void 0:i.celular)||""}))}},W=(0,Z.useMemo)(()=>null==B?void 0:B.data,[B]),$=null==W?void 0:W.map(e=>({cod:e.cod_propiedad,value:e.nombre,data:e,label:(0,i.jsxs)(u.Z,{children:[(0,i.jsx)(x.Z,{span:16,children:e.nombre}),(0,i.jsx)(x.Z,{span:8,children:(0,i.jsxs)(r.Z.Text,{type:"secondary",italic:!0,children:[" ","Precio: ",e.precio]})})]})})),[ee,ea]=(0,Z.useState)($);(0,Z.useEffect)(()=>{ea($)},[$]);let el=e=>{if(e){let{value:a,cod:l,data:i}=e;G.setFieldValue({cod_propiedad:l||"",nombre_propiedad:a||"",propiedad:i}),K(e=>({...e,cod_propiedad:l||"",nombre_propiedad:a||"",propiedad:i}))}},ei=E.C,et=E.z,[en,er]=(0,Z.useState)([ei,et]),eo=e=>{er(e)},ec=()=>{let e=$.filter(e=>e.data.precio>=en[0]&&e.data.precio<=en[1]);ea(e)},ed=()=>{ea($),er([ei,et])},es=(e,a)=>{G.setFieldsValue({...R,fecha_emision:C()(e,"DD/MM/YYYY")}),K({...R,fecha_emision:C()(e,"DD/MM/YYYY")})},eu=(e,a)=>{G.setFieldsValue({...R,fecha_caducidad:C()(e,"DD/MM/YYYY")}),K({...R,fecha_caducidad:C()(e,"DD/MM/YYYY")})};(0,Z.useEffect)(()=>{if(t){var e,a,l,i,n,r,o,c;let d={cliente:null===(e=t.cliente)||void 0===e?void 0:e.nombre,cod_cliente:null===(a=t.cliente)||void 0===a?void 0:a.cod_cliente,nombre_cliente:null===(l=t.cliente)||void 0===l?void 0:l.nombre,dni_cliente:null===(i=t.cliente)||void 0===i?void 0:i.dni,correo_cliente:null===(n=t.cliente)||void 0===n?void 0:n.correo,celular_cliente:null===(r=t.cliente)||void 0===r?void 0:r.celular},s={cod_propiedad:null===(o=t.propiedad)||void 0===o?void 0:o.cod_propiedad,nombre_propiedad:null===(c=t.propiedad)||void 0===c?void 0:c.nombre};K({...d,...s,propiedad:t.propiedad,fecha_emision:C()(t.fecha_emision,"DD/MM/YYYY"),fecha_caducidad:C()(t.fecha_vencimiento,"DD/MM/YYYY")}),G.setFieldsValue({...d,...s,propiedad:t.propiedad,fecha_emision:C()(t.fecha_emision,"DD/MM/YYYY"),fecha_caducidad:C()(t.fecha_vencimiento,"DD/MM/YYYY")})}},[t]);let ex=async()=>{try{let e={cod_cliente:R.cliente.cod_cliente,cod_propiedad:R.propiedad.cod_propiedad,fecha_emision:C()(R.fecha_emision).format("DD/MM/YYYY"),fecha_vencimiento:C()(R.fecha_caducidad).format("DD/MM/YYYY"),cod_trabajador:Y.cod_usuario};t?await S({quotation:e,id:t.cod_cotizacion}):await w(e)}catch(e){q.toast.error(e)}};return(0,Z.useEffect)(()=>{let e=null;if(F){var l;q.toast.error(null===(l=I.data)||void 0===l?void 0:l.msg),q.toast.dismiss(e)}L&&(q.toast.success(null==z?void 0:z.msg),a(),q.toast.dismiss(e)),N&&(e=q.toast.loading("Guardando cotizaci\xf3n..."))},[F,L,N]),(0,Z.useEffect)(()=>{let e=null;if(P){var l;q.toast.error(null===(l=A.data)||void 0===l?void 0:l.msg),q.toast.dismiss(e)}Q&&(q.toast.success(null==U?void 0:U.msg),a(),q.toast.dismiss(e)),T&&(e=q.toast.loading("Actualizando cotizaci\xf3n..."))},[P,Q,T]),(0,i.jsx)(s.Z,{form:G,layout:"vertical",requiredMark:!0,onFinish:ex,autoComplete:"off",scrollToFirstError:!0,children:(0,i.jsxs)(u.Z,{gutter:[16,16],children:[(0,i.jsx)(m.Z,{orientation:"left",children:"Datos del cliente"}),(0,i.jsx)(x.Z,{span:24,children:(0,i.jsx)(s.Z.Item,{name:"nombre_cliente",value:R.nombre_cliente,label:(0,i.jsx)(_.L,{text:"Seleccionar cliente:"}),hasFeedback:!0,rules:[{required:!0,message:"Seleccione el cliente."}],children:(0,i.jsx)(h.Z,{className:"w-full",name:"nombre_cliente",value:R.nombre_cliente,onChange:(e,a)=>J(a),allowClear:!0,options:X,filterOption:(e,a)=>-1!==a.value.toUpperCase().indexOf(e.toUpperCase()),children:(0,i.jsx)(p.Z,{placeholder:"Buscar Cliente",prefix:(0,i.jsx)(g.Z,{})})})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:8,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Nombre"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"Nombre del cliente",readOnly:!0,value:R.nombre_cliente})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:4,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"DNI"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"DNI del cliente",readOnly:!0,value:R.dni_cliente})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:8,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Correo"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"Correo del cliente",readOnly:!0,value:R.correo_cliente})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:4,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Celular"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"Celular del cliente",readOnly:!0,value:R.celular_cliente})})}),(0,i.jsx)(m.Z,{orientation:"left",children:"Datos de la propiedad"}),(0,i.jsx)(x.Z,{span:24,children:(0,i.jsx)(s.Z.Item,{name:"nombre_propiedad",value:R.nombre_propiedad,label:(0,i.jsx)(_.L,{text:"Seleccionar propiedad:"}),hasFeedback:!0,rules:[{required:!0,message:"Seleccione la propiedad."}],children:(0,i.jsx)(h.Z,{className:"w-full",name:"nombre_propiedad",value:R.nombre_propiedad,onChange:(e,a)=>el(a),allowClear:!0,options:ee,filterOption:(e,a)=>-1!==a.value.toUpperCase().indexOf(e.toUpperCase()),children:(0,i.jsx)(p.Z,{placeholder:"Buscar Propiedad",prefix:(0,i.jsx)(g.Z,{})})})})}),(0,i.jsx)(x.Z,{span:24,children:(0,i.jsxs)(u.Z,{className:"flex items-center border rounded-md p-1 m-1",gutter:16,children:[(0,i.jsx)(x.Z,{xs:24,md:6,lg:6,children:(0,i.jsx)(_.L,{text:"Buscar por precio"})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:12,children:(0,i.jsxs)("div",{className:"w-full flex flex-col",children:[(0,i.jsxs)("div",{className:"w-full flex justify-between",children:[(0,i.jsx)("span",{className:"text-gray-400 text-xs italic",children:(0,i.jsx)(j.Z,{size:"small",value:en[0],onChange:e=>{er([e,en[1]])},min:ei,max:en[1]})}),(0,i.jsx)("span",{className:"text-gray-400 text-xs italic",children:(0,i.jsx)(j.Z,{size:"small",value:en[1],onChange:e=>{er([en[1],e])},min:en[0],max:et})})]}),(0,i.jsx)(f.Z,{step:1e3,range:!0,defaultValue:[en[0],en[1]],value:[en[0],en[1]],min:ei,max:et,onChange:eo})]})}),(0,i.jsxs)(x.Z,{xs:24,md:4,lg:4,className:"flex gap-2",children:[(0,i.jsx)(v.ZP,{onClick:ec,className:"border-primary",children:"Aplicar"}),(0,i.jsx)(v.ZP,{onClick:ed,children:"Reiniciar"})]})]})}),(0,i.jsx)(x.Z,{span:24,children:(0,i.jsx)(O,{columns:n,data:(null==R?void 0:R.propiedad)?[null==R?void 0:R.propiedad]:[]})}),(0,i.jsx)(m.Z,{}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:8,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Fecha Emisi\xf3n"}),hasFeedback:!0,children:(0,i.jsx)(b.Z,{onChange:es,value:C()(R.fecha_emision),placeholder:"Fecha de Emision",className:"w-full",format:"DD/MM/YYYY",allowClear:!1})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:8,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Fecha Caducidad"}),hasFeedback:!0,children:(0,i.jsx)(b.Z,{onChange:eu,value:C()(R.fecha_caducidad),placeholder:"Fecha de Caducidad",className:"w-full",format:"DD/MM/YYYY",allowClear:!1})})}),(0,i.jsx)(m.Z,{orientation:"left",children:"Datos del Agente"}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:12,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Nombre"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"Nombre del agente",readOnly:!0,value:null==Y?void 0:Y.nombre})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:6,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"DNI"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"DNI del agente",readOnly:!0,value:null==Y?void 0:Y.dni})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:6,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Oficina"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"Oficina del agente",readOnly:!0,value:null==Y?void 0:Y.oficina})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:16,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Correo"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"Correo del agente",readOnly:!0,value:null==Y?void 0:Y.correo})})}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:8,children:(0,i.jsx)(s.Z.Item,{label:(0,i.jsx)(_.L,{text:"Celular"}),hasFeedback:!0,children:(0,i.jsx)(p.Z,{placeholder:"Celular del agente",readOnly:!0,value:null==Y?void 0:Y.celular})})}),(0,i.jsx)(x.Z,{span:24,children:(0,i.jsx)(s.Z.Item,{children:(0,i.jsxs)(u.Z,{gutter:[16,16],justify:"end",children:[(0,i.jsx)(x.Z,{xs:24,md:12,lg:4,justify:"end",order:l?2:1,children:(0,i.jsx)(v.ZP,{onClick:a,className:"w-full",children:"Cancelar"},"back")}),(0,i.jsx)(x.Z,{xs:24,md:12,lg:6,order:l?1:2,children:(0,i.jsx)(v.ZP,{type:"primary",loading:t?T:N,htmlType:"submit",className:"w-full",children:"Guardar cotizaci\xf3n"})})]})})})]})})};function z(e){let{isModalOpen:a,handleCancel:l}=e,c=(0,o.useDispatch)(),d=(0,o.useSelector)(e=>e.crud.data),s=()=>{c((0,t.qD)()),l()};return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.Z,{title:(0,i.jsx)(r.Z.Title,{level:3,className:"text-center text-text-title",children:d?"Editar Cotizaci\xf3n":"Nueva Cotizaci\xf3n"}),style:{top:20},width:1e3,open:a,onCancel:s,footer:null,children:(0,i.jsx)(L,{handleCancel:s})})})}let S=e=>{let{columns:a,data:l,loading:t}=e;return(0,i.jsx)(N.Z,{columns:a,dataSource:l,rowKey:e=>e.cod_cotizacion,loading:t,scroll:{x:"max-content",y:"max-content"}})};var T=l(88334),P=l(15834);function A(){let e=(0,o.useDispatch)(),[a,l]=(0,Z.useState)(C()()),[n,{data:r,isLoading:c}]=(0,D.bY)({}),[d]=(0,D.Xt)({}),[s]=(0,D.bv)({});(0,Z.useEffect)(()=>{n(C()(a).format("DD/MM/YYYY"))},[a,r]);let[h,{isError:p,error:j,isSuccess:f,data:_}]=(0,D.ZP)(),g=a=>{e((0,t.qT)({data:a})),N()},Y=async e=>{try{await h(e)}catch(e){q.toast.error(e)}};(0,Z.useEffect)(()=>{if(p){var e;q.toast.error(null===(e=j.data)||void 0===e?void 0:e.msg)}f&&q.toast.success(null==_?void 0:_.msg)},[p,f]);let M=async(e,a)=>{try{await d({nombre:e,id:a})}catch(e){q.toast.error(e)}},k=async e=>{try{await s(e)}catch(e){q.toast.error(e)}},{isModalOpen:w,handleOpen:N,handleCancel:F}=(0,T.d)(),I=(0,y.xV)(g,Y,M,k),O=(0,Z.useMemo)(()=>null==r?void 0:r.data,[r]),E=e=>{if(null===e)return l(C()());l(e)};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(P.Z,{direction:"vertical",className:"w-full",size:"large",children:[(0,i.jsxs)(u.Z,{gutter:16,align:"middle",justify:"space-between",children:[(0,i.jsx)(x.Z,{xs:24,md:6,lg:6,children:(0,i.jsx)(b.Z,{value:a,className:"w-full",placeholder:"Busca por fecha",onChange:E,format:"DD/MM/YYYY"})}),(0,i.jsx)(x.Z,{xs:24,md:6,lg:6,children:(0,i.jsx)(v.ZP,{type:"primary",onClick:N,className:"w-full",children:"Nueva cotizaci\xf3n"})})]}),(0,i.jsx)(m.Z,{className:"m-0"}),(0,i.jsx)("div",{children:(0,i.jsx)(S,{columns:I,data:O,loading:c})})]}),w&&(0,i.jsx)(z,{isModalOpen:w,handleCancel:F})]})}},57212:function(e,a,l){"use strict";l.d(a,{C:function(){return i},z:function(){return t}});let i=1e4,t=1e6},14856:function(e,a,l){"use strict";l.d(a,{Xt:function(){return x},ZP:function(){return s},bY:function(){return u},bv:function(){return m},ic:function(){return c},kD:function(){return d},pK:function(){return r}});var i=l(32895),t=l(86902),n=l.n(t);let r=(0,i.createApi)({reducerPath:"quotatioApi",baseQuery:(0,i.fetchBaseQuery)({baseUrl:"http://3.86.194.103/api/v1/"}),refetchOnMountOrArgChange:!0,refetchOnFocus:!0,refetchOnReconnect:!0,tagTypes:["quotation"],endpoints:e=>({getQuotations:e.query({query:()=>({url:"cotizacion",method:"GET"}),providesTags:["quotation"]}),getQuotationsByDay:e.query({query:e=>({url:"cotizacion?fecha_emision=".concat(e),method:"GET"}),providesTags:["quotation"]}),createQuotation:e.mutation({query:e=>({url:"cotizacion",method:"POST",body:e}),invalidatesTags:["quotation"]}),updateQuotation:e.mutation({query:e=>{let{quotation:a,id:l}=e;return{url:"cotizacion/".concat(l),method:"PUT",body:a}},invalidatesTags:["quotation"]}),deleteQuotation:e.mutation({query:e=>({url:"cotizacion/".concat(e),method:"DELETE"}),invalidatesTags:["quotation"]}),downloadQuotation:e.query({query:e=>{let{nombre:a,id:l}=e;return{url:"cotizacion/descargar/".concat(l),method:"GET",responseType:"blob",responseHandler:async e=>{let l=await e.blob(),i=URL.createObjectURL(l),t=document.createElement("a");t.href=i,t.setAttribute("download","Cotizacion_".concat(a,"_").concat(n()().format("YYYY-MM-DD-HH-mm-ss"),".pdf")),t.setAttribute("target","_blank"),document.body.appendChild(t),t.click()},cache:"no-cache"}}}),sendMailQuotation:e.query({query:e=>({url:"cotizacion/correo/".concat(e),method:"GET"})})})}),{useGetQuotationsQuery:o,useCreateQuotationMutation:c,useUpdateQuotationMutation:d,useDeleteQuotationMutation:s,useLazyGetQuotationsByDayQuery:u,useLazyDownloadQuotationQuery:x,useLazySendMailQuotationQuery:m}=r}},function(e){e.O(0,[8779,4790,8945,2641,803,4389,545,4176,4059,2229,3750,1452,1728,3206,4425,638,5243,3933,9833,2005,7278,15,5377,4294,2667,8139,1744],function(){return e(e.s=32546)}),_N_E=e.O()}]);