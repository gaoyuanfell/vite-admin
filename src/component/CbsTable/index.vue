<template>
  <div class="cbs-table" :class="{ 'table-height-auto': heightAuto }">
    <el-form :inline="true" ref="searchForm" :model="searchParams" :size="formSize" class="table-form">
      <slot name="visibleConditions" :scope="searchParams"></slot>
      <div class="btn-wrapper">
        <el-button icon="el-icon-search" type="primary" :size="formSize">查询</el-button>
        <el-button icon="el-icon-refresh" :size="formSize" style="margin-left: 10px">重置</el-button>
      </div>
    </el-form>
    <div class="table-toolbar">
      <template v-for="(item, index) of module.default.toolbar" :key="index">
        <el-button v-bind="{ size: 'mini', type: 'primary', ...(item.props || {}) }" @click="item.click && item.click($event)">{{ item.name }}</el-button>
      </template>
      <template v-for="(item, index) of module.toolbar" :key="index">
        <el-button v-bind="{ size: 'mini', type: 'primary', ...(item.props || {}) }" @click="item.click && item.click($event)">{{ item.name }}</el-button>
      </template>
      <slot name="toolbar"></slot>
    </div>
    <div class="cbs-ag-grid">
      <ag-grid ref="grid" :columnDefs="columnDefs" :rowData="tableData" :rowSelection="agGrid.rowSelection" :rowClass="agGrid.rowClass"></ag-grid>
    </div>
    <div class="table-pagination">
      <el-pagination
        class="el-pagination"
        @size-change="_sizeChange"
        @current-change="_currentChange"
        v-model:current-page="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AgGrid from "./AgGrid.vue";
import { defaultsDeep } from "lodash";

export default defineComponent({
  components: {
    AgGrid
  },
  props: {
    data: {
      type: Array
    },
    module: {
      type: Object,
      required: true
    },
    /** 全选 */
    showTableSelection: {
      type: Boolean,
      default: false
    },
    /** 单选 */
    showTableSingle: {
      type: Boolean,
      default: false
    },
    /** 是否是树结构 */
    tree: {
      type: Boolean,
      default: false
    },
    /** 树的key */
    treeKey: {
      type: String,
      default: "children"
    },
    heightAuto: {
      type: Boolean,
      default: false
    },
    formSize: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {
      pagination: {
        total: 1000,
        pageSizes: [20, 30, 40, 50],
        pageSize: 20,
        currentPage: 2
      },

      searchParams: {},
      /** 表格数据 */
      tableData: [],
      /** 缓存表格数据 */
      cacheTableData: null,
      agGrid: {
        rowClass: this.showTableSelection ? "ag-grid-class show-table-selection" : "ag-grid-class",
        ready: false,
        rowSelection: this.showTableSelection ? "multiple" : this.showTableSingle ? "single" : "" // multiple 列选择
      }
    };
  },
  provide() {
    return {
      table: this
    };
  },
  computed: {
    columnDefs() {
      const list = this.module.columns;
      let columns = list.map((i, index) => {
        const obj = { ...i };
        Object.assign(obj, {
          unSortIcon: true,
          field: i.prop,
          headerName: i.label,
          pinned: i.fixed,
          width: i.width,
          headerClass: i.align ? `ag-${i.align}-cell` : "ag-left-cell",
          cellClass: i.align ? `ag-${i.align}-cell` : "ag-left-cell",
          comparator: () => {},
          cellRendererFramework: "CellRendererFramework"
        });

        if (this.tree && index === 0) {
          obj.cellRendererFramework = "TreeColumnFramework";
        }

        return obj;
      });

      if (this.showTableSelection) {
        columns.unshift({
          cellRendererFramework: "SelectionColumnFramework",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          field: " ",
          headerName: " ",
          maxWidth: 42,
          minWidth: 42,
          width: 42,
          pinned: "left",
          resizable: false,
          comparator: () => {}
        });
      }
      return columns;
    }
  },
  methods: {
    /** 自动计算宽度 */
    autoWidth() {
      this.$nextTick(() => {
        this.$refs.grid.autoWidth();
      });
    },
    _sizeChange() {},
    _currentChange() {},
    _mergeModule() {
      if (this.module) {
        defaultsDeep(this.module, {
          default: {}
        });

        const operations = this.module.default.operations || ["ADD", "EDIT", "DELETE", "SEE"];

        const defaultBtns = {
          toolbar: {},
          actions: {}
        };
        if (operations.includes("ADD")) {
          defaultBtns.toolbar["ADD"] = {
            name: "新建",
            props: {
              size: "mini",
              type: "primary",
              icon: "el-icon-circle-plus-outline"
            },
            click: () => {
              console.info('ADD')
            }
          };
        }

        if (operations.includes("EDIT")) {
          defaultBtns.actions["EDIT"] = {
            name: "编辑",
            props: {
              size: "mini",
              type: "text"
            },
            click: (item, event) => {
              event.stopPropagation();
            }
          };
        }

        if (operations.includes("SEE")) {
          defaultBtns.actions["SEE"] = {
            name: "查看",
            props: {
              size: "mini",
              type: "text"
            },
            click: (item, event) => {
              event.stopPropagation();
            }
          };
        }

        if (operations.includes("DELETE")) {
          defaultBtns.actions["DELETE"] = {
            name: "删除",
            props: {
              size: "mini",
              type: "text"
            },
            click: (item, event) => {
              event.stopPropagation();
            }
          };
        }

        if (operations.includes("REMOVE")) {
          defaultBtns.actions["REMOVE"] = {
            name: "删除",
            props: {
              size: "mini",
              type: "text"
            },
            click: (item, event) => {
              event.stopPropagation();
            }
          };
        }

        defaultsDeep(this.module, {
          default: {
            ...defaultBtns
          }
        });
      }
    }
  },
  created() {
    this.tableData = this.data;
    this._mergeModule();
  }
});
</script>

<style lang="scss" scoped>
.cbs-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &.table-height-auto {
    height: auto;
  }
}

.cbs-ag-grid {
  flex: 1;
}

.table-pagination {
  display: flex;
  .el-pagination {
    margin-left: auto;
  }
}

.table-form {
  padding: 10px 0;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(5, 1fr);
  ::v-deep(.el-form-item) {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}

.table-toolbar {
  margin-bottom: 10px;
}
</style>
