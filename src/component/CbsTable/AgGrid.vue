<template>
  <ag-grid-vue
    style="width: 100%; height: 100%"
    class="ag-theme-balham"
    :gridOptions="gridOptions"
    :rowData="rowData"
    :rowHeight="agGrid.rowHeight"
    :headerHeight="agGrid.headerHeight"
    :defaultColDef="agGrid.defaultColDef"
    :rowDragManaged="agGrid.rowDragManaged"
    :pagination="agGrid.pagination"
    :animateRows="agGrid.animateRows"
    :overlayNoRowsTemplate="template.overlayNoRowsTemplate"
    :overlayLoadingTemplate="template.overlayLoadingTemplate"
    :suppressColumnVirtualisation="agGrid.suppressColumnVirtualisation"
    :suppressCellSelection="agGrid.suppressCellSelection"
    :enableCellTextSelection="agGrid.enableCellTextSelection"
    :suppressRowClickSelection="agGrid.suppressRowClickSelection"
    :scrollbarWidth="agGrid.scrollbarWidth"
    :autoSizePadding="agGrid.autoSizePadding"
    @grid-ready="onGridReady"
    @first-data-rendered="onFirstDataRendered"
    v-bind="$attrs"
  ></ag-grid-vue>
</template>

<script>
import { defineComponent } from "vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import CellRendererFramework from "./CellRendererFramework.vue";
import SelectionColumnFramework from "./SelectionColumnFramework.vue";
import TreeColumnFramework from "./TreeColumnFramework.vue";
export default defineComponent({
  components: {
    AgGridVue,
    CellRendererFramework,
    SelectionColumnFramework,
    TreeColumnFramework,
  },
  props: {
    columnDefs: Array,
    rowData: Array
  },
  inject: ['table'],
  data() {
    return {
      gridOptions: {},
      modules: [],
      isFirstDataRendered: false,
      agGrid: {
        columnDefs: null,
        suppressRowClickSelection: true, // 单击行时不会发生行选择。当您只需要复选框选择时使用。
        suppressColumnVirtualisation: true, // 关闭列虚拟化
        suppressScrollOnNewData: false, // 则在提供新的行数据时，网格将不会滚动到顶部。如果您不想每次加载新数据时都默认滚动到顶部的默认行为，请使用此选项。
        enableCellTextSelection: true, // 设置为true能够选择单元格中的文本
        rowDragManaged: true, // 拖拽
        animateRows: true, // 拖拽动画
        pagination: false, // 分页
        // rowMultiSelectWithClick: true, // 带有单击的多行选择
        // suppressMaxRenderedRowRestriction: true, // 作为安全措施，网格最多可渲染500行 要消除此限制
        // debounceVerticalScrollbar: true, // 设置为true消除垂直滚动条的抖动
        suppressCellSelection: true, // 则无法选择单元格。这意味着当您单击单元格时，它们将不会获得键盘焦点。
        // paginationPageSize: 10,
        // serverSideStoreType: '', // full
        // rowModelType: 'serverSide',
        // rowSelection: 'single', // 行选择的类型。
        // autoGroupColumnDef: null,
        // rowBuffer: 0, // 网格渲染的可滚动可见区域之外渲染的行数  // TODO 需要动态调整
        rowHeight: 34, // 默认行高
        headerHeight: 38, // 包含列标签标题的行的高度
        scrollbarWidth: 8, // 告诉网格滚动条的宽度，该宽度用于网格宽度计算中
        autoSizePadding: 1, // 后要添加到列宽的像素数。如果要添加额外的空间以容纳（例如）排序图标或页眉的某些其他动态性质，请设置此设置
        defaultColDef: {
          // flex: 1,
          // editable: true,
          resizable: true,
          // sortable: true,
          // filter: true

          // editable: true,
          // enableRowGroup: true,
          // enablePivot: true,
          // enableValue: true,
          // sortable: true,
          // resizable: true,
          // filter: true,
          // flex: 1,
          // minWidth: 80
        },
      },
      template: {
        overlayNoRowsTemplate: '<span style="color: #909399;">暂无数据</span>',
        overlayLoadingTemplate: '<span></span>'
      },
    };
  },
  watch: {
    rowData(val, oldValue) {
      if (val === oldValue || val.length === 0) return
      this.$nextTick(() => {
        this.isFirstDataRendered = true
        this.autoWidth()
      })
    },
    // 'rowData.length'(val, oldValue) {
    //   if (val > oldValue) {
    //     this.$nextTick(() => {
    //       this.isFirstDataRendered = true
    //       this.autoWidth()
    //     })
    //   }
    // }
  },
  methods: {
    onGridReady() {
      const columns = this.columnDefs.filter((i) => i.hidden !== true)
      this.gridOptions.api.setColumnDefs(columns)
    },
    onFirstDataRendered() {
      if (this.isFirstDataRendered) return
      this.autoWidth()
    },
    /** 自动计算宽度 */
    autoWidth() {
      const columnController = this.gridOptions.columnApi.columnController
      const columns = this.gridOptions.columnApi.getAllColumns()

      const allColumnIds = []
      columns.forEach((column) => {
        allColumnIds.push(column.colId)
      })
      this.gridOptions.columnApi.autoSizeColumns(allColumnIds, false)
      const bodyWidth = this.gridOptions.columnApi.columnController.bodyWidth
      const viewportRight = this.gridOptions.columnApi.columnController.viewportRight
      if (viewportRight > bodyWidth) {
        const _columns = columns.filter((c) => !c.pinned && c.colId !== ' ')
        const width = Math.floor((viewportRight - bodyWidth) / _columns.length)
        let maxWidths = 0
        for (let index = 0; index < _columns.length; index++) {
          const column = _columns[index]
          const maxWidth = column.maxWidth
          let newWidth = column.actualWidth + width
          if (maxWidth && maxWidth < newWidth) {
            maxWidths += newWidth - maxWidth
            newWidth = maxWidth
          }
          if (index === _columns.length - 1) {
            newWidth = column.actualWidth + viewportRight - bodyWidth - index * width + maxWidths
          }
          column.setActualWidth(newWidth, 'api')
        }
        columnController.updateDisplayedColumns('api')
      }
    },
  }
});
</script>

<style></style>
