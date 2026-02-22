import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PlacementService } from '@core/services/placement.service';
import { HelperService } from '@core/services/helper.service';
import { InputFieldComponent } from '@shared/input-field/input-field.component';
import { SelectDropdownComponent } from '@shared/select-dropdown/select-dropdown.component';
import { SharedService } from '@core/services/shared.service';

interface Security {
  security: string;
  share: string;
  riRate: string;
  riPremium: string;
  riComm: string;
  riTax: string;
  netRiPremium: string;
}

@Component({
  selector: 'app-add-new-placement',
  imports: [ReactiveFormsModule, FormsModule, InputFieldComponent, SelectDropdownComponent],
  templateUrl: './add-new-placement.component.html'
})
export class AddNewPlacementComponent implements OnInit {

  close!: () => void;
  onSaved?: (data: any) => void;
  @Input() placement: any = null;

  form!: FormGroup;
  cedantList: any[] = [];
  reinsurerList: any[] = [];
  currencyList: any[] = [];
  securities: Security[] = [];

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private placementService: PlacementService,
    private shared:SharedService
  ) { }

  ngOnInit(): void {
    forkJoin({
      cedants: this.placementService.getCedantList(),
      reinsurers: this.placementService.getReinsurerList(),
      currencies: this.shared.getCurrencies(),
    }).subscribe(({ cedants, reinsurers, currencies }) => {
      this.cedantList = cedants;
      this.reinsurerList = reinsurers;
      this.currencyList = currencies;
      this.form = this.fb.group({
        refNo: [this.placement?.refNo ?? '', Validators.required],
        cedant: [this.placement?.cedant ?? '', Validators.required],
        status: [{ value: this.placement?.status ?? 'In Progress', disabled: true }],
        placementName: [this.placement?.placementName ?? ''],
        sumInsured: [this.placement?.sumInsured ?? ''],
        rate: [this.placement?.rate ?? ''],
        currency: [this.placement?.currency ?? 'USD'],
        grossPremium: [this.placement?.grossPremium ?? ''],
        cedingCommission: [this.placement?.cedingCommission ?? ''],
        uibShare: [this.placement?.uibShare ?? ''],
        netPremium: [this.placement?.netPremium ?? ''],
        npos: [this.placement?.npos ?? ''],
      });
      if (this.placement?.securities) {
        this.securities = [...this.placement.securities];
      }
    });
  }

  addSecurity(): void {
    this.securities = [...this.securities, {
      security: '', share: '', riRate: '', riPremium: '', riComm: '', riTax: '', netRiPremium: ''
    }];
  }

  removeSecurity(index: number): void {
    this.securities = this.securities.filter((_, i) => i !== index);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.onSaved?.({ ...this.form.getRawValue(), securities: this.securities });
    this.close();
  }

  onCancel(): void {
    this.close();
  }

  getError(controlName: string, label: string): string {
    return this.helper.getErrorsMessage(this.form, controlName, label);
  }
}
