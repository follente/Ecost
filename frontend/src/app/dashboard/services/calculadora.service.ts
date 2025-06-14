import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  private readonly baseUrl: string = environment.baseUrl
  private http = inject( HttpClient )


  getConversionFactors(): Observable<any []> {
    const url   = `${ this.baseUrl }/conversionFactor`;
    return this.http.get<any[]>(url);
  }

}
