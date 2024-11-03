import { Response } from 'express';

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error: any = null
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(error && { error: error.message || error }),
  });
};

export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  data: any
): void => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};