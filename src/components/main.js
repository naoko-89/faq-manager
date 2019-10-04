import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import RegistAppBar from './appBar'
import MainTable from './table'
import PropTypes from 'prop-types'

const Main = props => {
  const {
    faqs,
    checkStates,
    selectsValue,
    texts,
    addFaq,
    updateFaq,
    deleteFaq,
    searchFaq,
    researchFaq
  } = props

  return (
    <MuiThemeProvider theme={theme}>
      <RegistAppBar
        faqs={faqs}
        checkStates={checkStates}
        selectsValue={selectsValue}
        texts={texts}
        addFaq={addFaq}
      />
      <MainTable
        faqs={faqs}
        checkStates={checkStates}
        selectsValue={selectsValue}
        texts={texts}
        updateFaq={updateFaq}
        deleteFaq={deleteFaq}
        searchFaq={searchFaq}
        researchFaq={researchFaq}
      />
    </MuiThemeProvider>
  )
}

Main.propTypes = {
  faqs: PropTypes.array,
  checkStates: PropTypes.object,
  selectsValue: PropTypes.object,
  texts: PropTypes.object,
  addFaq: PropTypes.func,
  updateFaq: PropTypes.func,
  deleteFaq: PropTypes.func,
  searchFaq: PropTypes.func,
  researchFaq: PropTypes.func
}

export default Main
