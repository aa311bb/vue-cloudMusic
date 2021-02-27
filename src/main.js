import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/animate.min.css'
import './assets/minireset.min.css'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false

//播放音乐相关的数据存储 VUE实例里面
//在整个项目组件里都可以通过this.$root获取 vue实例
let musicStore={
  musicID:null,
  musicList:[],
  currentMusic:null//记录当前播放音乐的信息
}
new Vue({
  data:{
    musicStore,
    lyric:null,
  },
  watch:{
    musicStore:{
      handler(){
        let musicID=this.musicStore.musicID;
        //根据ID获取歌词
        this.$http.get('http://music.kele8.cn/lyric?id='+musicID).then(data=>{
          let lyricArr=data.data.lrc.lyric.split('\n');
          lyricArr.pop();//去除匹配不到的最后一条
          let reg=/\[(\d+):(\d+\.\d+)\](.*)/
          let newLiric= lyricArr.map(d=>{
            if(reg.test(d)){
              return{
                time:(parseInt((RegExp.$1)*60)+parseFloat(RegExp.$2)),
                lyric:RegExp.$3
              }
            }
          });
          this.lyric=newLiric;
        });
        
      },
      deep:true
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
  
