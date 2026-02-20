import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileUploadComponent } from '@shared/file-upload/file-upload.component';

@Component({
  selector: 'app-progress-sheet-documents',
  imports: [FileUploadComponent],
  templateUrl: './progress-sheet-documents.component.html'
})
export class ProgressSheetDocumentsComponent {

  @Input() documents: any[] = [];
  @Output() uploaded = new EventEmitter<File[]>();

  activeTab: 'documents' | 'notes' | 'claims' = 'documents';

  setActiveTab(tab: 'documents' | 'notes' | 'claims') {
    this.activeTab = tab;
  }

  uploadDocument(files: File[]) {
    this.uploaded.emit(files);
  }
}
