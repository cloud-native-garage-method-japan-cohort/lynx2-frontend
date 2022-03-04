import React from 'react'
import Typography from '@material-ui/core/Typography'

const Item = ({recvText}) => {
  return (
    <Typography variant='body1' style={{marginBottom: 15}}>
       {recvText}
    </Typography>
  )
}

export default Item
