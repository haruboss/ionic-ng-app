import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  Bookings = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private aptService: AppointmentService) {
  }

  ngOnInit() {
    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
      })
    })
  }

  async fetchBookings() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading appointments...',
    });
    await loading.present();
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res);
      loading.dismiss();
    })
  }

  deleteBooking(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id)
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');

  }

  gotoMakeApt(){
    this.navCtrl.navigateForward('home/make-appointment')
  }

  gotoEditApt(id){
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
      }
    };
    this.navCtrl.navigateForward(['home/edit-appointment'], navigationExtras);
  }

}
