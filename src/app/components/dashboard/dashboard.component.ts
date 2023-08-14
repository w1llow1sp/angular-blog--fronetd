import { Component ,OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];
  constructor(private postService:PostService) {}
  ngOnInit() {
    this.getPosts()
  }
  getPosts() {
    this.postService.getAllPost().subscribe({
      next:(result:any) => {
        this.posts = result['data'];
        console.log(this.posts)
      }
    })
  }

}
