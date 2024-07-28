import { Request, Response } from "express";
import {
  failureResponse,
  redirectResponse,
  successResponse,
} from "../services/common";
import { checkRequiredEnvVariables } from "../utils";
import axios from "axios";

export async function initiateAuth(req: Request, res: Response) {
  try {
    checkRequiredEnvVariables([
      "GHL_CLIENT_ID",
      "GHL_SCOPES",
      "GHL_REDIRECT_URI",
      "GHL_BASE_URL",
    ]);

    const GHL_CLIENT_ID = process.env.GHL_CLIENT_ID!;
    const GHL_SCOPES = process.env.GHL_SCOPES!;
    const GHL_REDIRECT_URI = process.env.GHL_REDIRECT_URI!;
    const GHL_BASE_URL = process.env.GHL_BASE_URL!;

    const queryParams = new URLSearchParams({
      response_type: "code",
      redirect_uri: GHL_REDIRECT_URI,
      client_id: GHL_CLIENT_ID,
      scope: GHL_SCOPES,
    });

    const redirectUrl = `${GHL_BASE_URL}/oauth/chooselocation?${queryParams.toString()}`;

    redirectResponse(res, redirectUrl);
  } catch (error) {
    if (error instanceof Error) {
      return failureResponse(res, error.message);
    } else {
      return failureResponse(res, "An unexpected error occurred");
    }
  }
}

export async function authCallback(req: Request, res: Response) {
  try {
    checkRequiredEnvVariables([
      "GHL_CLIENT_ID",
      "GHL_CLIENT_SECRET",
      "GHL_REDIRECT_URI",
      "GHL_TOKEN_URL",
    ]);

    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return failureResponse(res, "Authorization code is missing or invalid");
    }

    const data = new URLSearchParams({
      client_id: process.env.GHL_CLIENT_ID!,
      client_secret: process.env.GHL_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code: code,
      user_type: "Location",
      redirect_uri: process.env.GHL_REDIRECT_URI!,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.GHL_TOKEN_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    const response = await axios.request(config);

    // Here you would typically:
    // 1. Store the access token securely
    // 2. Associate the token with the user's account in your system

    return successResponse(
      res,
      "Access token received successfully",
      response.data
    );
  } catch (error) {
    console.error("Error in authCallback:", error);
    if (axios.isAxiosError(error) && error.response) {
      return failureResponse(
        res,
        "Error exchanging code for token",
        error.response.data
      );
    } else if (error instanceof Error) {
      return failureResponse(res, error.message);
    } else {
      return failureResponse(
        res,
        "An unexpected error occurred during the callback process"
      );
    }
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    checkRequiredEnvVariables([
      "GHL_CLIENT_ID",
      "GHL_CLIENT_SECRET",
      "GHL_REDIRECT_URI",
      "GHL_TOKEN_URL",
    ]);

    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return failureResponse(res, "Refresh token is missing or invalid");
    }

    const data = new URLSearchParams({
      client_id: process.env.GHL_CLIENT_ID!,
      client_secret: process.env.GHL_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token,
      user_type: "Location",
      redirect_uri: process.env.GHL_REDIRECT_URI!,
    });

    const response = await axios.post(
      process.env.GHL_TOKEN_URL!,
      data.toString(),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return successResponse(
      res,
      "Access token refreshed successfully",
      response.data
    );
  } catch (error) {
    console.error("Error in refreshToken:", error);
    if (axios.isAxiosError(error) && error.response) {
      return failureResponse(
        res,
        "Error refreshing token",
        error.response.data
      );
    } else if (error instanceof Error) {
      return failureResponse(res, error.message);
    } else {
      return failureResponse(
        res,
        "An unexpected error occurred during the token refresh process"
      );
    }
  }
}
