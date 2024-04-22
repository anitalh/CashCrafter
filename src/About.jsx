import './about.css';

// Function component to render the About page
function About() {
    return (
      <div className="about-container">
        <h1>About Cash Crafter</h1>
        <p>Cash Crafter is a financial management application designed to help users sculpt their spending habits and achieve their financial goals.</p>
        <p>With Cash Crafter, you can:</p>
        <ul>
          <li>Track your expenses and income</li>
          <li>Analyze your spending patterns</li>
        </ul>
        <h2>Privacy Policy</h2>
        <p>Cash Crafter prioritizes your privacy and safeguards your personal information. We collect data solely for app functionality and communication purposes. Your information is not shared with third parties. Cash Crafter retains the copyright of the application and its content. Updates to this policy will be promptly communicated.</p>
        <p>If you have any questions or concerns about this Privacy Policy or our practices regarding your personal information, please contact us at contact@cashcrafter.com</p>
      </div>
    );
  }
  
  export default About;