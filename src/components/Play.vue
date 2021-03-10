<template>
  <transition enter-active-class="animate__animated animate__bounceInLeft">
    <div class="player" v-if="$root.musicStore.musicID">
      <audio
        :src="
          `https://music.163.com/song/media/outer/url?id=${$root.musicStore.musicID}.mp3`
        "
        autoplay
        @timeupdate="timeUpdate"
        @pause="pause"
        @play="play"
        @ended="nextSong"
        ref="audio"
      ></audio>
      <!-- <ul>
          <li v-for="m in $root.musicStore.musicList" :key="m.id" :style="{
              color:m.id==$root.musicStore.musicID?'red':''
              }">
              {{m.name}}
          </li>
      </ul> -->

      <div class="playBar" v-if="$root.musicStore.musicID">
        <i
          :style="{
            width: `${(currentTime / duration) * 100}vw`,
          }"
          class="process"
        ></i>

        <i ref="randImg"
          ><img
            :src="
              $root.musicStore.currentMusic.picUrl
                ? $root.musicStore.currentMusic.picUrl
                : Img
            "
        /></i>
        <i @click="isFullPage = true">{{
          $root.musicStore.currentMusic.name
        }}</i>

        <span
          @click="changePlay"
          class="iconfont"
          style="font-size:35px"
          :class="[isPlay ? 'icon-zanting' : 'icon-bofang1']"
        ></span>
      </div>
      <transition
        leave-active-class="animate__animated animate__bounceOutDown"
        enter-active-class="animate__animated animate__bounceInDown"
      >
        <div class="fullPage" v-show="isFullPage">
          <div
            class="boli"
            :style="{
              background: `url(${
                $root.musicStore.currentMusic.picUrl
                  ? $root.musicStore.currentMusic.picUrl
                  : Img
              })`,
            }"
          ></div>
          <div class="top">
            <span
              @click="isFullPage = false"
              class="iconfont icon-fanhui"
              style="color:white"
            ></span>
            <span style="color:white">{{
              $root.musicStore.currentMusic.name
            }}</span>
            <span class="iconfont icon-share" style="color:white"></span>
          </div>
          <div
            class="songImg"
            ref="songImg"
            v-show="!showLyric"
            @click="showLyric = !showLyric"
          >
            <img
              :src="
                $root.musicStore.currentMusic.picUrl
                  ? $root.musicStore.currentMusic.picUrl
                  : Img
              "
            />
          </div>
          <transition enter-active-class="animate__animated animate__fadeIn">
            <div
              class="lyric"
              v-if="$root.lyric"
              v-show="showLyric"
              @click="showLyric = !showLyric"
              style="color:white"
            >
              <ul
                :style="{
                  transform: `translateY(-${moveTop}px)`,
                }"
              >
                <li
                  ref="lyricLi"
                  v-for="(l, index) in $root.lyric"
                  :key="index"
                  :class="{ active: currentIndex == index }"
                >
                  {{ l.lyric }}
                </li>
              </ul>
            </div>
          </transition>
          <div class="other">
            <span
              class="iconfont icon-duomeitiicon-"
              style="color:white;font-size:30px"
            ></span>
            <span
              class="iconfont icon-icon-"
              style="color:white;font-size:30px"
            ></span>
            <span
              class="iconfont icon-pinglun"
              style="color:white;font-size:30px"
              @click="comment"
            ></span>
            <span
              class="iconfont icon-caidan1"
              style="color:white;font-size:30px"
            ></span>
          </div>
          <div class="progress">
            <input
              type="range"
              min="0"
              :max="duration"
              :value="currentTime"
              @change="changeTime"
            />
            <i
              :style="{
                width: `${(currentTime / duration) * 80}vw`,
              }"
            ></i>
          </div>
          <div class="controlBar">
            <span
              icon-hanhan-01-01
              class="iconfont"
              style="color:white;font-size:30px"
              @click="playMode = !playMode"
              :class="[playMode ? 'icon-hanhan-01-01' : 'icon-xunhuan']"
            ></span>
            <div class="controlBar_center">
              <span
                @click="pervSong"
                class="iconfont icon-shangyiqu101"
                style="color:white;font-size:30px"
              ></span>
              <span
                @click="changePlay"
                class="iconfont"
                style="color:white;font-size:40px"
                :class="[isPlay ? 'icon-zanting' : 'icon-bofang1']"
              ></span>
              <span
                @click="nextSong"
                class="iconfont icon-xiayiqu101"
                style="color:white;font-size:30px"
              ></span>
            </div>
            <span
              @click="showPlayList = !showPlayList"
              class="iconfont icon-caidan"
              style="color:white;font-size:30px"
            ></span>
          </div>
          <!-- 播放列表 -->
          <transition
            leave-active-class="animate__animated animate__bounceOutDown"
            enter-active-class="animate__animated animate__bounceInDown"
          >
            <div class="playList" v-show="showPlayList">
              <span
                class="iconfont icon-cha"
                style="position: fixed;right:30px"
                @click="showPlayList = !showPlayList"
              ></span>
              <ul>
                <li
                  v-for="v in $root.musicStore.musicList"
                  :key="v.id"
                  :style="{
                    color: v.id == $root.musicStore.musicID ? 'red' : '',
                  }"
                  @click="playMusic(v)"
                >
                  {{ v.name }}
                </li>
              </ul>
            </div>
          </transition>
          <transition
            leave-active-class="animate__animated animate__bounceOutDown"
            enter-active-class="animate__animated animate__bounceInUp"
          >
          <div class="comment" v-show="openComment">
            <div class="first">
              <div class="first_1">
                <span>评论区</span>
                <span
                  class="iconfont icon-cha"
                  @click="openComment = !openComment"
                ></span>
              </div>
            </div>
            <div class="second">
              <ul>
                <li v-for="p in comments" :key="p.commentId">
                  <div class="user">
                    <div class="head">
                      <img :src="p.user.avatarUrl" />
                    </div>
                    <div class="uname">
                      <span style="font-size:13px;color:#696969;">{{
                        p.user.nickname
                      }}</span>
                      <span style="font-size:9px;color:	#D3D3D3;">{{
                        p.time | date
                      }}</span>
                    </div>
                    <div class="good">
                      <span class="iconfont icon-zanpress"></span>
                    </div>
                  </div>
                  <div class="content">
                    <span style="font-size:14px">{{p.content}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </transition>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Play",
  data() {
    return {
      isPlay: true,
      isFullPage: false,
      currentTime: 0,
      duration: 0,
      playMode: true,
      showPlayList: false,
      showLyric: false,
      currentIndex: 0, //记录当前歌词播放的位置下标
      moveTop: 0,
      Img: require("../assets/img/1.jpg"),
      comments: {},
      openComment: false,
    };
  },
  filters: {
    date(v) {
      var d = new Date(v);
      var year = d.getFullYear(); //取得4位数的年份
      var month = d.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = d.getDate(); //返回日期月份中的天数（1到31）
      var hour = d.getHours(); //返回日期中的小时数（0到23）
      var minute = d.getMinutes(); //返回日期中的分钟数（0到59）
      var second = d.getSeconds(); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
  },
  methods: {
    comment() {
      this.$http
        .get("/comment/music?id=" + this.$root.musicStore.musicID)
        .then((data) => {
          this.comments = data.data.comments;
          // console.log(this.comments);
        });
      this.openComment = true;
    },
    playMusic(item) {
      this.$root.musicStore.musicID = item.id;
      this.$root.musicStore.currentMusic = item;
    },
    changeSong() {
      //找到上一曲ID
      let currentIndex = 0;
      let musicList = this.$root.musicStore.musicList;
      if (!this.playMode) return parseInt(musicList.length * Math.random()); //随机播放
      for (let i in musicList) {
        //循环所有的播放列表，找到当前播放音乐的下标
        if (musicList[i].id == this.$root.musicStore.musicID) {
          currentIndex = i;
          break;
        }
      }
      return currentIndex;
    },
    pervSong() {
      let currentIndex = this.changeSong();
      let musicList = this.$root.musicStore.musicList;
      currentIndex--; //找到上一曲
      if (currentIndex < 0) {
        //如果上一曲下标为负数 上一曲就是最后一曲
        currentIndex = musicList.length - 1;
      }
      //改变播放音乐的信息
      this.$root.musicStore.musicID = musicList[currentIndex].id; //改变播放id
      this.$root.musicStore.currentMusic = musicList[currentIndex]; //改变当前播放音乐的信息
    },
    nextSong() {
      let currentIndex = this.changeSong();
      let musicList = this.$root.musicStore.musicList;
      currentIndex++; //下一曲
      if (currentIndex >= musicList.length) {
        //如果下一曲大于等于整个列表长度。回到第一曲
        currentIndex = 0;
      }
      //改变播放音乐的信息
      this.$root.musicStore.musicID = musicList[currentIndex].id; //改变播放id
      this.$root.musicStore.currentMusic = musicList[currentIndex]; //改变当前播放音乐的信息
    },
    play(event) {
      this.isPlay = false;
      this.changePlay();
      this.timeUpdate(event); //改变canvas的状态
    },
    pause(event) {
      this.isPlay = true;
      this.changePlay();
      this.timeUpdate(event);
    },
    changeTime(event) {
      let time = event.target.value;
      this.currentTime = time;
      this.$refs.audio.currentTime = time;
    },
    changePlay() {
      let audio = this.$refs.audio;
      let randImg = this.$refs.randImg;
      let songImg = null;
      // if(this.isFullPage){
      songImg = this.$refs.songImg;
      // }
      if (this.isPlay) {
        audio.pause();
        this.isPlay = false;
        randImg.style.animationPlayState = "paused";
        // if (this.isFullPage)
        songImg.style.animationPlayState = "paused";
      } else {
        audio.play();
        this.isPlay = true;
        randImg.style.animationPlayState = "running";
        // if (this.isFullPage)
        songImg.style.animationPlayState = "running";
      }
    },
    timeUpdate(event) {
      let audio = event.target; //获取audio元素
      let currentTime = audio.currentTime; //当前播放时间
      let duration = audio.duration; //获取音频的总时长
      this.currentTime = currentTime;
      this.duration = duration;
      // this.drawCircle(currentTime, duration);
      //得到当前的播放时间
      // let playTime=event.target.currentTime;
      let playTime = audio.currentTime;
      for (var i = 0; i < this.$root.lyric.length; i++) {
        //循环歌词  13秒
        if (i >= this.$root.lyric.length - 1) {
          //循环到最后一条的,不需要和下一条匹配 直接显示为最后一条高亮
          this.currentIndex = i;
          break;
        }
        //当前播放时间 大于当前歌词时间 小于下一条歌词时间，当前这条歌词需要高亮
        if (
          this.$root.lyric[i].time <= playTime &&
          playTime < this.$root.lyric[i + 1].time
        ) {
          if (i >= 7) {
            //获取当前播放歌词上一条歌词距离父元素上面的距离.
            this.moveTop = this.$refs.lyricLi[i - 7].offsetTop;
            // console.log(i,this.$refs.lyricLi[i-1].offsetTop);
          } else {
            this.moveTop = 0;
          }
          this.currentIndex = i;
          break;
        }
      }
    },
  },
};
</script>
<style lang="less" scope>
.player {
  position: fixed;
  z-index: 9;
  bottom: 0px;
  background-color: white;
  width: 100%;
  audio {
    height: 50px;
  }
  .playBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // flex-wrap: wrap;
    padding: 5px 10px;
    .process {
      position: absolute;
      width: 100%;
      height: 2px;
      background: orange;
      left: 0;
      top: 0%;
      // z-index: 1;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    i {
      &:nth-of-type(2) {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        animation: randImg 5s linear 0s infinite;
      }
      &:nth-of-type(3) {
        flex: 1;
        text-align: center;
        line-height: 50px;
        font-style: normal;
      }
      &:last-of-type {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  .fullPage {
    width: 100vw;
    height: 100vh;
    // background: skyblue;
    .boli {
      width: 100vw;
      height: 100vh;
      position: absolute;
      z-index: -1;
      filter: blur(20px) brightness(0.5);
    }
    .other {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 76%;
      left: 10%;
    }
    .controlBar {
      position: fixed;
      top: 90%;
      left: 10%;
      display: flex;
      width: 80%;
      justify-content: space-between;
      align-items: center;
      .controlBar_center {
        display: flex;
        width: 40%;
        justify-content: space-between;
        align-items: center;
      }
    }
    .top {
      margin: 50px auto;
      width: 98%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid grey;
    }
    .songImg {
      width: 80vw;
      height: 45vh;
      margin-left: 50px;
      // height: 20vh;
      border-radius: 50%;
      overflow: hidden;
      animation: randImg 5s linear 0s infinite;
    }
    .lyric {
      height: 55vh;
      overflow: hidden;
      text-align: center;
      ul {
        list-style: none;
        transition: all 0.5s linear;
        li {
          line-height: 30px;
        }
        .active {
          color: red;
        }
      }
    }
    .progress {
      width: 80vw;
      margin: 5vh auto;
      position: relative;

      input {
        width: 80%;
        //去除进度条默认样式
        appearance: none;
        -webkit-appearance: none;
        background-color: transparent;
        position: fixed;
        z-index: 3;
        top: 85%;
        &::-webkit-slider-thumb {
          //控制滑头，样式
          appearance: none;
          -webkit-appearance: none;
          width: 15px;
          height: 15px;
          margin-top: -6px;
          border-radius: 50%;
          background: #fff;
        }
        &::-webkit-slider-runnable-track {
          //控制滑槽
          appearance: none;
          -webkit-appearance: none;
          height: 2px;
          border-radius: 5px;
          background: rgba(red, 0, 0, 1);
          box-shadow: inset 0px 10px 10px rgba(255, 255, 255, 0.3);
        }
      }
      i {
        position: fixed;
        width: 50px;
        height: 2px;
        background: red;
        left: 10%;
        top: 85%;
        // z-index: 1;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
  }
  .playList {
    position: fixed;
    top: 50%;
    width: 95%;
    height: 50vh;
    overflow-y: auto;
    background: white;
    border-radius: 5%;
    padding: 10px 5px;
    left: 10px;
    z-index: 5;
    ul {
      margin-top: 20px;
      li {
        margin: 3px;
      }
    }
  }
  .comment {
    width: 100%;
    height: 70vh;
    position: absolute;
    z-index: 10;
    top: 40%;
    background: white;
    padding: 0 13px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    overflow-y: auto;
    .first {
      position: fixed;
      width: 93%;
      .first_1 {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
      }
    }
    .second {
      margin-top: 11%;
      ul {
        li {
          width: 100%;
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          .user {
            display: flex;
            justify-content: space-between;
            .head {
              width: 35px;
              height: 35px;
              img {
                border-radius: 50%;
              }
            }
            .uname {
              width: 80%;
              display: flex;
              flex-direction: column;
            }
          }
          .content{
            width: 80%;
            margin-left: 12%;
          }
        }
      }
    }
  }
}
@keyframes randImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
