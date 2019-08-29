<template>
  <div>
    <h1>123</h1>
  </div>
</template>

<script>
import 'socket.io/lib/socket'
export default {
  data() {
    return {
      msg:''
    }
  },
  methods: {
    socketHandle() {
      let socket = io.onconnect();
      // console.log(socket);
    },
  },
  created() {
    this.socketHandle();
  }
}
</script>