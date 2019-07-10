export interface Usuario {
    id?: string;
    nombre: string;
    apellido: string;
    tipo?: string;
    carrera?: string;
    semestre?: string;
    identificacion?: string;
    email: string;
    genero?: string;
    avatar?: string;
    tipoid?: string;
    celular?: string;
    fechaNacimiento?: string;
    peso: number;
    talla: Float32Array;
    perimetro: number;
    contador: number;
    estado?: boolean
}

