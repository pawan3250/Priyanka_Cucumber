import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BlogPage } from '../pages/Blog.page';
import { CustomWorld } from '../support/world';

let blogPage: BlogPage;

