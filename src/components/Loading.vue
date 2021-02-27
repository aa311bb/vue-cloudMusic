<template>
    <div class="loading">
        <div>
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .loading{
        div{
            width: 16px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            i{
                display: inline-block;
                width: 4px;
                height: 20px;
                background: red;
                transform-origin: bottom;
                animation: loading 0.8s linear 0.2s infinite alternate-reverse;
                &:nth-of-type(2){
                    animation-delay: -0.2s;
                }
                &:nth-of-type(3){
                    animation-delay: -0.6s;
                }
            }
        }
    }
    @keyframes loading{
        0%{
            transform: scaleY(0.4);
        }
        100%{
            transform: scaleY(1.2);
        }
    }
</style>