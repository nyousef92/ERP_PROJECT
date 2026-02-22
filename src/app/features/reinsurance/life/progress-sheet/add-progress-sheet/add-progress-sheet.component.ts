import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ProgressSheetService } from '@core/services/progress.service';
import { HelperService } from '@core/services/helper.service';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { InputFieldTextareaComponent } from '@shared/input-field-text-area/input-field-text-area.component';
import { SelectDropdownComponent } from '@shared/select-dropdown/select-dropdown.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { EditReinsuranceComponent } from '../../../shared/edit-reinsurance/edit-reinsurance.component';
import { SharedService } from '@core/services/shared.service';

@Component({
  selector: 'app-add-progress-sheet',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    InputFieldTextareaComponent,
    SelectDropdownComponent,
    ModalComponent],
  templateUrl: './add-progress-sheet.component.html'
})
export class AddProgressSheetComponent implements OnInit {

  @Input() progressSheet: any;
  close!: () => void;
  onSaved?: (data: any) => void;

  @ViewChild(ModalComponent) reinsurerModal!: ModalComponent;

  form!: FormGroup;
  lobList: any[] = [];
  cedantList: any[] = [];
  currencyList: any[] = [];
  reinsurers: any[] = [];
  basicInfoSaved = false;

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private progressSheetService: ProgressSheetService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    forkJoin({
      lobList: this.progressSheetService.getLifeLOBList(),
      cedantList: this.progressSheetService.getLifeCedantList(),
      currencyList: this.shared.getCurrencies()
    }).subscribe(({ lobList, cedantList, currencyList }) => {
      this.lobList = lobList;
      this.cedantList = cedantList;
      this.currencyList = currencyList;
      console.log(this.progressSheet?.lob);

      this.form = this.fb.group({
        refNo: [this.progressSheet?.refNo ?? ''],
        lob: [this.progressSheet?.lob ?? '', Validators.required],
        cedant: [this.progressSheet?.cedant ?? '', Validators.required],
        siLol: [this.progressSheet?.siLol ?? ''],
        notes: [this.progressSheet?.notes ?? ''],
        inceptionDate: [this.helper.toIsoDate(this.progressSheet?.inceptionDate)],
        receiptDate: [this.helper.toIsoDate(this.progressSheet?.receiptDate)],
        currency: [this.progressSheet?.currency ?? '', Validators.required],
        rate: [this.progressSheet?.rate ?? ''],
        cedentRetention: [this.progressSheet?.cedentRetention ?? ''],
        freeCoverLimit: [this.progressSheet?.freeCoverLimit ?? ''],
        noOfInsured: [this.progressSheet?.noOfInsured ?? ''],
        orderHereon: [this.progressSheet?.orderHereon ?? ''],
        reinsuranceDetails: [this.progressSheet?.reinsuranceDetails ?? '']
      });
    });
  }

  saveBasicInfo(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.progressSheetService.addNewLifeProgressSheet(this.form.value).subscribe((result: any) => {
      this.form.get('refNo')?.setValue(result.refNo);
      this.basicInfoSaved = true;
    });
  }

  onSave(): void {
    this.onSaved?.({ ...this.form.value, reinsurers: this.reinsurers });
    this.close();
  }

  onCancel(): void {
    this.close();
  }

  addReinsurer(): void {
    this.reinsurerModal.open(EditReinsuranceComponent, {
      reinsurer: null,
      onSaved: (updated: any) => {
        this.reinsurers = [...this.reinsurers, updated];
      }
    });
  }

  editReinsurer(reinsurer: any, index: number): void {
    this.reinsurerModal.open(EditReinsuranceComponent, {
      reinsurer,
      onSaved: (updated: any) => {
        this.reinsurers = this.reinsurers.map((r, i) => i === index ? { ...r, ...updated } : r);
      },
      onDelete: () => {
        this.reinsurers = this.reinsurers.filter((_, i) => i !== index);
      }
    });
  }

  deleteReinsurer(index: number): void {
    this.reinsurers = this.reinsurers.filter((_, i) => i !== index);
  }

  getError(controlName: string, label: string): string {
    return this.helper.getErrorsMessage(this.form, controlName, label);
  }

  reinsurerName(r: any): string {
    return r?.name?.name || r?.name || '';
  }
}
