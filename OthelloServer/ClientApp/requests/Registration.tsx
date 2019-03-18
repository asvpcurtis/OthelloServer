export interface RegisterFailure {
    login_failure?: string[]
    Password?: string[]
    Email?: string[]
}

export interface RegisterSuccess {
    token: string,
    expiration: string
}

export interface RegisterModel {
    email: string;
    password: string;
}

export function login(data: RegisterModel,
    success: (res: RegisterSuccess) => void,
    failure: (err: RegisterFailure) => void) {
    const url: string = "api/accounts";
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url, options).then(response => {
        if (response.status == 200) {
            const promise: Promise<RegisterSuccess> = response.json();
            promise.then(payload => success(payload));
        }
        else {
            const promise: Promise<RegisterFailure> = response.json();
            promise.then(payload => failure(payload));
        }
    });
}