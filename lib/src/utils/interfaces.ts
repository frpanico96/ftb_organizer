type BodyStatus = 'failed' | 'success';

export type BodyResponse = {
  status: BodyStatus;
  message: string;
}