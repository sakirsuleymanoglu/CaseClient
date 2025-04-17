import { inject, Injectable } from "@angular/core";
import { JwtService } from "./services/jwt/jwt.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: "root"
})
export class User {
    private jwtService = inject(JwtService);
    private jwtHelperService = inject(JwtHelperService);

    private get decodedJwt() {
        const jwt = this.jwtService.getJwtInStorage();
        const decodedJwt = this.jwtHelperService.decodeToken(jwt ?? '');
        return decodedJwt;
    }

    get id() {
        return this.decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }

    get name() {
        return this.decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
}