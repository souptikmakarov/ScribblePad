import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class DataProvider{
    constructor(private http: HttpClient) { }
    private baseUrl = "https://noteappdbserver.herokuapp.com";
    
    public getAllNotes(){
        return this.http
            .get(this.baseUrl + "/notes")
            .map(res => res);
    }

    public removeNote(noteId) {
        return this.http
            .post(this.baseUrl + "/notes/remove",{"id": noteId})
            .map(res => res);
    }

    public addNote(note){
        return this.http
            .post(this.baseUrl + "/notes/add",note)
            .map(res => res);
    }

    public editNote(noteId, note){
        return this.http
            .post(this.baseUrl + "/notes/edit",{"id": noteId, "record": note})
            .map(res => res);
    }
}