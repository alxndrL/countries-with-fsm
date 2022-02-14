import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountryService } from "./modules/country/services/country.service";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CountryModule } from "./modules/country/country.module";
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from "./reducers";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CountryModule,
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true
			}

		}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		EffectsModule.forRoot([])
	],
	providers: [
		CountryService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
