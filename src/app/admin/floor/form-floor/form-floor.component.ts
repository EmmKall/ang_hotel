import { Component, inject, Input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../../services/helpers.service';
import { Floor } from '../../../interfaces/floor';

@Component({
  selector: 'app-form-floor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-floor.component.html',
  styleUrl: './form-floor.component.css'
})
export class FormFloorComponent {

  private readonly _formBuilder = inject( FormBuilder );
  private readonly _helper      = inject( HelpersService );

  handleForm = output<Floor>();
  closeForm  = output<boolean>();

  @Input()  floor: Floor = {
    id: 0,
    piso: '',
  };

  formGroup = this._formBuilder.nonNullable.group({
    'id':        [ 0, [] ],
    'floor':      [ '', [ Validators.required ] ]
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
      'floor':      [ '', [ Validators.required ] ],
    });
    this.closeForm.emit( false );
  }

  fillFormGroup(): void {
    this.formGroup = this._formBuilder.nonNullable.group({
      'id':        [ this.floor.id, [] ],
      'floor':      [ this.floor.piso, [ Validators.required ] ],
    });
  }

  handleSubmit(): void {
    if( !this.formGroup.valid ){
      this._helper.showToaster( 'error', 'Check data', false, 'center', 2000 );
      return;
    }
    this.floor = {
      id:    this.formGroup.value.id ?? 0,
      piso: this.formGroup.value.floor ?? '',
    };
  this.handleForm.emit( this.floor );
  }

}
