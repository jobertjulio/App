import { Component } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ApiTarefaService } from '../service/api-tarefa.service';
import { UtilService } from '../service/util.service';
import { FirebService } from '../services/fireb.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];
  processando : boolean = false;


  constructor(private alertCtrl: AlertController,
    private utilservice: UtilService,
    private actionCtrl: ActionSheetController,
    private BancoFire: FirebService,
    private apiServ: ApiTarefaService,
    private loadingCtrl: LoadingController) {
    //let taskJson = localStorage.getItem('taskDb');

    // if (taskJson!=null){
    //   // Convert Json em Objeto Tasks / Carrega Taks em Memoria Storage
    //   this.tasks = JSON.parse(taskJson);
    // }
    //Buscar Lista de Tarefas Firebase
    // this.tasksSub = this.BancoFire.getTarefas().subscribe(data =>{
    //   console.log(data);
    //   this.tasks = data;
    // }) 

    // this.bsTarefas = this.BancoFire.getTarefas();
    // this.bsTarefas.subscribe(val => this.tasks = val,
    //             error=> console.log("error"),
    //            () => console.log("complete"));
    
    this.buscartarefas();
    

  }

  ngOnDestroy() {
    //  this.tasksSub.unsubscribe();
  }

  async buscartarefas() {
    this.processando = true;
    //Exibir Loading
    let loading = await this.loadingCtrl.create({ message: 'Buscando Lista!' });
    loading.present();
    this.apiServ.list()
      .then(async (r : any[]) => {
         this.tasks = r;   
         //Ocultar Loading
         loading.dismiss();
         this.processando = false;
      })
      .catch(async (e) => {
        this.utilservice.showToast('Operação Falhou!');
        //Ocultar Loading
        loading.dismiss();     
        this.processando = false;
      });

  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'newtask',
          type: 'text',
          placeholder: 'Ex.: Estudar'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Adicionar',
          handler: (form) => {
            console.log(form.newtask);

            this.add(form.newtask);
          }
        }
      ]

    });

    await alert.present();
  }

  async add(newtask: string) {
    //Valida Task Vazia e Retorna Mensagem Toast
    if (newtask.trim().length < 1) {
      this.utilservice.showToast('Informe o que deseja fazer!');
      return;
    }
    // Adicionar task na lista
    let task = { name: newtask, done: false };
    this.tasks.push(task);
    //adicionar novo item    
    this.apiServ.add(task.name)
      .then(async (r) => {
        this.utilservice.showToast('Operação Realizada com Sucesso!');
        this.buscartarefas();

      })
      .catch(async (e) => {
        this.utilservice.showToast('Operação Falhou!');

      });     

    // Salvar task no Storage
    //this.updateLocalStorage();

    // Adiciona a Tarefa Firebase    
    // this.BancoFire.addTarefa(task)
    // .then((json) => {
    //   console.log(json)        
    // })
    // .catch((erro) => {
    //   console.log(erro)
    // });

  }

  updateLocalStorage() {
    // Convert Objeto Tasks em Json
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
    // update de tarefa Firebase
    console.log(this.tasks.keys.toString);
    //this.BancoFire.updateTarefa()



  }

  async openAction(task: any) {
    const actionSheet = await this.actionCtrl.create({
      header: 'O que deseja Fazer?',
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;
          //this.updateLocalStorage();

          this.apiServ.update(task)
            .then(async (r) => {
              this.utilservice.showToast('Operação Realizada com Sucesso!');
            })
            .catch(async (e) => {
              this.utilservice.showToast('Operação Falhou!');

            });

        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  async deletetask(task: any) {
    // Filtra todas as Tasks diferentes da que foi excluida
    // this.tasks = this.tasks.filter(taskArray => task != taskArray);
    // // Atualiza no LocalStorage
    // this.updateLocalStorage();

    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: 'Tem certeza que deseja <strong>Excluir</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirma',
          handler: () => {
            //console.log('Confirm Okay');
            this.apiServ.delete(task.id)
            .then(async (r) => {
              this.utilservice.showToast('Operação Realizada com Sucesso!');  
              this.buscartarefas();              
            })
            .catch(async (e) => {
              this.utilservice.showToast('Operação Falhou!');
        
            });
        
          }
        }
      ]
    });

    await alert.present();



    // const Confima = await this.utilservice.ConfirmaExcluir(;
    // const lista = await 
    //const Confima = await this.utilservice.ConfirmaExcluir(task.id);
    

    
   //const Busca = await this.buscartarefas()
    
    // this.apiServ.delete(task.id)
    // .then(async (r) => {
    //     this.utilservice.showToast('Operação Realizada com Sucesso!');
    //   this.buscartarefas();

    // })
    // .catch(async (e) => {
    //   this.utilservice.showToast('Operação Falhou!');

    // });
    
    

    


  }


}
