import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user = false;

  constructor(private storage: Storage, private router: Router) {
    storage.create()
    storage.get('uid').then(res => {
      if (res) {
        router.navigateByUrl('home')
      } else {
        router.navigateByUrl('login')
      }
    })

    this.storage.get('uid').then(res => {
      console.log(res)
      if (res) {
        this.user = true;
      }
    })
    
  }

}
