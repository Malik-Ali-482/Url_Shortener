import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Spin, Card, Row, Col, DatePicker, Radio, Typography } from "antd";
import { ClockCircleOutlined, CalendarOutlined, RiseOutlined, LinkOutlined, BulbOutlined, DashboardOutlined, PieChartOutlined, BarChartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import "./History.css";

dayjs.extend(minMax);

ChartJS.register(
  Title, Tooltip, Legend, ArcElement, BarElement, 
  CategoryScale, LinearScale, PointElement, LineElement
);

const { Title: AntTitle, Text } = Typography;
const { RangePicker } = DatePicker;

const ClickHistory = () => {
  const [shortId, setShortId] = useState("");
  const [rawAnalytics, setRawAnalytics] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [stats, setStats] = useState({});
  const [selectedPreset, setSelectedPreset] = useState("all");

  const processAnalyticsData = (analytics, range) => {
    let filteredData = analytics;
    let startDate, endDate;

    if (range && range[0] && range[1]) {
      startDate = dayjs(range[0]).startOf("day");
      endDate = dayjs(range[1]).endOf("day");
      filteredData = analytics.filter(({ timestamp }) => {
        const date = dayjs(timestamp);
        return date >= startDate && date <= endDate;
      });
    } else if (analytics.length > 0) {
      const dates = analytics.map(({ timestamp }) => dayjs(timestamp));
      startDate = dayjs.min(dates);
      endDate = dayjs.max(dates);
    } else {
      return { dailyData: {}, hourlyData: [], dateArray: [] };
    }

    // Generate complete date sequence
    const dateArray = [];
    let currentDate = startDate.clone();
    while (currentDate <= endDate) {
      dateArray.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    const dailyData = dateArray.reduce((acc, date) => {
      const key = date.format("YYYY-MM-DD");
      acc[key] = 0;
      return acc;
    }, {});

    const hourlyData = new Array(24).fill(0);
    
    filteredData.forEach(({ timestamp }) => {
      const date = dayjs(timestamp);
      const dayKey = date.format("YYYY-MM-DD");
      const hour = date.hour();
      
      dailyData[dayKey] += 1;
      hourlyData[hour] += 1;
    });

    // Calculate statistics
    const days = Object.keys(dailyData);
    const totalClicks = filteredData.length;
    const averageDaily = totalClicks / (days.length || 1);
    const maxDailyEntry = Math.max(...Object.values(dailyData));
    const maxDailyDate = dateArray.find(
      date => dailyData[date.format("YYYY-MM-DD")] === maxDailyEntry
    );

    setStats({
      totalClicks,
      averageDaily: averageDaily.toFixed(1),
      maxDaily: maxDailyEntry,
      peakHour: hourlyData.indexOf(Math.max(...hourlyData)),
      busiestDay: maxDailyDate?.format("MMM D, YYYY") || "N/A",
      deviceData: { desktop: 65, mobile: 30, tablet: 5 } 
    });

    return {
      dailyData,
      hourlyData,
      dateArray: dateArray.map(d => d.format("YYYY-MM-DD"))
    };
  };

  useEffect(() => {
    if (rawAnalytics) {
      const processed = processAnalyticsData(rawAnalytics, dateRange);
      setProcessedData(processed);
    }
  }, [dateRange, rawAnalytics]);

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
    switch(preset) {
      case "week":
        setDateRange([dayjs().subtract(7, "day"), dayjs()]);
        break;
      case "month":
        setDateRange([dayjs().subtract(1, "month"), dayjs()]);
        break;
      case "year":
        setDateRange([dayjs().subtract(1, "year"), dayjs()]);
        break;
      default:
        setDateRange(null);
    }
  };

  const handleFetchHistory = async () => {
    if (!shortId.trim()) {
      setError("Please enter a valid Short ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8001/url/analytics/${shortId}`);
      setRawAnalytics(res.data.analytics);
      setError(null);
    } catch (err) {
      setError("Failed to fetch analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card className="stat-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="stat-content">
        {icon}
        <div>
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
      </div>
    </Card>
  );

  const FeatureCard = ({ icon, title, content }) => (
    <Card className="feature-card">
      <div className="feature-icon">{icon}</div>
      <AntTitle level={4} className="feature-title">{title}</AntTitle>
      <Text type="secondary">{content}</Text>
    </Card>
  );

  return (
    <div className="analytics-dashboard">
      <h1>Advanced URL Analytics</h1>
      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Enter Short URL ID"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          className="analytics-input"
        />
        <button onClick={handleFetchHistory} disabled={loading}>
          {loading ? <Spin size="small" /> : "Generate Insights"}
        </button>
        
        <div className="preset-selector">
          <Radio.Group 
            value={selectedPreset} 
            onChange={(e) => handlePresetChange(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="all">All Time</Radio.Button>
            <Radio.Button value="week">Last Week</Radio.Button>
            <Radio.Button value="month">Last Month</Radio.Button>
            <Radio.Button value="year">Last Year</Radio.Button>
          </Radio.Group>
        </div>
        
        <RangePicker
          value={dateRange}
          onChange={(dates) => {
            setDateRange(dates);
            setSelectedPreset("custom");
          }}
          style={{ marginLeft: 16 }}
        />
      </div>

      {error && <div className="error-alert">{error}</div>}

      {processedData && (
        <div className="analytics-content">
          <Row gutter={[16, 16]} className="stats-row">
            <Col span={6}>
              <StatCard
                title="Total Clicks"
                value={stats.totalClicks}
                icon={<LinkOutlined style={{ color: "#007FFF", fontSize: 24 }} />}
                color="#007FFF"
              />
            </Col>
            <Col span={6}>
              <StatCard
                title="Avg. Daily Clicks"
                value={stats.averageDaily}
                icon={<RiseOutlined style={{ color: "#00C49F", fontSize: 24 }} />}
                color="#00C49F"
              />
            </Col>
            <Col span={6}>
              <StatCard
                title="Peak Hour"
                value={`${stats.peakHour}:00 - ${stats.peakHour + 1}:00`}
                icon={<ClockCircleOutlined style={{ color: "#FF6B6B", fontSize: 24 }} />}
                color="#FF6B6B"
              />
            </Col>
            <Col span={6}>
              <StatCard
                title="Busiest Day"
                value={stats.busiestDay}
                icon={<CalendarOutlined style={{ color: "#FFBB28", fontSize: 24 }} />}
                color="#FFBB28"
              />
            </Col>
          </Row>

          <div className="chart-section">
            <Card title="Daily Click Trends" className="chart-card">
              <Line
                data={{
                  labels: processedData.dateArray,
                  datasets: [{
                    label: "Clicks",
                    data: processedData.dateArray.map(date => processedData.dailyData[date]),
                    borderColor: "#007FFF",
                    tension: 0.3,
                    fill: true,
                    backgroundColor: "rgba(0, 127, 255, 0.1)"
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { mode: "index", intersect: false }
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true }
                  }
                }}
              />
            </Card>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Hourly Distribution" className="chart-card">
                  <Bar
                    data={{
                      labels: [...Array(24).keys()].map(h => `${h}:00`),
                      datasets: [{
                        label: "Clicks per Hour",
                        data: processedData.hourlyData,
                        backgroundColor: "#007FFF",
                        barPercentage: 0.8
                      }]
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true }
                      }
                    }}
                  />
                </Card>
              </Col>
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
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickHistory;
