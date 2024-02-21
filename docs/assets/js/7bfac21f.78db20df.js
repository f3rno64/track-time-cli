"use strict";(self.webpackChunktrack_time_cli_docs=self.webpackChunktrack_time_cli_docs||[]).push([[141],{4644:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var s=n(3274),i=n(2476);const r={id:"data-types",title:"Data Types",sidebar_position:2},a=void 0,o={id:"basic-concepts/data-types",title:"Data Types",description:"There are two primary types of data that track-time-cli deals with:",source:"@site/docs/basic-concepts/data_types.md",sourceDirName:"basic-concepts",slug:"/basic-concepts/data-types",permalink:"/docs/basic-concepts/data-types",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/basic-concepts/data_types.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"data-types",title:"Data Types",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Database",permalink:"/docs/basic-concepts/database"}},c={},d=[{value:"Time Sheets",id:"time-sheets",level:2},{value:"Recommended Usage",id:"recommended-usage",level:3},{value:"Creating New Time Sheets",id:"creating-new-time-sheets",level:3},{value:"Switching Between Time Sheets",id:"switching-between-time-sheets",level:3},{value:"Deleting Time Sheets",id:"deleting-time-sheets",level:3},{value:"Listing Time Sheets",id:"listing-time-sheets",level:3},{value:"Time Sheet Entries",id:"time-sheet-entries",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["There are two primary types of data that ",(0,s.jsx)(t.strong,{children:"track-time-cli"})," deals with:\n",(0,s.jsx)(t.strong,{children:"time sheets"})," and ",(0,s.jsx)(t.strong,{children:"time sheet entries"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["While we are defining the data structures, it is worth noting that the database\nkeeps track of the ",(0,s.jsx)(t.strong,{children:"active time sheet"})," via the ",(0,s.jsx)(t.strong,{children:"activeSheetName"})," field in\nthe ",(0,s.jsx)(t.a,{href:"https://github.com/f3rno64/track-time-cli/blob/main/src/types/generic_data.ts#L15-L19",children:(0,s.jsx)(t.strong,{children:"database schema"})}),"."]}),"\n",(0,s.jsx)(t.h2,{id:"time-sheets",children:"Time Sheets"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Time sheets"})," are primarily collections of ",(0,s.jsx)(t.strong,{children:"entries"}),"; they have a ",(0,s.jsx)(t.strong,{children:"name"}),"\nfield, which is used to refer to them in commands, and a ",(0,s.jsx)(t.strong,{children:"activeEntryID"}),"\nfield, which denotes the entry that is now running, or ",(0,s.jsx)(t.em,{children:"active"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["For reference, their ",(0,s.jsx)(t.a,{href:"https://github.com/f3rno64/track-time-cli/blob/main/src/types/generic_data.ts#L9-L13",children:(0,s.jsx)(t.strong,{children:"schema"})})," is reproduced below:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",metastring:"showLineNumbers",children:"export interface ITimeSheet<T> {\n  name: string\n  entries: ITimeSheetEntry<T>[]\n  activeEntryID: number | null\n}\n"})}),"\n",(0,s.jsx)(t.admonition,{type:"info",children:(0,s.jsxs)(t.p,{children:["New time sheets are ",(0,s.jsx)(t.strong,{children:"automatically created"})," when they are activated via\nthe ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt sheet <name>"})})," command for the first time. So to start working\nwithin a new sheet, just switch to it with ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt s <name>"})}),"."]})}),"\n",(0,s.jsx)(t.h3,{id:"recommended-usage",children:"Recommended Usage"}),"\n",(0,s.jsxs)(t.p,{children:["In general, ",(0,s.jsx)(t.strong,{children:"track-time-cli"})," was designed to be used with multiple projects\nand contexts. Therefore, it is recommended to create a separate time sheet for\neach one of your projects, along with any additional sheets that cover\nnon-project-based activities like ",(0,s.jsx)(t.strong,{children:"learning"}),", ",(0,s.jsx)(t.strong,{children:"reading"}),", ",(0,s.jsx)(t.strong,{children:"gaming"}),",\n",(0,s.jsx)(t.strong,{children:"hobbies"}),", etc."]}),"\n",(0,s.jsx)(t.p,{children:"Over time, as your list of time sheets grows, you will benefit from the\nsupport of multiple sheets integrated in all commands; for example, command\noutput may be broken down by time sheet, commands may take time sheet names as\nfilters to limit their scope, and other commands can generate overall reports\non your historical activity drawing from all time sheets."}),"\n",(0,s.jsx)(t.h3,{id:"creating-new-time-sheets",children:"Creating New Time Sheets"}),"\n",(0,s.jsxs)(t.p,{children:["New time sheets are automatically created when they are first set as active via\nthe ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt sheet <name>"})})," command, otherwise known as ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt s <name>"})}),". If a\nsheet with the provided name exists, it is set as active; otherwise, a new\nempty time sheet is created with the specified ",(0,s.jsx)(t.strong,{children:"name"})," and set as ",(0,s.jsx)(t.strong,{children:"active"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["For reference, the output of ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt s --help"})})," is reproduced below:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-text",children:"track-time-cli sheet [name]\n\nSwitch to or delete a sheet by name\n\nOptions:\n      --version        Show version number                            [boolean]\n  -d, --delete, --del  Delete the specified time sheet or time sheet entry\n                                                                      [boolean]\n  -n, --name           New name to apply to specified time sheet       [string]\n      --help           Show help                                      [boolean]\n"})}),"\n",(0,s.jsx)(t.h3,{id:"switching-between-time-sheets",children:"Switching Between Time Sheets"}),"\n",(0,s.jsxs)(t.p,{children:["To change the current active time sheet, use the same ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt sheet <name>"})})," or\n",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt s <name>"})})," command, where ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"<name>"})})," is the name of the time sheet you\nwish to switch too."]}),"\n",(0,s.jsx)(t.p,{children:"The output can resemble the following:"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Sample tt sheet new-sheet command output",src:n(808).A+"",width:"424",height:"67"})}),"\n",(0,s.jsx)(t.h3,{id:"deleting-time-sheets",children:"Deleting Time Sheets"}),"\n",(0,s.jsxs)(t.p,{children:["To delete a time sheet, you can either use the ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"edit"})})," command, passing a\n",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"--sheet <name>"})})," argument along with the ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"--delete"})})," flag. For example,\n",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt edit --sheet new-sheet --delete"})})," will delete the sheet named\n",(0,s.jsx)(t.em,{children:"new-sheet"}),", or you can pass ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"--delete"})})," to the\n",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt sheet <name> command"})}),". For example, ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt s new-sheet --delete"})}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"listing-time-sheets",children:"Listing Time Sheets"}),"\n",(0,s.jsxs)(t.p,{children:["To view a list of all time sheets, use the ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt sheets"})})," command, also\navailable as ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt ss"})}),". It will display a list of all time sheets, their total\nentry counts, and their total logged entry durations. It supports a few flags,\nsuch as ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"--since '<natural-language date string>'"})})," which will limit the time\nsheet entries included in the output to those that occurred since the specified\ndate."]}),"\n",(0,s.jsx)(t.admonition,{type:"tip",children:(0,s.jsxs)(t.p,{children:["For arguments supporting natural-language date specification, you can specify\nthe date or time relative to the present moment. For example,\n",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"--since '2 days ago'"})}),", ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"--since '12 hours and 30 minutes ago'"})}),", and\n",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"--since 'three months ago'"})})," are all valid inputs."]})}),"\n",(0,s.jsxs)(t.p,{children:["For reference, the output of ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"tt sheets --help"})})," is reproduced below:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-text",children:"track-time-cli sheets\n\nList all sheets\n\nOptions:\n      --version   Show version number                                 [boolean]\n  -h, --humanize  Print the total duration in human-readable format   [boolean]\n  -s, --since     Only list entries since the specified date          [string]\n  -t, --today     Show results for today                              [boolean]\n      --help      Show help                                           [boolean]\n"})}),"\n",(0,s.jsxs)(t.p,{children:["To illustrate, this is how many time sheets the ",(0,s.jsx)(t.a,{href:"https://github.com/f3rno64",children:(0,s.jsx)(t.em,{children:"author"})})," of\n",(0,s.jsx)(t.strong,{children:"track-time-cli"})," uses at the time of writing this documentation:"]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Sample tt sheets command output",src:n(4007).A+"",width:"1031",height:"1121"})}),"\n",(0,s.jsx)(t.h2,{id:"time-sheet-entries",children:"Time Sheet Entries"}),"\n",(0,s.jsx)(t.admonition,{type:"note",children:(0,s.jsxs)(t.p,{children:["An active entry is one, which has a ",(0,s.jsx)(t.strong,{children:"start"})," date but no ",(0,s.jsx)(t.strong,{children:"end"})," date. Only\none active entry may exist ",(0,s.jsx)(t.strong,{children:"per time sheet"})," at any one time."]})}),"\n",(0,s.jsxs)(t.p,{children:["Finally, we arrive at the core of ",(0,s.jsx)(t.strong,{children:"track-time-cli"}),"'s functionality: ",(0,s.jsx)(t.strong,{children:"Time\nSheet Entries"}),". These contain several fields, with their\n",(0,s.jsx)(t.a,{href:"https://github.com/f3rno64/track-time-cli/blob/main/src/types/generic_data.ts#L1-L7",children:(0,s.jsx)(t.strong,{children:"schema"})})," reproduced below:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",metastring:"showLineNumbers",children:"export interface ITimeSheetEntry<T> {\n  id: number\n  start: T\n  end: T | null\n  description: string\n  tags: string[]\n}\n"})})]})}function l(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},808:(e,t,n)=>{n.d(t,{A:()=>s});const s="data:image/png;base64,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"},4007:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/sample_tt_sheets_output-7a73b2a5e1d5e3a2d590df9de68d855f.png"},2476:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var s=n(9474);const i={},r=s.createContext(i);function a(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);