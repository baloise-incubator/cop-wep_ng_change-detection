import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    title: 'Basic',
    loadComponent: () =>
      import('../views/basic.component').then(m => m.BasicComponent),
  },
]
