import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import ConversationType from './form/conversationType'
import Description from './form/description'
import ProductQuestion from './form/productQuestion'
import Keyword from './form/keyword'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    marginTop: 80
  },
  card: {
    maxWidth: 'xl',
    margin: 10
  },
  cardAction: {
    marginLeft: theme.spacing(1.5)
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150
  },
  formLabel: {
    marginBottom: theme.spacing(1)
  },
  textField: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
    whiteSpace: 'pre-line'
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  chipCard: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    margin: theme.spacing(2)
  }
}))

const EditForm = props => {
  const {
    faqs,
    selectsValue,
    checkStates,
    texts,
    selectsChange,
    checkedChange,
    onExpectedQuestionChange,
    onKeywordChange,
    addChipKeywords,
    onResponseWhatChange,
    onResponseHowChange
  } = props

  const styles = useStyles()

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  // 質問分類でカードを切り替える
  let textField = ''
  switch (selectsValue.conversationType) {
    case '機能の説明':
      textField = (
        <React.Fragment>
          <Description
            styles={styles}
            texts={texts}
            onExpectedQuestionChange={onExpectedQuestionChange}
            onResponseWhatChange={onResponseWhatChange}
            onResponseHowChange={onResponseHowChange}
          />
          <Keyword
            faqs={faqs}
            styles={styles}
            texts={texts}
            onKeywordChange={onKeywordChange}
            addChipKeywords={addChipKeywords}
            checkStates={checkStates}
            checkedChange={checkedChange}
          />
        </React.Fragment>
      )
      break
    case '商品質問':
    case 'トラブルシュート':
      textField = (
        <React.Fragment>
          <ProductQuestion
            styles={styles}
            texts={texts}
            onExpectedQuestionChange={onExpectedQuestionChange}
            onResponseHowChange={onResponseHowChange}
          />
          <Keyword
            faqs={faqs}
            styles={styles}
            texts={texts}
            onKeywordChange={onKeywordChange}
            addChipKeywords={addChipKeywords}
            checkStates={checkStates}
            checkedChange={checkedChange}
          />
        </React.Fragment>
      )
      break
    default:
      textField = ''
  }

  return (
    <Container maxWidth='xl'>
      <Paper className={styles.paper}>
        <ConversationType
          styles={styles}
          inputLabel={inputLabel}
          labelWidth={labelWidth}
          selectsValue={selectsValue}
          selectsChange={selectsChange}
        />
        {textField}
      </Paper>
    </Container>
  )
}

EditForm.propTypes = {
  faqs: PropTypes.array,
  selectsValue: PropTypes.object,
  checkStates: PropTypes.object,
  texts: PropTypes.object,
  selectsChange: PropTypes.func,
  checkedChange: PropTypes.func,
  onExpectedQuestionChange: PropTypes.func,
  onKeywordChange: PropTypes.func,
  addChipKeywords: PropTypes.func,
  onResponseWhatChange: PropTypes.func,
  onResponseHowChange: PropTypes.func
}

export default EditForm
