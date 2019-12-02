import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.css']
})
export class VideoUploaderComponent implements OnInit {

  closeResult: string;
  @Input()id: number;
  myForm: FormGroup;


  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
                this.createForm();
               }

  ngOnInit() {
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  private submitForm() {
    console.log(this.myForm.value.password);
    this.activeModal.close(this.myForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
