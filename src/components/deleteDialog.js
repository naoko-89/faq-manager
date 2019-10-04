import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

// 削除ボタンクリック時のダイアログ
const DeleteDialog = props => {
  const { open, onShowDialog, id, deleteFaq } = props

  const handleClose = () => {
    deleteFaq(id)
    windowClose()
  }

  const windowClose = () => {
    onShowDialog(false)
  }

  return (
    <Dialog
      open={open}
      onClose={windowClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'FAQの削除'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          選択されたFAQ項目を削除します。よろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={windowClose} color='primary'>
          いいえ
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  onShowDialog: PropTypes.func,
  id: PropTypes.string,
  deleteFaq: PropTypes.func
}

export default DeleteDialog
