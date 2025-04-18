import { DetialsComponent } from './component/detials/detials.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { CartComponent } from './component/cart/cart.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';


import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ProductComponent } from './component/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { TestComponent } from './component/test/test.component';
import { OrderAddressComponent } from './component/order-address/order-address.component';
import { PaymentComponent } from './component/payment/payment.component';
import { VisaComponent } from './component/visa/visa.component';
import { CashComponent } from './component/cash/cash.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PersonalInfoComponent } from './component/personal-info/personal-info.component';
import { MyAddressComponent } from './component/my-address/my-address.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { ReturnsComponent } from './component/returns/returns.component';
import { ShippingComponent } from './component/shipping/shipping.component';
import { TermofuseComponent } from './component/termofuse/termofuse.component';
import { DataprivacyComponent } from './component/dataprivacy/dataprivacy.component';

import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './component/admin-page/products/products.component';
import { AddProductFormComponent } from './component/admin-page/AddProductForm/AddProductForm.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { colorsComponent } from './component/admin-page/colors/colors.component';
import { AddColorFormComponent } from './component/admin-page/AddColorForm/AddColorForm.component';
import { SizesComponent } from './component/admin-page/sizes/sizes.component';
import { AddSizeFormComponent } from './component/admin-page/AddSizeForm/AddSizeForm.component';
import { CategoriesComponent } from './component/admin-page/categories/categories.component';
import { AddCategoryFormComponent } from './component/admin-page/AddCategoryForm/AddCategoryFormcomponent';
import { SubCategoriesComponent } from './component/admin-page/subcategories/subcategories.component';
import { AddSubCategoryFormComponent } from './component/admin-page/AddSubCategoryForm/AddSubCategoryForm.component';


export const routes: Routes = [
  {

    path: '',
    // canActivate: [loginGuard],
    loadComponent: () =>
      import('./blank-layout/blank/blank.component').then(
        (m) => m.BlankComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./component/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'home',
      },
      {
        path: 'product/:name',
        loadComponent: () =>
          import('./component/product/product.component').then(
            (m) => m.ProductComponent
          ),
        title: 'product',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./component/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'cart',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./component/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'wishlist',
      },
      {

        path: 'order-address',
        loadComponent: () =>
          import('./component/order-address/order-address.component').then(
            (m) => m.OrderAddressComponent
          ),
        title: 'order-address',
      },
      {

        path:  'detials/:id',
        loadComponent: () =>
          import('./component/detials/detials.component').then(
            (m) => m.DetialsComponent
          ),
        title: 'details',
      },
      {
        path:'profile',
        component:ProfileComponent,
        children:
        [
          {path:'',pathMatch:'full',redirectTo:'personal-info'},
          {path:'personal-info',component:PersonalInfoComponent},
          {path:'my-address',component:MyAddressComponent},
          {path:'my-orders',component:MyOrdersComponent}
        ],
       },
     {
      path:'payment',
      component:PaymentComponent,
      children:
      [
        {path:'',pathMatch:'full',redirectTo:'cash'},
        {path:'cash',component:CashComponent},
        {path:'visa',component:VisaComponent}
      ],
     },
     {
      path:'wishlist',component:WishlistComponent
     }


    ],
  },

        path: 'admin-page',
        component: AdminPageComponent,
        canActivate: [AuthGuard, RoleGuard],
        title: 'Admin Dashboard',
        children: [
          // {
          //   path: '',  // This will match /admin-page
          //   component: AdminPageComponent
          // },
          {
            path: 'products',  // This will match /admin-page/products
            component: ProductsComponent
          },
          { path: 'categories', component: CategoriesComponent },
          { path: 'subcategories', component: SubCategoriesComponent },
          { path: 'sizes', component: SizesComponent },
          { path: 'colors', component: colorsComponent },
          {
            path: 'AddProductForm',
            component: AddProductFormComponent
          },
          {
            path: 'AddColorForm',
            component: AddColorFormComponent
          },
          {
            path: 'AddSizeForm',
            component: AddSizeFormComponent
          },
          {
            path: 'AddCategoryForm',
            component: AddCategoryFormComponent
          },
          {
            path: 'AddSubCategoryForm',
            component: AddSubCategoryFormComponent
          },
        ]
      },
      

    ]
  },
  {
    path: '',
    loadComponent: () =>
      import('./auth-layout/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./component/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'login',
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./component/forget/forget.component').then(
            (m) => m.ForgetpasswordComponent
          ),
        title: 'Forgetpassword',
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./component/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
        title: 'reset-password'
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./component/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'register',
      },
    ],


  },
  {
    path:'returns',component:ReturnsComponent,
  },
  {
    path:'shipping',component:ShippingComponent,

  },
  {
    path:'termofuse',component:TermofuseComponent,

  },
  {
    path:'dataprivacy',component:DataprivacyComponent,

  },


  {
    path: '**',
    loadComponent: () =>
      import('./component//not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'notFound',
  },

    ]
  }
];

