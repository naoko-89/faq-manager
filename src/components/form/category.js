import React from 'react'
import PropTypes from 'prop-types'

import CardActions from '@material-ui/core/CardActions'

import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'

const Category = props => {
  const { styles, checkStates, checkedChange, faqs } = props

  const allFuncType = []
  faqs.map(items => {
    items.FunctionType.map(item => {
      allFuncType.push(item)
    })
  })

  const categories = Object.entries(checkStates)
    .map(([key, value]) => ({ key, value }))
    .map((item, index) => {
      return (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
              checkedIcon={<CheckBoxIcon fontSize='small' />}
              checked={item.value}
              onChange={checkedChange}
              value={item.key}
              color='secondary'
            />
          }
          label={<Box fontSize={14}>{item.key}</Box>}
        />
      )
    })

  return (
    <CardActions className={styles.formControl}>
      <Grid item xs={12}>
        {categories}
      </Grid>
    </CardActions>
  )
}

export default Category

Category.propTypes = {
  styles: PropTypes.object,
  checkStates: PropTypes.object,
  checkedChange: PropTypes.func,
  faqs: PropTypes.array
}
