import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public language: any = { markupLanguage: '', styleSheets: '', scriptLanguage: '', strongTyping: '' };
  private keyValue: string = '#MySeparator#';

  constructor(
    private qrScanner: QRScanner
  ) {}

  public readQrCode() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {// camera permission was granted
          this.qrScanner.show();
          this.showCamera();

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((data: string) => {
            this.hideCamera();
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning

            this.formatData(data);
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log('Camera permission denied');
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  private showCamera(): void {
    document.getElementsByTagName("body")[0].style.opacity = "0";
  }

  private hideCamera(): void {
    document.getElementsByTagName("body")[0].style.opacity = "1";
  }

  private formatData(data: any): void {
    data = data.split(this.keyValue);
    this.language = { markupLanguage: data[0], styleSheets: data[1], scriptLanguage: data[2], strongTyping: data[3] };
  }

}
