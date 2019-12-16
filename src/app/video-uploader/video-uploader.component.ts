import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  // states
  imageSelected: boolean = false;
  videoSelected: boolean = false;
  imageUploaded: boolean = false;
  videoUploaded: boolean = true;


  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private http: HttpClient 
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

  fileChangeEvent(event: any) {
    let files = event.target.files
    if (files && files[0]) {
      const file: File = files[0];
      const req = new HttpRequest('POST', 'http://localhost:4200/api/files',
        file.slice(), { reportProgress: true }
      )
      this.http.request(req).subscribe((data: any) => {
        console.log(data);
      })
    }
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
}
