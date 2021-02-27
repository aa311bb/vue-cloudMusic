<template>
    <div>
        <BorderTitle>推荐歌单</BorderTitle>
        <ul class="songlist" v-if="songList.length>0">
            <ListItem v-for="sl in songList" :key="sl.id" :item="sl"></ListItem>
        </ul>
        <Loading v-if="songList.length==0"></Loading>
        <BorderTitle>最新音乐</BorderTitle>
        <ul class="newsong" v-if="newSong.length>0">
            <li v-for="s in newSong" :key="s.id">
                <SongItem :item="s" @add-list="addMusicList(newSong)"></SongItem>
            </li>
        </ul>
        <Loading v-if="newSong.length==0"></Loading>
    </div>
</template>
<script>
import BorderTitle from '../components/BorderTitle'
import ListItem from '../components/ListItem'
import SongItem from  '../components/SongItem'
import Loading from '../components/Loading'
export default {
    name:"Recommend",
    components:{
        BorderTitle,
        ListItem,
        SongItem,
        Loading
    },
    data(){
        return{
            songList:[],
            newSong:[]
        }
    },
    methods:{
        addMusicList(newSong){
            // this.$root.musicStore.musicList=this.$root.musicStore.musicList.concat(newSong)
            //添加歌单去重
            let newArr =this.$root.musicStore.musicList;
            newSong.map(d=>{
                let find=false;
                for(let n of newArr){
                    if(n.id==d.id){//找到了当前音乐在原歌单里面存在
                        find=true;
                        break;
                    }
                }
                if(!find) newArr.push(d);//当前音乐在newArr里面没有找到
            });
            this.$root.musicStore.musicList=newArr;
        }
    },
    created(){
        this.$http.get('/personalized?limit=6').then(data=>{
            this.songList=data.data.result;
        }).catch(err=>{
            console.log(err)
        });
        this.$http.get('/personalized/newsong?limit=10').then(data=>{
            this.newSong=data.data.result;
        })
    }
}
</script>
<style lang="less" scoped>
    .songlist{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
            width: 33%;
        }
    }
    .newsong{
        padding: 10px 10px;
    }
</style>