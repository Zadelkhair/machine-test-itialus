import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Category from '../types/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {

    //load categories
    this.loadCategories(() => {
      //some itemStyle
      this.itemStyle();
    });

  }

  loadCategories(fnl: any): void {

    this.categoryService.all().subscribe((categories) => {
      this.categories = categories;
      fnl();
    });

  }

  itemStyle(): void {
    $(function () {
      $('.close-btn').hover(function () {
        $(this).parents('.category-obj').addClass("category-obj-close-hover");
      },
        function () {
          $(this).parents('.category-obj').removeClass("category-obj-close-hover");
        });
    });

    $(function () {
      $('.edit-btn').hover(function () {
        $(this).parents('.category-obj').addClass("category-obj-edit-hover");
      },
        function () {
          $(this).parents('.category-obj').removeClass("category-obj-edit-hover");
        });
    });
  }

}
