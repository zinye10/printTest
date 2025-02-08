import { Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { gql, useQuery } from '@apollo/client';

import {BehaviorSubject} from 'rxjs';

interface user {
  user_id: string;
  username: string;
  password: string;
  age: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class GraphqlServiceService {
  users$ = new BehaviorSubject<user[]>([]);

  private usersData = signal<user[]>([]);
  allUsers = this.usersData.asReadonly();

  constructor(private apollo: Apollo) {
    this.getAllUser();
  }

  getAllUser() {
    this.apollo
      .watchQuery({
        query: gql`
          query Users {
            users {
              user_id
              username
            }
          }
        `,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.usersData.set(data.users);

        //rxjs
        this.users$.next(data.users);
      });
  }

  createUser(input_user: user) {
    this.apollo
      .mutate({
        mutation: gql`
          mutation createUser($inputUser: CreateUserInput) {
            createUser(input: $inputUser) {
              age
              username
              user_id
            }
          }
        `,
        variables: {
          inputUser: {
            username: input_user.username,
            password: input_user.password,
            age: input_user.age,
            description: input_user.description,
          },
        },/*
        refetchQueries:
        {

        }*/
      })
      .subscribe(({ data, error }: any) => {
        if (data != null)
        this.usersData.update((prevData) =>[...prevData, data.createUser]);
      });
  }
}
