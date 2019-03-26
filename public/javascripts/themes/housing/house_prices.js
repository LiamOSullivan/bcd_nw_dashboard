// let parseTime = d3.timeParse("%d/%m/%Y"),
//   formatTime = d3.timeFormat("%d/%m/%Y"),
//   formatYear = d3.timeFormat("%Y"),
//   formatMonthYear = d3.timeFormat("%b-%Y"),
//   parseMonth = d3.timeParse("%b-%y"),
//   parseYearMonth = d3.timeParse("%Y-%b"), // ie Jan-14 = Wed Jan 01 2014 00:00:00 GMT+0000 (Greenwich Mean Time)
//   parseYear = d3.timeParse("%Y");
//
// const getKeys = (d) => d.filter((e, p, a) => a.indexOf(e) === p);


d3.csv("../data/Housing/RPI.csv").then(data => {
  console.log("Housing data: " + JSON.stringify(data));
  for (let elem in data) {
    console.log(`${elem} = ${data[elem].kv}`);
  }
  let rpi = new crossfilter(data);
  let yearDim = rpi.dimension(function(d) {
    return d["Year"];
  });
  // let grp = rpi.groupAll();
  // console.log(yearDim.top(Infinity).getKeys());
  // let yearDim = ndx.dimension(function(d) {
  //   return d["Year"];
  // });
});