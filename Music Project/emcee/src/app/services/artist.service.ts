import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private baseUrl = 'http://localhost:8080/artists'


  constructor(private http : HttpClient) { }

  getArtists():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`)
  }

  getArtist(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

  createArtists(artist:any):Observable<any>{
    return this.http.post(`${this.baseUrl}`,artist)
  }

  deleteArtist(id:any):Observable<any>{
    console.log("hi")
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
  updateArtist(artist:any,id:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`,artist)
  }
}
