const API_BASE = 'http://localhost:5000/api'
const adminTokenKey = 'boj_admin_token'

const state = {
  token: localStorage.getItem(adminTokenKey) || '',
  products: [],
  hampers: [],
  currentTab: 'dashboard',
  editingProduct: null,
  editingHamper: null,
  productUploadPath: '',
  hamperUploadPath: ''
}

const ui = {
  loginSection: document.getElementById('adminLogin'),
  panelSection: document.getElementById('adminPanel'),
  navLinks: document.querySelectorAll('.admin-nav button'),
  statusMessage: document.getElementById('statusMessage'),
  dashboardStats: document.getElementById('dashboardStats'),
  productTable: document.getElementById('productTableBody'),
  hamperTable: document.getElementById('hamperTableBody'),
  productForm: document.getElementById('productForm'),
  hamperForm: document.getElementById('hamperForm'),
  productImagePreview: document.getElementById('productImagePreview'),
  hamperImagePreview: document.getElementById('hamperImagePreview'),
  productFormTitle: document.getElementById('productFormTitle'),
  hamperFormTitle: document.getElementById('hamperFormTitle'),
  logoutButton: document.getElementById('adminLogout'),
  loginButton: document.getElementById('adminLoginButton')
}

function showMessage(message, type='info') {
  ui.statusMessage.textContent = message
  ui.statusMessage.className = `status ${type}`
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${state.token}` }
}

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options)
  if (!res.ok) {
    const error = await res.json().catch(()=>({message:'Server error'}))
    throw new Error(error.message || 'API error')
  }
  return res.json()
}

function showTab(tab) {
  state.currentTab = tab
  ui.navLinks.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab))
  document.querySelectorAll('.admin-panel-section').forEach(sec => sec.style.display = sec.dataset.tab === tab ? 'block' : 'none')
}

async function loginAdmin() {
  const email = document.getElementById('loginEmail').value.trim()
  const password = document.getElementById('loginPassword').value.trim()
  if (!email || !password) {
    return showMessage('Please enter admin email and password.', 'error')
  }
  try {
    const result = await api('/users/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email, password})
    })
    state.token = result.token
    localStorage.setItem(adminTokenKey, state.token)
    showMessage('Logged in successfully.', 'success')
    openAdminPanel()
    loadAdminData()
  } catch (err) {
    showMessage(err.message, 'error')
  }
}

function logoutAdmin() {
  localStorage.removeItem(adminTokenKey)
  state.token = ''
  ui.loginSection.style.display = 'block'
  ui.panelSection.style.display = 'none'
  ui.logoutButton.style.display = 'none'
  showMessage('Logged out.', 'info')
}

function openAdminPanel() {
  ui.loginSection.style.display = 'none'
  ui.panelSection.style.display = 'block'
  ui.logoutButton.style.display = 'inline-flex'
  showTab(state.currentTab)
}

async function loadAdminData() {
  try {
    const [products, hampers, stats] = await Promise.all([
      api('/products'),
      api('/hamper/type/birthday'),
      api('/analytics/dashboard', { headers: authHeaders() })
    ])
    state.products = products
    state.hampers = hampers
    renderProducts()
    renderHampers()
    populateHamperProductSelect()
    renderDashboard(stats)
    showMessage('Admin data loaded.', 'success')
  } catch (err) {
    showMessage(err.message, 'error')
  }
}

function populateHamperProductSelect() {
  const select = document.getElementById('hamperProductSelect')
  if (!select) return
  select.innerHTML = state.products.map(product => `
    <option value="${product._id}">${product.name} — ₹${product.price}</option>
  `).join('')
}

function renderDashboard(stats) {
  ui.dashboardStats.innerHTML = `
    <div class="stat-card"><span>Total Products</span><strong>${stats.totalProducts}</strong></div>
    <div class="stat-card"><span>Total Users</span><strong>${stats.totalUsers}</strong></div>
    <div class="stat-card"><span>Total Orders</span><strong>${stats.totalOrders}</strong></div>
    <div class="stat-card"><span>Total Revenue</span><strong>₹${stats.totalRevenue}</strong></div>
  `
}

function renderProducts() {
  ui.productTable.innerHTML = state.products.map(product => `
    <tr>
      <td>${product.name}</td>
      <td>${product.category || '-'}</td>
      <td>₹${product.price}</td>
      <td><img class="table-thumb" src="${product.image || 'assets/product-placeholder.png'}" alt="${product.name}"></td>
      <td>
        <button type="button" class="btn small" onclick="editProduct('${product._id}')">Edit</button>
        <button type="button" class="btn small danger" onclick="deleteProduct('${product._id}')">Delete</button>
      </td>
    </tr>
  `).join('')
}

function renderHampers() {
  ui.hamperTable.innerHTML = state.hampers.map(hamper => `
    <tr>
      <td>${hamper.title}</td>
      <td>${hamper.type}</td>
      <td>₹${hamper.price || 0}</td>
      <td><img class="table-thumb" src="${hamper.image || 'assets/birthday-card.png'}" alt="${hamper.title}"></td>
      <td>
        <button type="button" class="btn small" onclick="editHamper('${hamper._id}')">Edit</button>
        <button type="button" class="btn small danger" onclick="deleteHamper('${hamper._id}')">Delete</button>
      </td>
    </tr>
  `).join('')
}

function fillProductForm(product = null) {
  const form = document.getElementById('productForm')
  ui.productFormTitle.textContent = product ? 'Edit Product' : 'Create Product'
  form.name.value = product?.name || ''
  form.category.value = product?.category || ''
  form.price.value = product?.price || ''
  form.description.value = product?.description || ''
  form.imagePath.value = product?.image || ''
  ui.productImagePreview.src = product?.image || 'assets/product-placeholder.png'
  state.editingProduct = product
}

function fillHamperForm(hamper = null) {
  const form = document.getElementById('hamperForm')
  ui.hamperFormTitle.textContent = hamper ? 'Edit Hamper Template' : 'Create Hamper Template'
  form.type.value = hamper?.type || 'birthday'
  form.title.value = hamper?.title || ''
  form.message.value = hamper?.message || ''
  form.theme.value = hamper?.theme || 'classic'
  form.color.value = hamper?.color || '#7c4dff'
  form.specialInstructions.value = hamper?.specialInstructions || ''
  form.imagePath.value = hamper?.image || ''
  ui.hamperImagePreview.src = hamper?.image || 'assets/birthday-card.png'
  state.editingHamper = hamper
  renderHamperProducts(hamper?.items || [])
}

function renderHamperProducts(items) {
  const list = document.getElementById('hamperItems')
  if (!items.length) {
    list.innerHTML = '<p class="empty-note">No products added yet.</p>'
    return
  }
  list.innerHTML = items.map(item => `
    <div class="item-row">
      <span>${item.name} x${item.quantity}</span>
      <button type="button" class="btn tiny danger" onclick="removeHamperItem('${item.productId}')">Remove</button>
    </div>
  `).join('')
  state.hamperItems = items
}

async function uploadFile(inputId, targetPreviewId, formField) {
  const file = document.getElementById(inputId).files[0]
  if(!file) return
  const data = new FormData()
  data.append('image', file)
  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${state.token}` },
      body: data
    })
    const result = await res.json()
    if (!res.ok) throw new Error(result.message || 'Upload failed')
    document.getElementById(formField).value = result.path
    document.getElementById(targetPreviewId).src = result.path
    showMessage('Image uploaded successfully.', 'success')
  } catch(err) {
    showMessage(err.message, 'error')
  }
}

