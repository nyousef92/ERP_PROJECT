import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dependantOn(dependantOn: string,depndeeFieldLabel:string): ValidatorFn {
    return (control: AbstractControl) => {
        if (!dependantOn) { return null };
        const form = control.parent;
        if (!form) { return null };
        const dependantControl = form.get(dependantOn);
        if (!dependantControl) { return null }
        if (!dependantControl.value) {
            return {dependantOn:{depndeeFieldLabel:depndeeFieldLabel}}
        }
        return null;
    }

}