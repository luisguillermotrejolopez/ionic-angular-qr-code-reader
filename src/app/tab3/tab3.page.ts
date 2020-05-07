import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

/**
 * Component to read QR Code generated.
 * @author Guillermo Trejo <luisguillermotrejolopez@gmail.com>
 */
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public language: any = { markupLanguage: '', styleSheets: '', scriptLanguage: '', strongTyping: '' };
  private keyValue: string = '#MySeparator#';

  constructor(
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController
  ) {}

  /**
   * Method to read QR Code.
   * @author Guillermo Trejo <luisguillermotrejolopez@gmail.com>
   *
   * @returns void
  */
  public readQrCode(): void {
    this.barcodeScanner.scan().then(codeData => {
      this.formatData(codeData.text);
    }).catch(error => {
      this.showError(error);
    });
  }

  /**
   * Method to clear data.
   * @author Guillermo Trejo <luisguillermotrejolopez@gmail.com>
   *
   * @returns void
  */
  public clearData(): void {
    this.language = { markupLanguage: '', styleSheets: '', scriptLanguage: '', strongTyping: '' };
  }

  /**
   * Method to format data obtained from QR Code.
   * @author Guillermo Trejo <luisguillermotrejolopez@gmail.com>
   *
   * @param {string} qrCodeData - data obtained from qr code
   * @returns void
  */
  private formatData(qrCodeData: string): void {
    let data: Array<string> = qrCodeData.split(this.keyValue);
    this.language = { markupLanguage: data[0], styleSheets: data[1], scriptLanguage: data[2], strongTyping: data[3] };
  }

  /**
   * Method to show an error ocurred scanning.
   * @author Guillermo Trejo <luisguillermotrejolopez@gmail.com>
   *
   * @param {any} message - error message occurred
   * @returns void
  */
  async showError(message: any): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Has ocurred an error scanning: ' + message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
