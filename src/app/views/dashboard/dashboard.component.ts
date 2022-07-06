import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { DataService } from "../../Service/data.service";
import { Router } from "@angular/router";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { ThisReceiver } from "@angular/compiler";

// import { MatPaginator } from '@angular/material/paginator';
import {
  Component,
  Input,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
//declare let jsPDF;
// import jsPDF from "jspdf";
// import * as autoTable from "jspdf-autotable";
import pdfMake from "../../../../node_modules/pdfmake/build/pdfmake";
import pdfFonts from "../../../../node_modules/pdfmake/build/vfs_fonts";
import { DatePipe } from "@angular/common";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as FileSaver from "file-saver";
import * as xlsx from "xlsx";

@Component({
  templateUrl: "dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild("dt") content: any;
  @ViewChild("dt", { static: false }) filterTable: any;

  first = 0;
  rows = 10;
  startDate: any;
  endDate: any;
  columnDefs = [
    { headerName: "S.No", field: "SNo", width: 70 },
    { headerName: "TransactionId", field: "transId", width: 150 },
    { headerName: "Name", field: "name", width: 120, editable: false },
    { headerName: "Amount", field: "settleAmount", width: 150 },
    { headerName: "Time", field: "submitTimeLocal", width: 150 },
    { headerName: "Payment Method", field: "accountType", width: 150 },
    { headerName: "Account Number", field: "accountNumber", width: 150 },
    { headerName: "Status", field: "transactionStatus", width: 200 },
  ];
  paginationPageSize = 15;
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  cities: any;
  selectedCityCode: string;
  radioModel: string = "Month";
  transReport: any;
  successTransCount: any;
  totalTrans: number;
  showLoader = false;
  failureTransCount: number;
  expiryTransCount: any;
  fromDate: any;
  Popup=false;
  toDate: any;
  pendingTransCount: any;
  isToday: any;
  maxDate: any;
  exportColumns: any;
  date: Date;
  FilteredData: any;
  TotalAmount: number = 0;
  selectedCategoryId=1;
  categoryId:number=1;
  categoryList: any;
  groupList: any;
  constructor(
    public datepipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,

    private router: Router,
    private dataservice: DataService
  ) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
    //this.GetAllTransactionList();
  }
  GetAllCategory(){
    this.dataservice.GetAllCategory().subscribe((res)=>{
      let categoryData=res.donationList;
      var result = [];
      //Filtering data for  active status in category list
      categoryData.forEach((value)=>{
        if( value.active==true){
          result.push(value);
        };
      })
      console.log("object",result)
      this.categoryList=result;      console.log("All category",this.categoryList);
    })
    // this.groupList =this.categoryList.map(x => ({
    //   label: x.donationName,
    //   value: x.id
    // }));
    console.log("groupList", this.groupList);
  }
  ngAfterViewChecked() {
    console.log("DataTable", this.filterTable.filteredValue);
    let filterData = this.filterTable.filteredValue;
    if (this.filterTable.filteredValue == undefined) {

    }
    else if (this.filterTable.filteredValue==null) {
      this.transReport.forEach(
        (res, i) =>
          (this.TotalAmount = this.TotalAmount + Number(res["settleAmount"]))
      );
    }
    else if (this.filterTable.filteredValue!=null) {
     this.CountAmount(this.filterTable.filteredValue)
    }
    this.cdr.detectChanges();
  }
  CountAmount(filterData: any) {
    this.TotalAmount = 0;
    filterData.forEach(
      (res, i) =>
        (this.TotalAmount = this.TotalAmount + Number(res["settleAmount"]))
    );
  }
  openDialog(){
    this.Popup=true;
  }
  onBlurMethod(event: any) {
    console.log(event);
    // if (dateType == "1") {

    this.fromDate =
      this.startDate.getFullYear() +
      "-" +
      (this.startDate.getMonth() + 1) +
      "-" +
      this.startDate.getDate();
    // } else {
    this.toDate =
      this.startDate.getFullYear() +
      "-" +
      (this.endDate.getMonth() + 1) +
      "-" +
      this.endDate.getDate();
    // }
    // if (this.startDate != null && this.toDate != null) {
    if (this.endDate >= this.startDate) {
      this.GetAllTransactionList(event);
    } else {
      // this.GetAllTransactionList(event);
      this.ShowError("Invalid date selection");
    }
    // }
  }
  exportPdf() {
    let docDefinition = {
      content: [
        {
          table: {
            body: [
              [
                {
                  text: "S.No",
                  bold: true,
                  fillColor: "#555555",
                  color: "#00FFFF",
                },
                {
                  text: "TransId",
                  bold: true,
                  fillColor: "#555555",
                  color: "#00FFFF",
                },
                {
                  text: "Name",
                  bold: true,
                  fillColor: "#555555",
                  color: "#00FFFF",
                },
                {
                  text: "Amount",
                  bold: true,
                  fillColor: "#555555",
                  color: "#00FFFF",
                },
                {
                  text: "Date",
                  bold: true,
                  fillColor: "#555555",
                  color: "#00FFFF",
                },
                {
                  text: "Status",
                  bold: true,
                  fillColor: "#555555",
                  color: "#00FFFF",
                },
              ],
              [
                { text: "Bold value", bold: true },
                "Val 2",
                "Val 3",
                "Val 4",
                "Val 5",
                "Val 6",
              ],
            ],
          },
        },
      ],
    };

    docDefinition.content[0].table.body.pop(); //remove the unnecessary 2nd row
    let slno: number = 1;
    for (let p of this.transReport) {
      docDefinition.content[0].table.body.push([
        { text: slno.toString(), bold: true },
        p.transId,
        p.name,
        p.settleAmount.toString(),
        p.submitTimeLocal,
        p.transactionStatus,
      ]);
      slno = slno + 1;
    }
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, "dd-MM-yyyy");
    pdfMake
      .createPdf(docDefinition)
      .download("Report" + new Date().getTime() + ".pdf");
  }
  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.transReport);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["report1"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "report");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  ShowInfo(message: any) {
    this.messageService.add({
      severity: "info",
      summary: message,
      detail: "",
    });
  }
  ShowError(message: any) {
    this.messageService.add({
      severity: "error",
      summary: message,
      detail: "",
    });
  }
  GetAllTransaction(){

  }
  GetAllTransactionList(today: any) {
    this.isToday = today;
    this.showLoader = true;
    this.dataservice
      .GetAllTransaction(this.fromDate, this.toDate, false,this.selectedCategoryId)
      .subscribe((res) => {
        if (res != null) {
          res.forEach((res, i) => (res["sNo"] = i + 1));
          res.forEach(
            (res, i) =>
              (this.TotalAmount =
                this.TotalAmount + Number(res["settleAmount"]))
          );
          this.transReport = res;
          this.successTransCount = res.filter(function (item) {
            return item.transactionStatus == "settledSuccessfully";
          }).length;
          this.expiryTransCount = res.filter(function (item) {
            return item.transactionStatus == "expired";
          }).length;
          this.pendingTransCount = res.filter(function (item) {
            return item.transactionStatus == "capturedPendingSettlement";
          }).length;
          this.totalTrans = res.length;
          this.failureTransCount = res.filter(function (item) {
            return (
              item.transactionStatus == "expired" ||
              item.transactionStatus == "voided"
            );
          }).length;
          if (this.isToday) {
            this.dataservice.SaveTodayReport(this.transReport);
          }
        } else {
          alert("No records found");
        }
        console.log("TransReport", this.transReport);
      });
    this.showLoader = false;
  }
  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: "Series A",
    },
  ];
  public lineChart1Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 40 - 5,
            max: 84 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle("--primary"),
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart1Legend = false;
  public lineChart1Type = "line";

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "Series A",
    },
  ];
  public lineChart2Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 1 - 5,
            max: 34 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart2Colours: Array<any> = [
    {
      // grey
      backgroundColor: getStyle("--info"),
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart2Legend = false;
  public lineChart2Type = "line";

  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "Series A",
    },
  ];
  public lineChart3Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart3Legend = false;
  public lineChart3Type = "line";

  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: "Series A",
      barPercentage: 0.6,
    },
  ];
  public barChart1Labels: Array<any> = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.3)",
      borderWidth: 0,
    },
  ];
  public barChart1Legend = false;
  public barChart1Type = "bar";

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: "Current",
    },
    {
      data: this.mainChartData2,
      label: "Previous",
    },
    {
      data: this.mainChartData3,
      label: "BEP",
    },
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: "index",
      position: "nearest",
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return {
            backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor,
          };
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value: any) {
              return value.charAt(0);
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250,
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    legend: {
      display: false,
    },
  };
  public mainChartColours: Array<any> = [
    {
      // brandInfo
      backgroundColor: hexToRgba(getStyle("--info"), 10),
      borderColor: getStyle("--info"),
      pointHoverBackgroundColor: "#fff",
    },
    {
      // brandSuccess
      backgroundColor: "transparent",
      borderColor: getStyle("--success"),
      pointHoverBackgroundColor: "#fff",
    },
    {
      // brandDanger
      backgroundColor: "transparent",
      borderColor: getStyle("--danger"),
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5],
    },
  ];
  public mainChartLegend = false;
  public mainChartType = "line";

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: "Facebook",
    },
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: "Twitter",
    },
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "LinkedIn",
    },
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: "Google+",
    },
  ];

  public brandBoxChartLabels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    legend: {
      display: false,
    },
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.1)",
      borderColor: "rgba(255,255,255,.55)",
      pointHoverBackgroundColor: "#fff",
    },
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = "line";

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
     this.GetAllCategory();
    this.primengConfig.ripple = true;
    this.startDate = new Date();
    this.endDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    //this.onBlurMethod(null);
    //this.onBlurMethod(null, "2");
    this.GetTodayReport();
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }
    this.exportColumns = this.columnDefs.map((col) => ({
      title: col.headerName,
      dataKey: col.field,
    }));
  }
  onChange(data: any, dataKey: any) {
    this.TotalAmount = 0;
    console.log(dataKey.target.value);
    let filterData = this.transReport.filter((x: any) => {
      return x.category == dataKey.target.value;
    });
    // this.FilteredData = data._value.filter(function(data) {
    //   return data._value.category == 'b';
    // });
    console.log("data", filterData);
    console.log("fileterd", data._value);
  }
  loadCustomers(event: any) {}
  GetTodayReport() {
    this.onBlurMethod(true);
    //this.GetAllTransactionList(true)
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.transReport
      ? this.first === this.transReport.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.transReport ? this.first === 0 : true;
  }

  //****************PrimeNG DataTable Pagination Method End*********************** */
  // ********************User To Remove User from User List*************************/
  remove(id: number) {
    //this.userService.removeUser(id);
    this.transReport = this.transReport.getUsers();
  }
}
