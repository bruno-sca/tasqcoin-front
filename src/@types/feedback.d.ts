type Feedback = {
  id: string;
  description: string;
  amount: number;
  type: 'recieved' | 'sent';
  created_at: string;
  user_to: UserData;
  user_from: UserData;
};

type ListFeedbackRequest = {
  id?: string;
  page?: number;
  pageSize?: number;
};

type ListFeedbackResponse = {
  feedbacks: Feedback[];
  totalPages: number;
};

type CreateFeedbackRequest = {
  user_to_id: string;
  description?: string;
  amount: number;
};
