let educationAttainmentChart = dc.rowChart("#education-attainment-chart");
d3.csv("../data/Demographics/educational_attainment.csv").then(function(data) {
  data.forEach(function(x) {
    x.Count = +x.Count;
  });
  // console.log("Edu attainment data: " + data.length);

  let ndx = crossfilter(data),
    levelDimension = ndx.dimension(function(d) {
      return d["Level of qualification"];
    }),
    levelGroup = levelDimension.group().reduceSum(function(d) {
      return +d.Count;
    });
  educationAttainmentChart
    .width(400)
    .height(300)
    .x(d3.scaleLinear().domain([0, 20000]))
    .elasticX(true)
    .dimension(levelDimension)
    .group(levelGroup);

  educationAttainmentChart
    .render();
});