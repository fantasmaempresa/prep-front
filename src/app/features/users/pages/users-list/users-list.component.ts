import { Component, OnInit } from '@angular/core';
import { VIEW_CLAZZ } from "o2c_core";
import { Promoter } from "../../../../data/models/Promoter.model";
import { User } from "../../../../data/models/User.model";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [{ provide: VIEW_CLAZZ, useValue: User }],
})
export class UsersListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
