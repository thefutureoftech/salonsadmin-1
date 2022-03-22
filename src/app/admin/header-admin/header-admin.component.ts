import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  headers: any[];

  formSettings = {
    theme: 'ios'
  };

  iconNav = {
    theme: 'ios',
    type: 'top',
    display: 'inline'
  };

  ngOnInit() {


    let path = this.activeRoute.snapshot.url.find(item => {

      return (item.path === 'services');
    });

    if(path){

      this.headers = [

        {
          name: 'Category',
          value: 'category',
          route: 'category'
        },
        // {
        //   name: 'Sub Category',
        //   value: 'subCategory',
        //   route: 'subcategory'
  
        // },
        {
          name: 'Services',
          value: 'service',
          route: 'service'
        }
  
      ];

    }
    else{

      this.headers = [

        {
          name: 'Countries',
          value: 'countries',
          route: 'countries'
        },
        {
          name: 'States',
          value: 'states',
          route: 'states'
  
        },
        {
          name: 'Cities',
          value: 'cities',
          route: 'cities'
        },
        {
          name: 'Towns',
          value: 'towns',
          route: 'towns'
        }
  
      ];

    }


  }


  onNavigation(event) {

    let header = this.headers.find(item => {

      if (item.name === event.target.innerText) {
        return true;
      }

    });

    // if(header.route === 'Countries'){

    this.router.navigate([header.route], { relativeTo: this.activeRoute });

    // }
    // else{

    //   this.router.navigate([header.route], { relativeTo: this.activeRoute });

    // }


  }



}
