export function module() {
  return {
    code: "user", // 模块名
    codeAlias: "user", // 模块别名，解决模块名与路由不一致，导致动态添加路由地址路径问题
    name: "用户", // 模块名称
    key: "username", // 列表数据id
    searchParams: {
      sortField: "createdAt",
      sortOrder: "desc"
    },
    useSearch: {
      // 查询钩子 支持 async/await
      beforeSearch: (searchForms) => {},
      afterSearch: (result) => {},
      afterReset: (searchForms) => {},
      beforeDelete: (row) => {},
      afterDelete: (id, row) => {},
      rowEnabled: (row, enabled) => {},
      rowClick: (id, row) => {},
      selectionChange: (list) => {}
    },
    columns: [
      //   {
      //     label: "用户名",
      //     prop: "username",
      //     slotName: 'username'
      //   },
      //   {
      //     label: "姓名",
      //     prop: "cname",
      //     sortable: true
      //   },
      //   {
      //     label: "性别",
      //     prop: "gender_t",
      //     align: "center"
      //   },
      //   {
      //     label: "角色",
      //     prop: "roles_t"
      //   },
      //   {
      //     label: "电话",
      //     prop: "phone"
      //   },
      //   {
      //     label: "归属机构",
      //     prop: "orgCode_t"
      //   },
      //   {
      //     label: "是否启用",
      //     prop: "enabled_t"
      //   },
      //   {
      //     label: "状态",
      //     prop: "state_t"
      //   },
      //   {
      //     label: "最近登录时间",
      //     prop: "lastLoginTime"
      //   },
      //   {
      //     label: "创建人",
      //     prop: "createdBy_t"
      //   },
      //   {
      //     label: "创建时间",
      //     prop: "createdAt",
      //     sortable: true
      //   },
      //   {
      //     label: "操作",
      //     slotName: "operations",
      //     fixed: "right",
      //     align: "center",
      //     noExport: true
      //   }
      {
        label: "页面编码",
        prop: "pageCode"
      },
      {
        label: "页面名称",
        prop: "pageName"
      },
      {
        label: "页面类型",
        prop: "pageType"
      },
      {
        label: "页面链接",
        prop: "pageUrl"
      },
      {
        label: "对应组件",
        prop: "component"
      },
      {
        label: "操作集合",
        slotName: "operationTag"
      },
      {
        label: "页面图标",
        prop: "pageIcon"
      },
      {
        label: "页面顺序",
        prop: "pageOrder"
      },
      {
        label: "父页面",
        prop: "parentPage"
      },
      {
        label: "操作",
        slotName: "operations",
        noExport: true,
        fixed: "right"
      }
    ],
    default: {
      components: {},
      operations: ["ADD", "EDIT", "DELETE", "SEE"], //  toolbar => ’ADD‘, actions => 'EDIT', 'DELETE', 'SEE'
      toolbar: {},
      actions: {}
    },
    toolbar: [
      {
        name: "新增",
        props: {
          size: "mini",
          type: "primary",
          icon: "el-icon-circle-plus-outline"
        },
        click: (event) => {
          event.stopPropagation();
          console.info(this, event);
        }
      }
    ],
    actions: [
      {
        name: "动态添加全宽行",
        vIf: (item) => {
          return true;
        },
        provideProps: (item) => {
          return {};
        },
        click: (item, event) => {
          event.stopPropagation();
          console.info(item)
        }
      }
    ]
  };
}
