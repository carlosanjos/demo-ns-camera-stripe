import { Component } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";

registerElement("CreditCardView", () => require("nativescript-stripe").CreditCardView);
@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent { }
