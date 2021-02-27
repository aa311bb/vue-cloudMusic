<template>
    <div class="songitem">
        <div class="left">
            <h3 v-html="$options.filters.highLight(item.name,keywords)"></h3>
            <p>
                <template v-if="item.song">
                {{item.song.artists[0].name}}
                </template>
                <template v-if="item.artists">
                {{item.artists[0].name}}
                </template>
                 - {{item.name}}
            </p>
        </div>
        <span class="playbtn" @click="play(item)"></span>
    </div>
</template>
<script>
export default {
    name:"SongItem",
    props:['item','keywords'],
    methods:{
        play(item){
            this.$emit('play',item.id);
            //播放音乐
            //方式存储进vue实例里，
            
            this.$root.musicStore.musicID=item.id;
            this.$root.musicStore.currentMusic=item;
            
            // this.$root.musicStore.musicList.unshift(item);
            let newArr = this.$root.musicStore.musicList;
            let find=false;
            for(let n of newArr){
                if(n.id==item.id){
                    find=true;
                }
            }
            if(!find) this.$root.musicStore.musicList.push(item)
            //加入当前歌曲列表全部加入播放歌单列表
            this.$emit('add-list')
        }
    },
    filters:{
        highLight(val,keywords){
            if(typeof keywords=='undefined'){
                return val;
            }
            let reg=new RegExp(keywords,'g');
            if(reg.test(val)){
               return val.replace(reg,'<span style="color:red;">'+keywords+'</span>')
            }
            return val;
            
        }
    }
}
</script>
<style lang="less" scoped>
    .songitem{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding:6px 0px;
        .left{
            flex: 1;
            h3{
                color: #333;
            }
            p{
                color: #aaa;
                font-size: 12px;
            }
        }
        .playbtn{
            width: 22px;
            height: 22px;
            background: url(../assets/index_icon.png) no-repeat -24px 0px;
            background-size: 166px 97px;
        }
    }
        
</style>