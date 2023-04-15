import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Appointment, AppointmentSearch, AppointmentService, ApiResponse } from 'src/app/services/appointment.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, AfterViewInit {
  appointments: Appointment[] = [];
  dataSource!: ApiResponse;
  search: AppointmentSearch = {
    date: null,
    petName: '',
  };
  isLoading = false;
  currentPage = 0;
  pageSize = 10;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.page.subscribe((event: PageEvent) => {
          this.onPageChange(event);
        });
      }
    });
  }



  /*ngOnInit(): void {}*/

  /*ngAfterViewInit(): void {
    setTimeout(() => {
      this.fetchAppointments();
      if (this.paginator) {
        this.fetchAppointments(this.search, 1, this.paginator.pageSize);
        this.paginator.page.subscribe((event: PageEvent) => {
          this.onPageChange(event);
        });
      }
    });
  }*/


  fetchAppointments(search: AppointmentSearch = this.search, pageNumber: number = 1, pageSize: number = 10): void {
    this.isLoading = true;
    this.appointmentService.getAppointments(search, pageNumber, pageSize).subscribe(response => {
      this.appointments = response.data;
      this.dataSource = response;
      this.isLoading = false;
    });
  }

  getRowNumber(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }

  onPageChange(event: PageEvent) {
    const nextPageIndex = event.pageIndex;
    const currentPageIndex = this.dataSource?.page_number - 1 ?? 0;
    if (nextPageIndex === currentPageIndex) {
      this.pageSize = event.pageSize;
      this.fetchAppointments(this.search, this.currentPage + 1, event.pageSize);
    } else {
      this.currentPage = nextPageIndex;
      this.fetchAppointments(this.search, this.currentPage + 1, event.pageSize);
    }
  }
}
