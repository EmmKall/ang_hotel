import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private readonly _formBuilder = inject( FormBuilder );

  formLogin: FormGroup = this._formBuilder.nonNullable.group({
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required ] ]
  });

  constructor() { }

  ngOnInit() {
  }

}
