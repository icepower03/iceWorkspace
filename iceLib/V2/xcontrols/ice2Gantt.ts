// @ts-nocheck
/**
 * @author Dimitry Kudrayvtsev
 * @version 2.0
 *
 * Ported to d3 v4 by Keyvan Fatehi on October 16th, 2016
 */


//import * as d3 from '../d.ts/d3/d3';
module mGantt {

    export interface iMargin {
        top: number;
        left: number;
        bottom: number;
        right: number;
    }

    export interface optionsGantt<T, J> {
        tasksTypes: string[],
      
        tickFormat: string,
        timeDomain: [Date, Date],
        gradient: boolean,
        horizontal: boolean,
        size: {
            height: number,
            width:number
        },
        margin : {
            top: number,
            right: number,
            bottom: number,
            left: number
        },
        taskMap: {
            Key: (t: T) => string;
            startDate: (t: T) => Date;
            endDate: (t: T) => Date;
            taskName: (t: T) => string;
            description: (t: T) => string;
            title: (t: T) => string;
            click?: (t: T) => ((a: SVGElement) => void);
            hover?: (t: T) => ((a: SVGElement) => void);
            pourcentage1: (t: T) => number;
            pourcentage2: (t: T) => number;
            render: (j: T, a: svgTaskWrapper) => void;
        },
        jalonMap: {
            Key: (t: J) => string;
            dateSouhaitee: (j: J) => Date;
            textVariable: (j: J) => string;
            click?: (j: J) => ((a: SVGElement) => void);
            hover?: (j: J) => ((a: SVGElement) => void);
            render: (j: J, a: svgJalonWrapper) => void;

        }

    }


   export class svgElementWrapper {
        private myElement: SVGElement;

        public constructor(s: SVGElement) {
            this.myElement = s;
        }

        public toggleClass(classe: string, actif: boolean) {
            d3.select(this.myElement).classed(classe, actif);
       }

       public cancelFill() {

           d3.select(this.myElement).attr('fill', null);
       }

    }

    export class svgTaskWrapper extends svgElementWrapper {
      public constructor(s: SVGElement) {
            super(s);
        }

       
    }

    export class svgJalonWrapper extends svgElementWrapper {
        public constructor(s: SVGElement) {
            super(s);
        }
    }

    //T pour tache, J pour jalon
    export class ice2Gantt<T, J> {

        private svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
        private x: d3.ScaleTime<number, number>;//(e:any)=>number;
        private y: d3.ScaleBand<string>;
        private xAxis: d3.Axis<{}>;
        private yAxis: d3.Axis<{}>;
        private heightPlanifiable: number;
        private heightCellule: number;
        private dictionnaireElements: Dictionnaire<SVGElement> = {};
        private dictionnaireJalons: Dictionnaire<SVGElement> = {};
       

        public classed(str: string, b: boolean)
        {
            if (this.svg != undefined) {
               this.svg.classed(str, b);
            }
        }
   
        public get margin(): iMargin {
            return this.myOpt.margin;
        }

        public getElementFromKey(tache: T): SVGElement {
            let myThis: ice2Gantt<T, J> = this;
            return this.dictionnaireElements[myThis.myOpt.taskMap.Key(tache)];
        }
        public getJalonFromKey(j: J): SVGElement {
            let myThis: ice2Gantt<T, J> = this;
            return this.dictionnaireJalons[myThis.myOpt.jalonMap.Key(j)];
        }

        private _width: number;

        public set width(value) {
            this._width = +value;
        }

        public get width() {
            return this._width;
        }


        private _height: number;

        public get height() {
            return this._height;
        };

        public set height(value) {
            this._height = +value;
        };

        private _tickFormat: string;


        public get tickFormat() {
            return this._tickFormat;
        }

        public set tickFormat(value) {
            this._tickFormat = value;
        };




        private tasks: T[] = [];

        public addtasks(planifs: T[]) {
            if (this.tasks == undefined) { this.tasks = []; }

            this.tasks = this.tasks.concat(planifs);
        }


        public initAxis() {
            let myThis: ice2Gantt<T, J> = this;
            myThis.x = d3.scaleTime().domain(myThis.myOpt.timeDomain).range([0, myThis.width]).clamp(true);
            myThis.y = d3.scaleBand().domain(myThis.myOpt.tasksTypes).rangeRound([0, myThis.height - myThis.margin.top - myThis.margin.bottom]);

            //myThis.xAxis = d3.axisBottom(undefined).scale(myThis.x).tickFormat(d3.timeFormat(myThis.myOpt.tickFormat)).ticks(d3.timeMonth.every(1)).tickSize(8).tickPadding(8);
            myThis.xAxis = d3.axisBottom(undefined).scale(myThis.x).tickFormat(d3.timeFormat(myThis.myOpt.tickFormat)).tickSize(8).tickPadding(8);

            myThis.yAxis = d3.axisLeft(undefined).scale(myThis.y).tickSize(1);
        };


