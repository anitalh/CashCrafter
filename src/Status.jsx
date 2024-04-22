import { MESSAGES } from './constants';
import './status.css';

function Status({ error }) {

  const message = MESSAGES[error] || MESSAGES.default;
  
  // Rendering the status message
  return (
    <div className="status">
      {error && message}
    </div>
  );
}

export default Status;
