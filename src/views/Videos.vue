<template>
  <div class="page">
    <span
      class="iconfont icon-fanhui"
      style="color:white"
      @click="goback"
    ></span>
    <div v-if="loading">
      <div class="videos">
        <video-player
          class="video-player vjs-default-skin vjs-big-play-centered"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
      <div class="zaozi"></div>
      <div class="second">
        <span>评论区</span>
        <ul>
          <li v-for="p in comment.hotComments" :key="p.commentId">
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
              <span style="font-size:14px">{{ p.content }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading" v-else>
      <Loading></Loading>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading";
import { videoPlayer } from "vue-video-player";
export default {
  name: "Video",
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto",
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4", // 类型
          },
        ],

        //poster: "../../static/images/test.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        // notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      playing: true,
      comment: null,
      loading: false,
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
    goback() {
      this.$router.go(-1);
    },
  },
  //页面进来时自动播放
  created() {
    this.$http
      .get("https://music.kele8.cn/mv/url?id=" + this.$route.params.id)
      .then((data) => {
        this.playerOptions["sources"][0]["src"] = data.data.data.url;
      });
    this.$http
      .get("https://music.kele8.cn/comment/mv?id=" + this.$route.params.id)
      .then((data) => {
        this.comment = data.data;
      });
    setTimeout(() => {
      this.loading = true;
    }, 1000);
  },
  components: {
    videoPlayer,
    Loading,
  },
};
</script>
<style lang="less" scope>
.page {
  position: absolute;
  top: 0px;
  z-index: 15;
  background: white;
}
.icon-fanhui {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 21;
  font-size: 20px;
}
.videos {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 20;
}
.videos .vjs-default-skin > .video-js .vjs-big-play-button {
  background: rgba(0, 0, 0, 0.4);
  font-size: 30px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  line-height: 60px;
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
.zaozi {
  width: 100%;
  height: 220px;
}
.loading{
  position: fixed;
  top: 300px;
  left: 50%;
  z-index: 20;
}
.second {
  margin-top: 5%;
  padding: 0 10px;
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
      .content {
        width: 80%;
        margin-left: 12%;
      }
    }
  }
}
</style>
