import { api, ApiResponse } from './api';

type FeedbackService = {
  listUserFeedbacks(
    payload?: ListFeedbackRequest
  ): ApiResponse<ListFeedbackResponse>;
  getUserBalance(payload?: string): ApiResponse<number>;
};

export const feedback: FeedbackService = {
  listUserFeedbacks: async (payload) =>
    api.get(`/feedbacks`, {
      params: {
        ...payload,
      },
    }),
  getUserBalance: async (payload?: string) =>
    api.get('/feedbacks/balance', {
      params: {
        ...(payload && { id: payload }),
      },
    }),
};
