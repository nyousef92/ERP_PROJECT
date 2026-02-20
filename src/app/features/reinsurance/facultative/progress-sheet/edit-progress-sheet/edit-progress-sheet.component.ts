import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ProgressSheetService } from '@core/services/progress.service';
import { HelperService } from '@core/services/helper.service';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { InputFieldTextareaComponent } from '@shared/input-field-text-area/input-field-text-area.component';
import { SelectDropdownComponent } from '@shared/select-dropdown/select-dropdown.component';
import { ModalComponent } from '@shared/modal/modal.component';
import { EditReinsuranceComponent } from '../view-facultative-progress-sheet/edit-reinsurance/edit-reinsurance.component';

@Component({
  selector: 'app-edit-progress-sheet',
  imports: [ReactiveFormsModule, InputFieldComponent, InputFieldTextareaComponent, SelectDropdownComponent, ModalComponent],
  templateUrl: './edit-progress-sheet.component.html'
})
export class EditProgressSheetComponent implements OnInit {

  @Input() progressSheet: any;
  close!: () => void;
  onSaved?: (data: any) => void;

  @ViewChild(ModalComponent) reinsurerModal!: ModalComponent;

  form!: FormGroup;
  lobList: any[] = [];
  cedantList: any[] = [];
  reinsurers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private progressSheetService: ProgressSheetService
  ) {}

  ngOnInit(): void {
    forkJoin({
      lobList: this.progressSheetService.getLOBList(),
      cedantList: this.progressSheetService.getCedantList()
    }).subscribe(({ lobList, cedantList }) => {
      this.lobList = lobList;
      this.cedantList = cedantList;
      this.reinsurers = [...(this.progressSheet?.reinsurers ?? [])];
      this.form = this.fb.group({
       refNo:       [this.progressSheet?.refNo       ?? ''],
        cedant:        [this.progressSheet?.cedant        ?? '', Validators.required],
        lob:           [this.progressSheet?.lob           ?? '', Validators.required],
        rate:          [this.progressSheet?.rate          ?? ''],
        commission:    [this.progressSheet?.commission    ?? ''],
        siLol:         [this.progressSheet?.siLol         ?? ''],
        inceptionDate: [this.toIsoDate(this.progressSheet?.inceptionDate)],
        receiptDate:   [this.toIsoDate(this.progressSheet?.receiptDate)],
        notes:         [this.progressSheet?.notes         ?? ''],
      });
    });
  }

  private toIsoDate(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    return dateStr;
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
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
