import { Component } from '@angular/core';
import { AppComponentService } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppComponentService]
})

export class AppComponent {
  season='';
  showSeasonDrop='Show All Seasons';
  title = 'demo';
  profileData:any;
  itemName="SuperMarket"
  constructor( private appComponentService : AppComponentService ) { }

ngOnInit(){
   this.appComponentService.getProfiles().subscribe(data => {
        console.log(data);
        this.profileData=data;
    });
}

updateItemName(name:any)
{
  this.itemName=name;
}
updateChart(season:any)
{
  this.showSeasonDrop=season;
  if(season=='Summer')
  {
    this.season='su';
  }
  else if(season=='Autumn')
  {
    this.season='au';
  }
  else if(season=='Winter')
  {
    this.season='wi';
  }
  else if(season=='Spring')
  {
    this.season='sp';
  }
  else
  {
    this.season='';
  }
  
}
}
