export interface Book {
    title: string;
    year: number;
    authorName: string;
}

export interface BookList {
    name: string;
    books: Book[];
}