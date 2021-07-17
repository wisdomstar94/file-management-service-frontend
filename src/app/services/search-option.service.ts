import { Injectable } from '@angular/core';
import { SearchOption } from '../interfaces/search-option.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchOptionService {
  searchOption: SearchOption = {
    companySearchItemList: [],
    fileSearchItemList: [],
    permissionGroupSearchItemList: [],
    userSearchItemList: [],
  };

  constructor() { 

  }
}
