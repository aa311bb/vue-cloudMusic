<template>
  <div class="bu" v-if="music.playlist">
    <div
      class="boli"
      :style="{
        background: `url(${music.playlist.coverImgUrl})`,
      }"
    ></div>
    <div class="top">
      <router-link to="/recommend" style="text-decoration: none;">
        <span
          class="iconfont icon-fanhui"
          style="color:white;font-size:20px"
        ></span>
      </router-link>
      <span class="top_1"
        ><span>歌单</span><span>{{ music.playlist.name }}</span></span
      >
      <div class="top_2">
        <router-link to="/search" style="text-decoration: none;">
          <span
            class="iconfont icon-fangdajing1"
            style="color:white;font-size:20px"
          ></span>
        </router-link>
        <span
          class="iconfont icon-caidan2"
          style="color:white;font-size:20px"
        ></span>
      </div>
    </div>
    <div class="banner">
      <div class="img">
        <img :src="`${music.playlist.coverImgUrl}`" />
      </div>
      <div style="width:50%;color:white;padding-right:10px;padding-bottom:40px" class="banner_1">
        <span>{{ music.playlist.description }}</span>
      </div>
    </div>
    <div class="list">
      <ul class="newsong">
        <li v-for="(s, index) in musicName" :key="s.id">
          <SongItem :item="s">{{ index + 1 }}</SongItem>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SongItem from "@/components/SongItem";
export default {
  data() {
    return {
      listID: null,
      music: {},
      back: true,
      musicName: [],
    };
  },
  beforeCreate() {
    this.listID = this.$route.params.id;
    this.$http
      .get("/playlist/detail?id=" + this.listID)
      .then((data) => {
        this.music = data.data;
        //   console.log(this.music)
        let trackIDS = data.data.playlist.trackIds;
        let ids = trackIDS.map((d) => {
          return d.id;
        });
        return ids;
      })
      .then((ids) => {
        this.$http
          .get("http://music.kele8.cn/song/detail?ids=" + ids)
          .then((songData) => {
            songData.data.songs.map((d) => {
              //处理数据和 SongItem不一致 转换数据
              d.song = {
                artists: d.ar,
              };
              this.musicName.push(d); //push进数组
              // return d;
            });
            //   console.log(this.musicName)
          });
      });

    
  },
  components: {
    SongItem,
  },
};
</script>
<style lang="less" scope>
.bu {
  width: 100vw;
  height: 100vh;
  position: relative;
  top: -43px;
  z-index: 5;
  background: white;
  .boli {
    width: 100vw;
    height: 40vh;
    position: absolute;
    z-index: -1;
    filter: blur(5px) brightness(0.5);
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid gray;
    .top_1 {
      display: flex;
      flex-direction: column;
      margin-left: -100px;
      span {
        &:nth-of-type(1) {
          color: white;
          font-size: 16px;
        }
        &:nth-of-type(2) {
          color: white;
          font-size: 10px;
        }
      }
    }
    .top_2 {
      width: 13%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .banner {
    width: 100%;
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .img {
      width: 50%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 60%;
        height: 110%;
        border-radius: 10%;
      }
    }
    .banner_1{
          height: 20vh;
          overflow: auto;
      }
  }
  .list {
    background: white;
    border-radius: 10px;
    padding: 2px 10px;
  }
}
</style>
