const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const userSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: 'user' } });
const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecomerce', { useNewUrlParser: true, useUnifiedTopology: true })
.then(async ()=>{
  const adminEmail = 'admin@hamper.local'
  const exists = await User.findOne({ email: adminEmail })
  if(exists){
    console.log('Admin already exists:', adminEmail)
    process.exit(0)
  }
  const hashed = await bcrypt.hash('Admin@123', 10)
  const admin = new User({ name: 'Admin', email: adminEmail, password: hashed, role: 'admin' })
  await admin.save()
  console.log('Admin user created. Email:', adminEmail, 'Password: Admin@123')
  process.exit(0)
}).catch(err=>{
  console.error(err); process.exit(1)
})
