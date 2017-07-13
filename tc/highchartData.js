// $(function() {

    
//      $('#container').highcharts({
//         chart: {
//             type: 'column',
//             borderRadius:3
//         },
//         title: {
//             y: 2,
//             x: 10,
//             align: 'left',
//             text: '',
//             style: {
//                 color: '#313c50',
//                 //color: '#313c50',
//                 fontSize: '14px'
//             }

//         },

//         credits: {
//             text: ""
//         },
//         xAxis: {
//             categories: [
//                 'com',
//                 'net',
//                 'org',
//                 'me',
//                 'biz',
//                 'co',
//                 'ninja',
//                 'edu',
//             ],
//             crosshair: false
//         },
//         yAxis: {
//             gridLineColor: '#DAE3E9',
//             //tickInterval: 100,
//             floor: 0,
//             ceiling: 2000,
//             title: {
//                 text: '  '
//             }
//         },
//         // plotOptions: {
//         //     column: {
//         //         pointPadding: 0.2,
//         //         borderWidth: 0,
//         //         pointWidth: 60
//         //     }
//         // },

//         // plotOptions: {
//         //     series: {
//         //         animation: false
//         //     }
//         // },

//         tooltip: {
//             //borderColor: '#DDDDDD',
//             formatter: function() {
//                 var point = this.point,
//                     s = this.x + ':<b>' + this.y + '</b><br/>';
//                 return s;
//             }
//         },
//         series: [{
//             name: 'dynadot',
//             //color:'#0078bd',
//             //color:'#48add8',
//             color: '#3987bc',
//             data: [49.9, 71.5, 106.4, 
//             // 129.2, 144.0, 176.0, 350, 396
//             ]
//         }],
//         exporting: {
//             enabled: false
//         },
//         credits: {
//             enabled: false
//         },
//         legend: {
//             enabled: false
//         }
    
    
//       });

// });


$(function() {$('#container').highcharts({ chart: { type: 'column', borderRadius:3 }, title: { y: 2, x: 10, align: 'left', text: '', style: { color: '#313c50',fontSize: '14px'} }, credits: { text: "" }, xAxis: { categories: ['com', 'net', 'biz', 'tel', 'cn', 'xn--fiqs8s', 'com.cn', 'net.cn', 'tv', 'in', 'co.in', 'other', 'other','other', 'other', 'other', 'other', 'other', 'other', 'other', 'other',  ] ,crosshair: false  }, yAxis: { gridLineColor: '#DAE3E9', floor: 0, ceiling: 2000,  title: {text: '  ' }  }, tooltip: { formatter: function() { var point = this.point, s = this.x + ':<b>' + this.y + '</b><br/>';return s; } },  series: [{ name: 'dynadot', color: '#3987bc',data: [146, 5, 5, 1, 2, 3, 1, 1, 2, 1, 1, 42]  }], exporting: {  enabled: false  },credits: { enabled: false },legend: { enabled: false  }   });  });










































