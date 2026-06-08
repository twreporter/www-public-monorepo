import{g as h}from"./get-enum-arg-y2kIuzNl.js";import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{r as j}from"./iframe-D2Xon01l.js";import{c as l}from"./clsx-B-dksMZM.js";import{P as m}from"./paragraph-Cjr17Zr9.js";import{a as n}from"./heading-C7E1odXb.js";import{I as y}from"./img-placeholder-OmS2SCF_.js";import"./preload-helper-CmCXLAn_.js";import"./constants-C0G6BcTz.js";const s={s:"s",l:"l"},a=({title:d,publishedDate:c="",categoryLabel:p="",image:t,size:r=s.l})=>{const[x,u]=j.useState(null),f=t?.src??void 0,i=`${r}:${f??""}`,g=x===i;return e.jsxs("div",{className:l("flex flex-row w-full","hover:opacity-80",r===s.s?"gap-[8px]":"gap-[16px]"),children:[e.jsxs("div",{className:l("flex flex-col w-full gap-[4px]",r===s.s?"gap-[4px]":"gap-[8px]"),children:[e.jsxs("div",{className:"flex flex-row gap-[8px]",children:[p?e.jsx(m,{className:"text-gray-600",text:p}):null,c?e.jsx(m,{className:"text-gray-800",text:c}):null]}),e.jsx(n,{className:"text-gray-800",text:d,type:n.Type.article})]}),e.jsx("div",{className:"flex justify-center items-center",children:t?.src&&!g?e.jsx("img",{src:t.src,alt:t.alt??"",className:l("object-cover shrink-0",r===s.s?"w-[40px] h-[40px]":"w-[80px] h-[80px]"),onError:()=>u(i)}):e.jsx("div",{className:l("shrink-0 flex items-center justify-center bg-gray-100",r===s.s?"w-[40px] h-[40px]":"w-[80px] h-[80px]"),children:e.jsx(y,{})})})]})};a.Size=s;a.__docgenInfo={description:"",methods:[],displayName:"ShortCard",props:{publishedDate:{defaultValue:{value:"''",computed:!1},required:!1},categoryLabel:{defaultValue:{value:"''",computed:!1},required:!1},size:{defaultValue:{value:"'l'",computed:!1},required:!1}}};const _={title:"Card/Short",component:a,argTypes:{size:h(a.Size,a.Size.l)}},o={args:{size:a.Size.l,categoryLabel:"科技",title:"測試文章標題",publishedDate:"2024-01-01",image:{src:"https://picsum.photos/id/237/200/300",alt:"placeholder"}},parameters:{controls:{exclude:["className"]}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: ShortCard.Size.l,
    categoryLabel: '科技',
    title: '測試文章標題',
    publishedDate: '2024-01-01',
    image: {
      src: 'https://picsum.photos/id/237/200/300',
      alt: 'placeholder'
    }
  },
  parameters: {
    controls: {
      exclude: ['className']
    }
  }
}`,...o.parameters?.docs?.source}}};const q=["Basic"];export{o as Basic,q as __namedExportsOrder,_ as default};
