import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public postAdded_Observable = new Subject();
  public postToAdd_Observable = new Subject();
  public postToEdit_Observable = new Subject();
  public postToDelete_Observable = new Subject();
  public postToAddAuthor_Observable = new Subject()


  postToEdit: Post = new Post('', '');
  postToDelete: Post = new Post('', '');
  postToAddAuthor: Post = new Post('', '');


  constructor(
    private localStorageService: LocalStorageService
  ) {

  }

  notifyPostAddition(msg: string) {
    this.postAdded_Observable.next(msg);
  }

  notifyPostEdit(msg: string) {
    this.postToEdit_Observable.next(msg);
  }
  notifyPostAuthor(msg:string) {
    this.postToAddAuthor_Observable.next(msg)
  }

  setPostToEdit(post: any) {
    this.postToEdit = new Post(post.title, post.text);
    this.postToEdit.setId(post._id);
    this.notifyPostEdit('');
  }

  notifyPostToAdd(msg: string) {
    this.postToAdd_Observable.next(msg);
  }

  setPostToAdd() {
    this.postToEdit = new Post('', '');
    this.postToEdit.setId('');
    this.notifyPostToAdd('');
  }
  notifyPostDelete(msg: string) {
    this.postToDelete_Observable.next(msg);
  }
  setPostToDelete(post: any) {
    this.postToDelete = new Post('', '');
    this.postToDelete.setId(post._id);
    this.notifyPostDelete('');
  }
  getUsernameByAuthorId(authorId:string) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (currentUser.id === authorId) {
      return 'You';
    }
    const data = JSON.parse(this.localStorageService.getDataFromLocalStorage('data'));
    const author = data.find((item: any) => item.id === authorId);
    return author ? author.username.toString() : '';
  }
  getPostCreatedDate(post: any) {
    return post.date
  }


}

