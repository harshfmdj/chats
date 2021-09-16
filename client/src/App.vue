<template>
  <div id="app">
    <div class="header">
      <h1>Chats</h1>
      <p class="username">Username:{{ username }}</p>
      <p class="online">Online:{{ users.length }}</p>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "App",
  components: {},
  data: function() {
    return {
      username: "",
      socket: io("http://localhost:3000"),
      messages: [],
      users: []
    }
  },
  methods: {
    joinServer: function() {
      this.socket.on("loggedIn", (data) => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("newuser", this.username);
      });
    }
  },
  mounted: function() {
    this.username = prompt("What is your name", "Anonymous");
    if (!this.username) {
      this.username = "Anonymous";
    }
    this.joinServer();
  }
}
</script>

<style lang="scss">
body {
  font-family: "Avenir", Helvetica, Arial, Helvetica, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 768px;
  max-width: 768px;
  margin: 0 auto;
}
</style>
