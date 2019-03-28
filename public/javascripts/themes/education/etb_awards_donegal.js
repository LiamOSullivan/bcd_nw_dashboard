d3.csv("../data/Education/etb_awards_donegal.csv").then(function(data) {
  //    console.log("data- \n" + data.length);

  data.forEach(function(d) {
    d["QQI Level 4"] = +d["QQI Level 4"]; //we can add a more standardised property than the raw column names
    d["QQI Level 5"] = +d["QQI Level 5"]; //note this adds more fields to the data
    d["QQI Level 6"] = +d["QQI Level 6"];
    d["Industry Awards Level 4"] = +d["Industry Awards Level 4"];
    d["Industry Awards Level 5"] = +d["Industry Awards Level 5"];
    d["Industry Awards Level 6"] = +d["Industry Awards Level 6"];
    d["Leaving Certificate & LCA (Level 4 equivalency)"] = +d["Leaving Certificate & LCA (Level 4 equivalency)"];
    d.Year = +d.Year
  });

  console.log("\n\nawards data: \n" + JSON.stringify(data[0]));

  let ndx = crossfilter(data);

  let yearDim = ndx.dimension(function(d) {
    return d.Year;
  });

  let qqi4_Group = yearDim.group().reduceSum(function(d) {
    return d["QQI Level 4"];
  });

  let qqi5_Group = yearDim.group().reduceSum(function(d) {
    return d["QQI Level 5"];
  });

  let qqi6_Group = yearDim.group().reduceSum(function(d) {
    return d["QQI Level 6"];
  });

  let ind4_Group = yearDim.group().reduceSum(function(d) {
    return d["Industry Awards Level 4"];
  });

  let ind5_Group = yearDim.group().reduceSum(function(d) {
    return d["Industry Awards Level 5"];
  });

  let ind6_Group = yearDim.group().reduceSum(function(d) {
    return d["Industry Awards Level 6"];
  });

  let etbAwardsChart = dc.lineChart("#etb-awards-donegal-chart");

  etbAwardsChart
    .width(700)
    .height(300)
    .margins({
      left: 50,
      top: 20,
      right: 150,
      bottom: 20
    })
    .dimension(yearDim)
    .group(qqi4_Group, 'QQI 4')
    .stack(qqi5_Group, 'QI 5')
    .stack(qqi6_Group, 'QI 6')
    .stack(ind4_Group, 'Ind 4')
    .stack(ind5_Group, 'Ind 5')
    .stack(ind6_Group, 'Ind 6')
    .transitionDuration(750);
  etbAwardsChart
    .x(d3.scaleLinear().domain([2014, 2017]))
    .xAxis().ticks(4).tickFormat(d3.format("d"));
  // schoolEnrollmentChart.yAxis().ticks(3);
  etbAwardsChart
    .y(d3.scaleLinear().domain([0, 1000]))
    .elasticY(true);
  etbAwardsChart
    .brushOn(false)
    .renderArea(true)
    .xyTipsOn(true);

  etbAwardsChart.render();

  //     .on('renderlet', function(chart) {
  //       chart.selectAll('.dc-legend-item')
  //         .on('click', function(d) {
  //
  //           var nme = d.name.toString();
  //           //                    console.log("Click on legend: " + nme);
  //           waitDim.filter(nme);
  //           dc.redrawAll();
  //         })
  //     });
  // //                    customise colours used on stacked areas
  //   //TODO: use colorbrewer for safe colours
  //   timeLine.ordinalColors(['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#034e7b']);
  //
  //   timeLine.title('0-3 Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 0-3 months";
  //   });
  //   timeLine.title('3-6 Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 3-6 months";
  //   });
  //   timeLine.title('6-9 Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 6-9 months";
  //   });
  //   timeLine.title('9-12 Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 9-12 months";
  //   });
  //   timeLine.title('12-15 Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 12-15 months";
  //   });
  //   timeLine.title('15-18 Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 15-18 months";
  //   });
  //   timeLine.title('18+ Months', function(d) {
  //     return d.key.getDate() + "-" +
  //       (d.key.getMonth() + 1) + "-" +
  //       d.key.getFullYear() +
  //       "\n" + d.value + " patients waited 18+ months";
  //   });
  //   //                    interactive legend for each stack
  //   timeLine.legend(dc.legend().x(705).y(60).itemHeight(25).gap(40).autoItemWidth(false));
  //
  //   //                    workaround to filter by legend click

  //
  //   //                    workaround for inverting the legend stack layers
  //   dc.override(timeLine, 'legendables', timeLine._legendables);
  //
  //   dc.override(timeLine, 'legendables', function() {
  //     var legendables = this._legendables();
  //     if (!this.dashStyle()) {
  //       return legendables.reverse();
  //     }
  //     return legendables.map(function(l) {
  //       l.dashstyle = this.dashStyle();
  //       return l.reverse();
  //     });
  //   });
  //
  //   select1
  //     .dimension(nameDim)
  //     .group(nameGroup)
  //     //                            .multiple(true)
  //     .controlsUseVisibility(false)
  //     .promptText('All hospitals')
  //     .width(100);
  //   select2
  //     .dimension(specialityDim)
  //     .group(specialityGroup)
  //     //                            .multiple(true)
  //     .controlsUseVisibility(false)
  //     .promptText('All treatment types')
  //     .width(100);
  //
  //   select3
  //     .dimension(ageDim)
  //     .group(ageGroup)
  //     //                            .multiple(true)
  //     //                            .numberVisible(10)
  //     .controlsUseVisibility(false)
  //     .promptText('All age groups')
  //     .width(100);
  //   //add all charts/ dc elements we want to co-interact to an array for ease
  //   var waitChartGroup;
  //   var waitCharts = [timeLine, select1, select2, select3];
  //
  //   //use underscore each to check all the interactive elements
  //   _.each(waitCharts, function(waitChart) {
  //     dc.registerChart(waitChart, waitChartGroup); //add all charts to group
  //     waitChart.on("filtered", function(chart, filter) {
  //       if (chart === select1) {
  //         if (filter === null) {
  //           d3.select('#hospital_text').text('all hospitals');
  //
  //         } else {
  //           d3.select('#hospital_text').text(filter);
  //         }
  //       } else if (chart === select2) {
  //         if (filter === null) {
  //           d3.select('#specialism_text').text('all types of treatment');
  //         } else {
  //           d3.select('#specialism_text').text(filter);
  //         }
  //       } else if (chart === select3) {
  //         if (filter === null) {
  //           d3.select('#age_text').text('of all ages');
  //
  //         } else {
  //           d3.select('#age_text').text('aged ' + filter + ' years');
  //         }
  //       }
  //     });
  //   });
  //
  //   dc.renderAll(waitChartGroup);

});