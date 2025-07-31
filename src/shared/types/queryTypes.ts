export interface Meta {
  response: { status: number; headers: Headers };
}

export interface ResError {
  error: { status: number };
}
