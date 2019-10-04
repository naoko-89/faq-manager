import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

const ConversationType = props => {
  const { styles, inputLabel, labelWidth, selectsValue, selectsChange } = props
  return (
    <Card className={styles.card}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title='質問分類を選択'
        subheaderTypographyProps={{ variant: 'subtitle1' }}
        subheader='FAQの分類を選択してください。分類によって入力内容が異なります。'
      />
      <CardContent>
        <CardActions>
          <FormControl className={styles.formControl} variant='outlined'>
            <InputLabel ref={inputLabel} htmlFor='conversationType'>
              質問分類
            </InputLabel>
            <Select
              value={selectsValue.conversationType}
              onChange={selectsChange}
              input={
                <OutlinedInput
                  name='conversationType'
                  labelWidth={labelWidth}
                  id='conversationType'
                />
              }
            >
              <MenuItem value='機能の説明'>機能の説明</MenuItem>
              <MenuItem value='商品質問'>商品質問</MenuItem>
              <MenuItem value='トラブルシュート'>トラブルシュート</MenuItem>
            </Select>
          </FormControl>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default ConversationType

ConversationType.propTypes = {
  styles: PropTypes.object,
  inputLabel: PropTypes.object,
  labelWidth: PropTypes.number,
  selectsValue: PropTypes.object,
  selectsChange: PropTypes.func
}
