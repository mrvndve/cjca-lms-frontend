import { Fragment } from 'react';

import { 
  EmptyBanner,
  Modal,
  Loading,
  SelectField,
  TextField,
  DateTimeField,
  Button,
  Card,
} from '../../../components';

import {
  Add,
  Delete,
} from '@mui/icons-material';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';

import { 
  isEmpty,
} from 'lodash';

import { 
  numbersOnly, 
} from '../../../utils';

import moment from 'moment';

import useSubjectAssignQuizzesForm from '../../../hooks/use-subject-assign-quizzes-form';

import useSubjectAssignQuizzesQuestionsForm from '../../../hooks/use-subject-assign-quizzes-questions-form';

const QuestionsForm = ({
  questions,
  questionModalOpen,
  handleSetQuestions,
  handleCloseQuestionModal,
}) => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    questionType,
    handleChangeQuestionType,
  } = useSubjectAssignQuizzesQuestionsForm({
    questions,
    questionModalOpen,
    handleSetQuestions,
    handleCloseQuestionModal,
  });

  return <>
    <Modal
      title='Questions'
      width={'25%'}
      isOpen={questionModalOpen}
      handleClose={handleCloseQuestionModal}
    >
      <form id='assign-question-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='row g-3'>
          <div className='col-12'>
            <TextField
              name='question'
              label='Question'
              {...register('question', { 
                required: 'question field is required.',
              })}
              errors={fieldErrors}
            />
          </div>

          <div className='col-12'>
            <SelectField
              name='question_type'
              label='Question Type'
              options={[
                {label: 'Multiple Choice', value: 'multiple-choice'},
                {label: 'Fill in the Blank', value: 'fill-blank'},
              ]}
              {...register('question_type', {
                required: 'Question type field is required.'
              })}
              onChange={handleChangeQuestionType}
              errors={fieldErrors}
            />
          </div>

          {questionType === 'multiple-choice' &&
            <Fragment>
              <div className='col-12'>
                <TextField
                  name='choice_a'
                  label='Choice A'
                  {...register('choice_a', { 
                    required: 'Choice A field is required.',
                  })}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <TextField
                  name='choice_b'
                  label='Choice B'
                  {...register('choice_b', { 
                    required: 'Choice A field is required.',
                  })}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <TextField
                  name='choice_c'
                  label='Choice C'
                  {...register('choice_c', { 
                    required: 'Choice C field is required.',
                  })}
                  errors={fieldErrors}
                />
              </div>

              <div className='col-12'>
                <TextField
                  name='choice_d'
                  label='Choice D'
                  {...register('choice_d', { 
                    required: 'Choice D field is required.',
                  })}
                  errors={fieldErrors}
                />
              </div>
            </Fragment>
          }

          {!isEmpty(questionType) &&
            <Fragment>
              {questionType === 'multiple-choice'
              ?
              <div className='col-12'>
                <SelectField
                  name='correct_answer'
                  label='Correct Answer'
                  options={[
                    {label: 'A', value: 'a'},
                    {label: 'B', value: 'b'},
                    {label: 'C', value: 'c'},
                    {label: 'D', value: 'd'}
                  ]}
                  {...register('correct_answer', {
                    required: 'Correct answer field is required.'
                  })}
                  errors={fieldErrors}
                />
              </div>
              :
              <div className='col-12'>
                <TextField
                  name='correct_answer'
                  label='Correct Answer'
                  {...register('correct_answer', { 
                    required: 'Correct answer field is required.',
                  })}
                  errors={fieldErrors}
                />
              </div>
            }
            </Fragment>
          }

          <div className='col-12'>
            <TextField
              name='points'
              label='Points'
              {...register('points', { 
                required: 'Points field is required.',
                pattern: {
                  value: numbersOnly,
                  message: 'points field must be numbers only.'
                }
              })}
              errors={fieldErrors}
            />
          </div>
        </div>

          <div className='mt-4' align='right'>
            <Button
              type='submit'
              size='normal'
              label='Add'
            />
          </div>
      </form>
    </Modal>
  </>
};

