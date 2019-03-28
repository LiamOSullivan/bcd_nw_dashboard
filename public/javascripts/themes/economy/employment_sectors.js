let employmentSectorChart = dc.rowChart("#employment-chart-2");
d3.csv("../data/Economy/emplyment_by_sector_all.csv").then(function(data) {
  data.forEach(function(x) {
    x.Count = +x.Count;
  });
  console.log("Employ sector data: " + data.length);

  let ndx = crossfilter(data),
    sectorDimension = ndx.dimension(function(d) {
      return d.Sector;
    }),
    sectorGroup = sectorDimension.group().reduceSum(function(d) {
      return d.Count;
    });
  employmentSectorChart
    .width(768)
    .height(480)
    .x(d3.scaleLinear().domain([0, 20000]))
    .elasticX(true)
    .dimension(sectorDimension)
    .group(sectorGroup);

  employmentSectorChart
    .render();
});