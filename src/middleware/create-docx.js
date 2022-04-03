import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TabStopPosition, TabStopType, TextRun , PageOrientation , Table , TableRow , TableCell , VerticalAlign } from "docx";

const DocxCreator = (params={},options)=>{
  let { header , total , footer } = params;
  let docx = new Document({
    sections: [
      {
        properties :{
          page:{ size :{ orientation:PageOrientation.LANDSCAPE } , pageNumbers:1 , margin : { right:'1cm',top:'1cm',left:'1cm',bottom:'1cm' } },
        },
        children: [
          ...header.split('\n').map((text)=>createParagraph({ text })),
          createParagraph({ text:' ' }),
          createTable(),
          createParagraph({ text:' ' }),
          ...total.split('\n').map((text)=>createParagraph({ text })),
          ...footer.split('\n').map((text)=>createParagraph({ text , size:'11pt' , line:350 })),
        ]
      },
    ]
  })
  return docx;
}

const createTableHead = (params={})=>{
  let { days=30 , values , timeSheet } = params;
  let halfDays = Math.floor(days/2) + ( days % 2 === 1?1:0 ); // values : [ no ]
  let [ no , totalDays , dailyFee , price , name , job , signture ] = values; // [ "ت" , "عدد الأيام" , "الأجر اليومي" , "المبلغ" , "اسم العامل" , "المهنة" , "التوقيع" ]
  return [
    new TableRow({
      children: [
        createCell({ text:no , rowSpan:2 }),
        ...Array.from(new Array(halfDays)).map((e,i)=>createCell({ text:timeSheet[i] , ...(
          timeSheet[i]==='√'
          ? {font:'Agency FB'}
          : ( timeSheet[i]==='x'
              ? {font:'Calibri',size:'16pt'}
              : {font:'Arial'}
            )
          ) })), // String(i+1)
        createCell({ text:totalDays , rowSpan:2 }),
        createCell({ text:dailyFee , rowSpan:2 }),
        createCell({ text:price , rowSpan:2 }),
        createCell({ text:name , rowSpan:2 }),
        createCell({ text:job , rowSpan:2 }),
        createCell({ text:signture , rowSpan:2 }),
      ],
    }),
    new TableRow({
      children: [
        ...Array.from(new Array(halfDays)).map((e,i)=>createCell({ text:(i+halfDays)<days?timeSheet[i+halfDays]:"**" , ...(
          timeSheet[i+halfDays]==='√'
          ? {font:'Agency FB'}
          : ( timeSheet[i+halfDays]==='x'
              ? {font:'Calibri',size:'16pt'}
              : {font:'Arial'}
            )
          ) 
        })), // i+1+halfDays
      ],
    }),
  ];
}

const createTable = (params={})=>{
  let { days=29 } = params;
  let halfDays = Math.floor(days/2) + ( days % 2 === 1?1:0 );
  return new Table({
    visuallyRightToLeft:true,
    rows: [
        ...createTableHead({ days:29 , values:[ "ت" , "عدد الأيام" , "الأجر اليومي" , "المبلغ" , "اسم العامل" , "المهنة" , "التوقيع" ] , timeSheet:Array.from(new Array(29)).map((e,i)=>String(i+1)) }),
        ...createTableHead({ days:29 , values:[ "1" , "19" , "20000" , "380000" , "وسام علي حسين" , "عامل مخزن" , "  " ] , timeSheet:Array.from(new Array(29)).map(()=>Math.floor(Math.random()*2)===1?'√':'x') })
    ],
});
}

const createCell = (params={ })=>{
  let { text , rowSpan=1 , font , size } = params;
  return new TableCell({
    rowSpan,
    verticalAlign : VerticalAlign.CENTER,
    margins : { right:100,left:100,top:30,bottom:30 } ,
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        heading : HeadingLevel.HEADING_1,
        bidirectional : false,
        // spacing : { },
        children: [
          new TextRun({
            text: text,
            color:'000000',
            font:font || "Arial",
            size : size || '14pt',
            bold: true,
            rightToLeft:true
          }),
        ]
      })
    ],
  });
}

const createParagraph = ({ text , size , line })=>{
  return new Paragraph({
    alignment: AlignmentType.RIGHT,
    heading : HeadingLevel.HEADING_1,
    bidirectional : false,
    spacing : {
      line : line | 420,
    },
    children: [
      new TextRun({
        text: text,
        color:'000000',
        font:"Arial",
        size : size || '12pt',
        bold: true,
        rightToLeft:true
      }),
    ]
  })
}

export default DocxCreator