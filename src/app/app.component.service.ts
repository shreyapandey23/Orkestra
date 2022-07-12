import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppComponentService {

   constructor(private http: HttpClient) {
    }

    public getProfiles(): Observable<any> {
        return this.http.get("./assets/load-profiles.json");
    }
}