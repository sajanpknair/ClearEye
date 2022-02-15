import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import Validation from './utils/validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  
  roles: any[] = [
    { name: 'Admin' },
    { name: 'Manager' },
    { name: 'HR' },
    { name: 'Software Engineer'}
];

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        address: ['', Validators.required],
        dob: ['', Validators.required],
        role: ['Admin', Validators.required],
        phones: this.formBuilder.array([]),        
        genderControl: ['male', Validators.required],
        
      }
      
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get phones() : FormArray {
    return this.form.controls["phones"] as FormArray
  }
  onSubmit(): void {
    console.log('onSubmit clicked')
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var jsonData = JSON.stringify(this.form.value)
    //console.log(JSON.stringify(this.form.value, null, 2));
    console.log(jsonData)
    localStorage.setItem('registerData', jsonData)
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.ngOnInit()
    this.removeData('registerData')
  }
  newPhone(): FormGroup {
    return this.formBuilder.group({
      phone: [''],
    })
  }
  addPhone() {
    this.phones.push(this.newPhone());
  }
  removePhone(i:number) {
    this.phones.removeAt(i);
  }

  getLocalStorageData() {
    return localStorage.getItem('registerData')
 }
 
 removeData(key) {
    localStorage.removeItem(key)
 }

}
