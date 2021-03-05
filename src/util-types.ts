export type Mappable<T> = T extends [infer K, infer V] ? [K, V] : never;
