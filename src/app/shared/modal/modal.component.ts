import { Component, ViewChild, ViewContainerRef, Type, ComponentRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnDestroy {

  isOpen = false;

  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  private container!: ViewContainerRef;

  private componentRef: ComponentRef<any> | null = null;

  open<T>(component: Type<T>, inputs?: Record<string, any>): void {
    this.container.clear();
    this.componentRef = this.container.createComponent(component);
    const instance = this.componentRef.instance as any;
    instance['close'] = () => this.close();
    if (inputs) {
      Object.assign(instance, inputs);
    }
    this.componentRef.changeDetectorRef.detectChanges();
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
    this.container.clear();
    this.componentRef = null;
  }

  ngOnDestroy(): void {
    this.container?.clear();
  }

}
