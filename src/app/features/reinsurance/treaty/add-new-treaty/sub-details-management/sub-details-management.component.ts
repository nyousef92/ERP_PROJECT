import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreatyService } from '@core/services/treaty.service';
import { ModalComponent } from '@shared/modal/modal.component';
import { ExcessManagementComponent } from '../excess-management/excess-management.component';

@Component({
  selector: 'app-sub-details-management',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './sub-details-management.component.html'
})
export class SubDetailsManagementComponent implements OnInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  treatyService = inject(TreatyService);
  fb = inject(FormBuilder);

  /** Companies list for the Company dropdown in each row */
  subDetailsCompanies: any[] = [];

  /** Injected by the modal host — closes the parent sub-details modal */
  close!: () => void;

  /**
   * Pre-existing sub-detail rows passed in from the parent reinsurer group.
   * The parent passes the current raw value array so we can pre-populate.
   */
  existingSubDetails: any[] = [];

  /**
   * Callback the parent provides. Called with the saved sub-detail rows
   * so the parent can write them back into its FormArray.
   */
  onSave!: (rows: any[]) => void;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({ rows: this.fb.array([]) });
    this.treatyService.getReInsurerenceSubDetailsCompanies().subscribe(resp => {
      this.subDetailsCompanies = resp;
    });
    // Pre-populate rows from whatever the parent already has
    this.existingSubDetails.forEach(row => this.rows.push(this.createRow(row)));
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  getRowGroup(index: number): FormGroup {
    return this.rows.at(index) as FormGroup;
  }

  getExcessArray(rowIndex: number): FormArray {
    return this.getRowGroup(rowIndex).get('excess') as FormArray;
  }

  getExcessCount(rowIndex: number): number {
    return this.getExcessArray(rowIndex).length;
  }

  addRow(): void {
    this.rows.push(this.createRow());
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  saveSubDetails(): void {
    if (this.onSave) {
      this.onSave(this.rows.getRawValue());
    }
    this.close();
  }

  onCancel(): void {
    this.close();
  }

  /** Opens ExcessManagementComponent nested modal for the given sub-detail row */
  AddExcess(rowIndex: number): void {
    const fb = this.fb;
    const excessArray = this.getExcessArray(rowIndex);
    const existingExcess = excessArray.getRawValue();

    this.modal.open(
      ExcessManagementComponent,
      {
        existingExcess,
        onSave: (rows: any[]) => {
          excessArray.clear();
          rows.forEach(row => {
            excessArray.push(fb.group({
              company: [row.company ?? ''],
              signedPct: [row.signedPct ?? ''],
              writtenPct: [row.writtenPct ?? ''],
              brokerPct: [row.brokerPct ?? ''],
              taxPct: [row.taxPct ?? ''],
              commPct: [row.commPct ?? ''],
              reason: [row.reason ?? ''],
              description: [row.description ?? '']
            }));
          });
        }
      },
      'lg',
      { disableBackdropClose: true }
    );
  }

  private createRow(data?: any): FormGroup {
    // Rebuild the excess FormArray from persisted data if any
    const excessArray = this.fb.array([] as FormGroup[]);
    if (data?.excess?.length) {
      data.excess.forEach((e: any) => {
        excessArray.push(this.fb.group({
          company: [e.company ?? ''],
          signedPct: [e.signedPct ?? ''],
          writtenPct: [e.writtenPct ?? ''],
          brokerPct: [e.brokerPct ?? ''],
          taxPct: [e.taxPct ?? ''],
          commPct: [e.commPct ?? ''],
          reason: [e.reason ?? ''],
          description: [e.description ?? '']
        }));
      });
    }

    return this.fb.group({
      company: [data?.company ?? '', Validators.required],
      signedPct: [data?.signedPct ?? ''],
      writtenPct: [data?.writtenPct ?? ''],
      brokerPct: [data?.brokerPct ?? ''],
      taxPct: [data?.taxPct ?? ''],
      commPct: [data?.commPct ?? ''],
      reason: [data?.reason ?? ''],
      description: [data?.description ?? ''],
      excess: excessArray
    });
  }
}
