<template>
  <div class="right-bar">
    <div class="right-item">
      <div class="avatar-border">
          <img src="https://img01.yzcdn.cn/vant/cat.jpeg">
        <van-icon name="add" class="add" color="#FE2C5A" size="20"/>
      </div>
    </div>
    <div class="item-icon">
        <van-icon name="like" color="#fff" size="30"/>
        <p>18.0w</p>
    </div>
    <div class="item-icon" @click.stop="showCom($event)">
        <van-icon name="chat" color="#fff" size="30"/>
        <p>18.0w</p>
    </div>
    <div class="item-icon">
        <van-icon name="share" color="#fff" size="30"/>
        <p>18.0w</p>
    </div>
    <div class="right-item">
        <div class="right-music">
            <img src="https://img01.yzcdn.cn/vant/cat.jpeg">
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    props:["showComment"],
    methods:{
        showCom(e){
            e.stopPropagation();
            e.preventDefault();
            this.$emit('changeCom')
        }
    },
}
</script>
<style scoped>
.right-bar .right-item{
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
}
.avatar-border{
    height: 50px;
    width: 50px;
    border: 2px solid #fff;
    border-radius: 50%;
    position: relative;
    text-align: center;
}
.avatar-border img{
    width: 49px;
    height: 49px;
    border-radius: 50%;
}
.avatar-border .add{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
}
.right-bar .item-icon{
    height: 60px;
    text-align: center;
    padding-top: 12px;
}
.item-icon p{
    color: #fff;
    font-size: 14px;
    padding-top: 5px;
}
.right-item .right-music{
    height: 50px;
    width: 50px;
    background: #2E2E2E;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: round 6s 0s linear infinite;
}
.right-item .right-music img{
    height: 30px;
    width: 30px;
    border-radius: 50%;
}
@keyframes round{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>
