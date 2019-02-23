import React, { useState } from 'react'
import Head from 'next/head'

function handleSubmitForm({ userId, accessToken }) {
  event.preventDefault()
  const linkUrl = `/feed/${userId || ''}.atom?token=${accessToken || ''}`
  window.open(linkUrl)
  return false
}

export default () => {
  const [userId, setUserId] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Qiita Feed Gen - created by potato4d</title>
        <link href="/favicon.png" rel="icon" type="image/png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/static/style.css" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@potato4d" />
        <meta property="twitter:image" content="https://qiita-feed-gen.potato4d.me/ogp.png" />

        <meta property="og:url" content="https://qiita-feed-gen.potato4d.me" />
        <meta property="og:title" content="Qiita Feed Gen - created by potato4d" />
        <meta property="og:description" content="Qiita Feed Genは、QiitaのパーソナルフィードをRSS化するためのサービスです" />
        <meta property="og:image" content="https://qiita-feed-gen.potato4d.me/ogp.png" />

        <meta name="description" content="Qiita Feed Genは、QiitaのパーソナルフィードをRSS化するためのサービスです" />
        <meta name="keywords" content="Qiita,RSS" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-63818166-19"></script>
      </Head>
      <div id="wrapper">
        <form onSubmit={() => {
          handleSubmitForm({ userId, accessToken })
        }}>
          <h1>Qiita Feed Gen</h1>
          <p>
            QiitaのユーザーフィードのRSSをつくるやつ
          </p>
          <div className="form-body">
            <div className="form-group">
              <label htmlFor="username">ユーザー ID</label>
              <input type="text" id="username" onInput={(event) => {setUserId(event.target.value)}} />
            </div>
            <div className="form-group">
              <label htmlFor="credential">アクセストークン</label>
              <input type="text" id="credential" onInput={(event) => { setAccessToken(event.target.value) }} />
            </div>
            <div className="form-group flex-center-between">
              <div className="spacer" />
              <div>
                <button className="link">
                  フィードを生成する
                </button>
              </div>
              <div>
                <a href="https://twitter.com/intent/tweet?text=Qiita Feed Gen - QiitaのユーザーフィードのRSSつくるやつ&url=https://qiita-feed-gen.potato4d.me" target="_blank" className="twitter"><i className="fa fa-twitter"></i></a>
              </div>
            </div>
          </div>
          <footer>
            <div className="message">本サービスで利用されるアクセストークンを二次利用することはありません。</div>
            &copy; 2017 <a href="https://github.com/potato4d">@potato4d</a>
          </footer>
        </form>
      </div>
    </div>
  )
}
