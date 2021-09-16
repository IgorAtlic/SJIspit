<template>
  <div class="home">
    <Header/>
    <Login/>

  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header";
import Login from "@/components/Login";

export default {
  name: 'home',
  components: {
    Header,
    Login
  }
}
</script>
