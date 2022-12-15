import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { services } from '../../../services';

export type FeedbackContextType = {
  data: {
    balance: number;
    dark_balance: number;
    targetUser: UserData;
    feedbackType: FeedbackType;
    feedbacksData: {
      feedbacks: Feedback[];
      totalPages: number;
      currentPage: number;
    };
    isModalOpen: boolean;
  };
  actions: {
    changeFeedbackType: (type: FeedbackType) => void;
    changePage: (page: number) => void;
    setModalOpen: (open: boolean) => void;
    reloadFeedbacks: () => void;
  };
};

export const FeedbackContext = createContext<FeedbackContextType>({
  data: {
    balance: 0,
    dark_balance: 0,
    targetUser: null,
    feedbackType: null,
    feedbacksData: {
      feedbacks: [],
      totalPages: 0,
      currentPage: 0,
    },
    isModalOpen: false,
  },
  actions: {
    changeFeedbackType: () => null,
    changePage: () => null,
    reloadFeedbacks: () => null,
    setModalOpen: () => null,
  },
});

export const FeedbackProvider: FC = ({ children }) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const [feedbackType, setFeedbackType] = useState<FeedbackType>('both');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const targetUserId = searchParams.get('user');

  const {
    data: { feedbacks, totalPages },
  } = useQuery(
    ['feedback-page', 'feedbacks', page, feedbackType, targetUserId],
    () =>
      services.feedback
        .listUserFeedbacks({
          page,
          ...(targetUserId && { id: targetUserId }),
          feedbackType,
        })
        .then(({ data }) => data),
    {
      initialData: {
        feedbacks: [],
        totalPages: 0,
      },
    }
  );

  const {
    data: { balance, dark_balance },
  } = useQuery(
    ['feedback-page', 'balances', targetUserId],
    () =>
      services.feedback.getUserBalance(targetUserId).then(({ data }) => data),
    {
      initialData: {
        balance: 0,
        dark_balance: 0,
      },
    }
  );

  const { data: targetUser } = useQuery(
    ['feedback-page', 'target-user-info', targetUserId],
    () =>
      services.user
        .getUserInfo(targetUserId)
        .then(({ data: { name, ...rest } }) => ({
          ...rest,
          name: `${targetUserId ? '' : 'Olá '}${name}`,
        }))
  );

  const changePage = useCallback(
    (targetPage: number) => {
      setPage(Math.max(Math.min(targetPage, totalPages), 1));
    },
    [totalPages]
  );

  const value = useMemo(
    () => ({
      data: {
        balance,
        dark_balance,
        targetUser,
        feedbackType,
        feedbacksData: {
          feedbacks,
          totalPages,
          currentPage: page,
        },
        isModalOpen,
      },
      actions: {
        changeFeedbackType: (type: FeedbackType) => setFeedbackType(type),
        changePage,
        reloadFeedbacks: () => {
          queryClient.invalidateQueries('feedback-page');
        },
        setModalOpen: (bool: boolean) => setIsModalOpen(bool),
      },
    }),
    [
      balance,
      dark_balance,
      targetUser,
      feedbackType,
      feedbacks,
      totalPages,
      page,
      isModalOpen,
      changePage,
      queryClient,
    ]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);

  if (!context) throw new Error('Component not contained by provider!');

  return context;
};
