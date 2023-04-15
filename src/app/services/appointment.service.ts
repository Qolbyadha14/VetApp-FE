import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface Appointment {
  id: number;
  dateTime: string;
  pet: {
    id: number;
    name: string;
    ownerName: string;
    preferredContactDetails: string;
  };
}

export interface AppointmentSearch {
  date?: Date;
  petName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiUrl + '/Appointment';

  constructor(private http: HttpClient) {}

  getAppointments(search: AppointmentSearch, pageNumber = 1, pageSize = 10): Observable<Appointment[]> {
    const params: any = {
      pageNumber,
      pageSize,
    };

    if (search.date) {
      params.date = search.date.toISOString();
    }

    if (search.petName) {
      params.petName = search.petName;
    }

    return this.http.get<Appointment[]>(this.apiUrl, { params });
  }
}
