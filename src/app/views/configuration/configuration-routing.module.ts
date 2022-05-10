import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
const routes: Routes = [
  {
    path: "",
    data: {
      title: "configuration",
    },
    children: [
      {
        path: "home",
        component: HomeComponent,
        // data: {
        //   title: 'home'
        // }
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
