import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import MaterialTable, { MTableToolbar } from 'material-table'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'

const columns = [
  {
    title: '質問分類',
    field: 'ConversationType',
    cellStyle: { width: 120, maxWidth: 120 },
    headerStyle: { width: 120, maxWidth: 120 }
  },
  {
    title: 'タイトル',
    field: 'ExpectedQuestion',
    cellStyle: { width: 500, maxWidth: 500 },
    headerStyle: { width: 500, maxWidth: 500 }
  },
  {
    title: 'カテゴリー',
    field: 'FunctionType',
    cellStyle: { width: 200, maxWidth: 200 },
    headerStyle: { width: 200, maxWidth: 200 }
  },
  {
    title: 'キーワード',
    field: 'Keywords',
    cellStyle: { width: 360, maxWidth: 360 },
    headerStyle: { width: 360, maxWidth: 360 }
  }
]

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 'xl',
    margin: 10
  }
}))

const Rows = props => {
  const styles = useStyles()
  const {
    data,
    handleClickOpen,
    handleClickDelOpen,
    chipData,
    handleDelete
  } = props

  const chips = chipData.map((chip, index) => {
    return (
      <Chip
        key={index}
        label={chip}
        style={{ marginRight: 5 }}
        color='secondary'
        onDelete={handleDelete(chipData, chip)}
      />
    )
  })

  return (
    <MaterialTable
      title='FAQ一覧'
      columns={columns}
      data={data}
      actions={[
        {
          icon: 'edit',
          tooltip: 'このFAQを編集',
          onClick: (event, rowData) => handleClickOpen(rowData)
        },
        {
          icon: 'delete',
          tooltip: 'このFAQを削除',
          onClick: (event, rowData) => handleClickDelOpen(rowData)
        }
      ]}
      options={{
        grouping: true,
        addRowPosition: 'first'
      }}
      localization={{
        body: {
          emptyDataSourceMessage:
            '検索条件に一致する項目が見つかりませんでした。'
        },
        grouping: {
          placeholder:
            'ここにヘッダー項目をドラッグアンドドロップすると、項目ごとにグループ表示することができます。'
        },
        header: {
          actions: ''
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} / {count}',
          labelRowsSelect: '行',
          firstAriaLabel: '最初のページへ',
          firstTooltip: '最初のページへ',
          PreviousPage: '前へ',
          previousTooltip: '前へ',
          nextAriaLabel: '次へ',
          nextTooltip: '次へ',
          lastAriaLabel: '最後のページへ',
          lastTooltip: '最後のページへ'
        },
        toolbar: {
          searchTooltip: '検索',
          searchPlaceholder: '検索'
        }
      }}
      components={{
        // eslint-disable-next-line react/display-name
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            <div style={{ padding: '0px 10px' }}>{chips}</div>
          </div>
        )
      }}
      detailPanel={rowData => {
        let answer = ''

        switch (rowData.ConversationType) {
          case '機能の説明':
            answer = (
              <CardContent>
                <Box
                  fontSize={15}
                  color='primary.main'
                  fontWeight='fontWeightBold'
                >
                  できること(What)
                </Box>
                <Box
                  fontSize={13}
                  color='primary.dark'
                  m={3}
                  marginTop={1}
                  whiteSpace='pre-line'
                >
                  {rowData.row.ResponseWhat}
                </Box>
                <Box
                  fontSize={15}
                  color='primary.main'
                  fontWeight='fontWeightBold'
                >
                  使い方(How)
                </Box>
                <Box
                  fontSize={13}
                  color='primary.dark'
                  m={3}
                  marginTop={1}
                  whiteSpace='pre-line'
                >
                  {rowData.row.ResponseHow}
                </Box>
              </CardContent>
            )
            break
          case '商品質問':
          case 'トラブルシュート':
            answer = (
              <CardContent>
                <Box
                  fontSize={15}
                  color='primary.main'
                  fontWeight='fontWeightBold'
                >
                  回答文
                </Box>
                <Box
                  fontSize={13}
                  color='primary.dark'
                  m={3}
                  marginTop={1}
                  whiteSpace='pre-line'
                >
                  {rowData.row.ResponseHow}
                </Box>
              </CardContent>
            )
            break
          default:
            return answer
        }
        return <Card className={styles.card}>{answer}</Card>
      }}
    />
  )
}

Rows.propTypes = {
  data: PropTypes.array,
  handleClickOpen: PropTypes.func,
  handleClickDelOpen: PropTypes.func,
  chipData: PropTypes.array,
  handleDelete: PropTypes.func
}

export default Rows