        public flip():ice2Gantt<T,J> {
            let myThis: ice2Gantt<T, J> = this;
            myThis.svg.attr("transform", "rotate(270 " + myThis.width/2 + " "+myThis.height/2+")");
            return myThis;
        }
        private myOpt: optionsGantt<T, J>;
        public constructor(opt: optionsGantt<T, J>) {
            let myThis: ice2Gantt<T, J> = this;
            myThis.myOpt = opt;

            let heighttemp = myThis.myOpt.size.height;
            let widthtemp = myThis.myOpt.size.width;



            myThis.height = heighttemp - myThis.margin.top - myThis.margin.bottom;
            myThis.width = widthtemp - myThis.margin.right - myThis.margin.left;

            myThis.heightCellule = (myThis.height / myThis.myOpt.tasksTypes.length);
            myThis.heightPlanifiable = myThis.heightCellule / 2;

            myThis.initAxis();

        };

        public draw(inTaches: T[], inJalons: J[], selecteur: string | HTMLElement): ice2Gantt<T, J> {
            let myThis: ice2Gantt<T, J> = this;
            myThis.addtasks(inTaches);


            let versiongradient: boolean = myThis.myOpt.gradient;
            let horizontal: boolean = myThis.myOpt.horizontal;
            myThis.svg = d3.select(<string>selecteur)
                .append("svg")
                .attr("class", "chart ice2Gantt")
                .attr("width", myThis.width + myThis.margin.left + myThis.margin.right)
                .attr("height", myThis.height + myThis.margin.top + myThis.margin.bottom)

                .append("g")
                .attr("class", "gantt-chart")
                .attr("width", myThis.width + myThis.margin.left + myThis.margin.right)
                .attr("height", myThis.height + myThis.margin.top + myThis.margin.bottom)
                .attr("transform", "translate(" + myThis.margin.left + ", " + myThis.margin.top + ")");

            let defs = myThis.svg.append('defs');

            myThis.tasks.forEach(function (p: T) {
                let key: string = myThis.myOpt.taskMap.Key(p);
                let gradient = defs.append('linearGradient')
                    .attr('id', 'mainGradient' + key)
                    .attr('x1', '0%')
                    .attr('x2', horizontal ? '100%' : '0%')
                    .attr('y1', '0%')
                    .attr('y2', horizontal ? '0%' : '100%');



                if (versiongradient) {
                    gradient.append('stop')
                        .attr('class', 'stop-1')
                        .attr('offset', myThis.myOpt.taskMap.pourcentage1(p).toString() + '%');

                    gradient.append('stop')
                        .attr('class', 'stop-2')
                        .attr('offset', myThis.myOpt.taskMap.pourcentage2(p).toString() + '%');

                    gradient.append('stop')
                        .attr('class', 'stop-3');
//                        .attr('offset', '100%');
                }
                else {
                    gradient.append('stop')
                        .attr('class', 'stop-1')
                        .attr('offset', '0%');
                    gradient.append('stop')
                        .attr('class', 'stop-1')
                        .attr('offset', myThis.myOpt.taskMap.pourcentage1(p).toString() + '%');
                    gradient.append('stop')
                        .attr('class', 'stop-2')
                        .attr('offset', myThis.myOpt.taskMap.pourcentage1(p).toString() + '%');
                    gradient.append('stop')
                        .attr('class', 'stop-2')
                        .attr('offset', myThis.myOpt.taskMap.pourcentage2(p).toString() + '%');
                    gradient.append('stop')
                        .attr('class', 'stop-3')
                        .attr('offset', myThis.myOpt.taskMap.pourcentage2(p).toString() + '%');

                    gradient.append('stop')
                        .attr('class', 'stop-3');
                    //    .attr('offset', + '100%');
                }


            }
            );

            myThis.svg.selectAll(".chart")
                .data(myThis.tasks, myThis.myOpt.taskMap.Key).enter()
                .append("rect")
                .classed("tache",true)
                
                .on("click", function (d: T) {
                    if (d != undefined) {
                        if (myThis.myOpt.taskMap.click != undefined) {
                            myThis.myOpt.taskMap.click(d)(<SVGElement>this);
                        }

                    }
                })
                .on('mouseover', function (d) {
                    if (myThis.myOpt.taskMap.hover != undefined) {
                        myThis.myOpt.taskMap.hover(d)(<SVGElement>this);
                    }
                })
                .attr("rx", 5)
                .attr("ry", 5)
                .attr('fill', function (d: T) { return 'url(#mainGradient' + myThis.myOpt.taskMap.Key(d) + ')'; })
                .each(function (a: T) {
                    if (a != undefined) {
                        myThis.dictionnaireElements[myThis.myOpt.taskMap.Key(a)] = <SVGElement>this;
                        myThis.myOpt.taskMap.render(a, new svgTaskWrapper(<SVGElement>this));
                    }
                })
                .attr("y", 0)
                .attr("transform", function (d: T) {
                    let y: number = myThis.y(myThis.myOpt.taskMap.taskName(d));
                    return "translate(" + myThis.x(myThis.myOpt.taskMap.startDate(d)) + "," + y + ")";
                })
                .attr("height", function (d: T) { return myThis.heightPlanifiable; })
                .attr("width", function (d: T) {
                    return (myThis.x(myThis.myOpt.taskMap.endDate(d)) - myThis.x(myThis.myOpt.taskMap.startDate(d)));
                })
                .append("title").text(function (d: T) { return myThis.myOpt.taskMap.title(d); });

            myThis.svg.selectAll(".chart")
                .data(myThis.tasks, myThis.myOpt.taskMap.Key).enter()
                .append('text').text(function (d: T) { return myThis.myOpt.taskMap.taskName(d) + "( " + myThis.myOpt.taskMap.description(d) + ")"; })
                .attr('x', 0)
                .attr('y', 5)
                .attr('fill', 'black')
                .attr("transform", function (d: T) {
                    let width = (myThis.x(myThis.myOpt.taskMap.endDate(d)) - myThis.x(myThis.myOpt.taskMap.startDate(d))) / 2;
                    let x = myThis.x(myThis.myOpt.taskMap.startDate(d)) + width;
                    let height = myThis.heightPlanifiable / 2;
                    let y = myThis.y(myThis.myOpt.taskMap.taskName(d)) + height;
                    return "translate(" + x + "," + y + ")";
                })

            myThis.svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0, " + (myThis.height - myThis.margin.top - myThis.margin.bottom) + ")")
                .transition()
                .call(myThis.xAxis);

