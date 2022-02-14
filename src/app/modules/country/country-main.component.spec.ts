import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMainComponent } from './country-main.component';
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CountryService } from "./services/country.service";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { CountryResultComponent } from "./components/country-result/country-result.component";
import { ErrorComponent } from "./components/error/error.component";
import { MoreDetailsResultComponent } from "./components/more-details-result/more-details-result.component";
import { SearchCountryComponent } from "./components/search-country/search-country.component";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('CountryMainComponent', () => {
	let component: CountryMainComponent;
	let fixture: ComponentFixture<CountryMainComponent>;
	let store: any;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports:[
				ReactiveFormsModule,
				FormsModule,
				MatInputModule,
				MatButtonModule,
				MatFormFieldModule,
				BrowserModule,
				BrowserAnimationsModule,
			],
			declarations: [CountryMainComponent, CountryResultComponent, ErrorComponent, MoreDetailsResultComponent, SearchCountryComponent],
			providers: [
				{
					provide: Store,
					useValue: jasmine.createSpyObj('store', ['select', 'dispatch'])
				},
				{
					provide: CountryService,
					useValue: jasmine.createSpyObj('countryService', [''])
				}
			]
		})
		.compileComponents();
	});

	beforeEach(() => {
		store = TestBed.get(Store);

		store.select.and.callFake((params: any) => {
			switch (params) {
				default:
					return of({});
			}
		});


		fixture   = TestBed.createComponent(CountryMainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('diagram',() => {
		it('should not show diagram', () => {
			component.showDiagram = false;
			fixture.detectChanges();
			const diagram = fixture.debugElement.query(By.css('#diagram'));
			expect(diagram).toBeNull();
		});

		it('should show diagram', () => {
			component.showDiagram = true;
			fixture.detectChanges();
			const diagram = fixture.debugElement.query(By.css('#diagram'));
			expect(diagram).toBeTruthy();
		});
	});

	it('should show search country component ', () => {
		component.currentFsmStateName = 'idle';
		fixture.detectChanges();

		const appSearchCountry = fixture.debugElement.query(By.css('app-search-country'));
		const fetchingCountry = fixture.debugElement.query(By.css('#fetching-country-loading'));
		const fetchingMoreDetails = fixture.debugElement.query(By.css('#fetching-more-details'));
		const successFetchMoreDetails = fixture.debugElement.query(By.css('app-more-details-result'));
		const failure = fixture.debugElement.query(By.css('app-error '));

		expect(appSearchCountry).toBeTruthy();
		expect(fetchingCountry).toBeNull();
		expect(fetchingMoreDetails).toBeNull();
		expect(successFetchMoreDetails).toBeNull();
		expect(failure).toBeNull();
	});

	it('should show error component ', () => {
		component.currentFsmStateName = 'failure';
		fixture.detectChanges();

		const appSearchCountry = fixture.debugElement.query(By.css('app-search-country'));
		const fetchingCountry = fixture.debugElement.query(By.css('#fetching-country-loading'));
		const fetchingMoreDetails = fixture.debugElement.query(By.css('#fetching-more-details'));
		const successFetchMoreDetails = fixture.debugElement.query(By.css('app-more-details-result'));
		const failure = fixture.debugElement.query(By.css('app-error '));

		expect(appSearchCountry).toBeNull();
		expect(fetchingCountry).toBeNull();
		expect(fetchingMoreDetails).toBeNull();
		expect(successFetchMoreDetails).toBeNull();
		expect(failure).toBeTruthy();
	});

	it('should show successFetchMoreDetails component ', () => {
		component.currentFsmStateName = 'successFetchMoreDetails';
		fixture.detectChanges();

		const appSearchCountry = fixture.debugElement.query(By.css('app-search-country'));
		const fetchingCountry = fixture.debugElement.query(By.css('#fetching-country-loading'));
		const fetchingMoreDetails = fixture.debugElement.query(By.css('#fetching-more-details'));
		const appMoreDetailsResult = fixture.debugElement.query(By.css('app-more-details-result'));
		const failure = fixture.debugElement.query(By.css('app-error '));

		expect(appSearchCountry).toBeNull();
		expect(fetchingCountry).toBeNull();
		expect(fetchingMoreDetails).toBeNull();
		expect(appMoreDetailsResult).toBeTruthy();
		expect(failure).toBeNull();
	});

	it('should show fetchingCountry component ', () => {
		component.currentFsmStateName = 'fetchingCountry';
		fixture.detectChanges();

		const appSearchCountry = fixture.debugElement.query(By.css('app-search-country'));
		const fetchingCountry = fixture.debugElement.query(By.css('#fetching-country-loading'));
		const fetchingMoreDetails = fixture.debugElement.query(By.css('#fetching-more-details'));
		const appMoreDetailsResult = fixture.debugElement.query(By.css('app-more-details-result'));
		const failure = fixture.debugElement.query(By.css('app-error '));

		expect(appSearchCountry).toBeNull();
		expect(fetchingCountry).toBeTruthy();
		expect(fetchingMoreDetails).toBeNull();
		expect(appMoreDetailsResult).toBeNull();
		expect(failure).toBeNull();
	});

	it('should show fetchingMoreDetails component ', () => {
		component.currentFsmStateName = 'fetchingMoreDetails';
		fixture.detectChanges();

		const appSearchCountry = fixture.debugElement.query(By.css('app-search-country'));
		const fetchingCountry = fixture.debugElement.query(By.css('#fetching-country-loading'));
		const fetchingMoreDetails = fixture.debugElement.query(By.css('#fetching-more-details'));
		const appMoreDetailsResult = fixture.debugElement.query(By.css('app-more-details-result'));
		const failure = fixture.debugElement.query(By.css('app-error '));

		expect(appSearchCountry).toBeNull();
		expect(fetchingCountry).toBeNull();
		expect(fetchingMoreDetails).toBeTruthy();
		expect(appMoreDetailsResult).toBeNull();
		expect(failure).toBeNull();
	});
});
