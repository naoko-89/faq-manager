import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import EditForm from './editForm'
import WarningDialog from './warningDialog'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  button: {
    margin: theme.spacing(1)
  }
}))

// ダイアログの表示方法(下から上)
function slideDisplay(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
}
const Transition = React.forwardRef(slideDisplay)

// warningメッセージ
let message = ''

// 登録フォームのダイアログ
const EntryDialog = props => {
  const styles = useStyles()
  const {
    open,
    onShowDialog,
    faqs,
    checkStates,
    selectsValue,
    texts,
    id,
    addFaq,
    updateFaq,
    add,
    update
  } = props

  const handleClose = () => {
    if (checkInput(editCheckStates, editSelectsValue, editTexts)) {
      if (add) {
        addFaq(editCheckStates, editSelectsValue, editTexts)

        // 登録フォームを初期値に戻す
        setEditSelectsValue({ ...editSelectsValue, ...selectsValue })
        setEditCheckStates({ ...editCheckStates, ...checkStates })
        setEditTexts({ ...editTexts, ...texts })
      }
      if (update) {
        updateFaq(id, editCheckStates, editSelectsValue, editTexts)
      }
      windowClose()
    } else {
      handleWarningOpen()
    }
  }

  const windowClose = () => {
    onShowDialog(false)
  }

  // 入力内容に不備がある場合のダイアログ表示
  const [warningOpen, setWarningOpen] = React.useState(false)
  const handleWarningOpen = () => {
    setWarningOpen(true)
  }
  const onShowWarningDialog = visible => {
    setWarningOpen(visible)
  }

  const checkInput = (editCheckStates, selectsValue, texts) => {
    const checks = Object.entries(editCheckStates).map(([key, value]) => ({
      key,
      value
    }))

    if (checks.filter(x => x.value === true).length <= 0) {
      message =
        'キーワードのカテゴリーが選択されていません。必ず1つ以上選択してください。'
      return false
    }

    if (selectsValue.conversationType === '') {
      message = '「質問分類」が選択されていません。'
      return false
    }

    if (selectsValue.conversationType === '機能の説明') {
      if (texts.ExpectedQuestion === '') {
        message = '「タイトル」が入力されていません。'
        return false
      }
      if (texts.ResponseWhat === '') {
        message = '「なにができるか(Waht)が入力されていません。'
        return false
      }
      if (texts.ResponseHow === '') {
        message = '「どうやって使うのか(How)」が入力されていません。'
        return false
      }
    }

    if (
      selectsValue.conversationType === '商品質問' ||
      selectsValue.conversationType === 'トラブルシュート'
    ) {
      if (texts.ExpectedQuestion === '') {
        message = '「質問文」が入力されていません。'
        return false
      }
      if (texts.KeyWords === '') {
        message = '「キーワード」が入力されていません。'
        return false
      }
      if (texts.ResponseHow === '') {
        message = '「回答文」が入力されていません。'
        return false
      }
    }
    return true
  }

  // checkbox
  const [editCheckStates, setEditCheckStates] = React.useState({
    ...checkStates
  })

  React.useEffect(() => {
    setEditCheckStates({ ...editCheckStates, ...checkStates })
  }, [checkStates])

  const checkedChange = event => {
    setEditCheckStates({
      ...editCheckStates,
      [event.target.value]: event.target.checked
    })
  }

  // selects
  const [editSelectsValue, setEditSelectsValue] = React.useState({
    ...selectsValue
  })

  const selectsChange = event => {
    setEditSelectsValue({
      ...editSelectsValue,
      [event.target.name]: event.target.value
    })
  }

  React.useEffect(() => {
    setEditSelectsValue({ ...editSelectsValue, ...selectsValue })
  }, [selectsValue])

  // textFields
  const [editTexts, setEditTexts] = React.useState({
    ...texts
  })

  const onExpectedQuestionChange = event => {
    setEditTexts({ ...editTexts, ExpectedQuestion: event.target.value })
  }

  const onKeywordChange = event => {
    setEditTexts({ ...editTexts, Keywords: event.target.value })
  }

  const onResponseWhatChange = event => {
    setEditTexts({ ...editTexts, ResponseWhat: event.target.value })
  }

  const onResponseHowChange = event => {
    setEditTexts({ ...editTexts, ResponseHow: event.target.value })
  }

  React.useEffect(() => {
    setEditTexts({ ...editTexts, ...texts })
  }, [texts])

  // chipからキーワードを選択したとき
  const [chipKeyword, setChipKeyword] = React.useState([])
  const addChipKeywords = item => {
    const keywords = []
    keywords.push(...chipKeyword)
    keywords.push(item)
    setChipKeyword([...keywords])
  }

  React.useEffect(() => {
    const current = editTexts.Keywords.split(',')

    let marge = []
    let dist = []
    if (current[0] === '') {
      dist = [...new Set(chipKeyword)]
    } else {
      marge = [...current, ...chipKeyword]
      dist = [...new Set(marge)]
    }

    let words = ''
    dist.map(item => {
      words += item + ','
    })
    words = words.slice(0, -1)

    setEditTexts({ ...editTexts, Keywords: words })
  }, [chipKeyword])

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={windowClose}
            aria-label='Close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={styles.title}>
            FAQの追加と編集
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            className={styles.button}
            onClick={handleClose}
          >
            変更を保存する
          </Button>
        </Toolbar>
      </AppBar>
      <EditForm
        faqs={faqs}
        selectsValue={editSelectsValue}
        checkStates={editCheckStates}
        texts={editTexts}
        selectsChange={selectsChange}
        checkedChange={checkedChange}
        onExpectedQuestionChange={onExpectedQuestionChange}
        onKeywordChange={onKeywordChange}
        addChipKeywords={addChipKeywords}
        onResponseWhatChange={onResponseWhatChange}
        onResponseHowChange={onResponseHowChange}
      />
      <WarningDialog
        open={warningOpen}
        onShowDialog={onShowWarningDialog}
        message={message}
      />
    </Dialog>
  )
}

EntryDialog.propTypes = {
  open: PropTypes.bool,
  onShowDialog: PropTypes.func,
  faqs: PropTypes.array,
  checkStates: PropTypes.object,
  selectsValue: PropTypes.object,
  texts: PropTypes.object,
  id: PropTypes.string,
  addFaq: PropTypes.func,
  updateFaq: PropTypes.func,
  add: PropTypes.bool,
  update: PropTypes.bool
}

export default EntryDialog