function addHamperItem(productId) {
  const product = state.products.find(p => p._id === productId)
  if (!product) return
  const items = state.hamperItems || []
  const found = items.find(i => i.productId === productId)
  if (found) {
    found.quantity += 1
  } else {
    items.push({ productId, name: product.name, price: product.price, quantity: 1 })
  }
  renderHamperProducts(items)
}

function removeHamperItem(productId) {
  const items = (state.hamperItems || []).filter(i => i.productId !== productId)
  renderHamperProducts(items)
}

async function saveProduct(event) {
  event.preventDefault()
  const form = event.target
  const payload = {
    name: form.name.value,
    category: form.category.value,
    price: Number(form.price.value),
    description: form.description.value,
    image: form.imagePath.value
  }
  try {
    if (state.editingProduct && state.editingProduct._id) {
      await api(`/products/${state.editingProduct._id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(payload) })
      showMessage('Product updated successfully.', 'success')
    } else {
      await api('/products', { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
      showMessage('Product created successfully.', 'success')
    }
    state.editingProduct = null
    form.reset()
    loadAdminData()
  } catch(err) {
    showMessage(err.message, 'error')
  }
}

async function saveHamper(event) {
  event.preventDefault()
  const form = event.target
  const payload = {
    type: form.type.value,
    title: form.title.value,
    message: form.message.value,
    theme: form.theme.value,
    color: form.color.value,
    specialInstructions: form.specialInstructions.value,
    image: form.imagePath.value,
    items: state.hamperItems || [],
    price: (state.hamperItems || []).reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
  try {
    if (state.editingHamper && state.editingHamper._id) {
      await api(`/hamper/${state.editingHamper._id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(payload) })
      showMessage('Hamper updated successfully.', 'success')
    } else {
      await api('/hamper', { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
      showMessage('Hamper template created successfully.', 'success')
    }
    state.editingHamper = null
    form.reset()
    state.hamperItems = []
    renderHamperProducts([])
    loadAdminData()
  } catch(err) {
    showMessage(err.message, 'error')
  }
}

async function editProduct(id) {
  const product = state.products.find(p => p._id === id)
  if (!product) return
  fillProductForm(product)
  document.getElementById('productFormSection').scrollIntoView({ behavior: 'smooth' })
}

async function editHamper(id) {
  const hamper = state.hampers.find(h => h._id === id)
  if (!hamper) return
  fillHamperForm(hamper)
  document.getElementById('hamperFormSection').scrollIntoView({ behavior: 'smooth' })
}

async function deleteProduct(id) {
  if (!confirm('Delete this product?')) return
  try {
    await api(`/products/${id}`, { method: 'DELETE', headers: authHeaders() })
    showMessage('Product deleted.', 'success')
    loadAdminData()
  } catch(err) {
    showMessage(err.message, 'error')
  }
}

async function deleteHamper(id) {
  if (!confirm('Delete this hamper template?')) return
  try {
    await api(`/hamper/${id}`, { method: 'DELETE', headers: authHeaders() })
    showMessage('Hamper deleted.', 'success')
    loadAdminData()
  } catch(err) {
    showMessage(err.message, 'error')
  }
}

function init() {
  ui.loginButton.addEventListener('click', loginAdmin)
  ui.logoutButton.addEventListener('click', logoutAdmin)
  ui.logoutButton.style.display = 'none'
  document.getElementById('tabDashboard').addEventListener('click', () => showTab('dashboard'))
  document.getElementById('tabProducts').addEventListener('click', () => showTab('products'))
  document.getElementById('tabHampers').addEventListener('click', () => showTab('hampers'))
  document.getElementById('tabOrders').addEventListener('click', () => showTab('orders'))
  ui.productForm.addEventListener('submit', saveProduct)
  ui.hamperForm.addEventListener('submit', saveHamper)
  document.getElementById('productImageUpload').addEventListener('change', () => uploadFile('productImageUpload','productImagePreview','productImagePath'))
  document.getElementById('hamperImageUpload').addEventListener('change', () => uploadFile('hamperImageUpload','hamperImagePreview','hamperImagePath'))
  document.getElementById('addHamperItemBtn').addEventListener('click', ()=> {
    const productId = document.getElementById('hamperProductSelect').value
    if(productId) addHamperItem(productId)
  })
  if (state.token) {
    openAdminPanel()
    loadAdminData()
  }
}

window.editProduct = editProduct
window.editHamper = editHamper
window.deleteProduct = deleteProduct
window.deleteHamper = deleteHamper
window.removeHamperItem = removeHamperItem

init()
