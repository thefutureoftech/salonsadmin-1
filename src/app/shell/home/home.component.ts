import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD

=======
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

<<<<<<< HEAD
  events: any[];
  header: any;

  constructor() { }

  ngOnInit() {

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
  };

    this.events = [
      {
          "title": "All Day Event",
          "start": "2016-01-01"
      },
      {
          "title": "Long Event",
          "start": "2016-01-07",
          "end": "2016-01-10"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-09T16:00:00"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-16T16:00:00"
      },
      {
          "title": "Conference",
          "start": "2016-01-11",
          "end": "2016-01-13"
      }
  ];


=======
  constructor() { }

  ngOnInit() {
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
  }

}
