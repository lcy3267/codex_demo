<template>
  <div class="erp-layout">
    <aside class="sidebar">
      <h1>布料进销存 ERP</h1>
      <button v-for="item in modules" :key="item.key" :class="['menu-btn', { active: activeModule === item.key }]" @click="activeModule = item.key">
        {{ item.label }}
      </button>
    </aside>

    <main class="main">
      <header class="header">
        <h2>{{ currentTitle }}</h2>
        <p>Vue + Vite 构建的布料进销存系统</p>
      </header>

      <section v-if="activeModule === 'purchase'" class="panel-grid">
        <article class="card full">
          <h3>采购订单</h3>
          <simple-table :columns="purchaseOrderColumns" :rows="purchaseOrders" />
        </article>
        <article class="card">
          <h3>采购入库</h3>
          <simple-table :columns="purchaseInboundColumns" :rows="purchaseInbound" />
        </article>
        <article class="card">
          <h3>采购退货</h3>
          <simple-table :columns="purchaseReturnColumns" :rows="purchaseReturns" />
        </article>
        <article class="card full">
          <h3>供应商管理</h3>
          <simple-table :columns="supplierColumns" :rows="suppliers" />
        </article>
      </section>

      <section v-else-if="activeModule === 'sales'" class="panel-grid">
        <article class="card full"><h3>销售订单</h3><simple-table :columns="salesOrderColumns" :rows="salesOrders" /></article>
        <article class="card"><h3>销售出库</h3><simple-table :columns="salesOutboundColumns" :rows="salesOutbound" /></article>
        <article class="card"><h3>销售退货</h3><simple-table :columns="salesReturnColumns" :rows="salesReturns" /></article>
        <article class="card full"><h3>客户管理（CRM）</h3><simple-table :columns="customerColumns" :rows="customers" /></article>
      </section>

      <section v-else-if="activeModule === 'inventory'" class="panel-grid two-col">
        <article class="card"><h3>库存盘点</h3><simple-table :columns="stockCheckColumns" :rows="stockChecks" /></article>
        <article class="card"><h3>库存流水</h3><simple-table :columns="stockFlowColumns" :rows="stockFlows" /></article>
      </section>

      <section v-else-if="activeModule === 'finance'" class="panel-grid two-col">
        <article class="card"><h3>应收 / 应付款</h3><simple-table :columns="apArColumns" :rows="apArList" /></article>
        <article class="card"><h3>收付款记录</h3><simple-table :columns="paymentColumns" :rows="payments" /></article>
        <article class="card full">
          <h3>经营报表</h3>
          <div class="metrics">
            <div class="metric" v-for="(value, key) in report" :key="key"><strong>{{ value }}</strong><span>{{ reportMap[key] }}</span></div>
          </div>
        </article>
      </section>

      <section v-else class="card">
        <div class="title-row">
          <h3>商品管理（增删改查）</h3>
          <div>
            <input v-model="keyword" placeholder="搜索商品名/色号" class="input" />
            <button class="primary" @click="openCreate">新增商品</button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th v-for="col in productColumns" :key="col">{{ col }}</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredProducts" :key="item.id">
              <td>{{ item.id }}</td><td>{{ item.name }}</td><td>{{ item.purchasePrice }}</td><td>{{ item.salePrice }}</td><td>{{ item.brand }}</td><td>{{ item.color }}</td><td>{{ item.material }}</td>
              <td><button class="link" @click="openEdit(item)">编辑</button><button class="danger" @click="removeProduct(item.id)">删除</button></td>
            </tr>
          </tbody>
        </table>

        <div v-if="modalVisible" class="modal-mask">
          <div class="modal">
            <h3>{{ isEdit ? '编辑商品' : '新增商品' }}</h3>
            <div class="form-grid">
              <input v-model="productForm.name" placeholder="商品名称" class="input" />
              <input v-model.number="productForm.purchasePrice" type="number" placeholder="商品进价" class="input" />
              <input v-model.number="productForm.salePrice" type="number" placeholder="销售价格" class="input" />
              <input v-model="productForm.brand" placeholder="品牌/厂家" class="input" />
              <input v-model="productForm.color" placeholder="颜色名称/色号" class="input" />
              <input v-model="productForm.material" placeholder="成分/含量" class="input" />
            </div>
            <div class="modal-actions">
              <button @click="modalVisible = false">取消</button>
              <button class="primary" @click="saveProduct">保存</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, reactive, ref } from 'vue';

const modules = [
  { key: 'purchase', label: '采购管理' },
  { key: 'sales', label: '销售管理' },
  { key: 'inventory', label: '库存管理' },
  { key: 'finance', label: '财务管理' },
  { key: 'products', label: '商品管理' }
];
const titleMap = {
  purchase: '采购管理（进）', sales: '销售管理（销）', inventory: '库存管理（存）', finance: '财务管理', products: '商品管理'
};
const reportMap = { sales: '销售收入', cost: '采购成本', grossProfit: '毛利润', margin: '毛利率', receivable: '应收余额', payable: '应付余额' };
const activeModule = ref('purchase');
const currentTitle = computed(() => titleMap[activeModule.value]);

