import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl = "http://localhost:8080/albums"

  constructor(private http : HttpClient) { }

  getAlbums():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`)
  }

  getAlbum(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

  createAlbums(album:any):Observable<any>{
    return this.http.post(`${this.baseUrl}`,album)
  }
  updateAlbum(album:any,id:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`,album)
  }
}
