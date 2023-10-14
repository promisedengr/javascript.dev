// Problem
// const input = [
//   { text: "One", indent: 0, type: "ordered" },
//   { text: "Two", indent: 0, type: "ordered" },
//   { text: "Alpha", indent: 1, type: "bullet" },
//   { text: "Beta", indent: 1, type: "bullet" },
//   { text: "I", indent: 2, type: "ordered" },
//   { text: "II", indent: 2, type: "ordered" },
//   { text: "Three", indent: 0, type: "ordered" }
// ];

// function deltaToHtml(input) {
//   const output = input.reduce((prev, cur) => {
//     console.log(cur);
//     return prev + `<ul><li>${cur.text}<li></ul>`;
//   }, "");
//   document.getElementById("app").innerHTML = output;
// }

// deltaToHtml(input);

// The result should look like this.
// <ol>
//   <li>One</li>
//   <li>Two
//     <ul>
//       <li>Alpha</li>
//       <li>Beta
//         <ol>
//           <li>I</li>
//           <li>II</li>
//         </ol>
//       </li>
//     </ul>
//   </li>
//   <li>Three</li>
// </ol>

//Solution
let list = [
  { text: "One", indent: 0, type: "ordered",},
  { text: "Two", indent: 0, type: "ordered" },
  { text: "Alpha", indent: 1, type: "bullet" },
  { text: "Beta", indent: 1, type: "bullet" },
  { text: "I", indent: 2, type: "ordered" },
  { text: "II", indent: 2, type: "ordered" },
  { text: "Three", indent: 0, type: "ordered" },
  { text: "I", indent: 1, type: "ordered" },
  { text: "II", indent: 1, type: "ordered" },
];

var map = {}, node, roots = [], i;
list = list.map(item => ({...item, children: []}))

for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.indent == 0) {
        roots.push(node)
    } else {
        let j = i
        while(list[j].indent+1 !== node.indent) {
            j--
        }
        list[j].children.push(node)
        console.log(j, node)
    }
}

function makeView(input) {
    if(input.length === 0) {
        return ""
    }
     const string = input.reduce((prev, cur) => {
         if(cur.children.length>0) {
             prev += `<li>${cur.text} ${makeView(cur.children)}</li>`
         } else {
             prev += `<li>${cur.text}</li>`
         }
         return prev
     }, '')
     
     return input[0].type === 'bullet'? `<ul>${string}</ul>` : `<ol>${string}</ol>`  
}



deltaToHtml(makeView(roots));
console.log("root", makeView(roots));