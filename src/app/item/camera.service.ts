import { Injectable } from "@angular/core";
import { takePicture } from "nativescript-camera";
import { Observable } from "rxjs/internal/Observable";
import { from } from "rxjs/internal/observable/from";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import { ImageSource } from "tns-core-modules/image-source";

@Injectable({
    providedIn: "root"
})
export class CameraService {
    public takePhoto(): Observable<ImageAsset> {
        return from(takePicture({
            width: 400,
            height: 400,
            keepAspectRatio: true,
            saveToGallery: false,
        }));
    }

    public getSourceFromAsset(imageAsset: ImageAsset): Observable<ImageSource> {
        return from(new ImageSource().fromAsset(imageAsset));
    }
}