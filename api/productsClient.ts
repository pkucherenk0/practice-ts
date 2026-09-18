// HTTP client for fakestoreapi.com, built on Playwright's APIRequestContext
// (injected via constructor, reused across requests).
import { APIRequestContext, APIResponse } from '@playwright/test';
import { API_BASE_URL } from '../config/env';

export class ProductsApiClient {
  private static readonly BASE_URL = API_BASE_URL;

  constructor(private readonly request: APIRequestContext) {}

  // Every network call is async, returns Promise<APIResponse>.
  async getAllProducts(): Promise<APIResponse> {
    return this.request.get(`${ProductsApiClient.BASE_URL}/products`);
  }

  async getProduct(productId: number): Promise<APIResponse> {
    return this.request.get(`${ProductsApiClient.BASE_URL}/products/${productId}`);
  }
}
