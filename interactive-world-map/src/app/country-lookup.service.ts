import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryLookupService {
  constructor(private http: HttpClient) {}

  getCountryData(code: string): Observable<any> {
    const apiUrl = `https://api.worldbank.org/v2/country/${code}?format=json`;
    return this.http.get(apiUrl);
  }
}


