const HOVER_COLOR = "#16c1f3",
  svg = d3.select("#about-map"),
  elementNode = svg.node(),
  parentElement = elementNode.parentNode,
  dublin = d3.select("#dublin-text"),
  dData = derry_donegal.features[0].properties,
  percentage = d3.format(".2%"),
  thousands = d3.format(".2s"),
  maplocale = d3.formatLocale({
    "currency": ["€", ""]
  }),
  euro = maplocale.format("$,");
// diff = (getPerChange(dData.POPULATION, dData.PREVPOPULATION)),
// diffIncome = (getPerChange(dData.INCOME, dData.PREVINCOME));

// dublin.selectAll("#region__population").text(thousands(dData.POPULATION) + " ");
// dublin.select("#region__area").text(dData.AREA + ", ");
// dublin.select("#region__age").text(dData.AGE + " ");
// dublin.selectAll("#region__income").text(euro(dData.INCOME) + " ");
// dublin.select("#region__prePopulation").text(thousands(dData.PREVPOPULATION) + " ");
// dublin.select("#region__populationIndicator").text(indicatorText(diff, "#region__populationIndicator", "increased", false));
// dublin.select("#region__populationChange").text(percentage(diff) + indicator(diff, "#region__populationChange", false));
// dublin.select("#region__incomeIndicator").text(indicatorText(diff, "#region__incomeIndicator", "grew", false));
// dublin.select("#region__income__prev").text(euro(dData.PREVINCOME) + " ");
// dublin.select("#region__income__change").text(percentage(diffIncome) + indicator(diffIncome, "#region__income__change", false));

let elementWidth = parentElement.getBoundingClientRect().width,
  aspectRatio = elementWidth < 500 ? elementWidth * 0 : elementWidth * 1.25,
  scaleValue = elementWidth > 500 ? 16500 : elementWidth < 300 ? 20000 : 30000;

console.log("w: " + elementWidth);
console.log("ar: " + aspectRatio);

const WIDTH = elementWidth,
  HEIGHT = aspectRatio;

svg.attr("width", WIDTH)
  .attr("height", HEIGHT);

// Event Handlers
function mouseOverHandler(d, i) {
  d3.select(this).attr("fill", HOVER_COLOR)
    .style("cursor", "pointer");
  // d3.select("#region" + d.properties.OBJECTID).attr("fill", HOVER_COLOR);
}

function mouseOutHandler(d, i) {
  d3.select(this).attr("fill", "#001F35")
    .style("cursor", "default");
  // d3.select("#region" + d.properties.OBJECTID).attr("fill", "#001F35");
}

function clickHandler(d, i) {
  let opentext = "",
    localdiff = (getPerChange(d.properties.POPULATION, d.properties.PREVPOPULATION)),
    localdiffIncome = (getPerChange(d.properties.INCOME, d.properties.PREVINCOME));

  d3.selectAll(".local").classed("local-on", false);
  d3.select(this).classed("local-on", true);
  d3.select("#local" + d.properties.OBJECTID).classed("local-on", true);
  d3.select("#local__title").text(d.properties.ENGLISH + " ");
  d3.select("#local__open").text(d.properties.ABOUT);
  d3.selectAll("#local__title__small").text(d.properties.ENGLISH + " ");
  d3.select("#local__total-poualtion").text(d.properties.POPULATION + " ");
  d3.select("#local__area").text(d.properties.AREA + ", ");
  d3.select("#local__age").text(d.properties.AGE + " ");
  d3.selectAll("#local__income").text(d.properties.INCOME + " ");
  d3.select("#local__prePopulation").text(d.properties.PREVPOPULATION + " ");
  d3.select("#local__curPopulation").text(d.properties.POPULATION + " ");
  d3.select("#local__populationIndicator").text(indicatorText(localdiff, "#local__populationIndicator", "increased", false));
  d3.select("#local__populationChange").text(percentage(localdiff) + indicator(localdiff, "#local__populationChange", false));
  d3.select("#local__incomeIndicator").text(indicatorText(localdiff, "#local__incomeIndicator", "grew", false));
  d3.select("#local__income__prev").text(d.properties.PREVINCOME + " ");
  d3.select("#local__income__change").text(percentage(localdiffIncome) + indicator(localdiffIncome, "#local__income__change", false));
  d3.select(".lp-map__compare").style("visibility", "visible");
}

const g = svg.append("g");

const projection = d3
  .geoMercator()
  .center([-8.35818, 54.698479]) //54.898479, -7.805818
  .scale(scaleValue)
  .translate([WIDTH / 3, HEIGHT / 4]);

// SVG path
// use above projection.
const path = d3.geoPath().projection(projection);

