import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

import Rows from './rows'
import DeleteDialog from './deleteDialog'
import EntryDialog from './entryDialog'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    marginTop: 80
  },
  chip: { margin: theme.spacing(0.5) }
}))

let id = ''

const MainTable = props => {
  const styles = useStyles()
  const {
    faqs,
    checkStates,
    selectsValue,
    texts,
    updateFaq,
    deleteFaq,
    searchFaq,
    researchFaq
  } = props

  const [editData, setEditData] = React.useState([])
  const [chipData, setChipData] = React.useState([])

  // const [funcTypeChip, setFuncTypeChip] = React.useState([])

  const handleDelete = (chipData, chip) => () => {
    const chips = chipData.filter(x => x !== chip)
    researchFaq(chips)

    setChipData([...chips])
  }

  const handleClickChips = event => {
    const keyword = event.target.textContent

    searchFaq(keyword)

    const chips = []
    chipData.map(chip => {
      chips.push(chip)
    })
    chips.push(keyword)

    const distChips = [...new Set(chips)]
    setChipData([...distChips])
  }

  React.useEffect(() => {
    setChipData([...chipData])
  }, [])

  // chips
  React.useEffect(() => {
    const data = []
    if (faqs.length > 0) {
      faqs.map(item => {
        data.push({
          row: item,
          ConversationType: item.ConversationType,
          ExpectedQuestion: item.ExpectedQuestion,
          Keywords: item.Keywords.map((keyword, index) => {
            return (
              <Chip
                key={index}
                id={keyword}
                className={styles.chip}
                label={keyword}
                onClick={handleClickChips}
              />
            )
          }),
          FunctionType: item.FunctionType.map((funcType, index) => {
            return (
              <Chip
                key={index}
                id={funcType}
                className={styles.chip}
                label={funcType}
              />
            )
          })
        })
      })
    }

    setEditData([...data])
  }, [faqs])

  // checkbox
  const [editCheckStates, setEditCheckStates] = React.useState({
    ...checkStates
  })

  // selects
  const [editSelectsValue, setEditSeletsValue] = React.useState({
    ...selectsValue
  })

  // texts
  const [editTexts, setEditTexts] = React.useState({
    ...texts
  })

  // 編集ボタンクリック時
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = rowData => {
    const array = []
    Object.entries(checkStates)
      .map(([key, value]) => ({ key, value }))
      .map(item => {
        if (rowData.row.FunctionType.filter(x => x === item.key).length > 0) {
          array.push({ key: item.key, value: true })
        } else {
          array.push({ key: item.key, value: false })
        }
      })

    // 配列をオブジェクトに
    const obj = array.reduce(
      (obj, data) => ({ ...obj, [data.key]: data.value }),
      {}
    )
    setEditCheckStates({ ...editCheckStates, ...obj })

    setEditSeletsValue({
      ...editSelectsValue,
      conversationType: rowData.row.ConversationType
    })

    // 配列のキーワードを文字列に
    let keywords = ''
    rowData.row.Keywords.map(item => {
      keywords += item + ','
    })
    keywords = keywords.slice(0, -1)

    setEditTexts({
      ...editTexts,
      ExpectedQuestion: rowData.row.ExpectedQuestion,
      Keywords: keywords,
      ResponseWhat: rowData.row.ResponseWhat,
      ResponseHow: rowData.row.ResponseHow
    })

    id = rowData.row.key

    setOpen(true)
  }

  const onShowDialog = visible => {
    setOpen(visible)
  }

  // 削除ボタンクリック時
  const [delOpen, setDelOpen] = React.useState(false)
  const handleClickDelOpen = rowData => {
    id = rowData.row.key
    setDelOpen(true)
  }
  const onShowDelDialog = visible => {
    setDelOpen(visible)
  }

  return (
    <Paper className={styles.paper}>
      <Rows
        data={editData}
        handleClickOpen={handleClickOpen}
        handleClickDelOpen={handleClickDelOpen}
        chipData={chipData}
        handleDelete={handleDelete}
      />
      <EntryDialog
        open={open}
        onShowDialog={onShowDialog}
        faqs={faqs}
        updateFaq={updateFaq}
        checkStates={editCheckStates}
        selectsValue={editSelectsValue}
        texts={editTexts}
        id={id}
        add={false}
        update={true}
      />
      <DeleteDialog
        open={delOpen}
        onShowDialog={onShowDelDialog}
        id={id}
        deleteFaq={deleteFaq}
      />
    </Paper>
  )
}

MainTable.propTypes = {
  faqs: PropTypes.array,
  checkStates: PropTypes.object,
  selectsValue: PropTypes.object,
  texts: PropTypes.object,
  updateFaq: PropTypes.func,
  deleteFaq: PropTypes.func,
  searchFaq: PropTypes.func,
  researchFaq: PropTypes.func
}

export default MainTable
