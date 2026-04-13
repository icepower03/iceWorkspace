// @ts-nocheck
module mChart
{
    //Options de courbes classiques
    export interface OptionsCourbe<T>
    {
        titleLocalise: string;//Titre du graphique
        divContenant: iXElementHolder;//Div contenant le graphique
        data: ObservableCollection<T>[]; // Listes des séries de données
        yName: string;//Nom de l'axe y
        yMaxMinValueDefaut?: number; //
        unit: string;//unité de l'axe y à afficher
        xName?: string;//Nom de l'axe x
        id: string;// id du graphique
        width: number;// largeur du graphique
        height: number;//hauteur du graphique
        hover: (e: T, point?: [number,number]) => void;
        dataY: (data: T) => number; //Fonction de transformation du type T en valeur
        dataX: (data: T) => DateSerialisable;//Fonction de transformation du type T en date
        seriesName: string[];//Nom des séries ( en mode multiligne)
        //color: string,// Couleur des lignes
        courbe: enumStyleCourbe;// Style de la courbe ( points ou courbe d'approximation)
        affichageDate: (d: DateSerialisable) => string; //Format d'affichage des dates sur l'axe 
        echelle?: OptionsEchelle;
        legend: boolean;
        afficherCumul?: boolean;
        cumuler?: (a: T, b: T) => T;
        ligneSupplementaire?: number[];
        seriesCouleur: string[];
        notWithLegendeInChart?: boolean;
        class?: string;
    }

    interface OptionsEchelle
    {
        debut: DateSerialisable,
        fin: DateSerialisable

    }

    //Style de la courbe
    export enum enumStyleCourbe
    {
        points,
        courbeApprox
    }

    //Valeurs et nom d'une série 
    export class DataCourbe
    {
        name: string;
        values:  number[];

        public constructor(pname: string,pvalue: number[] )
        {
            this.name = pname;
            this.values = pvalue;
        }

     
    }  


    //Tableau de toutes les séries de données et toutes les dates réunies
    export class AllDataCourbe
    {
        series: DataCourbe[];
        dates: DateSerialisable[];

        public constructor(pseries: DataCourbe[], pdates: DateSerialisable[])
        {
            this.series = pseries;
            this.dates = pdates;
        }

     
    }

    //Tableau de tous les points pour voronoi
    export class VoronoiPointCustom
    {
        point: [number,number];
        key: string;

        public constructor(key: string, point:[number, number])
        {
            this.key = key;
            this.point = point;
        }


    }

    //Doonées voronoi pour une série
    export class VoronoiSerieCustom
    {
        area: number;
        cell: [number, number];
        polygon:[number, number];
        centroid: [number, number]

        public constructor(area: number,  cell: [number, number],polygon: [number, number],centroid: [number, number])
        {
            this.area = area;
            this.cell = cell;
            this.centroid = centroid;
            this.polygon = polygon;
        }


    }

    export class ice2Courbe<T> implements iXElement 
    {

        private series: DataCourbe[] = [];// Tableau des séries 

        private datas: AllDataCourbe;// Tableau de s séries et des dates

        private allDates: DateSerialisable[] = [];//Tableau des dates

        private pointsVoronoi: VoronoiPointCustom[] = [];

        private serieVoronoi: Dictionnaire<VoronoiSerieCustom> = {};

        private pointsAllSeries: [number, number][][] = [];//Tableau des points des séries

        private axSvg: iceSVG;

        private withLegendeInChart: boolean;
      

      
        public get y() {
            return this.axSvg.y;
        }

        private getEmplacementLegend(pointVoronoiSerie : VoronoiSerieCustom)
        {
            let margin = {
                left: 25,
                bottom: 25,
                right:25,
                top: 0
            };
            let orient = ({
                top: { name: "top", dy: "-1em", anchor:"inherit", y: margin.top },
                right: { name: "right", dy: "0em", anchor: "start", y: margin.right },
                bottom: { name: "bottom", dy: "0em", anchor: "inherit", y: margin.bottom },
                left: { name: "left", dy: "0em", anchor: "end", y: margin.left }
            });
            const angle = (Math.round(Math.atan2(pointVoronoiSerie.centroid[1] - pointVoronoiSerie.cell[1], pointVoronoiSerie.centroid[0] - pointVoronoiSerie.cell[0]) / Math.PI * 2) + 4) % 4;
            return angle === 0 ?  orient.right
                : angle === 3 ? orient.top
                    : angle === 1 ? orient.bottom
                        : orient.left;
        }

