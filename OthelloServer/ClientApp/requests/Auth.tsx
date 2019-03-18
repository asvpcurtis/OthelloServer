export interface LoginFailure
{
    login_failure?: string[]
    Password?: string[]
    Email?: string[]
}

export interface LoginSuccess
{
    token: string,
    expiration: string
}

export interface LoginModel
{
    email: string;
    password: string;
}

export function login(data: LoginModel,
    success: (res: LoginSuccess) => void,
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
            promise.then(payload => success(payload));
        }
        else {
            const promise: Promise<LoginFailure> = response.json();
            promise.then(payload => failure(payload));
        }
    });
}