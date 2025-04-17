import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../app.config';

@Injectable({
    providedIn: "root"
})
export class HttpClientService {

    private httpClient = inject(HttpClient)
    private baseUrl = inject(API_BASE_URL);

    private createUrl(requestParameters: Partial<RequestParameters>): string {
        let url: string = `${this.baseUrl}${requestParameters.path ? `/${requestParameters.path}` : ''}`;

        if (requestParameters.routeParameters) {
            url = `${url}/${requestParameters.routeParameters.join("/")}`;
        }

        if (requestParameters.queryParameters) {
            let allQueryParameters: string = "?";
            for (let queryParameter of requestParameters.queryParameters) {
                allQueryParameters += `${queryParameter.key}=${queryParameter.value}&`;

            }

            url += allQueryParameters
            let lastIndex = url.lastIndexOf("&");
            if (lastIndex) {
                url = url.slice(0, lastIndex);
            }

        }

        return url;
    }


    get<T>(
        requestParameters: Partial<RequestParameters>
    ): Observable<T> {
        let url: string = this.createUrl(requestParameters);
        return this.httpClient.get<T>(url);
    }

    post<TIn, TOut>(requestParameters: Partial<RequestParameters>, body: TIn,)
        : Observable<TOut> {
        let url: string = this.createUrl(requestParameters);
        return this.httpClient.post<TOut>(url, body);
    }

    put<TIn, TOut>(requestParameters: Partial<RequestParameters>, body: TIn,)
        : Observable<TOut> {
        let url: string = this.createUrl(requestParameters);
        return this.httpClient.put<TOut>(url, body);
    }

    delete<T>(requestParameters: Partial<RequestParameters>) {
        let url: string = this.createUrl(requestParameters);
        return this.httpClient.delete<T>(url);
    }
}

export class RequestParameters {
    path?: string;
    routeParameters?: string[];
    queryParameters?: { key: string, value: string }[];

    addQueryParameter(queryParamater: { key: string, value: string }) {
        this.queryParameters = this.queryParameters ?? [];
        this.queryParameters.push(queryParamater);
    }

    addRouteParameter(value: string) {
        this.routeParameters = this.routeParameters ?? [];
        this.routeParameters.push(value);
    }
}