// let parseTime = d3.timeParse("%d/%m/%Y"),
//   formatTime = d3.timeFormat("%d/%m/%Y"),
//   formatYear = d3.timeFormat("%Y"),
//   formatMonthYear = d3.timeFormat("%b-%Y"),
//   parseMonth = d3.timeParse("%b-%y"),
//   parseYearMonth = d3.timeParse("%Y-%b"), // ie Jan-14 = Wed Jan 01 2014 00:00:00 GMT+0000 (Greenwich Mean Time)
//   parseYear = d3.timeParse("%Y");
//
// const getKeys = (d) => d.filter((e, p, a) => a.indexOf(e) === p);

// let rpiChart = dc.compositeChart("#rpi-chart");

var rpi = dc.compositeChart("#rpi-chart");
d3.csv("../data/Housing/RPI.csv").then(function(results) {
  let ndx = crossfilter();
  ndx.add(results.map(function(d) {
    return {
      x: +d.Year,
      y1: +d["Border Region (Excl. Louth)"],
      y2: +d["Ireland"]
    };
  }));

  let dim = ndx.dimension(dc.pluck('x')),
    grp1 = dim.group().reduceSum(dc.pluck('y1')),
    grp2 = dim.group().reduceSum(dc.pluck('y2'));
  rpi
    .width(350)
    .height(200)
    .x(d3.scaleLinear().domain([2005, 2016]))
    .y(d3.scaleLinear().domain([0, 200]))
    .yAxisLabel("RPI")
    .legend(dc.legend().x(150).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
      dc.lineChart(rpi)
      .dimension(dim)
      .colors('red')
      .group(grp1, "Border Region")
      .dashStyle([2, 2])
      .defined(function(d) {
        return d.y1 !== 0;
      }),
      dc.lineChart(rpi)
      .dimension(dim)
      .colors('blue')
      .group(grp2, "Ireland")
      .dashStyle([5, 5])
      .defined(function(d) {
        return d.y2 !== 0;
      }),
    ])
    .brushOn(false);
  rpi.xAxis().ticks(4);
  rpi.yAxis().ticks(3);
  rpi.render();
});

var hpi = dc.compositeChart("#hpi-chart");
d3.csv("../data/Housing/HPI.csv").then(function(results) {
  let ndx = crossfilter();
  ndx.add(results.map(function(d) {
    return {
      x: d.Year,
      y1: +d["DCSDC"],
      y2: +d["NI"]
    };
  }));

  let dim = ndx.dimension(dc.pluck('x')),
    grp1 = dim.group().reduceSum(dc.pluck('y1')),
    grp2 = dim.group().reduceSum(dc.pluck('y2'));
  hpi
    .width(350)
    .height(200)
    .x(d3.scaleLinear().domain([2005, 2016]))
    .y(d3.scaleLinear().domain([0, 200]))
    .yAxisLabel("HPI")
    .legend(dc.legend().x(150).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
      dc.lineChart(hpi)
      .dimension(dim)
      .colors('red')
      .group(grp1, "DCSDC")
      .dashStyle([2, 2])
      .defined(function(d) {
        return d.y1 !== 0;
      }),
      dc.lineChart(hpi)
      .dimension(dim)
      .colors('blue')
      .group(grp2, "NI")
      .dashStyle([5, 5])
      .defined(function(d) {
        return d.y2 !== 0;
      }),
    ])
    .brushOn(false);
  hpi.xAxis().ticks(4);
  hpi.yAxis().ticks(4);
  hpi.render();
});

// d3.csv("../data/Housing/RPI.csv").then(data => {
//   console.log("Housing data: " + JSON.stringify(data));
//   for (let elem in data) {
//     console.log(`${elem} = ${data[elem]}`);
//   }
//   let rpi = new crossfilter(data);
//   let yearDim = rpi.dimension(function(d) {
//     return d["Year"];
//   });
//   let irelandGroup = yearDim.group().reduceSum(function(d) {
//     return d["Ireland"];
//   });
//   // let grp = rpi.groupAll();
//   // console.log(yearDim.top(Infinity).getKeys());
//   // let yearDim = ndx.dimension(function(d) {
//   //   return d["Year"];
//   // });
//   rpiChart.width(400).height(300);
//   rpiChart.dimension(yearDim);
//   rpiChart.group(irelandGroup);
//   //        console.log("day range: " + start + " - " + end);
//   rpiChart.x(d3.scaleLinear().domain([2005, 2016]));
//   rpiChart.y(d3.scaleLinear().domain([0, 150]));
//   rpiChart.margins({
//     left: 40,
//     top: 30,
//     right: 40,
//     bottom: 40
//   });
//   .compose([
//             dc.lineChart(composite)
//                 .dimension(dim)
//                 .colors('red')
//                 .group(grp1, "Top Line")
//                 .dashStyle([2,2]),
//             dc.lineChart(composite)
//                 .dimension(dim)
//                 .colors('blue')
//                 .group(grp2, "Bottom Line")
//                 .dashStyle([5,5])
//             ])
//   // rpiChart.xAxis().ticks(3);
//   // rpiChart.renderArea(false);
//   // rpiChart.renderDataPoints(false);
//   // rpiChart.renderDataPoints({
//   //   radius: 10
//   // }); //, fillOpacity: 0.8, strokeOpacity: 0.0});
//   // rpiChart.renderLabel(true); //, fillOpacity: 0.8, strokeOpacity: 0.0}); //labels on points -> how to apply to last point only?
//   // rpiChart.label(function(d) {
//   //   if (d.x === latest) {
//   //     console.log(JSON.stringify(d));
//   //     let hour = new Date(d.x).getHours();
//   //     let mins = new Date(d.x).getMinutes().toString().padStart(2, '0');
//   //     let end = ((d.y == 1) ? ' bike' : ' bikes');
//   //     //                let str = hour + ':' + mins +
//   //     let str = JSON.stringify(d.y) + end;
//   //     //                console.log(str);
//   //     return str;;
//   //   }
//   //   return '';
//   // });
//   //        rpiChart.title(function (d, i) {
//   //            let hour = new Date(d.key).getHours();
//   //            let mins = new Date(d.key).getMinutes().toString().padStart(2, '0');
//   //            let val = ((d.value == 1) ? ' bike available' : ' bikes available');
//   //            let str = hour + ':' + mins + ' - ' + JSON.stringify(d.value) + val;
//   ////              console.log(str);
//   //            return str;
//   //        });
//   // rpiChart.renderVerticalGridLines(true);
//   // rpiChart.useRightYAxis(false);
//   // // rpiChart.xyTipsOn(true);
//   // rpiChart.brushOn(false);
//   // rpiChart.clipPadding(20);
//   // rpiChart.render();




// });