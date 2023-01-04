
export type Doc<Json = any> = {
  id: string;
  ok: number;
  text: string;
  json: Json | null;
}

export type DocContainer<Json = any> = {
  readonly text: string;
  readonly json: Json | null;
  readonly data: Doc<Json>;
  readonly loading: boolean;
  readonly ready: boolean;
}
