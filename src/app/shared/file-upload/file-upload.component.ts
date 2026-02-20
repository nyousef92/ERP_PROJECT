import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const FILE_ICON_MAP: Record<string, string> = {
  PDF:  'picture_as_pdf',
  DOCX: 'description',
  DOC:  'description',
  XLSX: 'table_chart',
  XLS:  'table_chart',
  PNG:  'image',
  JPG:  'image',
  JPEG: 'image',
  ZIP:  'folder_zip',
};

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() maxFiles: number = 5;
  @Input() maxSizeMB: number = 5;

  @Input() set acceptedTypes(types: string[]) {
    this._acceptedTypes = types.map(t => t.toUpperCase());
    this._accept = types.map(t => `.${t.toLowerCase()}`).join(',');
  }
  get acceptedTypes(): string[] { return this._acceptedTypes; }
  get accept(): string { return this._accept; }

  private _acceptedTypes: string[] = ['PDF', 'DOCX', 'XLSX'];
  private _accept: string = '.pdf,.docx,.xlsx';

  @Output() filesChange = new EventEmitter<File[]>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  files: File[] = [];
  isDragOver = false;
  errorMessage: string = '';

  open(): void {
    this.fileInput.nativeElement.click();
  }

  private onChange = (_: File[]) => {};
  onTouched = () => {};

  writeValue(files: File[]): void {
    this.files = files || [];
  }

  registerOnChange(fn: (files: File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
      input.value = '';
    }
  }

  addFiles(fileList: FileList): void {
    this.errorMessage = '';
    for (const file of Array.from(fileList)) {
      const ext = this.getExtension(file);
      if (!this._acceptedTypes.includes(ext)) {
        this.errorMessage = `"${file.name}" is not an accepted file type.`;
        continue;
      }
      if (this.files.length >= this.maxFiles) {
        this.errorMessage = `Max ${this.maxFiles} files allowed.`;
        break;
      }
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        this.errorMessage = `"${file.name}" exceeds ${this.maxSizeMB} MB.`;
        continue;
      }
      this.files = [...this.files, file];
    }
    this.onChange(this.files);
    this.filesChange.emit(this.files);
  }

  removeFile(index: number): void {
    this.files = this.files.filter((_, i) => i !== index);
    this.errorMessage = '';
    this.onChange(this.files);
    this.filesChange.emit(this.files);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  getExtension(file: File): string {
    return file.name.split('.').pop()?.toUpperCase() ?? '';
  }

  getFileIcon(file: File): string {
    return FILE_ICON_MAP[this.getExtension(file)] ?? 'insert_drive_file';
  }
  
}
