import dayjs from 'dayjs';

export const getCompleteDateRange = (start, end) => {
  const dates = [];
  let current = dayjs(start);
  const endDate = dayjs(end);

  while (current <= endDate) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'day');
  }

  return dates;
};

export const formatDate = (date) => dayjs(date).format('MMM D, YYYY');

<Col span={12}>
                <Card title="Device Distribution" className="chart-card">
                  <Pie
                    data={{
                      labels: Object.keys(stats.deviceData),
                      datasets: [{
                        data: Object.values(stats.deviceData),
                        backgroundColor: ["#007FFF", "#00C49F", "#FFBB28"]
                      }]
                    }}
                    options={{
                      plugins: {
                        tooltip: { 
                          callbacks: { 
                            label: (ctx) => `${ctx.label}: ${ctx.raw}%` 
                          } 
                        }
                      }
                    }}
                  />
                </Card>
              </Col>