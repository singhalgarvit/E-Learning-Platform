
const getAllCourses = async () => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/course`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};

const createCourse = async (courseData, token) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/course`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};

const deleteCourseById = async (courseId, token) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/course/${courseId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};


const purchaseCourse = async (course_id, token,amount) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/purchase`;

  const response = await fetch(`${url}/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token,
      course_id: course_id,
    },
    body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1', notes: {} })
  });

  const order = await response.json();
  
  // Open Razorpay Checkout
  const options = {
    key: process.env.REACT_APP_rzp_key_id, // Replace with your Razorpay key_id
    amount: order.amount,
    currency: order.currency,
    name: 'Shiksha Setu',
    description: 'Test Transaction',
    order_id: order.id, // This is the order_id created in the backend
    callback_url: 'http://localhost:3000/MyCourses', // Your success URL
    prefill: {
      name: 'Sample',
      email: 'your.email@example.com',
      contact: '9999999999'
    },
    theme: {
      color: '#F37254'
    },
    handler: function (response) {
      fetch(`${url}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        })
      }).then(res => res.json())
        .then(data => {
          if (data.status === 'ok') {
            window.location.href = '/MyCourses';
            alert("purchased successfully")
          } else {
            alert('Payment verification failed');
          }
        }).catch(error => {
          console.error('Error:', error);
          alert('Error verifying payment');
        });
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const getMyPurchasedCourses = async (token) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/course/mycourses`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token:token
    }
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};

export {getAllCourses, createCourse, deleteCourseById, purchaseCourse, getMyPurchasedCourses};
