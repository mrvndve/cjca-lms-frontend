import { 
  Fragment,
} from 'react';

import { 
  TextField,
  Button,
  Loading,
  EmptyBanner,
} from '../../../components';

import { 
  apiDomain,
} from '../../../utils';

import useDatabaseBackupForm from '../../../hooks/use-database-backup-form';

import { 
  isEmpty,
} from 'lodash';

const DatabaseBackupForm = () => {
  const {
    register,
    fieldErrors,
    onSubmit,
    handleSubmit,
    backups,
    loading,
  } = useDatabaseBackupForm();

  return <>
    {!loading
      ?
      <Fragment>
        <form id='sql-backup-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='row g-3'>
            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <TextField
                name='file_name'
                label='File Name'
                {...register('file_name', { 
                  required: 'File name field is required.',
                })}
                errors={fieldErrors}
              />
            </div>

            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <Button
                style={{ width: '100%' }}
                type='submit'
                label='Create Backup'
              />
            </div>
          </div>
        </form>

        <div className='mt-4'>
          <div className='mb-2'>
            <strong>
              Files
            </strong>
          </div>

          <div             
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              height: 180,
            }}
          >
            <div className='row g-3'>
              {!isEmpty(backups) 
                ?
                backups.map((i, index) => (
                  <Fragment key={index}>
                    <div className='col-12'>
                      <a 
                        href={`${apiDomain}/backup/${i.file_name}`}
                        target='_blank'
                        style={{ color: 'black' }}
                      >
                        {i.file_name}
                      </a> 
                    </div>
                  </Fragment>
                ))
                :
                <EmptyBanner text='No files found.'/>
              }
            </div>
          </div>
        </div>
      </Fragment>
      :
      <Loading/>
    }
  </>
};

export default DatabaseBackupForm;