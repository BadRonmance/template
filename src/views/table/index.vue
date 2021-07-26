<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-21 09:37:00
 * @LastEditTime: 2021-07-26 10:59:40
 * @LastEditors: 张泽锋
-->
<template>
  <div v-sxloading="show">
    <el-table
      border
      :data="filteredData"
      style="width: 100%"
      height="800"
      :data-size="tableData.length"
      v-loadMoreTable="handelLoadmore"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <div>
            <el-input
              v-model="scope.row.date"
              placeholder="请输入字符"
            ></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <div>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <div>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <div>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <div>
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      show: false,
      tableData: [],
      currentStartIndex: 0,
      currentEndIndex: 20,
    };
  },
  created() {
    this.show = true;
    this.getTableData();
  },
  computed: {
    filteredData() {
      return this.tableData.filter((item, index) => {
        if (index < this.currentStartIndex) {
          return false;
        } else if (index > this.currentEndIndex) {
          return false;
        } else {
          return true;
        }
      });
    },
  },
  methods: {
    handelLoadmore(currentStartIndex, currentEndIndex) {
      this.currentStartIndex = currentStartIndex;
      this.currentEndIndex = currentEndIndex;
    },
    getTableData() {
      let cont = 0;
      let tableData = [];
      while (cont < 30000) {
        cont = cont + 1;
        let object = {
          date: cont,
          name: "王小虎" + cont,
          address: "上海市普陀区金沙江路 cont 弄",
        };
        tableData.push(object);
      }
      setTimeout(() => {
        this.tableData = tableData;
        this.show = false;
      }, 2000);
    },
  },
  watch: {},
};
</script>

<style scoped>
.el-table__body-wrapper .el-table__row td {
  display: none;
}
.el-table__body-wrapper .el-table__row {
  height: 38px;
}
</style>
