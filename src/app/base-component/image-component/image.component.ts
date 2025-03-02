import { Component, Input } from "@angular/core";
import { IPhotoData } from "@models/common.interface";

@Component({
  selector: "image-component",
  imports: [],
  templateUrl: "./image.component.html",
  styleUrl: "./image.component.css",
})
export class ImageComponent {
  @Input() photo!: IPhotoData;

  activeImage: boolean = false;

  clickImageCard() {
    console.log(this.activeImage);
    this.activeImage = !this.activeImage;
  }
}
