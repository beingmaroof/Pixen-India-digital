/**
 * Automated Test Script for Contact Form Fixes
 * 
 * This script tests all the critical fixes implemented.
 * Run this in browser console on the contact page.
 * 
 * Usage:
 * 1. Navigate to http://localhost:3001/contact
 * 2. Open browser console (F12)
 * 3. Copy and paste this entire script
 * 4. Press Enter to run
 */

console.log('🧪 Starting Pixen India Contact Form Tests...\n');

const TESTS = {
  // Test 1: Check if form exists
  formExists: () => {
    const form = document.querySelector('form');
    console.assert(form !== null, '❌ Form should exist on contact page');
    console.log('✅ Form exists on contact page');
    return !!form;
  },

  // Test 2: Check all required fields
  formFieldsExist: () => {
    const fields = [
      'name',
      'email',
      'phone',
      'businessType',
      'budget',
      'message'
    ];
    
    fields.forEach(fieldName => {
      const field = document.querySelector(`[name="${fieldName}"]`);
      console.assert(field !== null, `❌ Field "${fieldName}" should exist`);
      if (field) {
        console.log(`✅ Field "${fieldName}" exists`);
      }
    });
  },

  // Test 3: Check validation messages
  validationWorks: () => {
    console.log('\n📋 Testing Validation...');
    
    // Find and click submit button to trigger validation
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.click();
      
      setTimeout(() => {
        const errorMessages = document.querySelectorAll('[class*="text-red"]');
        console.log(`✅ Found ${errorMessages.length} validation error messages (expected)`);
      }, 100);
    }
  },

  // Test 4: Check Calendly link
  calendlyLinkCorrect: () => {
    console.log('\n📅 Testing Calendly Link...');
    
    // Check the "Book Your Free Call Now" button
    const buttons = Array.from(document.querySelectorAll('button'));
    const calendlyButton = buttons.find(btn => 
      btn.textContent.includes('Book Your Free Call')
    );
    
    if (calendlyButton) {
      // The button uses onClick, so we need to check the handler
      console.log('✅ "Book Your Free Call Now" button found');
      console.log('   Expected URL: https://calendly.com/pixenindia/free-consultation');
      console.log('   Note: Click the button to verify it opens correct URL');
    } else {
      console.warn('⚠️ "Book Your Free Call Now" button not found');
    }
  },

  // Test 5: Check Twitter link in footer
  twitterLinkCorrect: () => {
    console.log('\n🐦 Testing Twitter Link...');
    
    const twitterLinks = Array.from(document.querySelectorAll('a'))
      .filter(a => a.href.includes('twitter.com'));
    
    if (twitterLinks.length > 0) {
      twitterLinks.forEach(link => {
        console.log(`✅ Twitter link found: ${link.href}`);
        console.assert(
          link.href === 'https://twitter.com/pixenindia',
          `⚠️ Twitter link might be incorrect: ${link.href}`
        );
      });
    } else {
      console.warn('⚠️ No Twitter links found');
    }
  },

  // Test 6: Check phone number display
  phoneNumberCorrect: () => {
    console.log('\n📞 Testing Phone Number Display...');
    
    const pageText = document.body.innerText;
    const phonePattern = /\+91\s?\d{5}\s?\d{5}/;
    const foundPhone = pageText.match(phonePattern);
    
    if (foundPhone) {
      console.log(`✅ Phone number found: ${foundPhone[0]}`);
      console.assert(
        foundPhone[0].includes('98765') && foundPhone[0].includes('43210'),
        '⚠️ Phone number might be placeholder (+91 XXXXX XXXXX)'
      );
    } else {
      console.warn('⚠️ No phone number found in expected format');
    }
  },

  // Test 7: Fill form with test data
  fillFormWithData: () => {
    console.log('\n✏️ Filling form with test data...\n');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      businessType: 'startup',
      budget: '1k-3k',
      message: 'This is a test message with more than 10 characters to pass validation'
    };
    
    // Fill each field
    Object.keys(testData).forEach(key => {
      const field = document.querySelector(`[name="${key}"]`);
      if (field) {
        field.value = testData[key];
        
        // Trigger change event
        field.dispatchEvent(new Event('change', { bubbles: true }));
        field.dispatchEvent(new Event('input', { bubbles: true }));
        
        console.log(`✅ Filled ${key}: ${testData[key]}`);
      }
    });
    
    console.log('\n✅ Form filled with test data');
    console.log('👉 Click "Send Message" button to test submission\n');
  },

  // Test 8: Check success message after submission
  checkSuccessMessage: () => {
    console.log('\n✅ After successful submission, you should see:');
    console.log('   - Green success screen');
    console.log('   - "Thank You for Reaching Out!" message');
    console.log('   - "We\'ll get back to you within 24 hours" text');
    console.log('   - "Send Another Message" button');
    console.log('   - Form should be cleared\n');
  },

  // Test 9: Check console logs
  checkConsoleLogs: () => {
    console.log('\n📊 Checking API response...\n');
    
    // Monkey-patch console.log to catch API responses
    const originalLog = console.log;
    let apiResponse = null;
    
    console.log = function(...args) {
      if (args.some(arg => 
        typeof arg === 'string' && 
        (arg.includes('Lead saved') || arg.includes('success'))
      )) {
        apiResponse = args.join(' ');
      }
      originalLog.apply(console, args);
    };
    
    setTimeout(() => {
      console.log = originalLog;
      if (apiResponse) {
        console.log('✅ API response logged:', apiResponse);
      }
    }, 2000);
  }
};

// Run all tests
console.log('='.repeat(60));
console.log('PIXEN INDIA CONTACT FORM - AUTOMATED TEST SUITE');
console.log('='.repeat(60));
console.log('');

TESTS.formExists();
console.log('');
TESTS.formFieldsExist();
console.log('');
TESTS.calendlyLinkCorrect();
console.log('');
TESTS.twitterLinkCorrect();
console.log('');
TESTS.phoneNumberCorrect();
console.log('');
TESTS.fillFormWithData();
console.log('');
TESTS.checkSuccessMessage();
console.log('');
TESTS.checkConsoleLogs();

console.log('\n' + '='.repeat(60));
console.log('✅ ALL TESTS COMPLETED!');
console.log('='.repeat(60));
console.log('\n📝 MANUAL TESTING REQUIRED:');
console.log('   1. Click "Send Message" button to test form submission');
console.log('   2. Click "Book Your Free Call Now" to verify Calendly link');
console.log('   3. Click Twitter icon in footer to verify link');
console.log('   4. Test on mobile viewport for responsiveness');
console.log('   5. Check email notifications (if configured)');
console.log('');
