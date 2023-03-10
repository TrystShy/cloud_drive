<template>
  <div id="myChart" :style="{ width: '1000px', height: '600px' }"></div>
</template>
 
<script>
export default {
  name: "fileList",
  inject: ["reload"],
  data() {
    return {
      doc: [],
      video: [],
      audio: [],
      image: [],
      packages: [],
      app: [],
      qita: [],
      videoName: this.$t('video'),
      audioName: this.$t('audio'),
      imageName: this.$t('image'),
      documentName: this.$t('document'),
      formName: this.$t('form'),
      appName: this.$t('app'),
      packageName: this.$t('package'),
      otherName: this.$t('other'),
    }
  },
  created() {
    setTimeout(_ => {
      this.doc = JSON.parse(JSON.stringify(this.$store.state.doc))
      this.video = JSON.parse(JSON.stringify(this.$store.state.video))
      this.audio = JSON.parse(JSON.stringify(this.$store.state.audio))
      this.image = JSON.parse(JSON.stringify(this.$store.state.image))
      this.packages = JSON.parse(JSON.stringify(this.$store.state.packages))
      this.app = JSON.parse(JSON.stringify(this.$store.state.app))
      this.qita = JSON.parse(JSON.stringify(this.$store.state.qita))
    }, 500)
  },
  mounted() {
    setTimeout(_ => {
      this.drawLine();
    }, 600)
  },
  watch: {

  },

  methods: {
    drawLine() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        animationDuration: 2000,
        title: {
          text: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} <br/>   {d}%",
        },
        legend: {
          top: "10%",
          left: "32%",
        },
        color: ['#3ec8a4', '#fff369', '#FD7013', '#4992ff', '#60eeff', '#9068be', '#ff7981'],
        series: [
          {
            name: "",
            type: "pie",
            radius: "70%",
            center: ["55%", "58%"],
            data: [
              { value: this.video.length, name: this.videoName },
              { value: this.audio.length, name: this.audioName },
              { value: this.image.length, name: this.imageName },
              { value: this.doc.length, name: this.documentName },
              { value: this.app.length, name: this.appName },
              { value: this.packages.length, name: this.packageName },
              { value: this.qita.length, name: this.otherName },
            ],
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold',
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              formatter: "  {b|{b}}  {per|{d}%}  ",
              backgroundColor: "",
              borderColor: "",
              borderWidth: 1,
              borderRadius: 4,
              rich: {},
            },
          },
        ],
      });
      myChart.getZr().on('click', function(event) {
      // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
      if (!event.target) {
      // 点击在了空白处，做些什么。
      console.log(111);
      }
      myChart.on('click', function(params) {
        that.reload()
        if(params.name == "Video" || params.name == "视频") {
            that.$router.replace("/home/fileList/video",)
        } else if(params.name == "Audio" || params.name == "音频") {
          that.$router.replace("/home/fileList/audio",);
        } else if(params.name == "Image" || params.name == "图片") {
          that.$router.replace("/home/fileList/image",);
        } else if(params.name == "Document" || params.name == "文档") {
          that.$router.replace("/home/fileList/doc",);
        } else if(params.name == "Application" || params.name == "应用") {
          that.$router.replace("/home/fileList/app",);
        } else if(params.name == "Package" || params.name == "压缩文件") {
          that.$router.replace("/home/fileList/package",);
        } else {
          that.$router.replace("/home/fileList/all",);
        }
        
      });
    })
    },
  },
};
</script>
