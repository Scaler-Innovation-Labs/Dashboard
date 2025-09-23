export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,

    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503
}

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
