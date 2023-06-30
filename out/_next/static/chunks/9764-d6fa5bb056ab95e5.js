"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9764],{49764:function(e,n,t){t.d(n,{LC:function(){return T}});var r,u,i,o,s,c,a,f,l,d,p,v,y,b,h=t(21452),g=t(71098),S=t(86006),m=t(52641),O=t(50803);t(52040);var k=function(e,n){for(var t=0,r=n.length,u=e.length;t<r;t++,u++)e[u]=n[t];return e},E=Object.defineProperty,Q=Object.defineProperties,q=Object.getOwnPropertyDescriptors,M=Object.getOwnPropertySymbols,R=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable,z=function(e,n,t){return n in e?E(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t},C=function(e,n){for(var t in n||(n={}))R.call(n,t)&&z(e,t,n[t]);if(M)for(var r=0,u=M(n);r<u.length;r++){var t=u[r];w.call(n,t)&&z(e,t,n[t])}return e},A=function(e,n){return Q(e,q(n))};function L(e,n,t,r){var u=(0,S.useMemo)(function(){return{queryArgs:e,serialized:"object"==typeof e?n({queryArgs:e,endpointDefinition:t,endpointName:r}):e}},[e,n,t,r]),i=(0,S.useRef)(u);return(0,S.useEffect)(function(){i.current.serialized!==u.serialized&&(i.current=u)},[u]),i.current.serialized===u.serialized?i.current.queryArgs:e}var D=Symbol();function I(e){var n=(0,S.useRef)(e);return(0,S.useEffect)(function(){(0,m.shallowEqual)(n.current,e)||(n.current=e)},[e]),(0,m.shallowEqual)(n.current,e)?n.current:e}var j=WeakMap?new WeakMap:void 0,N=function(e){var n=e.endpointName,t=e.queryArgs,r="",u=null==j?void 0:j.get(t);if("string"==typeof u)r=u;else{var i=JSON.stringify(t,function(e,n){return(0,O.isPlainObject)(n)?Object.keys(n).sort().reduce(function(e,t){return e[t]=n[t],e},{}):n});(0,O.isPlainObject)(t)&&(null==j||j.set(t,i)),r=i}return n+"("+r+")"},_="undefined"!=typeof window&&window.document&&window.document.createElement?S.useLayoutEffect:S.useEffect,P=function(e){return e},F=function(e){return e.isUninitialized?A(C({},e),{isUninitialized:!1,isFetching:!0,isLoading:void 0===e.data,status:h.QueryStatus.pending}):e};function x(e){return e.replace(e[0],e[0].toUpperCase())}function K(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];Object.assign.apply(Object,k([e],n))}(r=b||(b={})).query="query",r.mutation="mutation";var H=Symbol(),T=(0,h.buildCreateApi)((0,h.coreModule)(),(s=void 0===(o=(i=void 0===u?{}:u).batch)?m.batch:o,a=void 0===(c=i.useDispatch)?m.useDispatch:c,l=void 0===(f=i.useSelector)?m.useSelector:f,p=void 0===(d=i.useStore)?m.useStore:d,y=void 0!==(v=i.unstable__sideEffectsInRender)&&v,{name:H,init:function(e,n,t){var r=function(e){var n=e.api,t=e.moduleOptions,r=t.batch,u=t.useDispatch,i=t.useSelector,o=t.useStore,s=t.unstable__sideEffectsInRender,c=e.serializeQueryArgs,a=e.context,f=s?function(e){return e()}:S.useEffect;return{buildQueryHooks:function(e){var t=function(t,r){var i=void 0===r?{}:r,o=i.refetchOnReconnect,s=i.refetchOnFocus,c=i.refetchOnMountOrArgChange,l=i.skip,d=i.pollingInterval,p=n.endpoints[e].initiate,v=u(),y=L(void 0!==l&&l?h.skipToken:t,N,a.endpointDefinitions[e],e),b=I({refetchOnReconnect:o,refetchOnFocus:s,pollingInterval:void 0===d?0:d}),g=(0,S.useRef)(!1),m=(0,S.useRef)(),O=m.current||{},k=O.queryCacheKey,E=O.requestId,Q=!1;k&&E&&(Q=!!v(n.internalActions.internal_probeSubscription({queryCacheKey:k,requestId:E})));var q=!Q&&g.current;return f(function(){g.current=Q}),f(function(){q&&(m.current=void 0)},[q]),f(function(){var e,n=m.current;if(y===h.skipToken){null==n||n.unsubscribe(),m.current=void 0;return}var t=null==(e=m.current)?void 0:e.subscriptionOptions;if(n&&n.arg===y)b!==t&&n.updateSubscriptionOptions(b);else{null==n||n.unsubscribe();var r=v(p(y,{subscriptionOptions:b,forceRefetch:c}));m.current=r}},[v,p,c,y,b,q]),(0,S.useEffect)(function(){return function(){var e;null==(e=m.current)||e.unsubscribe(),m.current=void 0}},[]),(0,S.useMemo)(function(){return{refetch:function(){var e;if(!m.current)throw Error("Cannot refetch a query that has not been started yet.");return null==(e=m.current)?void 0:e.refetch()}}},[])},s=function(t){var i=void 0===t?{}:t,o=i.refetchOnReconnect,s=i.refetchOnFocus,c=i.pollingInterval,a=n.endpoints[e].initiate,l=u(),d=(0,S.useState)(D),p=d[0],v=d[1],y=(0,S.useRef)(),b=I({refetchOnReconnect:o,refetchOnFocus:s,pollingInterval:void 0===c?0:c});f(function(){var e,n;b!==(null==(e=y.current)?void 0:e.subscriptionOptions)&&(null==(n=y.current)||n.updateSubscriptionOptions(b))},[b]);var h=(0,S.useRef)(b);f(function(){h.current=b},[b]);var g=(0,S.useCallback)(function(e,n){var t;return void 0===n&&(n=!1),r(function(){var r;null==(r=y.current)||r.unsubscribe(),y.current=t=l(a(e,{subscriptionOptions:h.current,forceRefetch:!n})),v(e)}),t},[l,a]);return(0,S.useEffect)(function(){return function(){var e;null==(e=null==y?void 0:y.current)||e.unsubscribe()}},[]),(0,S.useEffect)(function(){p===D||y.current||g(p,!0)},[p,g]),(0,S.useMemo)(function(){return[g,p]},[g,p])},d=function(t,r){var u=void 0===r?{}:r,s=u.skip,f=u.selectFromResult,d=n.endpoints[e].select,p=L(void 0!==s&&s?h.skipToken:t,c,a.endpointDefinitions[e],e),v=(0,S.useRef)(),y=(0,S.useMemo)(function(){return(0,g.createSelector)([d(p),function(e,n){return n},function(e){return p}],l)},[d,p]),b=(0,S.useMemo)(function(){return f?(0,g.createSelector)([y],f):y},[y,f]),O=i(function(e){return b(e,v.current)},m.shallowEqual),k=y(o().getState(),v.current);return _(function(){v.current=k},[k]),O};return{useQueryState:d,useQuerySubscription:t,useLazyQuerySubscription:s,useLazyQuery:function(e){var n=s(e),t=n[0],r=n[1],u=d(r,A(C({},e),{skip:r===D})),i=(0,S.useMemo)(function(){return{lastArg:r}},[r]);return(0,S.useMemo)(function(){return[t,u,i]},[t,u,i])},useQuery:function(e,n){var r=t(e,n),u=d(e,C({selectFromResult:e===h.skipToken||(null==n?void 0:n.skip)?void 0:F},n)),i=u.data,o=u.status,s=u.isLoading,c=u.isSuccess,a=u.isError,f=u.error;return(0,S.useDebugValue)({data:i,status:o,isLoading:s,isSuccess:c,isError:a,error:f}),(0,S.useMemo)(function(){return C(C({},u),r)},[u,r])}}},buildMutationHook:function(e){return function(t){var o=void 0===t?{}:t,s=o.selectFromResult,c=void 0===s?P:s,a=o.fixedCacheKey,f=n.endpoints[e],l=f.select,d=f.initiate,p=u(),v=(0,S.useState)(),y=v[0],b=v[1];(0,S.useEffect)(function(){return function(){(null==y?void 0:y.arg.fixedCacheKey)||null==y||y.reset()}},[y]);var h=(0,S.useCallback)(function(e){var n=p(d(e,{fixedCacheKey:a}));return b(n),n},[p,d,a]),O=(y||{}).requestId,k=i((0,S.useMemo)(function(){return(0,g.createSelector)([l({fixedCacheKey:a,requestId:null==y?void 0:y.requestId})],c)},[l,y,c,a]),m.shallowEqual),E=null==a?null==y?void 0:y.arg.originalArgs:void 0,Q=(0,S.useCallback)(function(){r(function(){y&&b(void 0),a&&p(n.internalActions.removeMutationResult({requestId:O,fixedCacheKey:a}))})},[p,a,y,O]),q=k.endpointName,M=k.data,R=k.status,w=k.isLoading,z=k.isSuccess,L=k.isError,D=k.error;(0,S.useDebugValue)({endpointName:q,data:M,status:R,isLoading:w,isSuccess:z,isError:L,error:D});var I=(0,S.useMemo)(function(){return A(C({},k),{originalArgs:E,reset:Q})},[k,E,Q]);return(0,S.useMemo)(function(){return[h,I]},[h,I])}},usePrefetch:function(e,t){var r=u(),i=I(t);return(0,S.useCallback)(function(t,u){return r(n.util.prefetch(e,t,C(C({},i),u)))},[e,r,i])}};function l(e,n,t){if((null==n?void 0:n.endpointName)&&e.isUninitialized){var r=n.endpointName,u=a.endpointDefinitions[r];c({queryArgs:n.originalArgs,endpointDefinition:u,endpointName:r})===c({queryArgs:t,endpointDefinition:u,endpointName:r})&&(n=void 0)}var i=e.isSuccess?e.data:null==n?void 0:n.data;void 0===i&&(i=e.data);var o=void 0!==i,s=e.isLoading,f=e.isSuccess||s&&o;return A(C({},e),{data:i,currentData:e.data,isFetching:s,isLoading:!o&&s,isSuccess:f})}}({api:e,moduleOptions:{batch:s,useDispatch:a,useSelector:l,useStore:p,unstable__sideEffectsInRender:y},serializeQueryArgs:n.serializeQueryArgs,context:t}),u=r.buildQueryHooks,i=r.buildMutationHook,o=r.usePrefetch;return K(e,{usePrefetch:o}),K(t,{batch:s}),{injectEndpoint:function(n,t){if(t.type===b.query){var r=u(n),o=r.useQuery,s=r.useLazyQuery,c=r.useLazyQuerySubscription,a=r.useQueryState,f=r.useQuerySubscription;K(e.endpoints[n],{useQuery:o,useLazyQuery:s,useLazyQuerySubscription:c,useQueryState:a,useQuerySubscription:f}),e["use"+x(n)+"Query"]=o,e["useLazy"+x(n)+"Query"]=s}else if(t.type===b.mutation){var l=i(n);K(e.endpoints[n],{useMutation:l}),e["use"+x(n)+"Mutation"]=l}}}}}))}}]);