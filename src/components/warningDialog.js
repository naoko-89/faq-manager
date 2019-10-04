import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

// 入力内容に不備がある場合のダイアログ
const WarningDialog = props => {
  const { open, onShowDialog, message } = props

  const handleClose = () => {
    onShowDialog(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Warning!'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

WarningDialog.propTypes = {
  open: PropTypes.bool,
  onShowDialog: PropTypes.func,
  message: PropTypes.string
}

export default WarningDialog
