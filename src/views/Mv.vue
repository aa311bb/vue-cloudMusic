<template>
  <div>
    <div class="mvList">
      <div class="mv" v-for="i in list" :key="i.id">
        <router-link :to="`video/${i.id}`">
          <img :src="i.cover" />
          <span>{{ i.name }}</span>
          <span>{{ i.artistName }}</span> </router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: null,
    };
  },
  created() {
    this.$http.get("/mv/first?limit=10").then((data) => {
      this.list = data.data.data;
    });
  },
};
</script>
<style lang="less" scope>
.mvList {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .mv {
    width: 45%;
    margin-bottom: 10px;

    border-radius: 5px;
    a {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      img {
        width: 100%;
        height: 100px;
        border-radius: 5px;
      }
      & > span:nth-child(2) {
        font-size: 14px;
        color: #666;
      }
      & > span:nth-child(3) {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
}
</style>
