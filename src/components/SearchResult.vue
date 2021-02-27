<template>
    <div class="result">
        <div class="result_1">搜索结果:{{keywords}}</div>
        <ul>
            <li v-for="(song,index) in result" :key="index">
                <SongItem :item="song" :keywords="keywords"></SongItem>
            </li>
        </ul>
        <Loading v-if="showLoading"></Loading>
        <p class="loadmore" @click="loadMore">加载更多</p>
    </div>
</template>
<script>
import SongItem from '@/components/SongItem'
import Loading from '@/components/Loading';
export default {
    name:"SearchResult",
    props:['keywords'],
    data(){
        return{
            result:[],
            page:1,
            showLoading:true
        }
    },
    created(){
        this.result=[];
        this.loadSearch();
    },
    components:{
        SongItem,
        Loading
    },
    methods:{
        loadSearch(){
            this.$http.get('/search?keywords='+this.keywords+'&type=1&offset='+(this.page-1)*30).then(data=>{
            // this.result=data.data.result.songs
            this.result=this.result.concat(data.data.result.songs);
            this.showLoading=false
            console.log(data)
        });
        },
        loadMore(){
            this.page++;
            this.showLoading=true;
            this.loadSearch();
        }
    }
}
</script>
<style lang="less" scoped>
    .result{
        padding:0px 10px;
        .result_1{
                margin: 10px 5px;
        }
        p.loadmore{
            background-color: wheat;
            text-align: center;
        }
    }
</style>