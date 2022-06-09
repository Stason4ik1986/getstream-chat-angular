import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly _auth: AuthService,
    private readonly _router: Router,
    private readonly _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      displayName: new FormControl('', [Validators.minLength(3)]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    });
  }

  signUp() {
    this._auth.signUp(this.form.value).subscribe({
      next: () => this._router.navigate(['chat']),
      error: (error) => this._snackbar.open(error.message),
    });
  }
}
