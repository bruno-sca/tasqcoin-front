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
    name: string;
    balance: number;
    coins: number;
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
    name: '',
    balance: 0,
    coins: 0,
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
  const [coins, setCoins] = useState(0);
  const [name, setName] = useState('');
  const [needReload, setNeedReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const targetUser = searchParams.get('user');

  useEffect(() => {
    services.feedback
      .listUserFeedbacks({ page, ...(targetUser && { id: targetUser }) })
      .then(({ data }) => {
        setFeedbacks(data.feedbacks);
        setTotalPages(data.totalPages);
      });
  }, [page, targetUser]);

  useEffect(() => {
    services.feedback.getUserBalance(targetUser).then(({ data }) => {
      setBalance(data);
    });
    services.user.getUserInfo(targetUser).then(({ data }) => {
      setCoins(data.balance);
      setName(`${targetUser ? '' : 'Olá '}${data.name}`);
    });
  }, [targetUser]);

  useEffect(() => {
    if (needReload) {
      services.feedback
        .listUserFeedbacks({ page, ...(targetUser && { id: targetUser }) })
        .then(({ data }) => {
          setFeedbacks(data.feedbacks);
          setTotalPages(data.totalPages);
        });
      services.feedback.getUserBalance(targetUser).then(({ data }) => {
        setBalance(data);
      });
      setNeedReload(false);
    }
  }, [needReload, page, targetUser]);

  const changePage = useCallback(
    (targetPage: number) => {
      setPage(Math.max(Math.min(targetPage, totalPages), 1));
    },
    [totalPages]
  );

  const value = useMemo(
    () => ({
      data: {
        name,
        balance,
        coins,
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
    [balance, coins, feedbacks, isModalOpen, name, totalPages, page, changePage]
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
