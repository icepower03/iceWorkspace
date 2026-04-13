// @ts-nocheck
module mChart
{
    export interface OptionsChartBar {
       
        title: string;
        desc: string;
        divContenant: iXElementHolder;
        data: DataChart[];
        id: string;
        width: number;
        height: number;
        click: (id: number) => void;
        withAffichageNbDansLesBar?:boolean
    }

    export interface OptionsChart {
        title: string,
        desc: string,
        divContenant: iXElement;
        data: DataChart[]
    }
    declare class d3pie
    {
        constructor(inVal: HTMLElement, obj: any);
    }

    export class DataChart
    {
        value: number;
        label: string;
        color: string;
        id: number;
        title: string;

        public constructor(pvalue: number, plabel: string, pcolor: string, pid:number, ptitle:string=null)
        {
            this.value = pvalue;
            this.label = plabel;
            this.color = pcolor;
            this.id = pid;
            this.title = ptitle;
        }
    }
     
    export class xxChart 
    {
        public constructor(options:OptionsChart)
        {
            this.init(options);
        }

        private async init(options: OptionsChart)
        {
            await xOutils.inclureLibrairie(EnumLibrairieJs.d3js);

            let obj = {
                header: {
                    title: {
                        text: options.title,
                        fontSize: 24,
                        font: "open sans"
                    },
                    subtitle: {
                        text: options.desc,
                        color: "#999999",
                        fontSize: 12,
                        font: "open sans"
                    },
                    titleSubtitlePadding: 9
                },
                "footer": {
                    "color": "#999999",
                    "fontSize": 10,
                    "font": "open sans",
                    "location": "bottom-left"
                },
                "size": {
                    "canvasWidth": 590,
                    "pieOuterRadius": "90%"
                },
                "data": {
                    "sortOrder": "value-desc",
                    "content": options.data
                },
                "labels": {
                    "outer": {
                        "pieDistance": 32
                    },
                    "inner": {
                        "hideWhenLessThanPercentage": 3
                    },
                    "mainLabel": {
                        "fontSize": 11
                    },
                    "percentage": {
                        "color": "#ffffff",
                        "decimalPlaces": 0
                    },
                    "value": {
                        "color": "#adadad",
                        "fontSize": 11
                    },
                    "lines": {
                        "enabled": true
                    },
                    "truncation": {
                        "enabled": true
                    }
                },
                effects: {
                    pullOutSegmentOnClick: {
                        effect: "linear",
                        speed: 400,
                        size: 8
                    }
                },
                misc: {
                    gradient: {
                        enabled: true,
                        percentage: 100
                    }
                }
            }

            var pie = new d3pie(<HTMLElement>options.divContenant.y, obj);
        }
    }


    export class xxBarChart
    {
        public constructor(options: OptionsChartBar)
        {
            let axSvg = new xSVG({ widthCustom: options.width, heightCustom: options.height, id: options.id, size: tailleIcone.Custom });         
            
            options.divContenant.append(xElementHolder.fromSVGElement(axSvg.y));
                //"<svg width='400' height='300' id='svg_chart_bar'></svg>");
            //options.divContenant.x.find("#" + options.id)



            

            let svg = d3.select(axSvg.y);// d3.select("#"+options.id),

            let    margin = { top: 40, right: 20, bottom: 30, left: 40 },
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom;

            svg.append("text")
                .attr("x", (options.width / 2))
                .attr("y", (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "24px")
                .text(new xLString(options.title).text);

            let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                y = d3.scaleLinear().rangeRound([height, 0]);

            let g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.domain(options.data.map(function (d) { return d.label; }));
            y.domain([0, d3.max(options.data, function (d) { return d.value; })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

            let test = g.selectAll(".bar")
                .data(options.data)
                .enter().append("rect");

            test.attr("class", "bar")
                .attr("x", function (d) { return x(d.label); })
                .attr("y", function (d) { return y(d.value); })
                .attr("width", x.bandwidth())
                .attr("height", function (d)
                {
                    return height - y(d.value);
                })
                .attr("class", function (d, i) { return "bar" + d.color })
                .style("fill", function (d, i)
                {
                    return d.color
                })
                //.attr("height", function (d: any) { return y(d.y0) - y(d.y0 + d.y); })
                .append("title").text(function (d) { return d.title != null ? d.title : d.value.toString() });

            if (options.withAffichageNbDansLesBar)
            {
                g.selectAll(".bar")
                    .data(options.data)
                    .enter().append("text")
                    .attr("x", function (d) { return x(d.label) + (x.bandwidth() / 2); })
                    .attr("y", function (d) { return y(d.value) + 10; })
                    .attr("dy", ".35em")
                    .text(function (d) { return d.title != null ? d.title : d.value.toString(); });
            }

            if (options.click != null)
            {
                test.attr("cursor", "pointer");
                test.on("click", function (e) { options.click(e.id); });
            }

        }
    }

}

export { mChart };
