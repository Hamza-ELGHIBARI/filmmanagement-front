import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../../models/film.model';
import { environment } from '../../../environment/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FilmService {
  private ressourceUrl = environment.apiUrl + '/admin/films';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllFilms(): Observable<Film[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Film[]>(this.ressourceUrl,{headers});
  }

  getAll(): Observable<Film[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Film[]>(this.ressourceUrl,{headers});
  }

  getById(id: number): Observable<Film> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Film>(`${this.ressourceUrl}/${id}`,{headers});
  }

  create(film: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = this.buildFormDataForCreate(film);
    return this.http.post(this.ressourceUrl, formData,{headers});
  }

  update(id: number, film: any): Observable<any> {
    console.log(film);
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = this.buildFormDataForUpdate(film);
    return this.http.put(`${this.ressourceUrl}/${id}`, formData,{headers});
  }

  delete(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.ressourceUrl}/${id}`,{headers});
  }

  private buildFormDataForCreate(film: any): FormData {
    const formData = new FormData();
    formData.append('title', film.title);
    formData.append('description', film.description);
    formData.append('releaseDate', film.releaseDate);
    film.actors.forEach((actor:any) => {
      formData.append('actorsIds', actor.id.toString());
    });
    formData.append('directorId', film.director.id.toString());
    if (film.poster && film.poster instanceof File) {
      formData.append('poster', film.poster);
    }
    return formData;
  }

  private buildFormDataForUpdate(film: any): FormData {
    const formData = new FormData();
    formData.append('title', film.title);
    formData.append('description', film.description);
    formData.append('releaseDate', film.releaseDate);
    film.actors.forEach((actor:any) => {
      formData.append('actorsIds', actor.toString());
    });
    formData.append('directorId', film.directorId.toString());
    if (film.poster && film.poster instanceof File) {
      formData.append('poster', film.poster);
    }
    return formData;
  }
}
