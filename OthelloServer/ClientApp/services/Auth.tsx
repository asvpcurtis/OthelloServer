const JwtKey: string = 'OthelloServerJwt';
const JwtExpirationKey: string = 'OthelloServerJwtExpiration';

export interface LoginFailure
{
    login_failure?: string[];
    Password?: string[];
    Email?: string[];
}

export interface LoginSuccess
{
    token: string;
    expiration: string;
}

export interface LoginModel
{
    email: string;
    password: string;
}

export function login(data: LoginModel,
    success: () => void,
    failure: (err: LoginFailure) => void)
{
    const url: string = "api/login";
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url, options).then(response => {
        if (response.status == 200) {
            const promise: Promise<LoginSuccess> = response.json();
            promise.then(payload => {
                localStorage.setItem(JwtKey, payload.token);
                localStorage.setItem(JwtExpirationKey, payload.expiration);
            });
            success();
        }
        else {
            const promise: Promise<LoginFailure> = response.json();
            promise.then(payload => failure(payload));
        }
    });
}

export function logout() {
    localStorage.removeItem(JwtKey);
    localStorage.removeItem(JwtExpirationKey);
}

// not exactly finished must verify the expiration
export function isLoggedIn(): boolean {
    const jwtExists: boolean = localStorage.getItem(JwtKey) != null;
    const jwtExpirationExists: boolean = localStorage.getItem(JwtExpirationKey) != null;
    return jwtExists && jwtExpirationExists;
}
export function getJwt(): string | null {
    return localStorage.getItem(JwtKey);
}