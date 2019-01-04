import { Component, OnInit, OnChanges, NgZone} from "@angular/core";

import { Post } from "../../models/post.model";
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-landing-list',
  templateUrl: './landing-list.component.html',
  styleUrls: ['./landing-list.component.css']
})
export class LandingListComponent implements OnInit {

  posts: Post[] = [];

  constructor(public landingService: LandingService,private zone : NgZone) { }

  ngOnInit() {
    this.getPostLists();
  }
  
  getPostLists() {
    this.landingService.getPosts().then((response:any)=>{
      // this.posts = response;
      console.log(response);
        this.posts = response.map(e => 
          {
              return {
                postId:e.payload.doc.id,
                ...e.payload.doc.data()
              } as Post;
          })
        });
  }


  Upvoted(i:number) {
    this.posts[i].upvotes = this.posts[i].upvotes + 1;
    this.landingService.updatePosts(this.posts[i]);
  }
}
