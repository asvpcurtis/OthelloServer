export interface RegisterFailure {
    DuplicateUserName?: string[];
    DuplicateEmail?: string[];
    UserName?: string[];
    Password?: string[];
    PasswordTooShort?: string[];
    Email?: string[];
}
export interface RegisterModel {
    username: string;
    email: string;
    password: string;
}

export function register(data: RegisterModel,
    success: () => void,
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
            success();
        }
        else {
            const promise: Promise<RegisterFailure> = response.json();
            promise.then(payload => failure(payload));
        }
    });
}