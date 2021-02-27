<template>
  <div>
    <div class="banner">
      <img :src="Img">
    </div>
    <ul class="newsong" v-if="hotSong.length > 0">
      <li v-for="(s, index) in hotSong" :key="s.id">
        <SongItem :item="s">{{ index + 1 }}</SongItem>
      </li>
    </ul>
    <Loading v-if="isLoading"></Loading>
    <div class="loadingmore" @click="loadMore">加载更多</div>
  </div>
</template>
<script>
import SongItem from "@/components/SongItem";
import Loading from "@/components/Loading";
export default {
  name: "Recommend",
  data() {
    return {
      hotSong: [],
      playList: null,
      page: 1,
      isLoading: true,
     Img:require('../assets/img/2.jpg'),
    };
  },
  created() {
    this.loadMusic();
  },
  methods: {
    loadMusic() {
      // console.log(this.page);
      //获取歌单详情
      this.$http
        .get("/playlist/detail?id=3778678")
        .then((data) => {
          //把tracksID变成字符串
          let trackIDS = data.data.playlist.trackIds.slice(
            (this.page - 1) * 20,
            this.page * 20
          );
          this.playList = data.data.playlist;
          let ids = trackIDS.map((d) => {
            return d.id;
          });
          return ids.join(",");
        })
        .then((ids) => {
          //获取歌曲详情
          // console.log(ids);
          this.$http
            .get("http://music.kele8.cn/song/detail?ids=" + ids)
            .then((songData) => {
              this.isLoading = false;
              songData.data.songs.map((d) => {
                //处理数据和 SongItem不一致 转换数据
                d.song = {
                  artists: d.ar,
                };
                this.hotSong.push(d); //push进数组
                return d;
              });
              // this.hotSong=songDat;
            });
        });
    },
    loadMore() {
      this.page++;
      if (this.page >= 10) {
        return false;
      }
      this.isLoading = true;
      this.loadMusic();
    },
  },
  components: {
    SongItem,
    Loading,
  },
  filters: {
    formatDate(val) {
      let date = new Date(val);
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    },
  },
};
</script>
<style lang="less" scoped>
.newsong{
  padding: 5px;
}
.loadingmore {
  background-color: bisque;
  text-align: center;
}
</style>
