const initialState = {
  data: [],
  checkStates: {
    製品仕様: false,
    使用環境: false,
    設定方法: false,
    制限事項: false,
    ライセンス: false
  },
  selectsValue: {
    conversationType: ''
  },
  texts: {
    ExpectedQuestion: '',
    Keywords: '',
    ResponseWhat: '',
    ResponseHow: ''
  }
}

function faqs(state = initialState, action) {
  switch (action.type) {
    case 'FAQS_RECEIVE_DATA':
      const faqs = []
      if (action.data) {
        Object.keys(action.data).forEach(key => {
          const faq = action.data[key]
          faqs.push({
            key: key,
            ConversationType: faq.ConversationType,
            ExpectedQuestion: faq.ExpectedQuestion,
            FunctionType: faq.FunctionType,
            Keywords: faq.Keywords,
            ResponseHow: faq.ResponseHow,
            ResponseWhat: faq.ResponseWhat
          })
        })
      }
      return {
        ...state,
        data: faqs,
        checkStates: state.checkStates,
        selectsValue: state.selectsValue,
        texts: state.texts
      }

    case 'FAQS_SEARCH_DATA':
      return {
        ...state,
        data: action.data,
        checkStates: state.checkStates,
        selectsValue: state.selectsValue,
        texts: state.texts
      }

    case 'FAQS_RECIVE_ERROR':
    case 'ADD_FAQ_ERROR':
    case 'UPDATE_FAQ_ERROR':
    case 'DELETE_FAQ_ERROR':
      alert(action.message)
      break

    default:
      return state
  }
}

export default faqs
