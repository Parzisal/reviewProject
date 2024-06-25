import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
      isbn: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe((book: Book) => {
        this.bookForm.patchValue(book);
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const book: Book = this.bookForm.value;
      if (this.bookId) {
        book.id = this.bookId;
        this.bookService.updateBook(book).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.bookService.addBook(book).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
