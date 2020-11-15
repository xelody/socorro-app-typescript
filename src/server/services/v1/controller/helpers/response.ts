import {Response} from 'express';

export function errorHandler(response: Response, error: any, code?: number) {
  return response.status(code || 400).json({success: false, error});
}

export function successHandler(response: Response, data?: any, code?: number) {
  return response.status(code || 200).json({success: true, data});
}
