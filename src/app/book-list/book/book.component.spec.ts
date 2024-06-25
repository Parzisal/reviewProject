import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let debugElement: DebugElement;

  const mockBook: Book = {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    publishedDate: '2020-01-01',
    isbn: '1234567890'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BookComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.book = mockBook;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display book details', () => {
    const titleElement = debugElement.query(By.css('h3')).nativeElement;
    const authorElement = debugElement.queryAll(By.css('p'))[0].nativeElement;
    const dateElement = debugElement.queryAll(By.css('p'))[1].nativeElement;
    const isbnElement = debugElement.queryAll(By.css('p'))[2].nativeElement;
    
    expect(titleElement.textContent).toContain('Book 1');
    expect(authorElement.textContent).toContain('Author 1');
    expect(dateElement.textContent).toContain('2020-01-01');
    expect(isbnElement.textContent).toContain('1234567890');
  });
  it('should emit delete event when delete button is clicked', () => {
    jest.spyOn(component.delete, 'emit');
    const button = debugElement.queryAll(By.css('button'))[1].nativeElement;
    button.click();
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });
 
});
