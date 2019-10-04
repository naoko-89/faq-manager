import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

import { descriptionTexts } from '../const'

const Description = props => {
  const {
    styles,
    texts,
    onExpectedQuestionChange,
    onResponseWhatChange,
    onResponseHowChange
  } = props

  const textFields = descriptionTexts(
    texts,
    onExpectedQuestionChange,
    onResponseWhatChange,
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
        title='機能の説明'
        subheaderTypographyProps={{ variant: 'subtitle1' }}
        subheader='以下の必要項目を入力してください。'
      />
      <CardContent>{textFields}</CardContent>
    </Card>
  )
}

export default Description

Description.propTypes = {
  styles: PropTypes.object,
  texts: PropTypes.object,
  onExpectedQuestionChange: PropTypes.func,
  onResponseWhatChange: PropTypes.func,
  onResponseHowChange: PropTypes.func
}
