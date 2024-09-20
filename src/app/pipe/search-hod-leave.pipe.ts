import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHodLeave'
})
export class SearchHodLeavePipe implements PipeTransform {

  transform(leavesList: any[], searchTerm: string, selectedStatus: string): any[] {
    if (!leavesList) {
      return [];
    }

    let filteredList = leavesList;
    if (selectedStatus) {
      filteredList = filteredList.filter(leave => leave.status === selectedStatus);
    }

    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      filteredList = filteredList.filter(leave =>
        leave.UserFullName.toLowerCase().includes(searchTerm) ||
        leave.reason.toLowerCase().includes(searchTerm) ||
        leave.fromDate.toLowerCase().includes(searchTerm) ||
        leave.toDate.toLowerCase().includes(searchTerm) ||
        leave.status.toLowerCase().includes(searchTerm)  ||
        leave.userDepartment.toLowerCase().includes(searchTerm) 
      );
    }

    return filteredList;
  }
}
