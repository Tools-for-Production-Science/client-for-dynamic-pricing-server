import Vuex from 'vuex';
import Vue from 'vue'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    emptyView: () => { },
    updateReports: () => { },
    testmsg: [
      "Test1", "Test2", "Test3"
    ],
    charts: {

    },
    versionHash: "",
    versionDate: "",
    tableData: [
      {
        date: "2020-05-03",
        end: "-",
        name: "Erster Versuch",
        status: "offen",
        options: "10011",
        expid: "2"
      },
      {
        date: "2020-05-02",
        end: "-",
        name: "Zweiter Versuch",
        status: "gescheitert",
        options: "10011",
        expid: "1"
      },
      {
        date: "2020-05-04",
        end: "-",
        name: "Dritter Versuch",
        status: "laufend",
        options: "01110",
        expid: "23"
      }
    ],
    selectedExp: -1,
    updateFreq: 4000,
    timeout: 120000,
    report: {
      id: 0,
      setTitle: "TestReport",
      sets: [
        {
          chartType: "line",
          chartTitle: "Erste Auswertung",
          chartData: {
            labels: [
              "Babol",
              "Cabanatuan",
              "Daegu",
              "Jerusalem",
              "Fairfield",
              "New York",
              "Gangtok",
              "Buenos Aires",
              "Hafar Al-Batin",
              "Idlib",
            ],
            datasets: [
              {
                label: "Line Chart",
                data: [600, 1150, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
                fill: false,
                borderColor: "#2554FF",
                backgroundColor: "#2554FF",
                borderWidth: 1,
              },
              {
                label: "Line Chart",
                data: [600, 50, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
                fill: false,
                borderColor: "#000000",
                backgroundColor: "#000000",
                borderWidth: 1,
              },
            ],
          }
        },
        {
          chartType: "story",
          chartTitle: "Erste Auswertung",
          chartData: {
            labels: ["Mittelwert", "Standardabweichung"],
            datasets: [{
              data: [5, 3]
            }]
          }
        },
        {
          chartType: "log",
          chartTitle: "Einige Logs",
          chartData: {
            labels: ["", ""],
            datasets: [{
              data: ["Dies ist der erste Log Eintrag", "Dies ist der zweite Log Eintrag", "...", "...", "...", "...", "...", "...", "...", "...", "...", "...", "...", "...", "...", "...", "...", "..."]
            }]
          }
        }
      ]
    },    
    secret: "2bf8928c97088a91cdc65fb6399b54e98c366523920cccd4e90c650dbdc2e14912b283c25fd955571068ee4d5762b1860e14248065e7dba19f28d23700332ebceeb92f2322a603b9ba4ec96be63c7d16bd5b6d8f40215a2f59a7255afa744232d26dec89ad7f2b0b5e883057a2e6d6113a4e969f645debd6956ca2f626ed8fa0f83a9325fc4e3ac61d52d2e7bc165bf0816b7cfe9b9e936053904d971f2ca9c067306751dac9fe465083cc1cd1d6ccfa6c638d69ca371efd800ed9cd415f8c03520dc68bf7e7c402fa5a3c21ef89aa8a1a0e7b2923826eb97fc83358043f607606400629e302b492e5355646266f42104eb4070c881cb4ed144cbbeba7895abb727dcd923d41a5d6a403a2acc6461cdd4764581730a59cc59539972eb6f4ad80cc2f5e58d639abf12d9789381cd9d3f8d8d82c34b9160b8ac263cc5bfdd0e3a2",
    selectedAdress: "http://localhost:3001",
    adress: [
    ],
    env: "v2"
    /*[
      {
        id: 0,
        setTitle: "LineChartTest",
        sets: [
          {
            chartType: "line",
            chartTitle: "Erste Auswertung",
            chartData: {
              labels: [
                "Babol",
                "Cabanatuan",
                "Daegu",
                "Jerusalem",
                "Fairfield",
                "New York",
                "Gangtok",
                "Buenos Aires",
                "Hafar Al-Batin",
                "Idlib",
              ],
              datasets: [
                {
                  label: "Line Chart",
                  data: [600, 1150, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
                  fill: false,
                  borderColor: "#2554FF",
                  backgroundColor: "#2554FF",
                  borderWidth: 1,
                },
                {
                  label: "Line Chart",
                  data: [600, 50, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
                  fill: false,
                  borderColor: "#000000",
                  backgroundColor: "#000000",
                  borderWidth: 1,
                },
              ],
            }
          }
        ]
      },
      {
        setTitle: "barChartTest",
        sets: [
          {
            chartType: "bar",
            chartTitle: "Erste Auswertung",
            chartData: {
              labels: [
                "2015-01",
                "2015-02",
                "2015-03",
                "2015-04",
                "2015-05",
                "2015-06",
                "2015-07",
                "2015-08",
                "2015-09",
                "2015-10",
                "2015-11",
                "2015-12"
              ],
              datasets: [
                {
                  label: "Bar Chart",
                  borderWidth: 1,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                  ],
                  borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                  ],
                  pointBorderColor: "#2554FF",
                  data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1]
                }
              ]
            }
          }
        ]
      },
      {
        setTitle: "pieChartTest",
        sets: [
          {
            chartType: "pie",
            chartTitle: "Erste Auswertung",
            chartData: {
              labels: ["Babol", "Cabanatuan", "Daegu", "Jerusalem"],
              datasets: [
                {
                  borderWidth: 1,
                  borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                  ],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                  ],
                  data: [1000, 500, 1500, 1000],
                },
              ],
            }
          }
        ]
      }
    ]*/
  },
  mutations: {
    increment(state)
    {
      state.count++
    },
    setTabeldata(state, payload)
    {
      state.tableData[0].status = 5;
    }
  },
})