const Quizzes = ({
  data = [],
  title,
  handleAdd,
  handleRemove,
  isModalOpen,
  handleCloseModal,
  handleSetAssignedQuizzes,
}) => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    questions,
    questionModalOpen,
    handleSetQuestions,
    handleOpenQuestionModal,
    handleCloseQuestionModal,
    handleRemoveElQuestion,
    totalPoints,
  } = useSubjectAssignQuizzesForm({
    isModalOpen,
    handleClose: handleCloseModal,
    handleSetAssignedQuizzes,
  });

  return <>
    <Accordion expanded>
      <AccordionSummary 
        style={{ cursor: 'default' }} 
        expandIcon={
          <IconButton color='primary' component='label' onClick={(e) => handleAdd(e)}>
            <Add/>
          </IconButton>
        }
      >
        <strong>
          {title}
        </strong>
      </AccordionSummary>

      <hr style={{ margin: 0 }}/>

      <AccordionDetails className='p-2'>
        <div style={{ height: 350, overflowY: 'auto', overflowX: 'hidden' }}>
          {!isEmpty(data)
            ?
            <List>
              {data.map((i, index) => (
                <Fragment key={index}>
                  <ListItem
                    alignItems='flex-start'
                    secondaryAction={
                      <IconButton color='error' edge='end' onClick={(e) => handleRemove(e, i)}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={<strong>{i.title}</strong>}
                      secondary={
                        <Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component='span'
                            variant='body2'
                          >
                            {`Due Date: ${moment(i.due_date).format('MMMM DD YYYY h:mm A')}`}
                            <br/>
                            {`Duration: ${i.minutes} minutes`}
                            <br/>
                            {`Total Points: ${i.total_points}`}
                          </Typography>
                        </Fragment>
                      }
                    />
                  </ListItem>
    
                  <Divider component='li' />
                </Fragment>
              ))}
            </List>
            :
            <EmptyBanner text='No quizzes found'/>
          }
        </div>
      </AccordionDetails>
    </Accordion>

    <Modal
      title='Add Quiz'
      width={'60%'}
      isOpen={isModalOpen}
      handleClose={handleCloseModal}
    >
      {!loading
        ?
        <form id='assign-quiz-form' onSubmit={handleSubmit(onSubmit)} >
          <div className='row g-4'>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <TextField
                name='title'
                label='Title'
                {...register('title', { 
                  required: 'Title field is required.',
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <DateTimeField
                name='due_date'
                label='Due Date'
                {...register('due_date', {
                  required: 'Due date field is required.'
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <TextField
                name='minutes'
                label='Minutes'
                {...register('minutes', { 
                  required: 'Minutes field is required.',
                  pattern: {
                    value: numbersOnly,
                    message: 'Minutes field must be numbers only.'
                  }
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <TextField
                name='total_points'
                label='Total Points'
                {...register('total_points', { 
                  required: 'Total points field is required.',
                  pattern: {
                    value: numbersOnly,
                    message: 'Total points field must be numbers only.'
                  }
                })}
                defaultValue={totalPoints}
                errors={fieldErrors}
                readOnly
              />
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>
              <TextField
                name='passing_score'
                label='Passing Score'
                {...register('passing_score', { 
                  required: 'Passing score field is required.',
                  pattern: {
                    value: numbersOnly,
                    message: 'Passing score field must be numbers only.'
                  }
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12' align='right'>
              <Button
                type='button'
                label='Questions'
                startIcon={<Add/>}
                size='normal'
                onClick={() => handleOpenQuestionModal()}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              {!isEmpty(questions)
                ?
                <div className='row g-3' style={{ height: 500, overflowY: 'auto' }}>
                  {questions.map((data, index) => (
                    <Fragment key={index}>
                      <div className='col-12'>
                        <Card
                          elevation={3} 
                          padding={20}
                        >
                          <div className='mb-2'>
                            <span style={{ 
                              fontSize: 18, 
                              fontWeight: 'bold' 
                            }}>
                              {`Question - ${index + 1}`}
                            </span>
                          </div>

                          <div>
                            <span style={{ 
                              fontSize: 15 
                            }}>
                              {data.question}
                            </span>
                          </div>

                          {data.question_type === 'multiple-choice' &&
                            <div className='row g-3 mt-2'>
                              <div className='col-sm-12 col-md-12 col-lg-6 col-lx-6'>
                                <span>
                                  <strong>
                                    a.
                                  </strong> 
                                  
                                  {` ${data.choice_a}`}
                                </span>
                              </div>

                              <div className='col-sm-12 col-md-12 col-lg-6 col-lx-6'>
                                <span>
                                  <strong>
                                    b.
                                  </strong> 
                                  
                                  {` ${data.choice_b}`}
                                </span>
                              </div>

                              <div className='col-sm-12 col-md-12 col-lg-6 col-lx-6'>
                                <span>
                                  <strong>
                                    c.
                                  </strong> 
                                  
                                  {` ${data.choice_c}`}
                                </span>
                              </div>

                              <div className='col-sm-12 col-md-12 col-lg-6 col-lx-6'>
                                <span>
                                  <strong>
                                    d.
                                  </strong> 
                                  
                                  {` ${data.choice_d}`}
                                </span>
                              </div>
                            </div>
                          }

                          <div className='mt-3'>
                            <span style={{ 
                              fontSize: 15 
                            }}>
                              <strong>Correct Answer:</strong> {` ${data.correct_answer}`}
                              
                            </span>
                          </div>

                          <div className='mt-1'>
                            <span style={{ 
                              fontSize: 15 
                            }}>
                              <strong>Points:</strong>{` ${data.points}`}
                            </span>
                          </div>

                          <div className='mt-1' align='right'>
                            <Button 
                              label='Remove'
                              color='error'
                              size='normal'
                              startIcon={<Delete/>}
                              onClick={(e) => handleRemoveElQuestion(e, index)}
                            />
                          </div>
                        </Card>
                      </div>
                    </Fragment>
                  ))}
                </div>
                :
                <Card padding={30}>
                  <EmptyBanner text='Please add a question'/>
                </Card>
              }
            </div>
          </div>

          <div className='mt-4' align='right'>
            <Button
              type='submit'
              size='normal'
              label='Add'
            />
          </div>
        </form>
        :
        <Loading/>
      }

      <QuestionsForm {...{
        questions,
        questionModalOpen,
        handleSetQuestions,
        handleCloseQuestionModal,
      }}/>
    </Modal>
  </>
}

export default Quizzes;