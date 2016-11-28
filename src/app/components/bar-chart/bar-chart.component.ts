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
    console.log(this.chartData);
  }
  
  // events
  chartClicked(e:any):void {
    // console.log(e);
  }

  chartHovered(e:any):void {
    // console.log(e);
  }
}