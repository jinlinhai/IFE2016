var tableTh=[{ title: '姓名',sort: false,},
             { title: '语文',sort: true,},
             { title: '数学',sort: true,},
             { title: '英语',sort: true,},
             { title: '总分',sort: true,}
];


var tableData=[{ 名字: '小明',语文: 80,数学: 90,英语: 70,总分: 240,},
          { 名字: '小红',语文: 90,数学: 60,英语: 90,总分: 240,},
          { 名字: '小亮',语文: 60,数学: 100,英语: 70,总分: 230,},
          { 名字: '小清',语文: 70,数学: 100,英语: 95,总分: 265,},
          { 名字: '小黄',语文: 80,数学: 70,英语: 78,总分: 228,},
          { 名字: '小白',语文: 99,数学: 65,英语: 90,总分: 254,},
];

//创建表格实例
var table1=new Createtable('sortTable',tableTh,'theahBg',tableData);
