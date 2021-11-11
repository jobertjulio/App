import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { ApiTarefaService } from './api-tarefa.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public loading: HTMLIonLoadingElement;
  constructor(private toastCtrl: ToastController, 
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private apiServ: ApiTarefaService) {  }


  //Exibir Mensaagem
  async showToast(message: string, duration: number = 2000){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      cssClass: 'animate__animated animate__bounceInUp',
      color: 'secundary',
      position: 'middle'
    });
    toast.present();

  }

  //Exibir animação de Carregando
  async showLoading(message: string = 'Processando') {
    const loading = await this.loadingCtrl.create({ message: message });
    this.loading = loading;
    
    this.loading.present();
  }

  //Exibir animação de Carregando
  hideLoading() {
    console.log(this.loading);
    if (this.loading != undefined && this.loading != null){
      this.loading.dismiss();
    }
  }


  

}
