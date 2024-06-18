import { Component, inject, Input, output, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../interfaces/User';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../../services/helpers.service';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {

  private readonly _formBuilder = inject( FormBuilder );
  private readonly _helper      = inject( HelpersService );

  handleForm = output<User>();
  closeForm  = output<boolean>();

  @Input()  user: User = {
    id: 0,
    name: '',
    last_name: '',
    email: '',
    phone: '',
    rol: 0
  };

  formGroup = this._formBuilder.nonNullable.group({
    'id':        [ 0, [] ],
    'name':      [ '', [ Validators.required ] ],
    'last_name': [ '', [ Validators.required ] ],
    'email' :    [ '', [ Validators.required, Validators.email ],  ],
    'phone':     [ '', [ Validators.required ] ],
    'rol':       [ 0, [ Validators.required ] ]
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillFormGroup();
  }

  cleanFormGroup(): void {
    this.formGroup = this._formBuilder.nonNullable.group({
      'id':        [ 0, [] ],
      'name':      [ '', [ Validators.required ] ],
      'last_name': [ '', [ Validators.required ] ],
      'email' :    [ '', [ Validators.required, Validators.email ],  ],
      'phone':     [ '', [ Validators.required ] ],
      'rol':       [ 0, [ Validators.required ] ]
    });
    this.closeForm.emit( false );
  }

  fillFormGroup(): void {
    this.formGroup = this._formBuilder.nonNullable.group({
      'id':        [ this.user.id, [] ],
      'name':      [ this.user.name, [ Validators.required ] ],
      'last_name': [ this.user.last_name, [ Validators.required ] ],
      'email' :    [ this.user.email, [ Validators.required, Validators.email ],  ],
      'phone':     [ this.user.phone, [ Validators.required ] ],
      'rol':       [ this.user.rol, [ Validators.required ] ]
    });
  }

  handleSubmit(): void {
    if( !this.formGroup.valid ){
      this._helper.showToaster( 'error', 'Check data', false, 'center', 2000 );
      return;
    }
    this.user = {
      id: this.formGroup.value.id ?? 0,
      name: this.formGroup.value.name ?? '',
      last_name: this.formGroup.value.last_name ?? '',
      email: this.formGroup.value.email ?? '',
      phone: this.formGroup.value.phone ?? '',
      rol: this.formGroup.value.rol ?? 0,
    };
  this.handleForm.emit( this.user );
  }

}
