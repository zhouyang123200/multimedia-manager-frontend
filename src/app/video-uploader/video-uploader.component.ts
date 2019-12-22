import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from '../services/file-upload.service'
import { map, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.css']
})
export class VideoUploaderComponent implements OnInit {

  closeResult: string;
  @Input()id: number;
  myForm: FormGroup;
  videoFile: File;
  imageFile: File;
  videoUploadPercent: number = 0;
  imageUploadPercent: number = 0;
  vieoTimestamp: string;
  imageTimestamp: string;

  // states
  imageSelected: boolean = false;
  videoSelected: boolean = false;
  imageUploaded: boolean = false;
  videoUploaded: boolean = false;


  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private fileUploader: FileUploadService 
              ) {
                this.createForm();
               }

  ngOnInit() {
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  private submitForm() {
    console.log(this.myForm.value.password);
    this.activeModal.close(this.myForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  videoFileChange(files: [File]) {
    if (files && files[0]) {
      this.videoSelected = true;
      this.videoFile = files[0];
    } else {
      this.videoSelected = false;
      this.videoFile = null;
    }
  }

  imageFileChange(files: [File]) {
    if (files && files[0]) {
      this.imageSelected = true;
      this.imageFile = files[0];
    } else {
      this.imageSelected = false;
      this.imageFile = null;
    }
  }

  uploadAllFiles(): void {
    if (this.videoFile) {
      this.fileUploader.upload(this.videoFile,
         'http://localhost:4200/api/files').pipe(
            map(evt => this.uploadEventMsg(evt, this.videoFile)),
            tap(msg => console.log(msg))
         ).subscribe();
    }  
  }

  private uploadEventMsg(event: HttpEvent<any>, file: File) {
    switch(event.type) {
      case HttpEventType.Sent:
        return `Uploading file: ${file.name} ${file.size}`;
      case HttpEventType.UploadProgress:
        this.videoUploadPercent = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${this.videoUploadPercent }% uploaded.`;
      case HttpEventType.Response:
        this.videoUploaded = true;
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}
