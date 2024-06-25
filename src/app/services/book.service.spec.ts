import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models/book.model';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch books', () => {
    const dummyBooks: Book[] = [
      {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        publishedDate: '2020-01-01',
        isbn: '1234567890',
      },
      {
        id: 2,
        title: 'Book 2',
        author: 'Author 2',
        publishedDate: '2021-01-01',
        isbn: '0987654321',
      },
    ];

    service.getBooks().subscribe((books) => {
      expect(books.length).toBe(2);
      expect(books).toEqual(dummyBooks);
    });

    const req = httpMock.expectOne(`${service['restApiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBooks);
  });
  it('should fetch a single book by id', () => {
    const dummyBook: Book = { id: 1, title: 'Book 1', author: 'Author 1', publishedDate: '2020-01-01', isbn: '1234567890' };

    service.getBook(1).subscribe(book => {
      expect(book).toEqual(dummyBook);
    });

    const req = httpMock.expectOne(`${service['restApiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBook);
  });

  it('should add a new book', () => {
    const newBook: Book = { id: 3, title: 'Book 3', author: 'Author 3', publishedDate: '2022-01-01', isbn: '1122334455' };

    service.addBook(newBook).subscribe(book => {
      expect(book).toEqual(newBook);
    });

    const req = httpMock.expectOne(`${service['restApiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush(newBook);
  });

  it('should update an existing book', () => {
    const updatedBook: Book = { id: 1, title: 'Updated Book', author: 'Updated Author', publishedDate: '2022-01-01', isbn: '1122334455' };

    service.updateBook(updatedBook).subscribe(book => {
      expect(book).toEqual(updatedBook);
    });

    const req = httpMock.expectOne(`${service['restApiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedBook);
  });
  it('should delete a book by id', () => {
    service.deleteBook(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service['restApiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should fetch books using GraphQL', () => {
    const dummyBooksGraphql = {
      data: {
        books: [
          { id: 1, title: 'Book 1', author: 'Author 1', publishedDate: '2020-01-01', isbn: '1234567890' },
          { id: 2, title: 'Book 2', author: 'Author 2', publishedDate: '2021-01-01', isbn: '0987654321' }
        ]
      }
    };

    service.getBooksGraphql().subscribe(result => {
      expect(result.data.books.length).toBe(2);
      expect(result.data.books).toEqual(dummyBooksGraphql.data.books);
    });

    const req = httpMock.expectOne(service['graphqlApiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(dummyBooksGraphql);
  });
});
