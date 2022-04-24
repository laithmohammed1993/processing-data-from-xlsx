const fs      = require('fs');
const path    = require('path');
//
function sliceArrayIntoGroups(arr, size) {
  var step = 0, sliceArr = [], len = arr.length;
  while (step < len) {
    sliceArr.push(arr.slice(step, step += size));
  }
  return sliceArr;
}
//
function processer(params={},options={}) {
  let { file='' , header='',footer='',total='' , numberOfRows=5 } = params;
  let { isTest } = options;
  if( isTest ){
    file = fs.readFileSync(path.resolve(__dirname,'./public/assets/resources/12.csv'),'utf16le');
  }
  let body = file
  .split('\r\n') // remove new lines
  .slice(12) // take all lines after line number 12
  .filter((line,i,arr)=>![arr.length-1,arr.length-2].includes(i))
  .join('\r\n') // rejoin all lines with new line digits
  .split(',,,0.00,,,') // split employers
  .map(str=>str
    .split(',') // spliting the data for each employer and result [ ..., [ ... ,string , ... ]empolyers , ... ]:empolyers
    .filter(str=>!['','\r\n'].includes(str)) // remove empty values
  ) // 
  .map((subarr,i,arr)=>{
    let currentArr      = [ ...subarr ];
    let nextArr         = Array.isArray(arr[i+1])?arr[i+1]:[];
    let firstTwoIndexes = nextArr.slice(0,1);
    if( i !== 0 ){
      currentArr = currentArr.slice(1);
    }
    return [ ...currentArr , ...firstTwoIndexes ];
  })
  .filter(arr=>arr.length!==0)
  .map((subarr,i,arr)=>
    subarr.length===(arr[0].length*2)
    ? [ subarr.slice(0,arr[0].length),subarr.slice(arr[0].length) ]
    : [subarr]
  );
  let bodys = [].concat(...body);
  // settable(body);
  let data = [];
  for( let index in bodys ){
    let row = bodys[index];
    let [ ID , Name ] = row;
    let timeSheet = row.filter(str=>str.includes('AB')||str.includes('AM')||str.includes('PM')).map((str)=>str.includes('AB')?'x':'√')
    data.push({
      'values' : [ parseInt(index)+1, timeSheet.filter(str=>str==='√').length , "  " , "  " , Name , "  " , "  " ], // [ "1" , "19" , "20000" , "380000" , "وسام علي حسين" , "عامل مخزن" , "  " ]
      'timeSheet' : timeSheet,
    })
  }
  let sections = sliceArrayIntoGroups(data,numberOfRows).map((arr,i)=>({ 
    'data':arr , 
    days:data[0].timeSheet.length, 
    halfDays : Math.floor(data[0].timeSheet.length/2) + ( data[0].timeSheet.length % 2 === 1?1:0 ),
    'header':header , 
    'footer':footer, 
    'total':total
  }));
  if( isTest ){
    fs.writeFileSync(path.resolve(__dirname,'./data.txt'),JSON.stringify(sections,null,2),'utf-8');
    console.log('finised')
  } else {
    return sections;
  }
}
// console.log(processer())

module.exports = processer;