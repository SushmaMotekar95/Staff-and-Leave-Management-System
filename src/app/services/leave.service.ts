import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private baseUrl: string = 'https://staffleavemmanagement-default-rtdb.firebaseio.com'; 
  private leavePath: string = 'staffleavedata';
  constructor(private http: HttpClient) {}

  // Fetch all leave applications for HOD
 // Get leaves from Firebase
 getLeaves(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/${this.leavePath}.json`);
}

  // View detailed leave information
  getLeaveById(leaveId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${leaveId}`);
  }

   // Approve leave by updating the status
   approveLeave(leaveId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.leavePath}/${leaveId}.json`, { status: 'Approved' });
  }

  // Reject leave by updating the status
  rejectLeave(leaveId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.leavePath}/${leaveId}.json`, { status: 'Rejected' });
  }
}
