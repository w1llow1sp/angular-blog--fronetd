import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  date = new Date();
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  user: User = new User('', '');
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router:Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.user = new User(this.f['username'].value, this.f['password'].value);

    this.loginService.login( this.user ).subscribe({
      next: (result:any) => {
        if (result['status'] === 'success') {
          this.router.navigate(['/home'])
        } else {
          this.error = 'Wrong username or password'
        }
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
