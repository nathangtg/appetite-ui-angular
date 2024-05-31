import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  @Output() imageChange = new EventEmitter<File>();

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitImage() {
    if (this.selectedFile) {
      this.imageChange.emit(this.selectedFile);
    }
  }
}
