import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { HelperService } from '@core/services/helper.service';
import { FacultativeService } from '@core/services/facultative.service';
import { SelectDropdownComponent } from "@shared/select-dropdown/select-dropdown.component";
import { dependantOn } from '@core/validations/dependent.validation';
import { InputFieldTextareaComponent } from "@shared/input-field-text-area/input-field-text-area.component";
import { FileUploadComponent } from "@shared/file-upload/file-upload.component";
@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent, SelectDropdownComponent, InputFieldTextareaComponent, FileUploadComponent],
  templateUrl: './general-information.component.html'
})
export class GeneralInformationComponent implements OnInit {
  form: FormGroup;
  facTypes: any[] = [];
  subTypes: any[] = [];
  typesDeatails: any[] = [];

  @Output() save = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private facultativeService: FacultativeService
  ) {
    this.form = this.fb.group({
      status: ['drafrt'],
      facType: ['', Validators.required],
      subType: ['', dependantOn('facType', 'Fac Type')],
      originalInsured: [''],
      reinsured: [''],
      address: [''],
      periodFrom: [''],
      periodTo: [''],
      description: [''],
      totalInsured: [''],
      limitOfLiability: [''],
      cover: [''],
      interest: [''],
      topLocation: [''],
      originalConditions: [''],
      choiceOfLaw: [''],
      riCondition: [''],
      warranties: [''],
      subjectivities: [''],
      deductibles: [''],
      exclusion: [''],
      file: []
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
    this.save.emit();
  }

  getErrorMessage(controlName: string, lable: string) {
    return this.helper.getErrorsMessage(this.form, controlName, lable)
  }

  onCancel() {
    this.cancel.emit();
  }

  onSaveAsDraft() {
    this.saveDraft.emit();
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

  fileUploaded(uploadedFiles: File[]) {
    this.form.get('file')?.setValue(uploadedFiles);
  }
}
