const parseTime = d3.timeParse("%d/%m/%Y"),
    parseYear = d3.timeParse("%Y"),
    formatYear = d3.timeFormat("%Y"),
    parseMonth = d3.timeParse("%Y-%b"),
    formatMonth = d3.timeFormat("%b-%y"),
    breakPoint = 768,
    getKeys = (d) => d.filter((e, p, a) => a.indexOf(e) === p);

let locale = d3.formatLocale({
    "decimal": ".",
    "thousands": ",",
    "grouping": [3],
    "currency": ["€", ""],
    "dateTime": "%a %b %e %X %Y",
    "date": "%m/%d/%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });


//   d3.formatLocale(locale);

function dataSets (data, columns){
    coercedData = data.map( d => {
        for( var i = 0, n = columns.length; i < n; i++ ){
            d[columns[i]] = +d[columns[i]];
        }
    return d;
    });
    return coercedData;
}

Promise.all([
    d3.csv("/data/landing_page/population_Age.csv"),
    d3.csv("data/landing_page/schools.csv"),
    d3.csv("data/Housing/propertyprices.csv"),
]).then( dataFiles => {

    const population_Age = dataFiles[0],
          houseCompData = dataFiles[1],
          priceList = dataFiles[2],

          popV = population_Age.columns.slice(3),
          popDate = population_Age.columns[0],
          popAgeK = population_Age.columns[2],
          popAgeKs = getKeys(population_Age.map(o => o[popAgeK])),
          popDCC = population_Age.filter( d => {
            return d.region === "Donegal";
          }),
          popDCSDC = population_Age.filter( d => {
            return d.region === "DCSDC";
          }),

          columnNames3 = houseCompData.columns.slice(2),
          columnNames4 = priceList.columns.slice(2),

          xValue = houseCompData.columns[0],

          dataSet3 = dataSets(houseCompData, columnNames3),
          dataSet4 = dataSets(priceList, columnNames4);


          population_Age.forEach( d => {
            d.date = d.year;
            d[popV] = +d[popV];
          });

          const popDCCData = nestData(popDCC, "year", popAgeK, popV);
          const popDCSDCData = nestData(popDCSDC, "year", popAgeK, popV);

    const primary = dataSet3.filter( d => {
            return d.schools === "Primary";
          }),

          secondary = dataSet3.filter( d => {
            return d.schools === "Secondary";
          });

    // const pop =  {
    //         d : dublinAnnualRate,
    //         e : "#pr-glance",
    //         yV: annualPopRate,
    //         xV: "date",
    //         sN: "region",
    //         fV: d3.format(".2s"),
    //         dL: "date"
    //     },
        
    //     popChart = new DataGlanceLine(pop);


    const houseCompMonthly = new GroupedBarChart(primary, columnNames3, xValue, "#dcc-se-glance", "Units", "title2");
    const dcsdcSchools = new GroupedBarChart(secondary, columnNames3, xValue, "#dcsdc-se-glance", "Units", "title2");
    
    const popProfileDCC = new StackBarChart("#dcc-pop", popDCCData, popAgeKs);
    const popProfileDCSDC = new StackBarChart("#dcsdc-pop", popDCSDCData, popAgeKs);
        //   popProfile.getData(popData);

    d3.select(window).on("resize", function(){
        houseCompMonthly.init(); 
        unemployChart.init();
        popChart.init();
        priceIndexChart.init();
        
        let screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if(screenSize >= 768){
            renderMap(dublincoco);
            }
            else{
            renderTabs(dublincoco);
            }
    });

}).catch(function(error){
    console.log(error);
});

class DataGlanceLine{

    // constructor function
    constructor (obj){

        this.d = obj.d;
        this.e = obj.e;
        this.yV = obj.yV;
        this.xV = obj.xV;
        this.sN = obj.sN; 
        this.fV = obj.fV;
        this.dL = obj.dL;

        // create the chart area
        this.init();
    }

    init(){
        let c = this;

        d3.select(c.e).select("svg").remove();

        c.eN = d3.select(c.e).node();
        c.eW = c.eN.getBoundingClientRect().width; 
        
        // dimensions margins, width and height
        c.m = [20, 10, 25, 10];
        c.w = c.eW - c.m[1] - c.m[3];
        c.h = 120 - c.m[0] - c.m[2];

        c.setScales();
        c.drawLine();
        c.drawLabels();
    }

    setScales(){
        let c = this,
            maxToday = c.d.length > 0 ? d3.max(c.d, (d) => { return d[c.yV]; }) : 0;

            // setting the line values ranges
            c.x = d3.scaleTime().range([0, c.w-5]);
            c.y = d3.scaleLinear().range([c.h -10, 0]);
                
            // setup the line chart function
            c.line = d3.line()
                .defined((d) => { return !isNaN(d[c.yV]); })
                .x(d =>{ return c.x(d[c.xV]); })
                .y(d =>{ return c.y(d[c.yV]); })
                .curve(d3.curveBasis);
        
            c.x.domain(d3.extent(c.d, d => {
                        return (d[c.xV]); }));
                    
            c.y.domain([0, Math.max(maxToday)]);
        
    }

    drawLine(){
        let c = this;

        // Adds the svg canvas
            c.svg = d3.select(c.e)
                .append("svg")
                .attr("width", c.w + c.m[1] + c.m[3])
                .attr("height", c.h + c.m[0])
                    .append("g")
                    .attr("transform", "translate(" + c.m[3] + "," + "20" + ")");
        
        // add the data
            c.svg.append("path")
                .attr("class", "activity")
                .attr("d", c.line(c.d))
                .attr("stroke","#16c1f3") // move to css
                .attr("stroke-width", 4) // move to css
                .attr("fill", "none"); // move to css
    }
    
    drawLabels(){
        let c = this,
            l = c.d.length,
            lD = c.d[l-1],
            fD = c.d[0];

            // Region/type name
            c.svg.append("text")
                .attr("dx", 0)
                .attr("dy", -10)
                .attr("class", "label")
                .attr("fill", "#16c1f3")// move to css
                .text(lD[c.sN]);// needs to be a d.name

            // value label
            c.svg.append("text")
                .attr("x", c.w + 10)
                .attr("y", c.y(lD[c.yV])-10)
                .attr("text-anchor", "end")// move to css
                .attr("class", "label")
                .attr("fill", "#f8f9fabd")// move to css
                .text(c.fV? c.fV(lD[c.yV]): lD[c.yV]); 

            // latest date label
            c.svg.append("text")
                .attr("x", c.w)
                .attr("y", c.h - 5)
                .attr("text-anchor", "end")// move to css
                .attr("class", "label employment")
                .attr("fill", "#f8f9fabd")// move to css
                .text(lD[c.dL]);

            // first date label
            c.svg.append("text")
                .attr("x", 0)
                .attr("y", c.h - 5)
                .attr("text-anchor", "start")// move to css
                .attr("class", "label employment")
                .attr("fill", "#f8f9fabd")// move to css
                .text(fD[c.dL]);

            c.svg.append("circle")
                .attr("cx", c.x(lD[c.xV]))
                .attr("cy", c.y(lD[c.yV]))
                .attr("r", 3)
                .attr("transform", "translate(0,0)")// move to css
                .attr("class", "cursor")
                .style("stroke", "#16c1f3") // move to css
                .style("stroke-width", "2px"); // move to css
    }
}


class GroupedBarChart{

    // constructor function
    constructor (_data, _keys, _xValue, _element, _titleX, _titleY){

        this.data = _data;
        this.keys = _keys;
        this.xValue = _xValue;
        this.element = _element;
        this.titleX = _titleX;
        this.titleY = _titleY;

        this.init();
    }

    // initialise method to draw chart area
    init(){
        let c = this,
            last = c.data.length -1;
            c.lastValue = c.data[last];

         d3.select(c.element).select("svg").remove();

        let eNode = d3.select(c.element).node();
        let eWidth = eNode.getBoundingClientRect().width; 
        
        // margin
        c.m = [20, 10, 25, 10];
        
        c.width = eWidth - c.m[1] - c.m[3];
        c.height = 120 - c.m[0] - c.m[2];

        // add the svg to the target element
        const svg = d3.select(c.element)
            .append("svg")
            .attr("width", c.width + c.m[1] + c.m[3])
            .attr("height", c.height + c.m[0]);
       
        // add the g to the svg and transform by top and left margin
        c.g = svg.append("g")
            .attr("transform", "translate(" + c.m[3] + "," + "20" + ")");
    
        // transition 
        c.t = () => { return d3.transition().duration(1000); }
    
        c.colourScheme = ["#aae0fa","#00929e","#da1e4d","#086fb8","#aae0fa","#16c1f3"];

        // set colour function
        c.colour = d3.scaleOrdinal(c.colourScheme.reverse());

        c.x0 = d3.scaleBand()
            .range([0, c.width])
            .padding(0.05);

        c.x1 = d3.scaleBand()
            .paddingInner(0.1);
    
        c.y = d3.scaleLinear()
            .range([c.height, 0]);
    
        // Start Month
        c.g.append("text")
            .attr("class", "label")
            .attr("x", 0)
            .attr("y", c.height -5)
            .attr("text-anchor", "start")
            .attr("fill", "#f8f9fabd")
            .text(c.data[0].date);
    
        // Last Month
        c.g.append("text")
            .attr("class", "label")
            .attr("x", c.width)
            .attr("y", c.height -5)
            .attr("text-anchor", "end")
            .attr("fill", "#f8f9fabd")
            .text(c.data[last].date);

        c.update();
    
    }
    
    update(){
        let c = this;

        // Update scales
        c.x0.domain(c.data.map(d => { return d[c.xValue]; }));
        c.x1.domain(c.keys).range([0, c.x0.bandwidth()]);
        c.y.domain([0, d3.max(c.data, d => { return d3.max(c.keys, key => { return d[key]; }); })]).nice();

        // join new data with old elements.
        c.rects = c.g.append("g")
            .attr("class","parent")
            .selectAll("g")
            .data(c.data, (d) => { return !isNaN(d.Value); })
            .enter()
            .append("g")
            .attr("transform", (d) => { return "translate(" + c.x0(d[c.xValue]) + ", 0)"; })
            .selectAll("rect")
            .data(d => { return c.keys.map( key => { 
                    return {
                        key: key, 
                        value: d[key]
                     }; 
                }); 
            })
            .enter().append("rect")
            .attr("x", d => { return c.x1(d.key); })
            .attr("y", d => { return c.y(d.value); })
            .attr("width", c.x1.bandwidth())
            .attr("height", d => { return (c.height - c.y(d.value) - c.m[0] ) ; })
            .attr("rx","2")
            .attr("ry","2")
            .attr("fill", d => { return c.colour(d.key); })
            .attr("opacity",".6"); //c.colour

            c.g.select(".parent g:nth-last-child(1)").selectAll("rect")
                .attr("opacity", "1");

            // c.g.append("text")
            //     .attr("dx", c.width)
            //     .attr("dy", c.y(c.lastValue) - 10)
            //     .attr("text-anchor", "end")
            //     .attr("class", "label value")
            //     .attr("fill", "#f8f9fabd")
            //     .text(c.lastValue);
        console.log("values",c.lastValue[c.keys[0]])
        // Title 
        c.g.append("text")
            .attr("dx", 0)
            .attr("dy", -10)
            .attr("class", "label")
            .attr("fill", d => { return c.colour(c.keys[0]); })
            .text(c.keys[0] + ": " +c.lastValue[c.keys[0]]);

        c.g.append("text")
            .attr("dx", c.width)
            .attr("dy", -10)
            .attr("text-anchor", "end")
            .attr("class", "label")
            .attr("fill", d => { return c.colour(c.keys[1]); })
            .text(c.keys[1] + ": " +c.lastValue[c.keys[1]]);
    }
    
}

function convertQuarter(q){
    let splitted = q.split('Q');
    let year = splitted[0];
    let quarterEndMonth = splitted[1] * 3 - 2;
    let date = d3.timeParse('%m %Y')(quarterEndMonth + ' ' + year);

    return date;
}

function formatQuarter(date){
    let newDate = new Date();
    newDate.setMonth(date.getMonth() + 1);
    let year = (date.getFullYear());
    let q = Math.ceil(( newDate.getMonth()) / 3 );
    return year + " Q"+ q;
}

function updateInfoText(selector, startText, endText, data, valueName, labelName, format, changeArrrow ){
    let green = "#20c997",
        red = "#da1e4d",
        lastData = data[data.length - 1],
        previousData = data[data.length - 2],
        text = d3.select("#data-text p"),
        textString = text.text(),
        currentValue = lastData[valueName],
        prevValue = previousData[valueName],
        difference = ((currentValue - prevValue) / currentValue),
        lastElementDate = lastData[labelName],
        cArrow = changeArrrow,
        indicatorSymbol = difference > 0 ? "▲ " : "▼ ",
        indicator = difference > 0 ? "Up" : "Down",
        indicatorColour = cArrow ? difference > 0 ?  red : green : difference > 0 ?  green : red,
        startString = startText,
        endString = endText;

        d3.select(selector)
        .on("mouseover", (d) => { 

            text.text(startString);
            text.append("span").text(lastElementDate).attr("class", "bold-text");

            text.append("text").text(" was ");
            
            text.append("span").text(format(currentValue))
            .attr("class", "bold-text");
            
            text.append("text").text(". That's ");

            text.append("span").text(indicatorSymbol).attr("class", "bold-text").style("color",indicatorColour);
            text.append("span").text(indicator + " " + d3.format(".2%")(difference)).attr("class", "bold-text");

            text.append("text").text(" " + endString);
        })
        .on("mouseout", (d) => { 
            text.text(textString);
        });

        d3.select(selector).on("blur", (d) => {
            text.text(textString);
        });
          
        d3.select(selector).on("focus", (d) => {
            text.text(startString);
            text.append("span").text(lastElementDate).attr("class", "bold-text");

            text.append("text").text(" was ");
            
            text.append("span").text(format(currentValue))
            .attr("class", "bold-text");
            
            text.append("text").text(". That's ");

            text.append("span").text(indicator + " " + d3.format(".2%")(difference)).attr("class", "bold-text").style("color",indicatorColour);

            text.append("text").text(" " + endString);
        });
}

class StackedAreaChart {

    // constructor function
    constructor (e,dV, k){

        // load in arguments from config object
        this.element = e;
        this.date = dV;
        this.keys = k;
        
        // create the chart
        this.init();
    }

    // initialise method to draw chart area
    init(){
        let c = this;
            // last = c.data.length -1;
            // c.lastValue = c.data[last];

            d3.select(c.element).select("svg").remove();

        let eNode = d3.select(c.element).node();
        let eWidth = eNode.getBoundingClientRect().width; 
        
            // margin
            c.m = [20, 10, 25, 10];
            
            c.width = eWidth - c.m[1] - c.m[3];
            c.height = 200 - c.m[0] - c.m[2];

        // add the svg to the target element
        const svg = d3.select(c.element)
            .append("svg")
            .attr("width", c.width + c.m[1] + c.m[3])
            .attr("height", c.height + c.m[0]);
       
        // add the g to the svg and transform by top and left margin
        c.g = svg.append("g")
            .attr("transform", "translate(" + c.m[3] + "," + "20" + ")");

        // default transition 
        c.t = () => { return d3.transition().duration(1000); };
        
        c.colourScheme = ["#d73027",
        "#f46d43",
        "#fdae61",
        "#fee090",
        "#ffffbf",
        "#e0f3f8",
        "#abd9e9",
        "#74add1",
        "#4575b4"].reverse();
        
        // default colourScheme
        // c.colourScheme =d3.schemeBlues[9].slice(4);
        
        // colour function
        c.colour = d3.scaleOrdinal(c.colourScheme);

        // bisector for tooltip
        c.bisectDate = d3.bisector(d => { return (d[c.date]); }).left;

        c.addAxis();
    }

    addAxis(){
        let c = this;

        // X title
        c.xLabel = c.g.append("text")
            .attr("class", "test")
            .attr("x", c.width/2)
            .attr("y", c.height + 50)
            .attr("text-anchor", "start")
            .text("c.test");

        // Y title
        c.yLabel = c.g.append("text")
            .attr("class", "test")
            .attr("x", - (c.height/2))
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("c.test");

    }

    // pass the data and the nest value
    getData(_data, yScaleFormat){
        let c = this;
            // c.yScaleFormat = c.formatValue(yScaleFormat) || null;            
            c.nestedData =_data;
            c.createScales();
    }

    createScales(){
        let c = this;

        // set scales
        c.x = d3.scaleTime().range([0, c.width]);
        c.y = d3.scaleLinear().range([c.height, 0]);

        // get the the combined max value for the y scale
        let maxDateVal = d3.max(c.nestedData, d => {
            let vals = d3.keys(d).map(key => { 
                return key === c.date || typeof d[key] === 'string' ? 0:d[key];
                // return key !== c.date ? d[key] : 0;
            });
            return d3.sum(vals);
        });

        // Update scales
        c.x.domain(d3.extent(c.nestedData, (d) => { return (d[c.date]); }));
        c.y.domain([0, maxDateVal]);
        
        c.arealine = d3.line()
            .defined(function(d) { return !isNaN(d[1]); })
            // .curve(c.area.curve())
            .x(d => { return c.x(d.data[c.date]); })
            .y(d => { return c.y( d[1]); });

        // d3 area function
         c.area = d3.area()
            .defined(function(d) { return !isNaN(d[1]); })
            .x(function(d) { return c.x(d.data[c.date]); })
            .y0(function(d) { return c.y(d[0]); })
            .y1(function(d) { return c.y( d[1]); });

         // d3 stack function
        c.stack = d3.stack().keys(c.keys);
        c.data = (c.stack(c.nestedData));

        c.update();
    }

    update(){
        let c = this;
            d3.select(c.element).select(".focus").remove();
            d3.select(c.element).select(".focus_overlay").remove();
            c.g.selectAll(".region")
                .transition(c.t())
                .style("opacity", 0)
                .remove(); // cheap fix for now

        // select all regions and join data with old
        c.regions = c.g.selectAll(".area")
            .data(c.data, d => { return d})
            .enter()
                .append("g")
                    .classed("region", true);

        c.regions
            .append("path")
            .attr("class", "area")
            .style("fill", (d) => {return c.colour(d.key);})
            .style("fill-opacity", 0.0)
            .transition(c.t())
            .attr("d", c.area)
            .style("fill-opacity", 0.75);
            
    
        c.regions
            .append("path")
            .attr("class", "area-line")
            .style("stroke", (d) => {return c.colour(d.key);})
            // .transition(c.t())
            .attr("d", c.arealine);
            

        // Update
        c.g.selectAll(".area")
            .data(c.data)
            .style("fill", (d) => {return c.colour(d.key);})
            // .transition(c.t())
            .attr("d", c.area)
            .style("fill-opacity", 0.75);
            
    
        c.g.selectAll(".area-line")
            .data(c.data)
            .transition(c.t())
            .attr("d", c.arealine);
    
    }
}

function nestData(data, label, name, value){
    let nested_data = d3.nest()
        .key(function(d) { return d[label]; })
        .entries(data); // its the string not the date obj

    let mqpdata = nested_data.map(function(d){
        let obj = {
            label: d.key
        }
            d.values.forEach(function(v){
            obj[v[name]] = v[value];
            obj.date = v.date;
        })
    return obj;
  })
return mqpdata;
}


class StackBarChart {

    constructor(_element, _data, _columns){

        this.element = _element;
        this.data = _data;
        this.columns = _columns;

        this.init();
    }

    init(){
        let dv = this,
            elementNode = d3.select(dv.element).node(),
            elementWidth = elementNode.getBoundingClientRect().width,
            aspectRatio = elementWidth < 800 ? elementWidth * 0.55 : elementWidth * 0.5;

            d3.select(dv.element).select("svg").remove();
            
        const breakPoint = 678;
        
        // margin
        dv.margin = { };

        dv.margin.top = elementWidth < breakPoint ? 10 : 50;
        dv.margin.bottom = elementWidth < breakPoint ? 30 : 60;

        dv.margin.right = elementWidth < breakPoint ? 150 : 150;
        dv.margin.left = elementWidth < breakPoint ? 20 : 80;
        
        dv.width = elementWidth - dv.margin.left - dv.margin.right;
        dv.height = 160 - dv.margin.top - dv.margin.bottom;
        
        // add the svg to the target element
        dv.svg = d3.select(dv.element)
            .append("svg")
            .attr("width", dv.width + dv.margin.left + dv.margin.right)
            .attr("height", dv.height + dv.margin.top + dv.margin.bottom);
       
        // add the g to the svg and transform by top and left margin
        dv.g = dv.svg.append("g")
            .attr("transform", "translate(" + dv.margin.left + 
                ", " + dv.margin.top + ")");

        // stack function
        dv.stack = d3.stack().keys(dv.columns);
        // dv.colourScheme = ["#aae0fa","#00929e","#da1e4d","#ffc20e","#16c1f3","#086fb8","#003d68"];
        
        // default colourScheme
        dv.colourScheme =d3.schemeBlues[9].slice(4);

        // set colour function
        dv.colour = d3.scaleOrdinal(dv.colourScheme);

        // set scales functions
        dv.x = d3.scaleBand()
            .range([0, dv.width])
            .padding(0.2);

        dv.y = d3.scaleLinear()
            .range([dv.height, 0]);

        dv.xAxisCall = d3.axisBottom();

        dv.xAxis = dv.g.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + dv.height +")");

        // X title
        dv.xLabel = dv.g.append("text")
            .attr("class", "titleX")
            .attr("x", dv.width/2)
            .attr("y", dv.height + 60)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text("test");

        // Y title
        dv.yLabel = dv.g.append("text")
            .attr("class", "titleY")
            .attr("x", - (dv.height/2))
            .attr("y", -50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("test");

            dv.addLegend();
            dv.update();
    }

    update(){
        let dv = this;

        dv.series = dv.stack(dv.data);

        // transition 
        const t = () => { return d3.transition().duration(1000); };

        const xAxisCall = d3.axisBottom();

        dv.x.domain(dv.data.map( d => {
            // console.log("x domain date list: ", d.date);
            return d.date;
        }));

        // have a check to see what domain values to use
        dv.y.domain([0, d3.max(
            dv.series, d => { return d3.max(d, d => { return d[1]; }); 
        })]).nice();

        xAxisCall.scale(dv.x);
        dv.xAxis.transition(t()).call(xAxisCall);

        dv.layers = dv.g.selectAll(".stack")
                .data(dv.series)
                .enter().append("g")
                .attr("class", "stack")
                .attr("fill", d => {
                    return dv.colour(d.key); 
                    });
            
        dv.layers.selectAll("rect")
            .data( d => { return d; })
            .enter().append("rect")
                .attr("x", d => { 
                    return dv.x(d.data.date); 
                })
                .attr("y", d => { 
                    return dv.y(d[1]); 
                })
                .attr("height", d => { return dv.y(d[0]) - dv.y(d[1]);})
                .attr("width", dv.x.bandwidth())
                .style("stroke-width", "1");
    }

    addLegend(){
        let dv =this;
        const lastV = dv.data[dv.data.length -1],
            vs = dv.data.filter(idFilter),
            s = vs.length -1;
            console.log(s);
        // create legend group
        let legend = dv.g.append("g")
        .attr("transform", "translate(0,0)");
        
        let legends = legend.selectAll(".legend")
        .data(dv.columns.reverse())
        .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => {
                return "translate(-1," + i * 30 + ")"; })
            .style("font", "12px sans-serif");
        
        legends.append("rect")
            .attr("class", "legendRect")
            .attr("x", dv.width + 18)
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", dv.colour);
        
        legends.append("text")
            .attr("class", "legendText")
            .attr("x", dv.width + 44)
            .attr("y", 9)
            .attr("dy", ".1rem")
            .attr("text-anchor", "start")
            .text(d => { return d + " = " + d3.format(".2s")(vs[s][d]); });
            // .call(dv.textWrap, 100, dv.width + 44);
    }
}

function idFilter(d) {
    return d["0-15"] !== 0 ? true : false; 
 }



