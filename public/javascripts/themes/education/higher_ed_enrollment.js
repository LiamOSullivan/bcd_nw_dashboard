let heEnrollmentChart = dc.rowChart("#education-he-enrollment-chart");
d3.csv("../data/Education/higher_education_enrollments.csv").then(function(data) {
  data.forEach(function(x) {
    x.Count = +x.Count;
  });
  console.log("Edu attainment data: " + data.length);

  let ndx = crossfilter(data),
    institutionDimension = ndx.dimension(function(d) {
      return d["Institution"];
    }),
    institutionGroup = institutionDimension.group().reduceSum(function(d) {
      return +d.Count;
    });
  heEnrollmentChart
    .width(400)
    .height(300)
    .x(d3.scaleLinear().domain([0, 20000]))
    .elasticX(true)
    .dimension(institutionDimension)
    .group(institutionGroup);

  heEnrollmentChart
    .render();
});