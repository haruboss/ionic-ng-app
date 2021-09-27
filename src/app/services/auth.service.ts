import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private alrtCtrl: AlertController,
    private navCtrl: NavController,
    private http: HttpClient
  ) { }

  register(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(
          res => {
            resolve(res)
            console.log(res.user.uid)
            this.storage.set('uid', res.user.uid)
            this.navCtrl.navigateRoot('home')
          },
          err => {
            reject(err)
            if (err) {
              console.log(err)
              const msg = "Registration failed! Please Try again."
              const title = "Registration"
              this.presentAlert(title, msg);
            }
          })
    })
  }

  loginUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(
          res => {
            resolve(res)
            console.log(res.user.uid)
            this.storage.set('uid', res.user.uid)
            this.navCtrl.navigateRoot('home')
          },
          err => {
            reject(err)
            if (err) {
              const title = "Login"
              const msg = 'login failed. please try again';
              this.presentAlert(title, msg);
            }
          })
    })
  }

  logout() {
    this.storage.remove('uid')
    return this.afAuth.signOut()
  }

  async presentAlert(title, msg) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'basic-alert',
      header: title,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
