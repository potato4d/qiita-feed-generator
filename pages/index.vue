<template>
    <div>
      <div id="wrapper">
        <form
          @submit.prevent="handleSubmitForm"
        >
          <h1>Qiita Feed Generator</h1>
          <p>Generated your private Qiita RSS feed</p>
          <div class="form-body">
            <div class="form-group">
              <label htmlFor="username">User ID</label>
              <input
                type="text"
                id="username"
                v-model="formData.userId"
              />
            </div>
            <div class="form-group">
              <label htmlFor="credential">Access Token</label>
              <input
                type="text"
                id="credential"
                v-model="formData.accessToken"
              />
            </div>
            <div class="form-group flex-center-between">
              <div class="spacer" />
              <div>
                <button class="link">Generate your private feed</button>
              </div>
              <div>
                <a
                  href="https://twitter.com/intent/tweet?text=Qiita Feed Gen - QiitaのユーザーフィードのRSSつくるやつ&url=https://qiita-feed-gen.potato4d.me"
                  target="_blank"
                  class="twitter"
                >
                  <i class="fa fa-twitter" />
                </a>
              </div>
            </div>
          </div>
          <footer>
            <div class="message">
              本サービスで利用されるアクセストークンを二次利用することはありません。
            </div>
            &copy; 2017 <a href="https://github.com/potato4d">@potato4d</a>
          </footer>
        </form>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      formData: {
        userId: '',
        accessToken: ''
      }
    }
  },
  methods: {
    handleSubmitForm(event) {
      event.preventDefault()
      const linkUrl = `/feed/${this.formData.userId || ''}.atom?token=${this.formData.accessToken || ''}`
      window.open(linkUrl)
      return false
    }
  }
})
</script>

<style>

</style>
