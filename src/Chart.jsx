import './chart.css';

function Chart({ data }) {

  // create SVG path for lines connecting data points
  function createLinePath(dataPoints) {
    return dataPoints.map((point, index) => {
      return `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`;
    }).join(' ');
  };

  // create circles representing data points
  function createCircles(dataPoints, isIncome) {
    const circleClass = isIncome ? 'chart-circle-income' : 'chart-circle-expense';
    return dataPoints.map((point, index) => (
      <circle
        key={index}
        className={circleClass}
        cx={point.x}
        cy={point.y}
        r="3"
      />
    ));
  };

  // render legend for income and expense
  function renderLegend() {
    const svgWidth = 650;
    const legendPadding = 20;
    const legendWidth = 100;
    const xPosition = svgWidth - legendWidth - legendPadding;

    return (
      <g>
        <rect className="chart-legend-box-income" x={xPosition} y="10" />
        <text className="chart-legend-text" x={xPosition + 20} y="22">Income</text>
        <rect className="chart-legend-box-expense" x={xPosition} y="35" />
        <text className="chart-legend-text" x={xPosition + 20} y="47">Expense</text>
      </g>
    );
  };

  return (
    <svg width="600" height="300">
      <rect className="chart-background" width="100%" height="100%" />
      <line className="chart-background" x1="0" y1="300" x2="600" y2="300" />
      <line className="chart-background" x1="0" y1="0" x2="0" y2="300" />
      {data.income.length > 0 && (
        <path className="chart-line-income" d={createLinePath(data.income)} />
      )}
      {data.expenses.length > 0 && (
        <path className="chart-line-expense" d={createLinePath(data.expenses)} />
      )}
      {renderLegend()}
      {createCircles(data.income, true)}
      {createCircles(data.expenses, false)}
    </svg>
  );
};

export default Chart;
