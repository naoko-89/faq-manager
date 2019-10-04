import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import EntryDialog from './entryDialog'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  fab: {
    margin: theme.spacing(1)
  }
}))

const RegistAppBar = props => {
  const { faqs, addFaq, checkStates, selectsValue, texts } = props
  const styles = useStyles()

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const onShowDialog = visible => {
    setOpen(visible)
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6' className={styles.title}>
          FAQ管理画面
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          className={styles.button}
          onClick={handleClickOpen}
        >
          新規にFAQを登録する
        </Button>
      </Toolbar>
      <EntryDialog
        open={open}
        onShowDialog={onShowDialog}
        faqs={faqs}
        checkStates={checkStates}
        selectsValue={selectsValue}
        texts={texts}
        addFaq={addFaq}
        add={true}
        update={false}
      />
    </AppBar>
  )
}

RegistAppBar.propTypes = {
  faqs: PropTypes.array,
  checkStates: PropTypes.object,
  selectsValue: PropTypes.object,
  texts: PropTypes.object,
  addFaq: PropTypes.func,
  firebase: PropTypes.object
}

export default RegistAppBar
