import { Component, inject, Input, output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../../services/helpers.service';
import { Guest } from '../../../interfaces/guest';

@Component({
  selector: 'app-form-guest',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-guest.component.html',
  styleUrl: './form-guest.component.css'
})
export class FormGuestComponent {

  private readonly _formBuilder = inject( FormBuilder );
  private readonly _helper      = inject( HelpersService );

  handleForm = output<Guest>();
  closeForm  = output<boolean>();

  @Input()  guest: Guest = {
    id: 0,
    name: '',
    last_name: '',
    email: '',
    phone: '',
    born_day: '',
    sex: ''
  };

  formGroup = this._formBuilder.nonNullable.group({
    'id':        [ 0, [] ],
    'name':      [ '', [ Validators.required ] ],
    'last_name': [ '', [ Validators.required ] ],
    'email' :    [ '', [ Validators.required, Validators.email ],  ],
    'phone':     [ '', [ Validators.required ] ],
    'born_day':  [ '', [ Validators.required ] ],
    'sex':  [ '', [ Validators.required ] ],
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
      'born_day':  [ '', [ Validators.required ] ],
      'sex':  [ '', [ Validators.required ] ],
    });
    this.closeForm.emit( false );
  }

  fillFormGroup(): void {
    this.formGroup = this._formBuilder.nonNullable.group({
      'id':        [ this.guest.id, [] ],
      'name':      [ this.guest.name, [ Validators.required ] ],
      'last_name': [ this.guest.last_name, [ Validators.required ] ],
      'email' :    [ this.guest.email, [ Validators.required, Validators.email ],  ],
      'phone':     [ this.guest.phone, [ Validators.required ] ],
      'born_day':  [ this.guest.born_day, [ Validators.required ] ],
      'sex':       [ this.guest.sex, [ Validators.required ] ],
    });
  }

  handleSubmit(): void {
    if( !this.formGroup.valid ){
      this._helper.showToaster( 'error', 'Check data', false, 'center', 2000 );
      return;
    }
    this.guest = {
      id:        this.formGroup.value.id ?? 0,
      name:      this.formGroup.value.name ?? '',
      last_name: this.formGroup.value.last_name ?? '',
      email:     this.formGroup.value.email ?? '',
      phone:     this.formGroup.value.phone ?? '',
      born_day:  this.formGroup.value.born_day ?? '',
      sex:       this.formGroup.value.sex ?? '',
    };
    this.handleForm.emit( this.guest );
  }



}
