import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CountryService {

	constructor(private httpClient: HttpClient) {
	}

	fetchCapital(country: string): Observable<any> {
		return this.httpClient.post('https://countriesnow.space/api/v0.1/countries/capital', { country: country });
	}

	fetchCurrency(country: string): Observable<any> {
		return this.httpClient.post('https://countriesnow.space/api/v0.1/countries/currency', { country: country });
	}

	fetchPopulation(country: string): Observable<any> {
		return this.httpClient.post('https://countriesnow.space/api/v0.1/countries/population', { country: country });
	}
}
