export interface Response<T> {
    publicacoes: T;
    total?: number;
    last_page?: number;
}
