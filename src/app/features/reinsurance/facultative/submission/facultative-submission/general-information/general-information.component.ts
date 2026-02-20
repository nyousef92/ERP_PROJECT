import { Component, effect, model, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputFieldComponent } from '../../../../../../shared/input-field/input-field.component';
import { HelperService } from '../../../../../../core/services/helper.service';
import { Router } from '@angular/router';
import { FacultativeService } from '../../../../../../core/services/facultative.service';
import { SelectDropdownComponent } from "../../../../../../shared/select-dropdown/select-dropdown.component";
import { dependantOn } from '../../../../../../core/validations/dependent.validation';
@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent, SelectDropdownComponent],
  templateUrl: './general-information.component.html'
})
export class GeneralInformationComponent implements OnInit {


  form: FormGroup;
  collectData = model.required<boolean>();
  facTypes: any[] = [];
  subTypes: any[] = [];
  typesDeatails: any[] = [];
  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    private facultativeService: FacultativeService
  ) {
    effect(() => {
      if (this.collectData()) {
        this.onSubmit();
      }
    });

    this.form = this.fb.group({
      status: ['drafrt'],
      facType: ['', Validators.required],
      subType: ['', dependantOn('facType','Fac Type')],
      commission: [''],
      fees: ['']
    });
  }
  ngOnInit(): void {
    this.getTypesInfo()
  }

  getTypesInfo() {
    this.facultativeService.getSubmissionTypes().subscribe(resp => {
      this.typesDeatails = resp;
      this.facTypes = resp.map(item => item.facType).map((item: string) => ({
        value: item,
        label: item
      }));
    })
  }

  onSubmit(): void {

  }

  getErrorMessage(controlName: string, lable: string) {
    return this.helper.getErrorsMessage(this.form, controlName, lable)
  }

  onCancel() {
    this.router.navigate(['/home/reinsurance/facultative/submission'])
  }

  onSaveAsDraft() {
    console.log(this.form.value);
  }

  facTypeChanges(selectedType: string | number) {
    this.subTypes = [];
    this.form.get('facType')?.setValue(selectedType);
    this.subTypes = (this.typesDeatails.find(item => item.facType === selectedType).subType).map((item: string) => ({
      value: item,
      label: item
    }));

  }
  subTypeChanges(selectedType: string | number) {
    this.form.get('subtype')?.setValue(selectedType);

  }
}
