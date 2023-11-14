import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ProfileService {

  constructor(private api: ApiService) { }

  createUser(params){
    return this.api.createUser(params)
  }

  updateUser(params){
    return this.api.updateUser(params)
  }

  getUser(id){
    return this.api.getUser(id)
  }

  deleteUser(id){
    return this.api.deleteUser(id)
  }
}