// 1. Plot the map from data source `derry_donegal`
// 2. Place the local aut name in the map

function renderMap(root) {
  // Draw local aut and register event listeners
  g
    .append("g")
    .selectAll("path")
    .data(root.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#001F35")
    .attr("stroke", "#d1d1d182")
    .attr("stroke-width", 1)
    .attr("class", "local")
    .attr("id", d => "local" + d.properties.OBJECTID)
    .on("mouseover", mouseOverHandler)
    .on("mouseout", mouseOutHandler)
    .on("click", clickHandler);

  // Place name in the middle
  g
    .append("g")
    .selectAll("text")
    .data(root.features)
    .enter()
    .append("text")
    .attr("id", d => "localLabel" + d.properties.OBJECTID)
    .attr("transform", d => {
      return (d.geometry) !== undefined ? `translate(${ path.centroid(d) })` : `translate(-10,-100)`;
    })
    .attr("text-anchor", "middle")
    .attr("fill", "#FFF")
    .attr("font-size", 14)
    .attr("dy", ".35em")
    .attr("cursor", "pointer")
    // .on("mouseover", mouseOverHandler)
    // .on("mouseout", mouseOutHandler)
    .on("click", clickHandler)
    .text(d => d.properties.ENGLISH)
    .call(textWrap, 140, 10)
    .style('pointer-events', 'none');

}

function renderTabs(root) {
  // Remove old and Draw local aut and register event listeners
  let tabs = d3.select("#lp-tabs").selectAll("buttons");

  // tabs.remove();
  tabs.data(root.features).enter();
  tabs.append("button")
    .attr("class", "btn btn-bcd mx-1")
    .attr("id", d => "local" + d.properties.OBJECTID)
    .text(d => d.properties.ENGLISH)
    .on("click", clickHandler);
}

function getPerChange(d1, d0) {
  let value = (d1 - d0) / d0;
  if (value === Infinity) {
    return d1;
  } else if (isNaN(value)) {
    return 0;
  }
  return value;

}

function indicator(value, selector, negative) {
  let indicatorColour,
    indicatorSymbol = value > 0 ? " ▲ increase" : value < 0 ? " ▼ decrease" : "";

  if (negative === true) {
    indicatorColour = value < 0 ? "#20c997" : value > 0 ? "#da1e4d" : "#f8f8f8";
  } else {
    indicatorColour = value > 0 ? "#20c997" : value < 0 ? "#da1e4d" : "#f8f8f8";
  }

  d3.select(selector).style("color", indicatorColour);
  return indicatorSymbol;
}

function indicatorText(value, selector, text, negative) {
  let indicatorColour,
    indicatorText;
  // indicatorSymbol = value > 0 ? " ▲ " : value < 0 ? " ▼ " : "";

  if (negative === true) {
    indicatorColour = value < 0 ? "#20c997" : value > 0 ? "#da1e4d" : "#f8f8f8";
  } else {
    indicatorColour = value > 0 ? "#20c997" : value < 0 ? "#da1e4d" : "#f8f8f8";
  }

  switch (text) {
    case "increased":
      indicatorText = value < 0 ? "decreased " : value > 0 ? "increased " : "hasn't changed ";
      break;

    case "grew":
      indicatorText = value < 0 ? "shrunk " : value > 0 ? "grew " : "hasn't changed ";
      break;

    default:
      indicatorText = "undefined";
      break;
  }

  // d3.select(selector).style("color", indicatorColour);
  return indicatorText;
}

let screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

if (screenSize > 991) {
  renderMap(derry_donegal);
} else {
  renderTabs(derry_donegal);
}

d3.select(window).on("resize", function() {

});

function textWrap(text, width, xpos = 0, limit = 3) {
  text.each(function() {
    let words,
      word,
      line,
      lineNumber,
      lineHeight,
      y,
      dy,
      tspan,
      times;

    text = d3.select(this);

    words = text.text().split(/\s+/).reverse();
    line = [];
    lineNumber = 0;
    lineHeight = 1;
    y = text.attr('y');
    dy = parseFloat(text.attr('dy'));
    tspan = text
      .text(null)
      .append('tspan')
      .attr('x', xpos)
      .attr('y', y)
      .attr('dy', dy + 'em');

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(' '));

      if (tspan.node() && tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));

        if (lineNumber < limit - 1) {
          ++lineNumber;
          line = [word];
          tspan = text.append('tspan')
            .attr('x', xpos)
            .attr('y', y)
            .attr('dy', lineHeight + dy + 'em')
            .text(word);
          // if we need two lines for the text, move them both up to center them
          text.classed('adjust-upwards', true);
        } else {
          line.push('...');
          tspan.text(line.join(' '));
          break;
        }
      }
    }
  });
}