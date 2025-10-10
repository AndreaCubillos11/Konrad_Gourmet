import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {


  private apiUrl = 'api/email/enviar-pdf'; // URL del endpoint en tu backend

  constructor(private http: HttpClient) { }

  enviarCorreo(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

}
