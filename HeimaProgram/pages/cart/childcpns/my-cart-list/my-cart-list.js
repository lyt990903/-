import deleteAction from '../../../../utils/deleteAction.js';

// pages/cart/childcpns/my-cart-list/my-cart-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChkChange(event) {
      const changedId = event.currentTarget.dataset.id;
      this.triggerEvent("chkChange", {
        changedId
      }, {});
    },
    handleNumEditClick(event) {
      const {
        operation,
        id
      } = event.currentTarget.dataset;
      // console.log(operation,id);
      this.triggerEvent("numEditClick", {
        operation,
        id
      }, {});
    },
    handleItemLongTap(event) {
      const {
        id
      } = event.currentTarget.dataset;
      deleteAction("确定要删除该物品吗").then(res => {
        this.triggerEvent("itemLongTap",{id},{});
      })
    }
  }
})