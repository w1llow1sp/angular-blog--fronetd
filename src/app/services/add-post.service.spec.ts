import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';

describe('AddPostService', () => {
  let service: AddPostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AddPostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('addPost', () => {
    it('should add a post', () => {
      const post = new Post('Title', 'Text');
      service.addPost(post).subscribe(res => {
        expect(res).toEqual(post);
      });
      const req = httpMock.expectOne('/api/post/createPost');
      expect(req.request.body).toEqual({
        title: 'Title',
        text: 'Text',
        author_id: 1,
        date: post.date
      });
      req.flush(post);
    });

    it('should handle error', () => {
      const post = new Post('Title', 'Text'  );
      service.addPost(post).subscribe(res => {}, err => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne('/api/post/createPost');
      req.flush('Error', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updatePost', () => {
    // Тесты для updatePost()
  });

  describe('deletePost', () => {
    // Тесты для deletePost()
  });
});
