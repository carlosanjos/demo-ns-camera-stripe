import { Component, OnInit } from "@angular/core";

import { CameraService } from "./camera.service";
import { requestCameraPermissions } from "nativescript-camera";
import { ImageSource } from "tns-core-modules/image-source";
import { switchMap } from "rxjs/operators";
import { Stripe, CreditCardView, StripeSetupIntent } from "nativescript-stripe";
import { StripeGlobals } from "../stripe/stripe.global";
import { StripeService } from "../stripe/stripe.service";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    public photo: ImageSource;
    public messages: string;

    constructor(
        private cameraService: CameraService,
        private stripeService: StripeService) { }

    ngOnInit(): void {
        requestCameraPermissions();
    }

    public captureImage(): void {
        this.cameraService
            .takePhoto()
            .pipe(switchMap((image) => this.cameraService.getSourceFromAsset(image)))
            .subscribe((photoSource) => {
                this.photo = photoSource;
            });
    }

    public confirm(cardView: CreditCardView): void {
        const stripe = new Stripe(StripeGlobals.STRIPE_PUBLISHABLE_KEY);

        stripe.createPaymentMethod(cardView.card, (error, paymentMethod) => {
            if (error) {
                console.log(error.toString());
                this.messages = error.toString();

                return;
            }

            this.stripeService
                .createCustomer()
                .pipe(
                    switchMap((customer: string) => this.stripeService.createSetupIntent(customer))
                )
                .subscribe((setupIntent: any) => {
                    stripe.confirmSetupIntent(paymentMethod.id, setupIntent.client_secret, (error: Error, setupItent: StripeSetupIntent) => {
                        if (error) {
                            console.log(error.toString());
                            this.messages = error.toString();
                        } else {
                            this.messages = setupItent.status;
                        }
                    });
                });
        });
    }
}
