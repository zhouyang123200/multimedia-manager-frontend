import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from '../services/file-upload.service'
import { map, tap, catchError, timestamp, last } from 'rxjs/operators';

interface FileUploadInfo {
  fileObj: File,
  percent: number,
  uploaded: boolean,
  timestamp: string
}

@Component({
  selector: 'app-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.css']
})
export class VideoUploaderComponent implements OnInit {

  closeResult: string;
  @Input()id: number;
  myForm: FormGroup;
  videoUrl: string = 'http://localhost/api/videos';
  videoUploadInfo: FileUploadInfo = {
    fileObj: null,
    percent: 0,
    uploaded: false,
    timestamp: ''
  };
  imageUploadInfo: FileUploadInfo = {
    fileObj: null,
    percent: 0,
    uploaded: false,
    timestamp: ''
  };

  // states
  imageSelected: boolean = false;
  videoSelected: boolean = false;


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
      title: '',
      description: '',
    });
  }

  private submitForm() {
    console.log(this.myForm.value.password);
    // send form request
    const data = {
      'title': this.myForm.value.title,
      'description': this.myForm.value.description,
      'video_name': this.videoUploadInfo.fileObj.name,
      'video_num': this.videoUploadInfo.timestamp,
      'image_name': this.imageUploadInfo.fileObj.name,
      'image_num': this.imageUploadInfo.timestamp
    }
    this.http.post(this.videoUrl, data).subscribe((rep) => {
      console.log(rep);
    })
    this.activeModal.close(this.myForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  videoFileChange(files: [File]) {
    if (files && files[0]) {
      this.videoSelected = true;
      this.videoUploadInfo.fileObj = files[0];
    } else {
      this.videoSelected = false;
      this.videoUploadInfo.fileObj = null;
    }
  }

  imageFileChange(files: [File]) {
    if (files && files[0]) {
      this.imageSelected = true;
      this.imageUploadInfo.fileObj = files[0];
    } else {
      this.imageSelected = false;
      this.imageUploadInfo.fileObj = null; 
    }
  }

  uploadAllFiles(): void {
    if (this.videoUploadInfo.fileObj) {
      this.fileUploader.upload(this.videoUploadInfo.fileObj,
         'http://localhost/api/files').pipe(
            map(evt => this.uploadEventMsg(evt, this.videoUploadInfo)),
            tap(msg => console.log(msg)),
            last()
         ).subscribe(ret => this.videoUploadInfo.timestamp = ret.timestamp);
    }  
    if (this.imageUploadInfo.fileObj) {
      this.fileUploader.upload(this.imageUploadInfo.fileObj,
        'http://localhost/api/files').pipe(
          map(evt => this.uploadEventMsg(evt, this.imageUploadInfo)),
          tap(msg => console.log(msg)),
          last()
        ).subscribe(ret => this.imageUploadInfo.timestamp = ret.timestamp);
    }
  }

  private uploadEventMsg(event: HttpEvent<any>, fileInfo: FileUploadInfo) {
    switch(event.type) {
      case HttpEventType.Sent:
        return `Uploading file: ${fileInfo.fileObj.name} ${fileInfo.fileObj.size}`;
      case HttpEventType.UploadProgress:
        fileInfo.percent = Math.round(100 * event.loaded / event.total);
        return `File "${fileInfo.fileObj.name}" is ${fileInfo.percent}% uploaded.`;
      case HttpEventType.Response:
        fileInfo.uploaded = true;
        console.log(`File "${fileInfo.fileObj.name}" was completely uploaded!`);
        return event.body;
      default:
        return `File "${fileInfo.fileObj.name}" surprising upload event: ${event.type}.`;
    }
  }
}
