import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { HelperService } from '@core/services/helper.service';
import { SelectDropdownComponent } from "@shared/select-dropdown/select-dropdown.component";
import { dependantOn } from '@core/validations/dependent.validation';
import { InputFieldTextareaComponent } from "@shared/input-field-text-area/input-field-text-area.component";
import { FileUploadComponent } from "@shared/file-upload/file-upload.component";
import { LifeSubmissionService } from '@core/services/life.submission.service';
import { FacultativeSubmissionService } from '@core/services/facultative.submission.service';

@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    SelectDropdownComponent,
    InputFieldTextareaComponent,
    FileUploadComponent],
  templateUrl: './general-information.component.html'
})
export class GeneralInformationComponent implements OnInit {
  form: FormGroup;
  facTypes: any[] = [];
  subTypes: any[] = [];
  typesDeatails: any[] = [];
  lobTypes: any[] = [];

  @Output() save = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private submissionService: LifeSubmissionService,
    private facultativeSubmissionService: FacultativeSubmissionService,
  ) {
    this.form = this.fb.group({
      status: ['drafrt'],
      facType: ['', Validators.required],
      subType: ['', dependantOn('facType', 'Fac Type')],
      originalInsured: ['', Validators.required],
      reinsured: [''],
      lineOfBusiness: ['', Validators.required],
      // subLineOfBusiness: ['', dependantOn('lineOfBusiness', 'Line of Business')],
      address: [''],
      periodFrom: ['', Validators.required],
      periodTo: ['', Validators.required],
      geographicalLimit: [''],
      description: [''],
      totalAssured: ['', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      basisSumInsured: [''],
      ageLimit: ['', Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      eligible: [''],
      groupSize: [''],
      freeCoverLimit: [''],
      originalConditions: [''],benefits: [''],
      choiceOfLaw: [''],
      
      
      
      riCondition: [''],

      underwritingRequirements: [''],
      
      subjectivities: [''],
      exclusion: [''],
      file: []
    });
  }

  ngOnInit(): void {
    this.getTypesInfo()
  }

  getTypesInfo() {
    this.submissionService.getSubmissionTypes().subscribe(resp => {
      this.typesDeatails = resp;
      this.facTypes = resp.map(item => item.facType).map((item: string) => ({
        value: item,
        label: item
      }));
    });
    this.facultativeSubmissionService.getLineOfBusinessTypes().subscribe(resp => {
      this.lobTypes = resp.map((item) => ({
        value: item.id,
        label: item.type
      }));
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
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

  fileUploaded(uploadedFiles: File[]) {
    this.form.get('file')?.setValue(uploadedFiles);
  }

  touched(controlName: string) {
    return this.form.get(controlName)?.touched;
  }
}
