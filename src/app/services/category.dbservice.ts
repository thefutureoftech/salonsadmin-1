import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { map, Observable } from 'rxjs';
import { Category } from '../model/Category';
import { CategoryService } from '../model/categoryService.service';
import { SubCategory } from '../model/subCategory';
import { CategoriesComponent } from '../business-details/categories/categories.component';



@Injectable({
  providedIn: 'root'
})
export class CategoryDBService implements OnInit {

    categories: Category[];
    selectedCategory: Category;

    subCategories: SubCategory[];
    selectedSubCategory: SubCategory;

    services: CategoryService[];
    selectedService: CategoryService;


    constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {

    }

    ngOnInit() {



    }


    getCategoriesFromDB(type: string, callback) {

        this.afs.collection<any>('categories', ref => ref.where('busType', '==', type))

            .snapshotChanges().pipe(map(actions => {

                return actions.map(action => {

                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;

                    return { id, ...data };

                });
            }))
            .pipe(map((data: Category[]) => {

                return data;

            }))
            .subscribe(categories => {

                this.categories = categories;

                callback(categories);

            });

    }


    getSubCategoriesFromDB(categoryId: string, callback) {


        this.afs.collection<any>('subcategories', ref => ref.where('parent', '==', categoryId))

            .snapshotChanges().pipe(map(actions => {

                return actions.map(action => {

                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;

                    return { id, ...data };

                });
            }))
            .pipe(map((data: SubCategory[]) => {

                return data;

            }))
            .subscribe(subCategories => {

                this.subCategories = subCategories;

                callback(subCategories);

            });


    }


    getServicesFromDB(subCategoryId: string, callback) {


        this.afs.collection<any>('services', ref => ref.where('parent', '==', subCategoryId))

            .snapshotChanges().pipe(map(actions => {

                return actions.map(action => {

                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;

                    return { id, ...data };

                });
            }))
            .pipe(map((data: CategoryService[]) => {

                return data;

            }))
            .subscribe(services => {

                this.services = services;

                callback(services);

            });


    }


    getCategories() {

        if (this.categories) {

            return this.categories.slice();

        }
        else {

            return null;

        }


    }


    getSubCategories() {

        if (this.subCategories) {

            return this.subCategories.slice();

        }
        else {

            return null;

        }


    }


    getServices() {

        if (this.services) {

            return this.services.slice();

        }
        else {

            return null;

        }


    }


    getCategory(id: string) {

        let category: Category = this.categories.find(item => {

            return (item.id === id);
        });

        return { ...category };

    }


    getSubCategory(id: string) {

        let subCategory: SubCategory = this.subCategories.find(item => {

            return (item.id === id);
        });

        return { ...subCategory };

    }


    getService(id: string) {

        let service: CategoryService = this.services.find(item => {

            return (item.id === id);
        });

        return { ...service };

    }


    async saveCategory(id: string, category: Partial<Category>) {

        let categoryNew: Partial<Category> = {};

        categoryNew.name = category.name;
        categoryNew.arabicName = category.arabicName;
        categoryNew.busType = category.busType;

        this.afs.collection('categories').doc(id).update(categoryNew);

        if(!category.imageURL.includes('https')){

          await this.saveCategoryImage(id, category);

        }

    }

    async saveCategoryImage(id: string, category: Partial<Category>) {

      let myFile: string = category.imageURL.replace(/^data:image\/[a-z]+;base64,/, '');

      let filePath: string = 'categories/' + category.id + '/images/' + '/image/'

      let storegaeRef: firebase.storage.Reference = firebase.storage().ref().child(filePath);   //need to produce unique name

      let uploadTask: firebase.storage.UploadTask = storegaeRef.putString(myFile, 'base64');

      let subscrbeFun = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => { }, (error) => { }, () => {

        uploadTask.snapshot.ref.getDownloadURL().then(

          async (downloadURL) => {

            // You get your url from here
            console.log('File available at', downloadURL);

            await this.afs.collection('categories').doc(category.id).update({ imageURL: downloadURL });

          }
        );

      });

    }

    saveSubCategory(id: string, subCategory: Partial<SubCategory>) {

        let subCategoryNew: Partial<SubCategory> = {};

        subCategoryNew.name = subCategory.name;
        subCategoryNew.arabicName = subCategory.arabicName;
        subCategoryNew.parent = subCategory.parent;

        this.afs.collection('subcategories').doc(id).update(subCategoryNew);


    }

    saveService(id: string, service: Partial<CategoryService>) {

        let serviceNew: Partial<CategoryService> = {};

        serviceNew.name = service.name;
        serviceNew.arabicName = service.arabicName;
        serviceNew.parent = service.parent;
        serviceNew.busType = service.busType;

        this.afs.collection('services').doc(id).update(serviceNew);


    }


    deleteCategory(id: string) {

        this.afs.collection('categories').doc(id).delete();

    }

    deleteSubCategory(id: string) {

        this.afs.collection('subcategories').doc(id).delete();

    }

    deleteService(id: string) {

        this.afs.collection('services').doc(id).delete();

    }


    async createCategory(category: Partial<Category>) {

        await this.afs.collection('categories').doc(category.name).set(category);

        await this.saveCategoryImage(category.name, category);

    }


    createSubCategory(subCategory: Partial<SubCategory>) {

        this.afs.collection('subcategories').doc(subCategory.name).set(subCategory);

    }


    createService(service: Partial<CategoryService>) {

        this.afs.collection('services').add(service);

    }


    canDeleteCategory(id: string) {

        return this.afs.collection<any>('subcategories', ref => ref.where('parent', '==', id)).valueChanges().pipe(map((data: SubCategory[]) => {

            return data;

        }));

    }


    canDeleteSubCategory(id: string) {

        return this.afs.collection<any>('services', ref => ref.where('parent', '==', id)).valueChanges().pipe(map((data: CategoryService[]) => {

            return data;

        }));

    }


    canDeleteService(id: string) {


        return true;


    }


    setSelectedCategory(id: string) {

        if (!id) {

            this.selectedCategory = null;

            return;
        }

        this.selectedCategory = this.categories.find(item => {

            return (item.id === id);
        });

    }


    setSelectedSubCategory(id: string) {

        if (!id) {

            this.selectedSubCategory = null;

            return;
        }

        this.selectedSubCategory = this.subCategories.find(item => {

            return (item.id === id);
        });

    }


    setSelectedService(id: string) {

        if (!id) {

            this.selectedService = null;

            return;
        }

        this.selectedService = this.services.find(item => {

            return (item.id === id);
        });

    }


    getSelectedCategory() {

        return this.selectedCategory;

    }


    getSelectedSubCategory() {

        return this.selectedSubCategory;

    }


    getSelectedService() {

        return this.selectedService;

    }



}