            myThis.svg.append("g").attr("class", "y axis").transition().call(myThis.yAxis);

            inJalons.forEach(function (j: J) {
                myThis.drawJalon(j);
            });

            myThis.drawMaintenant();

            return myThis;

        }

        public drawMaintenant() {
            let myThis: ice2Gantt<T, J> = this;

            let dtSouhaitee: Date = new Date();
            let xDateSouhaitee: number = myThis.x(dtSouhaitee);

                myThis.svg.append("line")
                    .attr("x1", xDateSouhaitee)
                    .attr("y1", 0)
                    .attr("x2", xDateSouhaitee)
                    .attr("y2", myThis.height - myThis.margin.top - myThis.margin.bottom)
                    .classed('maintenant', true);
            return myThis;
        }

        public drawJalon(j: J): ice2Gantt<T, J> {

            let myThis: ice2Gantt<T, J> = this;
        
            let dtSouhaitee: Date = myThis.myOpt.jalonMap.dateSouhaitee(j);
            let xDateSouhaitee: number = myThis.x(dtSouhaitee);

            if (dtSouhaitee >= myThis.myOpt.timeDomain[0] && dtSouhaitee <= myThis.myOpt.timeDomain[1]) {
                let g: d3.Selection<d3.BaseType, {}, HTMLElement, any> = myThis.svg.append("g");

               g.each(function () {
                    myThis.myOpt.jalonMap.render(j, new svgJalonWrapper(<SVGElement>this));
                    myThis.dictionnaireJalons[myThis.myOpt.jalonMap.Key(j)] = <SVGElement>this;

                });

                g.classed('jalon', true)
                    .append("line")
                    .on('click', function () {
                        if (myThis.myOpt.jalonMap.click != undefined) {
                            myThis.myOpt.jalonMap.click(j)(<SVGElement>this);
                        }
                    })
                    .on('mouseover', function () {
                        if (myThis.myOpt.jalonMap.hover != undefined) {
                            myThis.myOpt.jalonMap.hover(j)(<SVGElement>this);
                        }
                    })
                    .attr("x1", xDateSouhaitee)
                    .attr("y1", 0)
                    .attr("x2", xDateSouhaitee)
                    .attr("y2", myThis.height - myThis.margin.top - myThis.margin.bottom)
                    .append("title")
                    .text(myThis.myOpt.jalonMap.textVariable(j));

                    g.append("text")
                    .attr("class", "textJalon")
                    .attr("x", xDateSouhaitee)
                    .attr("y", 0)
                    .text(myThis.myOpt.jalonMap.textVariable(j))
                    .attr("transform", function (d) { return "rotate(90 " + xDateSouhaitee.toString() + " 0) "; });

            }
            return myThis;
        }

    



    }


}
