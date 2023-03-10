<!--
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-07 18:49:44
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-09 13:58:03
 * @FilePath: \cloud-management-system\cloud_dirve\client\src\view\FileListView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="list">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('All_files')" name="first">
          <div class="main" style="padding:20px">
            <el-table stripe style="width: 100%"
              :data="tableData.filter(data => !search || data.file_name.toLowerCase().includes(search.toLowerCase()))"
              :height="height" :default-sort="{ prop: 'upload_time', order: 'descending' }"
              @row-click="handlePreview">
              <el-table-column prop="" label="" width="50">
                <template slot-scope="scope">
                  <div v-if="scope.row.type == '.html'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-html"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.ppt' || scope.row.type == '.pptx'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-PPT"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.gif'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-GIF"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.sql'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-SQL"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.excel' || scope.row.type == '.xlsx'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-excel"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.psd'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-Ps"></use>
                    </svg>
                  </div>
                  <div
                    v-if="scope.row.type == '.png' || scope.row.type == '.jpg' || scope.row.type == '.jpeg' || scope.row.type == '.tga' || scope.row.type == '.bmp' || scope.row.type == '.dds' || scope.row.type == '.eps'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-tupian"></use>
                    </svg>
                  </div>
                  <div
                    v-if="scope.row.type == '.mp4' || scope.row.type == '.wmv' || scope.row.type == '.asf' || scope.row.type == '.asx' || scope.row.type == '.3gp' || scope.row.type == '.mov' || scope.row.type == '.m4v'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-shipin"></use>
                    </svg>
                  </div>

                  <div
                    v-if="scope.row.type == '.mp3' || scope.row.type == '.cda' || scope.row.type == '.wav' || scope.row.type == '.wma' || scope.row.type == '.mpeg'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-yinle"></use>
                    </svg>
                  </div>

                  <div v-if="scope.row.type == '.doc' || scope.row.type == '.docx'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-Word-Color"></use>
                    </svg>
                  </div>

                  <div v-if="scope.row.type == '.md'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-md"></use>
                    </svg>
                  </div>

                  <div v-if="scope.row.type == '.zip' || scope.row.type == '.rar' || scope.row.type == '.7z'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-rar"></use>
                    </svg>
                  </div>

                  <div v-if="scope.row.type == '.txt'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-txt"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.svg'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-svg"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.pdf'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-pdf"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.exe'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-exe"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.webp'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-liulanqi"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.css'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-css"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.java'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-java"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.json'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-json"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.js'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-js"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.php'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-php_elephant"></use>
                    </svg>
                  </div>
                  <div v-if="scope.row.type == '.ico'">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-ico"></use>
                    </svg>
                  </div>
                </template>
                <div></div>

              </el-table-column>

              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item :label="$t('ID_of_the_uploader')">
                      <i class="el-icon-user-solid"></i>
                      <span>{{ props.row.uid }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('Document_number')">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('Name_of_file')">
                      <span>{{ props.row.file_name }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('Hash_Name_of_file')">
                      <span>{{ props.row.hash_name }}</span>
                    </el-form-item>
                    <el-form-item :label="$t('File_size')">
                      <span>{{ props.row.size }} B</span>
                    </el-form-item>
                    <el-form-item :label="$t('File_type')">
                      <el-tag size="small">{{ props.row.type.slice(1) }}</el-tag>
                      <!-- <span></span> -->
                    </el-form-item>
                    <el-form-item prop="upload_time" :label="$t('Time_of_upload')">
                      <i class="el-icon-date"></i>
                      <span>{{ props.row.upload_time | getFormatDate() }}</span>
                  </el-form-item>
                    <el-form-item :label="$t('Number_of_downloads')">
                      <span>{{ props.row.download }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="id" :label="$t('Document_number')" width="180">
                </el-table-column> -->
              <el-table-column prop="file_name" :label="$t('Name_of_file')" width="400"></el-table-column>
              <!-- <el-table-column prop="hash_name" label="HASH名称"></el-table-column> -->
              <el-table-column align="center" prop="size" :formatter="dealSize" :label="$t('File_size')">
              </el-table-column>
              <!-- <el-table-column align="center" prop="type" :label="$t('File_type')" width="100"></el-table-column> -->
              <el-table-column align="center" prop="upload_time" :label="$t('Time_of_upload')" width="200">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <!-- scope.row.upload_time -->
                  <span style="margin-left: 8px">{{ scope.row.upload_time | formatDateTime() }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="download" :label="$t('Number_of_downloads')" center>
              </el-table-column>
              <el-table-column align="center" width="200">
                <template slot-scope="scope" slot="header">
                  <el-input :name="scope.$index" v-model="search" size="mini" :placeholder="$t('search')"
                    prefix-icon="el-icon-search" />
                </template>
                <template slot-scope="scope">
                  <a :href="getFile(scope.row)">
                    <el-button icon='el-icon-download' size="mini" type="primary" @click="handleDownload"
                      style="padding: 7px;">{{ $t('download') }}</el-button>
                  </a>
                  <el-button icon='el-icon-delete' size="mini" type="info" @click="handleDelete(scope.row, scope.$index)"
                    style="padding: 7px;">{{ $t('delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('File_statistics')" name="second">
          <Echarts></Echarts>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import { timeInterval } from "@/utils/tools.js"
import Echarts from "../components/echarts/echarts.vue";
export default {
  inject: ["reload"],
  components: {
    Echarts,
  },
  props: ["type"],
  data() {
    return {
      height: '',
      search: '',
      activeName: 'first',
      tableData: [],
      defaultType: "all",
    };
  },
  watch: {
    type(newValue, oldValue) {
      console.log("侦听器：", newValue, oldValue);
      if (newValue != oldValue) {
        this.checkType(newValue);
        this.getFileList();
      }
    },
  },
  computed: {
    uid() {
      return sessionStorage.getItem("uid");
    },
  },
  created() {
    this.checkType(this.type);
    this.getFileList();
    this.screenHeight()
    this.$store.dispatch('getEcharts')
  },
  filters: {
    // 处理相对时间
    formatDateTime(val) {
      return timeInterval(new Date(val && moment(val).format('YYYY-MM-DD HH:mm:ss')))
    },
    // 处理绝对时间
    getFormatDate(val) {
      return val && moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },

  methods: {
    // 获取可视区域的高度
    screenHeight() {
      this.height = document.documentElement.clientHeight - 200
      console.log('height', this.height);
    },
    // 点击tab栏切换功能
    handleClick(tab, event) {
      console.log(tab, event);
      this.$store.dispatch('getEcharts')
    },

    /**
     * 从服务器获取文件列表信息
     */
    getFileList() {
      const that = this;
      console.log("请求路径：", `/file/list/${this.uid}/${this.defaultType}`);
      this.$http
        .get(`/file/list/${this.uid}/${this.defaultType}`)
        .then((res) => {
          console.log("【返回的文件列表信息】", res.data);
          if (res.data && res.data.code == 1) {
            that.tableData = res.data.data;
            // localStorage.setItem('tableDate',JSON.stringify(that.tableData))
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    /**
     * 根据关键字返回文件类型
     */
    checkType(type) {
      switch (type) {
        case "video":
          this.defaultType = ['.mp4', '.wmv', '.asf', '.asx', '.3gp', '.mov', '.m4v'];
          break;
        case "audio":
          this.defaultType = ['.mp3', '.cda', '.wav', '.wma', '.mpeg'];
          break;
        case "image":
          this.defaultType = ['.jpeg', '.png', '.jpg', 'gif', '.tiff', '.tga', '.bmp', '.svg', '.dds', '.psd', 'eps', '.ico'];
          break;
        case "doc":
          this.defaultType = ['.docx', '.doc', '.txt', '.excel', '.xlsx', '.sql', '.md', '.ppt', '.pptx', '.js', '.css', '.php'];
          break;
        // case "excel":
        //   this.defaultType = ".excel";
        //   break;
        case "package":
          this.defaultType = ['.zip', '.rar', '.7z'];
          break;
        case "app":
          this.defaultType = ['.exe'];
          break;
        default:
          this.defaultType = 'all';
      }
    },
    /**
     * 处理文件字节大小的显示
     * @param {*} row 表格行
     * @param {*} column 
     */
    dealSize(row, column) {
      let fileSize
      if ((row.size / 1024 / 1024).toFixed(2) > 1024) {
        fileSize = (row.size / 1024 / 1024 / 1024).toFixed(2);
        return `${fileSize} GB`;
      } else if ((row.size / 1024).toFixed(2) > 1024) {
        fileSize = (row.size / 1024 / 1024).toFixed(2);
        return `${fileSize} MB`;
      } else if ((row.size / 1).toFixed(2) > 1024) {
        fileSize = (row.size / 1024).toFixed(2);
        return `${fileSize} KB`;
      } else {
        fileSize = (row.size / 1).toFixed(2);
        return `${fileSize} B`
      }
      console.log('row',row)
      console.log('column',column)
    },

    /**
     * 获取下载文件的路径
     */
    getFile(data) {
      let url = `http://localhost:8082/file/download/${data.hash_name}/${data.id}`;
      return url;
    },
    /**
     * 下载处理
     */
    handleDownload() {
      setTimeout(() => {
        this.getFileList();
      }, 1000);
    },
    /**
     * 删除文件
     */
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(
            "删除请求路径：",
            `/file/delete/${row.hash_name}/${row.id}`
          );
          this.$http
            .delete(`/file/delete/${row.hash_name}/${row.id}`)
            .then((res) => {
              console.log("删除返回：", res);
              if (res.data) {
                this.$store.dispatch('getEcharts')
                this.getFileList();
                this.reload()
                console.log(res.data.msg, '删除成功')
                this.$message({
                  type: "success",
                  message: "文件删除成功",
                });
              } else {
                this.$message.error("文件删除失败");
              }
            })
            .catch((err) => {
              console.log("Error=>", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 预览文件
    handlePreview(row) {
      // this.$http.get(`/file/preview/${row.hash_name}/${row.id}`)
      // .then((res)=>{
      //   console.log(res,11111111111)
      // }) 
      // .catch((err) => {
      //   console.log("err",err);
      // })
    }
  },

}

</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}

/* .el-table>>>.el-table__cell {
  text-align: center;
} */

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-form-item>>>.el-form-item__label {
  font-size: 14px;
  margin: 2px 10px 0px 53px;
  font-weight: 700;
  color: #409eff;
  background-color: #ecf5ff;
  padding: 5px;
  display: inline-block;
  line-height: 20px;
  transform: translateY(3px);
  border-radius: 5px;
}

.el-table__row>>>.el-table__expanded-cell {
  background-color: blue;
}

.list>>>.el-table__body-wrapper::-webkit-scrollbar {
  width: 0;
}
</style>