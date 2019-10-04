export const descriptionTexts = (
  texts,
  onExpectedQuestionChange,
  onResponseWhatChange,
  onResponseHowChange
) => [
  {
    id: 'Title',
    label: 'タイトル',
    placeholder: '例：QRコード付きPDF',
    helperText: '[*必須]　FAQの要旨を入力してください。',
    multiline: false,
    rows: 1,
    onChange: onExpectedQuestionChange,
    value: texts.ExpectedQuestion
  },
  {
    id: 'ResponseWhat',
    label: 'なにができるか(What)',
    placeholder:
      '例：\nQRコードが印刷された文書です。\nQRコードスキャナーやハイパーギアのPDF変換製品で読み込み様々な処理が行えます。',
    helperText:
      '[*必須]　その機能ができること(なにをどのうように処理するのか)を入力してください。',
    multiline: true,
    rows: 4,
    onChange: onResponseWhatChange,
    value: texts.ResponseWhat
  },
  {
    id: 'ResponseHow',
    label: 'どうやって使うのか(How)',
    placeholder:
      '例：\n以下の条件を除き、PDFをQRオートプリンタで印刷してQRコードを貼付することができます。\n1.PDFファイルが画像データで構成されている。(マウスでテキストが選択できない)\n2.PDFファイルはテキストデータで構成されているが、印刷時に画像データを送信するアプリケーションを使用している。',
    helperText: '[*必須]　その機能の使用方法を入力してください。',
    multiline: true,
    rows: 4,
    onChange: onResponseHowChange,
    value: texts.ResponseHow
  }
]

export const productQuestionTexts = (
  texts,
  onExpectedQuestionChange,
  onResponseHowChange
) => [
  {
    id: 'Title',
    label: '質問文(How)',
    placeholder: '例：サーバーはログオフしても使えますか？',
    helperText: '[*必須]　想定される質問文を入力してください。',
    multiline: false,
    rows: 1,
    onChange: onExpectedQuestionChange,
    // InputProps: (
    //   <InputAdornment position='end'>
    //     <Tooltip title='キーワードを解析する'>
    //       <IconButton edge='end' aria-label='find_in_page'>
    //         <FindIcon fontSize='large' />
    //       </IconButton>
    //     </Tooltip>
    //   </InputAdornment>
    // ),
    value: texts.ExpectedQuestion
  },
  {
    id: 'ResponseHow',
    label: '回答文',
    placeholder:
      '例：\nQRオートプリンターでは、インストールしたマシンの状態によっては一部または全ての機能を使用することができません。\nシャットダウンしている状態→全ての機能を使用できません。\nログアウトしている状態→一部の機能を使用できません。',
    helperText: '[*必須]　質問の回答を入力してください。',
    multiline: true,
    rows: '4',
    onChange: onResponseHowChange,
    value: texts.ResponseHow
  }
]
