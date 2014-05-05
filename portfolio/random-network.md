---
layout: main
title: Panama
---

<link href="{{site.baseurl}}/bower_components/panama-network/css/index.css" rel="stylesheet">
<script src="{{site.baseurl}}/bower_components/d3/d3.min.js"></script>
<script src="{{site.baseurl}}/bower_components/panama-network/src/pty.js"></script>
<!-- <link href="{{ site.baseurl }}/css/font-awesome.min.css" rel="stylesheet"> -->

<div class="row">
    <div class="col-md-12">
        <div id="demo"></div>
    </div>
</div>

<script>
d3.json('{{ site.baseurl }}/portfolio/data/random-network.json', function(error, data) {

    if (error) { return error; }

    var width = parseInt(d3.select('#demo').style('width'), 10),
        height = 1000;

    var chart01 = pty.chart.network()
        .width(width)
        .height(height)
        .linkDistance(10)
        .linkStrength(0.05)
        .charge(-5e2)
        .zoomExtent([0.1,20])
        .friction(0.4)
        .nodeRadius(8)
        .nodeClass(function(d) { return d.type; })
        .nodeLabel(function(d) { return d.name; });


    d3.select('div#demo').data([data]).call(chart01);
});
</script>