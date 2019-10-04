import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

import { productQuestionTexts } from '../const'

const ProductQuestion = props => {
  const { styles, texts, onExpectedQuestionChange, onResponseHowChange } = props

  const textFields = productQuestionTexts(
    texts,
    onExpectedQuestionChange,
    onResponseHowChange
  ).map((item, index) => {
    return (
      <CardActions key={index}>
        <Grid item xs={12}>
          <FormControl className={styles.textField}>
            <TextField
              id={item.id}
              label={item.label}
              placeholder={item.placeholder}
              helperText={item.helperText}
              margin='normal'
              variant='outlined'
              //   InputProps={item.InputProps}
              InputLabelProps={{ shrink: true }}
              multiline={item.multiline}
              rows={item.rows}
              onChange={item.onChange}
              value={item.value}
            />
          </FormControl>
        </Grid>
      </CardActions>
    )
  })

  return (
    <Card className={styles.card}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title='商品質問/トラブルシュート'
        subheaderTypographyProps={{ variant: 'subtitle1' }}
        subheader='以下の必要項目を入力してください。'
      />
      <CardContent>{textFields}</CardContent>
    </Card>
  )
}

export default ProductQuestion

ProductQuestion.propTypes = {
  styles: PropTypes.object,
  texts: PropTypes.object,
  onExpectedQuestionChange: PropTypes.func,
  onResponseWhatChange: PropTypes.func,
  onResponseHowChange: PropTypes.func
}
