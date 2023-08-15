import {Component, OnInit, Input} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {Post} from '../../models/post.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: any = {};
  @Input() read = true;
  @Input() admin = false;

  public authorName = '';

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.getUsernameByAuthorIdNew(this.post.author_id)
  }

  setPostToEdit(post: any) {
    this.commonService.setPostToEdit(post);
  }

  setPostToDelete(post: any) {
    this.commonService.setPostToDelete(post);
  }

  getUsernameByAuthorIdNew(id:string){
    this.authorName = this.commonService.getUsernameByAuthorId(id)
  }



}
