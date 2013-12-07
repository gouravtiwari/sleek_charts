// options: it is a map, which accepts below values
//
// selector:    selector to which bar chart will be added, default is 'body'
//              e.g. 'div#bar-chart'
// data:        data in JSON object, which contains label and value to create bar chart
//              e.g. [{'label': 'weather-day', 'value': 35.1}, {'label': 'weather-night', 'value': 30.2}]
// width:       width of svg element
// height:      height of svg element
// margin:      margin of svg element and accepts in a map
//              {top: 10, right: 20, bottom: 20, left:10}
// flexRight:   set it to false, when you are ok to display wider column, when there are <5-6 columns, default is true
// labelAngle:  default is 0
// xDomain:     x-axis domain, default is 'label'
// yDomain:     y-axis domain, default is 'value'
// yAxisText:   add additional text on y-axis default is ''
// tipLabel:    tipText which you want to display in tip, default is ''
// tipValue:    tipValue, for each bar, default is 'value'
// tipText:     tipText which you want to display with 'label' and 'value', default is ''

function mergeConfigOptions(defaults,options){
    var mergedConfig = {};
    for (var attrname in defaults) { mergedConfig[attrname] = defaults[attrname]; }
    for (var attrname in options)  { mergedConfig[attrname] = options[attrname]; }
    return mergedConfig;
}

function barTip(options){
    var defaults = {
        selector:   'body',
        data:       [{'label': 'weather-morning', 'value': 29.1}, {'label': 'weather-afternoon', 'value': 33.2},
                    {'label': 'weather-evening', 'value': 32.1}, {'label': 'weather-night', 'value': 30.2}],
        width:      600,
        height:     400,
        margin:     {top: 10, right: 20, bottom: 20, left:10},
        flexRight:  true,
        labelAngle: -30,
        xDomain:    'label',
        yDomain:    'value',
        yAxisText:  '',
        tipLabel:   '',
        tipValue:   'value',
        tipText:    ''
    };

    var config = (options) ? mergeConfigOptions(defaults,options) : defaults;

    var data  = config.data;

    // Just to make sure the chart doesn't look clutter, when there are < 5-6 columns
    if(config.flexRight){
        config.margin['right'] = d3.max([20, (config.width - data.length * 50)]);
    }
        
    var margin = config.margin,
        width = config.width - margin.left - margin.right,
        height = config.height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select(config.selector).append("svg")
        .attr("width", config.width)
        .attr("height", config.height)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        label = d[config.tipLabel] == undefined ? "" : " " + d[config.tipLabel];

        return "<strong>" + config.tipText + label + "</strong> <span style='color:red'>" + d[config.tipValue] + "</span>";
      });
    console.log(svg);
    svg.call(tip);

    x.domain(data.map(function(d) { return d[config.xDomain]; }));
    y.domain([0, d3.max(data, function(d) { return d[config.yDomain]; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate("+ config.labelAngle +")" ;
        });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -80)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text(config.yAxisText);

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d[config.xDomain]); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d[config.yDomain]); })
        .attr("height", function(d) { return height - y(d[config.yDomain]); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}
