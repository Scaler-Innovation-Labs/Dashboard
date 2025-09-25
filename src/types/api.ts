export class ApiError {
    code: string;
    message: string;
    details?: any;

    constructor(code: string, message: string, details?: any) {
        this.code = code;
        this.message = message;
        this.details = details;
    }
}

export class ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    errors?: ApiError[];

    constructor(success: boolean, statusCode: number, message: string, data?: T, errors?: ApiError[]) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }

    static success<T>(statusCode: number, message: string, data?: T): ApiResponse<T> {
        return new ApiResponse<T>(true, statusCode, message, data);
        
    }

    static error<T>(statusCode: number, message: string, errors?: { code: string, message: string, details?: any }[]): ApiResponse<T> {
        const error = errors?.map(error => new ApiError(error.code, error.message, error.details));
        return new ApiResponse<T>(false, statusCode, message, undefined, error);
    }
}
