<template>
  <template v-if="children instanceof Array && children.length">
    <div>
      <span class="ag-group-contracted">
        <span class="ag-icon" :class="{ 'ag-icon-tree-closed': action === 'add', 'ag-icon-tree-open': action === 'remove' }" @click="applyTransaction"></span>
      </span>
      <span ref="tree">{{ params.value }}</span>
    </div>
  </template>
  <template v-else>
    <span ref="tree">{{ params.value }}</span>
  </template>
</template>

<script>
import { defineComponent } from "vue";
const rowMap = new Map();
export default defineComponent({
  data() {
    return {
      children: undefined,
      action: "add"
    };
  },
  mounted() {
    // let table = this.parent.$parent.table;
    // let column = this.params.column;
    // let rowIndex = this.params.rowIndex;
    // let data = this.params.data;
    // let treeKey = table.treeKey;
    // const scope = {
    //   $index: rowIndex,
    //   row: data,
    //   column: column
    // };
    this.$nextTick(() => {
      const { zIndex } = rowMap.get(this.params.data);
      const parentNode = this.$refs.tree && this.$refs.tree.parentNode;
      if (!parentNode) return;
      zIndex && (parentNode.style.paddingLeft = `${12 + 24 * zIndex}px`);
    });
  },
  created() {
    let table = this.parent.$parent.table;
    let data = this.params.data;
    let treeKey = table.treeKey;
    if (!rowMap.has(data)) {
      rowMap.set(data, {
        zIndex: 0
      });
    }
    this.children = data[treeKey];
    if (data.$action) {
      this.action = data.$action;
    }
  },
  methods: {
    getTableData() {
      let table = this.parent.$parent.table;
      return table.cacheTableData ? [...table.cacheTableData] : [...table.tableData];
    },
    setTableData(val) {
      let table = this.parent.$parent.table;
      table.cacheTableData = val;
    },
    applyTransaction(event) {
      event.stopPropagation();
      let column = this.params.column;
      let rowIndex = this.params.rowIndex;
      let data = this.params.data;
      let table = this.parent.$parent.table;
      let treeKey = table.treeKey;
      const scope = {
        $index: rowIndex,
        row: data,
        column: column
      };

      const config = rowMap.get(scope.row);
      const tableData = this.getTableData();
      const children = [...scope.row[treeKey]];
      if (!(children instanceof Array) || children.length === 0) return;
      if (this.action === "add") {
        this.action = "remove";
        scope.row.$action = "remove";
        children.forEach((item) => {
          const _item = rowMap.has(item);
          if (!_item) {
            rowMap.set(item, {
              zIndex: config.zIndex + 2
            });
          }
        });
        const index = tableData.findIndex((item) => scope.row === item);
        tableData.splice(index + 1, 0, ...children);
        this.params.api.applyTransaction({ add: children, addIndex: index + 1 });
        this.setTableData(tableData);
      } else {
        this.remove(children, tableData);
        this.setTableData(tableData);
        this.action = "add";
        scope.row.$action = "add";
      }
      setTimeout(() => {
        table.autoWidth();
      }, 250);
    },
    remove(item, tableData) {
      let table = this.parent.$parent.table;
      let treeKey = table.treeKey;
      if (item instanceof Array) {
        item.forEach((_item) => {
          this.remove(_item, tableData);
        });
      } else {
        const children = [...item[treeKey]];
        if (children instanceof Array && children.length) {
          item.$action = "add";
          this.remove(children, tableData);
        }
        const index = tableData.findIndex((_item) => _item === item);
        if (index !== -1) {
          this.params.api.applyTransaction({ remove: [item] });
          tableData.splice(index, 1);
        }
      }
      return tableData;
    }
  }
});
</script>

<style lang="scss" scoped></style>
