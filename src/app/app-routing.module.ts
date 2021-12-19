import { ProductEditComponent } from './views/product-edit/product-edit.component';
import { ProductsComponent } from './views/products/products.component';
import { CategoryEditComponent } from './views/category-edit/category-edit.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product/:id',
    component: ProductEditComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'category/:id',
    component: CategoryEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
