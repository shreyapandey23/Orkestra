import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomChartComponentService {

   constructor(private http: HttpClient) {
    }

    public getSampleData(): Observable<any> {
        return this.http.get("./assets/sample-dataset.json");
    }
}