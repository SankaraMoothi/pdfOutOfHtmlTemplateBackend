export function HTMLTEMPLATE(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
   <style>
   @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Roboto:wght@300;700&display=swap");
   * {
     font-family: "Lato", sans-serif;
   }
   
   .header-template {
     transition: all 0.35s ease-in;
     background-color: #fff;
     padding: 10px;
   }
   .header-template.header-left-align {
     display: flex;
     flex-direction: column;
     justify-content: space-around;
     align-items: center;
   }
   .header-template.header-center-align {
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: space-between;
     align-items: center;
   }
   .header-template.header-right-align {
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: space-between;
     align-items: center;
   }
   .header-template .header-main-content {
     text-align: center;
     line-height: normal;
   }
   .header-template .header-main-content.align-start {
     text-align: start !important;
   }
   .header-template .header-template-heading {
     flex: 2 1 1fr;
   }
   .header-template .header-template-subheading {
     flex: 3 1 1fr;
   }
   .header-template .header-template-details {
     flex: 3 1 150px;
   }
   .header-template .header-left {
     font-size: 2rem;
     line-height: normal;
   }
   .header-template .header-start {
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: flex-start;
   }
   
   .body-line-main {
     display: block;
     font-weight: 700;
     font-size: 1.2rem;
   }
   
   .body-line-description {
     display: block;
     font-size: 0.9rem;
     color: grey;
     font-weight: 500;
   }
   
   .output-content,
   .draggingOver {
     background-color: #fff;
   }
   
   .output-container {
     position: relative;
     display: grid;
     min-height: 100vh;
     width: 100vw;
     background-image: radial-gradient(lightgrey 1.5px, transparent 0);
     background-size: 20px 20px;
     background-color: #f5f5f5;
     grid-template-columns: repeat(10, 1fr);
     grid-template-rows: repeat(30, 1fr);
     grid-gap: 5px;
     overflow-y: auto;
     overflow-x: scroll;
   }
   
   .footer-template {
     background-color: #fff;
     padding: 10px;
   }
   .footer-template.footer-left-align {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: flex-start;
   }
   .footer-template.footer-right-align {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: flex-end;
   }
   .footer-template.footer-center-align {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
   }
   .footer-template .footer-left {
     line-height: normal;
     font-size: 1.2rem;
     padding-bottom: 0.5rem;
   }
   .footer-template .footer-main-content {
     text-align: left;
     line-height: normal;
   }
   .footer-template .footer-right-content {
     text-align: right;
     line-height: normal;
   }
   
   .Annexure {
     background-color: #fff;
     padding: 10px;
   }
   .Annexure .Annexure-title {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
   }
   .Annexure .Annexure-title span > b {
     font-weight: bold;
   }
   .Annexure ul > li {
     list-style-type: lower-alpha;
   }
   
   .Conditions {
     display: block;
     background-color: #fff;
     padding: 10px;
   }
   
   .QuoteLetter {
     background-color: #fff;
     padding: 10px;
   }
   .QuoteLetter table {
     border-collapse: collapse;
     text-align: center;
     padding: 10px;
     width: 100%;
     padding: 15px;
   }
   .QuoteLetter table thead {
     background-color: rgba(0, 0, 0, 0.5);
   }
   .QuoteLetter table tr,
   .QuoteLetter table th,
   .QuoteLetter table td {
     border: 1px solid black;
     padding: 10px;
   }
   .QuoteLetter table tr ul > li,
   .QuoteLetter table th ul > li,
   .QuoteLetter table td ul > li {
     margin-bottom: 10px;
   }
   .QuoteLetter table th {
     font-size: 1.2rem;
   }
   
   .myTable {
     width: 100%;
     background-color: #fff;
   }
   .myTable th,
   .myTable td {
     border: 0.5px solid #132850;
     padding: 10px;
   }
   .myTable table {
     width: 100%;
     border-collapse: collapse;
     text-align: center;
     margin-left: 10px;
   }
   
   </style>
</head>
<body>
    ${data}
</body>
</html>`;
}
