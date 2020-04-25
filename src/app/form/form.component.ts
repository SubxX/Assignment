import { Component, OnInit, Input, Output, OnChanges, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../global-service/global.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Output() resetEdit = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  userForm: FormGroup;
  isEdit = false;
  constructor(private fb: FormBuilder, private gs: GlobalService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(cng: any) {
    if (cng.data.currentValue) {
      this.setFormData(cng.data.currentValue);
      this.isEdit = true;
    }
  }

  clearFields() {
    this.userForm.reset();
    this.isEdit = false;
    this.resetEdit.emit();
  }

  initForm() {
    this.userForm = this.fb.group({
      _id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      med: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  setFormData(data) {
    console.log(data);
    this.userForm.setValue({
      _id: data._id,
      name: data.name,
      email: data.email,
      med: data.med,
      age: data.age
    });
  }

  addFnc() {
    if (this.userForm.status === 'VALID') {
      this.gs.addUser(this.userForm.value);
      this.userForm.reset();
      this.addEvent.emit();
    } else {
      console.log('invalid');
    }
  }

  editFunc() {
    if (this.userForm.status === 'VALID') {
      this.gs.editUser(this.userForm.value);
      this.userForm.reset();
      this.isEdit = false;
      this.resetEdit.emit();
      this.addEvent.emit();
    }
  }

  enterKeyUp(e) {
    if (e.keyCode === 13 && this.userForm.status === 'VALID') {
      this.addFnc();
    } else {
      return false;
    }
  }


}
