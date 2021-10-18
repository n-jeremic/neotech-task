interface AxiosResponseSchemaWithNoData {
    readonly status: number,
    readonly statusText: string,
    readonly headers: object,
    readonly config: object,
    readonly request: object
}

export interface SingleUserApiResponseSchema {
    readonly name: string,
    readonly email: string,
    readonly dob: {
        readonly age: number
    }
}

export interface UsersAxiosResponseSchema extends AxiosResponseSchemaWithNoData {
    readonly data: {
        readonly results: Array<SingleUserApiResponse>
    }
}
