import { Component, inject, Input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../../services/helpers.service';
import { Room } from '../../../interfaces/room';
import { FloorService } from '../../../services/Floor.service';
import { Floor } from '../../../interfaces/floor';

@Component({
  selector: 'app-form-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-room.component.html',
  styleUrl: './form-room.component.css'
})
export class FormRoomComponent {

  private readonly _formBuilder = inject( FormBuilder );
  private readonly _helper      = inject( HelpersService );
  private readonly _floor       = inject( FloorService );

  handleForm = output<Room>();
  closeForm  = output<boolean>();

  @Input()  room: Room = {
    id: 0,
    piso_id: 0,
    cuarto: '',
  };

  data: Floor[] = [];

  formGroup = this._formBuilder.nonNullable.group({
    'id':    [ 0, [] ],
    'floor': [ 0, [ Validators.required ] ],
    'room':  [ '', [ Validators.required ] ],
  });

  constructor() {
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillFormGroup();
  }

  getData(): void {
    this._floor.getAll().subscribe( res => {
      const { status, msg } = res;
      if( status === 200 || status === 201 ){
        const { data } = res;
        this.data = data;
      } else if( status === 400 || status === 404 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happenend', 'error', 2000 );
      }
    });
  }

  cleanFormGroup(): void {
    this.formGroup = this._formBuilder.nonNullable.group({
      'id':    [ 0, [] ],
      'floor': [ 0, [ Validators.required ] ],
      'room':  [ '', [ Validators.required ] ],
    });
    this.closeForm.emit( false );
  }

  fillFormGroup(): void {
    this.formGroup = this._formBuilder.nonNullable.group({
      'id':        [ this.room.id, [] ],
      'floor':     [ this.room.piso_id, [ Validators.required ] ],
      'room':      [ this.room.cuarto, [ Validators.required ] ],
    });
  }

  handleSubmit(): void {
    if( !this.formGroup.valid ){
      this._helper.showToaster( 'error', 'Check data', false, 'center', 2000 );
      return;
    }
    this.room = {
      id:    this.formGroup.value.id ?? 0,
      piso_id: 0, //Check
      piso: {
        id: this.formGroup.value.floor ?? 0,
        piso: ''
      },
      cuarto:  this.formGroup.value.room ?? '',
    };
  this.handleForm.emit( this.room );
  }


}
