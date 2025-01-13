// declarations.d.ts ou global.d.ts

// 1. Interface minimale pour un style Mapbox
export interface MapboxStyle {
    version: number;
    name?: string;
    sprite?: string;
    glyphs?: string;
    sources: {
        [key: string]: any; // ou vous pouvez affiner
    };
    layers: any[]; // ou vous pouvez affiner
    // etc. selon vos besoins
}

// 2. Déclaration pour importer un JSON comme un objet
declare module '*.json' {
    const value: any;
    export default value;
}
