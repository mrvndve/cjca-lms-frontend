import React from 'react';

import { 
  Paper,
  Card as MUICard,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

import { 
  apiDomain, 
} from '../utils';

const Card = ({
  style = {},
  padding,
  elevation = 1,
	children,
  onClick,
}) => {
	return <>
    <Paper
      style={{...{
        padding: padding,
      }, ...style}}
      elevation={elevation}
      onClick={onClick}
    >
      {children}
    </Paper>
	</>
};

const CardWithMedia = ({
  className,
  style = {},
  contentStyle = {},
  title,
  subheader,
  children,
}) => {
  return <>
    <MUICard
      className={className}
      style={{...{}, ...style}}
    >
      <CardHeader
        title={title}
        subheader={subheader}
      />

      <CardMedia
        component='img'
        height='150'
        image={`${apiDomain}/uploads/book-lessons.jpeg`}
        alt=''
      />

      <CardContent style={{...{}, ...contentStyle}}>
        <div>
          {children}
        </div>
      </CardContent>
    </MUICard>
  </>
}

export {
  Card,
  CardWithMedia,
};