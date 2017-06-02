<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'mint-ui/lib/style.css'
export default {
  name: 'app'
}
</script>

<style>
  ul, ol, li {
      list-style: none;
  }
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td {
    margin: 0;
    padding: 0;
  }
  body{
    font-family:Helvetica;
  }
  li {
      display: list-item;
      text-align: -webkit-match-parent;
  }
  /*chrome去黄底*/
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
 }
</style>
