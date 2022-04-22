import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { services } from '../../../services';

export type FeedbackContextType = {
  data: {
    balance: number;
    targetUser: UserData;
    feedbacksData: {
      feedbacks: Feedback[];
      totalPages: number;
      currentPage: number;
    };
    isModalOpen: boolean;
  };
  actions: {
    changePage: (page: number) => void;
    setModalOpen: (open: boolean) => void;
    reloadFeedbacks: () => void;
  };
};

export const FeedbackContext = createContext<FeedbackContextType>({
  data: {
    balance: 0,
    targetUser: null,
    feedbacksData: {
      feedbacks: [],
      totalPages: 0,
      currentPage: 0,
    },
    isModalOpen: false,
  },
  actions: {
    changePage: () => null,
    reloadFeedbacks: () => null,
    setModalOpen: () => null,
  },
});

export const FeedbackProvider: FC = ({ children }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [balance, setBalance] = useState(0);
  const [targetUser, setTargetUser] = useState<UserData | null>();
  const [needReload, setNeedReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const targetUserId = searchParams.get('user');

  useEffect(() => {
    services.feedback
      .listUserFeedbacks({ page, ...(targetUserId && { id: targetUserId }) })
      .then(({ data }) => {
        setFeedbacks(data.feedbacks);
        setTotalPages(data.totalPages);
      });
  }, [page, targetUserId]);

  useEffect(() => {
    services.feedback.getUserBalance(targetUserId).then(({ data }) => {
      setBalance(data);
    });
    services.user
      .getUserInfo(targetUserId)
      .then(({ data: { name, ...rest } }) => {
        setTargetUser({
          ...rest,
          name: `${targetUserId ? '' : 'Olá '}${name}`,
        });
      });
  }, [targetUserId]);

  useEffect(() => {
    if (needReload) {
      services.feedback
        .listUserFeedbacks({ page, ...(targetUserId && { id: targetUserId }) })
        .then(({ data }) => {
          setFeedbacks(data.feedbacks);
          setTotalPages(data.totalPages);
        });
      services.feedback.getUserBalance(targetUserId).then(({ data }) => {
        setBalance(data);
      });
      setNeedReload(false);
    }
  }, [needReload, page, targetUserId]);

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
        targetUser,
        feedbacksData: {
          feedbacks,
          totalPages,
          currentPage: page,
        },
        isModalOpen,
      },
      actions: {
        changePage,
        reloadFeedbacks: () => setNeedReload(true),
        setModalOpen: (bool: boolean) => setIsModalOpen(bool),
      },
    }),
    [balance, feedbacks, isModalOpen, targetUser, totalPages, page, changePage]
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
