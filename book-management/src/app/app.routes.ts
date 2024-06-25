import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';

export const routes: Routes = [
    { path: '', component: BookListComponent },
    { path: 'add', component: BookFormComponent },
    { path: 'edit/:id', component: BookFormComponent }
];
