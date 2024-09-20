import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSaffLeave'
})
export class SearchSaffLeavePipe implements PipeTransform {

  transform(leaves: any[], searchTerm: string, selectedStatus: string): any[] {
    if (!leaves) return [];
    let filteredLeaves = selectedStatus
      ? leaves.filter(leave => leave.status === selectedStatus)
      : leaves;

    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();

      filteredLeaves = filteredLeaves.filter(leave =>
        Object.values(leave).some(field => {
          if (field !== null && field !== undefined) {
            return field.toString().toLowerCase().includes(searchTerm);
          }
          return false;
        })
      );
    }

    return filteredLeaves;
  }
}
