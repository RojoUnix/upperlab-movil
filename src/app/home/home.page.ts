import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loginForm: FormGroup;

  constructor(public router: Router, public formControl: FormControl, public formArray: FormArray, public validators: Validators){

  } 

}
