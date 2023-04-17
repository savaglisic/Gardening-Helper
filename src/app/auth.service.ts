import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _currentUser: string | null = null;

    constructor() {}

    setCurrentUser(username: string): void {
        this._currentUser = username;
    }

    getCurrentUser(): string | null {
        return this._currentUser;
    }

    clearCurrentUser(): void {
        this._currentUser = null;
    }
}
