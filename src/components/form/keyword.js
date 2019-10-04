import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'

import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Category from './category'

const Keyword = props => {
  const {
    faqs,
    styles,
    texts,
    onKeywordChange,
    addChipKeywords,
    checkStates,
    checkedChange
  } = props

  const handleClick = item => () => {
    addChipKeywords(item)
  }

  // 登録済みの全キーワードを配列に格納
  const allKeywords = []
  faqs.map(items => {
    items.Keywords.map(item => {
      allKeywords.push(item)
    })
  })

  // 重複しているキーワードをカウントする
  const counts = {}
  for (let i = 0; i < allKeywords.length; i++) {
    const key = allKeywords[i]
    counts[key] = counts[key] ? counts[key] + 1 : 1
  }

  // 降順にソートする
  const sort = Object.entries(counts)
    .map(([key, value]) => ({ key, value }))
    .sort(function(x, y) {
      return y.value - x.value
    })

  // 表示用の配列に格納する
  const distKeywords = []
  sort.map(item => {
    distKeywords.push(item.key)
  })

  // 上位5個
  const top5Keywords = []
  for (let i = 0; i < 5; i++) {
    top5Keywords.push(
      <Chip
        key={i}
        className={styles.chip}
        label={distKeywords[i]}
        onClick={handleClick(distKeywords[i])}
        icon={<DoneIcon />}
      />
    )
  }

  // その他
  const otherKeywords = []
  for (let i = 6; i < distKeywords.length; i++) {
    otherKeywords.push(
      <Chip
        key={i}
        className={styles.chip}
        label={distKeywords[i]}
        onClick={handleClick(distKeywords[i])}
        icon={<DoneIcon />}
      />
    )
  }

  return (
    <Card className={styles.card}>
      <CardHeader
        titleTypographyProps={{ variant: 'subtitle1' }}
        title='キーワードの設定'
        subheaderTypographyProps={{ variant: 'subtitle2' }}
        subheader='ボットがFAQを特定するための判断材料としてキーワードを登録できます。'
      />
      <CardContent>
        <Category
          styles={styles}
          checkStates={checkStates}
          checkedChange={checkedChange}
          faqs={faqs}
        />
        <CardActions>
          <Grid item xs={12}>
            <FormControl className={styles.textField}>
              <TextField
                id='KeyWords'
                label='キーワード'
                placeholder='例：QRコード,PDF'
                helperText='[任意]　複数指定可。(カンマ[,]で連結) 単語のみ。(✕：QRコードのサイズ)'
                margin='normal'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                onChange={onKeywordChange}
                value={texts.Keywords}
              />
            </FormControl>
          </Grid>
        </CardActions>
        <CardActions className={styles.cardAction}>
          <Grid item xs={6}>
            {top5Keywords}
          </Grid>
        </CardActions>
        <CardActions className={styles.cardAction}>
          <Grid item xs={6}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                他のキーワードから選ぶ
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  {otherKeywords}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default Keyword

Keyword.propTypes = {
  faqs: PropTypes.array,
  styles: PropTypes.object,
  texts: PropTypes.object,
  onKeywordChange: PropTypes.func,
  addChipKeywords: PropTypes.func,
  checkStates: PropTypes.object,
  checkedChange: PropTypes.func
}
