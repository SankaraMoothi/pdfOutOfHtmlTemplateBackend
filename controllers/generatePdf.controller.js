import mustache from "mustache";
import puppeteer from "puppeteer";
import Template from "../modules/TemplateTable.js";
import { HTMLTEMPLATE } from "../utils/data.js";
import PdfStore from "../modules/PdfTable.js";

export const sampleGenerater = async (req, res) => {
  let { dynamicInput, HTMLCode } = req.body;
  let data = dynamicInput;

  try {
    let HTML = HTMLTEMPLATE(HTMLCode);

    const renderedHtml = mustache.render(HTML, data);

    let template = Buffer.from(HTML);

    const JSONBuffer = Buffer.from(JSON.stringify(data), "utf-8");

    let savedTemplateId;
    let sampledata = {
      template,
      authorId: req.userId,
      sampleJSON: JSONBuffer,
    };

    try {
      const HtmlTemplate = Template.build(sampledata);
      const savedTemplate = await HtmlTemplate.save();
      savedTemplateId = savedTemplate.id;
    } catch (error) {
      console.log(error);
    }

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setContent(renderedHtml);
    await page.emulateMediaFeatures("screen");
    let pdfBuffer = await page.pdf({ path: "output.pdf", format: "A4" });

    await browser.close();
    let savedPdfId;
    let sampledataPdf = {
      pdf: pdfBuffer,
      authorId: req.userId,
    };

    try {
      const storePdf = PdfStore.build(sampledataPdf);
      const savedPdf = await storePdf.save();
      savedPdfId = savedPdf.id;
    } catch (error) {
      console.log(error);
    }
    const response = {
      pdfBuffer,
      tamplateID: savedTemplateId,
      savedPdfId,
      get_Pdf: `http://localhost:4000/api/process/pdf/${savedPdfId}`,
      re_Use_Template_api: `http://localhost:4000/api/process/${savedTemplateId}`,
      sampleJson: data,
    };

    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json("Something went worng");
  }
};

export const getPdf = async (req, res) => {
  let { id } = req.params;
  try {
    const db = await PdfStore.findOne({ where: { id } });
    const pdfBuffer = db.pdf;
    let response = {
      pdf: pdfBuffer,
      author: db.authorId,
    };
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).send("somithing Went Worng");
  }
};

export const ReUseTemplate = async (req, res) => {
  let { dynamicInput } = req.body;
  let { id } = req.params;
  let data = dynamicInput;
  try {
    const db = await Template.findOne({ where: { id } });
    let DBtemplate = db.template;
    const encoding = "utf-8";

    const decoder = new TextDecoder(encoding);

    const bufferString = decoder.decode(DBtemplate);
    const renderedHtml = mustache.render(bufferString, data);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setContent(renderedHtml);
    await page.emulateMediaFeatures("screen");

    let pdfBuffer = await page.pdf({ path: "output.pdf", format: "A4" });
    await browser.close();
    let savedPdfId;
    let sampledataPdf = {
      pdf: pdfBuffer,
      authorId: req.userId,
    };

    try {
      const storePdf = PdfStore.build(sampledataPdf);
      const savedPdf = await storePdf.save();
      savedPdfId = savedPdf.id;
    } catch (error) {
      console.log(error);
    }

    const response = {
      pdfBuffer,
      samplejson: data,
      savedPdfId,
      get_Pdf: `http://localhost:4000/api/process/pdf/${savedPdfId}`,
    };
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json("Something went worng");
  }
};
