import { ChangeDetectorRef, Component, OnInit, signal, inject, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql, useQuery } from '@apollo/client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphqlServiceService } from '../graphql-service.service';

//for rxjs changeDetectorRef


interface user {
  user_id: string,
  username: string,
  password: string,
  age: number,
  description: string
}

@Component({
  selector: 'app-show-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './show-data.component.html',
  styleUrl: './show-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowDataComponent implements OnInit {

  private graphqlService = inject(GraphqlServiceService);
  //singal work!
  //getdata = this.graphqlService.allUsers;

  getdata: user[] = [];


  inputValue: String = '';
  userCreateFlg = false;

  //forrxjs
  private cdRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  //pipe
  users$ = this.graphqlService.users$;
  
  
  //User Input
  username = "";
  password = "";
  age!: number;
  description = "";

  error: any;
  getMovie: any[] = [];
  errorMovie: any;
  getNewUser: any[] = [];
  errorNewUser: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {

    const subscription = this.graphqlService.users$.subscribe((data) => {
      this.getdata = data;
      this.cdRef.markForCheck();
    });
    this.destroyRef.onDestroy(()=> {
      subscription.unsubscribe();
    });
/*    this.apollo
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
        this.getdata = data.users;
        this.error = error;
      });

    console.log('Data:' + this.getdata);*/
  }
/*
  SearchName() {
    this.apollo
      .watchQuery({
        query: gql`
          query User($userId: ID) {
            user(id: $userId) {
              username
              user_id
            }
          }
        `,
        variables: {
          userId: this.inputValue,
        },
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.getMovie = data.user;
        this.errorMovie = error;
      });
  }*/

  CreateUser() {
    const newUser: user = {
      username: this.username,
      password: this.password,
      age: this.age,
      description: this.description,
      user_id: '0'
    };

    this.graphqlService.createUser(newUser);
    console.log("create sucessful");
    /*
    this.apollo.mutate({
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
          "username": this.username,
          "password": this.password,
          "age": this.age,
          "description": this.description
        },
      },
    })
    .subscribe(({ data, error }: any) => {
     
      if (data != null ) this.userCreateFlg = true;

      this.getNewUser = data.createUser;
      this.errorNewUser = error;
    });

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
        data = {
          users: [
          {
            user_id: "1",
            username: "hello",
            password: "hello",
            age: 5,
            description: "text"
          }
        ]
        };
        this.getdata = data;
        this.error = error;
      });

    console.log('Data:' + this.getdata);*/
  }
}
