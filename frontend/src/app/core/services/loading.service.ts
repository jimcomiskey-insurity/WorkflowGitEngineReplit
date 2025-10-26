import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class LoadingService {

    public loading: Subject<boolean> = new Subject();
}