export type PathParams = Record<string, string | ReadonlyArray<string>>;

export interface UpdateRequestBody {
  isActive: boolean;
}

export interface Params extends PathParams {
  id: string;
}
