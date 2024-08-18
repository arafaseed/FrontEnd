import React, { useEffect, useState } from 'react';

const FogetPassword = () => {

    const [username, setUsername] = useState('');
    
    const [error, setError] = useState('');
  return (
    <div>
        <div className="containe">
      <h2>Foget Password</h2>
      {/* onSubmit={handleSubmit} */}
      <form >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            required
          />
        </div>
        
        <div className="form-group">
          <input type="submit" value="Reset" />
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
    </div>
  )
}

export default FogetPassword

