import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  state: {
    fileList: [],
    doc: [],
    video: [],
    audio: [],
    image: [],
    packages: [],    
    app: [],    
    qita: []  
  },
  mutations: {
    fileList(state,payload) {
        state.fileList = payload
        let doc = [];
        let video = [];
        let audio = [];
        let image = [];
        let packages = []
        let app = []
        let qita = []
        state.fileList.forEach((value) => {
          if (
            value.type == ".xlsx" ||
            value.type == ".docx" ||
            value.type == ".doc" ||
            value.type == ".excel" ||
            value.type == ".sql" ||
            value.type == ".md" ||
            value.type == ".ppt" ||
            value.type == ".pptx" ||
            value.type == ".txt" ||
            value.type == ".js" ||
            value.type == ".css" ||
            value.type == ".php"
          ) {
            doc.push(value.size);
            state.doc = doc
          } else if (
            value.type == ".mp4" ||
            value.type == ".wmv" ||
            value.type == ".asf" ||
            value.type == ".asx" ||
            value.type == ".3gp" ||
            value.type == ".mov" ||
            value.type == ".m4v"
          ) {
            video.push(value.size);
            state.video = video
          } else if (
            value.type == ".mp3" ||
            value.type == ".cda" ||
            value.type == ".wav" ||
            value.type == ".mpeg"
          ) {
            audio.push(value.size);
            state.audio = audio
          } else if (
            value.type == ".jpeg" ||
            value.type == ".png" ||
            value.type == ".jpg" ||
            value.type == ".gif" ||
            value.type == ".tiff" ||
            value.type == ".tga" ||
            value.type == ".bmp" ||
            value.type == ".svg" ||
            value.type == ".dds" ||
            value.type == ".psd" ||
            value.type == ".eps" ||
            value.type == ".ico"
          ) {
            image.push(value.size);
            state.image = image
          } else if (
            value.type == ".zip" ||
            value.type == ".rar" ||
            value.type == ".7z"
          ) {
            packages.push(value.size);
            state.packages = packages
          } else if (
            value.type == ".exe"
          ) {
            app.push(value.size);
            state.app = app
          } else {
            qita.push(value.size)
            state.qita = qita
          }
        });
    }
  },
  actions:{
      async getEcharts(store) {
        console.log(store,'store')
        let url = `http://localhost:8082/file/list/1/all`
        let res = await axios.get(url)
        console.log(res,'res')
        store.commit('fileList', res.data.data)
    }
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(val) {
        return {
          // 只储存state中的user
          // user: val.base
          fileList: val.fileList //只缓存了根模块里面的count
        };
      }
    })
  ]
});
export default store;



