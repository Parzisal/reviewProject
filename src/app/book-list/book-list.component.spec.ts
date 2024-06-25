import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { BookComponent } from './book/book.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookService: BookService;

  const mockBooks: Book[] = [
    { id: 1, title: 'Book 1', author: 'Author 1', publishedDate: '2020-01-01', isbn: '1234567890' },
    { id: 2, title: 'Book 2', author: 'Author 2', publishedDate: '2021-01-01', isbn: '0987654321' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BookListComponent, 
        BookComponent       
      ],
      providers: [BookService]
    }).compileComponents();

    bookService = TestBed.inject(BookService);
    jest.spyOn(bookService, 'getBooks').mockReturnValue(of(mockBooks));
    jest.spyOn(bookService, 'deleteBook').mockReturnValue(of(undefined));

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of books', () => {
    const bookElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-book'));
    expect(bookElements.length).toBe(2);
  });

  it('should call deleteBook method when delete event is emitted', () => {
    component.deleteBook(1);
    expect(bookService.deleteBook).toHaveBeenCalledWith(1);
  });
});

