import { Response } from "express";
import { response_status_codes } from "./../types/common";

export function failureResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.success).json({
    status: "failure",
    message,
    data,
  });
}

export function insufficientParameters(res: Response) {
  res.status(response_status_codes.bad_request).json({
    status: "failure",
    message: "Insufficient parameters provided",
    data: {},
  });
}

export function methodNotAllowed(res: Response) {
  res.status(response_status_codes.not_implemented).json({
    status: "failure",
    message: "Method not allowed",
    data: {},
  });
}

export function successResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.success).json({
    status: "success",
    message,
    data,
  });
}

export function createdResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.created).json({
    status: "success",
    message,
    data,
  });
}

export function noContentResponse(res: Response) {
  res.status(response_status_codes.no_content).end();
}

export function modifiedResponse(res: Response) {
  res.status(response_status_codes.modified).end();
}

export function badRequestResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.bad_request).json({
    status: "failure",
    message,
    data,
  });
}

export function unauthorizedResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.unauthorized).json({
    status: "failure",
    message,
    data,
  });
}

export function forbiddenResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.forbidden).json({
    status: "failure",
    message,
    data,
  });
}

export function notFoundResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.not_found).json({
    status: "failure",
    message,
    data,
  });
}

export function internalServerErrorResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.internal_server_error).json({
    status: "failure",
    message,
    data,
  });
}

export function notImplementedResponse(
  res: Response,
  message: string,
  data: any = {}
) {
  res.status(response_status_codes.not_implemented).json({
    status: "failure",
    message,
    data,
  });
}

export function redirectResponse(
  res: Response,
  redirectUrl: string,
  statusCode: number = response_status_codes.temporary_redirect
) {
  res.redirect(statusCode, redirectUrl);
}
