import { 
  Fragment,
} from 'react';

import { 
  Card,
  Button,
  SelectField,
  TextField,
  ConfirmationDialog,
} from '../../components';

import { 
  isEmpty, 
} from 'lodash';

import useStudentExamsFormPage from '../../hooks/use-student-exams-form-page';

const ExamFormPage = () => {
  const {
    openDialog,
    dialogMessage,
    dialogTitle,
    handleClose,
    handleYes,
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    loading,
    selectedRow,
    questions,
    handleExitExam,
    minutes,
    seconds,
  } = useStudentExamsFormPage();

  const {
    title,
  } = selectedRow;

  return <>
    <form id='exam-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <h5>
          {`${title} - Timer: ${minutes}:${seconds}`}
        </h5>
      </div>

      <div className='row g-3'>
        {!isEmpty(questions) && questions.map((data, index) => (
          <Fragment key={index}>
            <div className='col-12'>
              <Card
                elevation={3} 
                padding={20}
              >
                <div className='mb-4'>
                  <span style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold' 
                  }}>
                    {`Question #${index + 1}`}
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
                  <div className='row d-flex g-3 mt-2'>
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

                    <div className='col-sm-12 col-md-12 col-lg-3 col-lx-3'>
                    </div>

                    <div className='col-sm-12 col-md-12 col-lg-3 col-lx-3'>
                    </div>

                    <div className='col-sm-12 col-md-12 col-lg-3 col-lx-3'>
                    </div>

                    <div className='col-sm-12 col-md-12 col-lg-3 col-lx-3'>
                      <SelectField
                        name={`answer_${index + 1}`}
                        label='Answer'
                        options={[
                          {label: 'A', value: 'a'},
                          {label: 'B', value: 'b'},
                          {label: 'C', value: 'c'},
                          {label: 'D', value: 'd'}
                        ]}
                        {...register(`answer_${index + 1}`, {
                          required: `Question ${index + 1} answer field is required.`
                        })}
                        errors={fieldErrors}
                      />
                    </div>
                  </div>
                }

                {data.question_type !== 'multiple-choice' &&
                  <div className='row g-3'>
                    <div className='col-sm-12 col-md-12 col-lg-3 col-lx-3'>
                    </div>
    
                    <div className='col-sm-12 col-md-12 col-lg-3 col-lx-3'>
                    </div>
    
                    <div className='col-sm-12 col-md-12 col-lg-3 col-lx-3'>
                    </div>
    
                    <div className='col-sm-12 col-md-12 col-lg-3 col-lx-3'>
                      <TextField
                        name={`answer_${index + 1}`}
                        label='Answer'
                        {...register(`answer_${index + 1}`, {
                          required: `Question ${index + 1} answer field is required.`
                        })}
                        errors={fieldErrors}
                      />
                    </div>
                  </div>
                }
              </Card>
            </div>
          </Fragment>
        ))}
      </div>

      <div className='mt-5' align='right'>
        <div className='d-flex justify-content-between'>
          <Button
            style={{ color: 'black', backgroundColor: 'white' }}
            type='button'
            label='Exit'
            size='normal'
            onClick={handleExitExam}
          />

          <Button
            label='Submit'
            size='normal'
          />
        </div>
      </div>
    </form>

    <ConfirmationDialog {...{
      open: openDialog,
      title: dialogTitle,
      message: dialogMessage,
      handleClose,
      handleYes,
    }}/>
  </>
};

export default ExamFormPage;