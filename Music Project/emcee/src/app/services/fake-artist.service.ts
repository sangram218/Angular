import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeArtistService {

  deletedIndex:number;
  deletedObject:any;

  Artists: any[] = [
    {
      id: 1,
      name: "Travis Scott",
    },
    {
      id: 2,
      name: "Eminem",
    },
    {
      id: 3,
      name: "Wiz Khalifa",
    },
    {
      id: 4,
      name: "Drake",
    },
    {
      id: 5,
      name: "Kanye West",
    },
    {
      id: 6,
      name: "Lil wayne",
    },
    {
      id: 7,
      name: "Snoop dog",
    }
  ]

  getArtists(){
    return this.Artists
  }

  addArtists(artistName:any){
    let ID=0;
    this.Artists.map(Artist=>{
      if(Artist.id>ID){
        ID=Artist.id
      }
    })
    this.Artists.push({id:ID+1,name:artistName})
  }

  deleteArtists(artistData:any){
    this.deletedObject=artistData
    this.deletedIndex=this.Artists.indexOf(artistData)
    this.Artists.splice(this.Artists.indexOf(artistData),1)
    // console.log(this.Artists)
  }

  onUndo(){
    this.Artists.splice(this.deletedIndex,0,this.deletedObject)
  }

  updateArtists(artistId:any,updatedName:any){
    // console.log(artistId,updatedName)
    this.Artists.map(Artist=>{
      if(Artist.id===artistId){
        Artist.name=updatedName
      }
    })
  }

  constructor() { }
}
