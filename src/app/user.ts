import { inject } from "@angular/core";
import { JwtService } from "./services/jwt/jwt.service";
import { JwtHelperService } from "@auth0/angular-jwt";

export class User {
    private static getDecodedJwt() {
        const jwtService = inject(JwtService);
        const jwtHelperService = inject(JwtHelperService);
        const jwt = jwtService.getJwtInStorage();
        const decodedJwt = jwtHelperService.decodeToken(jwt ?? '');
        return decodedJwt;
    }

    static getId() {
        const decodedJwt = User.getDecodedJwt();
        return decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }

    static getName() {
        const decodedJwt = User.getDecodedJwt();
        return decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
}