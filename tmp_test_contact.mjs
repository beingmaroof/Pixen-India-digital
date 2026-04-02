fetch('http://localhost:3000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    phone: '1234567890',
    businessType: 'SaaS',
    budget: 'Above',
    message: 'test message'
  })
}).then(res => res.json()).then(console.log).catch(console.error);
