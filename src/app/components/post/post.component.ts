import {Component, OnInit, Input} from '@angular/core';
import {CommonService} from '../../services/common.service';



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
  public date = '';

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.getUsernameByAuthorIdNew(this.post.author_id)
    this.getDatePost(this.post)
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

  getDatePost (post: any) {
    this.date = this.commonService.getPostCreatedDate(post)
    console.log(this.date)
  }


}
