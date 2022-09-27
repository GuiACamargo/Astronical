export interface Post {
    usuario?: {
        id?: number;
        nome?: string;
        email?: string;
    };
    id?: number;
    titulo: string;
    descricao: string;
    pontuacao?: number;
    data?: string;
}
