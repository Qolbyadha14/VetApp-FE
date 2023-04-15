import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentSearch, AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  search: AppointmentSearch = {};
  isLoading = false;


  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments(this.search).subscribe((appointments: any) => {
      console.log(appointments.data);
      this.appointments = appointments.data;
      this.isLoading = false;

    });
  }
}
