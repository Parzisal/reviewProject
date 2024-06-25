import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let bookService: BookService;

  const mockBook: Book = { id: 1, title: 'Book 1', author: 'Author 1', publishedDate: '2020-01-01', isbn: '1234567890' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BookFormComponent  // Importing the standalone component
      ],
      providers: [
        BookService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } }
          }
        }
      ]
    }).compileComponents();

    bookService = TestBed.inject(BookService);
    jest.spyOn(bookService, 'getBook').mockReturnValue(of(mockBook));
    jest.spyOn(bookService, 'addBook').mockReturnValue(of(mockBook));
    jest.spyOn(bookService, 'updateBook').mockReturnValue(of(mockBook));

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with book data when id is present', () => {
    expect(component.bookForm.value).toEqual({
      title: 'Book 1',
      author: 'Author 1',
      publishedDate: '2020-01-01',
      isbn: '1234567890'
    });
  });

  it('should call updateBook when form is submitted with an id', () => {
    component.bookForm.setValue({
      title: 'Updated Book',
      author: 'Updated Author',
      publishedDate: '2022-01-01',
      isbn: '1122334455'
    });
    component.bookId = 1;
    component.onSubmit();
    expect(bookService.updateBook).toHaveBeenCalledWith({
      id: 1,
      title: 'Updated Book',
      author: 'Updated Author',
      publishedDate: '2022-01-01',
      isbn: '1122334455'
    });
  });

  it('should call addBook when form is submitted without an id', () => {
    component.bookId = null;
    component.bookForm.setValue({
      title: 'New Book',
      author: 'New Author',
      publishedDate: '2022-01-01',
      isbn: '1122334455'
    });
    component.onSubmit();
    expect(bookService.addBook).toHaveBeenCalledWith({
      id: undefined,
      title: 'New Book',
      author: 'New Author',
      publishedDate: '2022-01-01',
      isbn: '1122334455'
    });
  });
});
