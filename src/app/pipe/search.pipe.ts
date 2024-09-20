import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(staffList: any[], searchTerm: string): any[] {
    if (!staffList || !searchTerm) {
      return staffList;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    return staffList.filter(staff => 
      staff.name.toLowerCase().includes(searchTerm) ||
      staff.username.toLowerCase().includes(searchTerm) ||
      staff.email.toLowerCase().includes(searchTerm) ||
      staff.contactNumber.toLowerCase().includes(searchTerm) ||
      staff.department.toLowerCase().includes(searchTerm)
    );
  }

}
