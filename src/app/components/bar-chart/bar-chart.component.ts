import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html'
})

export class BarChartComponent implements OnInit {
  @Input() chartData:any[];
  @Input() chartLabels:string[];
  @Input() chartTitle:string;
  
  barChartOptions:any;
  barChartType:string;
  barChartLegend:boolean;
  
  ngOnInit():void {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      title: {
        display: true,
        text: this.chartTitle
      }
    };
    this.barChartType = 'bar';
    this.barChartLegend = true;
  }
  
  // events
  chartClicked(e:any):void {
    console.log(e);
  }
  
  chartHovered(e:any):void {
    console.log(e);
  }
  
  randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.chartData));
    clone[0].data = data;
    this.chartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}