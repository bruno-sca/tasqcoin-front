import { api, ApiResponse } from './api';

type FeedbackService = {
  listUserFeedbacks(
    payload?: ListFeedbackRequest
  ): ApiResponse<ListFeedbackResponse>;
  getUserBalance(
    payload?: string
  ): ApiResponse<{ balance: number; dark_balance: number }>;
  createFeedback(payload?: CreateFeedbackRequest): ApiResponse<void>;
};

export const feedback: FeedbackService = {
  listUserFeedbacks: async (payload) =>
    api.get(`/feedbacks`, {
      params: {
        ...payload,
      },
    }),
  getUserBalance: async (payload?) =>
    api.get('/feedbacks/balance', {
      params: {
        ...(payload && { id: payload }),
      },
    }),
  createFeedback: async (payload?) => api.post('/feedbacks', payload),
};
