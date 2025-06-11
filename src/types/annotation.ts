export type Annotation = {
    head?: string | null | undefined
    render?: (() => string) | null | undefined
    tail?: string | null | undefined
    content?: string | null | undefined
};
