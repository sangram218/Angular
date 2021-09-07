import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FakeArtistService } from '../services/fake-artist.service';
import { ArtistService } from '../services/artist.service';
import { AddArtistComponent } from './../dialogs/add-artist/add-artist.component';
import { UpdateArtistComponent } from '../dialogs/update-artist/update-artist.component';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements AfterViewInit {

  @Input() data:string=""
  artistName:string=""
  isUndoHidden:boolean=true
  isUndoClicked:boolean=false
  date:string=''
  ARTIST_DATA: Artists[]=[];

  constructor(private fakeArtists:FakeArtistService,
    private artistService: ArtistService,
    public dialog: MatDialog,
    private route:ActivatedRoute) { }

  // modify tsconfig.json
  // "noImplicitReturns": false,
  // "strictPropertyInitialization": false,

  artistColumns: string[] = ['id', 'name','option'];
  artistData : MatTableDataSource<Artists>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    getDataAndHandlePaginator(){
      // const ARTIST_DATA: Artists[]=this.fakeArtists.getArtists();
    // let ARTIST_DATA: Artists[]=[];
    this.artistService.getArtists()
        .subscribe(data=>{
          this.ARTIST_DATA = data
          console.log(this.ARTIST_DATA)
          // wait till data receives and then apply data to artistData
          this.artistData = new MatTableDataSource<Artists>(this.ARTIST_DATA);
          this.artistData.paginator = this.paginator;
          this.artistData.sort = this.sort;
        });
    // this.artistData = new MatTableDataSource<Artists>(ARTIST_DATA);
    // this.artistData.paginator = this.paginator;
    // this.artistData.sort = this.sort;
    }


  ngAfterViewInit() {
    this.getDataAndHandlePaginator()
  }

  // add AddArtistComponent in entryComponents in app.module
  openAddArtistDialog(){
    // 2nd arg to open is data we want to send to dialog ,this is required in update
    let addArtistDialog = this.dialog.open(AddArtistComponent ,{disableClose: true})
    // afterClosed() observable
    addArtistDialog.afterClosed().subscribe(result=>{
     this.getDataAndHandlePaginator()
    })
  }

  openUpdateArtistDialog(element:any){
    let updateArtistDialog = this.dialog.open(UpdateArtistComponent,{data:{Element:element},disableClose: true})
    updateArtistDialog.afterClosed().subscribe(result=>{
      setTimeout(()=>{
        this.getDataAndHandlePaginator()
      },500)
    //  this.getDataAndHandlePaginator()
    })
  }

  onDelete(data:any){
    this.isUndoClicked=false
    // this.fakeArtists.deleteArtists(data)
    console.log(data);
    this.ARTIST_DATA.splice(this.ARTIST_DATA.indexOf(data),1)
    console.log(this.ARTIST_DATA)
    this.artistData = new MatTableDataSource<Artists>(this.ARTIST_DATA);
    this.artistData.paginator = this.paginator;
    this.artistData.sort = this.sort;
    this.isUndoHidden=false
    setTimeout(()=>{
      this.isUndoHidden=true
    },4000)
    setTimeout(()=>{
      if(!this.isUndoClicked){
          this.artistService.deleteArtist(data.id).subscribe(data=>{
      console.log(data)
      this.getDataAndHandlePaginator()    
      })
    }
    else{
      this.getDataAndHandlePaginator()
    }
    },5000)
    // this.artistService.deleteArtist(data.id).subscribe(data=>{
    //   console.log(data)
    //   this.getDataAndHandlePaginator()
    // this.isUndoHidden=false
    // setTimeout(()=>{
    //   this.isUndoHidden=true
    // },5000)
    // })

    // this.getDataAndHandlePaginator()
    // this.isUndoHidden=false
    // setTimeout(()=>{
    //   this.isUndoHidden=true
    // },5000)
  }

  undoDelete(){
    this.isUndoHidden=true
    // this.fakeArtists.onUndo()
    // this.getDataAndHandlePaginator()
    this.isUndoClicked=true
  }

  artistFilterApply(artistName:string){
    // console.log(artistName)
    let artistData: Artists[]=this.fakeArtists.getArtists();
    artistData=artistData.filter(adata=>adata.name.toLowerCase()===artistName.toLowerCase())
    console.log(artistData)
    this.artistData = new MatTableDataSource<Artists>(artistData);
    this.artistData.paginator = this.paginator;
    this.artistData.sort = this.sort;
  }

  artistFilterReset(){
    this.artistName=""
    this.getDataAndHandlePaginator()
  }

  downloadArtists(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    this.date = dd + '/' + mm + '/' + yyyy;
    ArtistComponent.exportSongs(this.fakeArtists.getArtists(),this.date)
  }

  static exportSongs(Artists:any[],date:string){
      let fileName = 'Artists-'+date;
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(Artists);
    XLSX.utils.book_append_sheet(wb, ws, 'Artists Data');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}

export interface Artists {
  id: number;
  name: string;
}

