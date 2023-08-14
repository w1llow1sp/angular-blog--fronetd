import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts: any[] = [];
  username = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    private postService: PostService,
    private localStore:LocalStorageService) {
  }

  logout() {
    this.authService.logout()
    this.router.navigate([''])
  }

  getPosts() {
    this.postService.getAllPost().subscribe({
      next: (result: any) => {
        this.posts = result['data'];
        console.log(this.posts)
      }
    })
  }

  parseUsername() {
    return this.username = this.localStore.getDataFromLocalStorage('username').replace(/"/g, '')
  }

  ngOnInit() {
    this.getPosts();
    this.parseUsername()
  }

}