        private getVoronoiSerie(width: number, height: number, svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>, colorscale: string[])
        {
            let myThis: ice2Courbe<T> = this;

            //Fonction de voronoi pour repérer les polygons
            let voronoi = d3.voronoi()
                .x(function (d) { return d[0]; })
                .y(function (d) { return d[1]; })
                .extent([[0, 0], [width, height]]);
            let voronoiSerie = voronoi(myThis.pointsVoronoi.map(e => e.point));
            let polygons = voronoiSerie.polygons();
            let cells = voronoiSerie.cells;

            
            polygons.forEach((polygon, index) =>
            {
                let area = d3.polygonArea(polygon);
                if (area > myThis.serieVoronoi[myThis.pointsVoronoi[index].key].area)
                {
                    myThis.serieVoronoi[myThis.pointsVoronoi[index].key] = {
                        area : area,
                        cell : cells[index].site.data,
                        polygon : polygon.data,
                        centroid : d3.polygonCentroid(polygon)
                    };
                }
            });

            if (myThis.withLegendeInChart)
            {
                //Construction de la légende
                myThis.series.forEach((s, i) =>
                {
                    let orientLegend = myThis.getEmplacementLegend(myThis.serieVoronoi[s.name]);
                    console.log(s.name, orientLegend)
                    svg.append("text")
                        .attr("x", myThis.serieVoronoi[s.name].cell[0])
                        .attr("y", myThis.serieVoronoi[s.name].cell[1] + orientLegend.y)
                        .attr("dy", orientLegend.dy)
                        .attr("text-anchor", orientLegend.anchor)
                        .style("fill", colorscale[i])
                        .text(s.name);
                    //.attr("x", orientLegend.x)
                    //.attr("y", orientLegend.y);
                }

                );
            }
           
        }

