import { Injectable, inject, signal } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";

@Injectable({
  providedIn: "root",
})

export class deviceDetectorService {
  deviceDetectorService = inject(DeviceDetectorService);
  isMobile = signal<boolean>(false);

  constructor() {
    this.mobileDetector();
  }

  mobileDetector() {
    this.isMobile.set(this.deviceDetectorService.isMobile());
  }
}
