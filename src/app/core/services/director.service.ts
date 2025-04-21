import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Director } from '../../models/director.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DirectorService {
    private apiUrl = `${environment.apiUrl}/admin/directors`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAll(): Observable<Director[]> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Director[]>(this.apiUrl, { headers });
    }

    getById(id: number): Observable<Director> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Director>(`${this.apiUrl}/${id}`, { headers });
    }

    create(director: any): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<Director>(this.apiUrl, director, { headers });
    }

    update(id: number, director: Director): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put<Director>(`${this.apiUrl}/${id}`, director, { headers });
    }

    delete(id: number): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}
