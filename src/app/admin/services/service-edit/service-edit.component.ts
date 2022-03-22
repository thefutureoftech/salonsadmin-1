import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/Category';
import { SubCategory } from '../../../model/subCategory';
import { CategoryService } from '../../../model/categoryService.service';
import { CategoryDBService } from '../../../services/category.dbservice';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MbscSelectOptions } from '@mobiscroll/angular';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {


  category: Partial<Category>;

  type: string;

  subCategory: Partial<SubCategory>;

  service: Partial<CategoryService>;

  editMode: boolean = false;

  cancelDelete: string;

  formInvalid: boolean;

  formSettings = {
    theme: 'ios'
  };

  busTypeData = [{ text: '', value: '0' }, { text: 'salons', value: 'salons' }];

  selectOptions: MbscSelectOptions;

  uploadImageString: string = 'Upload Image';


  constructor(private categoryDBService: CategoryDBService,
    private router: Router, private activeRoute: ActivatedRoute, private imageCompress: NgxImageCompressService) { }

  ngOnInit() {


    this.selectOptions = {
      theme: 'ios'
    };

    this.activeRoute.queryParams.subscribe(params => {

      if (params.id != undefined) {

        if (params.type === 'Category') {

          if (!this.categoryDBService.getCategories()) {

            this.router.navigate(['../../category'], { relativeTo: this.activeRoute });

            return;

          }

          this.category = this.categoryDBService.getCategory(params.id);

          this.type = params.type;

          this.editMode = true;

        }
        // else if (params.type === 'SubCategory') {

        //   if (!this.categoryDBService.getSubCategories()) {

        //     this.router.navigate(['../../subcategory'], { relativeTo: this.activeRoute });

        //     return;

        //   }

        //   this.subCategory = this.categoryDBService.getSubCategory(params.id);

        //   this.type = params.type;

        //   this.editMode = true;

        // }
        else if (params.type === 'Service') {

          if (!this.categoryDBService.getServices()) {

            this.router.navigate(['../../service'], { relativeTo: this.activeRoute });

            return;

          }

          this.service = this.categoryDBService.getService(params.id);

          this.type = params.type;

          this.editMode = true;

        }

      }
      else if ((<string>params.type).length > 0) {

        this.type = params.type
        this.editMode = false;

      }
      else {

        this.type = '';
        this.editMode = false;

      }


      if (this.editMode) {

        this.childrenExist();

      }
      else {

        if (this.type === 'Category') {

          this.category = {

            name: '',
            arabicName: '',
            busType: '',
            imageURL: ''

          };

        }
        // else if (this.type === 'SubCategory') {

        //   this.subCategory = {

        //     name: '',
        //     arabicName: '',
        //     parent: this.categoryDBService.getSelectedCategory().id

        //   };
        // }
        else if (this.type === 'Service') {

          this.service = {

            name: '',
            arabicName: '',
            parent: this.categoryDBService.getSelectedCategory().id

          };
        }

        this.cancelDelete = 'Cancel';

      }


    });



  }



  childrenExist() {

    if (this.type === 'Category') {

      this.categoryDBService.canDeleteCategory(this.category.id)

        .subscribe(subcategories => {

          if (subcategories.length > 0) {

            this.cancelDelete = 'Cancel';
          }
          else {

            this.cancelDelete = 'Delete';

          }

        });

    }
    // else if (this.type === 'SubCategory') {

    //   this.categoryDBService.canDeleteSubCategory(this.subCategory.id)

    //     .subscribe(services => {

    //       if (services.length > 0) {

    //         this.cancelDelete = 'Cancel';
    //       }
    //       else {

    //         this.cancelDelete = 'Delete';

    //       }

    //     });

    // }
    else if (this.type === 'Service') {

      let can = this.categoryDBService.canDeleteService(this.service.id)

      if (can) {

        this.cancelDelete = 'Delete';

      }


    }


  }


  businessTypeSelected(event) {

    if (!event.valueText) {

      this.formInvalid = true;

    }
    else {

      this.formInvalid = false;

    }


  }


  async proceed(form: NgForm) {

    // if(!this.category.name.trim() || !this.category.arabicName.trim()){

    //   return;  //Check for empty input fields

    // }


    if (this.type === 'Category') {

      if (this.editMode) {

        await this.categoryDBService.saveCategory(this.category.id, this.category);

      }
      else {

        await this.categoryDBService.createCategory(this.category);

      }

      this.categoryDBService.setSelectedCategory(null);

      this.router.navigate(['../../category'], { relativeTo: this.activeRoute });
    }
    // else if (this.type === 'SubCategory') {

    //   if (this.editMode) {

    //     this.categoryDBService.saveSubCategory(this.subCategory.id, this.subCategory);

    //   }
    //   else {

    //     this.categoryDBService.createSubCategory(this.subCategory);

    //   }

    //   this.categoryDBService.setSelectedSubCategory(null);

    //   this.router.navigate(['../../subcategory'], { relativeTo: this.activeRoute });

    // }
    else if (this.type === 'Service') {

      if (this.editMode) {

        this.categoryDBService.saveService(this.service.id, this.service);

      }
      else {

        this.categoryDBService.createService(this.service);

      }

      this.categoryDBService.setSelectedService(null);

      this.router.navigate(['../../service'], { relativeTo: this.activeRoute });

    }



  }


  cancelOrDelete() {


    if (this.type === 'Category') {

      if (this.cancelDelete === 'Cancel') {

        this.router.navigate(['../../category'], { relativeTo: this.activeRoute });

      }
      else if (this.cancelDelete === 'Delete') {

        this.categoryDBService.deleteCategory(this.category.id);

        this.router.navigate(['../../category'], { relativeTo: this.activeRoute });

      }

      this.categoryDBService.setSelectedCategory(null);

    }
    // else if (this.type === 'SubCategory') {

    //   if (this.cancelDelete === 'Cancel') {

    //     this.router.navigate(['../../subcategory'], { relativeTo: this.activeRoute });

    //   }
    //   else if (this.cancelDelete === 'Delete') {

    //     this.categoryDBService.deleteSubCategory(this.subCategory.id);

    //     this.router.navigate(['../../subcategory'], { relativeTo: this.activeRoute });

    //   }

    //   this.categoryDBService.setSelectedSubCategory(null);

    // }
    else if (this.type === 'Service') {

      if (this.cancelDelete === 'Cancel') {

        this.router.navigate(['../../service'], { relativeTo: this.activeRoute });

      }
      else if (this.cancelDelete === 'Delete') {

        this.categoryDBService.deleteService(this.service.id);

        this.router.navigate(['../../service'], { relativeTo: this.activeRoute });

      }

      this.categoryDBService.setSelectedService(null);

    }


  }


  onFileChange(event) {

    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = async () => {

        let result2 = await this.imageCompress.compressFile(reader.result, this.imageCompress.DOC_ORIENTATION.Up, 50, 50);

        this.category.imageURL = result2;

      };

    }

  }




}
