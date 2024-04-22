// Function to add a new transaction
export function fetchAddTransaction(title, amount, date, reference, type) {
  return fetch('/api/transactions', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        title,
        amount,
        date,
        reference,
        type
      }),
    })
    .catch(() => Promise.reject({
      error: 'networkError'
    }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
}

// Function to delete a transaction
export function fetchDeleteTransaction(id) {
  return fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    })
    .catch(() => Promise.reject({
      error: 'networkError'
    }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({
          error
        }))
        .then(err => Promise.reject(err));
    });
}

// Function to fetch all transactions
export function fetchTransactions() {
  return fetch('/api/transactions')
    .catch(() => Promise.reject({
      error: 'networkError'
    }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({
          error
        }))
        .then(err => Promise.reject(err));
    });
}

// Function to fetch session information
export function fetchSession() {
  return fetch('/api/session', {
      method: 'GET',
    })
    .catch(() => Promise.reject({
      error: 'networkError'
    }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({
          error
        }))
        .then(err => Promise.reject(err));
    });
}

// Function to logout
export function fetchLogout() {
  return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch(() => Promise.reject({
      error: 'networkError'
    }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({
          error
        }))
        .then(err => Promise.reject(err));
    });
}

// Function to login
export function fetchLogin(username) {
  return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        username
      }),
    })
    .catch(() => Promise.reject({
      error: 'networkError'
    }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({
          error
        }))
        .then(err => Promise.reject(err));
    });
}