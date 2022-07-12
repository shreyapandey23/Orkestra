import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import {default as Annotation} from 'chartjs-plugin-annotation';
import { CustomChartComponentService } from './custom-chart.component.service';

@Component({
  selector: 'app-custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.css'],
  providers:[CustomChartComponentService]
})
export class CustomChartComponent implements OnInit {

  @Input() season ='';

  ngOnInit(): void {
    this.fillData('');
  }

  ngOnChanges(changes: SimpleChanges) {

      this.fillData(changes.season.currentValue);
  
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
  }



  constructor(public customChartService:CustomChartComponentService) {
    Chart.register(Annotation)
  }

  fillData(season:string)
  {
    this.customChartService.getSampleData().subscribe(data => {
      console.log(data);
      let dataSets:any=[];
      let days=data.chunked_time_series.days;
      let outerArray=[];
      for(let i=0;i<days.length;i++)
      {
        if(season!='')
        {
          if(season==days[i].season)
          {
            outerArray.push(days[i].values);
            dataSets.push({
                data:days[i].values,
                borderColor: '#c6c6c6',
                borderWidth: 0.2 
              })
          }
        }
        else
        {
          outerArray.push(days[i].values);
          dataSets.push({
          data:days[i].values,
          borderColor: '#c6c6c6',
          borderWidth: 0.2 
          })
        }
        
      }

      let meanData=this.calculateMean(outerArray);
      dataSets.push({
        data:meanData,
        borderColor: '#102d4c',
        borderWidth: 5 ,
        type: 'line',
        order: -1
       })
      this.lineChartData.datasets=dataSets;
      let x_axis=data.chunked_time_series.x_axis;;
      for(let i=0;i<x_axis.length;i++)
      {
        x_axis[i]=this.convertMinsToHrsMins(x_axis[i]);
      }
      this.lineChartData.labels=x_axis;
      this.chart?.update();
  });
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
    ],
    labels: [ ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: { display: false },
      
    },
    elements: {
      point:{
          radius: 0
      }
    },
    maintainAspectRatio: false,
    scales: {
      y: {
          ticks: {
              // Include a dollar sign in the ticks
              callback: function(value:any, index, ticks) {
                if(value==0)
                {
                  return 0;
                }
                  return value/1000 + ' K';
              },
              
          },
          
          beginAtZero: true
      },
      x: {
        
        ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            maxRotation: 0,
            minRotation: 0
        }
       }
      
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
 
  calculateMean(outerArr:any)
  {
    let l=outerArr.length;
    let result=outerArr.reduce(function (r:any, a:any) {
      a.forEach(function (b:any, i:any) {
          r[i] = (r[i] || 0) + b;
      });
      return r;
    }, []);

    for(let k=0;k<result.length;k++)
    {
      result[k]=result[k]/l;
    }

    return result;
  }

  convertMinsToHrsMins(minutes:any) {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;
    let a = h < 10 ? '0' + h : h; 
    let b = m < 10 ? '0' + m : m; 
    return a + ':' + b;
  }

}