const purchaseOrders = [{ id: 'PO-202601', supplier: '华东纺织厂', product: '棉麻混纺布', unitPrice: 22, qty: 800, amount: 17600 }];
const purchaseOrderColumns = ['id', 'supplier', 'product', 'unitPrice', 'qty', 'amount'];
const purchaseInbound = [{ id: 'IN-3001', orderId: 'PO-202601', warehouse: 'A仓', qty: 790, checkedBy: '王仓管' }];
const purchaseInboundColumns = ['id', 'orderId', 'warehouse', 'qty', 'checkedBy'];
const purchaseReturns = [{ id: 'PR-101', supplier: '华东纺织厂', reason: '色差较大', qty: 10, status: '已退回' }];
const purchaseReturnColumns = ['id', 'supplier', 'reason', 'qty', 'status'];
const suppliers = [{ name: '华东纺织厂', level: 'A', agreement: '大货价 21.5~22', contact: '李经理 138****0010' }];
const supplierColumns = ['name', 'level', 'agreement', 'contact'];

const salesOrders = [{ id: 'SO-9001', customer: '锦绣服饰', product: '棉麻混纺布', qty: 240, amount: 7440, debt: 2200 }];
const salesOrderColumns = ['id', 'customer', 'product', 'qty', 'amount', 'debt'];
const salesOutbound = [{ id: 'OUT-5008', orderId: 'SO-9001', qty: 200, date: '2026-02-20' }];
const salesOutboundColumns = ['id', 'orderId', 'qty', 'date'];
const salesReturns = [{ id: 'SR-88', customer: '锦绣服饰', mode: '重新入库', qty: 5 }];
const salesReturnColumns = ['id', 'customer', 'mode', 'qty'];
const customers = [{ name: '锦绣服饰', consumed: 42000, debt: 2200, level: 'VIP' }];
const customerColumns = ['name', 'consumed', 'debt', 'level'];

const stockChecks = [{ sku: 'FAB-001', bookQty: 550, realQty: 545, diff: -5 }];
const stockCheckColumns = ['sku', 'bookQty', 'realQty', 'diff'];
const stockFlows = [{ time: '2026-02-20 14:36', sku: 'FAB-001', type: '销售出库', qty: -200, billNo: 'OUT-5008' }];
const stockFlowColumns = ['time', 'sku', 'type', 'qty', 'billNo'];

const apArList = [{ party: '锦绣服饰', kind: '应收', amount: 2200, dueDate: '2026-03-05' }];
const apArColumns = ['party', 'kind', 'amount', 'dueDate'];
const payments = [{ id: 'PAY-001', type: '收款', party: '锦绣服饰', amount: 3000, date: '2026-02-22' }];
const paymentColumns = ['id', 'type', 'party', 'amount', 'date'];
const report = { sales: '¥138000', cost: '¥94500', grossProfit: '¥43500', margin: '31.52%', receivable: '¥18600', payable: '¥24200' };

const products = ref([
  { id: 'FAB-001', name: '棉麻混纺布', purchasePrice: 22, salePrice: 31, brand: '华东纺织厂', color: '浅卡其/C-102', material: '棉60%+麻40%' },
  { id: 'FAB-002', name: '涤纶针织布', purchasePrice: 18, salePrice: 26, brand: '南海面料', color: '深灰/G-230', material: '涤纶90%+氨纶10%' }
]);
const productColumns = ['商品编号', '商品名称', '进价', '售价', '品牌/厂家', '颜色名称/色号', '成分/含量'];
const keyword = ref('');
const modalVisible = ref(false);
const isEdit = ref(false);
const editingId = ref('');
const productForm = reactive({ name: '', purchasePrice: 0, salePrice: 0, brand: '', color: '', material: '' });
const filteredProducts = computed(() => products.value.filter((p) => (p.name + p.color).includes(keyword.value)));

function resetForm() { Object.assign(productForm, { name: '', purchasePrice: 0, salePrice: 0, brand: '', color: '', material: '' }); }
function openCreate() { isEdit.value = false; editingId.value = ''; resetForm(); modalVisible.value = true; }
function openEdit(item) { isEdit.value = true; editingId.value = item.id; Object.assign(productForm, item); modalVisible.value = true; }
function saveProduct() {
  if (!productForm.name) return;
  if (isEdit.value) products.value = products.value.map((i) => (i.id === editingId.value ? { ...i, ...productForm } : i));
  else products.value.unshift({ id: `FAB-${String(products.value.length + 1).padStart(3, '0')}`, ...productForm });
  modalVisible.value = false;
}
function removeProduct(id) { products.value = products.value.filter((i) => i.id !== id); }

const SimpleTable = defineComponent({
  props: { columns: Array, rows: Array },
  setup(props) {
    return () => h('table', { class: 'table' }, [
      h('thead', [h('tr', props.columns.map((c) => h('th', c)))]),
      h('tbody', props.rows.map((row) => h('tr', props.columns.map((c) => h('td', row[c])))))
    ]);
  }
});
</script>

