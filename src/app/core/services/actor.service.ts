import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Actor } from '../../models/actor.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ActorService {
    private baseUrl = `${environment.apiUrl}/admin/actors`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    getActors(): Observable<Actor[]> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Actor[]>(this.baseUrl,{headers});
    }

    getActorById(id: number): Observable<Actor> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Actor>(`${this.baseUrl}/${id}`,{headers});
    }

    addActor(actor: any): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<Actor>(this.baseUrl, actor, { headers });
    }

    updateActor(id: number, actor: any): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put<Actor>(`${this.baseUrl}/${id}`, actor,{headers});
    }

    deleteActor(id: number): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<void>(`${this.baseUrl}/${id}`,{headers});
    }
}
