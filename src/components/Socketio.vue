<template>
  <div class="talk-room">
    <div class="word-wrap" ref="word"></div>
    <input type="text" key="1" class="" placeholder="inp ur name" v-model="uname" />
    <input type="text" key="2" class="" placeholder="inp ur message" v-model="word" />
    <button class="btn" @click="clickBtn">Send</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        uname: "",
        word: "",
        socket: {},
        status: 0
      };
    },
    methods: {
      clickBtn() {
        this.socket.emit("chat", {
          uname: this.uname,
          word: this.word
        });
      },
      getReturn() {
        let self = this;
        this.socket.on("chat", data => {
          console.log(data);
          self.uname = data.data.uname;
          self.word = data.data.word;
          self.status = data.id;
          this.$refs.word.innerHTML += `<p><strong>${data.data.uname}</strong>:${data.data.word}</p>`
        });
      },
      showTalk() {
        if (this.uname == "") return;
        if (this.word == "") return;
        let newMsg = document.createElement("p");
        newMsg.innerHTML = `<strong>${this.uname}</strong>:${this.word}`;
        let parent = this.$refs.word;
        parent.appendChild(newMsg);
      }
    },
    created() {
      this.socket = io.connect("http://127.0.0.1:3000");
      this.getReturn();
    },
    mounted() {
      // this.getReturn();
      // console.log(this.uname,this.word);
      // this.$nextTick(() => {
      //   this.showTalk();
      // });
      // this.getReturn().then(res=>{
      // if(res==1) {
      // this.showTalk();
      // this.$refs.word.innerHTML='<h1>123</h1>';
      // }
      // })
    },
    watch: {
      // status() {
      //   // this.showTalk();
      // }
    }
  };
</script>
<style>
  * {
    box-sizing: border-box;
  }
  .talk-room {
    width: 400px;
    background: #fefefe;
  }
  .word-wrap {
    width: 100%;
    height: 300px;
    overflow: auto;
    border: 1px solid gray;
  }
  input {
    width: 100%;
    height: 40px;
    border: none;
    background: #fff;
  }
  .btn {
    width: 100%;
    height: 40px;
    background: peru;
    color: #fff;
    font-size: 18px;
    border: none;
  }
</style>
