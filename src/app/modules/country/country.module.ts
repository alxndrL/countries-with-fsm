import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from "./services/country.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from './store/country.effects';
import { MatRadioModule } from "@angular/material/radio";
import { CountryResultComponent } from './components/country-result/country-result.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MoreDetailsResultComponent } from './components/more-details-result/more-details-result.component';
import { CountryMainComponent } from './country-main.component';
import { SearchCountryComponent } from './components/search-country/search-country.component';
import { ErrorComponent } from './components/error/error.component';
import { reducers } from "./store/country.reducer";
import { countryStateFeatureKey } from "./store/country.state";


@NgModule({
	declarations: [
		CountryMainComponent,
		CountryResultComponent,
		MoreDetailsResultComponent,
  SearchCountryComponent,
  ErrorComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatButtonModule,
		HttpClientModule,
		StoreModule.forFeature(countryStateFeatureKey, reducers),
		EffectsModule.forFeature([CountryEffects]),
		MatRadioModule,
		MatCheckboxModule,
	],
	exports: [
		CountryMainComponent
	],
	providers: [
		CountryService
	]
})
export class CountryModule {}
