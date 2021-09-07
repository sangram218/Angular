import { Component, OnInit } from '@angular/core';
import { FakeAlbumService } from 'src/app/services/fake-album.service';
import { FakeArtistService } from 'src/app/services/fake-artist.service';
import { FakeSongService } from 'src/app/services/fake-song.service';
import { FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'app-filter-song',
  templateUrl: './filter-song.component.html',
  styleUrls: ['./filter-song.component.css']
})
export class FilterSongComponent implements OnInit {

  // artists:any[]=[]
  // albums:any[]=[]
  // songs:any[]=[]
  // modifiedSongData:{id:number,songName:string,artistName:string,albumName:string,duration:number}[]=[]

  // arrays for filter
  // songNames:any[]=[]
  // artistNames:any[]=[]
  // albumNames:any[]=[]

  // songsWithCheckbox:{songName:string,isChecked:boolean}[]=[]
  // artistsWithCheckbox:{artistName:string,isChecked:boolean}[]=[]
  // albumsWithCheckbox:{albumName:string,isChecked:boolean}[]=[]

  constructor(
    // private fakeArtists:FakeArtistService,
    // private fakeAlbums:FakeAlbumService,
    // private fakeSongs:FakeSongService,
    public filterService:FilterService 
  ) { 
    // this.artists = this.fakeArtists.getArtists()
    // this.albums = this.fakeAlbums.getAlbums()
    // this.songs = this.fakeSongs.getSongs() 
    // this.modifiedSongData=[]
    // this.songs.map(song=>{
    //   this.albums.map(album=>{
    //     if(song.albumId===album.id){
    //         this.artists.map(artist=>{
    //           if(song.artistId===artist.id){
    //             this.modifiedSongData.push({id:song.id,songName:song.songName,artistName:artist.name,
    //               albumName:album.albumName,duration:song.duration})
    //           }
    //         })
    //       }
    //     }
    //   )
    // })
    // this.modifiedSongData.map(record=>{
    //   if(!this.songNames.includes(record.songName))
    //     this.songNames.push(record.songName)
    //   if(!this.artistNames.includes(record.artistName))
    //     this.artistNames.push(record.artistName)
    //   if(!this.albumNames.includes(record.albumName))
    //     this.albumNames.push(record.albumName)
    // })
    // this.songNames.map(songName=>{
    //   this.filterService.songsWithCheckbox.push({songName:songName,isChecked:false})
    // })
    // this.artistNames.map(artistName=>{
    //   this.filterService.artistsWithCheckbox.push({artistName:artistName,isChecked:false})
    // })
    // this.albumNames.map(albumName=>{
    //   this.filterService.albumsWithCheckbox.push({albumName:albumName,isChecked:false})
    // })

  }

  ngOnInit(): void {
  }

  onSongClick(songName:string){
    this.filterService.songsWithCheckbox.map(songObject=>{
      if(songObject.songName==songName)
        songObject.isChecked=!songObject.isChecked
    })
    console.log(this.filterService.songsWithCheckbox)
  }
  onArtistClick(artistName:string){
    this.filterService.artistsWithCheckbox.map(artistObject=>{
      if(artistObject.artistName==artistName)
        artistObject.isChecked=!artistObject.isChecked
    })
    // console.log(this.filterService.artistsWithCheckbox)
  }
  onAlbumClick(albumName:string){
    this.filterService.albumsWithCheckbox.map(albumObject=>{
      if(albumObject.albumName==albumName)
        albumObject.isChecked=!albumObject.isChecked
    })
    // console.log(this.filterService.albumsWithCheckbox)
  }

  onFilterApply(){
    let filteredArray:any[]=[]
    let filteredArray1:any[]=[]
    let filteredArray2:any[]=[]
    let counter:number=0
    let counter1:number=0
    let counter2:number=0
    let counter3:number=0
    let counter4:number=0
    this.filterService.songsWithCheckbox.map(songCheckbox=>{
      if(songCheckbox.isChecked==true){
        this.filterService.modifiedSongData.map(data=>{
          if(songCheckbox.songName==data.songName){
            filteredArray.push(data)
            counter=1
          }
        })
      }
    })
    if(counter==0){
      filteredArray=this.filterService.modifiedSongData
    }
    console.log("filtered array - ",filteredArray)
    this.filterService.artistsWithCheckbox.map(artistCheckbox=>{
      if(artistCheckbox.isChecked==true){
        counter2=1
        filteredArray.map(data=>{
          if(artistCheckbox.artistName==data.artistName){
            // console.log("hi")
            filteredArray1.push(data)
            counter1=1
          }
        })
      }
    })
    if(counter1==0 && counter2==0){
      filteredArray1=filteredArray
    }
    console.log("filtered array1 - ",filteredArray1)
    this.filterService.albumsWithCheckbox.map(albumCheckbox=>{
      if(albumCheckbox.isChecked==true){
        counter3=1
        filteredArray1.map(data=>{
          if(albumCheckbox.albumName==data.albumName){
            filteredArray2.push(data)
            counter4=1
          }
        })
      }
    })
    if(counter3==0 && counter4==0){
      filteredArray2=filteredArray1
    }
    console.log("filtered array2 - ",filteredArray2)
    this.filterService.finalFilteredArray=filteredArray2
  }

  onReset(){
    this.filterService.songsWithCheckbox.map(songObject=>{
      if(songObject.isChecked==true)
        songObject.isChecked=false
    })
    this.filterService.artistsWithCheckbox.map(artistObject=>{
      if(artistObject.isChecked==true)
        artistObject.isChecked=false
    })
    this.filterService.albumsWithCheckbox.map(albumObject=>{
      if(albumObject.isChecked==true)
        albumObject.isChecked=false
    })
    this.filterService.finalFilteredArray=this.filterService.modifiedSongData
  }
  
}
