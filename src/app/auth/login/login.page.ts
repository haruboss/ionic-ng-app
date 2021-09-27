import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = '';
  password:string = '';

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    //  this.validations_form = this.formBuilder.group({
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   password: new FormControl('', Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required
    //   ])),
    // });
  }

  // validation_messages = {
  //   'email': [
  //     { type: 'required', message: 'Email is required.' },
  //     { type: 'pattern', message: 'Please enter a valid email.' }
  //   ],
  //   'password': [
  //     { type: 'required', message: 'Password is required.' },
  //     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
  //   ]
  // };

  // loginUser(email, password) {
  //   this.authService.loginUser(this.email, this.password)
  //     .then(res => {
  //       console.log(res);
  //       this.errorMessage = "";
  //       this.navCtrl.navigateForward('/dashboard');
  //     }, err => {
  //       this.errorMessage = err.message;
  //     })
  // }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  onLogin() {
    this.authService.loginUser(this.email, this.password)
  }
}
