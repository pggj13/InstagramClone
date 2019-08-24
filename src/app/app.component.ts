import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instagramClone';



  ngOnInit():void{

    var config = {
      apiKey: "AIzaSyCBTiLwY5iqsaVH7h9PU1XbPtUkPEZLV2Y",
      authDomain: "instagram-clone-ba6e2.firebaseapp.com",
      databaseURL: "https://instagram-clone-ba6e2.firebaseio.com",
      projectId: "instagram-clone-ba6e2",
      storageBucket: "instagram-clone-ba6e2.appspot.com",
      messagingSenderId: "165777316270"
    };
    firebase.initializeApp(config);
  }
}
