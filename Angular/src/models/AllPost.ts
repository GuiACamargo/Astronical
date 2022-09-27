export interface AllPost {
    id: number;
    titulo: string;
    descricao: string;
    pontuacao: number;
    data: string;
    usuario: {
        id: number;
        nome: string;
        email: string;
    };
}
