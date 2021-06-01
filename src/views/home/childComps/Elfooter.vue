<template>
  <el-footer>
    <div class="wei">
      <!--  -->
      <p>有任何问题可扫描下方二维码联系我</p>
      <img
        src="~assets/img/wei.jpg"
        alt="微信二维码"
      >
      <img
        src="~assets/img/qq.jpg"
        alt=""
      >
    </div>
    <div class="info">
      <div class="rights">
        <p>Copyright © YGQ. All Rights Reserved
        </p>
        <span class="font">
          <a
            href="https://github.com/YGQ-Only/vue-blog"
            class="iconfont icon-github"
          ></a>
        </span>
      </div>
    </div>
  </el-footer>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>

.el-footer{
  height:185px!important;
  box-sizing: border-box;
  padding:0 100px 0px 100px ;
  display: flex;
  justify-content:center;
  > .info .rights{
    text-align: center;
    vertical-align:middle;
    margin: 79px 0px 0px 0px !important;
    > p{
      margin: 0px !important;
    }
    > .font{
      margin-top: 7px;
      display: inline-block;
    }
  }
}
.wei{
    text-align: center;
    height: 165px;
}
.wei img{
  height: 70%;
  margin-right: 7px;
}

</style>