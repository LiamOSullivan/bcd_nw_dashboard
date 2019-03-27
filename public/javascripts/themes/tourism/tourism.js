var tourismChart = dc.barChart("#tourism-chart-1");
d3.csv("../data/Tourism/tourism_numbers.csv").then(function(data) {

  console.log("\n\n>>>tourism data: " + "\n" + JSON.stringify(data));
  var ndx = crossfilter(data);
  var regionDim = ndx.dimension(function(d) {
    return d.Region;
  });
  var group = regionDim.group().reduce(
    function(p, v) {
      p[v.Origin] = (p[v.Origin] || 0) + +v.Count;
      return p;
    },
    function(p, v) {
      p[v.Origin] = (p[v.Origin] || 0) - +v.Count;
      return p;
    },
    function() {
      return {};
    });

  tourismChart
    .height(300)
    .width(700)
    .margins({
      left: 100,
      top: 20,
      right: 150,
      bottom: 20
    })
    .dimension(regionDim)
    .x(d3.scaleOrdinal())
    .gap(20)
    .xUnits(dc.units.ordinal)
    .group(group, "Northern Ireland")
    .valueAccessor(function(d) {
      return d.value["Northern Ireland"];
    })
    .stack(group, "Great Britain", function(d) {
      return d.value["Great Britain"];
    })
    .stack(group, "Other European", function(d) {
      return d.value["Other European"];
    })
    .stack(group, "North America", function(d) {
      return d.value["North America"];
    })
    .stack(group, "Other (incl. RoI)", function(d) {
      return d.value["Other (including RoI)"];
    })
    .brushOn(true);

  tourismChart.legend(dc.legend().x(560).y(60).itemHeight(13).gap(5));
  dc.override(tourismChart, 'legendables', function() {
    var items = tourismChart._legendables();
    return items.reverse();
  });
  tourismChart.yAxis().ticks(3);
  tourismChart.render();

});