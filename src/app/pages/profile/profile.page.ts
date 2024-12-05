import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/core/models/auth.model';
import { UserStrapi } from 'src/app/core/models/user.model';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { UsersService } from 'src/app/core/services/impl/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  formGroup: FormGroup;
  user?: UserStrapi | null;
  constructor(
    private formBuilder: FormBuilder,
    private authService:BaseAuthenticationService,
    private usersSvc:UsersService,
    private mediaService:BaseMediaService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private translateService: TranslateService
  ) { 
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      picture: ['']
    });
  }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();

    try{

      const userAuth = await this.authService.getCurrentUser();

      if(userAuth){
        this.user = await lastValueFrom(this.usersSvc.getById(userAuth.id))

        if (this.user) {

          const updatedUser: any = {
            username: this.user.username,
            email: this.user.email,
            picture: typeof this.user.picture === 'object' ? 
                         this.user.picture?.url : 
                         undefined
          };
          
          this.formGroup.patchValue(updatedUser);
        }
      }



    }catch(error){
      console.error(error);
      const toast = await this.toastController.create({
        message: await lastValueFrom(this.translateService.get('COMMON.ERROR.LOAD')),
        duration: 3000,
        position: 'bottom'
      });
      await toast.present();

    } finally{
      await loading.dismiss();
    }


  }

  async onSubmit(){
    if(this.formGroup.valid && this.user){
      const loading = await this.loadingController.create();
      await loading.present();

      try{
        const changedValues = {} as Record<keyof UserStrapi, any>;
        Object.keys(this.formGroup.controls).forEach(key => {
          if (this.formGroup.get(key)?.dirty) {
            changedValues[key as keyof UserStrapi] = this.formGroup.get(key)?.value;
          }
        });

        if(changedValues.picture){
          // Convertir base64 a Blob
          const base64Response = await fetch(changedValues.picture);
          const blob = await base64Response.blob();
          const uploadedBlob = await lastValueFrom(this.mediaService.upload(blob));
          changedValues.picture = uploadedBlob[0];
        }
        
        await lastValueFrom(this.usersSvc.update(this.user.id, changedValues));
        
        const toast = await this.toastController.create({
          message: await this.translateService.get('PROFILE.SUCCESS_SAVE').toPromise(),
          duration: 3000,
          position: 'bottom'
        });
        await toast.present();

      }catch(error){
        console.error(error);
        const toast = await this.toastController.create({
          message: await this.translateService.get('PROFILE.ERROR_SAVE').toPromise(),
          duration: 3000,
          position: 'bottom'
        });
        await toast.present();

      } finally {

        await loading.dismiss();

      }

    }
  }

  get username(){
    return this.formGroup.controls['username'];
  }

  get email(){
    return this.formGroup.controls['email'];
  }



}