        public constructor(options: OptionsCourbe<T>)
        {
                      
            let myThis: ice2Courbe<T> = this;
            let margin = {
                        left: 20,
                        bottom: 40,
                        right: 60,
                        top: 40
                    };
            //Constriction du svg de base du graphique
            myThis.axSvg = new iceSVG({ widthCustom: options.width, heightCustom: options.height, id: options.id, size: tailleIcone.Custom , class:options.class});
            

            options.divContenant.y.append(myThis.axSvg.y);

            myThis.withLegendeInChart = true;
            if (options.notWithLegendeInChart)
                myThis.withLegendeInChart = false;

            //Sélection du svg créé
            let svg = d3.select(myThis.axSvg.y);// d3.select("#" + options.id);
         

            //Ajout du titre 
            options.titleLocalise != "" &&
                svg.append("text")
                    .attr("x", (options.width / 2))
                    .attr("y", (margin.top/2))
                    .attr("text-anchor", "middle")
                    .style("font-size", "24px")
                    .text(new iceLString(options.titleLocalise).text);


            let cumulDatas : T[] = []

            //Transformations des données en série

            //Pour chaque série
            options.data.forEach((l,i) =>
            {
                let valuesSerie: number[] = [];
                //Pour chaque élément d'une série
                l.forEach((e) =>
                {
                   

                    let date = options.dataX(e);
                    let value = options.dataY(e);                   

                    //Ajout des series selon les dates de l'échelle
                    if (options.echelle != null)
                    {
                        if (DateSerialisable.DateDiffValue(date, options.echelle.debut) >= 0
                            && DateSerialisable.DateDiffValue(date, options.echelle.fin) <= 0)
                        { 
                            //Ajout de la valeur dans le tableau de valeur de la série
                            valuesSerie.push(value);
                            if (myThis.allDates.filter(e => e.MaDateLong == date.MaDateLong).length == 0)
                                myThis.allDates.push(DateSerialisable.CopyDateSerialisable(date));
                        }
                        if (options.afficherCumul)
                        {
                            let cumul = cumulDatas.filter(i => options.dataX(e).MaDateLong == options.dataX(i).MaDateLong);
                            if (cumul.length == 0)
                            {
                                cumulDatas.push(e);
                            }
                            else
                            {
                                cumulDatas[cumulDatas.indexOf(cumul[0])] = options.cumuler(cumul[0], e);
                            }
                        }
                    }
                    else
                    {
                         //Ajout de la valeur dans le tableau de valeur de la série
                        valuesSerie.push(value);
                        if (options.afficherCumul)
                        {
                            let cumul = cumulDatas.filter(i => options.dataX(e).MaDateLong == options.dataX(i).MaDateLong);
                            if (cumul.length == 0)
                            {
                                cumulDatas.push(e);
                            }
                            else
                            {
                                cumulDatas[cumulDatas.indexOf(cumul[0])] = options.cumuler(cumul[0], e);

                            }
                        }
                        //Ajout de la date dans le tableau de l'ensemble des dates
                        if (myThis.allDates.filter(e => e.MaDateLong == date.MaDateLong).length == 0)
                            myThis.allDates.push(DateSerialisable.CopyDateSerialisable(date));
                    } 
                });
                //Ajout de la séries dans le tableau complet des séries
                myThis.series.push(new DataCourbe(options.seriesName[i], valuesSerie));
            });

            console.log("cumul", cumulDatas);
            if (options.afficherCumul)            
                myThis.series.push(new DataCourbe("Cumul", cumulDatas.map(e => options.dataY(e))));

            myThis.datas = new AllDataCourbe(myThis.series, myThis.allDates);

            let g  = svg.append('g')
                .attr("transform", "translate(" + margin.left + ", 0)")
                .attr("height", (options.height)+ "px")
                .attr("width", (options.width) +"px");
            //Adaptation de l'échelle si l'échelle est forcée           

            let domainX = options.echelle != null ? d3.extent([DateSerialisable.getDate(options.echelle.debut), DateSerialisable.getDate(options.echelle.fin)]) : d3.extent(myThis.datas.dates.map(c => DateSerialisable.getDate(c)));
            //Echelle de l'axe des abscisses
            let xScale = d3.scaleTime()
                .domain(domainX)
                .range([margin.left, options.width - margin.right])              
                ;

            let yMaxValue: number = d3.max(myThis.datas.series, d => d3.max(d.values)) + 3;
            if (options.yMaxMinValueDefaut == undefined) {
                options.yMaxMinValueDefaut = 10;
            }

            if (yMaxValue < options.yMaxMinValueDefaut)
            {
                yMaxValue = options.yMaxMinValueDefaut;
            }

            //Echelle de l'axe des ordonnées
            let yScale = d3.scaleLinear()
                .domain([yMaxValue, 0])//d3.min(myThis.datas.series, d => d3.min(d.values))
                .range([margin.top, options.height - margin.bottom - margin.top]);


            
          
           

            //Affichage de l'axe des abscisses
            let xAxis = g.append("g")
                .attr("transform", `translate(0,${options.height - margin.top})`)
                .call(d3.axisBottom(xScale).ticks(myThis.allDates.length).tickFormat((d: Date) => options.affichageDate(DateSerialisable.Factory(d))));
                

            //Affichage de l'axe des ordonnéees
            let yAxis = g.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale))
                .call(g => g.select(".domain").remove())
                //.call(g => g.select(".tick:first-of-type text")
                //    .attr("x", 3)
                //    .attr("text-anchor", "start")
                //    .attr("font-weight", "bold")
                //    .text(options.yName)// + " (" + options.unit + ")")
            //);

            //x
            svg.append("text")
                .attr("transform", "translate(" + (options.width - margin.right) + " ," + (options.height - margin.top - 10) + ")")
                .style("text-anchor", "end")
                .text(options.xName);
            //y
            svg.append("text")
                .attr("transform", "translate(" + (margin.left) + " ," + (0 + margin.top /2) + ")")
                .style("text-anchor", "start")
                .text(options.yName);


            
            //Création de la fonction de dessin d'une ligne
            let line = d3
                .line()
                .x(d => d[0])
                .y(d => d[1])
                .curve(d3.curveLinear);

            let area = d3.area()
                .curve(d3.curveLinear)
                .x(d => d[0])
                .y0(yScale(0))
                .y1(d => d[1]);

            var colorscale = d3.schemeCategory10;
            if (options.seriesCouleur.length > 0)
                colorscale = options.seriesCouleur;

            //Calcul des cordonnées des points de toutes les séries
            options.data.forEach((l,i) =>
            {
                var pointsSerie: [number, number][] = [];
                l.forEach((e) =>
                {
                    let date = DateSerialisable.getDate(options.dataX(e));
                    let value = options.dataY(e);
                    let pt: [number, number] = [xScale(date), yScale(value)];
                    if (myThis.datas.dates.filter(d => d.MaDateLong == options.dataX(e).MaDateLong).length > 0)
                    {
                        pointsSerie.push(pt);
                        myThis.pointsVoronoi.push(new VoronoiPointCustom(myThis.series[i].name, pt));
                    }                   
                });

                myThis.pointsAllSeries.push(pointsSerie);

            });
            
