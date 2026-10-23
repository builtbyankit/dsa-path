const fs=require('fs');
const raw=fs.readFileSync('content/DSA-Preparation-Guide.md','utf8');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function inline(s){return esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1 ↗</a>')}
function md(s){let lines=s.split(/\r?\n/),out='',code=false,table=false,list=false;for(const l of lines){if(l.startsWith('```')){if(list){out+='</ul>';list=false}out+=code?'</code></pre>':'<pre><code>';code=!code;continue}if(code){out+=esc(l)+'\n';continue}if(l.startsWith('|')){if(!table){out+='<div class="table-wrap"><table>';table=true}if(!/^\|[\s:|-]+\|$/.test(l))out+='<tr>'+l.split('|').slice(1,-1).map(c=>'<td>'+inline(c.trim())+'</td>').join('')+'</tr>';continue}if(table){out+='</table></div>';table=false}if(/^[-]|^\d+\./.test(l)){if(!list){out+='<ul>';list=true}out+='<li>'+inline(l.replace(/^(-|\d+\.)\s*/,''))+'</li>';continue}if(list){out+='</ul>';list=false}const h=l.match(/^(#{1,6}) (.+)/);if(h)out+=`<h${Math.min(h[1].length,4)}>${inline(h[2])}</h${Math.min(h[1].length,4)}>`;else if(l.trim())out+='<p>'+inline(l)+'</p>'}return out+(table?'</table></div>':'')+(list?'</ul>':'')}
const parts=[...raw.matchAll(/^### Phase (\d+) — (.+)$/gm)];
const phases=parts.map((m,i)=>{let end=i+1<parts.length?parts[i+1].index:raw.indexOf('## 5.');const text=raw.slice(m.index,end);return {id:+m[1],title:m[2].trim(),html:md(text),text}});
const questions=new Map();
for(const p of phases){let tier='Extension';for(const line of p.text.split(/\r?\n/)){if(line.startsWith('**Core'))tier='Core';else if(line.startsWith('**Extensions')||line.startsWith('|'))tier='Extension';else if(line.startsWith('**'))continue;for(const m of line.matchAll(/([^;|:\n]+?)\s*\((\d{1,4})(?:,[^)]*)?\)/g)){let title=m[1].replace(/^.*?\*\*\s*/,'').trim();if(!title||title.length>110)continue;const id=m[2];if(!questions.has(id))questions.set(id,{id,title,phase:p.id,tier});}}}
const sections=[...raw.matchAll(/^## (.+)$/gm)].map((m,i,a)=>({title:m[1],html:md(raw.slice(m.index,a[i+1]?.index??raw.length))}));
const masteryRaw=fs.readFileSync('mastery.md','utf8');
const masteryParts=[...masteryRaw.matchAll(/^## (\d+) — (.+)$/gm)];
const mastery=masteryParts.map((m,i)=>({id:i,title:m[2],html:md(masteryRaw.slice(m.index,masteryParts[i+1]?.index??masteryRaw.length))}));
const extra=[[862,'Shortest Subarray with Sum at Least K',3],[327,'Count of Range Sum',16],[719,'Find K-th Smallest Pair Distance',4],[1293,'Shortest Path in a Grid with Obstacles Elimination',11],[1368,'Minimum Cost to Make at Least One Valid Path in a Grid',12],[864,'Shortest Path to Get All Keys',11],[834,'Sum of Distances in Tree',8],[1483,'Kth Ancestor of a Tree Node',8],[1235,'Maximum Profit in Job Scheduling',14],[188,'Best Time to Buy and Sell Stock IV',14],[1547,'Minimum Cost to Cut a Stick',14],[2402,'Meeting Rooms III',9],[502,'IPO',13],[493,'Reverse Pairs',16],[1697,'Checking Existence of Edge Length Limited Paths',12],[1044,'Longest Duplicate Substring',16],[528,'Random Pick with Weight',15],[382,'Linked List Random Node',15]];
for(const [id,title,phase]of extra)if(!questions.has(String(id)))questions.set(String(id),{id:String(id),title,phase,tier:'Mastery'});
const patterns=require('./patterns.cjs');
if(!questions.has('1049'))questions.set('1049',{id:'1049',title:'Last Stone Weight II',phase:14,tier:'Mastery'});
for(const p of patterns)for(const id of p.ids)if(!questions.has(id))throw Error('Pattern question missing: '+id);
fs.writeFileSync('dist/data.js','window.COURSE='+JSON.stringify({phases:phases.map(({text,...p})=>p),questions:[...questions.values()],sections,mastery,labs:require('./labs.cjs'),patterns})+';');
fs.writeFileSync('dist/patterns-guide.md','# DSA Pattern Atlas\n\nOriginal explanations and practice mapping. Templates may be schematic; read the stated assumptions.\n\n'+patterns.map(p=>`## ${p.title}\n\n### Recognize it\n${p.cue}\n\n### Invariant\n${p.invariant}\n\n### Example\n${p.example}\n\n### Template\n\`\`\`python\n${p.code}\n\`\`\`\n\n### Complexity\n${p.cost}\n\n### Common mistake\n${p.trap}\n\n### Follow-up\n${p.followup}\n\n### Practice ladder\n${p.ids.map(id=>questions.get(id).title+' ('+id+')').join(' → ')}\n`).join('\n'));
fs.writeFileSync('dist/mastery-guide.md',masteryRaw);
fs.copyFileSync('content/DSA-Preparation-Guide.md','dist/guide.md');
console.log(JSON.stringify({phases:phases.length,questions:questions.size}));

