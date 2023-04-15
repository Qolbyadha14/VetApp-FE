import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface Pet {
  id: number;
  name: string;
  ownerName: string;
  preferredContactDetails: string;
}

export interface Appointment {
  id: number;
  dateTime: string;
  pet: Pet;
}

export interface AppointmentSearch {
  date: Date | null,
  petName: string;
}

export interface ApiResponse {
  page_number: number;
  page_size: number;
  first_page: number;
  total_page: number;
  last_page: number;
  next_page: number;
  previous_page: number | null;
  total_record: number;
  data: Appointment[];
  code: number;
  succeeded: boolean;
  errors: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiUrl + '/Appointment';

  constructor(private http: HttpClient) {
  }

  getAppointments(search: AppointmentSearch, pageNumber = 1, pageSize = 10): Observable<ApiResponse> {
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

    return this.http.get<ApiResponse>(this.apiUrl, {params});
  }
}
