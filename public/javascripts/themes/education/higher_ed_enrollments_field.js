let chartUpper = 1000;
let uuChart = dc.rowChart("#education-chart-2");
d3.csv("../data/Demographics/uu_enrollments_2015.csv").then(function(data) {
  data.forEach(function(x) {
    x.Count = +x.Count;
  });
  // console.log("Edu UU enrollment data: " + data.length);

  let ndx = crossfilter(data),
    subjectDimension = ndx.dimension(function(d) {
      return d["Subject area"];
    }),
    subjectGroup = subjectDimension.group().reduceSum(function(d) {
      return +d.Count;
    });
  uuChart
    .width(400)
    .height(300)
    .x(d3.scaleLinear().domain([0, chartUpper]))
    .elasticX(true)
    .dimension(subjectDimension)
    .group(subjectGroup);

  uuChart
    .render();
});

let litChart = dc.rowChart("#education-chart-3");
d3.csv("../data/Demographics/lit_enrollments_2015.csv").then(function(data) {
  data.forEach(function(d) {
    d["Letterkenny IT"] = +d["Letterkenny IT"];
  });
  // console.log("Edu LIT enrollment data: " + data.length);

  let ndx = crossfilter(data),
    subjectDimension = ndx.dimension(function(d) {
      return d["Field of Study (ISCED)"];
    }),
    subjectGroup = subjectDimension.group().reduceSum(function(d) {
      return d["Letterkenny IT"];
    });
  litChart
    .width(400)
    .height(300)
    .x(d3.scaleLinear().domain([0, chartUpper]))
    .elasticX(true)
    .dimension(subjectDimension)
    .group(subjectGroup);

  litChart
    .render();
});