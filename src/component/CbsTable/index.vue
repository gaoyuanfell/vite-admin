<template>
  <ag-grid ref="grid" :columnDefs="columnDefs" :rowData="tableData" :rowSelection="agGrid.rowSelection" :rowClass="agGrid.rowClass"></ag-grid>
</template>

<script>
import { defineComponent } from "vue";
import AgGrid from "./AgGrid.vue";
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
      default: 'children'
    },
  },
  data() {
    return {
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
          obj.cellRendererFramework = "TreeColumnFramework"
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
        this.$refs.grid.autoWidth()
      })
    },
  },
  created() {
    this.tableData = this.data
  }
});
</script>

<style></style>
