import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { BookComponent } from './book/book.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'auth',  component: AuthComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, pathMatch: 'full', canActivate: [ authGuard ] },
  { path: 'book',  component: BookComponent, pathMatch: 'full' },
  { path: '**',     component: AuthComponent, pathMatch: 'full' },
];
