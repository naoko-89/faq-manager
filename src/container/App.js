import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Main from '../components/main'
import faq from '../actions/faqs'

const App = props => {
  const { dispatch, data, checkStates, selectsValue, texts } = props

  useEffect(() => {
    dispatch(faq.loadFaqs())
  }, [])

  const addFaq = (editCheckStates, editSelectsValue, editTexts) => {
    dispatch(faq.addFaq(editCheckStates, editSelectsValue, editTexts))
  }

  const updateFaq = (id, editCheckStates, editSelectsValue, editTexts) => {
    dispatch(faq.updateFaq(id, editCheckStates, editSelectsValue, editTexts))
  }

  const deleteFaq = id => {
    dispatch(faq.deleteFaq(id))
  }

  const searchFaq = keyword => {
    dispatch(faq.searchFaq(keyword))
  }

  const researchFaq = keywords => {
    dispatch(faq.researchFaq(keywords))
  }

  return (
    <Main
      faqs={data}
      checkStates={checkStates}
      selectsValue={selectsValue}
      texts={texts}
      addFaq={addFaq}
      updateFaq={updateFaq}
      deleteFaq={deleteFaq}
      searchFaq={searchFaq}
      researchFaq={researchFaq}
    />
  )
}

const mapStateToProps = state => {
  return {
    data: state.faqs.data ? state.faqs.data : [],
    checkStates: state.faqs.checkStates,
    selectsValue: state.faqs.selectsValue,
    texts: state.faqs.texts
  }
}

export default connect(mapStateToProps)(App)

App.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.array,
  checkStates: PropTypes.object,
  selectsValue: PropTypes.object,
  texts: PropTypes.object
}
