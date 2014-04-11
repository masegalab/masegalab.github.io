---
layout: main
title: Map
---

<div>
    <style type="text/css">
        .graticule {
            fill: none;
            stroke: black;
        }

        .land {
            /*fill: #222;*/
        }

        .background {
            fill: #111;
        }

        .globe-blur {
            fill: #327CCB;
        }

        #satellite-map {
            width: 100%;
        }
    </style>
</div>

<div>
    <div id="satellite-map">
        <svg>
            <filter id="blurMe">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
            <defs>
                <radialGradient id="Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.2" fy="0.2">
                    <stop offset="0%" stop-color="#0B108C"/>
                    <stop offset="100%" stop-color="#07093D"/>
                </radialGradient>
                <radialGradient id="landGradient" cx="0.5" cy="0.5" r="0.5" fx="0.2" fy="0.2">
                    <stop offset="0%" stop-color="#6B5344"/>
                    <stop offset="100%" stop-color="#534640"/>
                </radialGradient>
            </defs>
        </svg>
    </div>
</div>

<script src='{{site.baseurl}}/bower_components/d3/d3.min.js' charset='utf-8'></script>
<script src='{{site.baseurl}}/bower_components/d3-geo-projection/d3.geo.projection.min.js' charset='utf-8'></script>
<script src='{{site.baseurl}}/bower_components/topojson/topojson.js' charset='utf-8'></script>

<script>

    // Create the canvas element in the selected div
    var div = d3.select('#satellite-map'),
        width = parseInt(div.style('width'), 10),
        height = parseInt(div.style('height'), 10);

    var svg = div.selectAll('svg').data([0])
            .attr('width', width)
            .attr('height', height);

    var earthquakeData;

    var grpMap = svg.append('g'),
        grpEarthquakes = svg.append('g');

    grpMap.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'background');

    var projection = d3.geo.orthographic()
        .rotate([70, 75])
        .translate([width / 2, 1.6 * height])
        .scale(0.75 * width)
        .clipAngle(90);

    var graticule = d3.geo.graticule();

    var path = d3.geo.path()
        .projection(projection);

    var globeBlur = grpMap.append('path').datum({type: 'Sphere'})
        .attr('class', 'globe-blur')
        .attr('d', path)
        .attr('filter', 'url(#blurMe)');

    var globe = grpMap.append('path').datum({type: 'Sphere'})
        .attr('class', 'globe')
        .attr('d', path)
        .attr('fill', 'url(#Gradient)');

    d3.json('{{site.baseurl}}/portfolio/data/land.json', function(error, data) {

        if (error) { return error; }

        var geodata = topojson.feature(data, data.objects.ne_10m_land);

        var land = grpMap.append('path').datum(geodata)
            .attr('class', 'land')
            .attr('d', path)
            .attr('fill', 'url(#landGradient)');
    });
</script>

<script>
    d3.json('{{site.baseurl}}/portfolio/data/earthquakes.json', function(error, data) {

        if (error) { return error; }

        earthquakeData = data.features;

        earthquakeData.sort(function(a, b) {
            return b.properties.time < a.properties.time;
        });

        var tScale = d3.scale.linear()
            .domain(d3.extent(earthquakeData, function(d) { return d.properties.time; }))
            .range([0, 30e3]);

        earthquakeData.forEach(function(d) {
            d.properties.dtime = tScale(d.properties.time);
        });

        console.log('ready');
    });

    function start() {

        var circles = grpEarthquakes.selectAll('path.eq')
            .data(earthquakeData);

        var circleGen = d3.geo.circle()
            .angle(0.01)
            .origin(function(d) { return d.geometry.coordinates; });

        circles.enter().append('path')
            .attr('class', 'eq')
            .attr('d', function(d) { return path(circleGen(d)); });

        circles
            .attr('fill', 'red')
            .attr('fill-opacity', 0.8)
            .attr('d', function(d) {
                circleGen.angle(0.001);
                return path(circleGen(d));
            });

        var magnitude = function(d) { return Math.pow(10, d.properties.mag); }

        var durationScale = d3.scale.linear()
            .domain(d3.extent(earthquakeData, magnitude))
            .range([1e3, 4e3]);

        var magAngle = d3.scale.linear()
            .domain(d3.extent(earthquakeData, magnitude))
            .range([2, 8]);

        circles.transition()
            .delay(function(d) { return d.properties.dtime; })
            .duration(function(d) { return durationScale(magnitude(d)); })
            .attr('d', function(d) {
                circleGen.angle(magAngle(magnitude(d)));
                return path(circleGen(d));
            })
            .attr('fill-opacity', 0.0);
    }

</script>