            let pointsSeriecumul: [number, number][] = [];
            cumulDatas.forEach((e) =>
            {
                let date = DateSerialisable.getDate(options.dataX(e));
                let value = options.dataY(e);
                let pt: [number, number] = [xScale(date), yScale(value)];
                if (myThis.datas.dates.filter(d => d.MaDateLong == options.dataX(e).MaDateLong).length > 0)
                {
                    pointsSeriecumul.push(pt);
                    myThis.pointsVoronoi.push(new VoronoiPointCustom("Cumul", pt));
                }
            });

            myThis.pointsAllSeries.push(pointsSeriecumul);


            //Créaton des points

            myThis.pointsAllSeries.forEach((points, i) =>
            {              
             
                //Création des points
                points.forEach((pt, index) =>
                {
                      
                    let circle = g.append("circle")
                        .attr("fill", colorscale[i])
                        .attr("stroke-width", 2)
                        .attr("cx", pt[0])
                        .attr("cy", pt[1])
                        .attr("r", 5);
                    if (options.hover != null)
                    {
                        let obj = (i == myThis.pointsAllSeries.length - 1 ? cumulDatas[index] : options.data[i].All()[index]);
                        circle.attr("cursor", "pointer");
                        let pointDecale: [number, number] = [pt[0], pt[1]];// [pt[0]+margin.left, pt[1] + myThis.axSvg.x.position().top - margin.top * 2];
                        circle.on("mouseover", () => options.hover(obj, pointDecale));
                    }

                    if (options.courbe == enumStyleCourbe.courbeApprox)
                    {
                        if (index > 0)
                        {
                            g.append("line")
                                .style("stroke", colorscale[i])
                                .attr("x1", (d) => { return points[index - 1][0] })
                                .attr("y1", (d) => { return points[index - 1][1] })
                                .attr("x2", (d) => { return pt[0] })
                                .attr("y2", (d) => { return pt[1] })
                        }
                    }
                }
                );              
               
                ////Si courbe création des lignes d'approximation
                //options.courbe == enumStyleCourbe.courbeApprox &&
                //    i != myThis.pointsAllSeries.length - 1 ?
                //        g.append("path")
                //            .data(points)
                //            .attr("fill", "none")
                //            .attr("stroke", colorscale[i])
                //            .attr("stroke-width", 1.5)
                //            .attr("stroke-linejoin", "round")
                //            .attr("stroke-linecap", "round")
                //        .attr("d", line(points))
                //    :
                //    g.append("path")
                //        .data(points)
                //        .attr("fill", colorscale[i])
                //        .attr("fill-opacity", 0.05)
                //        .attr("stroke", colorscale[i])
                //        .attr("stroke-opacity", 0.1)
                //        .attr("stroke-width", 1.5)
                //        .attr("stroke-linejoin", "round")
                //        .attr("stroke-linecap", "round")
                //        .attr("d", area(points));

            });

            //if (options.courbe == enumStyleCourbe.courbeApprox && options.courbe == enumStyleCourbe.courbeApprox)
            //{
            //    let index: number = myThis.pointsAllSeries.length -1 ;
            //    g.append("path").lower()
            //        .data(myThis.pointsAllSeries[index])
            //        .attr("fill", colorscale[index])
            //        .attr("fill-opacity", 0.05)
            //        .attr("stroke", colorscale[index])
            //        .attr("stroke-opacity", 0.1)
            //        .attr("stroke-width", 1.5)
            //        .attr("stroke-linejoin", "round")
            //        .attr("stroke-linecap", "round")
            //        .attr("d", area(myThis.pointsAllSeries[index]));
            //}

            if (options.ligneSupplementaire != undefined)
            {
                options.ligneSupplementaire.forEach((val) => { 
                    g.append("line")
                        .style("stroke", "black")
                        .attr("x1", (d) => { return xScale(xScale.domain()[0]) })
                        .attr("y1", (d) => { return yScale(val) })
                        .attr("x2", (d) => { return xScale(xScale.domain()[1]) })
                        .attr("y2", (d) => { return yScale(val) })
                })
            }

            if (options.legend)
            {
                myThis.datas.series.forEach(s => myThis.serieVoronoi[s.name] = new VoronoiSerieCustom(0, null,null, null));


                myThis.getVoronoiSerie(options.width - margin.right, options.height - margin.bottom, svg, colorscale);
            }


        



        }


    }
}
