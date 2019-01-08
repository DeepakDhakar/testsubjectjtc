import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private posts: Post[] = [];
  

  constructor(private db: AngularFirestore) { }

  getPosts() {
    return new Promise<any>((resolve, reject) => { 
      this.db.collection('jtcPost').snapshotChanges().subscribe(snapshots =>{
        resolve(snapshots);
      });
    });
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, description: content, creationDate: Date(), upvotes:0};
    
    this.db.collection('jtcPost').add(post)
      .then((response:any)=>{
        console.log(JSON.stringify(response));
      })
      .catch((error:any)=>{
        console.log(JSON.stringify(error));
      });
  }

  updatePosts(updatepost:Post){
    this.db.doc('jtcPost/' + updatepost.postId).update(updatepost);    
  }

  
}
