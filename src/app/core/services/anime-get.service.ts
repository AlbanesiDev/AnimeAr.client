import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Anime } from "../interfaces/anime.interface";

@Injectable({
  providedIn: "root",
})
export class AnimeGetService {
  apiBaseUrl = "https://localhost:5000/api/Animes";

  constructor(private http: HttpClient) {}

  getAllData(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl);
  }

  getCollectionsNames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiBaseUrl + "/collection-names");
  }

  getDataByCollection(collection: string): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiBaseUrl + "/" + collection);
  }

  getDataByCollectionAndName(collection: string, name: string): Observable<Anime> {
    return this.http.get<Anime>(this.apiBaseUrl + "/" + collection + "/" + name);
  }

  getDataByTitleCoincidences(collection: string, input: string): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiBaseUrl + "/" + "anime-collection/search?searchbar=" + input);
  }
}
