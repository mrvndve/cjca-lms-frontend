import { 
  useState,
  useEffect,
} from 'react';

import { 
  useForm,
} from 'react-hook-form';

const useSubjectAssignExamsQuestionsForm = ({
  questions,
  questionModalOpen,
  handleSetQuestions,
  handleCloseQuestionModal,
}) => {
  const [questionType, setQuestionType] = useState('');

  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    handleSetQuestions([...questions, data]);
    handleCloseQuestionModal();
  };

  const handleChangeQuestionType = (e) => {
    setQuestionType(e.target.value);

    if (e.target.value !== 'multiple-choice') {
      unregister('choice_a');
      unregister('choice_b');
      unregister('choice_c');
      unregister('choice_d');
    }

    setValue('correct_answer', '');
  };

  useEffect(() => {
    reset();
    setQuestionType('');

    if (questionType !== 'multiple-choice') {
      unregister('choice_a');
      unregister('choice_b');
      unregister('choice_c');
      unregister('choice_d');
    }

    setValue('correct_answer', '');
  }, [questionModalOpen]);

  return {
    register,
    fieldErrors: errors,
    onSubmit,
    handleSubmit,
    handleChangeQuestionType,
    questionType,
  };
};

export default useSubjectAssignExamsQuestionsForm;