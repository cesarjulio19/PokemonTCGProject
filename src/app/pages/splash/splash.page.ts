import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:true,
  imports: [IonicModule]
})
export class SplashPage implements OnInit {


  constructor(
    private router:Router,
    private authSvc:BaseAuthenticationService
  ) { }

  ngOnInit() {
    timer(5000).subscribe(_=>{
      this.router.navigate(['/home']);
    });
  }

}
