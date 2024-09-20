import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseUrl: string = 'https://staffleavemmanagement-default-rtdb.firebaseio.com'; 
  private leavePath: string = 'staffleavedata';
  constructor(private http: HttpClient) {}
  
  
  getLeaves(): Observable<any[]> {
    const department = localStorage.getItem('userDepartment');
    const username = localStorage.getItem('username');
  
    return this.http.get<any[]>(`${this.baseUrl}/${this.leavePath}.json`).pipe(
      map(leaves => {
        if (!leaves) {
          return [];
        }
  
        const leavesArray = Object.values(leaves);
        if (department) {
          return leavesArray.filter(leave => leave.userDepartment === department && leave.username === username);
        }
        return leavesArray;
      })
    );
  }
// Apply new leave
  applyLeave(leave: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${this.leavePath}.json`, leave);
  }

  getStaffCount(): Observable<number> {
    const department = localStorage.getItem('userDepartment');
    return this.http.get<{ [key: string]: any }>(`${this.baseUrl}/users.json`).pipe(
      map(users => {
        const staffUsers = Object.values(users || {}).filter((user: any) => 
          user.role === 'Staff' && user.department === department
        );
        return staffUsers.length; 
      })
    );
  }
  

  getStaffList(page: number, pageSize: number): Observable<any> {
    const department = localStorage.getItem('userDepartment'); 

    return this.http.get<{ [key: string]: any }>(`${this.baseUrl}/users.json`).pipe(
      map(users => {
        const filteredUsers = Object.entries(users || {}).filter(([key, user]: [string, any]) => 
          user.role === 'Staff' && user.department === department
        );

        const total = filteredUsers.length; 
        const paginatedUsers = filteredUsers
          .slice((page - 1) * pageSize, page * pageSize) 
          .map(([id, user]) => ({ id, ...user })); 

        return {
          staff: paginatedUsers,  
          total                    
        };
      })
    );
  }


deleteStaff(staffId: string): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/users/${staffId}.json`);
}

}
