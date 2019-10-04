import { firebaseDb } from '../firebase'
const ref = firebaseDb.ref('faqs')

function loadFaqs() {
  return dispatch => {
    ref.off()
    ref.on(
      'value',
      snapshot => {
        dispatch(loadFaqsSuccues(snapshot))
      },
      error => {
        dispatch(loadFaqsError(error))
      }
    )
  }
}

function loadFaqsSuccues(snapshot) {
  return {
    type: 'FAQS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

function loadFaqsError(error) {
  return {
    type: 'FAQS_RECIVE_ERROR',
    message: error.message
  }
}

const addFaq = (editCheckStates, editSelectsValue, editTexts) => {
  const ConversationType = editSelectsValue.conversationType
  const ExpectedQuestion = editTexts.ExpectedQuestion
  const Keywords = editTexts.Keywords.split(',')
  const ResponseWhat = editTexts.ResponseWhat
  const ResponseHow = editTexts.ResponseHow

  const FunctionType = []
  Object.entries(editCheckStates)
    .map(([key, value]) => ({ key, value }))
    .map(item => {
      if (item.value === true) {
        FunctionType.push(item.key)
      }
    })

  return dispatch => {
    ref
      .push({
        ConversationType,
        ExpectedQuestion,
        FunctionType,
        Keywords,
        ResponseHow,
        ResponseWhat
      })
      .catch(error =>
        dispatch({
          type: 'ADD_FAQ_ERROR',
          message: error.message
        })
      )
  }
}

function updateFaq(id, editCheckStates, editSelectsValue, editTexts) {
  const keyword = []
  editTexts.Keywords.split(',').map(item => {
    keyword.push(item)
  })

  const ConversationType = editSelectsValue.conversationType
  const ExpectedQuestion = editTexts.ExpectedQuestion
  const Keywords = keyword
  const ResponseWhat = editTexts.ResponseWhat
  const ResponseHow = editTexts.ResponseHow

  const FunctionType = []
  Object.entries(editCheckStates)
    .map(([key, value]) => ({ key, value }))
    .map(item => {
      if (item.value === true) {
        FunctionType.push(item.key)
      }
    })

  return dispatch => {
    firebaseDb
      .ref(`faqs/${id}`)
      .update({
        ConversationType,
        ExpectedQuestion,
        FunctionType,
        Keywords,
        ResponseHow,
        ResponseWhat
      })
      .catch(error =>
        dispatch({
          type: 'UPDATE_FAQ_ERROR',
          message: error.message
        })
      )
  }
}

function deleteFaq(id) {
  return dispatch => {
    firebaseDb
      .ref(`faqs/${id}`)
      .remove()
      .catch(error =>
        dispatch({
          type: 'DELETE_FAQ_ERROR',
          message: error.message
        })
      )
  }
}

const researchFaq = keywords => {
  return dispatch => {
    ref.on('value', snapshot => {
      dispatch(loadFaqsSuccues(snapshot))
    })

    keywords.map(keyword => {
      dispatch(searchFaq(keyword))
    })
  }
}

const searchFaq = keyword => {
  return (dispatch, getState) => {
    const state = getState()
    const results = []
    state.faqs.data.map(item => {
      if (item.Keywords.filter(x => x === keyword).length > 0) {
        results.push(item)
      }
    })

    dispatch({
      type: 'FAQS_SEARCH_DATA',
      data: results
    })
  }
}

export default {
  loadFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
  searchFaq,
  researchFaq
}
