import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly restApiUrl = 'http://localhost:5000/api/books'; // Placeholder REST API URL
  private readonly graphqlApiUrl = 'http://localhost:5000/graphql'; // Placeholder GraphQL API URL

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.restApiUrl);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.restApiUrl}/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.restApiUrl, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.restApiUrl}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.restApiUrl}/${id}`);
  }

  // GraphQL methods (example for fetching books)
  getBooksGraphql(): Observable<any> {
    const query = `{
      books {
        id
        title
        author
        publishedDate
        isbn
      }
    }`;
    return this.http.post<any>(this.graphqlApiUrl, { query });
  }
}
