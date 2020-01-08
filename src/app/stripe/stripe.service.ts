import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { StripeGlobals } from "./stripe.global";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class StripeService {
    constructor(private http: HttpClient) { }

    get requestHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer ${StripeGlobals.STRIPE_SECRET_KEY}`
        });
    }

    public createSetupIntent(customerId: string): Observable<any> {
        return this.http.post(
            StripeGlobals.STRIPE_API_URL + 'setup_intents',
            new HttpParams().set('customer', customerId),
            { headers: this.requestHeaders })
    }

    public createCustomer(): Observable<string> {
        return this.http.post(
            StripeGlobals.STRIPE_API_URL + 'customers',
            new HttpParams()
            .set('description', 'Created by NS Demo').set('name', 'Bruce Wayne'),
            { headers: this.requestHeaders })
            .pipe(
                map((payload: any) => payload.id))
    }
}