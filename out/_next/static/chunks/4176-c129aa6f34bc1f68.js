"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4176],{38947:function(e,n,t){t.d(n,{Z:function(){return a}});var r=t(40431),o=t(86006),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"ellipsis",theme:"outlined"},l=t(1240),a=o.forwardRef(function(e,n){return o.createElement(l.Z,(0,r.Z)({},e,{ref:n,icon:i}))})},57406:function(e,n){let t=e=>({[e.componentCls]:{[`${e.antCls}-motion-collapse-legacy`]:{overflow:"hidden","&-active":{transition:`height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`}},[`${e.antCls}-motion-collapse`]:{overflow:"hidden",transition:`height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`}}});n.Z=t},87045:function(e,n,t){t.d(n,{Z:function(){return C}});var r=t(40431),o=t(65877),i=t(60456),l=t(89301),a=t(90214),u=t(8683),c=t.n(u),s=t(92510),f=t(86006),d=t(48580),v=t(66643),p=d.Z.ESC,m=d.Z.TAB,h=(0,f.forwardRef)(function(e,n){var t=e.overlay,r=e.arrow,o=e.prefixCls,i=(0,f.useMemo)(function(){return"function"==typeof t?t():t},[t]),l=(0,s.sQ)(n,null==i?void 0:i.ref);return f.createElement(f.Fragment,null,r&&f.createElement("div",{className:"".concat(o,"-arrow")}),f.cloneElement(i,{ref:(0,s.Yr)(i)?l:void 0}))}),b={adjustX:1,adjustY:1},y=[0,0],g={topLeft:{points:["bl","tl"],overflow:b,offset:[0,-4],targetOffset:y},top:{points:["bc","tc"],overflow:b,offset:[0,-4],targetOffset:y},topRight:{points:["br","tr"],overflow:b,offset:[0,-4],targetOffset:y},bottomLeft:{points:["tl","bl"],overflow:b,offset:[0,4],targetOffset:y},bottom:{points:["tc","bc"],overflow:b,offset:[0,4],targetOffset:y},bottomRight:{points:["tr","br"],overflow:b,offset:[0,4],targetOffset:y}},Z=["arrow","prefixCls","transitionName","animation","align","placement","placements","getPopupContainer","showAction","hideAction","overlayClassName","overlayStyle","visible","trigger","autoFocus","overlay","children","onVisibleChange"],C=f.forwardRef(function(e,n){var t,u,d,b,y,C,E,w,M,k,N,R,P,I,x=e.arrow,S=void 0!==x&&x,K=e.prefixCls,O=void 0===K?"rc-dropdown":K,A=e.transitionName,D=e.animation,T=e.align,L=e.placement,_=e.placements,V=e.getPopupContainer,z=e.showAction,F=e.hideAction,$=e.overlayClassName,j=e.overlayStyle,B=e.visible,W=e.trigger,H=void 0===W?["hover"]:W,q=e.autoFocus,Y=e.overlay,G=e.children,X=e.onVisibleChange,Q=(0,l.Z)(e,Z),U=f.useState(),J=(0,i.Z)(U,2),ee=J[0],en=J[1],et="visible"in e?B:ee,er=f.useRef(null),eo=f.useRef(null),ei=f.useRef(null);f.useImperativeHandle(n,function(){return er.current});var el=function(e){en(e),null==X||X(e)};u=(t={visible:et,triggerRef:ei,onVisibleChange:el,autoFocus:q,overlayRef:eo}).visible,d=t.triggerRef,b=t.onVisibleChange,y=t.autoFocus,C=t.overlayRef,E=f.useRef(!1),w=function(){if(u){var e,n;null===(e=d.current)||void 0===e||null===(n=e.focus)||void 0===n||n.call(e),null==b||b(!1)}},M=function(){var e;return null!==(e=C.current)&&void 0!==e&&!!e.focus&&(C.current.focus(),E.current=!0,!0)},k=function(e){switch(e.keyCode){case p:w();break;case m:var n=!1;E.current||(n=M()),n?e.preventDefault():w()}},f.useEffect(function(){return u?(window.addEventListener("keydown",k),y&&(0,v.Z)(M,3),function(){window.removeEventListener("keydown",k),E.current=!1}):function(){E.current=!1}},[u]);var ea=function(){return f.createElement(h,{ref:eo,overlay:Y,prefixCls:O,arrow:S})},eu=f.cloneElement(G,{className:c()(null===(I=G.props)||void 0===I?void 0:I.className,et&&(void 0!==(N=e.openClassName)?N:"".concat(O,"-open"))),ref:(0,s.Yr)(G)?(0,s.sQ)(ei,G.ref):void 0}),ec=F;return ec||-1===H.indexOf("contextMenu")||(ec=["click"]),f.createElement(a.Z,(0,r.Z)({builtinPlacements:void 0===_?g:_},Q,{prefixCls:O,ref:er,popupClassName:c()($,(0,o.Z)({},"".concat(O,"-show-arrow"),S)),popupStyle:j,action:H,showAction:z,hideAction:ec,popupPlacement:void 0===L?"bottomLeft":L,popupAlign:T,popupTransitionName:A,popupAnimation:D,popupVisible:et,stretch:(R=e.minOverlayWidthMatchTrigger,P=e.alignPoint,"minOverlayWidthMatchTrigger"in e?R:!P)?"minWidth":"",popup:"function"==typeof Y?ea:ea(),onPopupVisibleChange:el,onPopupClick:function(n){var t=e.onOverlayClick;en(!1),t&&t(n)},getPopupContainer:V}),eu)})},8776:function(e,n,t){t.d(n,{iz:function(){return ez},ck:function(){return ev},BW:function(){return eV},sN:function(){return ev},GP:function(){return eV},Wd:function(){return eK},ZP:function(){return e$},Xl:function(){return R}});var r=t(40431),o=t(65877),i=t(88684),l=t(90151),a=t(60456),u=t(89301),c=t(8683),s=t.n(c),f=t(90239),d=t(63940),v=t(5004),p=t(86006),m=t(8431),h=t(81027),b=p.createContext(null);function y(e,n){return void 0===e?null:"".concat(e,"-").concat(n)}function g(e){return y(p.useContext(b),e)}var Z=t(55567),C=["children","locked"],E=p.createContext(null);function w(e){var n=e.children,t=e.locked,r=(0,u.Z)(e,C),o=p.useContext(E),l=(0,Z.Z)(function(){var e;return e=(0,i.Z)({},o),Object.keys(r).forEach(function(n){var t=r[n];void 0!==t&&(e[n]=t)}),e},[o,r],function(e,n){return!t&&(e[0]!==n[0]||!(0,h.Z)(e[1],n[1],!0))});return p.createElement(E.Provider,{value:l},n)}var M=p.createContext(null);function k(){return p.useContext(M)}var N=p.createContext([]);function R(e){var n=p.useContext(N);return p.useMemo(function(){return void 0!==e?[].concat((0,l.Z)(n),[e]):n},[n,e])}var P=p.createContext(null),I=p.createContext({}),x=t(48580),S=t(66643),K=t(98498);function O(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if((0,K.Z)(e)){var t=e.nodeName.toLowerCase(),r=["input","select","textarea","button"].includes(t)||e.isContentEditable||"a"===t&&!!e.getAttribute("href"),o=e.getAttribute("tabindex"),i=Number(o),l=null;return o&&!Number.isNaN(i)?l=i:r&&null===l&&(l=0),r&&e.disabled&&(l=null),null!==l&&(l>=0||n&&l<0)}return!1}var A=x.Z.LEFT,D=x.Z.RIGHT,T=x.Z.UP,L=x.Z.DOWN,_=x.Z.ENTER,V=x.Z.ESC,z=x.Z.HOME,F=x.Z.END,$=[T,L,A,D];function j(e,n){return(function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=(0,l.Z)(e.querySelectorAll("*")).filter(function(e){return O(e,n)});return O(e,n)&&t.unshift(e),t})(e,!0).filter(function(e){return n.has(e)})}function B(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if(!e)return null;var o=j(e,n),i=o.length,l=o.findIndex(function(e){return t===e});return r<0?-1===l?l=i-1:l-=1:r>0&&(l+=1),o[l=(l+i)%i]}var W="__RC_UTIL_PATH_SPLIT__",H=function(e){return e.join(W)},q="rc-menu-more";function Y(e){var n=p.useRef(e);n.current=e;var t=p.useCallback(function(){for(var e,t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return null===(e=n.current)||void 0===e?void 0:e.call.apply(e,[n].concat(r))},[]);return e?t:void 0}var G=Math.random().toFixed(5).toString().slice(2),X=0,Q=t(18050),U=t(49449),J=t(43663),ee=t(38340),en=t(73234),et=t(92510);function er(e,n,t,r){var o=p.useContext(E),i=o.activeKey,l=o.onActive,a=o.onInactive,u={active:i===e};return n||(u.onMouseEnter=function(n){null==t||t({key:e,domEvent:n}),l(e)},u.onMouseLeave=function(n){null==r||r({key:e,domEvent:n}),a(e)}),u}function eo(e){var n=p.useContext(E),t=n.mode,r=n.rtl,o=n.inlineIndent;return"inline"!==t?null:r?{paddingRight:e*o}:{paddingLeft:e*o}}function ei(e){var n=e.icon,t=e.props,r=e.children;return("function"==typeof n?p.createElement(n,(0,i.Z)({},t)):n)||r||null}var el=["item"];function ea(e){var n=e.item,t=(0,u.Z)(e,el);return Object.defineProperty(t,"item",{get:function(){return(0,v.ZP)(!1,"`info.item` is deprecated since we will move to function component that not provides React Node instance in future."),n}}),t}var eu=["title","attribute","elementRef"],ec=["style","className","eventKey","warnKey","disabled","itemIcon","children","role","onMouseEnter","onMouseLeave","onClick","onKeyDown","onFocus"],es=["active"],ef=function(e){(0,J.Z)(t,e);var n=(0,ee.Z)(t);function t(){return(0,Q.Z)(this,t),n.apply(this,arguments)}return(0,U.Z)(t,[{key:"render",value:function(){var e=this.props,n=e.title,t=e.attribute,o=e.elementRef,i=(0,u.Z)(e,eu),l=(0,en.Z)(i,["eventKey","popupClassName","popupOffset","onTitleClick"]);return(0,v.ZP)(!t,"`attribute` of Menu.Item is deprecated. Please pass attribute directly."),p.createElement(f.Z.Item,(0,r.Z)({},t,{title:"string"==typeof n?n:void 0},l,{ref:o}))}}]),t}(p.Component),ed=p.forwardRef(function(e,n){var t,a=e.style,c=e.className,f=e.eventKey,d=(e.warnKey,e.disabled),v=e.itemIcon,m=e.children,h=e.role,b=e.onMouseEnter,y=e.onMouseLeave,Z=e.onClick,C=e.onKeyDown,w=e.onFocus,M=(0,u.Z)(e,ec),k=g(f),N=p.useContext(E),P=N.prefixCls,S=N.onItemClick,K=N.disabled,O=N.overflowDisabled,A=N.itemIcon,D=N.selectedKeys,T=N.onActive,L=p.useContext(I)._internalRenderMenuItem,_="".concat(P,"-item"),V=p.useRef(),z=p.useRef(),F=K||d,$=(0,et.x1)(n,z),j=R(f),B=function(e){return{key:f,keyPath:(0,l.Z)(j).reverse(),item:V.current,domEvent:e}},W=er(f,F,b,y),H=W.active,q=(0,u.Z)(W,es),Y=D.includes(f),G=eo(j.length),X={};"option"===e.role&&(X["aria-selected"]=Y);var Q=p.createElement(ef,(0,r.Z)({ref:V,elementRef:$,role:null===h?"none":h||"menuitem",tabIndex:d?null:-1,"data-menu-id":O&&k?null:k},M,q,X,{component:"li","aria-disabled":d,style:(0,i.Z)((0,i.Z)({},G),a),className:s()(_,(t={},(0,o.Z)(t,"".concat(_,"-active"),H),(0,o.Z)(t,"".concat(_,"-selected"),Y),(0,o.Z)(t,"".concat(_,"-disabled"),F),t),c),onClick:function(e){if(!F){var n=B(e);null==Z||Z(ea(n)),S(n)}},onKeyDown:function(e){if(null==C||C(e),e.which===x.Z.ENTER){var n=B(e);null==Z||Z(ea(n)),S(n)}},onFocus:function(e){T(f),null==w||w(e)}}),m,p.createElement(ei,{props:(0,i.Z)((0,i.Z)({},e),{},{isSelected:Y}),icon:v||A}));return L&&(Q=L(Q,e,{selected:Y})),Q}),ev=p.forwardRef(function(e,n){var t=e.eventKey,o=k(),i=R(t);return(p.useEffect(function(){if(o)return o.registerPath(t,i),function(){o.unregisterPath(t,i)}},[i]),o)?null:p.createElement(ed,(0,r.Z)({},e,{ref:n}))}),ep=["className","children"],em=p.forwardRef(function(e,n){var t=e.className,o=e.children,i=(0,u.Z)(e,ep),l=p.useContext(E),a=l.prefixCls,c=l.mode,f=l.rtl;return p.createElement("ul",(0,r.Z)({className:s()(a,f&&"".concat(a,"-rtl"),"".concat(a,"-sub"),"".concat(a,"-").concat("inline"===c?"inline":"vertical"),t),role:"menu"},i,{"data-menu-list":!0,ref:n}),o)});em.displayName="SubMenuList";var eh=t(965),eb=t(25912),ey=["label","children","key","type"];function eg(e,n){return(0,eb.Z)(e).map(function(e,t){if(p.isValidElement(e)){var r,o,i=e.key,a=null!==(r=null===(o=e.props)||void 0===o?void 0:o.eventKey)&&void 0!==r?r:i;null==a&&(a="tmp_key-".concat([].concat((0,l.Z)(n),[t]).join("-")));var u={key:a,eventKey:a};return p.cloneElement(e,u)}return e})}var eZ=t(90214),eC={adjustX:1,adjustY:1},eE={topLeft:{points:["bl","tl"],overflow:eC},topRight:{points:["br","tr"],overflow:eC},bottomLeft:{points:["tl","bl"],overflow:eC},bottomRight:{points:["tr","br"],overflow:eC},leftTop:{points:["tr","tl"],overflow:eC},leftBottom:{points:["br","bl"],overflow:eC},rightTop:{points:["tl","tr"],overflow:eC},rightBottom:{points:["bl","br"],overflow:eC}},ew={topLeft:{points:["bl","tl"],overflow:eC},topRight:{points:["br","tr"],overflow:eC},bottomLeft:{points:["tl","bl"],overflow:eC},bottomRight:{points:["tr","br"],overflow:eC},rightTop:{points:["tr","tl"],overflow:eC},rightBottom:{points:["br","bl"],overflow:eC},leftTop:{points:["tl","tr"],overflow:eC},leftBottom:{points:["bl","br"],overflow:eC}};function eM(e,n,t){return n||(t?t[e]||t.other:void 0)}var ek={horizontal:"bottomLeft",vertical:"rightTop","vertical-left":"rightTop","vertical-right":"leftTop"};function eN(e){var n=e.prefixCls,t=e.visible,r=e.children,l=e.popup,u=e.popupClassName,c=e.popupOffset,f=e.disabled,d=e.mode,v=e.onVisibleChange,m=p.useContext(E),h=m.getPopupContainer,b=m.rtl,y=m.subMenuOpenDelay,g=m.subMenuCloseDelay,Z=m.builtinPlacements,C=m.triggerSubMenuAction,w=m.forceSubMenuRender,M=m.rootClassName,k=m.motion,N=m.defaultMotions,R=p.useState(!1),P=(0,a.Z)(R,2),I=P[0],x=P[1],K=b?(0,i.Z)((0,i.Z)({},ew),Z):(0,i.Z)((0,i.Z)({},eE),Z),O=ek[d],A=eM(d,k,N),D=p.useRef(A);"inline"!==d&&(D.current=A);var T=(0,i.Z)((0,i.Z)({},D.current),{},{leavedClassName:"".concat(n,"-hidden"),removeOnLeave:!1,motionAppear:!0}),L=p.useRef();return p.useEffect(function(){return L.current=(0,S.Z)(function(){x(t)}),function(){S.Z.cancel(L.current)}},[t]),p.createElement(eZ.Z,{prefixCls:n,popupClassName:s()("".concat(n,"-popup"),(0,o.Z)({},"".concat(n,"-rtl"),b),u,M),stretch:"horizontal"===d?"minWidth":null,getPopupContainer:h,builtinPlacements:K,popupPlacement:O,popupVisible:I,popup:l,popupAlign:c&&{offset:c},action:f?[]:[C],mouseEnterDelay:y,mouseLeaveDelay:g,onPopupVisibleChange:v,forceRender:w,popupMotion:T},r)}var eR=t(78641);function eP(e){var n=e.id,t=e.open,o=e.keyPath,l=e.children,u="inline",c=p.useContext(E),s=c.prefixCls,f=c.forceSubMenuRender,d=c.motion,v=c.defaultMotions,m=c.mode,h=p.useRef(!1);h.current=m===u;var b=p.useState(!h.current),y=(0,a.Z)(b,2),g=y[0],Z=y[1],C=!!h.current&&t;p.useEffect(function(){h.current&&Z(!1)},[m]);var M=(0,i.Z)({},eM(u,d,v));o.length>1&&(M.motionAppear=!1);var k=M.onVisibleChanged;return(M.onVisibleChanged=function(e){return h.current||e||Z(!0),null==k?void 0:k(e)},g)?null:p.createElement(w,{mode:u,locked:!h.current},p.createElement(eR.ZP,(0,r.Z)({visible:C},M,{forceRender:f,removeOnLeave:!1,leavedClassName:"".concat(s,"-hidden")}),function(e){var t=e.className,r=e.style;return p.createElement(em,{id:n,className:t,style:r},l)}))}var eI=["style","className","title","eventKey","warnKey","disabled","internalPopupClose","children","itemIcon","expandIcon","popupClassName","popupOffset","onClick","onMouseEnter","onMouseLeave","onTitleClick","onTitleMouseEnter","onTitleMouseLeave"],ex=["active"],eS=function(e){var n,t=e.style,l=e.className,c=e.title,d=e.eventKey,v=(e.warnKey,e.disabled),m=e.internalPopupClose,h=e.children,b=e.itemIcon,y=e.expandIcon,Z=e.popupClassName,C=e.popupOffset,M=e.onClick,k=e.onMouseEnter,N=e.onMouseLeave,x=e.onTitleClick,S=e.onTitleMouseEnter,K=e.onTitleMouseLeave,O=(0,u.Z)(e,eI),A=g(d),D=p.useContext(E),T=D.prefixCls,L=D.mode,_=D.openKeys,V=D.disabled,z=D.overflowDisabled,F=D.activeKey,$=D.selectedKeys,j=D.itemIcon,B=D.expandIcon,W=D.onItemClick,H=D.onOpenChange,q=D.onActive,G=p.useContext(I)._internalRenderSubMenuItem,X=p.useContext(P).isSubPathKey,Q=R(),U="".concat(T,"-submenu"),J=V||v,ee=p.useRef(),en=p.useRef(),et=y||B,el=_.includes(d),eu=!z&&el,ec=X($,d),es=er(d,J,S,K),ef=es.active,ed=(0,u.Z)(es,ex),ev=p.useState(!1),ep=(0,a.Z)(ev,2),eh=ep[0],eb=ep[1],ey=function(e){J||eb(e)},eg=p.useMemo(function(){return ef||"inline"!==L&&(eh||X([F],d))},[L,ef,F,eh,d,X]),eZ=eo(Q.length),eC=Y(function(e){null==M||M(ea(e)),W(e)}),eE=A&&"".concat(A,"-popup"),ew=p.createElement("div",(0,r.Z)({role:"menuitem",style:eZ,className:"".concat(U,"-title"),tabIndex:J?null:-1,ref:ee,title:"string"==typeof c?c:null,"data-menu-id":z&&A?null:A,"aria-expanded":eu,"aria-haspopup":!0,"aria-controls":eE,"aria-disabled":J,onClick:function(e){J||(null==x||x({key:d,domEvent:e}),"inline"===L&&H(d,!el))},onFocus:function(){q(d)}},ed),c,p.createElement(ei,{icon:"horizontal"!==L?et:null,props:(0,i.Z)((0,i.Z)({},e),{},{isOpen:eu,isSubMenu:!0})},p.createElement("i",{className:"".concat(U,"-arrow")}))),eM=p.useRef(L);if("inline"!==L&&Q.length>1?eM.current="vertical":eM.current=L,!z){var ek=eM.current;ew=p.createElement(eN,{mode:ek,prefixCls:U,visible:!m&&eu&&"inline"!==L,popupClassName:Z,popupOffset:C,popup:p.createElement(w,{mode:"horizontal"===ek?"vertical":ek},p.createElement(em,{id:eE,ref:en},h)),disabled:J,onVisibleChange:function(e){"inline"!==L&&H(d,e)}},ew)}var eR=p.createElement(f.Z.Item,(0,r.Z)({role:"none"},O,{component:"li",style:t,className:s()(U,"".concat(U,"-").concat(L),l,(n={},(0,o.Z)(n,"".concat(U,"-open"),eu),(0,o.Z)(n,"".concat(U,"-active"),eg),(0,o.Z)(n,"".concat(U,"-selected"),ec),(0,o.Z)(n,"".concat(U,"-disabled"),J),n)),onMouseEnter:function(e){ey(!0),null==k||k({key:d,domEvent:e})},onMouseLeave:function(e){ey(!1),null==N||N({key:d,domEvent:e})}}),ew,!z&&p.createElement(eP,{id:eE,open:eu,keyPath:Q},h));return G&&(eR=G(eR,e,{selected:ec,active:eg,open:eu,disabled:J})),p.createElement(w,{onItemClick:eC,mode:"horizontal"===L?"vertical":L,itemIcon:b||j,expandIcon:et},eR)};function eK(e){var n,t=e.eventKey,r=e.children,o=R(t),i=eg(r,o),l=k();return p.useEffect(function(){if(l)return l.registerPath(t,o),function(){l.unregisterPath(t,o)}},[o]),n=l?i:p.createElement(eS,e,i),p.createElement(N.Provider,{value:o},n)}var eO=["prefixCls","rootClassName","style","className","tabIndex","items","children","direction","id","mode","inlineCollapsed","disabled","disabledOverflow","subMenuOpenDelay","subMenuCloseDelay","forceSubMenuRender","defaultOpenKeys","openKeys","activeKey","defaultActiveFirst","selectable","multiple","defaultSelectedKeys","selectedKeys","onSelect","onDeselect","inlineIndent","motion","defaultMotions","triggerSubMenuAction","builtinPlacements","itemIcon","expandIcon","overflowedIndicator","overflowedIndicatorPopupClassName","getPopupContainer","onClick","onOpenChange","onKeyDown","openAnimation","openTransitionName","_internalRenderMenuItem","_internalRenderSubMenuItem"],eA=[],eD=p.forwardRef(function(e,n){var t,c,v,g,Z,C,E,k,N,R,x,K,O,Q,U,J,ee,en,et,er,eo,ei,el,eu,ec,es,ef,ed=e.prefixCls,ep=void 0===ed?"rc-menu":ed,em=e.rootClassName,eb=e.style,eZ=e.className,eC=e.tabIndex,eE=e.items,ew=e.children,eM=e.direction,ek=e.id,eN=e.mode,eR=void 0===eN?"vertical":eN,eP=e.inlineCollapsed,eI=e.disabled,ex=e.disabledOverflow,eS=e.subMenuOpenDelay,eD=e.subMenuCloseDelay,eT=e.forceSubMenuRender,eL=e.defaultOpenKeys,e_=e.openKeys,eF=e.activeKey,e$=e.defaultActiveFirst,ej=e.selectable,eB=void 0===ej||ej,eW=e.multiple,eH=void 0!==eW&&eW,eq=e.defaultSelectedKeys,eY=e.selectedKeys,eG=e.onSelect,eX=e.onDeselect,eQ=e.inlineIndent,eU=e.motion,eJ=e.defaultMotions,e0=e.triggerSubMenuAction,e1=e.builtinPlacements,e6=e.itemIcon,e4=e.expandIcon,e2=e.overflowedIndicator,e5=void 0===e2?"...":e2,e8=e.overflowedIndicatorPopupClassName,e3=e.getPopupContainer,e9=e.onClick,e7=e.onOpenChange,ne=e.onKeyDown,nn=(e.openAnimation,e.openTransitionName,e._internalRenderMenuItem),nt=e._internalRenderSubMenuItem,nr=(0,u.Z)(e,eO),no=p.useMemo(function(){var e;return e=ew,eE&&(e=function e(n){return(n||[]).map(function(n,t){if(n&&"object"===(0,eh.Z)(n)){var o=n.label,i=n.children,l=n.key,a=n.type,c=(0,u.Z)(n,ey),s=null!=l?l:"tmp-".concat(t);return i||"group"===a?"group"===a?p.createElement(eV,(0,r.Z)({key:s},c,{title:o}),e(i)):p.createElement(eK,(0,r.Z)({key:s},c,{title:o}),e(i)):"divider"===a?p.createElement(ez,(0,r.Z)({key:s},c)):p.createElement(ev,(0,r.Z)({key:s},c),o)}return null}).filter(function(e){return e})}(eE)),eg(e,eA)},[ew,eE]),ni=p.useState(!1),nl=(0,a.Z)(ni,2),na=nl[0],nu=nl[1],nc=p.useRef(),ns=(t=(0,d.Z)(ek,{value:ek}),v=(c=(0,a.Z)(t,2))[0],g=c[1],p.useEffect(function(){X+=1;var e="".concat(G,"-").concat(X);g("rc-menu-uuid-".concat(e))},[]),v),nf="rtl"===eM,nd=(0,d.Z)(eL,{value:e_,postState:function(e){return e||eA}}),nv=(0,a.Z)(nd,2),np=nv[0],nm=nv[1],nh=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];function t(){nm(e),null==e7||e7(e)}n?(0,m.flushSync)(t):t()},nb=p.useState(np),ny=(0,a.Z)(nb,2),ng=ny[0],nZ=ny[1],nC=p.useRef(!1),nE=p.useMemo(function(){return("inline"===eR||"vertical"===eR)&&eP?["vertical",eP]:[eR,!1]},[eR,eP]),nw=(0,a.Z)(nE,2),nM=nw[0],nk=nw[1],nN="inline"===nM,nR=p.useState(nM),nP=(0,a.Z)(nR,2),nI=nP[0],nx=nP[1],nS=p.useState(nk),nK=(0,a.Z)(nS,2),nO=nK[0],nA=nK[1];p.useEffect(function(){nx(nM),nA(nk),nC.current&&(nN?nm(ng):nh(eA))},[nM,nk]);var nD=p.useState(0),nT=(0,a.Z)(nD,2),nL=nT[0],n_=nT[1],nV=nL>=no.length-1||"horizontal"!==nI||ex;p.useEffect(function(){nN&&nZ(np)},[np]),p.useEffect(function(){return nC.current=!0,function(){nC.current=!1}},[]);var nz=(Z=p.useState({}),C=(0,a.Z)(Z,2)[1],E=(0,p.useRef)(new Map),k=(0,p.useRef)(new Map),N=p.useState([]),x=(R=(0,a.Z)(N,2))[0],K=R[1],O=(0,p.useRef)(0),Q=(0,p.useRef)(!1),U=function(){Q.current||C({})},J=(0,p.useCallback)(function(e,n){var t=H(n);k.current.set(t,e),E.current.set(e,t),O.current+=1;var r=O.current;Promise.resolve().then(function(){r===O.current&&U()})},[]),ee=(0,p.useCallback)(function(e,n){var t=H(n);k.current.delete(t),E.current.delete(e)},[]),en=(0,p.useCallback)(function(e){K(e)},[]),et=(0,p.useCallback)(function(e,n){var t=(E.current.get(e)||"").split(W);return n&&x.includes(t[0])&&t.unshift(q),t},[x]),er=(0,p.useCallback)(function(e,n){return e.some(function(e){return et(e,!0).includes(n)})},[et]),eo=(0,p.useCallback)(function(e){var n="".concat(E.current.get(e)).concat(W),t=new Set;return(0,l.Z)(k.current.keys()).forEach(function(e){e.startsWith(n)&&t.add(k.current.get(e))}),t},[]),p.useEffect(function(){return function(){Q.current=!0}},[]),{registerPath:J,unregisterPath:ee,refreshOverflowKeys:en,isSubPathKey:er,getKeyPath:et,getKeys:function(){var e=(0,l.Z)(E.current.keys());return x.length&&e.push(q),e},getSubPathKeys:eo}),nF=nz.registerPath,n$=nz.unregisterPath,nj=nz.refreshOverflowKeys,nB=nz.isSubPathKey,nW=nz.getKeyPath,nH=nz.getKeys,nq=nz.getSubPathKeys,nY=p.useMemo(function(){return{registerPath:nF,unregisterPath:n$}},[nF,n$]),nG=p.useMemo(function(){return{isSubPathKey:nB}},[nB]);p.useEffect(function(){nj(nV?eA:no.slice(nL+1).map(function(e){return e.key}))},[nL,nV]);var nX=(0,d.Z)(eF||e$&&(null===(es=no[0])||void 0===es?void 0:es.key),{value:eF}),nQ=(0,a.Z)(nX,2),nU=nQ[0],nJ=nQ[1],n0=Y(function(e){nJ(e)}),n1=Y(function(){nJ(void 0)});(0,p.useImperativeHandle)(n,function(){return{list:nc.current,focus:function(e){var n,t,r,o,i=null!=nU?nU:null===(n=no.find(function(e){return!e.props.disabled}))||void 0===n?void 0:n.key;i&&(null===(t=nc.current)||void 0===t||null===(r=t.querySelector("li[data-menu-id='".concat(y(ns,i),"']")))||void 0===r||null===(o=r.focus)||void 0===o||o.call(r,e))}}});var n6=(0,d.Z)(eq||[],{value:eY,postState:function(e){return Array.isArray(e)?e:null==e?eA:[e]}}),n4=(0,a.Z)(n6,2),n2=n4[0],n5=n4[1],n8=function(e){if(eB){var n,t=e.key,r=n2.includes(t);n5(n=eH?r?n2.filter(function(e){return e!==t}):[].concat((0,l.Z)(n2),[t]):[t]);var o=(0,i.Z)((0,i.Z)({},e),{},{selectedKeys:n});r?null==eX||eX(o):null==eG||eG(o)}!eH&&np.length&&"inline"!==nI&&nh(eA)},n3=Y(function(e){null==e9||e9(ea(e)),n8(e)}),n9=Y(function(e,n){var t=np.filter(function(n){return n!==e});if(n)t.push(e);else if("inline"!==nI){var r=nq(e);t=t.filter(function(e){return!r.has(e)})}(0,h.Z)(np,t,!0)||nh(t,!0)}),n7=(ei=function(e,n){var t=null!=n?n:!np.includes(e);n9(e,t)},el=p.useRef(),(eu=p.useRef()).current=nU,ec=function(){S.Z.cancel(el.current)},p.useEffect(function(){return function(){ec()}},[]),function(e){var n=e.which;if([].concat($,[_,V,z,F]).includes(n)){var t=function(){return u=new Set,c=new Map,s=new Map,nH().forEach(function(e){var n=document.querySelector("[data-menu-id='".concat(y(ns,e),"']"));n&&(u.add(n),s.set(n,e),c.set(e,n))}),u};t();var r=function(e,n){for(var t=e||document.activeElement;t;){if(n.has(t))return t;t=t.parentElement}return null}(c.get(nU),u),i=s.get(r),l=function(e,n,t,r){var i,l,a,u,c="prev",s="next",f="children",d="parent";if("inline"===e&&r===_)return{inlineTrigger:!0};var v=(i={},(0,o.Z)(i,T,c),(0,o.Z)(i,L,s),i),p=(l={},(0,o.Z)(l,A,t?s:c),(0,o.Z)(l,D,t?c:s),(0,o.Z)(l,L,f),(0,o.Z)(l,_,f),l),m=(a={},(0,o.Z)(a,T,c),(0,o.Z)(a,L,s),(0,o.Z)(a,_,f),(0,o.Z)(a,V,d),(0,o.Z)(a,A,t?f:d),(0,o.Z)(a,D,t?d:f),a);switch(null===(u=({inline:v,horizontal:p,vertical:m,inlineSub:v,horizontalSub:m,verticalSub:m})["".concat(e).concat(n?"":"Sub")])||void 0===u?void 0:u[r]){case c:return{offset:-1,sibling:!0};case s:return{offset:1,sibling:!0};case d:return{offset:-1,sibling:!1};case f:return{offset:1,sibling:!1};default:return null}}(nI,1===nW(i,!0).length,nf,n);if(!l&&n!==z&&n!==F)return;($.includes(n)||[z,F].includes(n))&&e.preventDefault();var a=function(e){if(e){var n=e,t=e.querySelector("a");null!=t&&t.getAttribute("href")&&(n=t);var r=s.get(e);nJ(r),ec(),el.current=(0,S.Z)(function(){eu.current===r&&n.focus()})}};if([z,F].includes(n)||l.sibling||!r){var u,c,s,f,d=j(f=r&&"inline"!==nI?function(e){for(var n=e;n;){if(n.getAttribute("data-menu-list"))return n;n=n.parentElement}return null}(r):nc.current,u);a(n===z?d[0]:n===F?d[d.length-1]:B(f,u,r,l.offset))}else if(l.inlineTrigger)ei(i);else if(l.offset>0)ei(i,!0),ec(),el.current=(0,S.Z)(function(){t();var e=r.getAttribute("aria-controls");a(B(document.getElementById(e),u))},5);else if(l.offset<0){var v=nW(i,!0),p=v[v.length-2],m=c.get(p);ei(p,!1),a(m)}}null==ne||ne(e)});p.useEffect(function(){nu(!0)},[]);var te=p.useMemo(function(){return{_internalRenderMenuItem:nn,_internalRenderSubMenuItem:nt}},[nn,nt]),tn="horizontal"!==nI||ex?no:no.map(function(e,n){return p.createElement(w,{key:e.key,overflowDisabled:n>nL},e)}),tt=p.createElement(f.Z,(0,r.Z)({id:ek,ref:nc,prefixCls:"".concat(ep,"-overflow"),component:"ul",itemComponent:ev,className:s()(ep,"".concat(ep,"-root"),"".concat(ep,"-").concat(nI),eZ,(ef={},(0,o.Z)(ef,"".concat(ep,"-inline-collapsed"),nO),(0,o.Z)(ef,"".concat(ep,"-rtl"),nf),ef),em),dir:eM,style:eb,role:"menu",tabIndex:void 0===eC?0:eC,data:tn,renderRawItem:function(e){return e},renderRawRest:function(e){var n=e.length,t=n?no.slice(-n):null;return p.createElement(eK,{eventKey:q,title:e5,disabled:nV,internalPopupClose:0===n,popupClassName:e8},t)},maxCount:"horizontal"!==nI||ex?f.Z.INVALIDATE:f.Z.RESPONSIVE,ssr:"full","data-menu-list":!0,onVisibleChange:function(e){n_(e)},onKeyDown:n7},nr));return p.createElement(I.Provider,{value:te},p.createElement(b.Provider,{value:ns},p.createElement(w,{prefixCls:ep,rootClassName:em,mode:nI,openKeys:np,rtl:nf,disabled:eI,motion:na?eU:null,defaultMotions:na?eJ:null,activeKey:nU,onActive:n0,onInactive:n1,selectedKeys:n2,inlineIndent:void 0===eQ?24:eQ,subMenuOpenDelay:void 0===eS?.1:eS,subMenuCloseDelay:void 0===eD?.1:eD,forceSubMenuRender:eT,builtinPlacements:e1,triggerSubMenuAction:void 0===e0?"hover":e0,getPopupContainer:e3,itemIcon:e6,expandIcon:e4,onItemClick:n3,onOpenChange:n9},p.createElement(P.Provider,{value:nG},tt),p.createElement("div",{style:{display:"none"},"aria-hidden":!0},p.createElement(M.Provider,{value:nY},no)))))}),eT=["className","title","eventKey","children"],eL=["children"],e_=function(e){var n=e.className,t=e.title,o=(e.eventKey,e.children),i=(0,u.Z)(e,eT),l=p.useContext(E).prefixCls,a="".concat(l,"-item-group");return p.createElement("li",(0,r.Z)({role:"presentation"},i,{onClick:function(e){return e.stopPropagation()},className:s()(a,n)}),p.createElement("div",{role:"presentation",className:"".concat(a,"-title"),title:"string"==typeof t?t:void 0},t),p.createElement("ul",{role:"group",className:"".concat(a,"-list")},o))};function eV(e){var n=e.children,t=(0,u.Z)(e,eL),r=eg(n,R(t.eventKey));return k()?r:p.createElement(e_,(0,en.Z)(t,["warnKey"]),r)}function ez(e){var n=e.className,t=e.style,r=p.useContext(E).prefixCls;return k()?null:p.createElement("li",{className:s()("".concat(r,"-item-divider"),n),style:t})}var eF=eD;eF.Item=ev,eF.SubMenu=eK,eF.ItemGroup=eV,eF.Divider=ez;var e$=eF}}]);