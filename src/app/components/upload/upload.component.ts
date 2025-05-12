import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-upload',
  imports: [
    MatIcon, FormsModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  file?: File;

  @Output()
  selectedFile= new EventEmitter<File |null>();


  onFileChange(event:any) {
    this.file = event.target.files[0];
    this.selectedFile.emit(this.file);
  }
}

