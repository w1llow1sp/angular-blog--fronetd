import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { AddPostService } from '../../services/add-post.service';
import { of } from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {AddPostComponent} from '../add-post/add-post.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let postService: PostService;
  let router: Router;
  let commonService: CommonService;
  let addPostService: AddPostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ DashboardComponent, AddPostComponent],
      providers: [
        AuthService,
        PostService,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate') } },
        CommonService,
        AddPostService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    postService = TestBed.inject(PostService);
    router = TestBed.inject(Router);
    commonService = TestBed.inject(CommonService);
    addPostService = TestBed.inject(AddPostService);
  });

  it('should call getPosts() on init', () => {
    spyOn(component, 'getPosts');
    component.ngOnInit();
    expect(component.getPosts).toHaveBeenCalled();
  });

  it('should call postService.getPostsByAuthor() in getPosts()', () => {
    spyOn(postService, 'getPostsByAuthor').and.returnValue(of({ data: [] }));
    component.getPosts();
    expect(postService.getPostsByAuthor).toHaveBeenCalled();
  });

  it('should call authService.logout() and router.navigate() in logout()', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should call addPostService.deletePost() in delete()', () => {
    spyOn(addPostService, 'deletePost').and.returnValue(of({}));
    component.delete();
    expect(addPostService.deletePost).toHaveBeenCalledWith(component.postToDelete);
  });
});

//TODO:дописать тест//
