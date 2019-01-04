import { Component, OnInit } from '@angular/core';
import { LandingService } from './landing.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  title:string;
  description:string;

  constructor(public landingService : LandingService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.landingService.addPost(form.value.title, form.value.description);
    form.resetForm();
  }

}
