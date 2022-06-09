import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly _auth: AuthService,
    private readonly _router: Router,
    private readonly _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    });
  }

  signIn() {
    this._auth.signIn(this.form.value).subscribe({
      next: () => this._router.navigate(['chat']),
      error: (error) => this._snackbar.open(error.message),
    });
  }
}
