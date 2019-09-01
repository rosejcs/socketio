<template>
  <div class="talk-room">
    <div class="word-wrap" ref="word"></div>
    <input type="text" class="" placeholder="inp ur name" v-model="uname" />
    <input type="text" class="" placeholder="inp ur message" v-model="word" />
    <button class="btn" @click="clickBtn">Send</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        uname: "",
        word: "",
        socket: {}
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
          console.log(self);
          console.log(this);
          self.uname = data.uname;
          self.word = data.word;
        });
        return new Promise(resolve=>{
          resolve(1)
        })
      },
      showTalk() {
        // this.$refs.word.innerHTML += `<p><strong>${this.uname}</strong>:${this.word}</p>`;
        let newMsg = document.createElement('p');
        newMsg.innerHTML = `<strong>${this.uname}</strong>:${this.word}`;
        let parent = this.$refs.word;
        parent.appendChild(newMsg);
      }
    },
    created() {
      this.socket = io.connect("http://127.0.0.1:4000");
    },
    mounted() {
      // this.getReturn();
      // console.log(this.uname,this.word);
      // this.$nextTick(() => {
      //   this.showTalk();
      // });
      this.getReturn().then(res=>{
        if(res==1) {
          this.showTalk();
        }
      })

      this.$refs.word

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
